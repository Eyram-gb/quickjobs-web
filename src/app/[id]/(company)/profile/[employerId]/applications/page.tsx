// import { useAuthStore } from "@/lib/store/authStore"
// import { columns, Application } from "./tables/columns"
// import { DataTable } from "./tables/DataTable"
import { Application, columns } from "@/components/tables/columns";
import { DataTable } from "@/components/tables/DataTable";
import { API_BASE_URL } from "@/lib/constants"
import React from "react";

export default async function ApplicationsTable(
  {
    params: { employerId },
    searchParams
  }:
    {
      params: { employerId: string };
      searchParams: { [key: string]: string | string[] | undefined }
    }
) {
  // const { employer_profile } = useAuthStore()
  const { gigId } = searchParams;
  const url = gigId
    ? `${API_BASE_URL}/applications/employer/${employerId}?gigId=${gigId}`
    : `${API_BASE_URL}/applications/employer/${employerId}`;
  const res = await fetch(url, { cache: "no-store" });
  const data: Application[] = await res.json();
  console.log(searchParams)
  console.log(gigId)
  console.log(data)

  // Remove the useQuery hook and loading/error states
  // if (isPending) return <div>Loading...</div>
  // if (isError) return <div>Error: {error.message}</div>

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
