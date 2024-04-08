import React, { useEffect, useState } from "react";

const CountDownTimer = ({ startTime = new Date(), endTime="", setExpTimer }) => {

    const [showTimer, setShowTimer] = useState(false);
    const [countDownTime, setCountDownTime] = useState("");

    useEffect(() => {
        if (startTime && endTime) {
            const t1 = new Date(startTime).getTime();
            const t2 = new Date(endTime).getTime();

            let distance = (t2 - t1);

            const x = setInterval(() => {
                distance = distance - 1000;
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                let d = days.toString().length < 2 ? "0" + days : days;
                let h = hours.toString().length < 2 ? "0" + hours : hours;

                let min = minutes.toString().length < 2 ? "0" + minutes : minutes;
                let sec = seconds.toString().length < 2 ? "0" + seconds : seconds;


                if (distance < 0) {
                    clearInterval(x);
                    if (setExpTimer) {
                        setExpTimer("expired");
                    }
                    setCountDownTime("");
                }
                // else if (distance <= 600000) {
                //     setCountDownTime(min + ":" + sec);
                //     setShowTimer(true);
                // }
                else {
                    setCountDownTime(d + "d " + h + "h " + min + "m " + sec + "s ");
                    setShowTimer(true);
                }
            }, 1000);

            return(()=>{
                clearInterval(x);
            });
        }
    }, [endTime]);

    return (
        showTimer ? <div className="countdown-timer notranslate"> {countDownTime ? countDownTime : "00:00"}</div> : null
    )
}

export default (CountDownTimer);