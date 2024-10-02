'use client'
import { Button } from "../ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Textarea } from '../ui/textarea';
import { API_BASE_URL } from '@/lib/constants';
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { clientSchema, TClientSchema } from "./NewClientForm";


export function EditClientProfile() {
    const { setClientProfile, user, client_profile } = useAuthStore();
    const form = useForm<TClientSchema>({
        resolver: zodResolver(clientSchema),
        defaultValues: {
            first_name: client_profile?.first_name,
            last_name: client_profile?.last_name,
            bio: client_profile?.bio,
            profile_url: client_profile?.profile_url,
            other_name: client_profile?.other_name,

        }
    });
    const router = useRouter();


    const {
        formState: { isDirty, isSubmitting },
    } = form;

    const onSubmit: SubmitHandler<TClientSchema> = async (data) => {
        try {
            const res = await fetch(`${API_BASE_URL}/users/applicants/d76ce434-8105-49e8-ac3a-7d39c424e6eb`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, user_id: user?.id, email: user?.email }),
            });
            const updatedRes = await res.json();
            if (res.status !== 201) {
                throw new Error('Failed to update your profile. Please try again.');
            }

            if (res.status === 201) {
                // form.reset();
                toast.success('Your profile has been updated successfully.');
                setClientProfile(updatedRes);
                return router.refresh();
            }

            toast.error('Failed to update your profile. Please try again.');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Update Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you&apos;re done.
                    </DialogDescription>
                </DialogHeader>
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
                                    <Input disabled defaultValue={user?.email} className='text-black' />
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
                        <Button type='submit' disabled={!isDirty || isSubmitting} className='w-full mt-4'>
                            Save
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
