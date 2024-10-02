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
import { companySchema, TCompanySchema } from "./NewCompanyForm";


export function EditEmployerProfile() {
    const { setEmployerProfile, user, employer_profile } = useAuthStore();
    const form = useForm<TCompanySchema>({
        resolver: zodResolver(companySchema),
        defaultValues: {
            name: employer_profile?.name,
            description: employer_profile?.description,
            logo_url: employer_profile?.logo_url,
            website_url: employer_profile?.website_url
        }
    });
    const router = useRouter();


    const {
        formState: { isDirty, isSubmitting },
    } = form;

    const onSubmit: SubmitHandler<TCompanySchema> = async (data) => {
        try {
            const res = await fetch(`${API_BASE_URL}/users/employers/${employer_profile?.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, user_id: user?.id }),
            });
            const updatedRes = await res.json();
            if (res.status !== 201) {
                throw new Error('Failed to update your profile. Please try again.');
            }

            if (res.status === 201) {
                // form.reset();
                toast.success('Your company profile has been updated successfully.');
                setEmployerProfile(updatedRes);
                return router.refresh();
            }

            toast.error('Failed to update your company profile. Please try again.');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Update Profile</Button>
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
                <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
