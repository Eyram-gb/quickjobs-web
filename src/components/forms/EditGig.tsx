'use client';

import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { GigSchema, TGigSchema } from '@/lib/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'

import { API_BASE_URL } from '@/lib/constants';

const EditGig = ({ employerId, userId, gig }: { employerId: string, userId: string, gig: TGigSchema }) => {
    const form = useForm<TGigSchema>({
        resolver: zodResolver(GigSchema),
        defaultValues: {
            title: gig.title,
            description: gig.description,
            duration: gig.duration,
            budget_range: gig.budget_range
        }
    });

    const {
        formState: { isDirty, isSubmitting },
    } = form

    const onSubmit: SubmitHandler<TGigSchema> = async (data) => {
        try {
            // const industry_id = Number(data.industry_id);
            const gigInfo = {
                ...data,
                // industry_id,
                employer_id: employerId,
                user_id: userId
            }
            console.log(gigInfo)
            const res = await fetch(`${API_BASE_URL}/gigs/${gig.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gigInfo),
            });

            if (res.status === 201) {
                return toast.success('Gig edited successfully');
            } else {
                toast.error('Failed to update gig');
            }
        } catch (error) {
            toast.error('Failed to update gig');
            console.log(error)
        }
    }
    return (
        <>

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
        </>
    )
}

export default EditGig