import { useOtpInput } from "@/CustomHook/useOtp";
import useCommonStore from "@/Store/useCommonStore";


const OtpInput = ({
  clipboardData = "",
  callBack = () => { },
  sentOn = ""
}) => {
  const { otp, refs, otpChange, otpPaste } = useOtpInput(clipboardData, callBack, sentOn);
  const { isLoading } = useCommonStore();
  return (
    <div className="flex space-x-2">
      {(otp?.length) ? otp.map((digit, index) => (
        <input
          disabled={isLoading}
          key={index}
          type="text"
          value={digit}
          onChange={(e) => otpChange(index, e.target.value)}
          maxLength="1"
          className="w-10 h-10 p-1 border border-[#EBECED] rounded text-center focus:outline-none focus:border-[#000] hover:border-[#595C5C] transition-all outline-none"
          ref={refs[index]}
          autoFocus={index === 0}
          onPaste={otpPaste}
          inputMode="numeric"
        />
      )) : null}
    </div>
  );
};

export default OtpInput;
