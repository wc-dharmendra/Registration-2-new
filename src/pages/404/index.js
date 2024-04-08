import GlobalLayout from "@/Components/Layout/GlobalLayout";
import Svg from "../../../public/Assets/Svg";
import MetaData from '@/Components/MetaData/MetaData';
import { useAuthHook } from "@/CustomHook/AuthHook";


const _404 = () => {
    useAuthHook();
    return (
        <GlobalLayout>
            <MetaData title="404 Page" />
            <div className="flex items-center justify-center h-[100vh] text-center w-full">
                <div className="max-w-[485px]">
                    <div className="page-not-found-icon text-center flex justify-center p-3 mb-6">{Svg().PageNotFoundIcon}</div>
                    <p className="text-[#595C5C] mb-8">Looks like you discovered a page that doesn&apos;t exist or you don&apos;t have access to.</p>
                </div>
            </div>
        </GlobalLayout>
    )
}
export default _404;