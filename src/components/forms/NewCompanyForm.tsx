import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'

const companySchema = z.object({
    name: z.string({
        description: 'Company name',
        required_error: 'Please enter a company name',
    }),
    description: z.string({
        description: 'Company description',
        required_error: 'Please provide a description of your company',
    }),
    logo_url: z.string(),
    website_url: z.string().url(),
})
type TCompanySchema = z.infer<typeof companySchema>;
const NewCompanyForm = () => {
    const form = useForm<TCompanySchema>({
        resolver: zodResolver(companySchema),
    });    
    
  return (
    <div>NewCompanyForm</div>
  )
}

export default NewCompanyForm