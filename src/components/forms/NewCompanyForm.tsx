
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { API_BASE_URL } from '@/lib/constants';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/store/authStore';

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

export type TCompanySchema = z.infer<typeof companySchema>;
const NewCompanyForm = ({ user_id, email }: { user_id: string, email: string }) => {
    const form = useForm<z.infer<typeof companySchema>>({
        resolver: zodResolver(companySchema),
    });

    const {setEmployerProfile} = useAuthStore();

    const {
        formState: { isDirty, isSubmitting },
    } = form;

    const onSubmit: SubmitHandler<z.infer<typeof companySchema>> = async (data) => {
        try {
            const res = await fetch(`${API_BASE_URL}/users/employers`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, user_id }),
            });
            const newEmployerRes = await res.json();
            if (res.status !== 201) {
                throw new Error('Failed to create your profile. Please try again.');
            }

            if (res.status === 201) {
                form.reset();
                toast.success('Your company profile has been created successfully.');
                setEmployerProfile(newEmployerRes);
                return;
            }

            console.log(data)
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='w-full'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3 w-full'>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className='text-lg font-semibold'>Company Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Barclays Enterprise" {...field} />
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
                                <FormLabel className='text-lg font-semibold'>Company Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Barclays Enterprise" {...field} className='resize-none' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="logo_url"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className='text-lg font-semibold'>Logo Url</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://cloudinary.ehibjb343.png" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="website_url"
                        render={({ field }) => (
                            <FormItem className='w-full'>
                                <FormLabel className='text-lg font-semibold'>Company Website</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://barclaysent.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit' disabled={!isDirty || isSubmitting}>
                        Save
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default NewCompanyForm