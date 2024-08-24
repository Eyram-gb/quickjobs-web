import { z } from "zod";

export const GigSchema = z.object({
  title: z.string({
    description: "Company name",
    required_error: "Please enter a company name",
  }),
  description: z.string({
    description: "Description of the gig",
    required_error: "Description is required",
  }),
  duration: z.string({
    description: "Duration of the gig",
    required_error: "Duration is required",
  }),
  industry_id: z
    .string({
      description: "Industry ID of the gig",
      required_error: "Industry is required",
    })
    .optional(),
  negotiable: z.enum(["true", "false"], {
    description: "Is budget for the gig negotiable",
    required_error: "Negotiable field is required",
  }),
  budget_range: z.string({
    description: "Budget range of the gig",
    required_error: "Budget is required",
  }),
  requirements: z.string({
    description: "Skills required for the gig",
    required_error: "Skills are required",
  }),
});

export type TGigSchema = z.infer<typeof GigSchema>;
