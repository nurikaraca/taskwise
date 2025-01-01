"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import SettingsMenu from "./SettingsMenu";
import SettingsMobileMenu from "./SettingsMobileMenu";

const Settings = () => {
  const [activeComponent, setActiveComponent] = useState<string>("ProfileSettings");

  const ActiveComponent = dynamic(
    () => import(`@/components/settings/${activeComponent}`),
    { ssr: false }
  );

  return (
    <div className="flex h-full w-full bg-lightBg2 dark:bg-darkBg text-lightText dark:text-darkText ">  
        {/* Mobile Menu */}
        <div className="lg:hidden bg-slate-600 w-0 h-0">
          <SettingsMobileMenu setActiveComponent={setActiveComponent} />
        </div>
      
      {/* Desktop Menu */}
     <div className="hidden lg:flex md:w-[20%]">
       <SettingsMenu setActiveComponent={setActiveComponent} />
     </div>
     {/* content*/}
     <div className="flex-1 p-4 h-full w-full">
       <ActiveComponent />
     </div>
   </div>
  );
};

export default Settings;

