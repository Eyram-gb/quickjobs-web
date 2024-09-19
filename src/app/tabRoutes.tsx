'use client'

import { SideTabsProps } from "@/components/SideTabs";
import { BriefcaseBusiness, ChartColumnIncreasing, UserCircle, Settings } from "lucide-react";

export function getTabRoutes (address:string) {

	const employerSideTabs: SideTabsProps[] = [
		{
			name: "Dashboard",
			href: `/${address}/profile`,
			icon: <ChartColumnIncreasing />,
		},
		{
			name: "My Gigs",
			href: `/${address}/profile/gigs`,
			icon: <BriefcaseBusiness />,
		},
		{
			name: "Applications",
			href: `/${address}/applications`,
			icon: <BriefcaseBusiness />,
		},
	];

	const clientSideTabs: SideTabsProps[] = [
		{
			name: "My Profile",
			href: `/${address}/profile}`,
			icon: <UserCircle />,
		},
		{
			name: "Available Jobs",
			href: "/jobs",
			icon: <BriefcaseBusiness />,
		},
	];

	const settingsSideTabs: SideTabsProps[] = [
		{
			name: "Account Settings",
			href: "/settings/account",
			icon: <Settings />,
		},
		// Add more settings tabs as needed
	];

	return {
		employerSideTabs,
		clientSideTabs,
		settingsSideTabs,
	};
};