import { useState, useCallback, useEffect, useRef } from "react";
import { onFileUpload } from "@/Api/OnDataSend";
import useEventStore from "@/Store/useEventStore";
import useUserStore from "@/Store/useUserStore";
import ShowToast from "@/Toaster/Toaster";
import Utils from "@/Utils/Utils";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import useCommonStore from "@/Store/useCommonStore";
import { GetApiCall, PostApiCall } from "@/Api/ApiCall";
import EndPoint from "@/Api/EndPoint";
// import { abortFetch } from "@/Api/FetchInstance";

const useCreateEvent = () => {
  const router = useRouter();
  const { user } = useUserStore();
  const {
    event,
    setEvent,
    mapData,
    createEventSetting,
    eventForm,
    setEventForm,
    questions,
    setQuestions,
    setMapData,
    setIsEventUpdated,
  } = useEventStore();

  const { isLoading, setIsLoading, timezones } = useCommonStore();

  const dropPatternRef = useRef(null);
  const patternBGRef = useRef(null);

  const dropColorRef = useRef(null);
  const colorBGRef = useRef(null);

  const categoryDdlRef = useRef(null);
  const categoryRef = useRef(null);

  const categoryDropRef = useRef(null);
  const categoryButtonRef = useRef(null);

  const dropTypefaceRef = useRef(null);
  const typefaceRef = useRef(null);

  const btnRef = useRef(null);
  const modalRef = useRef(null);

  const btnTimeRef = useRef(null);
  const modalTimeRef = useRef(null);

  const locationRef = useRef(null);
  const mapLoactionRef = useRef(null);

  // const [inputData, setInputData] = useState({ name: event?.name || "", description: event?.description || "", start_date: dayjs()?.format("YYYY-MM-DD"), end_date: dayjs()?.format("YYYY-MM-DD"),start_time:event?.start_time || '00:00', end_time:event?.end_time || '00:00', location: event?.location || "", time_zone: event?.time_zone || "Asia/Kolkata", categories: event?.categories || [], pattern: event?.pattern || "Cross", color: event?.color || "#939597", type_face: event?.type_face || "Default", layout: event?.layout || "Top/Bottom", theme: event?.theme || "minimal", user_id: user?._id || "", catName: "", catDes: "", avatar: "", imgId: "" })

  const [inputData, setInputData] = useState({
    event_id: event?.id || "",
    title: event?.title || "",
    // description: event?.description || "",
    description: event?.description || [
      { name: "Description", content: "", status: 1 },
    ],
    start_date: event?.start_date
      ? dayjs(event?.start_date)?.format("YYYY-MM-DD")
      : dayjs()?.format("YYYY-MM-DD"),
    end_date: event?.end_date
      ? dayjs(event?.end_date)?.format("YYYY-MM-DD")
      : dayjs()?.format("YYYY-MM-DD"),
    start_time: event?.start_date
      ? dayjs(event?.start_date)?.format("HH:mm")
      : "00:00",
    end_time: event?.end_date
      ? dayjs(event?.end_date)?.format("HH:mm")
      : "00:30",
    location: event?.location || "",
    timezone: event?.timezone || "Asia/Kolkata",
    map_data: event?.map_data || {},
    address: event?.address || "",
    address_1: event?.address_1 || "",
    event_type: event?.event_type || "",
    categories: event?.categories || [],
    pattern: event?.pattern || "Cross",
    color: event?.color || "#e8e8e8",
    font: event?.font || "inter",
    // font: event?.font === 'inter' ? 'default' : event?.font || "inter",
    layout: event?.layout || "Top/Bottom",
    theme: event?.theme || "minimal",
    catName: "",
    catDes: "",
    banner: event?.banner || "",
    country_code: event?.country_code || "IN#91",
    phone: event?.phone || "",
    email: event?.email || "",
  });

  const [openProfile, setOpenProfile] = useState(false);
  const [openLocation, setOpenLocation] = useState(false);
  const [currentTab, setCurrentTab] = useState({ activeTab: 0 });
  const [tabData, setTabData] = useState(["Layout", "Theme"]);

  const [badgeData, setBadgeData] = useState(["General", "Design & Fields"]);

  const [isClient, setIsClient] = useState(false);
  const [openCatModal, setOpenCatModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openPattern, setOpenPattern] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openTypeface, setOpenTypeface] = useState(false);
  const [showTimeZone, setShowTimeZone] = useState(false);
  const [timeZoneList, setTimeZoneList] = useState([]);
  const [existedCategory, setExistedCategory] = useState([]);

  const isDescValid = (desc) => {
    if (desc?.length) {
      const arr = desc?.filter((e) => !e?.name?.trim() || !e?.content?.trim());
      return !arr?.length;
    }
    // else{
    //   return (true);
    // }
  };

  const isDataValid = async (isCreateEvent) => {
    const {
      title,
      description,
      start_date,
      end_date,
      event_type,
      categories,
      address,
    } = inputData;
    let isValid = true;
    if (!title) {
      isValid = false;
      ShowToast({ message: "Event Name can't be blank.", variant: "error" });
    } else if (!isDescValid(description)) {
      isValid = false;
      ShowToast({
        // message: "Event description can't be blank.",
        message: "Please provide tab name and tab description.",
        variant: "error",
      });
    } else if (!start_date) {
      isValid = false;
      ShowToast({
        message: "Event start date can't be blank.",
        variant: "error",
      });
    } else if (!end_date) {
      isValid = false;
      ShowToast({
        message: "Event end date can't be blank.",
        variant: "error",
      });
    } else if (!address) {
      isValid = false;
      ShowToast({ message: "Address can't be blank.", variant: "error" });
    } else if (!event_type) {
      isValid = false;
      ShowToast({ message: "Event type can't be blank.", variant: "error" });
    } else if (isCreateEvent && !categories?.length) {
      isValid = false;
      ShowToast({
        message: "Category matrix can't be blank.",
        variant: "error",
      });
    }
    return isValid;
  };

  const onAddCategory = useCallback(
    (e) => {
      e.preventDefault();
      if (!existedCategory?.includes(inputData?.catName?.trim())) {
        if (
          inputData?.catName?.trim() &&
          inputData?.catName?.length > 2 &&
          (!inputData?.catDes?.trim() ||
            (inputData?.catDes?.length >= 20 &&
              inputData?.catDes?.length <= 160))
        ) {
          setInputData({
            ...inputData,
            categories: [
              ...inputData?.categories,
              {
                title: inputData?.catName,
                description: inputData?.catDes,
                // order: inputData?.categories?.length
              },
            ],
            catName: "",
            catDes: "",
          });
          setExistedCategory([...existedCategory, inputData?.catName]);
          setOpenCatModal(false);
        } else if (!inputData?.catName || inputData?.catName?.length < 3) {
          ShowToast({
            message: "Category name must have 3 characters long",
            variant: "error",
          });
        } else if (!inputData?.catDes || inputData?.catDes?.length < 20) {
          ShowToast({
            message: "Category description must be minimum 20 characters long",
            variant: "error",
          });
        } else if (!inputData?.catDes || inputData?.catDes?.length > 160) {
          ShowToast({
            message: "Category description must be maximum 160 characters long",
            variant: "error",
          });
        }
      } else {
        ShowToast({
          message: "Category name must be unique",
          variant: "error",
        });
      }
    },
    [inputData]
  );

  const onCloseCatModal = useCallback(() => {
    setInputData({
      ...inputData,
      catName: "",
      catDes: "",
    });
    setOpenCatModal(false);
  }, [inputData]);

  const onCreateEvent = useCallback(
    async (e, type = "createEvent", isCreateEvent = true, cb = () => { }) => {
      if (e?.preventDefault) e.preventDefault();
      if (await isDataValid(isCreateEvent)) {
        setIsLoading(true);
        setIsEventUpdated(false);
        const submittedData = {
          // ...inputData,
          event_id: inputData?.event_id,
          title: inputData?.title,
          description: inputData?.description,
          address: inputData?.address,
          address_1: inputData?.address_1,
          banner: inputData?.banner,
          color: inputData?.color,
          event_type: inputData?.event_type,
          layout: inputData?.layout,
          // pattern:inputData?.pattern,
          theme: inputData?.theme,
          timezone: inputData?.timezone,
          // categories: inputData?.categories,

          // map_data: mapData,
          font: inputData?.font?.toLowerCase(),
          start_date: `${inputData?.start_date} ${inputData?.start_time}:00`,
          end_date: `${inputData?.end_date} ${inputData?.end_time}:00`,
          // support_details: { country_code: inputData?.country_code, phone: inputData?.phone, email: inputData?.email }
        };

        if (isCreateEvent) {
          submittedData.categories = inputData?.categories;
          // submittedData.map_data = {
          //   lat: mapData?.geometry?.location?.lat(),
          //   lng: mapData?.geometry?.location?.lng(),
          // };
        }
        if (mapData?.place_id) {
          submittedData.map_data = {
            lat: mapData?.geometry?.location?.lat(),
            lng: mapData?.geometry?.location?.lng(),
          };
          submittedData.address = mapData?.name;
        } else {
          submittedData.map_data = {
            lat: inputData?.map_data?.lat,
            lng: inputData?.map_data?.lng,
          };
        }
        PostApiCall(
          EndPoint?.[type](inputData?.event_id),
          submittedData,
          (cbData) => {
            if (cbData?.success) {
              if (document.getElementById("close-btn"))
                document.getElementById("close-btn")?.click();
              setEvent(cbData?.data?.response);
              Utils?.saveCookie("event_id", cbData?.data?.response?.id);
              setIsLoading(false);
              router.push("/event");
            } else {
              setIsLoading(false);
            }
            setIsEventUpdated(true);
            cb();
          },
          (errCb) => {
            setIsLoading(false);
            setIsEventUpdated(true);
            cb();
          }
        );
      }
    },
    [inputData, mapData]
  );

  const onChange = useCallback(
    (e) => {
      setInputData(Utils?.onChangeInputData(e, inputData));
    },
    [inputData]
  );

  const handleClickOpen = useCallback(() => {
    setOpenProfile(!openProfile);
  }, [openProfile]);

  const handleTimeZone = useCallback(() => {
    setShowTimeZone(!showTimeZone);
  }, [showTimeZone]);

  const handleLocationOpen = useCallback(() => {
    setOpenLocation(!openLocation);
  }, [openLocation]);

  const onTabChange = useCallback((tab) => {
    setCurrentTab(tab);
  }, []);

  const handlePatternOpen = useCallback(() => {
    setOpenPattern(!openPattern);
  }, [openPattern]);

  const handleTypefaceOpen = useCallback(() => {
    setOpenTypeface(!openTypeface);
  }, [openTypeface]);

  const handleColorOpen = useCallback(() => {
    setOpenColor(!openColor);
  }, [openColor]);

  const handleCategoryOpen = useCallback(() => {
    setOpenCategory(!openCategory);
  }, [openCategory]);

  const factorTimezones = () => {
    if (timezones) {
      let list = [];
      let keys = Object?.keys(timezones);
      for (let i = 0; i < keys?.length; i++) {
        list.push({
          // label: Object.values(timezones)[i]?.replace(/\(([^)]+)\)\s*(.+)/, '$2 ($1)')?.replace(/[()]/g, ''),
          label: Object.values(timezones)[i]?.replace(/[()]/g, ""),
          value: Object.keys(timezones)[i],
        });
      }
      setTimeZoneList(list);
    }
  };

  const updateBanner = (url, cb) => {
    PostApiCall(
      EndPoint?.updateBanner(event?.id),
      { banner: url },
      (cbData) => {
        if (cbData?.success) {
          setEvent({ ...event, banner: url });
          setIsLoading(false);
          setIsOpen(false);
          if (cb) cb(url);
        }
      },
      (errCb) => {
        setIsLoading(false);
        setIsOpen(false);
      }
    );
  };

  const onChangeFile = async (file, cb = null) => {
    if (file?.size) {
      setIsLoading(true);
      let formData = new FormData();
      formData.append("media", file);
      formData.append("type", "image");
      const res = await onFileUpload("uploadMedia", formData);
      setIsLoading(false);
      if (res?.success) {
        if (event?.id) updateBanner(res?.data?.response?.url, cb);
        setIsOpen(false);
        setIsLoading(false);
        setInputData({
          ...inputData,
          banner: res?.data?.response?.url,
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

  const saveForm = useCallback(
    (suggestiveQuesArr, customQuesArr, cb = null) => {
      let combineArr = [...suggestiveQuesArr, ...customQuesArr];
      let arr = [];
      let prev_names = {};
      for (let i = 0; i < eventForm?.fields?.length; i++) {
        if (eventForm?.fields[i]?.id) {
          prev_names[eventForm?.fields[i]?.id] = eventForm?.fields[i]?.name;
        }
      }
      for (let i = 0; i < combineArr.length; i++) {
        let temp = {
          display_order: eventForm?.fields?.length + i + 1,
          id: combineArr[i]?.id || "",
          name: combineArr[i]?.id
            ? prev_names[combineArr[i]?.id]
            : combineArr[i]?.fieldName
              ?.trimEnd()
              ?.replaceAll(/\s/g, "_")
              .toLowerCase()?.substring(0, 10) +
            "_" +
            Date.now(),
          label: combineArr[i]?.fieldName,
          type: combineArr[i]?.type,
          validation_as: combineArr[i]?.validation_as,
          placeholder: "custom field",
          required: combineArr[i]?.isRequired,
          readonly: false,
          status: true,
          // unique: combineArr[i]?.isCustomField
          //   ? combineArr[i]?.isUnique
          //   : false,
          unique: combineArr[i]?.isCustomField || (!combineArr[i]?.isCustomField && combineArr[i]?.validation_as === 'phone')
            ? (combineArr[i]?.isUnique || false)
            : false,
          field_type: combineArr[i]?.isCustomField ? "custom" : "optional",
          value: "",
          is_multiple:
            combineArr[i]?.validation_as === "multiple_select" ? true : false,
          options:
            combineArr[i]?.type === "select" && combineArr[i]?.isCustomField
              ? combineArr[i]?.options?.map((obj) => {
                return {
                  text: obj.label,
                  value: obj.label.toLowerCase(),
                };
              })
              : [],
        };
        if (!combineArr[i]?.isCustomField) {
          temp.name = combineArr[i]?.fieldName
            ?.trimEnd()
            ?.replaceAll(/\s/g, "_")
            .toLowerCase();
        }
        arr.push(temp);
      }
      let body = {
        fields: arr,
      };
      if (event?.id && body.fields?.length) {
        setIsLoading(true);
        PostApiCall(
          EndPoint?.saveForm(event?.id),
          body,
          (cbData) => {
            if (cbData?.success) {
              //   let response = cbData?.data?.response?.fields;
              //   let arr = [...eventForm?.fields, ...response];
              //   let formdata = eventForm;
              //   formdata["fields"] = arr;
              //   setEventForm({ ...formdata });
              getEventForm();
              setIsLoading(false);
              if (cb) cb();
            } else {
              if (cb) cb();
              setIsLoading(false);
            }
          },
          (errData) => {
            setIsLoading(false);
          }
        );
      }
    },
    [eventForm]
  );

  const getEventForm = () => {
    setIsLoading(true);
    GetApiCall(EndPoint?.getForm(event?.id), (cbData) => {
      if (cbData?.success) {
        setEventForm(cbData?.data?.response);
      }
      setIsLoading(false);
    });
  };

  const editQuestion = (ques, cb = null) => {
    let arr = [];
    for (let i = 0; i < questions?.length; i++) {
      if (questions[i]?.id === ques[0]?.id) {
        let obj = {
          ...questions[i],
          label: ques[0]?.fieldName,
          required: ques[0]?.isRequired,
          unique: ques[0]?.isUnique,
          options: ques[0]?.options.map((obj) => {
            return {
              text: obj.label,
              value: obj.label.toLowerCase(),
            };
          }),
        };
        arr.push(obj);
      }
    }
    let body = {
      fields: arr,
    };
    if (event?.id && body.fields?.length) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.saveForm(event?.id),
        body,
        (cbData) => {
          if (cbData?.success) {
            let response = cbData?.data?.response?.fields;
            let arr = [...eventForm?.fields];
            let formdata = eventForm;
            for (let k = 0; k < arr?.length; k++) {
              if (arr[k]?.id === response[0]?.id) {
                arr[k] = response[0];
              }
            }
            formdata["fields"] = arr;
            setEventForm({ ...formdata });
            setIsLoading(false);
            if (cb) cb();
          } else {
            if (cb) cb();
            setIsLoading(false);
          }
        },
        (errData) => {
          setIsLoading(false);
        }
      );
    }
  };

  const makeEmailUnique = (ques, cb) => {
    let arr = [ques];
    let body = {
      fields: arr,
    };
    if (event?.id && body.fields?.length) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.saveForm(event?.id),
        body,
        (cbData) => {
          setIsLoading(false);
          if (cbData?.success) {
            if (cb) cb();
          } else {
            if (cb) cb();
          }
        },
        (errData) => {
          if (cb) cb();
          setIsLoading(false);
        }
      );
    }
  };

  const handleDeleteQuestion = (ques, cb = null) => {
    let arr = eventForm;
    let body = {
      id: ques[0]?.id,
    };

    if (event?.id) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.deleteFormQues(event?.id),
        body,
        (cbData) => {
          if (cbData?.success) {
            let fields = arr?.fields?.filter((item) => {
              return item.id !== ques[0].id;
            });
            arr["fields"] = fields;
            setEventForm({ ...arr });
            // handleOrderChange(arr);
            setIsLoading(false);
            if (cb) cb();
          } else {
            if (cb) cb();
            setIsLoading(false);
          }
        },
        (errData) => {
          setIsLoading(false);
        }
      );
    }
  };

  const handleOrderChange = (arr, cb = null) => {
    setQuestions(arr);
    let default_fields = [];
    eventForm?.fields?.map((e) => {
      if (e?.field_type === "default") {
        default_fields.push({
          ...e,
        });
      }
    });
    for (let i = 0; i < arr?.length; i++) {
      arr[i]["display_order"] = default_fields?.length + i + 1;
    }
    let body = {
      fields: [...default_fields, ...arr],
    };

    if (event?.id && body.fields?.length) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.saveForm(event?.id),
        body,
        (cbData) => {
          if (cbData?.success) {
            let response = cbData?.data?.response?.fields;
            let arr = [...response];
            let formdata = eventForm;
            formdata["fields"] = arr;
            setEventForm(formdata);
            setIsLoading(false);
            if (cb) cb();
          } else {
            if (cb) cb();
            setIsLoading(false);
          }
        },
        (errData) => {
          setIsLoading(false);
        }
      );
    }
  };

  useEffect(() => {
    if (mapData?.formatted_address) {
      setInputData({
        ...inputData,
        address: mapData?.name,
      });
    }
  }, [mapData?.formatted_address]);

  useEffect(() => {
    setInputData({
      ...inputData,
      banner: createEventSetting?.theme_meta?.banner,
    });
    setIsLoading(false);
  }, [createEventSetting?.theme_meta?.banner]);

  useEffect(() => {
    Utils?.removeModal(btnRef, modalRef, () => {
      setOpenProfile(false);
    });
    Utils?.removeModal(btnTimeRef, modalTimeRef, () => {
      setShowTimeZone(false);
    });
    Utils?.removeModal(locationRef, mapLoactionRef, () => {
      setOpenLocation(false);
    });

    Utils?.removeModal(patternBGRef, dropPatternRef, () => {
      setOpenPattern(false);
    });

    Utils?.removeModal(colorBGRef, dropColorRef, () => {
      setOpenColor(false);
    });

    Utils?.removeModal(categoryRef, categoryDdlRef, () => {
      setOpenCategory(false);
    });

    Utils?.removeModal(categoryButtonRef, categoryDropRef, () => {
      setOpenCategory(false);
    });

    Utils?.removeModal(typefaceRef, dropTypefaceRef, () => {
      setOpenTypeface(false);
    });
  }, [
    btnRef,
    modalRef,
    btnTimeRef,
    modalTimeRef,
    handleTimeZone,
    categoryRef,
    categoryDdlRef,
    openCategory,
    setOpenCategory,
    patternBGRef,
    typefaceRef,
    dropColorRef,
    dropTypefaceRef,
    dropPatternRef,
    colorBGRef,
    openTypeface,
    setOpenTypeface,
    setOpenColor,
    locationRef,
    mapLoactionRef,
    categoryButtonRef,
    categoryDropRef,
  ]);

  useEffect(() => {
    factorTimezones();
    setIsClient(true);
    setIsLoading(false);
    // setMapData({});
    // return (() => {
    //   abortFetch();
    // })
  }, []);

  return {
    categoryRef,
    categoryDdlRef,
    openCategory,
    setOpenCategory,
    handleCategoryOpen,
    handleTypefaceOpen,
    typefaceRef,
    dropTypefaceRef,
    openTypeface,
    setOpenTypeface,
    dropPatternRef,
    openPattern,
    patternBGRef,
    handlePatternOpen,
    colorBGRef,
    setOpenColor,
    openColor,
    dropColorRef,
    handleColorOpen,
    openProfile,
    currentTab,
    onTabChange,
    handleClickOpen,
    handleTimeZone,
    tabData,
    badgeData,
    user,
    isClient,
    btnRef,
    modalRef,
    btnTimeRef,
    modalTimeRef,
    inputData,
    onChange,
    onCreateEvent,
    onAddCategory,
    openCatModal,
    setOpenCatModal,
    onCloseCatModal,
    isOpen,
    setIsOpen,
    openLocation,
    handleLocationOpen,
    locationRef,
    mapLoactionRef,
    isLoading,
    setInputData,
    showTimeZone,
    timeZoneList,
    saveForm,
    editQuestion,
    onChangeFile,
    handleDeleteQuestion,
    handleOrderChange,
    categoryButtonRef,
    categoryDropRef,
    makeEmailUnique,
  };
};
export default useCreateEvent;
