import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import Svg from "../../../public/Assets/Svg";
import Image from "next/image";
import useHeader from "@/CustomHook/useHeader";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import StarRating from "../StarRating/StarRating";
import useEventStore from "@/Store/useEventStore";
import { useRouter } from "next/router";
import useCommonStore from "@/Store/useCommonStore";
import Utils from "@/Utils/Utils";
import dayjs from "dayjs";
import useUserStore from "@/Store/useUserStore";

const Header = () => {
  const {
    dropDownRef,
    profileRef,
    helpNSupportRef,
    helpRef,
    openProfile,
    helpSupport,
    handleClickOpen,
    handleOnOpen,
    onLogout,
    techPopup,
    setTechPopup,
    user,
    onChange,
    inputData,
    knowledgeBasePopup,
    setKnowledgeBasePopup,
    feedBackPopup,
    setFeedBackPopup,
    onTechPopupClose,
    onKnowledgeBasePopupClose,
    onfeedBackPopupPopupClose,
    isClient,
    onTechSupportSubmit,
    onFeedbackSubmit,
  } = useHeader();
  const { event } = useEventStore();
  const { isLoading } = useCommonStore();
  const { setPrevLocation } = useUserStore();

  const router = useRouter();
  const [isSettingActive, setIsSettingActive] = useState(false);
  const [isCatActive, setIsCatActive] = useState(false);
  const [currentTime, setCurrentTime] = useState(
    dayjs().format("HH:mm [GMT]Z")
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(dayjs().format("HH:mm [GMT]Z"));
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Check if the URL contains 'category-matrix'
    const isSettingActive = router.asPath.includes("event");
    const isCategoryMatrixActive = router.asPath.includes("category-matrix");
    setIsSettingActive(isSettingActive);
    setIsCatActive(isCategoryMatrixActive);
  }, [router.asPath]);

  return (
    <Fragment>
      <header>
        <div className="flex items-center justify-between py-4">
          <div className="LeftSideWap flex gap-3">
            {isClient && event?.id ? (
              <>
                <Link
                  href="/event"
                  className={`${
                    router?.pathname === "/event" ? "pointer-events-none" : ""
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <div
                      className={`HeadIconIcon ${
                        isSettingActive
                          ? "stroke-[#333537] text-[#333537]"
                          : "stroke-[#969498]"
                      }`}
                    >
                      {Svg().EventSettingsIcon}
                    </div>
                    <div
                      className={` ${
                        isSettingActive ? "text-[#333537] " : "text-[#969498]"
                      } font-normal text-sm  hidden sm:block`}
                    >
                      Event Settings
                    </div>
                  </div>
                </Link>
                <Link
                  href="/category-matrix"
                  className={`${
                    router?.pathname === "/category-matrix"
                      ? "pointer-events-none"
                      : ""
                  }`}
                >
                  <div className="flex items-center justify-center gap-1">
                    <div
                      className={`HeadIconIcon w-[24px] ${
                        isCatActive
                          ? "stroke-none text-[#333537] fill-[#333537]"
                          : "stroke-none fill-[#969498]"
                      }`}
                    >
                      {Svg().MatrixCatgoryHead}
                    </div>
                    <div
                      className={`${
                        isCatActive ? "text-[#333537]" : "text-[#969498]"
                      } font-normal text-sm  hidden sm:block`}
                    >
                      Catgory Matrix
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              ""
            )}
          </div>
          <div className="RightSideWap">
            <div className="flex items-center justify-center gap-2">
              {isClient ? (
                <div className="text-[#969498] font-normal text-sm">
                  {/* {dayjs()?.format("HH:mm Z")} */}
                  {currentTime}
                </div>
              ) : null}
              <div className="helpIcon cursor-pointer relative">
                {/* <Image
                  ref={helpRef}
                  onClick={handleOnOpen}
                  src={"/Assets/Images/help.webp"}
                  width={21}
                  height={21}
                  priority
                  alt="Help icon"
                  title="Help"
                /> */}
                <img
                  ref={helpRef}
                  onClick={handleOnOpen}
                  src={`/${process.env.NEXT_PUBLIC_BASE_URL}/Assets/Images/help.webp`}
                  width={21}
                  height={21}
                  // priority
                  alt="Help icon"
                  title="Help"
                />
                {/* <img src={Help.src} alt='help'/> */}
                {helpSupport ? (
                  <div
                    ref={helpNSupportRef}
                    className="boxShadow border absolute right-0 z-10 mt-3 w-[260px] origin-top-right rounded-md bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-0">
                      <div className="px-4 mb-1">
                        <div className="flex items-center flex-1  py-2 border-b">
                          <h3 className="text-lg font-semibold text-[#131517]">
                            Help & Support
                          </h3>
                        </div>
                      </div>
                      <div className="p-2 py-3">
                        <Button
                          type="button"
                          onClick={() => {
                            setTechPopup(true);
                            handleOnOpen();
                          }}
                          className="text-gray-700 px-2 rounded-md hover:bg-[#F0EFEF] block py-1 text-sm w-full text-left"
                        >
                          Tech Support
                        </Button>
                        {/* ? <Button type='button' onClick={() => { setKnowledgeBasePopup(true) }} className='text-gray-700 rounded-md hover:bg-[#00000014] block px-4 py-2 text-sm w-full text-left'>Knowledge Base</Button> */}
                        <Button
                          type="button"
                          onClick={() => {
                            setFeedBackPopup(true);
                            handleOnOpen();
                          }}
                          className="text-gray-700 px-2 rounded-md hover:bg-[#F0EFEF] block py-1 text-sm w-full text-left"
                        >
                          Submit Your Feedback
                        </Button>
                      </div>
                    </div>
                    <div className="clipPath absolute top-[-5px] right-[10px] w-[10px] h-[5px] bg-[#FFFFFF]"></div>
                  </div>
                ) : null}
              </div>
              <div className="relative">
                {isClient && (
                  <button
                    ref={profileRef}
                    onClick={handleClickOpen}
                    className="Profile flex items-center justify-center bg-[#0E94FF] h-7 w-7 rounded-3xl text-sm text-white cursor-pointer"
                  >
                    {user?.avatar ? (
                      <img
                        className="w-7 h-7 object-cover object-center rounded-full"
                        src={user?.avatar}
                        width={21}
                        height={21}
                        alt="Avatar icon"
                        title="avatar"
                      />
                    ) : (
                      user?.first_name?.[0] + user?.last_name?.[0]
                    )}
                  </button>
                )}

                {openProfile ? (
                  <div
                    ref={dropDownRef}
                    className="boxShadow border absolute right-0 z-10 mt-3 w-[260px] origin-top-right rounded-md bg-white  ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1" role="none">
                      <div className="flex items-center flex-1 mb-1 py-2 px-2 border-b">
                        <div className="Profile flex items-center justify-center bg-[#0E94FF] h-8 w-8 min-w-[2rem] rounded-3xl text-white cursor-pointer mr-2">
                          {user?.avatar ? (
                            <img
                              className="w-8 h-8 object-cover object-center rounded-full"
                              src={user?.avatar}
                              width={21}
                              height={21}
                              alt="Avatar icon"
                              title="avatar"
                            />
                          ) : (
                            user?.first_name?.[0]
                          )}
                        </div>
                        <div className="AcPassword">
                          <h3 className="text-base font-semibold text-[#131517]">{`${
                            user?.first_name + " " + user?.last_name
                          }`}</h3>
                          <p className="text-sm color-[#969498] break-all text-[13px]">
                            {user?.email?.toLowerCase()}
                          </p>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link
                          href="/settings"
                          className={`text-gray-700 hover:bg-[#F0EFEF] block px-2 py-1 text-sm rounded-md transition-all ${
                            router?.pathname === "/settings"
                              ? "pointer-events-none opacity-50"
                              : ""
                          }`}
                          onClick={() => {
                            setPrevLocation(router?.pathname);
                          }}
                        >
                          Settings
                        </Link>
                        <form onSubmit={onLogout}>
                          <Button className="text-[#DE3C34] hover:bg-[#F0EFEF] block w-full px-2 py-1 text-left text-sm rounded-md transition-all">
                            Sign out
                          </Button>
                        </form>
                      </div>
                    </div>
                    <div className="clipPath absolute top-[-5px] right-[10px] w-[10px] h-[5px] bg-[#FFFFFF]"></div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </header>
      <Modal
        onBtnClick={onTechSupportSubmit}
        open={techPopup}
        onClose={onTechPopupClose}
        title="Tech Support"
        icon="TechSupportIcon"
        isBtnDisabled={isLoading}
        subchildren={
          <Fragment>
            {/* <p className="font-medium text-[#595C5C] pt-4 pb-4 text-center text-sm sm:text-base md:text-base lg:text-sm">
              Or connect via WhatsApp
            </p> */}
            {/* <a
              href={`https://api.whatsapp.com/send?phone=${process.env.NEXT_PUBLIC_WHATSAPP_CONNECT}`}
              target="_blank"
              className="bg-[#DFE0E1] text-[#595C5C] items-center  justify-center py-2 px-2 text-[14px] sm:text-[16px] md:text-[16px] lg:text-[16px] rounded-lg w-full flex gap-2"
            >
              {Svg()?.WhatsAppIcon} Click Here
            </a> */}
          </Fragment>
        }
      >
        <p className="font-medium text-[#595C5C] pb-3 text-sm sm:text-base md:text-base lg:text-sm">
          Share your concern
        </p>
        <textarea
          maxLength={280}
          onChange={onChange}
          name="question"
          value={inputData?.question}
          autoFocus
          rows="3"
          className="textarea"
          placeholder="Type here"
        ></textarea>
      </Modal>
      <Modal
        open={knowledgeBasePopup}
        onClose={onKnowledgeBasePopupClose}
        title="Knowledge Base"
        icon="TechSupportIcon"
      >
        <p>test</p>
      </Modal>
      <Modal
        onBtnClick={onFeedbackSubmit}
        open={feedBackPopup}
        isBtnDisabled={isLoading}
        onClose={onfeedBackPopupPopupClose}
        title="Submit Your Feedback"
        icon="FeedBackIcon"
      >
        <StarRating
          name="rating"
          onChange={onChange}
          initialRating={inputData?.rating}
        />
        <p className="font-medium text-[#595C5C] pb-3 text-sm sm:text-base md:text-base lg:text-sm">
          Your suggestions
        </p>
        <textarea
          maxLength={280}
          onChange={onChange}
          value={inputData?.feedback}
          name="feedback"
          autoFocus
          id="message"
          rows="4"
          className="textarea"
          placeholder="Type here"
        ></textarea>
      </Modal>
    </Fragment>
  );
};

export default Header;
