import React from "react";
import { FaLink, FaEye, FaUserPlus, FaClipboard } from "react-icons/fa";
export const Stats = () => {
  return (
    <div className="flex items-center justify-around px-10 w-3/4">
      <div className="flex flex-col bg-primary/60 items-center jusce px-4 py-2 rounded-md">
        <div className="flex items-center text-xl gap-x-2 ">
          <FaLink />
          Total Links
        </div>
        <span className="text-lg">40</span>
      </div>

      <div className="flex flex-col bg-primary/60 items-center jusce px-4 py-2 rounded-md">
        <div className="flex items-center text-xl gap-x-2 ">
          <FaClipboard />
          Active Links
        </div>
        <span className="text-lg">20</span>
      </div>

      <div className="flex flex-col bg-primary/60 items-center jusce px-4 py-2 rounded-md">
        <div className="flex items-center text-xl gap-x-2 ">
          <FaEye />
          Total Visits
        </div>
        <span className="text-lg">260</span>
      </div>

      <div className="flex flex-col bg-primary/60 items-center jusce px-4 py-2 rounded-md">
        <div className="flex items-center text-xl gap-x-2 ">
          <FaUserPlus />
          Max Visits:
        </div>
        <span className="text-lg">198</span>
      </div>
    </div>
  );
};
