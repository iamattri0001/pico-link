"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaLink, FaEye, FaUserPlus } from "react-icons/fa";
import { ImSpinner9 } from "react-icons/im";
export const Stats = ({ userId }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const response = await axios.get("/api/links/getStats", {
        params: { userId },
      });

      if (response.status === 200) {
        const { totalLinks, totalVisits, maxVisits } = response.data;
        setStats({ totalLinks, totalVisits, maxVisits });
      } else {
        setStats({
          totalLinks: "unavailable",
          totalVisits: "unavailable",
          maxVisits: "unavailable",
        });
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex items-center justify-around px-10 w-3/4">
      <div className="flex flex-col ring-1 gap-y-3 ring-secondary items-center jusce px-4 py-2 pb-3 rounded-md">
        <div className="flex items-center text-xl gap-x-2">
          <FaLink />
          <span>Total Links</span>
        </div>
        <div className="text-sm text-text/60">
          {!stats && <ImSpinner9 className="h-4 w-4 animate-spin" />}
          {stats && stats.totalLinks}
        </div>
      </div>

      <div className="flex flex-col ring-1 ring-primary gap-y-3 items-center jusce px-4 py-2 pb-3 rounded-md">
        <div className="flex items-center text-xl gap-x-2 ">
          <FaEye />
          Total Visits
        </div>
        <div className="text-sm text-text/60">
          {!stats && <ImSpinner9 className="h-4 w-4 animate-spin" />}
          {stats && stats.totalVisits}
        </div>
      </div>

      <div className="flex flex-col ring-1 ring-accent gap-y-3 items-center jusce px-4 py-2 pb-3 rounded-md">
        <div className="flex items-center text-xl gap-x-2 ">
          <FaUserPlus />
          Max Visits:
        </div>
        <div className="text-sm text-text/60">
          {!stats && <ImSpinner9 className="h-4 w-4 animate-spin" />}
          {stats && stats.maxVisits}
        </div>
      </div>
    </div>
  );
};
