import React from 'react'
import { z } from 'zod'

const NewCompanyForm = () => {
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
        email: z.string().email(),
    })
  return (
    <div>NewCompanyForm</div>
  )
}

export default NewCompanyForm