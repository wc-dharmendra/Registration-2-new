import { useCallback, useEffect, useState } from "react";
import ShowToast from "@/Toaster/Toaster";
import Utils from "@/Utils/Utils";
import { useRouter } from "next/router";
import { GetApiCall, PostApiCall } from "@/Api/ApiCall";
import EndPoint from "@/Api/EndPoint";
import useUserStore from "@/Store/useUserStore";
import useCommonStore from "@/Store/useCommonStore";

const useLogin = () => {
  const router = useRouter();
  const { setUser, user, setIsPaswordSet } = useUserStore();
  const { isLoading, setIsLoading, setSetup, navigateTo, setNavigateTo,setToken } =
    useCommonStore();
  const [isClient, setIsClient] = useState(false);
  const [isSignUpViaEmail, setIsSignUpViaEmail] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [inputData, setInputData] = useState({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dial_code: user?.dial_code || "IN#91",
    countryCode: user?.country_code || "+91",
    password: "",
  });
  const [contWith, setContWith] = useState("email");
  const [currentComponent, setCurrentComponent] = useState("InitialComponent");

  const onChange = useCallback(
    (e) => {
      setInputData(Utils?.onChangeInputData(e, inputData));
    },
    [inputData]
  );

  const onDataSubmit = (data, cb = () => {}, endUrl = "") => {
    setIsLoading(true);
    PostApiCall(
      EndPoint?.[endUrl],
      data,
      (cbData) => {
        setIsLoading(false);
        if (cb) cb(cbData);
      },
      (errData) => {
        setIsLoading(false);
      }
    );
  };

  const onSkip = useCallback(() => {
    if (user?.first_name && user?.last_name) {
      // Utils?.saveCookie("accessToken", "accessTokenValue");
      Utils?.saveCookie("accessToken", Utils?.getCookie("tempAccessToken"));
      setToken(Utils?.getCookie("tempAccessToken"));
      // setUser(inputData);
      if (user?.id) {
        Utils?.saveCookie("uid", inputData?.id);
        router.push("/create");
      }
    } else {
      setCurrentComponent("CompleteProfile");
    }
  }, [inputData, user]);

  const onComponentChange = useCallback(
    (changeTo = "") => {
      if (changeTo) {
        setCurrentComponent(changeTo);
      } else if (contWith && contWith === "email") {
        setCurrentComponent("LinkPhone");
      } else if (contWith && contWith !== "email") {
        setCurrentComponent("LinkEmail");
      }
    },
    [contWith]
  );

  const contWithPhoneOrEmail = useCallback(
    (viaEmail = true, initial = navigateTo || "InitialComponent") => {
      if (!viaEmail) {
        if (!navigateTo) {
          setInputData({
            email: "",
            dial_code: "IN#91",
            phone: "",
          });
        }
        setCurrentComponent(initial);
        setNavigateTo("");
      }
    },
    [navigateTo]
  );

  const updateUserData = (cb = () => {}, updateBy = {}) => {
    const country = Utils?.countryCode?.find(
      (code) => code?.value === inputData?.dial_code
    );
    if (updateBy === "password") {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.login,
        {
          field_value: inputData?.email,
          field_name: "email",
          password: true,
          otp: inputData?.password,
        },
        async (cbData) => {
          if (cbData?.success) {
            const { event_id, token } = cbData?.data?.response;
            const { first_name, last_name } = cbData?.data?.response?.user;
            if (event_id && first_name && last_name) {
              Utils?.saveCookie("event_id", event_id);
              Utils?.saveCookie("accessToken", token);
              setToken(token);
              setUser({
                ...cbData?.data?.response?.user,
                dial_code: "IN#91",
              });
              setIsLoading(false);
              await router.push("/event");
            } else if (!event_id && first_name && last_name) {
              Utils?.saveCookie("accessToken", token);
              setToken(token);
              setUser({
                ...cbData?.data?.response?.user,
                dial_code: "IN#91",
              });
              await router.push("/create");
            } else {
              Utils?.saveCookie(
                "tempAccessToken",
                cbData?.data?.response?.token
              );
            }
          }
        },
        (errCb) => {
          setIsLoading(false);
        }
      );
    } else {
      let showtoaster = false;
      let dataToBeupdated = {
        first_name: inputData?.first_name || "",
        last_name: inputData?.last_name || "",
      };

      if (updateBy === "phone") {
        dataToBeupdated = {
          country_code: country?.value,
          phone: inputData?.phone,
        };
        showtoaster = true;
      }
      setIsLoading(true);
      PostApiCall(
        EndPoint?.updateUser,
        dataToBeupdated,
        async (cbData) => {
          setIsLoading(false);
          if (cbData?.success && cbData?.data?.response?.id) {
            const { id, email, first_name, last_name, phone } =
              cbData?.data?.response;
            let next = "";
            if (email && first_name && last_name) {
              Utils?.saveCookie(
                "accessToken",
                Utils?.getCookie("tempAccessToken")
              );
              setToken(Utils?.getCookie("tempAccessToken"));
              setUser(cbData?.data?.response);
              router.push("/create");
            } else if (email && phone && !first_name && !last_name) {
              next = "CompleteProfile";
            } else if (phone && !email) {
              next = "LinkEmail";
            } else if (email && !phone) {
              next = "LinkPhone";
            }
            setInputData({
              ...cbData?.data?.response,
              password: inputData?.password,
              dial_code: cbData?.data?.response?.dial_code || "IN#91",
            });
            if (next) {
              setCurrentComponent(next);
            }
            if (cb) cb();
          }
        },
        () => {
          setIsLoading(false);
        },
        showtoaster
      );
    }
  };

  const onContWith = useCallback(
    (checkBy = "", errName = "", isSkip = true) => {
      if (!inputData?.[checkBy]) {
        ShowToast({ message: `${errName} can't be blank.`, variant: "error" });
      }
      // else if (inputData?.password && !Utils?.isValidPassword(inputData?.password)) {
      //     showErrorToast("Password must contain alphanumeric values, at least one uppercase letter, one lowercase letter,one special character (@$!%*?&) and minimum length of 8 characters");
      // }
      else {
        updateUserData(() => {
          if (isSkip) {
            onSkip();
          }
        }, checkBy);
      }
    },
    [inputData, onSkip, router]
  );

  const showErrorToast = (message) => ShowToast({ message, variant: "error" });

  const onContinue = useCallback(
    (data) => {
      const { email, phone } = inputData;

      if (data === "linkWithEmail") {
        onContWith("email", "Email");
      } else if (data === "linkWithPhone") {
        onContWith("phone", "Phone Number");
      } else if (data === "first_name") {
        onContWith("first_name", "First Name");
      } else if (data === "last_name") {
        onContWith("last_name", "Last Name", true);
      } else if (data === "password") {
        onContWith("password", "Password", false);
      } else if (email) {
        if (inputData?.email && Utils?.isValidEmail(inputData?.email)) {
          Utils?.afterLogout(false);
          onDataSubmit(
            { field_value: inputData?.email, field_name: "email" },
            (cbData) => {
              if (cbData?.data?.response) {
                let showPass = cbData?.data?.response?.password;
                setIsPaswordSet(showPass);
                setCurrentComponent(showPass ? "Password" : "OtpComponent");
                setContWith(data?.toLowerCase());
                setInputData({
                  [cbData.data.request.field_name]:
                    cbData?.data?.request?.field_value,
                  password: inputData?.password,
                  dial_code: cbData?.userData?.country_code || "IN#91",
                });
              }
            },
            "createUser"
          );
        } else if (!inputData?.email || !Utils?.isValidEmail(inputData.email)) {
          showErrorToast(
            !inputData.email ? "Email can't be blank." : "Invalid Email format"
          );
        }
      } else if (phone) {
        if (inputData?.phone && Utils?.isValidPhone(inputData.phone)) {
          onDataSubmit(
            { phone: inputData?.phone, dial_code: inputData?.dial_code },
            (cbData) => {
              if (cbData?.userData?._id) {
                let showPass = true;
                // setIsPaswordSet(showPass);

                setCurrentComponent(showPass ? "Password" : "OtpComponent");
                setContWith(data?.toLowerCase());
                setInputData({
                  ...cbData?.userData,
                  password: inputData?.password,
                  dial_code: cbData?.userData?.dial_code || "IN#91",
                });
              }
            },
            "createUser"
          );
        } else if (
          !inputData?.phone ||
          !Utils?.isValidPhone(inputData?.phone)
        ) {
          showErrorToast(
            !inputData.phone ? "Phone can't be blank." : "Invalid Phone format"
          );
        }
      } else {
        ShowToast({ message: `${data} can't be blank.`, variant: "error" });
      }
    },
    [inputData, onContWith]
  );

  const onUseEmailOrPhone = useCallback(
    (isViaEmail = true) => {
      setIsSignUpViaEmail(isViaEmail);
      setInputData({
        ...inputData,
        email: isViaEmail ? inputData?.email : "",
        dial_code: isViaEmail ? "IN#91" : inputData?.dial_code,
        phone: isViaEmail ? "" : inputData?.phone,
        countryCode: isViaEmail ? "+91" : inputData?.countryCode,
      });
    },
    [inputData]
  );

  const fetchGeneralApi = () => {
    GetApiCall(
      EndPoint?.general,
      (cbData) => {
        setSetup(cbData?.data?.response);
      },
      () => {},
      false
    );
  };

  useEffect(() => {
    setIsClient(true);
    fetchGeneralApi();
    setIsLoading(false);
  }, []);

  return {
    isClient,
    isSignUpViaEmail,
    setIsSignUpViaEmail,
    isFocused,
    setIsFocused,
    inputData,
    onChange,
    contWithPhoneOrEmail,
    onContinue,
    onUseEmailOrPhone,
    currentComponent,
    callBack: onComponentChange,
    onSkip,
    isLoading,
  };
};
export { useLogin };
