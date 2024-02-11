import React from "react";

function TableItemMobile({ data }) {
  return (
    <div className="p-4 border-0 border-b-[1px] border-stone-200 flex flex-col gap-2">
      {Object.keys(data).map((element) => (
        <div
          className="text-stone-70 flex w-full justify-between"
          key={element}
        >
          {data?.[element]?.[0] !== "#" && (
            <span className="text-stone-700 w-[40%]">{`${element[0]
              ?.toUpperCase()
              .concat(element.slice(1))}:`}</span>
          )}
          <span
            className={`w-[60%] ${data?.[element]?.[0] === "#" ? "text-blue-500 mb-2" : "text-stone-00"}`}
          >
            {data?.[element]?.length >= 20 ? data?.[element]?.slice(0, 20) + '...' : data?.[element]}
          </span>
        </div>
      ))}
    </div>
  );
}

export default TableItemMobile;
