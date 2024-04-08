import { useState, useEffect, useRef } from "react";
import ShowToast from "@/Toaster/Toaster";
import useCategoryMatrixStore from "@/Store/useCategoryMatrixStore";
import useCommonStore from "@/Store/useCommonStore";
import { downlaodFile, onDataSubmit } from "@/Api/OnDataSend";
import useEventStore from "@/Store/useEventStore";
import { GetApiCall, PostApiCall } from "@/Api/ApiCall";
import EndPoint from "@/Api/EndPoint";
import Utils from "@/Utils/Utils";
import dayjs from "dayjs";
const useCategoryMatrix = () => {
  const {
    setCategories,
    selectedCategory,
    setSelectedCategory,
    setGuestsList,
    setGuestCount,
  } = useCategoryMatrixStore();

  const { event } = useEventStore();

  const [categoryData, setCategoryData] = useState([]);

  const [newCategory, setNewCategory] = useState({
    id: "",
    title: "",
    description: "",
    capacity: 0,
    status: 0,
    subcategory: [],
    display_order: null,
  });

  const [newSubCategory, setNewSubCategory] = useState({
    id: "",
    title: "",
    description: "",
    // price: 0,
    // currency_type: "",
    capacity: 0,
    display_order: null,
    status: 0,
  });

  const [selectedSubCat, setSelectedSubCat] = useState({});

  const [openModal, setOpenModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);
  const [openModal2, setOpenModal2] = useState(false);
  const { setIsLoading, localizations } = useCommonStore();

  const isDataValid = async (val) => {
    const { title, description } = newCategory;
    const {
      title: sub_category_name,
      description: sub_category_description,
      // price,
      // currency_type: currency,
    } = newSubCategory;
    let isValid = true;
    switch (val) {
      case "1":
        if (!title) {
          isValid = false;
          ShowToast({
            message: "Category name can't be blank",
            variant: "error",
          });
        } else if (description?.length && description?.length < 20) {
          isValid = false;
          ShowToast({
            message: "Category description must be minimum 20 characters long",
            variant: "error",
          });
        }
        break;
      case "2":
        if (!sub_category_name) {
          isValid = false;
          ShowToast({
            message: "Sub-Category name can't be blank.",
            variant: "error",
          });
        } else if (
          sub_category_description?.length &&
          sub_category_description?.length < 20
        ) {
          isValid = false;
          ShowToast({
            message:
              "Sub-Category description must be minimum 20 characters long",
            variant: "error",
          });
        }
        break;
      case "3":
        if (!selectedSubCat?.title) {
          isValid = false;
          ShowToast({
            message: "Sub-Category Name can't be blank.",
            variant: "error",
          });
        } else if (
          selectedSubCat?.description?.length &&
          selectedSubCat?.description?.length < 20
        ) {
          isValid = false;
          ShowToast({
            message:
              "Sub-Category description must be minimum 20 characters long",
            variant: "error",
          });
        }
      default:
        break;
    }

    return isValid;
  };

  const fetchCategories = () => {
    let body = {
      //event_id : "4d6a593d",
    };
    if (event?.id) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.getCategories(event?.id),
        body,
        (cbData) => {
          setIsLoading(false);
          if (cbData?.success) {
            // set category data with response object
            setCategoryData(cbData?.data?.response);
          }
        },
        (errData) => {
          setIsLoading(false);
        },
        false
      );
    }
  };

  const addNewCategory = async () => {
    if (await isDataValid("1")) {
      let body = {
        title: newCategory.title,
        description: newCategory.description,
      };

      if (event?.id) {
        setIsLoading(true);
        PostApiCall(
          EndPoint?.addCategory(event?.id),
          body,
          (cbData) => {
            if (cbData?.success) {
              fetchCategories();
              setOpenModal(false);
              resetNewCategory();
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          },
          (errData) => {
            setIsLoading(false);
          }
        );
      }
    }
  };

  const updateCategory = async () => {
    if ((await isDataValid("1")) && newCategory.id) {
      let body = {
        id: newCategory.id,
        title: newCategory.title,
        description: newCategory.description,
      };

      if (event?.id) {
        setIsLoading(true);
        PostApiCall(
          EndPoint?.updateCategory(event?.id),
          body,
          (cbData) => {
            if (cbData?.success) {
              //fetchCategories();
              setCategoryData((current) =>
                current.map((obj) =>
                  obj.id === newCategory.id
                    ? {
                        ...obj,
                        title: newCategory.title,
                        description: newCategory.description,
                      }
                    : obj
                )
              );
              setOpenModal(false);
              resetNewCategory();
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          },
          (errData) => {
            setIsLoading(false);
          }
        );
      }
    }
  };

  const resetNewCategory = () => {
    setNewCategory({
      id: "",
      title: "",
      description: "",
      capacity: 0,
      status: 0,
      subcategory: [],
    });
  };

  const resetNewSubCategory = () => {
    setNewSubCategory({
      id: "",
      title: "",
      description: "",
      // price: 0,
      // currency_type: "",
      capacity: 0,
      display_order: null,
      status: 0,
    });
  };

  const addNewSubCategory = async () => {
    if ((await isDataValid("2")) && selectedCat?.id) {
      let body = {
        parent_id: selectedCat?.id,
        title: newSubCategory.title,
        description: newSubCategory.description,
      };
      // let flag = false;
      // for (let i = 0; i < categoryData.length; i++) {
      //   if (categoryData[i].id === selectedCatId) {
      //     if (
      //       !categoryData[i]?.subcategory?.length &&
      //       categoryData[i]?.status === 0
      //     ) {
      //       flag = true;
      //     } else if (categoryData[i]?.subcategory?.length > 0) {
      //       let count = 0;
      //       for (let j = 0; j < categoryData[i]?.subcategory?.length; j++) {
      //         if (categoryData[i]?.subcategory[j]?.status === 1) count++;
      //       }
      //       if (count === 0) flag = true;
      //     }
      //   }
      // }

      if (event?.id) {
        setIsLoading(true);
        PostApiCall(
          EndPoint?.addSubCategory(event?.id),
          body,
          (cbData) => {
            if (cbData?.success) {
              //if (flag) handleStatusToggleClick(`divid-${selectedCatId}`);
              fetchCategories();
              setOpenModal2(false);
              setSelectedCat(null);
              resetNewSubCategory();
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          },
          (errData) => {
            setIsLoading(false);
          }
        );
      }
    }
  };

  const handleStatusToggleClick = (divid) => {
    const parentDiv = document.getElementById(divid);
    if (parentDiv) {
      const toggleInput = Array.from(
        parentDiv.getElementsByTagName("input")
      )[0];
      toggleInput.click();
    }
  };

  const updateSubCategory = async (cb = null) => {
    if (selectedSubCat?.id && (await isDataValid("3"))) {
      //console.log("selected sub cat : ", selectedSubCat);
      let body = {
        id: selectedSubCat?.id,
        title: selectedSubCat?.title,
        description: selectedSubCat?.description,
        capacity_unlimited: selectedSubCat?.capacity_unlimited,
        start_date: dayjs(selectedSubCat?.start_date).format(
          "YYYY-MM-DD HH:mm:ss"
        ),
        end_date: dayjs(selectedSubCat?.end_date).format("YYYY-MM-DD HH:mm:ss"),
        capacity: selectedSubCat?.capacity,
        currency_type: selectedSubCat?.currency_type,
        price: selectedSubCat?.price ? selectedSubCat?.price : 0,
        timezone:
          event?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      };
      //console.log(body);
      if (event?.id) {
        setIsLoading(true);
        PostApiCall(
          EndPoint?.editSubCategory(event?.id),
          body,
          (cbData) => {
            if (cbData?.success) {
              fetchCategories();
              if (cb) cb();
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          },
          (errData) => {
            setIsLoading(false);
          }
        );
      }
    }
  };

  const categoryStatusChange = (val, catId, isSubcategory, subcatId) => {
    if (val !== null) {
      let body = {
        id: isSubcategory ? subcatId : catId,
        status: val ? 1 : 0,
      };
      if (event?.id) {
        setIsLoading(true);
        PostApiCall(
          isSubcategory
            ? EndPoint?.changeSubCategoryStatus(event?.id)
            : EndPoint?.changeCategoryStatus(event?.id),
          body,
          (cbData) => {
            if (cbData?.success) {
              //fetchCategories();
              //   let response_obj ;
              //   setCategoryData((current) =>
              //   current.map((obj) =>
              //     obj.id === catId ? { ...response_obj } : obj
              //   )
              // );
              setIsLoading(false);
            } else {
              setIsLoading(false);
            }
          },
          (errData) => {
            setIsLoading(false);
          }
        );
      }
    }
  };

  const deleteSubcategory = (catid, subcatid) => {
    let body = {
      id: subcatid,
    };
    if (event?.id) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.deleteSubCategory(event?.id),
        body,
        (cbData) => {
          if (cbData?.success) {
            //fetchCategories();
            setCategoryData((current) =>
              current.map((obj) =>
                obj.id === catid
                  ? {
                      ...obj,
                      subcategory: obj.subcategory.filter(
                        (subcat) => subcat.id !== subcatid
                      ),
                    }
                  : obj
              )
            );
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        },
        (errData) => {
          setIsLoading(false);
        }
      );
    }
  };

  const duplicateSubCategory = (cat, subcat, cb, successCB = null) => {
    let body = {
      id: subcat?.id,
    };

    if (event?.id) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.duplicateSubCategory(event?.id),
        body,
        (cbData) => {
          if (cbData?.success) {
            //fetchCategories();
            setCategoryData((current) =>
              current.map((obj) =>
                obj.id === cat?.id
                  ? {
                      ...obj,
                      subcategory: [
                        ...obj.subcategory,
                        { ...cbData?.data?.response },
                      ],
                    }
                  : obj
              )
            );
            if (cb) cb();
            if (successCB) successCB(cat, { ...cbData?.data?.response });
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        },
        (errData) => {
          setIsLoading(false);
        }
      );
    }
  };

  const fetchCategoryGuestList = (body, cb = null) => {
    if (event?.id && selectedCategory?.id) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.categoryGuestsList(event?.id, selectedCategory?.id),
        body,
        (cbData) => {
          if (cbData?.success) {
            setGuestsList(cbData?.data?.response);
            if (!cb) getGuestsData();
            setIsLoading(false);
            if (cb) cb();
          } else {
            setIsLoading(false);
          }
        },
        (errData) => {
          setIsLoading(false);
        },
        false
      );
    }
  };

  const getGuestsData = () => {
    if ((event?.id, selectedCategory?.id)) {
      setIsLoading(true);
      GetApiCall(
        EndPoint?.getGuestData(event?.id, selectedCategory?.id),
        (cbData) => {
          setIsLoading(false);
          if (cbData?.success) {
            setGuestCount(cbData?.data?.response?.guest_count);
          }
        },
        (errData) => {
          setIsLoading(false);
        },
        false
      );
    }
  };

  const sendInvite = async (body, csv = false, SuccessCB = null) => {
    if (csv) {
      setIsLoading(true);
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
          process.env.NEXT_PUBLIC_API_URL +
            EndPoint?.uploadcsv(event?.id, selectedCategory?.id),
          {
            method: "POST",
            body,
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${getAccessToken()}`,
            },
          }
        );
        setIsLoading(false);
        const resData = await res.json();
        if (resData?.success) {
          if (SuccessCB) SuccessCB();
        }
        if (resData?.message) {
          let message = localizations?.[resData?.message]
            ? localizations?.[resData?.message]
            : resData?.message;
          let variant = resData?.success ? "success" : "error";
          ShowToast({ message: `${message}`, variant: `${variant}` });
        }
      } catch (err) {
        setIsLoading(false);
        ShowToast({ message: "Something went wrong!.", variant: "error" });
      }
    } else {
      if (event?.id && selectedCategory?.id) {
        setIsLoading(true);
        PostApiCall(
          csv
            ? EndPoint?.uploadcsv(event?.id, selectedCategory?.id)
            : EndPoint?.sendInvite(event?.id, selectedCategory?.id),
          body,
          (cbData) => {
            setIsLoading(false);
            if (cbData?.success) {
              if (SuccessCB) SuccessCB();
            }
          },
          (errData) => {
            setIsLoading(false);
          }
        );
      }
    }
  };

  const acceptInvite = (guestID, cb) => {
    let body = {
      guest_id: guestID,
    };
    if (guestID && event?.id && selectedCategory?.id) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.acceptInvite(event?.id, selectedCategory?.id),
        body,
        (cbData) => {
          setIsLoading(false);
          if (cbData?.success) {
            if (cb) cb();
          }
        },
        (errData) => {
          setIsLoading(false);
        }
      );
    }
  };

  const rejectInvite = (guestID, cb) => {
    let body = {
      guest_id: guestID,
    };
    if (guestID && event?.id && selectedCategory?.id) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.rejectInvite(event?.id, selectedCategory?.id),
        body,
        (cbData) => {
          setIsLoading(false);
          if (cbData?.success) {
            if (cb) cb();
          }
        },
        (errData) => {
          setIsLoading(false);
        }
      );
    }
  };

  const downloadGuestsData = (setArr) => {
    let body = {
      page_type: "landing",
      filters: "all",
      sort_by: "first_name",
      search_from: "",
    };
    if (event?.id && selectedCategory?.id) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.downloadGuestsData(event?.id, selectedCategory?.id),
        body,
        (cbData) => {
          if (cbData?.success) {
            let arr = cbData?.data?.response;
            let subcat = {};
            for (let i = 0; i < selectedCategory?.subcategory?.length; i++) {
              subcat[selectedCategory?.subcategory[i]?.id] =
                selectedCategory?.subcategory[i]?.title;
            }
            for (let i = 0; i < arr?.length; i++) {
              arr[i]["sub-category"] = subcat[arr[i]["event_category_id"]];
            }
            setArr(arr);
            setIsLoading(false);
          } else {
            setIsLoading(false);
          }
        },
        (errData) => {
          setIsLoading(false);
        },
        false
      );
    }
  };

  const downloadSampleCSV = async () => {
    if (event?.id && selectedCategory?.id) {
      setIsLoading(true);
      const objData = await downlaodFile(
        EndPoint?.inviteeSampleCsvDownload(event?.id, selectedCategory?.id)
      );
      await Utils?.downloadCSVFromStream(objData?.body);
      setIsLoading(false);
    }
  };

  const updateSelectedCategory = () => {
    categoryData.forEach((cat) => {
      cat?.id === selectedCategory?.id ? setSelectedCategory(cat) : null;
    });
  };

  useEffect(() => {
    //console.log(categoryData);
    if (categoryData?.length) {
      setCategories(categoryData);
      if (selectedCategory?.id) {
        updateSelectedCategory();
      }
    }
  }, [categoryData]);

  return {
    categoryData,
    setCategoryData,
    newCategory,
    setNewCategory,
    newSubCategory,
    setNewSubCategory,
    isDataValid,
    fetchCategories,
    addNewCategory,
    updateCategory,
    resetNewCategory,
    openModal,
    setOpenModal,
    resetNewSubCategory,
    addNewSubCategory,
    updateSubCategory,
    selectedCat,
    setSelectedCat,
    openModal2,
    setOpenModal2,
    categoryStatusChange,
    handleStatusToggleClick,
    duplicateSubCategory,
    selectedSubCat,
    setSelectedSubCat,
    deleteSubcategory,
    fetchCategoryGuestList,
    sendInvite,
    downloadSampleCSV,
    acceptInvite,
    rejectInvite,
    downloadGuestsData,
  };
};
export default useCategoryMatrix;
