import React, { useEffect, useState } from 'react'
import { PostApiCall } from '@/Api/ApiCall';
import EndPoint from '@/Api/EndPoint';
import useCommonStore from '@/Store/useCommonStore';
import useEventStore from '@/Store/useEventStore';
import dayjs from 'dayjs';
import Svg from '../../../public/Assets/Svg'
import Button from '../Button/Button';
import Input from '../InputForm/InputForm';
import Utils from '@/Utils/Utils';
import Loader from '../Loader/Loader';

function Insight() {

    const { event, insightData, setInsightData } = useEventStore();
    const { setIsLoading, isLoading } = useCommonStore();
    const [showSubCat, setShowSubCat] = useState(false);
    const [maxHeight, setMaxHeight] = useState('0px');
    const [filterDate, setFilterDate] = useState('');

    const createHeaders = (apiHeaders, cb = () => { }) => {
        let col = [], val = [];
        if (Object.entries(apiHeaders)?.length) {
            let arr = Object.entries(apiHeaders)?.map(([key, value]) => {
                col.push(value);
                val.push(key);
                return ({ label: value, key })
            });
            cb(arr, { col, val });
        } else {
            console.error("API headers are not in an array format.");
        }
    };

    const downloadCsvData = (endUrl, fileName) => {
        if (event?.id) {
            setIsLoading(true);
            PostApiCall(EndPoint?.[endUrl](event?.id), { filter_date: filterDate },
                (cbData) => {
                    if (cbData?.success) {
                        const apiResponse = cbData?.data?.response;
                        const resData = apiResponse?.records || [];
                        const apiHeaders = apiResponse?.headers || [];
                        createHeaders(apiHeaders, (headers, res) => {
                            Utils?.convertToCSV(resData, res?.col, res?.val, fileName)
                        });
                    }
                    setIsLoading(false);
                },
                (errData) => {
                    setIsLoading(false);
                },
                false
            );
        }
    };

    const getInsight = () => {
        PostApiCall(EndPoint?.getInsight(event?.id), {
            filter_date: filterDate
        }, (cbData) => {
            if (cbData?.success) {
                setInsightData(cbData?.data?.response);
            }
        }, (errData) => {
            setInsightData({});
        }, false)
    }

    const toggleSubCat = (e) => {
        if (showSubCat === e) {
            setShowSubCat(null);
        } else {
            setShowSubCat(e);
        }
    };

    useEffect(() => {

        let dom = document.getElementById(`sub-cat${showSubCat}`)
        if (dom && showSubCat >= 0) {
            // Measure the height of the sub-cat content
            const subCatHeight = dom?.scrollHeight;
            // Apply the measured height as max-height
            setMaxHeight(`${subCatHeight}px`);
        } else {
            // If sub-cat is not shown, set max-height to 0px
            setMaxHeight('0px');
        }
    }, [showSubCat]);

    useEffect(() => {
        getInsight();
    }, [filterDate])

    useEffect(() => {
        setIsLoading(false);
    }, []);

    return (
        <>
            {isLoading ? <Loader theme /> : null}
            <div className='flex gap-2 justify-between mb-3'>
                <h2 className="head">Summary</h2>
                <div className='max-w-[400px] flex gap-2'>
                    <div className="relative block w-full grow">
                        <Input
                            type="date"
                            name="search_from"
                            inputCls="input outline-none bg-transparent top-0 left-0 w-full h-full z-10 absolute opacity-0"
                            placeholder="Select Date"
                            val={filterDate}
                            onChange={(event) => { setFilterDate(event?.target?.value) }}
                            max={dayjs()?.format("YYYY-MM-DD")}
                        // min={dayjs('2024-01-01')?.format("YYYY-MM-DD")}
                        />
                        <div className="text-[#131517] font-medium items-center gap-3 flex justify-between border border-[#EBECED] rounded-lg px-2 h-[40px] bg-white">
                            {filterDate ? (
                                dayjs(filterDate)?.format("DD/MM/YYYY")
                            ) : (
                                <span className="opacity-80">Select Date</span>
                            )}{" "}
                            {Svg()?.CalendarIcon}
                        </div>
                    </div>
                    <Button className='btn-light' type='button' onClick={() => setFilterDate('')}>Clear</Button>
                </div>
            </div>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                {insightData?.totalGuests >= 0 ?
                    <div className='bg-white boxShadow text-center p-2 py-3 rounded-lg'>
                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => { downloadCsvData('totalGuestCsvDownload', 'guest-details') }}
                                type="button"
                                className="flex items-center gap-2 btn-light text-sm py-1 max-sm:h-[30px] stroke-[#131517] w-8 md:w-10 justify-center"
                                style={{ paddingLeft: 0, paddingRight: 0 }}>
                                {Svg().Download}
                            </button>
                            <h2 className='text-[#131517] text-[20px] md:text-[26px] font-semibold'>{insightData?.totalGuests}</h2>
                            <p className='text-[#595C5C] font-medium'>Total Guests</p>
                        </div>
                    </div> : null}
                {insightData?.totalOrders >= 0 ?
                    <div className='bg-white boxShadow text-center p-2 py-3 rounded-lg'>
                        <h2 className='text-[#131517] text-[20px] md:text-[26px] font-semibold'>{insightData?.totalOrders}</h2>
                        <p className='text-[#595C5C] font-medium'>Total Orders</p>
                    </div> : null}
                {insightData?.totalPrinted >= 0 ?
                    <div className='bg-white boxShadow text-center p-2 py-3 rounded-lg'>
                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => { downloadCsvData('totalPrintCsvDownload', 'total-print') }}
                                type="button"
                                className="flex items-center gap-2 btn-light text-sm py-1 max-sm:h-[30px] stroke-[#131517] w-8 md:w-10 justify-center"
                                style={{ paddingLeft: 0, paddingRight: 0 }}>
                                {Svg().Download}
                            </button>
                            <h2 className='text-[#131517] text-[20px] md:text-[26px] font-semibold'>{insightData?.totalPrinted}</h2>
                            <p className='text-[#595C5C] font-medium'>Total Printed</p>
                        </div>
                    </div> : null}
                {insightData?.totalRePrinted >= 0 ?
                    <div className='bg-white boxShadow text-center p-2 py-3 rounded-lg'>
                        <h2 className='text-[#131517] text-[20px] md:text-[26px] font-semibold'>{insightData?.totalRePrinted}</h2>
                        <p className='text-[#595C5C] font-medium'>Total Reprinted</p>
                    </div> : null}
                {insightData?.totalRedeemed >= 0 ?
                    <div className='bg-white boxShadow text-center p-2 py-3 rounded-lg'>
                        <div className="flex flex-col items-center">
                            <button
                                onClick={() => { downloadCsvData('totalRedeemCsvDownload', 'total-redeemed') }}
                                type="button"
                                className="flex items-center gap-2 btn-light text-sm py-1 max-sm:h-[30px] stroke-[#131517] w-8 md:w-10 justify-center"
                                style={{ paddingLeft: 0, paddingRight: 0 }}>
                                {Svg().Download}
                            </button>
                            <h2 className='text-[#131517] text-[20px] md:text-[26px] font-semibold'>{insightData?.totalRedeemed}</h2>
                            <p className='text-[#595C5C] font-medium'>Total Redeemed</p>
                        </div>
                    </div> : null}

                {insightData?.totalRevenueInCurrency?.length ? insightData?.totalRevenueInCurrency?.map((e) => {
                    return (
                        <div className='bg-white boxShadow text-center p-2 py-3 rounded-lg' key={e?.currency}>
                            <h2 className='text-[#131517] text-[20px] md:text-[26px] font-semibold'>{e?.total}</h2>
                            <p className='text-[#595C5C] font-medium'>Total Revenue In {e?.currency}</p>
                        </div>
                    )
                }) : null}
            </div>

            <div className="border-t-[1px] mt-8 pt-5 pb-2">
                {insightData?.categoryWiseRegistrations?.length ? <>
                    <div className="flex justify-between items-center mt-4">
                        <h2 className="head">Tickets</h2>
                        {/* <div className="">
                        <button
                            type="button"
                            className="flex items-center gap-2 btn-light text-sm py-1 max-sm:h-[30px] stroke-[#131517] w-8 md:w-10 justify-center">
                            {Svg().Download}
                        </button>
                    </div> */}
                    </div>
                    <p className='text-[#595C5C] mb-5'>See recent page views of the event page.</p>
                    <div className='bg-white rounded-md p-4'>
                        <div className='flex gap-4 text-[#595C5C] font-semibold mb-4'>
                            <div className='grow w-[40%] basis-[40%]'>Ticket name</div>
                            <div className='w-[52px] basis-[52px] text-center'>Import</div>
                            <div className='w-[56px] basis-[56px] text-center'>Invitee</div>
                            <div className='w-[86px] basis-[86px] text-center'>Online Reg</div>
                            <div className='w-[120px] basis-[92px] text-center'>Onspot Reg</div>
                            <div className='w-[51px] basis-[40px] text-center'>Total</div>
                        </div>
                        {insightData?.categoryWiseRegistrations?.map((e) => {

                            return (
                                <div key={e?.id} className='category-table'>
                                    <div className='flex gap-4 text-[#131517] font-medium mb-2 main-cat'>
                                        <div className='grow flex gap-2 w-[40%] basis-[40%] items-start'>
                                            <button type='button' onClick={() => toggleSubCat(e.id)} className={`bg-[#dfe0e1] text-[#595C5C] font-medium rounded-md hover:bg-[#595C5C] hover:text-[#fff] hover:fill-white hover:stroke-white transition-all min-w-[20px] w-[20px] h-[20px] justify-center mt-1 flex items-center`}><span className={`inline-block ${e.id === showSubCat ? 'rotate-180' : ''}`}>{Svg().DownArrowInsight}</span></button>
                                            {e?.title}
                                        </div>
                                        <div className='w-[52px] basis-[52px] text-center'>{e?.online_import}</div>
                                        <div className='w-[56px] basis-[56px] text-center'>{e?.online_invite}</div>
                                        <div className='w-[86px] basis-[86px] text-center'>{e?.online_reg}</div>
                                        <div className='w-[92px] basis-[92px] text-center'>{e?.onspot_reg}</div>
                                        <div className='w-[40px] basis-[40px] text-center'>{e?.total}</div>
                                    </div>
                                    <div id={`sub-cat${e?.id}`} className={`sub-cat ${e?.id === showSubCat ? 'open' : ''}`} style={{ maxHeight: e?.id === showSubCat ? maxHeight : 0 }}>
                                        {e?.subcategories?.length && e?.subcategories.map((subcategory) => {
                                            return (
                                                <div className='flex gap-4 mb-2' key={subcategory?.id}>
                                                    <div className='grow flex gap-2 w-[40%] basis-[40%] items-start'>
                                                        <button type='button' className={`bg-[#dfe0e1] text-[#595C5C] font-medium rounded-md hover:bg-[#595C5C] hover:text-[#fff] hover:fill-white transition-all min-w-[22px] w-[22px] h-[22px] justify-center mt-1 flex items-center opacity-0 pointer-events-none	 `}>{Svg().DownArrowInsight}</button>
                                                        {subcategory?.title}
                                                    </div>
                                                    <div className='w-[52px] basis-[52px] text-center'>{subcategory?.online_import}</div>
                                                    <div className='w-[56px] basis-[56px] text-center'>{subcategory?.online_invite}</div>
                                                    <div className='w-[86px] basis-[86px] text-center'>{subcategory?.online_reg}</div>
                                                    <div className='w-[92px] basis-[92px] text-center'>{subcategory?.onspot_reg}</div>
                                                    <div className='w-[40px] basis-[40px] text-center'>{subcategory?.total}</div>
                                                </div>
                                            )
                                        })}

                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </> : null}

                {insightData?.zappingRecord?.length ?
                    <div className='bg-white rounded-md p-4 mt-4'>
                        <table className='w-full'>
                            <tr className='font-semibold'>
                                <td>Location</td>
                                <td>Total Footfall</td>
                                <td>Unique Footfall</td>
                            </tr>
                            {insightData?.zappingRecord?.map((e, index) => {
                                return (
                                    <tr key={e?.location + index}>
                                        <td>{e?.location}</td>
                                        <td>{e?.total_footfall}</td>
                                        <td>{e?.unique_count}</td>
                                    </tr>
                                )
                            })}

                        </table>
                    </div>
                    : null}
            </div>
            {/* <div className='flex justify-between items-center'>
                <h2 className='head'>Page views</h2>
            </div>

            <p>Design a unified badge template or generate multiple templates with filtering options based on the category type.</p>

            <div className="md:border md:rounded-lg mt-5">
                <div className="md:flex">
                    <div className='md:p-5 md:border-r-[1px] md:flex-1 md:w-1/2'>
                        <p className='font-semibold text-[#131517] mb-2'>Event Page</p>
                        <div className='flex mb-2'>
                            <div className='flex-1 w-1/2'>
                                <p className='text-[#969498] text-sm'>Yesterday</p>
                                <p className='font-semibold text-[#131517] text-[26px]'>0</p>
                            </div>
                            <div className='flex-1 w-1/2'>
                                <p className='text-[#969498] text-sm'>Past Month</p>
                                <p className='font-semibold text-[#131517] text-[26px]'>9</p>
                            </div>
                        </div>
                        <p className='font-semibold text-[#131517] mb-2'>Live Traffic</p>
                        <p className='text-[#131517] text-sm mb-1'>No page view in the last</p>
                        <p className='text-[#969498] text-sm'>Share your link and put it in your social bio to capture more traffic.</p>
                    </div>

                    <div className='pt-5 md:p-5 md:border-r-[1px] md:flex-1 md:w-1/2'>
                        <p className='font-semibold text-[#131517] mb-2'>Top Referrers</p>
                        <div className='flex justify-between'>
                            <p className='text-[#969498] text-sm'>Direct</p>
                            <p className='text-[#131517] text-sm'>Direct</p>
                        </div>
                        <div className='flex justify-between mb-2'>
                            <p className='text-[#969498] text-sm'>Google</p>
                            <p className='text-[#131517] text-sm'>Google</p>
                        </div>
                        <p className='font-semibold text-[#131517] mb-2'>Top Cities</p>
                        <div className='flex justify-between mb-2'>
                            <p className='text-[#969498] text-sm'>New Delhi, India</p>
                            <p className='text-[#131517] text-sm'>100%</p>
                        </div>
                        <p className='font-semibold text-[#131517] mb-2'>Top Sources</p>
                        <p className='text-[#969498] text-sm'>Set up a tracking link by adding ?utm_source=your- link-name to your URL.</p>
                    </div>
                </div>
            </div>

            <div className='border-b-[1px] my-10' />
            <div className='flex md:justify-between items-start md:items-center max-md:flex-col gap-3 max-md:mb-3'>
                <h2 className='head'>Event Page</h2>
                <Button type={'button'} className='text-sm btn-light justify-between flex items-center gap-5 stroke-[#595C5C] h-[30px] hover:stroke-white hover:fill-white'>
                    {Svg().Clock}
                    12 Oct, 13:00 Wed
                    {Svg().SingleSelect}
                </Button>
            </div>
            <p>See how much your guests enjoyed the event</p>

            <div className='flex md:bg-white rounded-lg shadow-slate-400 md:p-5 gap-5 mt-5'>
                <div className='flex-1'>
                    <div className='flex md:items-center gap-3 md:gap-10 mb-8'>
                        <div className=''>
                            <h2 className='font-semibold text-[#131517] text-[20px] md:text-[32px]'>5.0</h2>
                            <p className='text-sm'>1 rating</p>
                        </div>
                        <div className='flex flex-1 gap-5 md:gap-8 max-md:flex-col'>
                            <div className='flex flex-1 flex-col gap-2'>
                                <div className='flex items-center gap-1'>
                                    {Svg().FiveStar}
                                    <div className='flex-1 h-1 rounded-lg overflow-hidden relative'>
                                        <div className='absolute w-[100%] h-full bg-[#FACC28]'></div>
                                    </div>
                                </div>
                                <div className='flex items-center gap-1'>
                                    {Svg().FourStar}
                                    <div className='flex-1 bg-[#EFEFF0] h-1 rounded-lg overflow-hidden relative'>
                                        <div className='absolute w-[50%] h-full bg-[#FACC28]'></div>
                                    </div>
                                </div>
                                <div className='flex items-center gap-1'>
                                    {Svg().ThreeStar}
                                    <div className='flex-1 bg-[#EFEFF0] h-1 rounded-lg overflow-hidden relative'>
                                        <div className='absolute w-[0%] h-full bg-[#FACC28]'></div>
                                    </div>
                                </div>
                                <div className='flex items-center gap-1'>
                                    {Svg().TwoStar}
                                    <div className='flex-1 bg-[#EFEFF0] h-1 rounded-lg overflow-hidden relative'>
                                        <div className='absolute w-[0%] h-full bg-[#FACC28]'></div>
                                    </div>
                                </div>
                                <div className='flex items-center gap-1'>
                                    {Svg().OneStar}
                                    <div className='flex-1 bg-[#EFEFF0] h-1 rounded-lg overflow-hidden relative'>
                                        <div className='absolute w-[0%] h-full bg-[#FACC28]'></div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex md:flex-col gap-3'>
                                <Button type='button' className='btn-light text-sm py-1 w-full max-md:whitespace-nowrap '>View Breakdown</Button>
                                <Button type='button' className='btn-light text-sm py-1 w-full'>Download</Button>
                            </div>
                        </div>
                    </div>
                    
                    <h2 className="font-semibold text-lg mb-3">1 Feedback</h2>
                    <ul className='flex max-md:flex-col max-md:gap-3'>
                        <li className='max-md:flex-1 relative p-3 bg-[#EFEFF0] rounded-lg pr-5 md:min-w-[350px]'>
                            <div className='absolute right-2 top-2'>{Svg().FiveStar}</div>
                            <p className='text-[#131517] mb-2'>Rahul Sharma</p>
                            <p>5/5.Oct 4</p>
                            <p className='text-[#131517] mt-2'>Very good event</p>
                        </li>
                    </ul>
                </div>

            </div> */}
        </>
    )
}

export default Insight