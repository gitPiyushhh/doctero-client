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
      if (remainingSeconds <= 1) {
        setRemainingMinutes((prev) => Number(String(prev).padStart(2, 0)) - 1);
        setReminingSeconds(Number(String(60).padStart(2, 0)));
      } else {
        setReminingSeconds((prev) => Number(String(prev).padStart(2, 0)) - 1);
      }
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [remainingSeconds]);

  return (
    <div>
      <span className="p-2 px-4 rounded-md bg-[#0008] flex items-center">
        {remainingHours}:{remainingMinutes}:{remainingSeconds}
      </span>
    </div>
  );
}

export default Timer;
