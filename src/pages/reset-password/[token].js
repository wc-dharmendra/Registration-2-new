import React, { useCallback, useEffect, useState } from 'react';
import Button from '@/Components/Button/Button';
import Input from '@/Components/InputForm/InputForm';
import GlobalLayout from '@/Components/Layout/GlobalLayout';
import MetaData from '@/Components/MetaData/MetaData';
import Svg from '../../../public/Assets/Svg';
import { useRouter } from 'next/router';
import EndPoint from '@/Api/EndPoint';
import Utils from '@/Utils/Utils';
import { PostApiCall } from '@/Api/ApiCall';
import ShowToast from '@/Toaster/Toaster';
import useUserStore from '@/Store/useUserStore';

function ForgotPassword({ isVerified = false }) {

    const { setIsPaswordSet } = useUserStore();

    const router = useRouter();
    const { token } = router.query;
    const [isLoading] = useState(false);

    const showErrorToast = (message) => ShowToast({ message, variant: 'error' });

    const [inputData, setInputData] = useState({
        password: '',
        password_confirmation: '',
    });

    const onChange = (field, value) => {
        setInputData((prevInputData) => ({
            ...prevInputData,
            [field]: value,
        }));
    }

    const onSaveChange = useCallback(() => {
        if(!inputData?.password){
            showErrorToast("New Password can't be blank.");
        }else if (!inputData?.password_confirmation) {
            showErrorToast("Confirm Password can't be blank.");
        }else if (!Utils?.isValidPassword(inputData?.password) || !Utils?.isValidPassword(inputData?.password_confirmation)) {
            showErrorToast("Password must contain alphanumeric values, at least one uppercase letter, one lowercase letter,one special character (@$!%*?&) and minimum length of 8 characters");
        }else if (Utils?.isValidPassword(inputData?.password) && Utils?.isValidPassword(inputData?.password_confirmation) && inputData?.password !== inputData?.password_confirmation) {
            showErrorToast("Password and Confirm password did not match!");
        }else if (Utils?.isValidPassword(inputData?.password) && Utils?.isValidPassword(inputData?.password_confirmation) && inputData?.password === inputData?.password_confirmation) {
            PostApiCall(EndPoint?.changePassword(token), inputData, (cbData) => {
                if (cbData?.success) {
                    setIsPaswordSet(true);
                    window.location.href = `/${process.env.NEXT_PUBLIC_BASE_URL}/event`;
                }
            }, (errCbData) => {
                console.log(errCbData);
            })
        }
         
    }, [token, inputData]);

    return (
        <GlobalLayout>
            <MetaData title="Forgot Password" />
            {isVerified ? <div className='md:pt-[15vh] items-center min-h-screen md:min-h-0 md:items-start flex justify-center'>
                <div className='w-[343px] max-w-[100%] p-5 shadow-md rounded-xl border border-[#eee] bg-white'>
                    <div className='w-[53px] h-[53px] bg-[#EFEFEF] rounded-full flex justify-center items-center mb-4'>
                        {Svg().ForgotPasswordIcon}
                    </div>
                    <h2 className='text-xl font-semibold text-[#131517] mb-4'>Set Password</h2>
                    <p className='text-[#595C5C] mb-6 font-medium'>Please choose a strong password of at least 8 character.</p>

                    <div className='login-with-email'>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            onSaveChange();
                        }}>
                            <div className='mb-4'>
                                <Input type='password' label='New Password' labelCls='mb-2 block font-medium text-sm' autoFocus name="new_password" onChange={(e) => onChange('password', e?.target?.value)} val={inputData?.password} inputCls="input p-3.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  bg-[#fff]" placeholder="New Password" />
                            </div>
                            <div>
                                <Input type='password' label='Confirm Password' labelCls='mb-2 block font-medium text-sm' name='confirm_password' onChange={(e) => onChange('password_confirmation', e?.target?.value)} val={inputData?.password_confirmation} inputCls="input block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Confirm Password" />
                            </div>
                            <Button disabled={isLoading} className='btn-dark w-full mt-6'>
                                Save Changes
                            </Button>
                        </form>
                    </div>
                </div>
            </div> : <div className="h-screen flex items-center justify-center font-bold text-[25px] text-center px-4">
                Oops! <br />The URL you entered is invalid or does not exist. Please double-check the address and try again....
            </div>}
        </GlobalLayout>
    )
}


export async function getServerSideProps(ctx) {
    const { params } = ctx;
    const token = Utils?.getCookie("accessToken", ctx)?.slice(1, -1);

    if (params?.token) {
        try {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + EndPoint?.verifyToken(params?.token), {
                method: "POST",
                body: {},
                headers: {
                    'Access-Control-Allow-Origin': '*',
                },
            });

            if (res?.status === 200 && res?.json) {
                const resData = await res?.json();
                if (resData?.success) {
                    return {
                        props: {
                            isVerified: true
                        }
                    }
                }
            }
        } catch (error) {
            return {
                props: {
                    isVerified: false
                }
            }
        }
    }
    return {
        props: {
            isVerified: false
        }
    }
}

export default ForgotPassword;