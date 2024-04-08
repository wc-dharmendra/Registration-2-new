import GlobalLayout from "../Layout/GlobalLayout";
import MetaData from "../MetaData/MetaData";

const NetworkErrorBoundary = ({ children }) => {
    const isNetworkError = false;
    return (isNetworkError ?
        <GlobalLayout>
            <MetaData title="Network Error" />
            <div className='flex justify-center items-center text-center h-[100vh]'>
                <div className="ErrorInbox">
                    <div className="ErrorInfo">
                        <p className="text-4xl mb-1 font-semibold">We are sorry at this moment!</p>
                        <p className="text-xl">Please check your internet connection.</p>
                        <p className='text-[#999] text-xl my-2'>or</p>
                        <p className="text-2xl mb-1 font-semibold">The page you are looking for might be temporarily unavailable.</p>
                        <p className="text-xl">Please come back after sometime.</p>
                    </div>
                </div>
            </div>
        </GlobalLayout>
        : children
    );
};

export default NetworkErrorBoundary;