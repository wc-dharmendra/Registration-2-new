import EventLayout from "@/Components/Layout/EventLayout";
import Tabbing from "@/Components/Tabbing/Tabbing";
import MetaData from "@/Components/MetaData/MetaData";
import Utils from "@/Utils/Utils";
import useEvent from "@/CustomHook/useEvent";
import ModalRight from "@/Components/Modal/ModalRight";
import { Fragment, useState } from "react";
import CategoryForm, {CustomisedEmail} from "@/Components/Form/CategoryForm";
import CategorySettings from "@/Components/CategorySettings/CategorySettings";
import Guests, { GuestInformation } from "@/Components/Guests/Guests";
import useCategoryMatrixStore from "@/Store/useCategoryMatrixStore";
import UpdateBadge from "@/Components/UpdateBadge/UpdateBadge";

const Manage = ({ eventData }) => {
  const {
    currentTab,
    setCurrentTab,
    openAddHost,
    setOpenAddHost,
    openEditHost,
    setOpenEditHost,
    isClient,
    isOpen,
    setIsOpen,
    isModalOpen,
    setIsModalOpen,
  } = useEvent(eventData);
  const { selectedCategory } = useCategoryMatrixStore();

  const [guestData, setGuestData] = useState({});
  

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
    setGuestData,
    guestData
  };

  

  let modalContent = "Edit event content here",
    modalTitle = "Edit Event";

  const [tabData] = useState([
    "Form",
    "Category Settings",
    "Guests",
    "M-Badge/Ticket",
  ]);

  const switchTab = (tab) => {
    switch (tab) {
      case 0:
          modalContent = <CustomisedEmail />;
          modalTitle = "Customise Email";
          return <CategoryForm {...dataAsProps} />;
      case 1:
        return <CategorySettings />;
      case 2:
        modalContent = <GuestInformation {...dataAsProps}  />;
        modalTitle = "Guest Details";
        return <Guests {...dataAsProps} />;
      case 3:
        // return <Emails {...dataAsProps} />;
        return <UpdateBadge />;
        
      default:
        return "Tab 1 content";
    }
  };

  return (
    <EventLayout>
      <MetaData title="Manage Category Matrix" />
      {isClient ? (
        <Fragment>
          <div className="container lg:w-[820px] mx-auto px-4">
            <p className="text-sm">Category Matrix</p>
            <div className="flex justify-between  items-center mb-5 mt-1">
              <h1 className="font-semibold text-2xl xs:text-3xl sm:text-3xl md:text-3xl lg:text-3xl text-[#131517]">
                {selectedCategory?.title}
              </h1>
            </div>
          </div>

          <Tabbing
            tabData={tabData}
            tabHandler={(tab) => setCurrentTab(tab)}
            containerWidth="lg:w-[820px]"
            containerPadding="px-4"
          >
            {switchTab(currentTab?.activeTab)}
          </Tabbing>
          <ModalRight
            title={modalTitle}
            isOpen={isModalOpen}
            onClose={() => {setIsModalOpen(false), setGuestData({})}}
          >
            {modalContent}
          </ModalRight>
        </Fragment>
      ) : null}
    </EventLayout>
  );
};

export async function getServerSideProps(ctx) {
  const { query, req, res } = ctx;
  const token = Utils?.getCookie("accessToken", ctx)?.slice(1, -1);
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

export default Manage;
