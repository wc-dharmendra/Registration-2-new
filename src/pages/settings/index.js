import React, { Fragment } from "react";
import EventLayout from "@/Components/Layout/EventLayout";
import Svg from "../../../public/Assets/Svg";
import Utils from "@/Utils/Utils";
import MetaData from "@/Components/MetaData/MetaData";
import Input from "@/Components/InputForm/InputForm";
import Button from "@/Components/Button/Button";
import SearchableSelect from "@/Components/SearchableSelect/SearchableSelect";
import useSettings from "@/CustomHook/useSettings";
import FileUploader from "@/Components/FileUploader/FileUploader";
import Modal from "@/Components/Modal/Modal";
import useUserStore from "@/Store/useUserStore";
import useCommonStore from "@/Store/useCommonStore";
import Link from "next/link";

const Settings = () => {
  const {
    isLink,
    setIsLink,
    handleItemClickLink,
    linkButtonRef,
    linkDropRef,
    handleDropLink,
    openLinkDrop,
    isFocused,
    setIsFocused,
    inputData,
    onChange,
    profileSave,
    updateEmail,
    updatePassword,
    updatePhone,
    changePasswordPopup,
    onChangePasswordPopupClose,
    onForgotPasswordPopupClose,
    user,
    isClient,
    onProfileChange,
    forgotPasswordPopup,
    setForgotPasswordPopup,
    onForgetPassword,
    onPasswordClick,
  } = useSettings();

  const { isPasswordSet, prevLocation } = useUserStore();
  const { isLoading } = useCommonStore();

  return (
    <EventLayout>
      <MetaData title="Setting Page" />
      {isClient ? (
        <Fragment>
          <div className="border-b border-slate-300">
            <div className="container lg:w-[820px] mx-auto pt-2 pb-4 sm:pb-6 md:pb-6 lg:pb-8 px-4">
              <h1 className="flex items-center gap-0 font-semibold text-2xl xs:text-3xl sm:text-3xl md:text-3xl lg:text-3xl text-[#131517]">
                <Link
                  href={prevLocation}
                  className="cursor-pointer relative left-[-10px]"
                >
                  {Svg().BackArrow}
                </Link>
                Settings
              </h1>
            </div>
          </div>
          <div className="container lg:w-[820px] xs:w-[100%] mx-auto py-4 px-4">
            <article>
              <h2 className="font-semibold text-[#131517] text-[18px] sm:text-[20px] md:text-[20px] lg:text-[20px]">
                Your Profile
              </h2>
              <p className="font-medium text-[#595C5C] text-sm sm:text-base md:text-base lg:text-base">
                Choose how you are displayed as a host or guest.
              </p>
            </article>

            <div className="mt-5 flex-none xs:flex sm:flex md:flex lg:flex flex-row xs:flex-row-reverse sm:flex-row-reverse md:flex-row-reverse xl:flex-row-reverse items-start gap-0 sm:gap-16 md:gap-16 lg:gap-16">
              <div className="flex-1 mb-4">
                <label
                  htmlFor="profile-picture"
                  className="font-medium text-[#595C5C] text-sm"
                >
                  Profile Picture
                </label>
                <div className="relative mt-1 flex items-center justify-center boxShadow w-[100px] h-[100px] bg-[#0E94FF] rounded-full text-[44px] text-[#FFFFFF] focus:bg-[transparent]">
                  {user?.first_name?.[0] + user?.last_name?.[0]}
                  <FileUploader
                    avatar={inputData?.avatar}
                    cropImage={false}
                    isProfile={true}
                    id="userProfile"
                    cls="absolute w-full h-full opacity-0 z-10 cursor-pointer overflow-hidden text-[0]"
                    imgCls="absolute w-full h-full rounded-full overflow-hidden cursor-pointer"
                    cb={onProfileChange}
                  />
                  {Svg()?.UpArrow("absolute bottom-[-8px] right-[-14px] z-[5]")}
                </div>
              </div>
              <form
                className="form w-full  xs:w-[320px] sm:w-[320px] md:w-[320px] lg:w-[320px]"
                onSubmit={profileSave}
              >
                <div className="flex flex-col mb-2">
                  <div className="flex items-center gap-2">
                    <label className="font-medium block relative mb-1 text-sm text-[#595C5C] break-all">
                      Host Display Name & URL
                    </label>
                    <div className="relative info-icon-wrapper">
                      <div className="info-icon">{Svg().InfoIcon}</div>
                      <div className="info-box p-2 border rounded-md text-[12px] font-medium min-h-[50px] shadow-md absolute min-w-[250px] bg-white left-[-125px] sm:left-full top-full sm:top-0 z-10 ml-2 transition-all">
                        Please input the host name and link you wish to showcase
                        in the Host Details section on the event page.
                      </div>
                    </div>
                  </div>
                  <Input
                    maxLength={40}
                    autoFocus
                    placeholder="Display Name"
                    inputCls={"input mb-3"}
                    name="host_name"
                    val={inputData?.host_name}
                    onChange={onChange}
                  />
                  {/* <Input placeholder="Your Website" wrapperCls="relative mb-3" inputCls={'input paddCustom'} name="link" val={inputData?.link} onChange={onChange} showIcon={true} iconName='LinkSvgIcon' /> */}
                  <div className="relative mb-3">
                    {isLink ? (
                      <div>
                        <Input
                          placeholder="Enter url"
                          wrapperCls="relative"
                          inputCls={"input paddCustom"}
                          name="link"
                          val={inputData?.link}
                          onChange={onChange}
                          showIcon={true}
                          iconName={isLink}
                        />
                        <Button
                          buttonRef={linkButtonRef}
                          type={"button"}
                          className="stroke-[#595C5C] h-[34px] hover:fill-white px-2 bg-white absolute right-1 top-1"
                          onClick={handleDropLink}
                        >
                          {Svg().SingleSelect}
                        </Button>
                      </div>
                    ) : (
                      <Button
                        buttonRef={linkButtonRef}
                        type={"button"}
                        className="justify-between flex items-center gap-5 stroke-[#595C5C] h-[40px] hover:fill-white border w-full px-2 rounded-md bg-white"
                        onClick={handleDropLink}
                      >
                        Select
                        {Svg().SingleSelect}
                      </Button>
                    )}
                    {openLinkDrop ? (
                      <div
                        ref={linkDropRef}
                        className="boxShadow border p-1 absolute left-0 z-10 mt-3 w-full rounded-md bg-white focus:outline-none"
                      >
                        <ul className="cursor-pointer">
                          {
                            // ["Website", "Facebook", "Linkedin", "Twitter"]
                            user?.profile_type?.length
                              ? user?.profile_type?.map((item) => (
                                  <li
                                    key={item?.label}
                                    className={`text-[#595c5c] text-sm flex gap-2 items-center rounded-sm hover:bg-[#DFE0E1] p-1 font-medium `}
                                    onClick={() =>
                                      handleItemClickLink(
                                        Utils?.capitalizeFirstWord(
                                          item?.value === "company"
                                            ? "Website"
                                            : item?.value
                                        )
                                      )
                                    }
                                  >
                                    {
                                      Svg()?.[
                                        Utils?.capitalizeFirstWord(
                                          item?.value === "company"
                                            ? "Website"
                                            : item?.value
                                        )
                                      ]
                                    }
                                    {item?.label}
                                  </li>
                                ))
                              : null
                          }
                        </ul>
                      </div>
                    ) : null}
                  </div>

                  <Input
                    maxLength={40}
                    placeholder="First Name"
                    inputCls={"input mb-3"}
                    label="First Name"
                    name="first_name"
                    val={inputData?.first_name}
                    onChange={onChange}
                  />
                  <Input
                    maxLength={40}
                    placeholder="Last Name"
                    inputCls={"input mb-3"}
                    label="Last Name"
                    name="last_name"
                    val={inputData?.last_name}
                    onChange={onChange}
                  />
                </div>
                <Button
                  disabled={isLoading}
                  className="buttonStyle flex gap-2 items-center"
                >
                  {Svg().SaveChagnes} Save Changes
                </Button>
              </form>
            </div>

            <div className="divide-y divide-gray-400 hover:divide-y-8"></div>
            <div className="diviverLine">
              <div>
                <h2 className="font-semibold text-[18px] sm:text-[20px] md:text-[20px] lg:text-[20px] text-[#131517]">
                  Email & Phone
                </h2>
                <p className="font-medium text-[#595C5C] text-sm sm:text-base md:text-base lg:text-base">
                  Manage the email and phone you use to sign in and receive
                  notifications.
                </p>
              </div>

              <div className="grid-none sm:grid md:grid lg:grid grid-cols-2 gap-16 mt-4">
                <div>
                  <div className="flex flex-1 flex-baseline items-end gap-2 w-full">
                    <Input
                      readOnly={user?.email}
                      placeholder="Enter Email"
                      inputCls={"input"}
                      labelCls="font-medium text-[#595C5C] text-sm mb-3 block"
                      label="Email"
                      name="email"
                      val={inputData?.email}
                      onChange={onChange}
                    />
                    <Button
                      type="button"
                      onClick={updateEmail}
                      showLoader={false}
                      disabled={user?.email}
                      className={`buttonStyle flex gap-2 items-center ${
                        user?.email ? "opacity-80" : ""
                      }`}
                    >
                      {" "}
                      Update
                    </Button>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="whatsapp"
                    className="font-medium text-[#595C5C] text-sm mb-3 block"
                  >
                    Whatsapp Number
                  </label>
                  <div className="flex flex-1 items-end gap-2">
                    <div
                      className={`flex w-full border rounded-lg h-[40px] relative ${
                        isFocused ? "border-[#000]" : "border-[#EBECED]"
                      }`}
                    >
                      <SearchableSelect
                        readOnly={user?.phone}
                        options={Utils?.countryCode}
                        onChange={onChange}
                        value={inputData?.dial_code}
                        cls="border-r max-w-[90px] grow-0 shrink-0"
                      />
                      <Input
                        readOnly={user?.phone}
                        name="phone"
                        onChange={onChange}
                        val={inputData?.phone}
                        placeholder="982809820"
                        inputCls="w-full rounded-md h-[38px] px-2 focus:outline-none"
                        onFocus={() => setIsFocused(true)}
                        maxLength={15}
                        onBlur={() => setIsFocused(false)}
                      />
                    </div>
                    <Button
                      onClick={updatePhone}
                      showLoader={false}
                      disabled={user?.phone}
                      type="button"
                      className={`buttonStyle ${
                        user?.phone ? "opacity-80" : ""
                      }`}
                    >
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="diviverLine">
              <div>
                <h2 className="font-semibold text-[18px] sm:text-[20px] md:text-[20px] lg:text-[20px] text-[#131517]">
                  Password
                </h2>
                <p className="font-medium text-[#595C5C] text-base sm:text-base md:text-base lg:text-base">
                  Secure your account with password.
                </p>
              </div>
              <div className="bg-[#FFFFFF] boxShadow  rounded-lg mt-4 sm:mt-4 md:mt-4 lg:mt-4">
                <div className="px-4 py-4">
                  <div className="flex-none sm:flex md:flex lg:flex items-center justify-between gap-3">
                    <div
                      className={`flex items-center flex-1 ${
                        isPasswordSet ? "mb-4" : ""
                      }`}
                    >
                      <div className="mr-2">{Svg().LockIcon}</div>
                      <div className="AcPassword">
                        <h3 className="text-base font-semibold text-[#131517]">
                          Account Password
                        </h3>
                        {isPasswordSet ? (
                          <p className="text-sm color-[#595C5C]">
                            Please follow the instructions in the email to
                            finish setting your password.
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                    <div>
                      <Button
                        type="button"
                        onClick={onPasswordClick}
                        className="buttonStyle flex gap-2 text-gray-700 rounded-md bg-[#333537] hover:bg-[#131517] focus:bg-[#131517] block px-4 py-2 text-sm text-left max-sm:mt-2"
                      >
                        {isPasswordSet ? "Change Password" : "Set Password"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Modal
            isBtnDisabled={isLoading}
            onBtnClick={updatePassword}
            open={changePasswordPopup}
            onClose={onChangePasswordPopupClose}
            btnText="Update Password"
            title="Update Password"
            icon="UpdatePassword"
            subchildren={
              <Button
                disabled={isLoading}
                type="button"
                onClick={(e) => {
                  onPasswordClick(e, true);
                }}
                className="block w-full font-medium align-center text-center text-[#969498] mt-6 mb-1 text-sm sm:text-base md:text-base lg:text-base"
              >
                Forgot your password?
              </Button>
            }
          >
            <p className="font-medium text-[#595C5C] pb-3 text-sm sm:text-base md:text-base lg:text-base">
              Please choose a strong password of at least 8 characters.
            </p>
            <div className="mb-4">
              <label className="font-medium text-[#131517] pb-1 text-sm sm:text-base md:text-base lg:text-sm">
                Current Password
              </label>
              <Input
                type="password"
                autoFocus
                name="old_password"
                onChange={onChange}
                val={inputData?.old_password}
                inputCls="input p-3.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  bg-[#fff]"
                placeholder="Current Password"
              />
            </div>
            <div className="mb-2">
              <label className="font-medium text-[#131517] pb-1 text-sm sm:text-base md:text-base lg:text-sm">
                New Password
              </label>
              <Input
                type="password"
                name="password"
                onChange={onChange}
                val={inputData?.password}
                inputCls="input block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                placeholder="New Password"
              />
            </div>
          </Modal>

          <Modal
            onBtnClick={onForgetPassword}
            open={forgotPasswordPopup}
            onClose={onForgotPasswordPopupClose}
            btnText="Submit"
            title="Set Password"
            icon="ForgotPasswordIcon"
          >
            <p className="font-medium text-[#595C5C] pb-3 text-sm sm:text-base md:text-base lg:text-base">
              Please choose a strong password of at least 8 characters.
            </p>
            <div className="mb-4">
              <label className="font-medium text-[#131517] pb-1 text-sm sm:text-base md:text-base lg:text-sm">
                New Password
              </label>
              <Input
                type="password"
                autoFocus
                name="password"
                onChange={onChange}
                val={inputData?.password}
                inputCls="input p-3.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  bg-[#fff]"
                placeholder="New Password"
              />
            </div>
            <div className="mb-2">
              <label className="font-medium text-[#131517] pb-1 text-sm sm:text-base md:text-base lg:text-sm">
                Confirm Password
              </label>
              <Input
                type="password"
                name="password_confirmation"
                onChange={onChange}
                val={inputData?.password_confirmation}
                inputCls="input block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
                placeholder="Confirm Password"
              />
            </div>
          </Modal>
        </Fragment>
      ) : null}
    </EventLayout>
  );
};

export async function getServerSideProps(ctx) {
  const { query, req, res } = ctx;
  const token = Utils?.getCookie("accessToken", ctx);
  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return { props: {} };
}

export default Settings;
