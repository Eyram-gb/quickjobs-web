'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'
import { Button } from './ui/button';

export interface SideTabsProps {
    name: string;
    icon: JSX.Element;
    href: string;
}

const SideTabs = ({ tabs }: { tabs: SideTabsProps[] }) => {
    const pathname = usePathname();
    return (
        <>
            <aside className='col-span-2 pt-8 pl-6 flex flex-col'>
                {
                    tabs.map((tab) => (
                        <Button asChild key={tab.href} variant='ghost' className={`justify-start ${pathname === tab.href ? 'hover' : ''}`}>
                            <Link href={tab.href} className={`space-x-4 flex gap-x-4 items-center ${pathname === tab.href ? 'duration-150 transition-all ease-in bg-gray-200' : ''}`}>
                                {tab.icon}
                                {tab.name}
                            </Link>
                        </Button>
                    ))
                }
            </aside>
        </>
    )
}

export default SideTabs