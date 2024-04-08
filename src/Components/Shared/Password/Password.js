import React from 'react'
import Button from '@/Components/Button/Button';
import Input from '@/Components/InputForm/InputForm';
import Svg from '../../../../public/Assets/Svg';
import { PostApiCall } from '@/Api/ApiCall';
import Utils from '@/Utils/Utils';
import EndPoint from '@/Api/EndPoint';
import useCommonStore from '@/Store/useCommonStore';

function Password({ continueWith = () => { }, onChange = () => { }, inputData = {}, onBack = () => { }, callBack = () => { }, isLoading = false }) {

    const { setNavigateTo } = useCommonStore();
    const onResendCode = () => {
        PostApiCall(EndPoint?.resendOtp, { field_name: Utils?.isValidEmail(inputData?.email) ? "email" : "phone", field_value: inputData?.email, type: "send_me" }, (cbData) => {
            if (cbData?.success) {
            }
        }, (errCb) => {
        });
    };
    return (
        <div className='md:pt-[15vh] items-center min-h-screen md:min-h-0 md:items-start flex justify-center'>
            <div className='w-[343px] max-w-[100%] p-5 shadow-md rounded-xl border border-[#eee] bg-white'>
                <Button type='button' className='mb-6 cursor-pointer' onClick={() => onBack(false)}>
                    {Svg().BackIcon}
                </Button>
                <h2 className='text-xl font-semibold text-[#131517] mb-4'>Password</h2>
                <p className='text-sm text-[#595C5C] mb-6 font-medium leading-6'>Please enter your password to sign in to Your account.</p>
                <div className='password-wrapper'>
                    <div className='flex justify-between align-middle mb-3'>
                        <p className='text-sm text-[#131517] font-medium'>Password</p>
                        <Button type='button' className='text-[13px] text-[#969498] flex gap-1 relative transition-all hover:text-[#595C5C] hover-img font-medium' onClick={() => {
                            callBack('OtpComponent');
                            onResendCode();
                            setNavigateTo("Password");
                        }}>
                            Send Me a Code
                        </Button>
                    </div>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        continueWith("password");
                    }}>
                        <Input onChange={onChange} val={inputData?.password} name='password' placeholder='Password' type='password' inputCls='input' autoFocus />
                        <Button disabled={isLoading} className='btn-dark w-full mt-6'>
                            Continue
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Password