

import Button from '@/Components/Button/Button';
import Input from '@/Components/InputForm/InputForm';
import GlobalLayout from '@/Components/Layout/GlobalLayout';
import MetaData from '@/Components/MetaData/MetaData';
import SearchableSelect from '@/Components/SearchableSelect/SearchableSelect';
import CompleteProfile from '@/Components/Shared/CompleteProfile/CompleteProfile';
import LinkEmail from '@/Components/Shared/LinkEmail/LinkEmail';
import LinkPhone from '@/Components/Shared/LinkPhone/LinkPhone';
import Otp from '@/Components/Shared/Otp/Otp';
import Password from '@/Components/Shared/Password/Password';
import { useLogin } from '@/CustomHook/useLogin';
import Utils from '@/Utils/Utils';
import Image from 'next/image';
import Svg from '../../public/Assets/Svg';
import { useEffect } from 'react';
import useCommonStore from '@/Store/useCommonStore';
import useEventStore from '@/Store/useEventStore';
import { useRouter } from 'next/router';

const ExtractCode = (code = "IN#91") => {
  return (Utils?.countryCode?.find((e) => e?.value === code)?.label)
};

const OtpComponent = ({
  callBack = () => { },
  onBack = () => { },
  inputData = {},
  isLoading = false
}) => {
  return (
    <Otp
      callBack={() => callBack()}
      sentOn={inputData?.email || (`(${ExtractCode(inputData?.dial_code)}) ` + inputData?.phone)}
      onBack={() => onBack(false)}
    />
  )
}

const InitialComponent = ({
  signUpVia = false,
  onUseEmailOrPhone = () => { },
  onChange = () => { },
  inputData = {},
  continueWith = () => { },
  isFocused = false,
  onFocus = () => { },
  onBlur = () => { },
  isLoading = false
}) => {
  return (
    <div className='md:pt-[15vh] items-center min-h-screen md:min-h-0 md:items-start flex justify-center'>
      <div className='w-[343px] max-w-[100%] p-5 shadow-md rounded-xl border border-[#eee] bg-white'>
        <div className='w-[53px] h-[53px] bg-[#EFEFEF] rounded-full flex justify-center items-center mb-4'>
          {/* <Image src='/Assets/Images/welcome-icon.webp' width='35' height='35' title='welcome' alt='welcome-icon' /> */}
          {/* <img src='/Assets/Images/welcome-icon.webp' width='35' height='35' title='welcome' alt='welcome-icon' /> */}
          {Svg().WelcomeIcon}
        </div>
        <h2 className='text-xl font-semibold text-[#131517] mb-3'>Welcome</h2>
        <p className='text-sm text-[#595C5C] mb-5 font-medium'>Please sign in or sign up below.</p>
        {signUpVia ?
          <div className='login-with-email'>
            <div className='flex justify-between align-middle mb-2'>
              <p className='text-sm text-[#131517] font-medium'>Email</p>
              {/* <button type='button' className='text-[13px] text-[#969498] flex gap-1 relative transition-all hover:text-[#595C5C] hover-img font-medium' onClick={() => { onUseEmailOrPhone(false) }}>
                <Image src='/Assets/Images/phone-icon.webp' width='20' height='20' alt='Phone Icon' title='Phone' className='transition-all' />
                Use Phone Number
              </button> */}
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              continueWith("Email")
            }}>
              <Input onChange={onChange} val={inputData?.email} name='email' placeholder='someone@email.com' inputCls='input' autoFocus />
              <Button disabled={isLoading} className='btn-dark w-full mt-6'>
                Continue with Email
              </Button>
            </form>
          </div> :
          <div className='login-with-phone'>
            <div className='flex justify-between align-middle mb-3'>
              <p className='text-sm text-[#131517] font-medium'>Phone Number</p>
              <button type='button' className='text-[13px] text-[#969498] flex gap-1 transition-all hover:text-[#595C5C] hover-img font-medium' onClick={() => { onUseEmailOrPhone() }}>
                {/* <Image src='/Assets/Images/email-icon.webp' width='20' height='20' alt='Email Icon' title='Email' className='transition-all' /> */}
                <img src={`/${process.env.NEXT_PUBLIC_BASE_URL}/Assets/Images/email-icon.webp`} width='20' height='20' alt='Email Icon' title='Email' className='transition-all' />
                Use Email</button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              continueWith("Phone Number");
            }}>
              <div className={`flex w-full border rounded-lg h-[40px] relative transition-all hover:border-[#595C5C] ${isFocused ? 'border-[#000]' : 'border-[#EBECED]'}`}>
                <SearchableSelect options={Utils?.countryCode} onChange={onChange} value={inputData?.dial_code} cls='border-r max-w-[90px] grow-0 shrink-0' />
                <Input name='phone' onChange={onChange} val={inputData?.phone} placeholder='982809820' inputCls='w-full rounded-md h-[38px] px-2 focus:outline-none' autoFocus onFocus={() => onFocus(true)} maxLength={15} onBlur={() => onBlur(false)} />
              </div>
              <Button disabled={isLoading} className='btn-dark w-full mt-6'>
                Continue with Phone
              </Button>
            </form>
          </div>}
      </div>
    </div>
  )
}

const SwitchComponent = (key, props) => {
  switch (key) {
    case "InitialComponent":
      return <InitialComponent {...props} />;
    case "OtpComponent":
      return <OtpComponent {...props} />;
    case "LinkPhone":
      return <LinkPhone {...props} />;
    case "LinkEmail":
      return <LinkEmail {...props} />;
    case "CompleteProfile":
      return <CompleteProfile {...props} />;
    case "Password":
      return <Password {...props} />;
    default:
      return <InitialComponent {...props} />;
  }
}

const LoginPage = ({ data }) => {
  const {
    isSignUpViaEmail, isFocused, setIsFocused, inputData, onChange, contWithPhoneOrEmail, onContinue, onUseEmailOrPhone, currentComponent, callBack, onSkip, isLoading, isClient
  } = useLogin();
  const { token } = useCommonStore();
  const { event } = useEventStore();
  const router = useRouter();
  const dataAsProps = {
    onBack: contWithPhoneOrEmail, inputData, signUpVia: isSignUpViaEmail, onUseEmailOrPhone, onChange, continueWith: onContinue, isFocused, onFocus: setIsFocused, onBlur: setIsFocused, callBack, onSkip, isLoading
  };

  useEffect(() => {
    if (token && event?.id) {
      Utils?.saveCookie("accessToken", token);
      Utils?.saveCookie("event_id", event?.id);
      router.push("/event");
    } else if (token && !event?.id) {
      Utils?.saveCookie("accessToken", token);
      router.push("/create");
    }
  }, [token, event?.id])

  return (
    <GlobalLayout>
      <MetaData title='Login Page' />
      {isClient ? SwitchComponent(currentComponent, dataAsProps) : null}
    </GlobalLayout>
  )
};

export async function getServerSideProps(ctx) {
  const token = Utils?.getCookie("accessToken", ctx)?.slice(1, -1);
  const eid = Utils?.getCookie("event_id", ctx)?.slice(1, -1);

  if (token) {
    return {
      redirect: {
        destination: '/create',
        permanent: false,
      }
    }
  }
  return { props: { data: null } }
}

export default LoginPage;
