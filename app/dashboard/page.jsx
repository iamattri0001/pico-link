import LinkMenu from "@/components/LinkMenu";
import { Stats } from "@/components/Stats";
import { auth, currentUser } from "@clerk/nextjs";
import React from "react";

const Dashboard = async () => {
  const user = await currentUser();
  return (
    <section className="flex flex-col gap-y-16 items-center">
      <h1 className="text-3xl">
        Welcome, <span className="text-primary">{user.firstName}</span>
      </h1>
      <Stats userId={user.id} />
      <LinkMenu userId={user.id} />
    </section>
  );
};

export default Dashboard;
