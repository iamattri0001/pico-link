"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import { MdErrorOutline } from "react-icons/md";

const Page = ({ params }) => {
  const { shortId } = params;
  const [error, setError] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUrl = async () => {
      const response = await axios.get("/api/getUrl", { params: { shortId } });
      if (response.status === 200) {
        const { url } = response.data;
        if (!url) {
          setError(true);
          return;
        }
        router.push(url);
      } else {
        setError(true);
      }
    };
    fetchUrl();
  }, []);

  return (
    <div className="flex items-center justify-center w-screen h-[90vh] flex-grow text-center">
      {!error && (
        <div className="flex items-center gap-x-3">
          <ImSpinner9 className="w-8 h-8 animate-spin text-text/70" />
          <span className="text-xl md:text-3xl font-bold font-heading bg-gradient-to-tr text-transparent from-accent to-primary bg-clip-text">
            Redirecting, please wait
          </span>
        </div>
      )}
      {error && (
        <div className="flex items-center gap-x-3">
          <MdErrorOutline className="w-8 h-8 text-text/70" />
          <span className="text-3xl font-bold font-heading bg-gradient-to-tr text-transparent from-accent to-primary bg-clip-text">
            Link is Invalid
          </span>
        </div>
      )}
    </div>
  );
};

export default Page;
