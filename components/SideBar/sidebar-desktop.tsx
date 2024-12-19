'use client';

import { SidebarButton } from './sidebar-button';
import { SidebarItems } from '@/type/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarDesktopProps {
  sidebarItems: SidebarItems;
}

export function SidebarDesktop(props: SidebarDesktopProps) {
  const pathname = usePathname();

  return (
    <aside className='w-[270px] h-screen fixed left-0 top-0 border-r mt-20'>
      <div className='h-full px-3 py-4'>
        <h3 className='text-lg font-semibold text-foreground'>TaskWise</h3>
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
