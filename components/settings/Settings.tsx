"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import SettingsMenu from "./SettingsMenu";

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
  );
};

export default Settings;

