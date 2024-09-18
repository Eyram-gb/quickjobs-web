'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

export interface SideTabsProps {
    name: string;
    icon: JSX.Element;
    href: string;
}

const SideTabs = ({ tabs }: { tabs: SideTabsProps[] }) => {
    const pathname = usePathname();
    return (
        <>
            <aside className='col-span-2 pt-8 pl-6 space-y-3'>
                {
                    tabs.map((tab) => (
                        <div key={tab.href} className=''>
                            <Link href={tab.href} className={`space-x-4 flex gap-x-4 items-center ${pathname === tab.href ? 'duration-150 transition-all ease-in bg-slate-200' : ''}`}>
                                {tab.icon}
                                {tab.name}
                            </Link>
                        </div>
                    ))
                }
            </aside>
        </>
    )
}

export default SideTabs