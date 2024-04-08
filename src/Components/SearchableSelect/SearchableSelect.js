import Utils from '@/Utils/Utils';
import React, { useEffect, useState, useRef } from 'react';

function SearchableSelect({ name = 'dial_code', value = "", options, onChange, searchBy = "name", searchPlaceholder = 'Code', cls = '', isDialCode = true, readOnly = false }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedOptions, setSelectedOptions] = useState({});
  const dropdownContentRef = useRef(null);
  const buttonRef = useRef(null);


  const toggleDropdown = () => {
    if (!readOnly) {
      setIsOpen(!isOpen);
      setSearchText('');
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchText(e?.target?.value);
  };

  const handleOptionClick = (elem) => {
    setSelectedOptions(elem);
    setIsOpen(false);
    setSearchText('');
    onChange({ target: { name, value: elem?.value } });
  };

  const isSearchByDialCode = (option) => {
    if (isDialCode) {
      return (
        (option?.label + " (" + option?.name + ")")
          .toLowerCase()
          .includes(searchText?.toLowerCase()) ||
        (option?.label + " " + option?.name)
          .toLowerCase()
          .includes(searchText?.toLowerCase())
      );
    } else {
      return (option?.[searchBy]?.toLowerCase()?.includes(searchText?.toLowerCase()))
    }
  }

  useEffect(() => {
    if (value) {
      setSelectedOptions(options?.find((elem) => elem?.value === value))
    }
  }, [value, options]);

  useEffect(() => {
    const calculateDropdownPosition = () => {
      if (dropdownContentRef.current) {
        const dropdownContent = dropdownContentRef.current;
        const rect = dropdownContent.getBoundingClientRect();
        const spaceAbove = rect.top;
        const spaceBelow = window.innerHeight - rect.bottom;

        if (spaceBelow < dropdownContent.offsetHeight && spaceAbove >= dropdownContent.offsetHeight) {
          // Open from the top
          dropdownContent.style.bottom = "100%";
          dropdownContent.style.top = "auto";
        } else {
          // Open from the bottom
          dropdownContent.style.top = "100%";
          dropdownContent.style.bottom = "auto";
        }
      }
    };

    if (isOpen) {
      calculateDropdownPosition();
      window.addEventListener('resize', calculateDropdownPosition);

      return () => {
        window.removeEventListener('resize', calculateDropdownPosition);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    Utils?.removeModal(dropdownContentRef, buttonRef, () => {
      setIsOpen(false);
      setSearchText('');
    });
  }, [buttonRef, dropdownContentRef]);

  return (
    <div className={`searchable-select ${cls}`} id='dial-dropdown'>
      <div className={`select-container`}>
        <div className="selected-options bg-white rounded-l-lg" >
          {selectedOptions?.flag_code ? (
            <div className={`flag-box h-full absolute left-1 ${readOnly ? 'z-10' : ''}`}>
              <div style={{ backgroundImage: `url('/${process.env.NEXT_PUBLIC_BASE_URL}/Assets/Images/flags.png')` }} className={`iti-flag ${selectedOptions?.flag_code}`}></div>
            </div>
          ) : null}
          <div ref={buttonRef} className={`h-[38px] ${readOnly ? 'read-only:bg-gray-100 cursor-default' : 'cursor-pointer'} leading-[38px] w-full rounded-l-lg outline-none px-1 pl-7 relative bg-transparent`} onClick={toggleDropdown}>{selectedOptions?.label}</div>
        </div>
        {isOpen ?
          <div className='w-[299px] bg-[#fff] top-1 shadow-lg border border-[#DFE0E1] rounded-lg p-2 dropdown-content my-1 absolute' ref={dropdownContentRef}>
            <div className=''>
              <input
                type="text"
                placeholder={`Search ${searchPlaceholder}`}
                autoFocus
                value={searchText}
                onChange={handleSearchInputChange}
                className='input'
              />
            </div>
            <div className={`options max-h-[200px] overflow-auto`}>
              {options?.filter(option => isSearchByDialCode(option))?.map((elem) => (
                <div
                  key={elem?.[searchBy]}
                  onClick={() => {
                    handleOptionClick(elem)
                  }}
                  className={`py-[2px] px-2 hover:bg-[#DFE0E1] cursor-pointer text-sm ${(elem?.value === selectedOptions?.value) ? 'selected' : ''}`}
                >
                  {isDialCode ? <div className="flag-box h-[15px]">
                    <div style={{ backgroundImage: `url('/${process.env.NEXT_PUBLIC_BASE_URL}/Assets/Images/flags.png')` }} className={`iti-flag ${elem?.flag_code}`}></div>
                  </div> : null}
                  {isDialCode ? elem?.label + " (" + elem?.name + ")" : elem?.[searchBy]}
                </div>
              ))}
            </div>
          </div> : null}
      </div>
    </div>
  );
}

export default SearchableSelect;
