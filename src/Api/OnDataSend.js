import Utils from "@/Utils/Utils";
import { PostApiCall } from "./ApiCall";
import EndPoint from "./EndPoint";
import ShowToast from "@/Toaster/Toaster";

const onDataSubmit = (data, cb = () => { }, endUrl = "") => {
  PostApiCall(
    EndPoint?.[endUrl],
    data,
    (cbData) => {
      if (cb) cb(cbData);
    },
    (errData) => {
      if (cb) cb(errData);
    }
  );
};

const onFileUpload = async (endPoint = "", formData = {}) => {
  try {
    const getAccessToken = () => {
      return (
        Utils?.getCookie("accessToken")
          ?.replace(/"/g, "")
          ?.replace(/\\/g, "") ||
        Utils?.getCookie("tempAccessToken")
          ?.replace(/"/g, "")
          ?.replace(/\\/g, "")
      );
    };
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + EndPoint?.[endPoint],
      {
        method: "POST",
        body: formData,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    const resData = await res.json();
    return resData;
  } catch (error) {
    ShowToast({ message: "Something went wrong...", variant: "error" });
  }
};

const downlaodFile = async (endUrl) => {
  try {
    const getAccessToken = () => {
      return (
        Utils?.getCookie("accessToken")
          ?.replace(/"/g, "")
          ?.replace(/\\/g, "") ||
        Utils?.getCookie("tempAccessToken")
          ?.replace(/"/g, "")
          ?.replace(/\\/g, "")
      );
    };
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + endUrl,
      {
        method: "GET",
        headers: {
          "Access-Control-Allow-Origin": "*",
          // "Content-Type": "image/png",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    return res;
  } catch (error) {
    ShowToast({ message: "Something went wrong...", variant: "error" });
  }
};

const fetchDataInServerSide = async (token, url, method = "GET") => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await fetch(`${apiUrl}${url}`, {
      method,
      headers,
    });
    return response;
  } catch (error) {
    return error;
  }
};

const downloadBadge = async (url, options) => {
  const apiUrl = process.env.NEXT_PUBLIC_BADGE_API_URL;
  try {
    const response = await fetch(`${apiUrl}${url}`, options);
    return response
  } catch (error) {
    return error
  }
}

export { onDataSubmit, onFileUpload, fetchDataInServerSide, downlaodFile, downloadBadge };
