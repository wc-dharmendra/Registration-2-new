import { useState, useEffect } from "react"
// import { abortFetch } from "@/Api/FetchInstance";
import useCommonStore from "@/Store/useCommonStore";

const useEvent = () => {
    const { setIsLoading } = useCommonStore();

    const [currentTab, setCurrentTab] = useState({ activeTab: 0 });
    // const [tabData] = useState(['Overview', 'Form', 'Badge', 'Emails', 'Payment', 'More', 'Integrations']);
    // const [tabData] = useState(['Overview', 'Form', 'Badge', 'Emails', 'More', 'Integrations']);
    const [tabData] = useState(['Overview', 'Form', 'Badge', 'Discount', 'Emails','Payment', 'Insight', 'More', 'Integrations']);

    const [openAddHost, setOpenAddHost] = useState(false);
    const [openEditHost, setOpenEditHost] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMbadgeOpen, setIsMbadgeOpen] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setIsLoading(false);
        // return (() => {
        //     abortFetch();
        // })
    }, []);

    return ({
        currentTab, setCurrentTab, tabData, openAddHost, setOpenAddHost, openEditHost, setOpenEditHost, isClient, isOpen, setIsOpen, isModalOpen, setIsModalOpen, isMbadgeOpen, setIsMbadgeOpen
    })
}
export default useEvent;