

import Button from '@/Components/Button/Button';
import OtpInput from '@/Components/OtpInput/OtpInput';
import Svg from '../../../../public/Assets/Svg';
import { useOtp } from '@/CustomHook/useOtp';
import ResendCode from '@/Components/ResendCode/ResendCode';

const Otp = ({
  onBack = () => { },
  sentOn = '',
  callBack = () => { }
}) => {

  const { clipboardData, onPasteCode } = useOtp();

  return (
    <div className='md:pt-[15vh] items-center min-h-screen md:min-h-0 md:items-start flex justify-center'>
      <div className='w-[343px] max-w-[100%] p-5 py-6 shadow-md rounded-xl border border-[#eee] bg-white'>
        <div className='mb-8 cursor-pointer' onClick={onBack}>
          {Svg().BackIcon}
        </div>
        <h2 className='text-xl font-semibold text-[#131517] mb-3'>Enter Code</h2>
        <p className='text-sm text-[#595C5C] mb-6 font-medium leading-6'>Please enter the 6 digit code we sent to <span className='text-[#131517]'>{sentOn.toLowerCase()}</span></p>
        <form>
          <OtpInput clipboardData={clipboardData} callBack={callBack} sentOn={sentOn} />
          <div className='flex justify-between items-center mt-6'>
            <Button type='button' onClick={onPasteCode} className='bg-[#F4F1F0] text-sm text-[#595C5C] font-semibold rounded-md h-[34px] inline-flex items-center justify-center gap-1 px-2 hover:bg-[#595C5C] hover:text-[#fff] fill-[#595c5c] hover:fill-white hover:stroke-none transition-all paste-code'>
              {Svg().PasteCode} Paste Code
            </Button>
            <ResendCode sentOn={sentOn} />
          </div>
        </form>
      </div>
    </div>
  )
};

export default Otp;
