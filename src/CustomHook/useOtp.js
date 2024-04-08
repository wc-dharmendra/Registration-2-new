import { useState, useCallback, useRef, useEffect } from "react";
import { PostApiCall } from "@/Api/ApiCall";
import EndPoint from "@/Api/EndPoint";
import Utils from "@/Utils/Utils";
import { useRouter } from "next/router";
import useUserStore from "@/Store/useUserStore";
import useCommonStore from "@/Store/useCommonStore";

const useOtpInput = (clipboardData, callBack, sentOn = "") => {
    const router = useRouter();
    const { setIsLoading, setToken, isLoading } = useCommonStore();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const refs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

    const { setUser } = useUserStore();

    const otpChange = (index, value) => {
        // Allow only numeric input
        if (/^\d*$/.test(value)) {
            setOtp(prevOtp => {
                const newOtp = [...prevOtp];
                newOtp[index] = value;
                if (value !== '' && index < newOtp.length - 1) {
                    refs[index + 1]?.current?.focus();
                } else if (value === '' && index > 0) {
                    refs[index - 1]?.current?.focus();
                }
                return newOtp;
            });
        }
    };

    const otpPaste = (e) => {
        e.preventDefault();
        const pastedData = e?.clipboardData?.getData('text/plain')?.split('');
        onPaste(pastedData);
    };

    const onPaste = (pastedData = []) => {
        setOtp(prevOtp => {
            const newOtp = [...prevOtp];
            for (let i = 0; i < newOtp.length && i < pastedData.length; i++) {
                if (/^\d*$/.test(pastedData[i])) {
                    newOtp[i] = pastedData[i];
                }
            }
            return newOtp;
        });
    }

    const callApi = useCallback(() => {
        if (!isLoading) {
            setIsLoading(true);
            PostApiCall(EndPoint?.login, {
                field_value: sentOn,
                field_name: "email",
                password: false,
                otp: otp?.join('')
            }, async (cbData) => {
                setIsLoading(false);
                if (cbData?.success) {
                    const { event_id, token } = cbData?.data?.response;
                    const { first_name, last_name, phone } = cbData?.data?.response?.user;
                    setUser({
                        ...cbData?.data?.response?.user,
                        dial_code: 'IN#91'
                    });
                    if (event_id && first_name && last_name) {
                        Utils?.saveCookie("event_id", event_id);
                        Utils?.saveCookie("accessToken", token);
                        setToken(token);
                        setUser({
                            ...cbData?.data?.response?.user,
                            dial_code: 'IN#91'
                        });
                        setTimeout(() => {
                            setIsLoading(false);
                        }, 1000);

                        await router.push("/event");
                    } else if (!event_id && first_name && last_name && phone) {
                        Utils?.saveCookie("accessToken", token);
                        setToken(token);
                        setUser({
                            ...cbData?.data?.response?.user,
                            dial_code: 'IN#91'
                        });
                        await router.push("/create");
                    } else {
                        Utils?.saveCookie("tempAccessToken", cbData?.data?.response?.token);
                    }
                    if (callBack) callBack();
                }
            }, (errCb) => {
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
            }, false)
        }

    }, [callBack, otp, router, isLoading]);

    useEffect(() => {
        if (clipboardData?.length) {
            onPaste(clipboardData);
        }
    }, [clipboardData]);

    useEffect(() => {
        if (otp?.length && otp?.length === 6) {
            if (otp?.join('')?.length === 6) {
                callApi();
            }
        }
    }, [otp]);

    return ({
        otp, refs, otpChange, otpPaste
    });
}

const useOtp = () => {
    const [clipboardData, setClipBoardData] = useState([]);
    const onPasteCode = useCallback(async () => {
        const data = await Utils?.readFromClipboard();
        const stringArray = Utils?.splitDataIntoArr(data);
        setClipBoardData(stringArray)
    }, []);

    return ({
        clipboardData, onPasteCode
    })

}

export { useOtpInput, useOtp };