import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import Link from 'next/link'
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
    industry_id: z.number({
        description: 'Industry ID of the gig',
        required_error: 'Industry is required',
    }),
    negotiable: z.boolean({
        description: 'Is budget for the gig negotiable',
        required_error: 'Negotiable flag is required',
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

const NewGigForm = () => {
    const form = useForm<TGigSchema>({
        resolver: zodResolver(GigSchema),
    });
    const {
        formState: { isDirty, isSubmitting },
    } = form;

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
                            <FormField
                                control={form.control}
                                name="duration"
                                render={({ field }) => (
                                    <FormItem className='w-full'>
                                        <FormLabel className='text-lg font-semibold'>Title</FormLabel>
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
                                    <FormItem>
                                        <FormLabel>Industry</FormLabel>
                                        <Select onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select an industry relating to the gig" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                <SelectItem value="m@support.com">m@support.com</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormDescription>
                                            You can manage email addresses in your{" "}
                                            <Link href="/examples/forms">email settings</Link>.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                            <Button type='submit' disabled={!isDirty || isSubmitting}>
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