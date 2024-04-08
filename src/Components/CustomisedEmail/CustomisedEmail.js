import React from 'react'
import Svg from '../../../public/Assets/Svg';
import Button from '../Button/Button';


export const CustomisedEmail = () => {
  return (
    <div className="popup-content-wrapper overflow-auto">
      <div className="shadow-lg p-5 rounded-lg border-[1px]">
        <h2 className="font-semibold mb-5">
          Registration Confirmed For Event Name
        </h2>
        <div className="relative">
          <textarea
            className="form-control h-[150px]"
            placeholder="Add your custom message here."
          ></textarea>
          <div className="absolute top-1 left-[-20px]">{Svg().TextboxPlus}</div>
        </div>
        <p className="text-light">You can insert variables by typing</p>
      </div>
      <div className="popup-footer flex gap-5 p-4 items-center border-t-[1px] absolute bottom-0 left-0 w-full">
        <Button className="flex items-center gap-2 btn-dark" type="button">
          {Svg()?.CheckCircleIcon}Update Email
        </Button>
        <Button className="text-[#969498] font-semibold" type="button">
          Send a Preview
        </Button>
      </div>
    </div>
  );
};

export default CustomisedEmail