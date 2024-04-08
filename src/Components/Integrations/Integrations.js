import useIntegration from "@/CustomHook/useIntegration";
import Utils from "@/Utils/Utils";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Svg from "../../../public/Assets/Svg";
import Button from "../Button/Button";
import Input from "../InputForm/InputForm";
import Modal from "../Modal/Modal";
import ToggleButton from "../ToggleButton/ToggleButton";
import useCommonStore from "@/Store/useCommonStore";
// import SkeletonIntegrations from "../Skeleton/SkeletonIntegrations";

const Integrations = () => {
  const {
    integrationSetting,
    updateIntegration,
    updateCustomIntegration,
    custom,
    onCustomChange,
    openPopUp,
    setOpenPopUp,
    setCustom,
    deleteCustomIntegration,
    applyCustomIntegration,
  } = useIntegration();

  const dropDownQuestionRef = useRef(null);
  const openDropQuestionRef = useRef(null);
  const [openDropQuestion, setOpenDropQuestion] = useState(false);
  const { isLoading } = useCommonStore();

  const handleDropQuestion = () => {
    setOpenDropQuestion(!openDropQuestion);
  };

  const onUpdate = (arr, value, e, matchWith) => {
    let payload = {};
    arr?.map((elem) => {
      if (elem?.[matchWith] === e?.[matchWith]) {
        payload[elem?.[matchWith]] = value;
      } else {
        payload[elem?.[matchWith]] = false;
      }
    });
    return payload;
  };

  useEffect(() => {
    Utils?.removeModal(dropDownQuestionRef, openDropQuestionRef, () => {
      setOpenDropQuestion(false);
    });
  }, [dropDownQuestionRef, openDropQuestionRef]);

  return (
    <Fragment>
      <div className="integration pb-8">
        <h2 className="head mb-2">Default WhatsApp Integrations</h2>
        <p>
          Optimise your experience with us by enabling WhatsApp integration from
          our integrated list.
        </p>

        {/* <SkeletonIntegrations /> */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 border-b pb-8 mb-8">
          {integrationSetting?.whatsapp?.length &&
            integrationSetting?.whatsapp?.map((e, i, arr) => {
              return (
                <div
                  key={e?.name}
                  className={`flex justify-between gap-2 items-center border rounded-md py-3 px-5`}
                >
                  <p
                    className={`font-medium ${
                      e?.value ? "opacity-100" : "opacity-50"
                    } text-[#131517]`}
                  >
                    {e?.label}
                  </p>
                  <ToggleButton
                    initialVal={e?.value ? 1 : 0}
                    onChange={(value, cb) => {
                      updateIntegration(
                        onUpdate(arr, value, e, "name"),
                        e?.value,
                        "whatsapp",
                        cb
                      );
                    }}
                  />
                </div>
              );
            })}
        </div>

        <h2 className="head mb-2">Default Email Integrations</h2>
        <p>
          Configure your email server effortlessly. Choose from our predefined
          list of servers for quick integration, or seamlessly add your custom
          server settings.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 mb-8">
          {integrationSetting?.smtp?.length
            ? integrationSetting?.smtp?.map((e, i, arr) => {
                return (
                  <div
                    key={e?.type}
                    className={`flex justify-between gap-2 items-center border rounded-md py-3 px-5`}
                  >
                    <p
                      className={`font-medium text-[#131517] ${
                        e?.value ? "opacity-100" : "opacity-50"
                      }`}
                    >
                      {e?.lable}
                    </p>
                    <ToggleButton
                      initialVal={e?.value ? 1 : 0}
                      onChange={(value, cb) => {
                        updateIntegration(
                          onUpdate(arr, value, e, "type"),
                          e?.value,
                          "smtp",
                          cb
                        );
                      }}
                    />
                  </div>
                );
              })
            : null}
        </div>

        <div className="flex justify-between items-center mb-6 mt-8 max-md:flex-col max-md:items-start max-md:gap-3">
          <h2 className="head">Add Your Own Email Integrations</h2>
          <div className="relative">
            <Button
              buttonRef={dropDownQuestionRef}
              type={"button"}
              className="text-sm btn-light justify-between flex items-center gap-5 stroke-[#595C5C] h-[30px] hover:stroke-white hover:fill-white"
              onClick={handleDropQuestion}
            >
              Select Email Integration
              {Svg().SingleSelect}
            </Button>
            {openDropQuestion ? (
              <div
                ref={openDropQuestionRef}
                className="boxShadow border p-1 absolute left-0 z-10 mt-3 w-[150px] rounded-md bg-white focus:outline-none"
              >
                <ul className="cursor-pointer">
                  {["Others"].map((item) => (
                    <li
                      key={item}
                      className={`text-[#131517] text-sm flex gap-2 justify-between items-center rounded-sm hover:bg-[#DFE0E1] p-1 font-medium stroke-[#131517] `}
                      onClick={() => {
                        setCustom({
                          host: "",
                          port: "",
                          encryption: 0,
                          sender_email: "",
                          username: "",
                          password: "",
                        });
                        setOpenPopUp(true);
                      }}
                    >
                      {item}{" "}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        {integrationSetting?.custom_smtp?.length
          ? integrationSetting?.custom_smtp?.map((e) => {
              return (
                <div className="border rounded-md p-5" key={e?.id}>
                  <div className="flex gap-2 items-center justify-between mb-2">
                    <p className="text-md text-[#131517] font-medium">Other</p>
                    <div className="flex items-center gap-5">
                      <ToggleButton
                        large={true}
                        initialVal={e?.status ? 1 : 0}
                        onChange={(val, cb) =>
                          applyCustomIntegration(e?.id, e?.status, cb)
                        }
                      />
                      <Button
                        showLoader={false}
                        disabled={isLoading}
                        onClick={() => deleteCustomIntegration(e?.id)}
                        type="button"
                      >
                        {Svg().Delete}
                      </Button>
                    </div>
                  </div>
                  <p className="text-[#969498] font-medium mb-2">Webhook URL</p>
                  <div className="relative">
                    <div className="flex gap-5 mb-3 flex-wrap">
                      <div>
                        <p className="font-medium text-sm">
                          SMTP Server Address
                        </p>
                        <p className="font-medium text-sm text-[#131517]">
                          {e?.value?.host}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">Port Number</p>
                        <p className="font-medium text-sm text-[#131517]">
                          {e?.value?.port}
                        </p>
                      </div>
                      <div>
                        <p className="font-medium text-sm">
                          Sender Email Address
                        </p>
                        <p className="font-medium text-sm text-[#131517]">
                          {e?.value?.sender_email.toLowerCase()}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        setOpenPopUp(true);
                        setCustom({
                          id: e.id,
                          host: e?.value?.host,
                          port: e?.value?.port,
                          encryption: e?.value?.encryption,
                          sender_email: e?.value?.sender_email,
                          username: e?.value?.username,
                          password: e?.value?.password,
                        });
                      }}
                      type={"button"}
                      className="text-sm btn-light justify-between flex items-center gap-3 fill-[#595C5C] h-[32px] hover:stroke-none hover:fill-white"
                    >
                      {Svg().Edit} Edit
                    </Button>
                  </div>
                </div>
              );
            })
          : null}
      </div>

      <Modal
        //onBtnClick={updateCustomIntegration}
        open={openPopUp}
        onClose={() => setOpenPopUp(false)}
        showBtn={false}
        headerTitle="SMTP Details"
        ModalWrapperCls="ModalBoxContainer sm:max-w-[480px]"
      >
        <Input
          name="host"
          val={custom?.host}
          onChange={(e) => {
            onCustomChange("host", e?.target?.value);
          }}
          type="text"
          inputCls="input mb-3"
          placeholder="Type Here"
          label="Smtp Server Address"
          autoFocus
        />
        <Input
          name="port"
          val={custom?.port}
          onChange={(e) => {
            onCustomChange("port", e?.target?.value);
          }}
          type="text"
          inputCls="input mb-3"
          placeholder="Type Here"
          label="Port Number"
        />
        <div className="flex gap-2 items-end mb-3">
          <Input
            name="username"
            val={custom?.username}
            onChange={(e) => {
              onCustomChange("username", e?.target?.value);
            }}
            type="text"
            inputCls="input"
            placeholder="Username"
            label="Creds"
          />
          <Input
            name="password"
            val={custom?.password}
            onChange={(e) => {
              onCustomChange("password", e?.target?.value);
            }}
            type="password"
            inputCls="input"
            placeholder="Password"
          />
        </div>
        <Input
          name="sender_email"
          val={custom?.sender_email}
          onChange={(e) => {
            onCustomChange("sender_email", e?.target?.value);
          }}
          type="email"
          inputCls="input mb-3"
          placeholder="Type Here"
          label="Sender Email Address"
        />
        <div className="flex gap-2 justify-between">
          <label>SSL/TLS</label>
          <ToggleButton
            large={true}
            initialVal={custom?.encryption ? 1 : 0}
            onChange={(val) => {
              onCustomChange("encryption", val ? 1 : 0);
            }}
          />
        </div>
        <Button
          type="button"
          className="btn-dark mt-3 min-w-[100px]"
          disabled={isLoading}
          btnText="Add"
          onClick={() => {
            updateCustomIntegration();
          }}
        />
      </Modal>
    </Fragment>
  );
};
export default Integrations;
