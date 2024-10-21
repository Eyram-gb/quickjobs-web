import { TGigSchema } from "./schemas";

export interface TGig extends TGigSchema {
  id: string;
  user_id: string;
  employer_id: string;
  is_active: boolean;
  company_logo: string;
  company_name: string;
  application_count:string;
  schedule: "part_time" | "full_time" | 'internship';
  location: {
    country: string;
        countryCode: string;
        region: string;
        regionName: string;
        city: string;
        lat: number;
        lon: number;
  }
  remote: "true" | "false";
  experience: "entry_level" | "intermediate" | "expert";
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
  application_count: string;
  schedule: "part_time" | "full_time" | 'internship';
  remote: "true" | "false";
  experience: "entry_level" | "intermediate" | "expert";
  location: string | null;
  budget_range: string;
  negotiable: "true" | "false";
  requirements: string[];
  company_logo: string;
  company_name: string;
  website: string;
  company_bio: string;
  industry_id: number;
  created_at: Date;
  updated_at: string;
  is_active: boolean;
  is_deleted: boolean;
}
