import useCategoryMatrixStore from "@/Store/useCategoryMatrixStore";
import useCommonStore from "@/Store/useCommonStore";
import EndPoint from "@/Api/EndPoint";
import { PostApiCall } from "@/Api/ApiCall";
import useEventStore from "@/Store/useEventStore";

const useCategoryForm = () => {
  //const [categoryFormData, setCategoryFormData] = useState();

  const { isLoading, setIsLoading } = useCommonStore();
  const {
    categoryFields,
    categories,
    selectedCategory,
    setSelectedCategory,
    setCategories,
    setCategoryFields,
    categoryFormData,
    setCategoryFormData,
  } = useCategoryMatrixStore();

  const { event } = useEventStore();

  const getCategoryFormData = () => {
    let body = {
      id: selectedCategory.id,
    };
    if (event?.id) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.getCategoryForm(event?.id),
        body,
        (cbData) => {
          if (cbData?.success) {
            setCategoryFormData(cbData?.data?.response);
            setCategoryFields(cbData?.data?.response?.category_fields);
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

  const saveQuestions = (suggestiveQuesArr, customQuesArr, cb = null) => {
    let combineArr = [];
    combineArr = [...suggestiveQuesArr, ...customQuesArr];
    let prev_names = {};
    for (let i = 0; i < categoryFields?.length; i++) {
      if (categoryFields[i]?.id) {
        prev_names[categoryFields[i]?.id] = categoryFields[i]?.name;
      }
    }

    let arr = [];
    for (let i = 0; i < combineArr.length; i++) {
      let temp = {
        id: combineArr[i]?.id || "",
        name: combineArr[i]?.id
          ? prev_names[combineArr[i]?.id]
          : combineArr[i]?.fieldName
            ?.trim(" ")
            ?.split(" ")
            ?.join("_")
            ?.toLowerCase()?.substring(0, 10) +
          "_" +
          Date.now(),
        label: combineArr[i]?.fieldName,
        type: combineArr[i]?.type,
        validation_as: combineArr[i]?.validation_as,
        placeholder: "custom field",
        required: combineArr[i]?.isRequired,
        display_order: categoryFormData?.event_fields?.length + i + 1,
        is_multiple:
          combineArr[i]?.validation_as === "multiple_select" ? true : false,
        readonly: false,
        status: true,
        unique: combineArr[i]?.isCustomField || (!combineArr[i]?.isCustomField && combineArr[i]?.validation_as === 'phone')
          ? (combineArr[i]?.isUnique || false)
          : false,
        // unique: combineArr[i]?.isCustomField ? combineArr[i]?.isUnique : false,
        field_type: combineArr[i]?.isCustomField ? "custom" : "optional",
        value: "",
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
          ?.trim(" ")
          ?.split(" ")
          ?.join("_")
          ?.toLowerCase();
      }
      arr.push(temp);
    }
    let body = {
      event_category_id: selectedCategory?.id,
      fields: arr,
    };

    if (event?.id && body.fields?.length) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.saveCategoryForm(event?.id),
        body,
        (cbData) => {
          if (cbData?.success) {
            getCategoryFormData();
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

  const editQuestion = (ques, cb = null) => {
    let arr = [];
    for (let i = 0; i < categoryFields?.length; i++) {
      if (categoryFields[i]?.id === ques[0]?.id) {
        let obj = {
          ...categoryFields[i],
          label: ques[0]?.fieldName,
          required: ques[0]?.isRequired,
          unique: ques[0]?.isUnique,
          options: ques[0]?.options?.map((obj) => {
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
      event_category_id: selectedCategory?.id,
      fields: arr,
    };

    if (event?.id && body.fields?.length) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.saveCategoryForm(event?.id),
        body,
        (cbData) => {
          if (cbData?.success) {
            let response = cbData?.data?.response?.fields;
            let allcat = [...categoryFields];
            for (let k = 0; k < allcat?.length; k++) {
              if (allcat[k]?.id === response[0]?.id) {
                allcat[k] = response[0];
              }
            }
            setCategoryFields(allcat);
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

  const handleDeleteQuestion = (ques, cb = null) => {
    let arr = categoryFields;
    let body = {
      id: ques[0]?.id,
    };

    if (event?.id) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.deleteQuestion(event?.id),
        body,
        (cbData) => {
          if (cbData?.success) {
            arr = arr.filter((item) => {
              return item.id !== ques[0].id;
            });
            //handleOrderChange(arr);
            setCategoryFields(arr);
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
    setCategoryFields(arr);
    for (let i = 0; i < arr?.length; i++) {
      arr[i]["display_order"] = categoryFormData?.event_fields?.length + i + 1;
    }
    let body = {
      event_category_id: selectedCategory?.id,
      fields: arr,
    };

    if (event?.id && body.fields?.length) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.saveCategoryForm(event?.id),
        body,
        (cbData) => {
          if (cbData?.success) {
            let response = cbData?.data?.response?.fields;
            let arr = [...response];
            setCategoryFields(arr);
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

  // useEffect(() => {
  //   //console.log("category form data changed : ", categoryFormData);
  // }, [categoryFormData]);

  // useEffect(() => {
  //   //console.log("category fields changed: ", { categoryFields });
  // }, [categoryFields]);

  return {
    getCategoryFormData,
    categoryFormData,
    categoryFields,
    saveQuestions,
    setCategoryFields,
    handleDeleteQuestion,
    handleOrderChange,
    editQuestion,
  };
};
export default useCategoryForm;
