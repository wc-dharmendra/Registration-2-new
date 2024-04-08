import { GetApiCall, PostApiCall } from "@/Api/ApiCall";
import EndPoint from "@/Api/EndPoint";
import useCommonStore from "@/Store/useCommonStore";
import useEventStore from "@/Store/useEventStore";
import { useState } from "react";

const useDiscounts = () => {
  const { event } = useEventStore();
  const { isLoading, setIsLoading } = useCommonStore();
  const [discounts, setDiscounts] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    description: "",
    amount: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    ticket_qty: "",
    coupon_type: "",
    discount_usage: "",
    sub_category_select: [],
  });

  const [catData, setCatData] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const createArr = (categoriesArr) => {
    let arr = [];
    for (let i = 0; i < categoriesArr?.length; i++) {
      let obj = categoriesArr[i];
      if (obj?.parent_id === 0) {
        let cat = {
          ...obj,
          isChecked: false,
          subArr: [],
        };
        arr.push(cat);
      }
    }

    for (let j = 0; j < arr?.length; j++) {
      let obj = arr[j];
      for (let k = 0; k < categoriesArr?.length; k++) {
        if (categoriesArr[k]?.parent_id === obj?.id) {
          let temparr = [
            ...obj?.subArr,
            { ...categoriesArr[k], isChecked: false },
          ];
          obj["subArr"] = temparr;
        }
      }
    }
    setCatData(arr);
  };

  const prefillSelectedCatData = (discount) => {
    let data = catData;
    for (let i = 0; i < data?.length; i++) {
      data[i]["isChecked"] = false;
      for (let j = 0; j < data[i]?.subArr?.length; j++) {
        data[i].subArr[j]["isChecked"] = false;
      }
    }
    for (let k = 0; k < discount?.subcategory_selecleted?.length; k++) {
      let id = discount?.subcategory_selecleted[k];
      for (let i = 0; i < data?.length; i++) {
        for (let j = 0; j < data[i]?.subArr?.length; j++) {
          if (data[i]?.subArr[j]?.id == id) {
            data[i].subArr[j]["isChecked"] = true;
          }
        }
      }
    }
    for (let i = 0; i < data?.length; i++) {
      let n = data[i]?.subArr?.length;
      let count = 0;
      for (let j = 0; j < data[i]?.subArr?.length; j++) {
        if (data[i]?.subArr[j]["isChecked"]) {
          count++;
        }
      }
      if (count === n) {
        data[i]["isChecked"] = true;
      }
    }
    setCatData(data);
  };

  const handleCatSelection = (id, val, parent_id) => {
    if (parent_id) {
      setCatData((current) =>
        current.map((obj) =>
          obj.id === parent_id
            ? {
                ...obj,
                subArr: obj?.subArr?.map((sub) =>
                  sub.id === id ? { ...sub, isChecked: val } : sub
                ),
              }
            : obj
        )
      );
    } else {
      setCatData((current) =>
        current.map((obj) =>
          obj?.id === id
            ? {
                ...obj,
                isChecked: val,
                subArr: obj?.subArr?.map((sub) => ({ ...sub, isChecked: val })),
              }
            : obj
        )
      );
    }
  };

  const getAllDiscounts = () => {
    let body = {};
    if (event?.id) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.getDiscounts(event?.id),
        body,
        (cbData) => {
          console.log(cbData)
          setIsLoading(false);
          if (cbData?.success) {
            setDiscounts(cbData?.data?.response);
          }
        },
        (errData) => {
          setDiscounts([]);
          setIsLoading(false);
        },
        false
      );
    }
  };

  const saveDiscountData = (body, succesCB) => {
    if (event?.id) {
      setIsLoading(true);
      PostApiCall(
        body?.id
          ? EndPoint?.editDiscount(event?.id)
          : EndPoint?.saveDiscount(event?.id),
        body,
        (cbData) => {
          setIsLoading(false);
          if (cbData?.success) {
            if (succesCB) succesCB();
          }
        },
        (errData) => {
          setIsLoading(false);
        }
      );
    }
  };

  const getCategoryList = () => {
    if (event?.id) {
      setIsLoading(true);
      GetApiCall(
        EndPoint?.getCategoryListing(event?.id),
        (cbData) => {
          setIsLoading(false);
          if (cbData?.success) {
            setCategoriesList(cbData?.data?.response);
            createArr(cbData?.data?.response);
          }
        },
        (errData) => {
          setIsLoading(false);
        },
        false
      );
    }
  };

  const discountStatusChange = (discount_id, val, errorCB) => {
    if (val !== null) {
      let body = {
        id: discount_id,
        status: val ? 1 : 0,
      };
      if (event?.id) {
        setIsLoading(true);
        PostApiCall(
          EndPoint?.discountStatusUpdate(event?.id),
          body,
          (cbData) => {
            setIsLoading(false);
            if (cbData?.success) {
              setDiscounts((current) =>
                current.map((obj) =>
                  obj.id === discount_id
                    ? { ...obj, status: val ? "1" : "0" }
                    : obj
                )
              );
            } else {
              if (errorCB) errorCB();
              setIsLoading(false);
            }
          },
          (errData) => {
            if (errorCB) errorCB();
            setIsLoading(false);
          }
        );
      }
    }
  };

  const duplicateDiscount = () => {
    //console.log("duplicate discount");
  };

  const deleteDiscount = (discount_id) => {
    let body = {
      id: discount_id,
      status: 1,
    };
    if (event?.id) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.deleteDiscount(event?.id),
        body,
        (cbData) => {
          setIsLoading(false);
          if (cbData?.success) {
            getAllDiscounts();
          }
        },
        (errData) => {
          setIsLoading(false);
        }
      );
    }
  };

  return {
    formData,
    setFormData,
    discounts,
    setDiscounts,
    duplicateDiscount,
    deleteDiscount,
    getAllDiscounts,
    saveDiscountData,
    getCategoryList,
    catData,
    handleCatSelection,
    discountStatusChange,
    prefillSelectedCatData,
    categoriesList,
    createArr,
  };
};

export default useDiscounts;
