import React, { useCallback, useEffect, useRef, useState } from "react";
import Svg from "../../../public/Assets/Svg";
import Button from "@/Components/Button/Button";
// import EmbedEventPage from "../EmbedEventPage/EmbedEventPage";
import { GetApiCall, PostApiCall } from "@/Api/ApiCall";
import EndPoint from "@/Api/EndPoint";
import useEventStore from "@/Store/useEventStore";
import useCommonStore from "@/Store/useCommonStore";
import Utils from "@/Utils/Utils";
import EmbedEventPage from "../EmbedEventPage/EmbedEventPage";
import Script from "next/script";
import Link from "next/link";

const More = () => {
  const { event } = useEventStore();
  const [url, setUrl] = useState("");
  const [moreData, setMoreData] = useState({});
  const { isLoading, setIsLoading } = useCommonStore();
  const [selectedOption, setSelectedOption] = useState('option1');
  const [scale, setScale] = useState(1);
  const [hidden, setHidden] = useState('hidden');

  const parentDivRef = useRef(null);

  const handleRadioChange = (value) => {
    setSelectedOption(value);
  };
  const onShortUrlUpdate = useCallback(() => {
    if (url) {
      setIsLoading(true);
      PostApiCall(
        EndPoint?.updateShortUrl(event?.id),
        { url },
        (cbData) => {
          setIsLoading(false);
          if (cbData?.success) {
            getMore();
          }
        },
        () => {
          setIsLoading(false);
        }
      );
    }
  }, [url]);

  const getMore = () => {
    setIsLoading(true);
    GetApiCall(
      EndPoint?.getMore(event?.id),
      (cbData) => {
        setIsLoading(false);
        if (cbData?.success) {
          setMoreData(cbData?.data?.response);
          setUrl(cbData?.data?.response?.short_url?.shortUrl);
        }
      },
      () => {
        setIsLoading(false);
      },
      false
    );
  };

  useEffect(() => {
    if (parentDivRef?.current) {
      const parentWidth = parentDivRef?.current?.clientWidth;
      const childWidth = 1025;
      const newScale = parentWidth / childWidth;
      setScale(newScale);
    }
    getMore();
    if (hidden === 'hidden') {
      document.body.classList.remove('overflow-hidden');
    } else {
      document.body.classList.add('overflow-hidden');
    }
  }, [selectedOption, hidden]);


  return (
    <div className="pb-8">
      <div className="w-full mb-6">
        <h1 className="heading-H1">Event Page</h1>
        <p className="paragraph">
          Customise the registration link to align with your marketing
          objectives.
        </p>
      </div>

      <div className="w-full">
        <span className="smallHeading">Public URL</span>
        <div className="flex items-center gap-3">
          <div className="flex items-center">
            <span className="text-[#131517] bg-[#DFE0E1] px-3 py-2 rounded-s-md">
              https://
            </span>
            <input
              value={url}
              onChange={(e) => setUrl(e?.target?.value)}
              type="text"
              className="inputURl w-full"
              placeholder="Short Url"
            />
          </div>

          <Button
            type="button"
            showLoader={false}
            disabled={isLoading}
            onClick={onShortUrlUpdate}
            className="buttonStyle"
          >
            Update
          </Button>
        </div>
      </div>

      <div className="pt-4">
        <div className="border-t border-slate-300 mt-3">
          <div className="w-full mb-5 mt-6">
            <h1 className="heading-H1">Embed Event</h1>
            <p className="paragraph">
              Ensure your content is accessible to everyone by publishing it to
              the web. You can either share a link to or embed your document.
            </p>
          </div>

          <div className="SpekerListAllInfo flex items-center justify-between w-full gap-4 max-sm:flex-col">
            <div className="inputGroup sm:w-[50%] max-sm:w-full">
              <input
                id="interakt"
                name="whatsApp"
                type="radio"
                value="interakt"
                checked={selectedOption === 'option1'}
                onChange={() => handleRadioChange('option1')}
              />
              <label htmlFor="interakt" className="EmbedEventBtn PaddCustom">
                <span className="iconSvgBg">{Svg().EmbedBtnIcon}</span> Embed as
                Button
              </label>
            </div>
            <div className="inputGroup sm:w-[50%] max-sm:w-full">
              <input
                id="whatsappAPI"
                name="whatsApp"
                type="radio"
                value="whatsappAPI"
                checked={selectedOption === 'option2'}
                onChange={() => handleRadioChange('option2')}
              />
              <label htmlFor="whatsappAPI" className="EmbedEventBtn PaddCustom">
                <span className="iconSvgBg">{Svg().EmbedPageIcon}</span> Embed
                Event Page
              </label>
            </div>
          </div>
        </div>
      </div>

      {selectedOption === 'option1' ?
        <div>
          <div className="pt-4">
            <div className="w-full mb-3 mt-6">
              <p className="paragraph text-[#131517]">
                Paste the following HTML code snippet to your page:
              </p>
            </div>

            <div className="relative">
              <pre className="bg-[#FFFFFF] relative rounded-lg px-4 py-4 w-full boxShadow overflow-x-auto">
                <pre className="copyLinkInfo">
                  <span>&lt;buttton </span>
                  <span>data-action-id=&apos;reg-button&apos;</span>
                  <span>data-url=&apos;{process.env.NEXT_PUBLIC_FRONT_API_URL}{event?.slug}&apos;</span>
                  <span>&gt;</span> Register for Event<span>&lt;/button&gt; </span>
                </pre>
                <span className="break-all whitespace-normal">
                  &lt;script
                  src=&quot;https://diy-registration-and-ticketing.s3.ap-south-1.amazonaws.com/diy_registration_staging/preview.js&quot;&gt;&lt;/script&gt;{" "}
                </span>
              </pre>

              <Button type="button" className="copyLink" onClick={() => {
                Utils?.copyText(`
                <button data-action-id='reg-button' data-url='${process.env.NEXT_PUBLIC_FRONT_API_URL}${event?.slug}'>Register for event</button>
                <script src="https://diy-registration-and-ticketing.s3.ap-south-1.amazonaws.com/diy_registration_staging/preview.js"></script>`);
              }}>
                {Svg()?.CopyLink} Copy
              </Button>
            </div>
          </div>

          <div className="pt-4">
            <div className="w-full pt-3 pb-4">
              <p className="paragraphHead">
                This gives you the following button. Click it to see it in action!
              </p>
            </div>

            <div className="bg-[#FFFFFF] relative rounded-lg px-4 py-4 w-full boxShadow">
              <div className="flex items-center justify-center text-center min-h-[100px]">
                {/* <button data-action-id='reg-button' onClick={() => {
                  const url = process.env.NEXT_PUBLIC_FRONT_API_URL + event?.slug
                  window.open(url, '_blank');
                }}>
                  Register for event
                </button> */}
                {/* <button data-action-id='reg-button' onClick={() => setHidden('')}>Register for event</button> */}
                <Link
                  target="_blank"
                  href={`${process.env.NEXT_PUBLIC_FRONT_API_URL}${event?.slug}`}
                  className="reg-button-more"
                >
                  <span className="hidden sm:block whitespace-nowrap">
                    Register for event
                  </span>
                </Link>
                <div id="myDIV" className={`${hidden}`}>
                  <div id="close-btn" onClick={() => setHidden('hidden')}>
                    {Svg().Close}
                  </div>
                  <div className="content-wrapper">
                    <div className="content">
                      <iframe title="Preview" width="100%" height="1000" src={`${process.env.NEXT_PUBLIC_FRONT_API_URL}${event?.slug}`}></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full pt-4">
              <p className="paragraphHead">
                Should you prefer to employ your own styling for the button, kindly
                omit the class from the snippet provided above.
              </p>
            </div>
          </div>
        </div> :
        <div>
          <div className="pt-4">
            <div className="w-full mb-3 mt-6">
              <p className="paragraph text-[#131517]">
                Paste the following HTML code snippet to your page:
              </p>
            </div>

            <div className="relative">
              <pre className="bg-[#FFFFFF] relative rounded-lg px-4 py-4 w-full boxShadow overflow-x-auto">
                <pre className="copyLinkInfo">
                  <span>&lt;iframe </span>
                  <span>src=&apos;{process.env.NEXT_PUBLIC_FRONT_API_URL}{event?.slug}&apos;</span>
                  <span>width=&apos;100%&apos; height=&apos;400&apos;</span>
                  <span>&gt;</span><span>&lt;/iframe&gt; </span>
                </pre>
              </pre>
              <Button type="button" className="copyLink" onClick={() => {
                Utils?.copyText(`<iframe src=${process.env.NEXT_PUBLIC_FRONT_API_URL}${event?.slug} width='100%' height="400" frameBorder='0' style=''></iframe>`);
              }}>
                {Svg().CopyLink} Copy
              </Button>
            </div>
            <div className="w-full pt-3 pb-4">
              <p className="paragraphHead">
                You can change the width and height attributes above to fit the size of your page. This is what you will see:
              </p>
            </div>
          </div>
          <div className="EmbedEventPage">
            <div className="frontend-view relative pb-[100%]" ref={parentDivRef}>
              <iframe scrolling="no" title="Preview" className="absolute left-0 top-0 rounded-lg overflow-hidden origin-top-left w-[1024px] pointer-events-none" width={'100%'} height={'1000px'} style={{ overflow: 'hidden', transform: 'scale(' + scale + ')' }} src={`${process.env.NEXT_PUBLIC_FRONT_API_URL}${event?.slug}`}></iframe>
            </div>
          </div>

        </div>
      }

    </div>
  );
};
export default More;
