import { GetApiCall, PostApiCall } from "@/Api/ApiCall";
import EndPoint from "@/Api/EndPoint";
import useCommonStore from "@/Store/useCommonStore";
import useEventStore from "@/Store/useEventStore";
import React, { useState } from "react";

const useEventEmailSettings = () => {
  const { event, eventEmailSetting, setEmailSettings, setEmailConfig } = useEventStore();
  const { isLoading, setIsLoading } = useCommonStore();


  const getEmailSettings = () => {
    if (event?.id) {
      setIsLoading(true);
      GetApiCall(
        EndPoint?.getEmailSettings(event?.id),
        (cbData) => {
          setIsLoading(false);
          if (cbData?.success) {
            setEmailSettings(cbData?.data?.response);
          }
        },
        (errData) => {
          setIsLoading(false);
        },
        false
      );
    }
  };

  const configEmail = () => {
    if (event?.id) {
      setIsLoading(true);
      GetApiCall(
        EndPoint?.configEmail(event?.id),
        (cbData) => {
          setIsLoading(false);
          if (cbData?.success) {
            setEmailConfig(cbData?.data?.response);
          }
        },
        (errData) => {
          setIsLoading(false);
        },
        false
      );
    }
  };



  const updateEmailSettings = (index, val, errorCB = null) => {
    let obj = {};
    for (let i = 0; i < eventEmailSetting?.length; i++) {
      if (i === index) {
        obj[eventEmailSetting[i]?.name] = val;
      } else {
        obj[eventEmailSetting[i]?.name] = eventEmailSetting[i]?.value;
      }
    }
    let body = {
      value: obj,
    };
    if (event?.id) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.updateEmailSettings(event?.id),
        body,
        (cbData) => {
          setIsLoading(false);
          if (cbData?.success) {
            let arr = [...eventEmailSetting];
            arr[index]["value"] = val;
            setEmailSettings(arr);
          } else {
            if (errorCB) errorCB(!val);
          }
        },
        (errData) => {
          if (errorCB) errorCB(!val);
          setIsLoading(false);
        },
        false
      );
    }
  };

  return { getEmailSettings, updateEmailSettings, configEmail };
};

export default useEventEmailSettings;
