'use client';

import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { API_BASE_URL } from '@/lib/constants';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/store/authStore';
import { useRouter } from 'next/navigation';

const clientSchema = z.object({
    first_name: z.string({
        description: 'First name of user.',
        required_error: 'Please enter a valid email address'
    }).max(25, {
        message: 'First name should not exceed 25 characters',
    }),
    last_name: z.string({
        description: 'First name of user.',
        required_error: 'Please enter a valid email address'
    }).max(25, {
        message: 'First name should not exceed 25 characters',
    }),
    other_name: z.string({
        description: 'First name of user.',
    }).max(25, {
        message: 'Other name should not exceed 25 characters',
    }).optional(),
    profile_url: z.string({
        description: 'profile url of client.',
        required_error: 'Profile url of client.'
    }).url(),
    bio: z.string({
        description: 'Bio of client',
        required_error: 'Bio is required',
    }).max(1000, {
        message: 'Bio should not exceed 1000 characters',
    })
});
export type TClientSchema = z.infer<typeof clientSchema>
const NewClientForm = ({ user_id, email }: { user_id: string, email: string }) => {
    const form = useForm<z.infer<typeof clientSchema>>({
        resolver: zodResolver(clientSchema)
    });

    const {
        formState: { isDirty, isSubmitting },
    } = form;

    const { setClientProfile } = useAuthStore();

    const router = useRouter();

    const onSubmit: SubmitHandler<z.infer<typeof clientSchema>> = async (data) => {
        try {
            const res = await fetch(`${API_BASE_URL}/users/applicants`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, email, user_id }),
            });
            const newClientRes = await res.json();
            if (res.status !== 201) {
                throw new Error('Failed to create your profile. Please try again.');
            }

            if (res.status === 201) {
                form.reset();
                toast.success('Your profile has been created successfully.');
                setClientProfile(newClientRes);
                return router.push(`/${user_id}/(client)/client-profile`);
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='w-full'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3 w-full'>
                    <div className='md:grid grid-cols-2 gap-4'>
                        <FormField
                            control={form.control}
                            name="first_name"
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
                        <FormField
                            control={form.control}
                            name="last_name"
                            render={({ field }) => (
                                <FormItem className='col-span-1'>
                                    <FormLabel className='text-lg font-semibold'>Last Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className='md:grid grid-cols-2 gap-4'>
                        <FormField
                            control={form.control}
                            name="other_name"
                            render={({ field }) => (
                                <FormItem className='col-span-1'>
                                    <FormLabel className='text-lg font-semibold'>Middle Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Middle name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className='col-span-1 mt-0.5'>
                            <FormLabel className='text-lg font-semibold'>Email</FormLabel>
                            <FormControl>
                                <Input disabled defaultValue={email} className='text-black' />
                            </FormControl>
                            <FormMessage />
                        </div>

                        {/* <Input disabled defaultValue={email} className='col-span-1' /> */}
                    </div>
                    <FormField
                        control={form.control}
                        name="profile_url"
                        render={({ field }) => (
                            <FormItem className='col-span-1'>
                                <FormLabel className='text-lg font-semibold'>Profile Url</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://image.png" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem className=''>
                                <FormLabel className='text-lg font-semibold'>Bio</FormLabel>
                                <FormControl>
                                    <Textarea {...field} rows={3} className='resize-none' placeholder='A brief description about you...' />
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

export default NewClientForm