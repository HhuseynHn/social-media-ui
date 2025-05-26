/** @format */

import React from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { MdLogout } from "react-icons/md";
const LogOut = () => {
  return (
    <>
      <div className="z-10 hover:text-slate-500 text-[18px] text-slate-400 cursor-pointer flex h-full w-full items-center justify-center rounded-full bg-muted p-[8px]">
        <MdLogout />
      </div>
    </>
  );
};

export default LogOut;
