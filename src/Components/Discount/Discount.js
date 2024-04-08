import React, { useEffect } from "react";
import Svg from "../../../public/Assets/Svg";
import ToggleButton from "../ToggleButton/ToggleButton";
import DiscountActions from "./DiscountActions";
import dayjs from "dayjs";
import useCommonStore from "@/Store/useCommonStore";
const { default: Button } = require("../Button/Button");

const Discount = ({
  setIsModalOpen = () => { },
  setFormData = () => { },
  duplicateDiscount = () => { },
  deleteDiscount = () => { },
  getAllDiscounts = () => { },
  discounts = [],
  setDiscounts = () => { },
  getCategoryList = () => { },
  discountStatusChange = () => { },
  prefillSelectedCatData = () => { },
  categoriesList,
  createArr,
}) => {
  const { setIsLoading } = useCommonStore();
  const handleToggle = (val, id, cb) => {
    discountStatusChange(id, val, () => {
      cb(!val ? "1" : "0");
    });
  };
  useEffect(() => {
    getAllDiscounts();
    getCategoryList();
    setIsLoading(false);
  }, []);

  return (
    <div className="w-full pb-6">
      <div className="discontHeader w-full">
        <div className="w-full flex items-center justify-between">
          <div className="">
            <h1 className="heading-H1">Discount</h1>
          </div>
          <div className="flex flex-nowrap">
            <Button
              onClick={() => {
                setFormData({
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
                createArr(categoriesList);
                setIsModalOpen(true);
              }}
              type="button"
              className="bg-[#DFE0E1] text-[#595C5C] text-[14px] rounded-lg px-3 py-1.5 font-medium hover:bg-[#131517] hover:text-[#EFEFF0] flex gap-2 items-center hover:fill-[#fff]"
            >
              {" "}
              {Svg()?.AddGrayIcon} New Discount
            </Button>
          </div>
        </div>
        <p className="paragraph">See recent page views of the event page.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-5">
        {discounts?.length > 0 &&
          discounts?.map((item) => (
            <div key={item?.id} className="bg-[#fff] boxShadow rounded-[12px] px-[18px] py-[14px] pb-12 relative">
              <div className="flex items-center justify-between">
                <div className="">
                  <ToggleButton
                    onChange={(val, cb) => {
                      handleToggle(val, item.id, cb);
                    }}
                    initialVal={item.status == "1" ? 1 : 0}
                  />
                </div>
                <DiscountActions
                  editModel={setIsModalOpen}
                  discount={item}
                  setDiscountFormData={setFormData}
                  duplicateDiscount={duplicateDiscount}
                  deleteDiscount={deleteDiscount}
                  prefillSelectedCategories={prefillSelectedCatData}
                />
              </div>
              <div className="w-full mt-2">
                <h2 className="text-[20px] text-[#131517] font-semibold">
                  {item?.name}
                </h2>
                <p className="text-[16px] text-[#131517] font-medium">
                  {item?.code}
                </p>
                <p className="text-[16px] text-[#131517] font-medium">
                  Valid from :
                  <span className="text-[#595C5C]">
                    {dayjs(item?.starting_at).format("DD MMM")} To{" "}
                    {dayjs(item?.ending_at).format("DD MMM YYYY")}
                  </span>
                </p>
                <p className="text-[14px] text-[#131517] font-medium"></p>
                <div>
                  {item?.coupon_applied_categories?.length &&
                    item?.coupon_applied_categories?.map((cat) => (
                      <p key={cat} className="text-[14px] text-[#131517] font-medium">
                        {cat}
                      </p>
                    ))}
                </div>
                
              </div>
              <div className="flex justify-between items-center flex-wrap gap-1 absolute bottom-0 left-0 w-full px-[18px] pb-[18px]">
                  <div className="inline-block text-xs text-[#595C5C] bg-[#EFEFF0] p-1 rounded-md mt-2">
                    Count : {item?.guest_count}
                  </div>
                  <div className="inline-block text-xs text-[#595C5C] bg-[#EFEFF0] p-1 rounded-md mt-2">
                    Discount Usage : {item?.ticket_qty}
                  </div>
                </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Discount;