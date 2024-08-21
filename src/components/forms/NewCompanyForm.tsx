
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

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
    const form = useForm<z.infer<typeof companySchema>>({
        resolver: zodResolver(companySchema),
    });

    return (
        <>
            <Form {...form}>
                <form className='space-y-3'>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className='col-span-1'>
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
                            <FormItem className='col-span-1'>
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
                            <FormItem className='col-span-1'>
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
                            <FormItem className='col-span-1'>
                                <FormLabel className='text-lg font-semibold'>Company Website</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://barclaysent.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type='submit'>
                        Save
                    </Button>
                </form>
            </Form>
        </>
    )
}

export default NewCompanyForm