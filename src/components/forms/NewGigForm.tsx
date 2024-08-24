'use client';

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import Link from 'next/link'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { API_BASE_URL } from '@/lib/constants';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/store/authStore';
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
    duration: z.string({
        description: 'Duration of the gig',
        required_error: 'Duration is required',
    }),
    industry_id: z.string({
        description: 'Industry ID of the gig',
        required_error: 'Industry is required',
    }).optional(),
    negotiable: z.enum(['true', 'false'], {
        description: 'Is budget for the gig negotiable',
        required_error: 'Negotiable field is required',
    }),
    budget_range: z.string({
        description: 'Budget range of the gig',
        required_error: 'Budget is required',
    }),
    requirements: z.string({
        description: 'Skills required for the gig',
        required_error: 'Skills are required',
    })
})

type TGigSchema = z.infer<typeof GigSchema>;

const NewGigForm = ({ industries }: {
    industries: {
        id: number;
        name: string
    }[]
}) => {
    const form = useForm<TGigSchema>({
        resolver: zodResolver(GigSchema),
    });
    const {
        formState: { isDirty, isSubmitting },
    } = form;

    const { employer_profile, user } = useAuthStore();

    const onSubmit: SubmitHandler<TGigSchema> = async (data) => {
        try {
            const negotiable = (data.negotiable?.toLowerCase?.() === 'true')
            const industry_id = Number(data.industry_id);
            const gigInfo = {
                ...data,
                // negotiable,
                industry_id, 
                employer_id: employer_profile?.id, 
                user_id: user?.id
            }
            console.log(gigInfo)
            const res = await fetch(`${API_BASE_URL}/gigs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gigInfo),
            });

            if (res.status === 201) {
                form.reset(); 
                                return toast.success('Gig created successfully');
            } else {
                toast.error('Failed to create gig');
            }
        } catch (error) {
            toast.error('Failed to create gig');
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button type='button'>
                        Post a gig
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Create a New Gig</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel className='text-lg font-semibold'>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="HR Consulting" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel className='text-lg font-semibold'>Description</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Gig description" {...field} className='resize-none' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className='flex gap-x-4 w-full '>
                                <FormField
                                    control={form.control}
                                    name="duration"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel className='text-lg font-semibold'>Duration</FormLabel>
                                            <FormControl>
                                                <Input placeholder="14 working days" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="industry_id"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel className='text-lg font-semibold'>Industry</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select an industry relating to the gig" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    {
                                                        industries.map((industry) => (
                                                            <SelectItem key={industry.id} value={industry.id.toString()}>
                                                                {industry.name}
                                                            </SelectItem>
                                                        ))
                                                    }
                                                </SelectContent>
                                            </Select>
                                            {/* <FormDescription>
                                            You can manage email addresses in your{" "}
                                            <Link href="/examples/forms">email settings</Link>.
                                        </FormDescription> */}
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                            </div>
                            <div className='flex gap-x-4 w-full'>
                                <FormField
                                    control={form.control}
                                    name="budget_range"
                                    render={({ field }) => (
                                        <FormItem className='w-1/2'>
                                            <FormLabel className='text-lg font-semibold'>Budget</FormLabel>
                                            <FormControl>
                                                <Input placeholder="$3200" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="negotiable"
                                    render={({ field }) => (
                                        <FormItem className="w-1/2">
                                            <FormLabel className='text-lg font-semibold'>Negotiable</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                    className="flex gap-x-4"
                                                >
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value={'true'} />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            True
                                                        </FormLabel>
                                                    </FormItem>
                                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                                        <FormControl>
                                                            <RadioGroupItem value={'false'} />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">False</FormLabel>
                                                    </FormItem>
                                                </RadioGroup>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="requirements"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel className='text-lg font-semibold'>Requirements</FormLabel>
                                        <FormControl>
                                            <Textarea placeholder="Gig description" {...field} className='resize-none' />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type='submit' disabled={!isDirty || isSubmitting} className='w-full'>
                                Save
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default NewGigForm