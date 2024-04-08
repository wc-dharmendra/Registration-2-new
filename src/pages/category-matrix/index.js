import Button from "@/Components/Button/Button";
import Input from "@/Components/InputForm/InputForm";
import EventLayout from "@/Components/Layout/EventLayout";
import MetaData from "@/Components/MetaData/MetaData";
import Modal from "@/Components/Modal/Modal";
import ToggleButton from "@/Components/ToggleButton/ToggleButton";
import useCreateEvent from "@/CustomHook/useCreateEvent";
import React, {
  Fragment,
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import Svg from "../../../public/Assets/Svg";
import Utils from "@/Utils/Utils";
import ReOrder from "@/Components/ReOrder/ReOrder";
import useCategoryMatrixStore from "@/Store/useCategoryMatrixStore";
import { useRouter } from "next/router";
import useCategoryMatrix from "@/CustomHook/useCategoryMatrix";
import useCommonStore from "@/Store/useCommonStore";
import useEventStore from "@/Store/useEventStore";
import { PostApiCall } from "@/Api/ApiCall";
import EndPoint from "@/Api/EndPoint";
import SubCategoryAction from "@/Components/SubCategoryAction/SubCategoryAction";
import DatePicker from "@/Components/Calender/DatePicker";
import dayjs from "dayjs";
import ShowToast from "@/Toaster/Toaster";
import SkeletonMatrix from "@/Components/Skeleton/SkeletonMatrix";

function CategoryMatrix() {
  const { event } = useEventStore();
  const [openCatReorderModel, setOpenCatReorderModel] = useState(false);
  const { inputData, onChange, onAddCategory } = useCreateEvent();
  const [reorderList, setReorderList] = useState([]);
  const [reorder, setReorder] = useState(false);
  const [showDescription, setShowDescription] = useState();
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const currencies = ["USD", "INR", "AED"];
  const dropButtonRef = useRef(null);
  const DropBoxRef = useRef(null);
  const [openBox, setOpenBox] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const handleDropBox = () => {
    setOpenBox(!openBox);
  };

  const router = useRouter();

  const { isLoading, setIsLoading } = useCommonStore();

  const {
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
  } = useCategoryMatrix();

  const {
    categories,
    setCategories,
    selectedCategory,
    setSelectedCategory,
    setGuestsList,
    setGuestCount,
  } = useCategoryMatrixStore();

  const handleChange = useCallback(
    (e) => {
      setNewCategory(Utils?.onChangeInputData(e, newCategory));
    },
    [newCategory]
  );

  const handleSubCatChange = useCallback(
    (e) => {
      setNewSubCategory(Utils?.onChangeInputData(e, newSubCategory));
    },
    [newSubCategory]
  );

  const handleSelectedSubCatChange = useCallback(
    (e, cb) => {
      if (e.target.name === "start_date" || e.target.name === "end_date") {
        if (validateDate(e.target.name, e.target.value)) {
          setSelectedSubCat(Utils?.onChangeInputData(e, selectedSubCat));
        } else {
          if (cb) {
            cb(selectedSubCat[e.target.name]);
          }
          setSelectedSubCat({ ...selectedSubCat });
        }
      } else if (
        (e.target.name !== "price" && e.target.name !== "capacity") ||
        ((e.target.name === "price" || e.target.name === "capacity") &&
          !isNaN(e.target.value))
      ) {
        setSelectedSubCat(Utils?.onChangeInputData(e, selectedSubCat));
      }
    },
    [selectedSubCat]
  );

  const validateDate = (fieldname, value) => {
    let isValid = true;
    let message =
      fieldname === "start_date"
        ? "Start date must be on or before the end date"
        : "End date must be on or after the start date";

    if (fieldname === "end_date" && value > event?.end_date) {
      isValid = false;
      message = "Please select date and time before event end date and time";
    }

    if (selectedSubCat?.start_date && fieldname === "end_date") {
      if (value < selectedSubCat?.start_date) {
        isValid = false;
      }
    } else if (selectedSubCat?.end_date && fieldname === "start_date") {
      if (value > selectedSubCat?.end_date) {
        isValid = false;
      }
    }
    if (!isValid) {
      ShowToast({
        message: message,
        variant: "info",
      });
    }
    return isValid;
  };

  const handleCurrencySelect = (currency) => {
    setSelectedSubCat((prev) => ({ ...prev, currency_type: currency }));
    setOpenBox(false);
  };

  const onOpenSubCatEditModel = (category, subcategory) => {
    let scat = { ...subcategory };
    scat["currency_type"] = subcategory?.currency_type
      ? subcategory?.currency_type
      : "INR";
    scat["start_date"] = subcategory?.start_date ? subcategory?.start_date : "";
    scat["end_date"] = subcategory?.end_date ? subcategory?.end_date : "";
    scat["capacity_unlimited"] = subcategory?.capacity === -1 ? 1 : 0;
    setSelectedCat(category);
    setSelectedSubCat(scat);
    setOpenModalEdit(true);
  };

  const onCloseSubCatEditModel = () => {
    setSelectedCat(null);
    setSelectedSubCat({});
    setOpenModalEdit(false);
  };

  const handleToggle = (val, id, sub_cat_id) => {
    if (sub_cat_id) {
      setCategoryData((current) =>
        current.map((obj) =>
          obj.id === id
            ? {
                ...obj,
                subcategory: obj?.subcategory?.map((sub) =>
                  sub.id === sub_cat_id ? { ...sub, status: val ? 1 : 0 } : sub
                ),
              }
            : obj
        )
      );
    } else {
      setCategoryData((current) =>
        current.map((obj) =>
          obj.id === id ? { ...obj, status: val ? 1 : 0 } : obj
        )
      );
    }
  };

  const onCloseCatModal = () => {
    setOpenModal(false);
  };

  const onOpenCatModel = () => {
    setOpenModal(true);
    setShowDescription(false);
  };

  const manageCategory = (category) => {
    setSelectedCategory(category);
    setGuestsList([]);
    setGuestCount({});
    router.push("/category-matrix/manage");
  };

  const reorderApiCall = useCallback(
    async (selectedCategoryId) => {
      let order = [];
      reorderList.forEach((obj, ind) => {
        let temp = {};
        temp["id"] = obj.id;
        temp["display_order"] = `${ind + 1}`;
        order.push(temp);
      });
      let body = {};
      if (selectedCategoryId) {
        body = {
          category_id: selectedCategoryId,
          display_ordering: order,
        };
      } else {
        body = {
          display_ordering: order,
        };
      }

      if (event?.id) {
        setIsLoading(true);
        PostApiCall(
          selectedCategoryId
            ? EndPoint?.reorderSubCategory(event?.id)
            : EndPoint?.reorderCategory(event?.id),
          body,
          (cbData) => {
            if (cbData?.success) {
              if (selectedCategoryId) {
                setCategoryData((current) =>
                  current.map((obj) =>
                    obj.id === selectedCategoryId
                      ? {
                          ...obj,
                          subcategory: reorderList,
                        }
                      : obj
                  )
                );
              } else {
                setCategoryData(reorderList);
              }
              setReorder(true);
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
    },
    [reorderList]
  );

  useEffect(() => {
    if (reorder) {
      setCategoryData((current) =>
        current.map((obj, ind1) => ({
          ...obj,
          subcategory: obj?.subcategory?.map((sub, ind2) => ({
            ...sub,
            display_order: ind2 + 1,
          })),
          display_order: ind1 + 1,
        }))
      );
      setReorder(false);
    }
  }, [reorder, categoryData]);

  useEffect(() => {
    fetchCategories();
    setIsClient(true);
  }, []);

  useEffect(() => {
    Utils?.removeModal(dropButtonRef, DropBoxRef, () => {
      setOpenBox(false);
    });
  }, [dropButtonRef, DropBoxRef]);

  return (
    <>
      <EventLayout>
        <MetaData title="Category Matrix" />
        <div className="border-b-[1px] mb-6">
          <div className="container lg:w-[820px] mx-auto px-4">
            <div className="flex justify-between  items-center mb-3 mt-4">
              <h1 className="font-semibold text-2xl xs:text-3xl sm:text-3xl md:text-3xl lg:text-3xl text-[#131517]">
                Category Matrix
              </h1>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  className="flex items-center gap-2 btn-light text-sm py-1 max-sm:h-[30px]"
                  onClick={() => onOpenCatModel()}
                >
                  {Svg().PlusIcon}
                  <span className="hidden sm:block">Add Category</span>
                </Button>
                <button
                  type="button"
                  className="flex items-center gap-2 btn-light text-sm py-1 max-sm:h-[30px] setting-btn-height stroke-[#131517]"
                  style={{ paddingLeft: 0, paddingRight: 0 }}
                  onClick={() => {
                    setSelectedCat(null);
                    setOpenCatReorderModel(true);
                    setReorderList(categoryData);
                  }}
                >
                  {Svg().Setting}
                </button>
              </div>
            </div>
            <p className="mb-5">
              Tailor your event experience. Create a form and define ticket
              categories based on attendee input for a personalized journey.
            </p>
          </div>
        </div>

        {isClient ? (
          <div className="container lg:w-[820px] mx-auto px-4 pb-5">
            {categories?.length ? (
              categories.map((item) => {
                return (
                  <Fragment key={item.id}>
                    {/* <SkeletonMatrix /> */}
                    <div className="border rounded-lg shadow-md bg-white mb-5">
                      <div className="p-5">
                        <div className="md:flex justify-between max-md:pb-4">
                          <div
                            id={`divid-${item.id}`}
                            className="mb-3 md:mb-0 lg:mb-0"
                          >
                            <ToggleButton
                              large={true}
                              onChange={(val) => {
                                categoryStatusChange(val, item.id);
                                handleToggle(val, item.id);
                              }}
                              initialVal={item.status}
                            />
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              type="button"
                              className="flex items-center gap-2 btn-light text-sm py-1 max-sm:h-[30px] h-10"
                              onClick={() => {
                                manageCategory(item);
                              }}
                            >
                              Manage {Svg().EventArrow}
                            </Button>
                            <Button
                              type="button"
                              className="flex items-center gap-2 btn-light text-sm py-1 max-sm:h-[30px] h-10 whitespace-nowrap"
                              onClick={() => {
                                //if (item.guest_count === 0) {
                                setOpenModal2(true);
                                setSelectedCat(item);
                                //}
                              }}
                            >
                              {" "}
                              {Svg().PlusIcon} Sub-Category
                            </Button>
                            {item?.subcategory?.length > 1 && (
                              <button
                                type="button"
                                className="flex items-center gap-2 btn-light text-sm py-1 max-sm:h-[30px] stroke-[#131517] md:w-10 md:justify-center"
                                style={{ paddingLeft: 0, paddingRight: 0 }}
                                onClick={() => {
                                  setSelectedCat(item);
                                  setReorderList(item.subcategory);
                                  setOpenCatReorderModel(true);
                                }}
                              >
                                {Svg().Setting}
                              </button>
                            )}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center gap-5">
                            <h2 className="font-semibold text-xl text-[#131517]">
                              {item.title}
                            </h2>
                            <button
                              type="button"
                              onClick={() => {
                                setNewCategory(item);
                                setOpenModal(true);
                              }}
                            >
                              {Svg().PencilIcon}
                            </button>
                          </div>
                          <p className="text-sm text-[#969498] max-md:mb-3 break-all">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {item?.subcategory?.length > 0 && (
                        <div className="sub-categories p-5">
                          <ul className="grid md:grid-cols-2 gap-4">
                            {item.subcategory.map((sub_cat, index) => {
                              return (
                                <Fragment key={sub_cat.id}>
                                  <li className="bg-[#F9F9F9] p-3 rounded-md">
                                    <div className="flex items-center gap-2 justify-between">
                                      <div
                                        className="flex items-center gap-2 mb-2"
                                        id={`subCatStatus-${sub_cat.id}`}
                                      >
                                        <p className="text-[#131517] text-sm font-semibold">
                                          {sub_cat.title}
                                        </p>
                                        {/* <div className='w-2 h-2 bg-[#1BA362] rounded-full'></div> */}
                                        <ToggleButton
                                          onChange={(val) => {
                                            categoryStatusChange(
                                              val,
                                              item.id,
                                              true,
                                              sub_cat.id
                                            );
                                            handleToggle(
                                              val,
                                              item.id,
                                              sub_cat.id
                                            );
                                          }}
                                          initialVal={sub_cat?.status}
                                        />
                                      </div>
                                      <SubCategoryAction
                                        openEditModel={onOpenSubCatEditModel}
                                        openDeleteModel=""
                                        category={item}
                                        subcategory={sub_cat}
                                        duplicate={duplicateSubCategory}
                                        deleteSubCat={deleteSubcategory}
                                        duplicateSuccessCB={
                                          onOpenSubCatEditModel
                                        }
                                      />
                                    </div>
                                    <p className="text-[13px] break-all">
                                      {sub_cat.description}
                                    </p>
                                    <div className="inline-block text-xs text-[#595C5C] bg-[#EFEFF0] p-1 rounded-md mt-2">
                                      Count : {sub_cat.guest_count}
                                    </div>
                                  </li>
                                </Fragment>
                              );
                            })}
                          </ul>
                        </div>
                      )}

                      <div
                        className={`flex px-5 py-3  border-t-[1px] ${
                          item.status === 1 ? "justify-between" : "justify-end"
                        }`}
                      >
                        {item.status === 1 ? (
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-[#1BA362] rounded-full"></div>
                            <p className="text-sm text-[#1BA362]">Active</p>
                          </div>
                        ) : null}

                        <p className="text-sm text-[#969498]">
                          Overall Registered : {item.guest_count}
                        </p>
                      </div>
                    </div>
                  </Fragment>
                );
              })
            ) : isLoading && !categories?.length ? (
              <Fragment>
                <SkeletonMatrix />
                <SkeletonMatrix />
                <SkeletonMatrix />
              </Fragment>
            ) : null}
          </div>
        ) : null}
      </EventLayout>

      <Modal
        iconCls="bg-[#EFEFEF] rounded-full p-2"
        onBtnClick={newCategory?.id ? updateCategory : addNewCategory}
        open={openModal}
        isBtnDisabled={isLoading}
        onClose={() => {
          onCloseCatModal();
          setShowDescription(false);
          resetNewCategory();
        }}
        btnText={newCategory?.id ? "Update" : "Create"}
        title={newCategory?.id ? "Update Category" : "New Category"}
        icon="MatrixCatgory"
      >
        <div className="mb-3">
          <label className="font-medium text-[#595C5C] pb-1 text-sm sm:text-base md:text-base lg:text-sm mb-1 block">
            Category Name
          </label>
          <Input
            maxLength={40}
            autoFocus
            name="title"
            onChange={handleChange}
            val={newCategory?.title}
            inputCls="input p-3.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  bg-[#fff]"
            placeholder="Friends & Family"
          />
        </div>
        {!showDescription && !newCategory?.description ? (
          <Button
            type="button"
            className="text-sm font-semibold text-[#969498]"
            onClick={() => setShowDescription(true)}
          >
            + Add Category Description
          </Button>
        ) : null}
        {showDescription || newCategory?.description ? (
          <div className="mb-2">
            <label className="font-medium text-[#595C5C] pb-1 text-sm sm:text-base md:text-base lg:text-sm block mb-1 block">
              Description
            </label>
            <Input
              maxLength={160}
              name="description"
              onChange={handleChange}
              val={newCategory?.description}
              inputCls="input block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Friends & Family"
            />
          </div>
        ) : null}
      </Modal>

      <Modal
        onBtnClick={() => {
          if (selectedCat && selectedCat?.id) {
            reorderApiCall(selectedCat?.id);
          } else {
            reorderApiCall();
          }
          setOpenCatReorderModel(false);
        }}
        open={openCatReorderModel}
        onClose={() => {
          setOpenCatReorderModel(false);
          setReorder(false);
        }}
        btnText="Save"
        isBtnDisabled={isLoading}
        headerTitle={
          selectedCat?.id ? "Reorder Sub-Category" : "Reorder Category"
        }
        ModalWrapperCls="ModalBoxContainer sm:max-w-[485px]"
        btnClass="px-5 font-semibold"
      >
        <ReOrder
          items={reorderList}
          keyId="id"
          label="title"
          deleteBtn={false}
          onPosChange={setReorderList}
        />
      </Modal>

      <Modal
        onBtnClick={addNewSubCategory}
        open={openModal2}
        onClose={() => {
          setOpenModal2(false);
          setSelectedCat(null);
          setShowDescription(false);
        }}
        isBtnDisabled={isLoading}
        btnText="Create"
        title="New Sub-Category"
        icon="MatrixCatgory"
      >
        <div className="mb-3">
          <label className="font-medium text-[#595C5C] pb-1 text-sm sm:text-base md:text-base lg:text-sm mb-1 block">
            Sub-Category Name
          </label>
          <Input
            maxLength={80}
            autoFocus
            name="title"
            onChange={handleSubCatChange}
            val={newSubCategory?.title}
            inputCls="input p-3.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  bg-[#fff]"
            placeholder="Friends & Family"
          />
        </div>

        {!showDescription ? (
          <Button
            type="button"
            className="text-sm font-semibold text-[#969498]"
            onClick={() => setShowDescription(true)}
          >
            + Add Sub-Category Description
          </Button>
        ) : null}
        {showDescription ? (
          <div className="mb-2">
            <label
              htmlFor="description"
              className="font-medium text-[#595C5C] pb-1 text-sm sm:text-base md:text-base lg:text-sm block mb-1 block"
            >
              Description
            </label>
            <Input
              maxLength={160}
              name="description"
              onChange={handleSubCatChange}
              val={newSubCategory?.description}
              inputCls="input block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Friends & Family"
            />
          </div>
        ) : null}
      </Modal>

      <Modal
        showBtn={false}
        open={openModalEdit}
        onClose={() => {
          onCloseSubCatEditModel();
        }}
        headerTitle="Edit Details"
        ModalWrapperCls="ModalBoxContainer sm:max-w-[485px]"
        headerCls="flex items-center justify-between border-b px-6 py-2"
      >
        <div className="mb-3 pt-3">
          <label className="font-medium text-[#595C5C] pb-1 text-sm sm:text-base md:text-base lg:text-sm mb-1 block">
            Title
          </label>
          <Input
            maxLength={40}
            autoFocus
            name="title"
            onChange={handleSelectedSubCatChange}
            val={selectedSubCat?.title}
            inputCls="input mb-4"
            placeholder="Friends & Family"
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="description"
            className="font-medium text-[#595C5C] pb-1 text-sm sm:text-base md:text-base lg:text-sm mb-1 block"
          >
            Description
          </label>
          <Input
            maxLength={160}
            name="description"
            onChange={handleSelectedSubCatChange}
            val={selectedSubCat?.description}
            inputCls="input mb-4"
            placeholder="Friends & Family"
          />
        </div>

        <div className="flex max-sm:flex-col max-sm:gap-5 gap-3 mb-4">
          <div className="w-full">
            <label
              htmlFor="startDate"
              className="font-medium block relative mb-1 text-sm text-[#595C5C] pb-1"
            >
              Sale Start Date & Time
            </label>
            {/* <DatePicker
              name="start_date"
              type="datetime-local"
              value={
                selectedSubCat?.start_date ? selectedSubCat?.start_date : "Select Date"
              }
              onDateChange={handleSelectedSubCatChange}
            /> */}
            <div className="relative block">
              <input
                className="input outline-none bg-transparent top-0 left-0 w-full h-full z-10 absolute opacity-0"
                type="datetime-local"
                name="start_date"
                value={
                  selectedSubCat?.start_date
                    ? dayjs(selectedSubCat?.start_date).format(
                        "YYYY-MM-DD HH:mm"
                      )
                    : "Select Date"
                }
                //min={dayjs(event?.start_date).format("YYYY-MM-DDTHH:mm")}
                min={dayjs().format("YYYY-MM-DD HH:mm")}
                max={dayjs(event?.end_date).format("YYYY-MM-DD HH:mm")}
                onChange={handleSelectedSubCatChange}
              />
              <div className="text-[#131517] font-medium items-center gap-3 flex justify-between border border-[#EBECED] rounded-lg px-2 h-[40px]">
                {selectedSubCat?.start_date ? (
                  dayjs(selectedSubCat?.start_date)?.format(
                    "DD/MM/YYYY - HH:mm"
                  )
                ) : (
                  <span className="opacity-80">Select Date</span>
                )}{" "}
                {Svg()?.CalendarIcon}
              </div>
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="endDate"
              className="font-medium block relative mb-1 text-sm text-[#595C5C] pb-1"
            >
              Sale End Date & Time
            </label>
            {/* <DatePicker
              name="end_date"
              type="datetime-local"
              value={selectedSubCat?.end_date ? selectedSubCat?.end_date : ""}
              onDateChange={handleSelectedSubCatChange}
            /> */}
            <div className="relative block]">
              <input
                className="input outline-none bg-transparent top-0 left-0 w-full h-full z-10 absolute opacity-0"
                type="datetime-local"
                name="end_date"
                value={
                  selectedSubCat?.end_date
                    ? dayjs(selectedSubCat?.end_date).format("YYYY-MM-DD HH:mm")
                    : "Select Date"
                }
                //min={dayjs(event?.start_date).format("YYYY-MM-DDTHH:mm")}
                min={dayjs().format("YYYY-MM-DD HH:mm")}
                max={dayjs(event?.end_date).format("YYYY-MM-DD HH:mm")}
                onChange={handleSelectedSubCatChange}
              />
              <div className="text-[#131517] font-medium items-center gap-3 flex justify-between border border-[#EBECED] rounded-lg px-2 h-[40px]">
                {selectedSubCat?.end_date ? (
                  dayjs(selectedSubCat?.end_date)?.format("DD/MM/YYYY - HH:mm")
                ) : (
                  <span className="opacity-80">Select Date</span>
                )}{" "}
                {Svg()?.CalendarIcon}
              </div>
            </div>
          </div>
        </div>
        {selectedCat &&
        selectedCat?.id &&
        selectedCat?.global_capacity !== 1 ? (
          <>
            <div>
              <div className="flex justify-between">
                <label className="font-medium mb-1 text-sm text-[#595C5C]">
                  Capacity
                </label>
                <div className="font-medium mb-1 text-sm text-[#595C5C]">
                  <Input
                    label="Make it infinite"
                    wrapperCls="flex"
                    type={"checkbox"}
                    inputCls="w-4 h-4 accent-black cursor-pointer ml-2"
                    onChange={(e) => {
                      let obj = { ...selectedSubCat };
                      obj["capacity_unlimited"] = e?.target?.checked ? 1 : 0;
                      if (
                        !e?.target?.checked &&
                        selectedSubCat?.capacity === -1
                      ) {
                        obj["capacity"] = 0;
                      }
                      setSelectedSubCat({ ...obj });
                    }}
                    checked={
                      selectedSubCat?.capacity_unlimited
                        ? selectedSubCat?.capacity_unlimited === 1
                          ? 1
                          : 0
                        : ""
                    }
                  />
                </div>
              </div>
              {selectedSubCat?.capacity_unlimited === 1 ? (
                <div className="relative mb-4">
                  {selectedSubCat?.capacity_unlimited === 1 ? (
                    <img
                      alt="infinite"
                      title="infinite"
                      src="../Assets/Images/infinite.png"
                      style={{
                        position: "absolute",
                        left: "6px",
                        top: "5px",
                        background: "#ffffff",
                      }}
                    />
                  ) : null}

                  <Input inputCls="input" />
                </div>
              ) : (
                <Input
                  inputCls="input mb-4"
                  name="capacity"
                  onChange={handleSelectedSubCatChange}
                  val={selectedSubCat?.capacity ? selectedSubCat?.capacity : ""}
                />
              )}
            </div>
          </>
        ) : null}
        {selectedCat &&
        selectedCat?.id &&
        selectedCat?.category_type === "Paid" ? (
          <>
            <label
              htmlFor="price"
              className="font-medium block relative mb-1 text-sm text-[#595C5C]"
            >
              Enter Price
            </label>
            <div className="relative flex">
              <div className="relative border-r w-[100px] bottom-0 border text-[#131517] border-[#EBECED] rounded-l-lg h-[40px] px-2">
                <div className="relative h-full">
                  <Button
                    className="flex justify-between items-center gap-[2px] text-sm py-1 h-full text-[#595C5C] font-semibold absolute w-full px-2 pointer-events-none"
                    type="button"
                    buttonRef={dropButtonRef}
                    //onClick={handleDropBox}
                  >
                    {selectedSubCat?.currency_type}
                    {/* <span className={`${openBox ? "rotate-180" : ""}`}>
                      {Svg().DownArrow}
                    </span> */}
                  </Button>

                  {openBox ? (
                    <div
                      ref={DropBoxRef}
                      className="boxShadow border p-1 absolute left-0 z-10 mb-3 w-[150px] rounded-md bg-white focus:outline-none bottom-full"
                    >
                      <ul className="cursor-pointer">
                        {currencies.map((currency) => (
                          <li
                            key={currency}
                            className={`text-[#131517] text-sm flex gap-2 justify-between items-center rounded-sm hover:bg-[#DFE0E1] p-1 font-medium stroke-[#131517]`}
                            onClick={() => handleCurrencySelect(currency)}
                          >
                            {currency}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </div>

              <Input
                inputCls="input rounded-r-radius"
                name="price"
                onChange={handleSelectedSubCatChange}
                val={selectedSubCat?.price ? selectedSubCat?.price : ""}
              />
            </div>
          </>
        ) : null}

        <Button
          type="button"
          disabled={isLoading}
          onClick={() => {
            updateSubCategory(onCloseSubCatEditModel);
          }}
          className="btn-dark mt-6"
        >
          Save Changes
        </Button>
      </Modal>
    </>
  );
}

export default CategoryMatrix;

export async function getServerSideProps(ctx) {
  const { query, req, res } = ctx;
  const token = Utils?.getCookie("accessToken", ctx)?.slice(1, -1);
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
}
