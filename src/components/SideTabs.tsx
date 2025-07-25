"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

export interface SideTabsProps {
    name: string;
    icon: JSX.Element;
    href: string;
}

const SideTabs = ({ tabs }: { tabs: SideTabsProps[] }) => {
    const pathname = usePathname();
    return (
        <>
            {/* Desktop sidebar */}
            <aside className="hidden md:flex col-span- md:col-span-2 pt-8 pl-6 flex-col">
                {tabs.map((tab) => (
                    <Button
                        asChild
                        key={tab.href}
                        variant="ghost"
                        className={`justify-start ${
                            pathname === tab.href ? "hover" : ""
                        }`}
                    >
                        <Link
                            href={tab.href}
                            className={`space-x-4 flex gap-x-4 items-center ${
                                pathname === tab.href
                                    ? "duration-150 transition-all ease-in bg-gray-200"
                                    : ""
                            }`}
                        >
                            {tab.icon}
                            {tab.name}
                        </Link>
                    </Button>
                ))}
            </aside>
            {/* Mobile bottom nav */}
            <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t flex md:hidden justify-around py-2">
                {tabs.map((tab) => (
                    <Link
                        href={tab.href}
                        key={tab.href}
                        className={`flex flex-col items-center justify-center px-2 ${
                            pathname === tab.href
                                ? "text-teal-600"
                                : "text-gray-500"
                        }`}
                    >
                        <span className="text-xl">{tab.icon}</span>
                        <span className="text-xs mt-1">{tab.name}</span>
                    </Link>
                ))}
            </nav>
        </>
    );
};

export default SideTabs;