import React, { Children, Fragment, useState } from "react";
import Svg from "../../../public/Assets/Svg";
import Button from "@/Components/Button/Button";
import Link from "next/link";
import Image from "next/image";
import dayjs from "dayjs";

const EmbedEventPage = ({ eventData, isClient = false, }) => {

  return (

    <Fragment>

      <div className="py-3 px-3 rounded-lg PatternBgEvent pb-1">
        <div className="flex">
          <figure className="relative w-[40%]">

            {/* <Image
              src= {"/Assets/Images/eventImg.jpg"}
              className="relative rounded-lg"
              priority={true}
              fill={true}
              title="Event Image"
              alt="Event Image"
            /> */}

            <img
              src= {`/${process.env.NEXT_PUBLIC_BASE_URL}/Assets/Images/eventImg.jpg`}
              className="relative rounded-lg"
              // priority={true}
              // fill={true}
              title="Event Image"
              alt="Event Image"
            />
            
          </figure>
          <div className="px-3 rounded-b-lg w-[60%]">

            <div className="flex justify-between items-center">
              <div className="eventDiscript">
                <h1 className="font-semibold text-[22px]">Test Event</h1>
                <div className="flex flex-center justify-center gap-1 mt-1">
                  <button className="Profile text-[10px] flex items-center justify-center leading-5 bg-[#0E94FF] h-5 w-5 rounded-3xl text-white cursor-pointer">
                    DK
                  </button>
                  <h2 className="text-[#9e9e9e] text-[14px] font-medium">Hosted by Prakesh</h2>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex flex-start gap-2 mt-3">
                <div className="flex flex-col items-center border border-[#EBECED] rounded w-[30px] h-[32px]">
                  <div className="bg-[#e6e7e7] text-[#afb0b0] text-[9px] w-full text-center">
                    {dayjs(eventData?.start_date)?.format("MMM")}
                  </div>
                  <div className="text-[#969498] text-[12px]">{dayjs(eventData?.start_date)?.format("DD")}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="w-full relative">
                    <h3 className="text-[14px] font-medium text-[#131517]">
                      {dayjs(eventData?.start_date)?.format("dddd")}
                    </h3>
                    <p className="text-[10px] color-[#595C5C] font-medium">
                      {dayjs(eventData?.start_date)?.format("HH:mm")} - {dayjs(eventData?.end_date)?.format("HH:mm ZZ")}
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
                    <h3 className="text-[14px] font-medium text-[#131517]">
                      Register to See Address
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-4">
          <div className="bg-[#ffffff] w-full">
            <div className="border-b px-3 py-2">
              <h2 className="text-[18px] font-semibold text-[#131517]">Registration</h2>
            </div>

          <div className="px-1">
            <div className="flex flex-start gap-2 mt-1 px-3 py-2 rounded-lg bg-[#f4f4f4]">
              <div className="flex flex-col items-center rounded w-[34px] h-[34px]">
                {Svg().LocationIcon}
              </div>

              <div className="flex justify-between items-center">
                <div className="w-full relative">
                  <h3 className="text-[15px] font-semibold text-[#131517]">
                    Approval Required
                  </h3>
                  <p className="text-[14px] color-[#595C5C] font-medium">Yout registration is subject to approval by the host.</p>
                </div>
              </div>
            </div>
            <div className="w-full py-2 rounded">
              <div className="py-2 px-3">
                <p className="text-[16px] font-semibold text-[#131517]">Hello! To join the event, please register below</p>
                <div className="flex flex-center gap-1 mt-3 mb-4">
                  <button className="Profile text-[12px] flex items-center font-semibold justify-center bg-[#0E94FF] h-6 w-6 rounded-3xl text-white cursor-pointer">
                    DK
                  </button>
                  <h2 className="text-[#131517] text-[14px] font-medium">Prakesh</h2>
                  <p className="text-[#595c5c82] text-[14px]">Prakesh@webcontxt.com</p>
                </div>
                <Button className="buttonStyle w-full">ONe-Click Apply</Button>
              </div>

             
            </div>
          </div>
          </div>

        </div>



      </div>



    </Fragment>
  );
};
export default EmbedEventPage;