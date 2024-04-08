import {
  DeleteApiCall,
  GetApiCall,
  PostApiCall,
  UpdateApiCall,
} from "@/Api/ApiCall";
import EndPoint from "@/Api/EndPoint";
import { downlaodFile, onFileUpload } from "@/Api/OnDataSend";
import useBadgeCreatorStore from "@/Store/FabricBadge/useBadgeCreatorStore";
import useBadgeStore from "@/Store/useBadgeStore";
import useCommonStore from "@/Store/useCommonStore";
import useEventStore from "@/Store/useEventStore";
import ShowToast from "@/Toaster/Toaster";
import Utils from "@/Utils/Utils";
import { useCallback, useEffect, useState } from "react";

const useMbadge = (propsData) => {
  const { setIsLoading } = useCommonStore();
  const { event } = useEventStore();
  const { categories, setCategories, setBadgeConfig, badges, setBadges } =
    useBadgeStore();
  const { setBadgeFieldsBtn } = useBadgeCreatorStore();

  const [openMbadge, setOpenMbadge] = useState(false);
  const [openPbadge, setOpenPbadge] = useState(false);
  const [filteredCat, setFilteredCat] = useState([]);
  const [openPreView, setOpenPreview] = useState(false);
  const [previewString, setPreviewString] = useState("");
  const [inputData, setInputData] = useState({ mImg: "", pImg: "" });

  const [badgeInputData, setBadgeInputData] = useState({
    title: "",
    template: "",
    image: "",
    type: "",
    is_contact_card: false,
    font: "roboto",
    formate: "",
  });

  const [selectedBadgeData, setSelectedBadge] = useState({});
  const [name, setNDimension] = useState({});
  const [company, setCDimension] = useState({});
  const [unique_code, setUCDimension] = useState({});
  const [first_name, setFDimension] = useState({});
  const [last_name, setLDimension] = useState({});
  const [qr_code, setQrDimension] = useState({});
  const [date, setDDimension] = useState({ start_date: {}, end_date: {} });
  const [date_1712549905301, setCDDimension] = useState({});
  const [order_id_1712558191795, setOIDimension] = useState({});


  const onCreateBadge = useCallback(
    (categories, type, inputData, id = "", removeBy = "", cb = null) => {
      let dom = document.getElementById(id);
      let template = "";
      if (dom) {
        template = Utils?.removeHtml(dom?.outerHTML, removeBy);
      }
      const dataToBeSubmit = {
        ...badgeInputData,
        template,
        is_contact_card: badgeInputData?.is_contact_card || false,
        image: type === "mbadge" ? inputData?.mImg : inputData?.pImg,
        type,
        payload: { name, company, first_name, last_name, qr_code, unique_code, date_1712549905301, order_id_1712558191795 },
        categories,
      };
      if (
        dataToBeSubmit?.title &&
        dataToBeSubmit?.font &&
        dataToBeSubmit?.categories?.length
      ) {
        submitBadgeData(dataToBeSubmit, cb);
      } else if (!dataToBeSubmit?.title) {
        ShowToast({ message: "Template Name is required", variant: "error" });
      } else if (!dataToBeSubmit?.font) {
        ShowToast({ message: "Font Type is required", variant: "error" });
      } else if (!dataToBeSubmit?.categories?.length) {
        ShowToast({ message: "Category is required", variant: "error" });
      }
    },
    [
      inputData,
      badgeInputData,
      name,
      company,
      first_name,
      last_name,
      qr_code,
      unique_code,
      date,
      date_1712549905301,
      order_id_1712558191795,
      previewString,
      openMbadge,
      openPbadge,
    ]
  );

  const onBadgeDelete = (name) => {
    // if (name === "qr_code") {
    //     setQrDimension({});
    // } else if (name === "first_name") {
    //     setFDimension({});
    // } else if (name === "last_name") {
    //     setLDimension({});
    // }
  };

  const submitBadgeData = (dataToBeSubmit, cb) => {
    let methodCall = dataToBeSubmit?.id ? UpdateApiCall : PostApiCall;
    // console.log(dataToBeSubmit)
    setIsLoading(true);
    methodCall(
      EndPoint?.createBadge(event?.id),
      dataToBeSubmit,
      (cbData) => {
        setIsLoading(false);
        if (cbData?.success) {
          let mBadge = document?.getElementById("createMbadge");
          let pBadge = document?.getElementById("createPbadge");
          if (mBadge) {
            mBadge?.click();
          } else if (pBadge) {
            pBadge?.click();
          }
          if (cb) cb();
          setBadgeInputData({
            title: "",
            template: "",
            image: "",
            type: "",
            is_contact_card: false,
            font: "roboto",
            formate: "",
          });
          setNDimension({});
          setCDimension({});
          setUCDimension({});
          setFDimension({});
          setLDimension({});
          setQrDimension({});
          setDDimension({ start_date: {}, end_date: {} });
          setCDDimension({});
          setOIDimension({});
          setSelectedBadge({});
        }
      },
      () => {
        setIsLoading(false);
      }
    );
  };

  const onChangeBadgeDimension = useCallback((e) => {
    const { name, value } = e?.target;
    if (name === "name") {
      setNDimension(value);
    } else if (name === "first_name") {
      setFDimension(value);
    } else if (name === "last_name") {
      setLDimension(value);
    } else if (name === "qr_code") {
      setQrDimension(value);
    } else if (name === "unique_code") {
      setUCDimension(value);
    } else if (name === "company") {
      setCDimension(value)
    } else if (name === "date_1712549905301") {
      setCDDimension(value)
    } else if (name === "order_id_1712558191795") {
      setOIDimension(value)
    }
  }, []);

  const onChangeBadge = useCallback(
    (e) => {
      const { name, value } = e?.target;
      setBadgeInputData({
        ...badgeInputData,
        [name]: value,
      });
    },
    [badgeInputData]
  );

  const onChange = useCallback(
    (e) => {
      const { name, value } = e?.target;
      setInputData({
        ...inputData,
        [name]: value,
      });
    },
    [inputData]
  );

  const onChangeFile = async (file, keyName) => {
    Utils?.validateImageResolution(file, async (data) => {
      if (file?.size && data) {
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
            [keyName]: res?.data?.response?.url,
          });
          setBadgeInputData({
            ...badgeInputData,
            image: res?.data?.response?.url,
          });
        } else if (!res?.success && res?.errors?.media?.length) {
          setIsLoading(false);
          ShowToast({
            message: res?.errors?.media?.toString(),
            variant: "error",
          });
        }
      } else if (file?.size && !data) {
        ShowToast({
          message: "Image Resolution not valid",
          variant: "info",
        });
      }
    });
  };

  const onFilter = useCallback(
    (id, fetchData = true) => {
      if (!filteredCat?.includes(id)) {
        if (fetchData) getBadgeList([...filteredCat, id]);
        setFilteredCat([...filteredCat, id]);
      } else if (filteredCat?.includes(id)) {
        const findIndex = filteredCat?.findIndex((e) => e === id);
        filteredCat.splice(findIndex, 1);
        if (fetchData) getBadgeList([...filteredCat]);
        setFilteredCat([...filteredCat]);
      }
    },
    [filteredCat]
  );

  const onPreview = useCallback((id, removeBy) => {
    let dom = document.getElementById(id);
    if (dom) {
      let out = Utils?.removeHtml(dom?.outerHTML, removeBy);
      setOpenPreview(true);
      setPreviewString(out);
    }
  }, []);

  const onMedit = useCallback(
    (data, cb = null) => {
      let cats = [];
      if (data?.categories?.length) {
        data?.categories?.map(({ id }) => {
          cats.push(id);
        });
      }
      if (cb) cb(cats);
      setOpenMbadge(true);
      setSelectedBadge(data);
      setInputData({ ...inputData, mImg: data?.image });
    },
    [inputData]
  );

  const onPedit = useCallback((data) => {
    setOpenPbadge(true);
    setSelectedBadge(data);
    setInputData({ ...inputData, pImg: data?.image });
  }, []);

  const onDownloadBadge = useCallback(async (data) => {
    setIsLoading(true);
    const objData = await downlaodFile(
      EndPoint?.downloadBadge(event?.id, data)
    );
    const blob = await objData?.blob();
    Utils?.downloadFileByBlob(blob, "badge-image");
    setIsLoading(false);
  }, []);

  const onDuplicateBadge = useCallback((data, cb = null) => {
    setIsLoading(true);
    PostApiCall(
      EndPoint?.duplicateBadge(event?.id, data),
      {},
      (cbData) => {
        setIsLoading(false);
        if (cbData?.success) {
          if (cb) cb();
        }
      },
      () => {
        setIsLoading(false);
      }
    );
  }, []);

  const onDeleteBadge = useCallback((data, cb = null) => {
    setIsLoading(true);
    DeleteApiCall(
      EndPoint?.deleteBadge(event?.id, data),
      (cbData) => {
        setIsLoading(false);
        if (cbData?.success) {
          if (cb) cb();
        }
      },
      () => {
        setIsLoading(false);
      }
    );
  }, []);

  const getCategories = () => {
    setIsLoading(true);
    GetApiCall(
      EndPoint?.getBadgeCategories(event?.id),
      (cbData) => {
        setIsLoading(false);
        if (cbData?.success) {
          setCategories(cbData?.data?.response);
        }
      },
      (errData) => {
        setIsLoading(false);
      },
      false
    );
  };

  // const getBadges = (categories = []) => {
  //     PostApiCall(EndPoint?.getBadgeCategories(event?.id), { filters: { categories } }, (cbData) => {
  //         if (cbData?.success) {
  //             // setBadges(cbData?.data?.response);
  //         }
  //     }, (errData) => { }, false);
  // }

  const convertToAnArray = (obj) => {
    let arr = Object.entries(obj) || [];
    let tempArr = [];
    if (arr?.length) {
      arr?.map(([key, value]) => {
        let fields = {
          add_id: `addButton-${key === "qr_code" ? "QRCode" : value}`,
          add_text: `${value}`,
          delete_id: `deleteButton-${key === "qr_code" ? "QRCode" : value}`,
          icon: key === "qr_code" ? "QRCodeIcon" : "NameUserIcon"
        };
        tempArr.push(fields);
      });
      setBadgeFieldsBtn(tempArr);
    }
  }

  const getConfig = () => {
    setIsLoading(true);
    GetApiCall(
      EndPoint?.badgeConfigs(event?.id),
      (cbData) => {
        setIsLoading(false);
        if (cbData?.success) {
          let Fields = cbData?.data?.response?.fields?.default;
          let modifiedFields = { ...Fields };
          delete modifiedFields?.event_date;
          modifiedFields.qr_code = "QR Code";
          convertToAnArray(modifiedFields);
          setBadgeConfig(cbData?.data?.response);
          setInputData({
            ...inputData,
            pImg: cbData?.data?.response?.config?.pbadge?.image,
            mImg: cbData?.data?.response?.config?.mbadge?.image,
          });
        }
      },
      (errData) => {
        setIsLoading(false);
      },
      false
    );
  };



  const getBadgeList = (categories = []) => {
    setIsLoading(true);
    PostApiCall(
      EndPoint?.badgeList(event?.id),
      { filters: { categories } },
      (cbData) => {
        setIsLoading(false);
        if (cbData?.success) {
          let res = cbData?.data?.response || [];
          let mbadge = [],
            pbadge = [];
          res?.map((e) => {
            if (e?.type === "pbadge") {
              pbadge.push(e);
            } else if (e?.type === "mbadge") {
              mbadge.push(e);
            }
          });
          setBadges({ pBadges: pbadge, mBadges: mbadge });
        }
      },
      (errData) => {
        setIsLoading(false);
      },
      false
    );
  };

  useEffect(() => {
    if (!propsData?.preventApi) {
      getConfig();
      getBadgeList();
      getCategories();
      // getBadges();
      // setIsLoading(false);
    }
  }, []);

  return {
    openMbadge,
    setOpenMbadge,
    openPbadge,
    setOpenPbadge,
    onMedit,
    onPedit,
    categories,
    onFilter,
    filteredCat,
    inputData,
    onChangeFile,
    badgeInputData,
    onChange,
    onChangeBadge,
    onChangeBadgeDimension,
    onCreateBadge,
    setBadgeInputData,
    selectedBadgeData,
    onPreview,
    openPreView,
    setOpenPreview,
    previewString,
    setPreviewString,
    setSelectedBadge,
    badges,
    setInputData,
    setNDimension,
    setCDimension,
    setUCDimension,
    setFDimension,
    setLDimension,
    setDDimension,
    setQrDimension,
    setCDDimension,
    setOIDimension,
    onBadgeDelete,
    onDownloadBadge,
    getBadgeList,
    setFilteredCat,
    onDuplicateBadge,
    onDeleteBadge,
    submitBadgeData,
  };
};
export default useMbadge;
