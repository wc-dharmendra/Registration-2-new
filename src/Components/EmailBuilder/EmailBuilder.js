import React, { Fragment } from "react";
import useEventStore from "@/Store/useEventStore";
import Utils from "@/Utils/Utils";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const EmailBuilder = ({ children, reminderDate = dayjs()}) => {

    const { event, emailConfig } = useEventStore();

    function matchWithKey(key) {
        const data = emailConfig?.subject_variables?.find((e) => e?.key === key) || {};
        return (data?.label)
    }

    return (
        <Fragment>
            <p className="text-[#595C5C] text-[14px] font-semibold mb-2">Subject</p>
            <div className="border border-[#EBECED] rounded-[8px] px-2 py-2 flex items-center gap-2 mb-3">
                <span className="text-[#E4678B] text-[16px] bg-[#e4678b1a] rounded-[5px] px-2 py-1">
                    {/* {matchWithKey("{EventName}")} */}{event?.title}
                    </span>
                <p className="text-[#131517] text-[16px] font-medium whitespace-nowrap">is starting</p>
                <span className="text-[#E4678B] text-[16px] bg-[#e4678b1a] rounded-[5px] px-2 py-1">
                    {dayjs(event?.start_date).from(reminderDate)}
                    {/* {Utils?.getFormattedDateTimeData(
                        event?.start_date,
                        event?.timezone,
                        "YYYY-MM-DD"
                    ) !==
                        Utils?.getFormattedDateTimeData(
                            event?.end_date,
                            event?.timezone,
                            "YYYY-MM-DD"
                        )
                        ? `${Utils?.getFormattedDateTimeData(
                            event?.start_date,
                            event?.timezone,
                            "dddd"
                        )}, ${Utils?.getFormattedDateTimeData(
                            event?.start_date,
                            event?.timezone,
                            "D"
                        )} ${Utils?.getFormattedDateTimeData(
                            event?.start_date,
                            event?.timezone,
                            "MMMM"
                        )}`
                        : `${Utils?.getFormattedDateTimeData(
                            event?.start_date,
                            event?.timezone,
                            "dddd"
                        )}`} */}
                    {/* {matchWithKey("{TimeUntilEvent}")} */}
                </span>
            </div>
            {children}
            <div className="pt-3">
                <p className="text-[#595C5C] text-[14px] font-semibold mb-2">What Did You Think Of My Event?</p>
            </div>
        </Fragment>

    )
}
export default EmailBuilder;