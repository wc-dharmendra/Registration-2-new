import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ErrorBoundary from '@/Components/ErrorBoundary/ErrorBoundary';
import NetworkErrorBoundary from '@/Components/NetworkErrorBoundary/NetworkErrorBoundary';
// import { ThemeProvider } from "next-themes";
import { useEffect } from 'react';
import Script from 'next/script';

const App = ({ Component, pageProps }) => {

  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }

  useEffect(() => {
    appHeight();
    window.addEventListener('resize', appHeight)
  }, []);

  return (
    <NetworkErrorBoundary>
      <ErrorBoundary>
        {/* <ThemeProvider> */}
        <Component {...pageProps} />
        {/* <Script src="https://diy-registration-and-ticketing.s3.ap-south-1.amazonaws.com/diy_registration_staging/preview.js" /> */}
        <ToastContainer />
        {/* </ThemeProvider> */}
      </ErrorBoundary>
    </NetworkErrorBoundary>
  )
};

export default App;
