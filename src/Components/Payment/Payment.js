import React, { Fragment, useState } from "react";
import Svg from "../../../public/Assets/Svg";
import Button from "../Button/Button";
import Input from "../InputForm/InputForm";
import ToggleButton from "../ToggleButton/ToggleButton";
import ToolTip from "../ToolTip/ToolTip";
import usePayment from "@/CustomHook/usePayment";
import Modal from "../Modal/Modal";
import Utils from "@/Utils/Utils";
import Image from "next/image";

const Payment = () => {
  const { dropDownQuestionRef, openDropQuestionRef, openDropQuestion, handleDropQuestion, onChange, paymentArr, selectedPayment, paymentSetting, customInputData, onCustomChange, addCustomPayment, openPopUp, setOpenPopUp, applyCustomPayment, deleteCustomPayment } = usePayment();

  return (
    <Fragment>
      <div className='pb-8'>
        <h2 className='head mb-2'>Default Payment Gateway</h2>
        <p>Cancel and permanently delete this event. This operation cannot be undone. If there are any registered guests, we will notify them that the event has been canceled.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
          {paymentArr?.map(({ name, value, imgName, fee, tax }) => {
            return (
              <div key={name} className='flex justify-between items-center border rounded-md py-3 px-5'>
                <div className="flex gap-2 items-center">
                  {/* <Image width='100' height='30' src={`/Assets/Images/${imgName}.png`} className={`h-7 object-contain object-left ${value ? 'opacity-100' : 'opacity-50'}`} title={imgName} alt={imgName} /> */}
                  <img width='100' height='30' src={`/${process.env.NEXT_PUBLIC_BASE_URL}/Assets/Images/${imgName}.png`} className={`h-7 object-contain object-left ${value ? 'opacity-100' : 'opacity-50'}`} title={imgName} alt={imgName} />
                  <ToolTip icon={true} >
                    <div className="flex justify-between gap-3 text-sm whitespace-nowrap mb-1">
                      <p>Platform Fee</p>
                      <p className="font-medium">{fee}</p>
                    </div>
                    <div className="flex justify-between gap-3 text-sm">
                      <p>Tax</p>
                      <p className="font-medium">{tax}</p>
                    </div>
                  </ToolTip>
                </div>
                <ToggleButton initialVal={value ? 1 : 0} onChange={(val) => { onChange(name, val) }} />
              </div>
            )
          })}
        </div>

        {/* <div className='flex justify-between items-center mb-6 mt-8 max-md:flex-col max-md:items-start max-md:gap-3'>
          <h2 className='head'>Add Your Own Payment Gateway</h2>
          <div className='relative'>
            <Button buttonRef={dropDownQuestionRef} type={'button'} className='text-sm btn-light justify-between flex items-center gap-5 stroke-[#595C5C] h-[30px] hover:stroke-white hover:fill-white' onClick={handleDropQuestion}>
              Select Payment Gateway
              {Svg().SingleSelect}
            </Button>
            {openDropQuestion ? <div ref={openDropQuestionRef} className="boxShadow border p-1 absolute left-0 z-10 mt-3 w-[150px] rounded-md bg-white focus:outline-none">
              <ul className='cursor-pointer'>
                {[{ src: `/${process.env.NEXT_PUBLIC_BASE_URL}/Assets/Images/razorpay.png`, alt: "razorpay" },
                { src: `/${process.env.NEXT_PUBLIC_BASE_URL}/Assets/Images/stripe.png`, alt: "stripe" },
                { src: `/${process.env.NEXT_PUBLIC_BASE_URL}/Assets/Images/paypal.png`, alt: "paypal" }].map(({ src, alt }) => (
                  <li key={src} onClick={() => {
                    handleDropQuestion(false, alt);
                    setOpenPopUp(true)
                  }} className={`text-[#131517] text-sm flex gap-2 justify-between items-center rounded-sm hover:bg-[#DFE0E1] p-1 font-medium stroke-[#131517] `} >
                    
                    <img width={100} height={30} src={src} className="h-7" style={{ objectFit: 'contain', objectPosition: 'left' }} alt={alt} />
                    
                  </li>
                ))}
              </ul>
            </div> : null}
          </div>
        </div> */}
        {paymentSetting?.custom_gateways?.length ? <><p>Integrate a secure and seamless payment gateway for a hassle-free transaction experience.</p>
          {paymentSetting?.custom_gateways?.map((e) => {
            return (
              <div className="border rounded-md p-5 mt-3" key={e?.type}>
                <div className='flex gap-2 items-center justify-between mb-2'>
                  {/* <Image width='100' height='30' src={`/Assets/Images/${e?.type}.png`} className={`h-7 object-contain object-left`} title={e?.type} alt={e?.type} /> */}
                  <img width='100' height='30' src={`/${process.env.NEXT_PUBLIC_BASE_URL}/Assets/Images/${e?.type}.png`} className={`h-7 object-contain object-left`} title={e?.type} alt={e?.type} />
                  <div className='flex items-center gap-5'>
                    <ToggleButton large={true} initialVal={e?.status ? 1 : 0} onChange={() => applyCustomPayment(e?.id)} />
                    <Button onClick={() => deleteCustomPayment(e?.id)} type='button'>{Svg().Delete}</Button>
                  </div>
                </div>
                <p className="text-[#969498] font-medium mb-2">Webhook URL</p>
                <div className="relative">
                  <Input readOnly val={e?.value?.webhook} inputCls="input padding-right-100" type={'text'} />
                  <Button onClick={() => {
                    Utils?.copyText(e?.value?.webhook);
                  }} type={'button'} className='text-sm btn-light justify-between flex items-center gap-3 stroke-[#595C5C] h-[32px] hover:stroke-white hover:fill-white absolute right-1 top-1'>
                    {Svg().CopyLink} Copy
                  </Button>
                </div>
              </div>
            )
          })}
        </> : null
        }
        {/* <div className="taxesAttendees">
          <h2 className="head mb-2">Taxes</h2>
          <p>Collect your Tax charge from Attendees</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
            <div className="flex justify-between items-center border rounded-md py-3 px-5">
              <div className="flex gap-2 items-center">GST</div>
              <div><ToggleButton /></div>
            </div>
            <div className="flex justify-between items-center border rounded-md py-3 px-5">
              <div className="flex gap-2 items-center">CGST</div>
              <div><ToggleButton /></div>
            </div>
            <div className="flex justify-between items-center border rounded-md py-3 px-5">
              <div className="flex gap-2 items-center">VAT</div>
              <div><ToggleButton /></div>
            </div>
          </div>
        </div> */}
      </div>

      <Modal onBtnClick={addCustomPayment} open={openPopUp} onClose={() => setOpenPopUp(false)} headerImg={`/${process.env.NEXT_PUBLIC_BASE_URL}/Assets/Images/${selectedPayment}.png`} showBtn={false} ModalWrapperCls="ModalBoxContainer sm:max-w-[480px]">
        <Input name="webhook" val={customInputData?.webhook} onChange={onCustomChange} type="text" inputCls="input mb-2" placeholder="Type Here" label="Webhook URL" autoFocus />
        <Input name="access" val={customInputData?.access} onChange={onCustomChange} type="text" inputCls="input mb-2" placeholder="Type Here" label="Access Key" />
        <Input name="secret" val={customInputData?.secret} onChange={onCustomChange} type="text" inputCls="input" placeholder="Type Here" label="Secret Key" />
        <Button className="btn-dark mt-3 min-w-[100px]" btnText="Add" />
      </Modal>
    </Fragment>
  );
};
export default Payment;
