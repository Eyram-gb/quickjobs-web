import { TGigSchema } from "./schemas";

export interface TGig extends TGigSchema {
  id: string;
  user_id: string;
  employer_id: string;
  is_active: boolean;
  is_deleted: boolean;
  created_at: Date;
  updated_at: Date;
  location?: string;
}

export interface TGigDetails {
  id: string;
  user_id: string;
  employer_id: string;
  title: string;
  description: string;
  duration: string;
  location: string | null;
  budget_range: string;
  negotiable: "true" | "false";
  requirements: string;
  industry_id: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  is_deleted: boolean;
}
