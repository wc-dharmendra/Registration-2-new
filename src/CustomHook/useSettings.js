import { useCallback, useEffect, useState, useRef } from "react";
import ShowToast from "@/Toaster/Toaster";
import Utils from "@/Utils/Utils";
import useUserStore from "@/Store/useUserStore";
import { PostApiCall } from "@/Api/ApiCall";
import EndPoint from "@/Api/EndPoint";
import useCommonStore from "@/Store/useCommonStore";
import { onFileUpload } from "@/Api/OnDataSend";

const useSettings = () => {
  const { setUser, user, isPasswordSet, setIsPaswordSet } = useUserStore();
  const { setIsLoading, setToken } = useCommonStore();

  const [isFocused, setIsFocused] = useState(false);
  const [inputData, setInputData] = useState({
    host_name: "",
    link: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    old_password: "",
    password: "",
    password_confirmation: "",
    dial_code: "IN#91",
    avatar: "",
    new_password: "",
    confirm_password: "",
  });

  const [changePasswordPopup, setChangePasswordPopup] = useState(false);
  const [forgotPasswordPopup, setForgotPasswordPopup] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [openLinkDrop, setOpenLinkDrop] = useState(false);
  const [isLink, setIsLink] = useState("");

  const linkButtonRef = useRef(null);
  const linkDropRef = useRef(null);

  const onChange = useCallback(
    (e) => {
      setInputData(Utils?.onChangeInputData(e, inputData));
    },
    [inputData]
  );

  const onChangePasswordPopupClose = useCallback(() => {
    setChangePasswordPopup(false);
    setInputData({
      ...inputData,
      old_password: "",
      password: "",
      password_confirmation: "",
    });
  }, [inputData]);

  const onForgotPasswordPopupClose = useCallback(() => {
    setForgotPasswordPopup(false);
    setInputData({
      ...inputData,
      password: "",
      password_confirmation: "",
    });
  }, [inputData]);

  const onCloseUpload = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleDropLink = useCallback(() => {
    setOpenLinkDrop(!openLinkDrop);
  }, [openLinkDrop]);

  const handleItemClickLink = (item) => {
    setIsLink(item);
    setOpenLinkDrop(false);
  };

  const onProfileChange = async (file) => {
    if (file?.size) {
      setIsLoading(true);
      let formData = new FormData();
      formData.append("media", file);
      formData.append("type", "image");
      const res = await onFileUpload("uploadMedia", formData);
      setIsLoading(false);
      if (res?.success) {
        setIsLoading(false);
        setInputData({
          ...inputData,
          avatar: res?.data?.response?.url,
        });
      } else if (!res?.success && res?.errors?.media?.length) {
        setIsLoading(false);
        ShowToast({
          message: res?.errors?.media?.toString(),
          variant: "error",
        });
      }
    }
  };

  const showErrorToast = (message) => ShowToast({ message, variant: "error" });

  const isDataValid = async () => {
    const { link, first_name, last_name, host_name } = inputData;
    let isValid = true;
    if (link && !Utils?.isValidUrl(link)) {
      isValid = false;
      showErrorToast("Invalid Website format");
    } else if (!first_name) {
      isValid = false;
      showErrorToast("First Name can't be blank");
    } else if (!last_name) {
      isValid = false;
      showErrorToast("Last Name can't be blank");
    }
    return isValid;
  };

  const profileSave = useCallback(
    async (e) => {
      e.preventDefault();
      const { first_name, last_name } = inputData;
      if ((await isDataValid()) && first_name && last_name) {
        setIsLoading(true);
        let dataToBeSubmit = {
          first_name: inputData?.first_name,
          last_name: inputData?.last_name,
          host_name: inputData?.host_name,
          link: inputData?.link,
          avatar: inputData?.avatar,
          profile:
            isLink === "Website"
              ? "company"
              : isLink
                ? isLink?.toLowerCase()
                : "",
        };

        PostApiCall(
          EndPoint?.updateProfile,
          dataToBeSubmit,
          (cbData) => {
            if (cbData?.success) {
              if (cbData?.data?.response?.refresh_token) {
                Utils?.saveCookie(
                  "accessToken",
                  cbData?.data?.response?.refresh_token
                );
                setToken(cbData?.data?.response?.refresh_token);
              }
              if (cbData?.data?.response?.id) {
                setIsLoading(false);
                setInputData({
                  ...cbData?.data?.response,
                  dial_code: cbData?.data?.response?.country_code || "IN#91",
                });
                setUser(cbData?.data?.response);
              } else {
                setIsLoading(false);
              }
            }
          },
          () => {
            setIsLoading(false);
          }
        );
      }
    },
    [inputData, isLink]
  );

  const updateEmail = (e) => {
    e.preventDefault();
    if (inputData?.email && Utils?.isValidEmail(inputData.email)) {
      PostApiCall(
        EndPoint?.updateDetails,
        { email: inputData?.email },
        (cbData) => {
          if (cbData?.data?.response?.id) {
            setInputData({
              ...cbData?.data?.response,
              dial_code: cbData?.data?.response?.country_code || "IN#91",
            });
            setUser(cbData?.data?.response);
          }
        },
        () => { }
      );
    } else if (!inputData?.email || !Utils?.isValidEmail(inputData.email)) {
      showErrorToast(
        !inputData.email ? "Email can't be blank." : "Invalid Email format"
      );
    }
  };

  const updatePhone = (e) => {
    e.preventDefault();
    if (inputData?.phone && Utils?.isValidPhone(inputData?.phone)) {
      PostApiCall(
        EndPoint?.updateDetails,
        { country_code: inputData.dial_code, phone: Number(inputData?.phone) },
        (cbData) => {
          if (cbData?.data?.response?.id) {
            setInputData({
              ...cbData?.data?.response,
              dial_code: cbData?.data?.response?.country_code || "IN#91",
            });
            setUser(cbData?.data?.response);
          }
        },
        () => { }
      );
    } else if (!inputData?.phone || !Utils?.isValidPhone(inputData.phone)) {
      showErrorToast(
        !inputData.phone
          ? "Phone Number can't be blank."
          : "Invalid Phone Number format"
      );
    }
  };

  const updatePassword = (e, cb) => {
    if (!inputData?.old_password) {
      showErrorToast("Current Password can't be blank.");
    } else if (!inputData?.password) {
      showErrorToast("New Password can't be blank.");
    }
    // else if (!inputData?.password_confirmation) {
    //     showErrorToast("Confirm Password can't be blank.");
    // }
    else if (
      !Utils?.isValidPassword(inputData?.old_password) ||
      !Utils?.isValidPassword(inputData?.password)
    ) {
      showErrorToast(
        "Password must contain alphanumeric values, at least one uppercase letter, one lowercase letter,one special character (@$!%*?&) and minimum length of 8 characters"
      );
    } else if (
      Utils?.isValidPassword(inputData?.old_password) &&
      Utils?.isValidPassword(inputData?.password)
    ) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.updatePassword,
        {
          old_password: inputData?.old_password,
          password: inputData?.password,
          password_confirmation: inputData?.password,
        },
        (cbData) => {
          setIsLoading(false);
          if (cbData?.success) {
            setInputData({
              ...inputData,
              old_password: "",
              password: "",
              password_confirmation: "",
            });
            setChangePasswordPopup(false);

            // setUser(cbData?.userData);
            // if (cb) cb();
          }
        },
        () => {
          setIsLoading(false);
        }
      );
    }
  };

  const onForgetPassword = (e, cb) => {
    if (!inputData?.password) {
      showErrorToast("New Password can't be blank.");
    } else if (!inputData?.password_confirmation) {
      showErrorToast("Confirm Password can't be blank.");
    } else if (
      !Utils?.isValidPassword(inputData?.password) ||
      !Utils?.isValidPassword(inputData?.password_confirmation)
    ) {
      showErrorToast(
        "Password must contain alphanumeric values, at least one uppercase letter, one lowercase letter,one special character (@$!%*?&) and minimum length of 8 characters"
      );
    } else if (
      Utils?.isValidPassword(inputData?.password) &&
      Utils?.isValidPassword(inputData?.password_confirmation) &&
      inputData?.password !== inputData?.password_confirmation
    ) {
      showErrorToast("Password and Confirm password did not match!");
    } else if (
      Utils?.isValidPassword(inputData?.password) &&
      Utils?.isValidPassword(inputData?.password_confirmation) &&
      inputData?.password === inputData?.password_confirmation
    ) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.saveSetPassword,
        {
          password: inputData?.password,
          password_confirmation: inputData?.password_confirmation,
        },
        (cbData) => {
          if (cbData?.success) {
            setInputData({
              ...inputData,
              password: "",
              password_confirmation: "",
            });
            setIsPaswordSet(true);
            setIsLoading(false);
            setForgotPasswordPopup(false);
            // setUser(cbData?.userData);
            // if (cb) cb();
          }
        },
        () => {
          setIsLoading(false);
        }
      );
    }
  };

  const onPasswordSet = () => {
    setIsLoading(true);
    PostApiCall(
      EndPoint?.setPassword,
      { email: user?.email },
      (cbData) => {
        setIsLoading(false);
        if (cbData?.success) {
          setChangePasswordPopup(false);
        }
      },
      () => {
        setIsLoading(false);
      }
    );
  };

  const onPasswordClick = useCallback(
    (e, triggerMail = false) => {
      // if (!isPasswordSet || triggerMail) {
      //     onPasswordSet();
      // } else {
      //     setChangePasswordPopup(true);
      // }

      if (triggerMail) {
        onPasswordSet();
      } else if (!isPasswordSet) {
        setForgotPasswordPopup(true);
      } else {
        setChangePasswordPopup(true);
      }
    },
    [isPasswordSet, changePasswordPopup]
  );

  useEffect(() => {
    setIsLoading(false);
    setIsClient(true);
    setInputData({
      host_name: user?.host_name || "",
      link: user?.link || "",
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      old_password: "",
      password: "",
      password_confirmation: "",
      dial_code: user?.country_code || "IN#91",
      avatar: user?.avatar || "",
    });
    setIsLink(
      Utils?.capitalizeFirstWord(
        user?.profile === "company" ? "website" : user?.profile
      )
    );
  }, [user]);

  useEffect(() => {
    Utils?.removeModal(linkButtonRef, linkDropRef, () => {
      setOpenLinkDrop(false);
    });
  }, [linkButtonRef, linkDropRef]);

  return {
    handleItemClickLink,
    isLink,
    setIsLink,
    isFocused,
    setIsFocused,
    user,
    inputData,
    onChange,
    profileSave,
    updateEmail,
    updatePassword,
    changePasswordPopup,
    isOpen,
    setIsOpen,
    onChangePasswordPopupClose,
    onForgotPasswordPopupClose,
    onCloseUpload,
    updatePhone,
    isClient,
    onProfileChange,
    forgotPasswordPopup,
    setForgotPasswordPopup,
    onForgetPassword,
    onPasswordClick,
    linkButtonRef,
    linkDropRef,
    handleDropLink,
    openLinkDrop,
    setOpenLinkDrop,
  };
};
export default useSettings;
