import { useCallback, useEffect, useState } from "react";
import { GetApiCall, PostApiCall } from "@/Api/ApiCall";
import EndPoint from "@/Api/EndPoint";
import useEventStore from "@/Store/useEventStore";
import ShowToast from "@/Toaster/Toaster";
import useCommonStore from "@/Store/useCommonStore";

const useIntegration = () => {
  const { event, integrationSetting, setIntegrationSetting } = useEventStore();
  const [custom, setCustom] = useState({
    host: "",
    port: "",
    encryption: 0,
    sender_email: "",
    username: "",
    password: "",
  });
  const [openPopUp, setOpenPopUp] = useState(false);
  const { isLoading, setIsLoading } = useCommonStore();
  const showErrorToast = (message) => ShowToast({ message, variant: "error" });

  const onCustomChange = useCallback(
    (name, value) => {
      setCustom({
        ...custom,
        [name]: value,
      });
    },
    [custom]
  );

  const getIntegration = () => {
    setIsLoading(true);
    GetApiCall(
      EndPoint?.getIntegration(event?.id),
      (cbData) => {
        setIsLoading(false);
        if (cbData?.success) {
          setIntegrationSetting(cbData?.data?.response);
        }
      },
      () => {
        setIsLoading(false);
      },
      false
    );
  };

  const updateIntegration = (payload, val, type, errorCB = null) => {
    setIsLoading(true);
    PostApiCall(
      EndPoint?.updateIntegration(event?.id),
      {
        type,
        value: payload,
      },
      (cbData) => {
        if (cbData?.success) {
          getIntegration();
        } else {
          if (errorCB) errorCB(val);
          setIsLoading(false);
        }
      },
      (errCb) => {
        if (errorCB) {
          errorCB(val);
        }
        setIsLoading(false);
      },
      false
    );
  };

  const updateCustomIntegration = useCallback(() => {
    const { host, port, encryption, sender_email, username, password } = custom;
    if (host && port && sender_email && username && password) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.customIntegration(event?.id),
        {
          ...custom,
        },
        (cbData) => {
          setIsLoading(false);
          if (cbData?.success) {
            setOpenPopUp(false);
            // setCustom({ host: '', port: '', encryption: 0, sender_email: '', username: '', password: '' })
            getIntegration();
          }
        },
        (errCb) => {
          setIsLoading(false);
        },
        false
      );
    } else if (!host || !port || !username || !password || !sender_email) {
      showErrorToast("All fields are required");
    }
  }, [custom]);

  const deleteCustomIntegration = useCallback((id) => {
    setIsLoading(true);
    PostApiCall(
      EndPoint?.deleteCustomIntegration(event?.id),
      {
        id,
      },
      (cbData) => {
        setIsLoading(false);
        if (cbData?.success) {
          setOpenPopUp(false);
          getIntegration();
        }
      },
      (errCb) => {
        setIsLoading(false);
      },
      false
    );
  }, []);

  const applyCustomIntegration = useCallback((id, prev_status, errorCB) => {
    setIsLoading(true);
    PostApiCall(
      EndPoint?.applyCustomIntegration(event?.id),
      { id },
      (cbData) => {
        if (cbData?.success) {
          getIntegration();
        } else {
          if (errorCB) errorCB(prev_status);
          setIsLoading(false);
        }
      },
      (errCb) => {
        if (errorCB) errorCB(prev_status);
        setIsLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    getIntegration();
  }, []);

  return {
    integrationSetting,
    updateIntegration,
    updateCustomIntegration,
    custom,
    onCustomChange,
    openPopUp,
    setOpenPopUp,
    setCustom,
    deleteCustomIntegration,
    applyCustomIntegration,
  };
};
export default useIntegration;
