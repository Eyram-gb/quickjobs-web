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
