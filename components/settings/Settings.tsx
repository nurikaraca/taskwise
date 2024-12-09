
"use client";

import { useEffect, useState } from "react";
import UserImage from "../account/UserImage";
import { getUser } from "@/actions/user/getUser";
import ListGroup from "../account/ListGroup";
import SettingsMenu from "./SettingsMenu";
import dynamic from "next/dynamic";

export interface UserProps {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    emailVerified: string | null;
    hashedPassword: string | null;
    image: string | null;
  };
}

const Settings = () => {
  const [activeComponent, setActiveComponent] = useState<string>("ProfileSettings");
  
  
  const ActiveComponent = dynamic(
    () => import(`@/components/settings/${activeComponent}`),
    { ssr: false }
  );
  return (
    <div className="flex h-full w-full">
    {/* Menu */}
    <div className="w-[20%]">
      <SettingsMenu setActiveComponent={setActiveComponent} />
    </div>
    {/* content*/}
    <div className="w-[80%]  p-4 h-full ">
      <ActiveComponent />
    </div>
  </div>
  )
}

export default Settings

