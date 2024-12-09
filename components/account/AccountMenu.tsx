"use client"
import { logout } from '@/actions/auth'
import React from 'react'
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Image from 'next/image'
import Link from 'next/link'
 
interface AccountMenuProps {
   
    email: string;
    name: string;
    image?: string;
  }

const AccountMenu:React.FC<AccountMenuProps>  = ({  email, name, image }) => {
 
     
  return (
    <div className=' '>
     
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
      <DropdownMenuContent className="w-56 text-white  backdrop-blur-lg">
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
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

    </div>
  )
}

export default AccountMenu