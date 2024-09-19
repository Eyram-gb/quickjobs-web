import { columns, Application } from "./tables/columns"
import { DataTable } from "./tables/DataTable"

export default function ApplicationsTable() {
  const data: Application[] = [
    {
      application_id: "c85ee288-b5fa-49b2-88f4-5c7666a49d18",
      gig_id: "0ba5f56a-807a-48b4-9f10-c1be3050bfb3",
      applicant_id: "d76ce434-8105-49e8-ac3a-7d39c424e6eb",
      cv_url: "https://example.com/cv1.pdf",
      created_at: "2024-09-06T18:26:05.000Z",
      gig_title: "Nurse Specialist (ENT)",
      gig_description: "A nurse specialized in Ear, Nose and Throat!!",
      status: "pending"
    },
    {
      application_id: "a1b2c3d4-e5f6-4a5b-8c7d-9e0f1a2b3c4d",
      gig_id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
      applicant_id: "f1e2d3c4-b5a6-7c8d-9e0f-1a2b3c4d5e6f",
      cv_url: "https://example.com/cv2.pdf",
      created_at: "2024-09-07T10:15:30.000Z",
      gig_title: "Software Developer",
      gig_description: "Experienced software developer needed for a web application project",
      status: "accepted"
    },
    {
      application_id: "g7h8i9j0-k1l2-3m4n-5o6p-7q8r9s0t1u2",
      gig_id: "v3w4x5y6-z7a8-9b0c-1d2e-3f4g5h6i7j8",
      applicant_id: "k9l0m1n2-o3p4-5q6r-7s8t-9u0v1w2x3y4",
      cv_url: "https://example.com/cv3.pdf",
      created_at: "2024-09-08T14:45:00.000Z",
      gig_title: "Graphic Designer",
      gig_description: "Creative graphic designer needed for branding project",
      status: "rejected"
    },
  ]

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
