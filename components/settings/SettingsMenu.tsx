
import React from 'react'
import { GiSettingsKnobs } from "react-icons/gi";
import { FaLayerGroup } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
const SettingsMenu = ({setActiveComponent }: { setActiveComponent: (component: string) => void }) => {
  return (
    <div className="flex flex-col h-full w-full p-3 text-2xl ">
    <ul className="flex flex-col space-y-4">
      <button
        className="flex items-center"
        onClick={() => setActiveComponent("ProfileSettings")}
      >
        <GiSettingsKnobs size={30} className="mr-3" />
        Profile
      </button>
      <button
        className="flex items-center"
        onClick={() => setActiveComponent("GroupSettings")}
      >
        <FaLayerGroup size={30} className="mr-3" />
        Groups
      </button>
      <button
        className="flex items-center"
        onClick={() => setActiveComponent("MemberSettings")}
      >
        <CiUser size={30} className="mr-3" />
        Members
      </button>
    </ul>
  </div>
  )
}

export default SettingsMenu