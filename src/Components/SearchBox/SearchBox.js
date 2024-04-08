import React, { useEffect, useState } from "react";
import Input from "../InputForm/InputForm";

export default function SearchBox({
  options = [],
  name = "",
  onChange = null,
  value = "",
  placeholder = "Search for more photos",
  autoFocus = true,
  handleTimeZone = () => { },
  inputCls = 'SearchInput h-11 pl-7',
  wrapperCls = 'relative mt-4 mb-5 searchInput',
  icon = true,
  valueKey = "label"
}) {
  const [selectedVal, setSelectedVal] = useState("");
  const [search, setSearch] = useState("");

  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    let selected =
      options?.find((option) => option.value === value);
    if (selected) {
      setSelectedVal(selected?.label);
    }
    setOptionList(options);
  }, []);

  return (
    <>
      <div className={`${wrapperCls}`}>
        {icon ? <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none searchIconFiels">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div> : null}
        <Input
          inputCls={inputCls}
          placeholder={placeholder}
          val={search}
          autoFocus={autoFocus}
          onChange={(e) => {
            const filteredData = options?.filter((item) => {
              return Object.keys(item).some((key) => {
                if (item[key] === null || typeof item[key] === "object") {
                  return;
                }
                return item?.label
                  ?.toLowerCase()
                  ?.includes(e?.target?.value?.toLowerCase());
              });
            });
            setSearch(e?.target?.value);
            setOptionList(filteredData);
          }}
        />
      </div>
      {optionList?.length ? <div className="CountryTimeZone max-h-[250px] overflow-y-auto mb-2 p-1">
        <ul>
          {
            optionList.map((option) => {
              return (
                <li
                  className={`w-full text-[#131517] text-sm flex gap-2  items-center rounded-md hover:bg-[#F0F0F0] px-2 py-1 cursor-pointer font-medium stroke-[#131517] ${selectedVal === option?.label ? 'bg-[#F0F0F0]' : ''}`}
                  key={option?.label}
                  onClick={() => {
                    setSelectedVal(option?.label);
                    setOptionList(options);
                    if (handleTimeZone) handleTimeZone();
                    if (onChange) {
                      onChange({
                        target: { name, value: option[valueKey] },
                      });
                    }
                  }}
                >
                  {option?.label}
                </li>
              );
            })
          }
        </ul>
      </div>
        : null}

    </>
  );
}
