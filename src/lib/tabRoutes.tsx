'use client'

import { SideTabsProps } from "@/components/SideTabs";
import { BriefcaseBusiness, ChartColumnIncreasing, UserCircle, Settings, Mails, MessagesSquare } from "lucide-react";

export function getTabRoutes(userId: string, employer_id?: string) {

	const employerSideTabs: SideTabsProps[] = [
		{
			name: "Dashboard",
			href: `/${userId}/profile`,
			icon: <ChartColumnIncreasing />,
		},
		{
			name: "My Gigs",
			href: `/${userId}/profile/gigs`,
			icon: <BriefcaseBusiness />,
		},
		{
			name: "Applications",
			href: `/${userId}/profile/${employer_id}/applications`,
			icon: <Mails />,
		},
		{
			name: "Chats",
			href: `/${userId}/profile/chats`,
			icon: <MessagesSquare />,
		},
	];

	const clientSideTabs: SideTabsProps[] = [
		{
			name: "My Profile",
			href: `/${userId}/client-profile`,
			icon: <UserCircle />,
		},
		{
			name: "Available Jobs",
			href: "/gigs",
			icon: <BriefcaseBusiness />,
		},
		{
			name: "Chats",
			href: `/${userId}/client-profile/chats`,
			icon: <MessagesSquare />,
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