'use client'

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { API_BASE_URL } from '@/lib/constants';

const ApplyGigSchema = z.object({
    // gig_id: z.string({
    //     description: "User ID of the gig creator",
    //     required_error: "User ID is required",
    // }).uuid(),
    // applicant_id: z.string({
    //     description: "Applicant profile ID of the gig creator",
    //     required_error: "Applicant profile ID is required",
    // }).uuid(),
    cv_url: z.string({
        description: "Link to cv",
        required_error: "Link to CV is required",
    }),
    // is_featured: z.boolean().default(false), // Commented out as it's commented in the original schema
});

export type TApplyGig = z.infer<typeof ApplyGigSchema>

const ApplyGig = ({ gigId, applicantId }: {
    gigId: string,
    applicantId: string,
}) => {
    const form = useForm<TApplyGig>();
    const {
        formState: { isDirty, isSubmitting }, handleSubmit
    } = form;

    const onSubmit: SubmitHandler<TApplyGig> = async (data) => {
        try {
            console.log(data)
            const res = await fetch(`${API_BASE_URL}/users/applicants`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, gig_id: gigId, applicant_id: applicantId }),
            });
            const newClientRes = await res.json();
            if (res.status !== 201) {
                throw new Error('Failed to create your profile. Please try again.');
            }
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <div>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="cv_url"
                        render={({ field }) => (
                            <FormItem className='col-span-1'>
                                <FormLabel className='text-lg font-semibold'>First Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' className='w-full' disabled={!isDirty || isSubmitting}>Send Application</Button>
                </form>
            </Form>
        </div>
    )
}

export default ApplyGig