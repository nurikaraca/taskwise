'use client';

import useGroupStore from '@/stores/useGroupStore';
import { SidebarButton } from './sidebar-button';
import { SidebarItems } from '@/type/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaCopy } from "react-icons/fa";

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
  const pathname = usePathname();
  const { selectedGroup } = useGroupStore();

  const handleCopyInviteLink = () => {

    if (selectedGroup?.inviteLink) {
      navigator.clipboard.writeText(selectedGroup.inviteLink)
        .then(() => {
          alert("The invite link has been copied!");
        })
        .catch(() => {
          alert("The invite link could not be copied!");
        });
    }
  };
  return (
    <aside className='w-[270px] h-screen fixed left-0 top-0 border-r  mt-20 bg-lightBg dark:bg-darkBg2 text-lightText dark:text-darkText'>
      <div className='h-full px-3 py-4'>
        <div className="flex  justify-center gap-2 ">
        <h3 className='text-lg font-semibold text-foreground  uppercase'>{selectedGroup?.name} </h3>
        <span className="flex items-center gap-1">
        <FaCopy onClick={handleCopyInviteLink} className="cursor-pointer" />
      </span>
        </div>
       
        <div className='mt-5 flex flex-col gap-2'>
          {props.sidebarItems.links.map((link, index) => (
            <Link key={index} href={link.href}>
              <SidebarButton
                variant={pathname === link.href ? 'secondary' : 'ghost'}
                icon={link.icon}
              >
                {link.label}
              </SidebarButton>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
