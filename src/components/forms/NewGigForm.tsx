import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Form } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
// import { Stardos_Stencil } from 'next/font/google'

const GigSchema = z.object({
    title: z.string({
        description: 'Company name',
        required_error: 'Please enter a company name',
    }),
    description: z.string({
        description: 'Description of the gig',
        required_error: 'Description is required',
    }),
    start_date: z.date({
        description: 'Start date of the gig',
        required_error: 'Start date is required',
    }),
    end_date: z.date({
        description: 'End date of the gig',
        required_error: 'End date is required',
    }),
    industry_id: z.number({
        description: 'Industry ID of the gig',
        required_error: 'Industry is required',
    }),
    negotiable: z.boolean({
        description: 'Is budget for the gig negotiable',
        required_error: 'Negotiable flag is required',
    }),
    budget_range: z.string({}),
    requirements: z.string({
        description: 'Skills required for the gig',
        required_error: 'Skills are required',
    })
})

type TGigSchema = z.infer<typeof GigSchema>;

const NewGigForm = () => {
    const form = useForm<TGigSchema>({
        resolver: zodResolver(GigSchema),
    });
    return (
        <>
            <Dialog>

                <DialogTrigger asChild>
                    <Button type='button'>
                        Post a gig
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create a New Gig</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form>

                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default NewGigForm