import React, { useCallback, useEffect, useState } from 'react'

function Tabbing({ tabIndex = 0, children, tabData = ['overview', 'form', 'm-badge'], tabHandler = () => { }, containerWidth = 'lg:w-[820px]', containerPadding = '' }) {

    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = useCallback((tabNumber) => {
        if (tabHandler) tabHandler({ activeTab: tabNumber });
        setActiveTab(tabNumber);
    }, []);

    useEffect(() => {
        if (tabIndex === 0) {
            setActiveTab(0);
        }
    }, [tabIndex]);

    return (
        tabData?.length ? <div>
            <div className="tabbing-section border-b-[1px] mb-2">
                <div className={`container ${containerWidth} mx-auto ${containerPadding}`}>
                    <div className="tab-buttons flex gap-5  text-[#969498] max-md:w-full max-md:overflow-auto max-md:whitespace-nowrap font-medium">
                        {tabData?.map((tab, index) => (<button id={tab} key={index} onClick={() => handleTabClick(index)} className={`py-1 border-b-[2px] ${activeTab === index ? 'active text-[#131517] border-[#131517]' : 'border-transparent'}`} > {tab} </button>))}
                    </div>
                </div>
            </div>
            {children ? <div className={`container ${containerWidth} mx-auto pt-4 ${containerPadding}`}><div className="tab-content">
                {children}
            </div></div> : null}
        </div> : null
    )
}

export default Tabbing