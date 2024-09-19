'use client'
import { useAuthStore } from "@/lib/store/authStore"
import { columns, Application } from "./tables/columns"
import { DataTable } from "./tables/DataTable"
import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from "@/lib/constants"

export default function ApplicationsTable() {
  const { employer_profile } = useAuthStore()
  const { isPending, isError, data, error } = useQuery<Application[]>({
    queryKey: ['employer_applications'], queryFn: () =>
      fetch(`${API_BASE_URL}/applications/employer/${employer_profile?.id}`).then(
        (res) => res.json()
      )
  })
  if (isPending) return <div>Loading...</div>
  if (isError) return <div>Error: {error.message}</div>

  return (
    <>
      <DataTable columns={columns} data={data} initialColumnVisibility={{
        gig_id: false,
        applicant_id: false,
        gig_description: false,
      }} />
    </>
  )
}
