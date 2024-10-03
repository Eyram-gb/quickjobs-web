import { columns, Application } from "./tables/columns"
import { DataTable } from "./tables/DataTable"
import { API_BASE_URL } from "@/lib/constants"

export default async function ApplicationsTable({ params: { employerId } }: { params: { employerId: string }; }) {
  const res = await fetch(`${API_BASE_URL}/applications/employer/${employerId}`, {
    cache: 'no-store'
  })
  const data: Application[] = await res.json()

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
