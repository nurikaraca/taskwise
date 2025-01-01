

"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { GiSettingsKnobs } from "react-icons/gi";
import { FaLayerGroup } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MenuIcon } from "lucide-react";

const SettingsMobileMenu = ({
  setActiveComponent,
}: {
  setActiveComponent: (component: string) => void;
}) => {
  const { setTheme } = useTheme();

  return (
    <div className="pl-4 h-6 w-full bg-lightBg2 dark:bg-darkBg text-lightText dark:text-darkText -mt-14  ">
      {/* Dropdown Menu Trigger */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <MenuIcon size={20} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          className="w-56 bg-lightBg2 dark:bg-darkBg text-lightText dark:text-darkText"
        >
          <DropdownMenuItem
            onClick={() => setActiveComponent("ProfileSettings")}
            className="flex items-center space-x-2"
          >
            <GiSettingsKnobs size={20} />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setActiveComponent("GroupSettings")}
            className="flex items-center space-x-2"
          >
            <FaLayerGroup size={20} />
            <span>Groups</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setActiveComponent("MemberSettings")}
            className="flex items-center space-x-2"
          >
            <CiUser size={20} />
            <span>Members</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme("light")}
            className="flex items-center space-x-2"
          >
          
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SettingsMobileMenu;
