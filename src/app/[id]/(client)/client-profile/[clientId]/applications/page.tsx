import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { API_BASE_URL } from '@/lib/constants'
import React from 'react'

interface TClientApplication {
    application_id: string;
    gig_id: string;
    status: string;
    gig_title: string;
    gig_description: string;
}

export default async function ClientApplications({ params: { clientId } }: { params: { clientId: string } }) {
    const res = await fetch(`${API_BASE_URL}/applications/client/${clientId}`, {
        cache: "no-store",
    })
    const data: TClientApplication[] = await res.json();
    function getStatusClass(status: string) {
        const baseClass = "text-[10px] mb-2"; // Base style for all conditions

        if (status === "accepted") {
            return `${baseClass} bg-emerald-100 text-emerald-800 border-emerald-500`;
        } else if (status === "pending") {
            return `${baseClass} bg-orange-100 text-orange-800 border-orange-500`;
        } else if (status === "rejected") {
            return `${baseClass} bg-rose-100 text-rose-800 border-rose-500`;
        } else if (status === "reviewing") {
            return `${baseClass} bg-cyan-100 text-cyan-800 border-cyan-500`;
        }
        return baseClass;
    }
    return (
        <div className='p-8 flex gap-4'>
            {
                data.map((item, idx) => {
                    return (

                        <Card className='p-2 w-56' key={idx}>
                            <div className='flex justify-end'>
                                <Badge
                                    variant="outline"
                                    className={getStatusClass(item.status)}
                                >
                                    {item.status}
                                </Badge>
                            </div>
                            <p className='font-semibold'>{item.gig_title}</p>
                            <p className='text-xs text-gray-400 leading-tight'>
                                {item.gig_description.slice(0, 110)}
                                {item.gig_description.length > 110 ? '...' : ''}
                            </p>
                        </Card>
                    )
                })
            }
        </div>
    )
}