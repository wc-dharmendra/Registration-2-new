import { GetApiCall, PostApiCall } from "@/Api/ApiCall";
import EndPoint from "@/Api/EndPoint";
import useCommonStore from "@/Store/useCommonStore";
import useUserStore from "@/Store/useUserStore";
import ShowToast from "@/Toaster/Toaster";
import Utils from "@/Utils/Utils";
import { useCallback, useEffect, useRef, useState } from "react";

const useHeader = () => {
  const { user, setUser } = useUserStore();
  const { setIsLoading } = useCommonStore();

  const dropDownRef = useRef(null);
  const profileRef = useRef(null);

  const helpNSupportRef = useRef(null);
  const helpRef = useRef(null);

  const [openProfile, setOpenProfile] = useState(false);

  const [helpSupport, setHelpSupport] = useState(false);
  const [techPopup, setTechPopup] = useState(false);
  const [knowledgeBasePopup, setKnowledgeBasePopup] = useState(false);
  const [feedBackPopup, setFeedBackPopup] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [inputData, setInputData] = useState({
    question: "",
    rating: Number(user?.rating) || 0,
    feedback: "",
  });

  const onTechSupportSubmit = (e) => {
    e.preventDefault();
    if (inputData?.question) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.techSupport,
        { question: inputData?.question },
        (cbData) => {
          if (cbData?.success) {
            setInputData({ ...inputData, question: "" });
            setTechPopup(false);
            setIsLoading(false);
          }
        },
        () => {
          setInputData({
            question: "",
            rating: Number(user?.rating) || 0,
            feedback: "",
          });
          setIsLoading(false);
        }
      );
    } else {
      ShowToast({ message: "Please provide your concern.", variant: "error" });
    }
  };

  const onFeedbackSubmit = (e) => {
    e.preventDefault();
    if (inputData?.rating && inputData?.feedback) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.feedback,
        { feedback: inputData?.feedback, rating: inputData?.rating },
        (cbData) => {
          if (cbData?.success) {
            setFeedBackPopup(false);
            setInputData({ ...inputData, rating: 0, feedback: "" });
          }
          setIsLoading(false);
        },
        (errCb) => {
          setIsLoading(false);
        }
      );
    } else {
      ShowToast({
        message: "Please provide rating and suggestion.",
        variant: "error",
      });
    }
  };

  const onChange = useCallback(
    (e) => {
      setInputData(Utils?.onChangeInputData(e, inputData));
    },
    [inputData]
  );

  const onTechPopupClose = useCallback(() => {
    setTechPopup(false);
  }, []);

  const onKnowledgeBasePopupClose = useCallback(() => {
    setKnowledgeBasePopup(false);
  }, []);

  const onfeedBackPopupPopupClose = useCallback(() => {
    setFeedBackPopup(false);
    setInputData({ ...inputData, rating: 0, feedback: "" });
  }, []);

  const handleClickOpen = useCallback(() => {
    setOpenProfile(!openProfile);
  }, [openProfile]);

  const handleOnOpen = useCallback(() => {
    setHelpSupport(!helpSupport);
  }, [helpSupport]);

  const onLogout = useCallback((e) => {
    e.preventDefault();
    GetApiCall(EndPoint?.logout, (cbData) => {
      if (cbData?.success) {
        Utils?.afterLogout();
      }
    },()=>{

    },false);
  }, []);

  const getProfile = () => {
    GetApiCall(
      EndPoint?.getProfile,
      (cbData) => {
        if (cbData?.success) {
          setUser(cbData?.data?.response);
        }
      },
      () => { },
      false
    );
  };

  useEffect(() => {
    Utils?.removeModal(dropDownRef, profileRef, () => {
      setOpenProfile(false);
    });

    Utils?.removeModal(helpNSupportRef, helpRef, () => {
      setHelpSupport(false);
    });
  }, [dropDownRef, profileRef, helpNSupportRef, helpRef]);

  useEffect(() => {
    getProfile();
    setIsClient(true);
    setIsLoading(false);
  }, []);

  return {
    dropDownRef,
    profileRef,
    helpNSupportRef,
    helpRef,
    openProfile,
    helpSupport,
    handleClickOpen,
    handleOnOpen,
    onLogout,
    techPopup,
    setTechPopup,
    knowledgeBasePopup,
    setKnowledgeBasePopup,
    feedBackPopup,
    setFeedBackPopup,
    onTechPopupClose,
    onKnowledgeBasePopupClose,
    onfeedBackPopupPopupClose,
    isClient,
    onChange,
    inputData,
    onTechSupportSubmit,
    user,
    onFeedbackSubmit,
  };
};
export default useHeader;
