import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Nav = () => {
  return (
    <div className=" w-[95vw] px-10 py-4 border-b border-text/30 flex items-center justify-between">
      <Link
        href={"/dashboard"}
        className="text-2xl text-transparent font-bold font-heading bg-gradient-to-br from-accent to-primary bg-clip-text"
      >
        PicoLink
      </Link>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
};

export default Nav;
