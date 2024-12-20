'use client';

import { SidebarDesktop } from './sidebar-desktop';
import { SidebarMobile } from './sidebar-mobile';
import { SidebarItems } from '@/type/types';
import { useMediaQuery } from 'usehooks-ts';
import { usePathname } from 'next/navigation'; // Pathname hook'unu ekliyoruz
import { Home, ListCheckIcon, Package2Icon, SquarePenIcon, User, User2, User2Icon, UserIcon, Users } from 'lucide-react';

const Sidebar = () => {
  const isDesktop = useMediaQuery('(min-width: 640px)', {
    initializeWithValue: false,
  });

  const pathname = usePathname(); 
  
  const links = pathname.startsWith('/admin')
    ? [
        { label: 'Home', href: '/', icon:Home  },
        { label: 'Tasks', href: '/admin/tasks', icon:Package2Icon },
        { label: 'Create Task', href: '/admin/createTask', icon: SquarePenIcon  },
        { label: 'Completed', href: '/admin/complated', icon: ListCheckIcon },
        { label: 'Members', href: '/admin/members', icon: Users },
      ]
    : [
        { label: 'Home', href: '/',  icon:Home},
        { label: 'Tasks', href: '/dashboard/tasks', icon:Package2Icon },
        { label: 'Completed', href: '/dashboard/complated', icon: ListCheckIcon },
        { label: 'Members', href: '/admin/members', icon: Users },
      ];

 
  const sidebarItems: SidebarItems = { links };

  if (isDesktop) {
    return <SidebarDesktop sidebarItems={sidebarItems} />;
  }

  return <SidebarMobile sidebarItems={sidebarItems} />;
};

export default Sidebar;
