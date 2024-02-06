import React from "react";

function Modal({ children }) {
  return (
    <div className="flex h-full w-full flex-col overflow-scroll rounded-md bg-white px-4 py-2 shadow-sm">
      <div className="py-2 px-2">{children}</div>
    </div>
  );
}

export default Modal;
