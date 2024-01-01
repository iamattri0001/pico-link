import React from "react";

const Page = () => {
  return (
    <div className="w-screen h-screen flex gap-x-10 items-center justify-center">
      <div className="w-32 h-32 bg-accent flex items-center justify-center rounded">
        ACCENT
      </div>
      <div className="w-32 h-32 bg-primary flex items-center justify-center rounded">
        PRIMARY
      </div>
      <div className="w-32 h-32 bg-secondary flex items-center justify-center rounded">
        SECONDARY
      </div>
      <div className="w-32 h-32 bg-background flex items-center justify-center rounded">
        BACKGROUND
      </div>
    </div>
  );
};

export default Page;
