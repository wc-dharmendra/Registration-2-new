import React, { useState, useEffect } from 'react';
import GlobalLayout from '../Layout/GlobalLayout';

const ErrorBoundary = ({ children }) => {
    const [err, setErr] = useState(null);

    const onError = (error, errorInfo) => {
        setErr({ error, errorInfo });
    };

    useEffect(() => {
        window.addEventListener('error', onError);
        return () => {
            window.removeEventListener('error', onError);
        };
    }, []);

    if (err) {
        return (
            <GlobalLayout>
                <div className='flex justify-center items-center h-[100vh] text-center'>
                    <div>
                        <h1 className='text-6xl font-bold mb-3'>Oops...</h1>
                        <h2 className='text-3xl'>Something went wrong</h2>
                        <p className='text-xl mt-3'>{err?.error?.message?.toString()}</p>
                        <p className='text-xl'>{err?.stack}</p>
                    </div>
                </div>
            </GlobalLayout>
        );
    }
    return children;
};

export default ErrorBoundary;
