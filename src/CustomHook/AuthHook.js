import { useEffect } from "react";
import { useRouter } from "next/router";
import Utils from "@/Utils/Utils";

const useAuthHook = (time = 0) => {

    const router = useRouter();

    const getAccessToken = () => {
        return Utils?.getCookie("accessToken");
    };

    useEffect(() => {
        const timeOut = setTimeout(() => {
            getAccessToken() ? router.push("/create") : router.push("/");
        }, time * 1000);
        return (() => clearTimeout(timeOut))
    }, [router, time]);
}
export { useAuthHook };