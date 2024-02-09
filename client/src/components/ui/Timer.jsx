import moment from "moment";
import React, { useEffect, useRef, useState } from "react";

function Timer({ onTimerComplete }) {
  const now = moment();

  const remainingHours = 0; // HARDCODED, chage further
  const [remainingMinutes, setRemainingMinutes] = useState(60 - now.minutes());
  const [remainingSeconds, setReminingSeconds] = useState(60 - now.seconds());

  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (
        remainingHours <= 0 &&
        remainingMinutes <= 0 &&
        remainingSeconds <= 0
      )
        onTimerComplete();

      else if (remainingSeconds <= 1) {
        setRemainingMinutes((prev) => Number(String(prev).padStart(2, 0)) - 1);
        setReminingSeconds(Number(String(60).padStart(2, 0)));
      } else {
        setReminingSeconds((prev) => Number(String(prev).padStart(2, 0)) - 1);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [onTimerComplete, remainingMinutes, remainingSeconds]);

  return (
    <div>
      <span className="p-2 px-4 rounded-md bg-[#0008] flex items-center">
        {String(remainingHours).padStart(2, 0)}:{String(remainingMinutes).padStart(2, 0)}:
        {String(remainingSeconds).padStart(2, 0)}
      </span>
    </div>
  );
}

export default Timer;
