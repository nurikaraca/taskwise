"use client"
import { logout } from '@/actions/auth'
import React from 'react'
import {LogOut,  User} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Image from 'next/image'
import Link from 'next/link'
 
interface AccountMenuProps {
   
    email: string;
    name: string;
    image?: string;
  }

const AccountMenu:React.FC<AccountMenuProps>  = ({ name, image }) => {
 
     
  return (
    <div className='bg-lightBg2 dark:bg-darkBg text-lightText dark:text-darkText '>
     
     <DropdownMenu  >
      <DropdownMenuTrigger asChild  >
        <Button variant="ghost">
        <div className="flex items-center gap-x-2 text-sm ">
              {name}
              {image && (
                <Image
                  className='rounded-full'
                  width={30}
                  height={30}
                  alt='User Avatar'
                  src={image || ""}
                />
              )}
            </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56  backdrop-blur-lg bg-lightBg2 dark:bg-darkBg text-lightText dark:text-darkText">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User />
            <Link href="/settings">Settings</Link>
          </DropdownMenuItem> 
        </DropdownMenuGroup>      
        <DropdownMenuItem >
          <LogOut />
           <span onClick={() =>logout()}>Log out</span> 
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    </div>
  )
}

export default AccountMenu