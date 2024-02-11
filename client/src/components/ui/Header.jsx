import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeMobileSideBar, openMobileSideBar } from "../../features/ui";

function Header({ name }) {
  const userObj =
    useSelector((state) => state.auth.user) ||
    JSON.parse(localStorage.getItem("user"));
  const isDoctor = userObj.isDoctor;

  const dispatch = useDispatch();
  const mobileSidebarOpen = useSelector(
    (state) => state?.ui?.mobileSidebarOpen
  );

  function handleChangeSidebarState() {
    mobileSidebarOpen
      ? dispatch(closeMobileSideBar())
      : dispatch(openMobileSideBar());
  }

  return (
    <div className={`flex fixed z-[9999999] top-0 md:absolute h-[8%] ${mobileSidebarOpen ? 'w-[84%]' : 'w-[100%] '} items-center justify-between bg-stone-50 p-4 md:p-8 shadow-md`}>
      <div className="flex items-center justify-between space-x-4 text-stone-900">
        <span className="text-[20px] font-medium tracking-[1px]">{name}</span>
      </div>

      <input
        type="text"
        placeholder={`Search in your clinic ..`}
        className=" bottom-1 md:block hidden h-[64%] w-[30%] rounded-md border bg-[#f2f2f2] py-4 pl-4 placeholder:text-[14px] placeholder:text-stone-600"
      />

      <div className="flex items-center space-x-2">
        <div className="flex h-[80%] items-center justify-center rounded-full bg-stone-200 p-3">
          <img
            src="/message.svg"
            alt="icon_img"
            className="block h-[16px] w-[16px]"
          />
        </div>

        <div className="flex h-[80%] items-center justify-center rounded-full bg-stone-200 p-1">
          <img
            src={`/${isDoctor ? "doctor" : "user"}.svg`}
            alt="icon_img"
            className="block h-[32px] w-[32px]"
          />
        </div>

        <div
          className="p-2 px-[10px] justify-center items-center h-[40px] w-[40px] flex flex-col gap-[3px] bg-stone-200 border-[2px] border-stone-100 rounded-full shadow md:hidden"
          onClick={() => handleChangeSidebarState()}
        >
          <div className={`w-full ${mobileSidebarOpen && 'hidden'} bg-slate-700 rotate-0 h-[3px] rounded`}>
            &nbsp;
          </div>
          <div className={`w-full ${mobileSidebarOpen && 'hidden'} bg-slate-700 rotate-0 h-[3px] rounded`}>
            &nbsp;
          </div>
          <div className={`w-full ${mobileSidebarOpen && 'hidden'} bg-slate-700 rotate-0 h-[3px] rounded`}>
            &nbsp;
          </div>

          {/* Minor refactoring */}
          <div className={`text-stone-500 flex justify-center items-center ${!mobileSidebarOpen && 'hidden'}`}>
            <img src="/cross-icon.svg" alt="icon" className="w-fit h-fit"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
