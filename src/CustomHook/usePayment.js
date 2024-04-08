import { GetApiCall, PostApiCall } from "@/Api/ApiCall";
import EndPoint from "@/Api/EndPoint";
import useEventStore from "@/Store/useEventStore";
import Utils from "@/Utils/Utils";
import ShowToast from "@/Toaster/Toaster";
import { useCallback, useEffect, useRef, useState } from "react";

const usePayment = () => {
    const { event } = useEventStore();
    const dropDownQuestionRef = useRef(null);
    const openDropQuestionRef = useRef(null);
    const [openDropQuestion, setOpenDropQuestion] = useState(false);

    const [inputData, setInputData] = useState({ razorpay: true, stripe: false, paypal: false });
    const [customInputData, setCustomInputData] = useState({ access: "", secret: "", webhook: "" });

    const [selectedPayment, setSelectedPayment] = useState("");
    const [paymentSetting, setPaymentSetting] = useState({});
    const [openPopUp, setOpenPopUp] = useState(false);

    const showErrorToast = (message) => ShowToast({ message, variant: 'error' });


    const paymentArr = [{
        imgName: "razorpay", alt: "Razorpay", fee: "1.99", tax: "2%", value: inputData?.razorpay, name: "razorpay"
    },
    // {
    //     imgName: "stripe", alt: "stripe", fee: "1.99", tax: "2%", value: inputData?.stripe, name: "stripe"
    // },
    // {
    //     imgName: "paypal", alt: "paypal", fee: "1.99", tax: "2%", value: inputData?.paypal, name: "paypal"
    // }
];

    const onChange = (name, value) => {
        updatePayment(name, value);
        setInputData({
            ...inputData,
            [name]: value
        });
    }

    const onCustomChange = useCallback((e) => {
        const { name, value } = e?.target;
        setCustomInputData({
            ...customInputData,
            [name]: value
        })
    }, [customInputData]);

    const handleDropQuestion = useCallback((drop, selected = selectedPayment) => {
        setOpenDropQuestion(drop || !openDropQuestion);
        setSelectedPayment(selected)
    }, [openDropQuestion]);

    const getPayments = () => {
        GetApiCall(EndPoint?.getPayment(event?.id), (cbData) => {
            if (cbData?.success) {
                setPaymentSetting(cbData?.data?.response);
                setInputData(cbData?.data?.response?.gateways);
            }
        }, () => { }, false)
    }

    const updatePayment = (name, value) => {
        PostApiCall(EndPoint?.updatePayment(event?.id), {
            type: "default",
            value: {
                ...inputData,
                [name]: value
            }
        }, (cbData) => {
            if (cbData?.success) {
                getPayments();
            }
        }, (errCb) => {

        }, false)
    };

    const addCustomPayment = useCallback(() => {
        const { access, secret, webhook } = customInputData;
        if (access && secret && webhook) {
            PostApiCall(EndPoint?.addCustomPayment(event?.id), { type: selectedPayment, value: { ...customInputData } }, (cbData) => {
                setCustomInputData({ access: "", secret: "", webhook: "" });
                setOpenPopUp(false);
                getPayments();
            }, (errCb) => {

            }, false)
        }else if (!customInputData.webhook ) {
            showErrorToast("Webhook URL field is required");
        }else if (!customInputData.access ) {
            showErrorToast("Access Key field is required");
        }else if (!customInputData.secret ) {
            showErrorToast("Secret Key field is required");
        }
    }, [customInputData]);

    const applyCustomPayment = useCallback((id, status) => {
        PostApiCall(EndPoint?.applyCustomPayment(event?.id), { id }, (cbData) => {
            getPayments();
        }, (errCb) => {

        })
    }, []);

    const deleteCustomPayment = useCallback((id) => {
        PostApiCall(EndPoint?.deleteCustomPayment(event?.id), { id }, (cbData) => {
            getPayments();
        }, (errCb) => {

        }, false)
    }, []);

    useEffect(() => {
        getPayments();
    }, []);

    useEffect(() => {
        Utils?.removeModal(dropDownQuestionRef, openDropQuestionRef, () => {
            setOpenDropQuestion(false);
        });
    }, [dropDownQuestionRef, openDropQuestionRef]);

    // console.log(inputData)
    return ({
        dropDownQuestionRef, openDropQuestionRef, openDropQuestion, handleDropQuestion, inputData, paymentArr, onChange, selectedPayment, paymentSetting, customInputData, onCustomChange, addCustomPayment, openPopUp, setOpenPopUp, applyCustomPayment, deleteCustomPayment
    })
}
export default usePayment;