import useCommonStore from "@/Store/useCommonStore";
import React, { useEffect, useState } from "react";

const ToggleButton = ({
  isDisabled = false,
  large = false,
  onChange = () => { },
  initialVal = 0,
}) => {
  const [isToggled, setIsToggled] = useState(false);
  const { isLoading } = useCommonStore();

  const handleToggle = () => {
    setIsToggled(!isToggled);
    if (onChange)
      onChange(!isToggled, (data) => {
        setIsToggled(data);
      });
  };

  useEffect(() => {
    // if (onChange) onChange(isToggled);
    setIsToggled(initialVal === 1);
  }, [initialVal]);

  return (
    <label
      className={`${isToggled ? "bg-[#131517]" : "bg-[#D4D4D4]"} rounded-xl ${large ? "w-10 h-6" : "w-6 h-4"
        } p-[2px] relative cursor-pointer inline-block`}
    >
      <input
        type="checkbox"
        checked={isToggled}
        onChange={handleToggle}
        className="hidden"
        disabled={isLoading || isDisabled}
      />
      <div
        className={`bg-white rounded-xl ${large ? "w-5 h-5" : "w-3 h-3"
          } absolute transition duration-300 ${isToggled ? "right-0.5" : "left-0.5"
          } `}
      ></div>
    </label>
  );
};

export default ToggleButton;
