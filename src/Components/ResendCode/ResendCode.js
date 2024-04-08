import { PostApiCall } from '@/Api/ApiCall';
import EndPoint from '@/Api/EndPoint';
import Utils from '@/Utils/Utils';
import React, { useState, useEffect } from 'react';
import Button from '../Button/Button';

function ResendCode({
    sentOn = ""
}) {

    const [resendDisabled, setResendDisabled] = useState(false);
    const [countdown, setCountdown] = useState(60);

    const onResendCode = () => {
        PostApiCall(EndPoint?.resendOtp, { field_name: Utils?.isValidEmail(sentOn) ? "email" : "phone", field_value: sentOn, type: "" }, (cbData) => {
            if (cbData?.success) {
                setResendDisabled(true);
            } else {
                setResendDisabled(false);
            }
        }, (errCb) => {
            setResendDisabled(false);
        });
    };

    useEffect(() => {
        let countdownTimer;
        if (resendDisabled) {
            countdownTimer = setInterval(() => {
                setCountdown(prevCountdown => {
                    if (prevCountdown === 1) {
                        setResendDisabled(false);
                        clearInterval(countdownTimer);
                        return 60;
                    }
                    return prevCountdown - 1;
                });
            }, 1000);
            return () => {
                clearInterval(countdownTimer);
            };
        }
        setCountdown(60);
    }, [resendDisabled]);

    useEffect(() => {
        setResendDisabled(true);
    }, []);

    return (
        <Button type='button' className={`text-[13px] text-[#969498] font-medium ${resendDisabled ? 'cursor-not-allowed' : 'cursor-pointer hover:text-[#595C5C]'}`} onClick={() => {
            if (!resendDisabled) {
                onResendCode()
            }
        }}>
            {resendDisabled ? `Resend code in ${countdown}s` : 'Resend Code'}
        </Button>
    );
}

export default ResendCode;
