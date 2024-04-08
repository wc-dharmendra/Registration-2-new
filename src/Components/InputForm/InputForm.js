import Svg from "../../../public/Assets/Svg";

const Input = ({
  wrapperCls="",
  placeholder = "",
  disabled = false,
  isRequired = false,
  name = "",
  type = "text",
  val = "",
  onChange = () => { },
  onFocus = () => { },
  onBlur = () => { },
  label = "",
  txtLimit = "",
  showElem = true,
  autoFocus = false,
  labelCls = "font-medium block relative mb-1 text-sm text-[#595C5C] break-all",
  limitTextCls = "",
  inputCls = '',
  id = "",
  isSelectType = false,
  options = [],
  isMultiple = false,
  maxLength = null,
  readOnly=false,
  checked=false,
  showIcon=false,
  showDynamicIcon=false,
  iconName,
  styles={},
  min='',
  max=''
}) => {
  const CommonType = () => {
    return (showElem ?
      <div className={`FieldInput w-full  ${wrapperCls}`}>
        {label ? (
          <div className="label-wrap">
            <label className={`${labelCls}`}>
              {label}
              {label && isRequired ? "* " : " "}
            </label>
            {txtLimit ? (
              <span className={limitTextCls}>{txtLimit}</span>
            ) : null}
          </div>
        ) : null}

        <input
          id={id}
          type={type}
          name={name}
          value={val}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          label={label}
          required={isRequired}
          disabled={disabled}
          autoFocus={autoFocus}
          placeholder={placeholder}
          className={`autofill:bg-yellow-200 ${inputCls} ${readOnly ? 'read-only:bg-gray-100' : ''}`}
          maxLength={maxLength}
          readOnly={readOnly}
          checked={checked}
          style={styles}
          min={min}
          max={max}
        >
        </input>
        {showIcon ? <span className="absolute left-[5px] top-[10px]">{Svg()?.[iconName]}</span>: null}
      </div>
      : null
    );
  };

  const SelectType = () => {
    return (
      <div className="FieldInput">
        <select name={name} multiple={isMultiple} value={val} onChange={onChange} onFocus={onFocus} onBlur={onBlur} className={inputCls}>
          {(options?.length) ? options.map(({ label, value }, index) => {
            return (
              <option key={label + index.toString()} value={value}>{label}</option>
            )
          }) : null}
        </select>
      </div>
    );
  };
  return isSelectType ? SelectType() : CommonType();
};

export default Input;
