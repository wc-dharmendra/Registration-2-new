import React from "react";
import Svg from "../../../public/Assets/Svg";
import Button from "@/Components/Button/Button";
import Link from "next/link";
import Utils from "@/Utils/Utils";
import useUserStore from "@/Store/useUserStore";

const FrontendEvent = ({ eventData }) => {
  const { user } = useUserStore();

  return (
    <div className="boxShadow py-0.5 px-0.5 rounded-lg bg-[#EBECED]">
      <figure className="relative aspect-video">
        <img
          src={eventData?.banner}
          className="relative rounded-lg aspect-video object-cover"
          title="Event"
          alt="Event"
        />
        <div className="absolute top-0 left-0 w-full bg-[#0006] py-1 px-3 flex justify-between items-baseline rounded-t-[10px]">
          <div className="flex items-center gap-2">
            <div className="">
              <Link
                href="#"
                target="_blank"
                className="text-[#e0e0e0] hover:text-[#ffffff] text-[13px]"
              >
                registration/zq2l66w4
              </Link>
            </div>
            <div className="">{Svg().TimeZoneArrowWhite}</div>
          </div>
          <div className="">
            <Button
              type="button"
              className="text-[#e0e0e0] hover:text-[#ffffff] text-[14px]"
            >
              Copy
            </Button>
          </div>
        </div>
        </figure>
        <div className="px-2 py-3 bg-[#ffffff] rounded-b-lg">
          <div className="flex justify-between items-center">
            <div className="eventDiscript">
              <h1 className="font-semibold text-[18px]">{eventData?.title}</h1>
              <div className="text-[#595c5c82] text-[10px]">My Calendar</div>
            </div>
            <div className="EventCalender">
              <div className="flex flex-start gap-5">
                <div className="flex flex-col items-center border border-[#EBECED] rounded w-[36px] h-[40   px]">
                  <div className="text-[#131517] text-[10px] w-full text-center">
                    {Utils?.getFormattedDateTimeData(
                      eventData?.start_date,
                      eventData?.timezone,
                      "MMM"
                    )}
                  </div>
                  <div className="text-[#131517] text-[12px] bg-[#EFEFF0] text-center w-full h-[100%] font-semibold flex justify-center items-center">{Utils?.getFormattedDateTimeData(
                    eventData?.start_date,
                    eventData?.timezone,
                    "DD"
                  )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-start gap-2 mt-3">
              <div className="flex flex-col items-center border border-[#EBECED] rounded w-[30px] h-[32px]">
                <div className="bg-[#e6e7e7] text-[#afb0b0] text-[8px] w-full text-center">
                  {Utils?.getFormattedDateTimeData(
                    eventData?.start_date,
                    eventData?.timezone,
                    "MMM"
                  )}
                </div>
                <div className="text-[#969498] text-[12px]">{Utils?.getFormattedDateTimeData(
                  eventData?.start_date,
                  eventData?.timezone,
                  "DD"
                )}
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="w-full relative">
                  <h3 className="text-[10px] font-medium text-[#131517]">
                    {Utils?.getFormattedDateTimeData(
                      eventData?.start_date,
                      eventData?.timezone,
                      "dddd"
                    )}
                  </h3>
                  <p className="text-[8px] color-[#595C5C] font-medium">
                    {Utils?.getFormattedDateTimeData(
                      eventData?.start_date,
                      eventData?.timezone,
                      "HH:mm"
                    )} - {Utils?.getFormattedDateTimeData(
                      eventData?.end_date,
                      eventData?.timezone,
                      "HH:mm Z"
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-start gap-2 mt-3 mr-5">
              <div className="flex flex-col items-center  rounded w-[34px] h-[34px]">
                {Svg().LocationIcon}
              </div>

              <div className="flex justify-between items-center">
                <div className="w-full relative">
                  <h3 className="text-[10px] font-medium text-[#131517]">
                    {eventData?.address}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between gap-1.5 mt-1">
          <div className="bg-[#ffffff] w-full">
            <div className="border-b px-2 py-1">
              <h2 className="text-[10px] font-semibold text-[#131517]">registration</h2>
            </div>
            <div className="px-2 py-2">
              <p className="text-[7px] font-medium">Hello! To join the event, please register below.</p>
              <div className="flex flex-center items-center gap-1 mt-1">
                <button className="Profile bg-[#0E94FF] rounded-3xl text-white cursor-pointer">
                  <span className="flex items-center justify-center h-[12px] w-[12px] text-[6px] font-medium"> {user?.short_name}</span>
                </button>
                <h2 className="text-[#131517] text-[8px] font-medium">{user?.name}  <small className="text-[#595c5c82] text-[8px]">{user?.email?.toLowerCase()}</small></h2>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <div className="bg-[#ffffff] w-full rounded h-[100%]">
              <div className="px-2 py-1">
                <small className="text-[#B3B3B3] text-[8px] inherit">Presented By</small>
                <p className="text-[9px] font-semibold text-[#131517]">My Calendar</p>
              </div>
            </div>
            <div className="bg-[#ffffff] w-full mt-1 rounded h-[100%]">
              <div className="py-2 px-2">
                <p className="text-[10px] font-semibold text-[#131517]">Hosts</p>
              </div>
            </div>
          </div>
        </div>

        
      
    </div>
  );
};
export default FrontendEvent;