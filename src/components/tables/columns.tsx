"use client"
import React, {useState} from 'react'
import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "../ui/checkbox"
import { Badge } from "../ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuRadioGroup, DropdownMenuRadioItem } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal, ChevronsUpDown, Check } from "lucide-react"
import { Dialog, DialogTrigger } from "../ui/dialog"
import MessageClientDialog from "../MessageClientDialog"

export interface Application {
    application_id: string;
    gig_id: string;
    applicant_id: string;
    user_id: string;
    cv_url: string;
    first_name: string;
    last_name: string;
    email: string;
    created_at: string;
    gig_title: string;
    gig_description: string;
    status: 'pending' | 'accepted' | 'rejected';
}

export const columns: ColumnDef<Application>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "full_name",
        header: "Full Name",
        cell: ({ row }) => {
            const firstName = row.original.first_name
            const lastName = row.original.last_name
            return `${firstName} ${lastName}`
        },
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const application = row.original;
            return <UpdateStatusDropdown applicationId={application.application_id} currentStatus={application.status} />;
        },
    },
    {
        accessorKey: "gig_title",
        header: "Gig Title",
    },
    {
        accessorKey: "created_at",
        header: "Applied On",
        cell: ({ row }) => {
            const date = new Date(row.getValue("created_at"))
            return date.toLocaleDateString()
        },
    },
    {
        accessorKey: "cv_url",
        header: "CV",
        cell: ({ row }) => {
            const cvUrl = row.getValue("cv_url") as string
            return (
                <a href={cvUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    View CV
                </a>
            )
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const application = row.original

            return (
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(application.application_id)}
                            >
                                Copy Application ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>View Application Details</DropdownMenuItem>
                            <DialogTrigger asChild>
                                <DropdownMenuItem>Message Applicant</DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <MessageClientDialog recipient_id={application.user_id} client_name={`${application.first_name} ${application.last_name}`} />
                </Dialog>
            )
        },
    },
]

export function DropdownMenuRadioGroupDemo() {
    const [position, setPosition] = useState("pending")

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
                    <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const statusOptions: Array<string> = ['pending', 'accepted', 'rejected'];

interface UpdateStatusDropdownProps {
    applicationId: string;
    currentStatus: string;
}

const UpdateStatusDropdown: React.FC<UpdateStatusDropdownProps> = ({ applicationId, currentStatus }) => {
    const [selectedStatus, setSelectedStatus] = useState<string>(currentStatus);

    const handleStatusChange = async (newStatus: string) => {
        try {
            const response = await fetch('/api/update-status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    application_id: applicationId,
                    status: newStatus,
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setSelectedStatus(newStatus);
        } catch (error) {
            console.error("Error updating status:", error);
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Badge
                    variant="outline"
                    className={
                        selectedStatus === "accepted"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-500 cursor-pointer"
                            : selectedStatus === "pending"
                                ? "bg-orange-100 text-orange-800 border-orange-500 cursor-pointer"
                                : "bg-rose-100 text-rose-800 border-rose-500 cursor-pointer"
                    }
                >
                    {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)} <ChevronsUpDown size={14} />
                </Badge>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {statusOptions.map((status) => (
                    <DropdownMenuItem key={status} onClick={() => handleStatusChange(status)}>
                        {selectedStatus === status && <span className="mr-2"><Check size={16}/></span>}
                        <span className={`${selectedStatus !== status? 'ml-6': ''}`}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
