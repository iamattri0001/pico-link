import Nav from "@/components/Nav";
import React from "react";

const Laoyout = ({ children }) => {
  return (
    <main className="flex flex-col gap-y-14">
      <Nav />
      <div className="px-10">{children}</div>
    </main>
  );
};

export default Laoyout;
