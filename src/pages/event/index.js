import { Fragment, useEffect, useState } from "react";
import Form, { CustomisedEmail } from "@/Components/Form/Form";
import Overview, { EditEventOverview } from "@/Components/Overview/Overview";
import More from "@/Components/More/More";
import Emails, { AddReminder, AddFeedback } from "@/Components/Emails/Emails";
import MBadge from "@/Components/MBadge/MBadge";
import Integrations from "@/Components/Integrations/Integrations";
import EventLayout from "@/Components/Layout/EventLayout";
import Tabbing from "@/Components/Tabbing/Tabbing";
import Svg from "../../../public/Assets/Svg";
import MetaData from "@/Components/MetaData/MetaData";
import Utils from "@/Utils/Utils";
import useEvent from "@/CustomHook/useEvent";
import ModalRight from "@/Components/Modal/ModalRight";
import EndPoint from "@/Api/EndPoint";
import { fetchDataInServerSide } from "@/Api/OnDataSend";
import useEventStore from "@/Store/useEventStore";
import Link from "next/link";
import Discount from "@/Components/Discount/Discount";
import EditDiscount from "@/Components/Discount/EditDiscount";
import Payment from "@/Components/Payment/Payment";
import useDiscounts from "@/CustomHook/useDiscounts";
import Insight from "@/Components/Insight/Insight";

const EventPage = ({ eventData, eventSetting }) => {
  const {
    currentTab,
    setCurrentTab,
    tabData,
    openAddHost,
    setOpenAddHost,
    openEditHost,
    setOpenEditHost,
    isClient,
    isOpen,
    setIsOpen,
    isModalOpen,
    setIsModalOpen,
    isMbadgeOpen,
    setIsMbadgeOpen,
  } = useEvent();

  const { setEvent, setIsEditEvent, setCreateEventSetting } = useEventStore();
  const [isCb, setIsCb] = useState(false);
  const [modalHeading, setModalHeading] = useState('');
  const [builderData, setBuilderData] = useState({});

  const {
    formData,
    setFormData,
    duplicateDiscount,
    deleteDiscount,
    getAllDiscounts,
    saveDiscountData,
    discounts,
    setDiscounts,
    getCategoryList,
    catData,
    handleCatSelection,
    discountStatusChange,
    prefillSelectedCatData,
    categoriesList,
    createArr,
  } = useDiscounts();

  const dataAsProps = {
    eventData,
    openAddHost,
    setOpenAddHost,
    openEditHost,
    setOpenEditHost,
    isClient,
    isOpen,
    setIsOpen,
    setIsModalOpen,
    setIsMbadgeOpen,
    setIsCb,
    modalHeading,
    setModalHeading,
    setBuilderData,
    builderData,
    isModalOpen
  };

  const DiscountProps = {
    formData,
    setFormData,
    duplicateDiscount,
    deleteDiscount,
    getAllDiscounts,
    saveDiscountData,
    discounts,
    setDiscounts,
    getCategoryList,
    catData,
    handleCatSelection,
    discountStatusChange,
    setIsModalOpen,
    prefillSelectedCatData,
    categoriesList,
    createArr,
  };

  let modalContent = "Edit event content here";
  let modalTitle = "Edit Event";

  const switchTab = (tab) => {
    switch (tab) {
      case 0:
        modalContent = <EditEventOverview isCb={isCb} />;
        modalTitle = "Edit Event";
        return <Overview {...dataAsProps} />;
      case 1:
        modalContent = <CustomisedEmail />;
        modalTitle = "Customise Email";
        return <Form {...dataAsProps} />;
      case 2:
        return <MBadge {...dataAsProps} />;
      case 3:
        modalContent = <EditDiscount {...DiscountProps} />;
        modalTitle = formData?.id ? "Update Discount" : "Add New Discount";
        return <Discount {...dataAsProps} {...DiscountProps} />;
      case 4:
        modalContent = <AddReminder {...dataAsProps} />;
        modalTitle = modalHeading;
        return <Emails {...dataAsProps} />;
      case 5:
        return <Payment />;
        case 6:
          return <Insight />;
      case 7:
        return <More />;
      case 8:
        return <Integrations />;
      default:
        return "Tab 1 content";
    }
  };

  useEffect(() => {
    setEvent(eventData);
  }, [eventData?.id]);

  useEffect(() => {
    setCreateEventSetting(eventSetting);
  }, [eventSetting]);

  const metaData = {
    title: eventData?.title,
    description: eventData?.description,
    image: eventData?.banner,
  };

  return (
    <Fragment>
      <MetaData {...metaData} />
      {isClient ? (
        <EventLayout>

          <Fragment>
            <div className="container lg:w-[820px] mx-auto px-4">
              <div className="flex justify-between  items-center mb-5 mt-0 lg:mt-4 md:mt-4">
                <h1 className="font-semibold text-2xl xs:text-3xl sm:text-2xl md:text-3xl lg:text-3xl text-[#131517]">
                  {eventData?.title}
                </h1>
                <Link
                  target="_blank"
                  href={`${process.env.NEXT_PUBLIC_FRONT_API_URL}${eventData?.slug}`}
                  className="flex items-center gap-2 btn-light text-sm py-1 max-sm:h-[30px]"
                >
                  <span className="hidden sm:block whitespace-nowrap">
                    Event Page
                  </span>
                  {Svg().EventArrow}
                </Link>
              </div>
            </div>
            <Tabbing
              tabData={tabData}
              tabHandler={(tab) => setCurrentTab(tab)}
              tabIndex={currentTab?.activeTab}
              containerWidth="lg:w-[820px]"
              containerPadding="px-4"
            >
              {switchTab(currentTab?.activeTab)}
            </Tabbing>
            <ModalRight
              title={modalTitle}
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false);
                setIsEditEvent(false);
                setIsCb(true);
                setBuilderData({});
              }}
            >
              {modalContent}
            </ModalRight>
          </Fragment>

        </EventLayout>
      ) : null}
    </Fragment>
  );
};

export async function getServerSideProps(ctx) {
  const { query, req, res } = ctx;
  const token = Utils?.getCookie("accessToken", ctx)
    ?.slice(1, -1)
    ?.replace(/"/g, "")
    ?.replace(/\\/g, "");
  const eid = Utils?.getCookie("event_id", ctx)?.slice(1, -1);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  } else if (token && !eid) {
    return {
      redirect: {
        destination: "/create",
        permanent: false,
      },
    };
  }

  const eventSetting = await fetchDataInServerSide(
    token,
    EndPoint?.createEventSetting
  );

  const eventOverView = await fetchDataInServerSide(
    token,
    EndPoint?.eventOverview(eid)
  );

  if (
    eventSetting?.status === 200 &&
    eventOverView?.status === 200 &&
    eventSetting?.json &&
    eventOverView?.json
  ) {
    const eventResData = await eventOverView?.json();
    const eventSettingData = await eventSetting?.json();

    return {
      props: {
        eventData: eventResData?.data?.response,
        eventSetting: eventSettingData?.data?.response,
      },
    };
  } else {
    return {
      props: {
        eventData: {},
        eventSetting: {},
      },
    };
  }
}

export default EventPage;
