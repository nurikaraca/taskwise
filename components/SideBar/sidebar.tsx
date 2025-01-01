
'use client';

import { SidebarDesktop } from './sidebar-desktop';
import { SidebarMobile } from './sidebar-mobile';
import { SidebarItems } from '@/type/types';
import { useMediaQuery } from 'usehooks-ts';
import { usePathname } from 'next/navigation'; 
import { Home, ListCheckIcon, Package2Icon, SquarePenIcon, Users, MessageCircleMore } from 'lucide-react';
import { useState } from 'react';

const Sidebar = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false,
  });
  

 

  const pathname = usePathname();

  const links = pathname.startsWith('/admin')
    ? [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Tasks', href: '/admin/tasks', icon: Package2Icon },
        { label: 'Create Task', href: '/admin/createTask', icon: SquarePenIcon },
        { label: 'Completed', href: '/admin/complated', icon: ListCheckIcon },
        { label: 'Members', href: '/admin/members', icon: Users },
        { label: 'Chat', href: '/admin/chat', icon: MessageCircleMore },
      ]
    : [
        { label: 'Home', href: '/', icon: Home },
        { label: 'Tasks', href: '/dashboard/tasks', icon: Package2Icon },
        { label: 'Chat', href: '/dashboard/chat', icon: MessageCircleMore },
      ];

  const sidebarItems: SidebarItems = { links };



  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return (
    <SidebarMobile
      sidebarItems={sidebarItems}
      
    />
  );
};

export default Sidebar;
