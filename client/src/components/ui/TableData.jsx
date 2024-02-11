import React from "react";
import { Link } from "react-router-dom";

function TableData({ data, width, alignRight }) {
  const containerStyle = {
    width: `${Math.floor(width)}%`,
    justifyContent: alignRight ? "flex-end" : "flex-start",
  };

  if (data?.toString().includes("#")) {
    return (
      <div className="md:flex hidden" style={containerStyle}>
        <Link>
          <span className="text-sm font-semibold text-blue-500">
            {`${data.slice(0, 4)}...${data.slice(-4, data.length)}`}
          </span>
        </Link>
      </div>
    );
  }

  if (data === "Successful" || data === "Failed" || data === "Pending") {
    return (
      <div className="hidden md:flex items-center gap-2" style={containerStyle}>
        <span
          className={`block h-2 w-2 rounded-full p-1 ${
            data === "Successful"
              ? "bg-[#17B31B]"
              : data === "Failed"
                ? "bg-[#ff6b5b]"
                : "bg-stone-400"
          }`}
        >
          &nbsp;
        </span>
        <span>{data}</span>
      </div>
    );
  }

  return (
    <>
      <div className={`hidden text-sm md:flex`} style={containerStyle}>
        {data}
      </div>
    </>
  );
}

export default TableData;
