import ShowToast from "../Toaster/Toaster";
import ReqData from "./ReqData";
import Utils from "../Utils/Utils";
import useCommonStore from "@/Store/useCommonStore";

const PostApiCall = async (
  url = "",
  data = {},
  cb = null,
  errCb = null,
  showToaster = true
) => {
  const res = await ReqData(url, data, "post");
  onApiResponse(res, cb, errCb, showToaster);
};

const GetApiCall = async (
  url = "",
  cb = null,
  errCb = null,
  showToaster = true
) => {
  const res = await ReqData(url);
  onApiResponse(res, cb, errCb, showToaster);
};

const DeleteApiCall = async (
  url = "",
  cb = null,
  errCb = null,
  showToaster = true
) => {
  const res = await ReqData(url, {}, "delete");
  onApiResponse(res, cb, errCb, showToaster);
};

const UpdateApiCall = async (
  url = "",
  data = {},
  cb = null,
  errCb = null,
  showToaster = true
) => {
  const res = await ReqData(url, data, "put");
  onApiResponse(res, cb, errCb, showToaster);
};

const onApiResponse = async (res, cb, errCb, showToaster) => {
  if (res?.ok) {
    if (res?.json) {
      const response = await res?.json();
      if (
        response?.data?.status === "error" &&
        response?.data?.code === "unauthorized"
      ) {
        localStorage.removeItem("accessToken");
        Utils?.goTo("/registration");
        if (showToaster) {
          ShowToast({ message: response?.data?.message, variant: "error" });
        }
        if (errCb) errCb(response);
      } else if (
        response?.data?.status === "error" &&
        response?.data?.code === "unauthorized_event_access"
      ) {
        Utils?.goTo("/dashboard");
        if (errCb) errCb(response);
      } else if (response?.data?.status === "error") {
        if (showToaster) {
          ShowToast({ variant: "error", message: response?.data?.message });
        }
        if (errCb) errCb(response);
        if (cb) cb(response);
      } else if (res?.status === 200 || res?.status === "success") {
        if (showToaster) {
          ShowToast({
            variant: "success",
            message:
              useCommonStore
                ?.getState()
                ?.localizations?.[response?.message]?.replace(
                  /\{\{([^{}]*)\}\}/g,
                  (match, key) => {
                    // Get the value corresponding to the key from the JSON object
                    let replacement = response?.data?.response[key.trim()];
                    return typeof replacement === "undefined"
                      ? match
                      : replacement;
                  }
                ) || response?.message,
          });
        }
        if (cb) cb(response);
      } else {
        if (showToaster) {
          ShowToast({
            variant: "error",
            message: response?.message || "Something went wrong!.",
          });
        }
        if (errCb) errCb();
        if (cb) cb(response);
      }
    } else {
      if (showToaster) {
        ShowToast({ variant: "error", message: "Something went wrong!." });
      }
    }
  } else if (!res?.ok) {
    if (res?.json) {
      errorHandling(res, errCb, showToaster);
    } else {
      if (showToaster) {
        if (errCb) errCb();
        useCommonStore.getState().setIsLoading(false);
        ShowToast({ message: "Something went wrong!.", variant: "error" });
      }
    }
  }
};

const errorHandling = async (res, errCb, showToaster) => {
  if (res?.status === 401) {
    Utils?.afterLogout();
    Utils?.deleteAllCookies();
    Utils?.deleteCookies();
    Utils?.goTo(`/${process.env.NEXT_PUBLIC_BASE_URL}`);
    return;
  }
  if (res?.status === 429 || res?.status === 500) {
    if (errCb) errCb();
    ShowToast({
      message: res?.statusText || "Something went wrong!.",
      variant: "error",
    });
    return;
  }
  if (errCb) errCb();

  const json = await res?.json();
  if (json?.message === "Unauthorized") {
    Utils?.afterLogout();
    return;
  }
  if (json?.errors) {
    let errObj = json?.errors;
    let errArr = Object.values(errObj);
    let errSingleArr = [];
    errArr?.map((e) => errSingleArr.push(...e));
    if (showToaster) {
      ShowToast({
        message:
          errSingleArr?.[0]?.toString()?.split(",")?.join("\n") ||
          json?.message ||
          res?.statusText ||
          "Something went wrong!.",
        variant: "error",
      });
    }
    if (errCb)
      errCb({ status: res?.status, message: json?.message || res?.statusText });
    // console.log(errSingleArr?.toString()?.split(',')?.join('\n'))
    return;
  }
  if (json?.data?.request?.otp && !showToaster) {
    ShowToast({
      message: json?.message || res?.statusText || "Something went wrong!.",
      variant: "error",
    });
  }

  if (showToaster) {
    ShowToast({
      message:
        useCommonStore
          ?.getState()
          ?.localizations?.[json?.message]?.replace(
            /\{\{([^{}]*)\}\}/g,
            (match, key) => {
              // Get the value corresponding to the key from the JSON object
              let replacement = json?.data?.response[key.trim()];
              return typeof replacement === "undefined" ? match : replacement;
            }
          ) ||
        json?.message ||
        res?.statusText ||
        "Something went wrong!.",
      variant: "error",
    });
  }
};

export { PostApiCall, GetApiCall, DeleteApiCall, UpdateApiCall };
