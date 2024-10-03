'use client';

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { API_BASE_URL } from '@/lib/constants';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/store/authStore';
import { GigSchema, TGigSchema } from '@/lib/schemas';
import { Pencil, X, Check } from 'lucide-react'; // Import Check icon

const NewGigForm = ({ industries }: {
    industries: {
        id: number;
        name: string
    }[]
}) => {
    const [open, setOpen] = React.useState(false)
    const [requirements, setRequirements] = React.useState<string[]>([]);
    const [newRequirement, setNewRequirement] = React.useState<string>(''); // State for new requirement input
    const [editIndex, setEditIndex] = React.useState<number | null>(null); // Track the index of the requirement being edited

    const addRequirement = () => {
        if (newRequirement.trim() !== '') { // Check if the input is not empty
            setRequirements([...requirements, newRequirement]); // Add the new requirement
            setNewRequirement(''); // Clear the input field
        }
    };

    const handleRequirementChange = (index: number, value: string) => {
        const newRequirements = [...requirements];
        newRequirements[index] = value;
        setRequirements(newRequirements);
    };

    const deleteRequirement = (index: number) => {
        const newRequirements = requirements.filter((_, i) => i !== index);
        setRequirements(newRequirements);
        if (editIndex === index) {
            setEditIndex(null); // Reset edit index if the edited requirement is deleted
        }
    };

    const startEditing = (index: number) => {
        setEditIndex(index); // Set the index of the requirement to edit
    };

    const handleEditChange = (value: string) => {
        if (editIndex !== null) {
            handleRequirementChange(editIndex, value); // Update the requirement being edited
        }
    };

    const saveEdit = () => {
        setEditIndex(null); // Exit edit mode
    };

    const form = useForm<TGigSchema>({
        resolver: zodResolver(GigSchema),
    });
    const {
        formState: { isDirty, isSubmitting }, control
    } = form;

    const { employer_profile, user } = useAuthStore();

    const onSubmit: SubmitHandler<TGigSchema> = async (data) => {
        try {
            const industry_id = Number(data.industry_id);
            const gigInfo = {
                ...data,
                requirements,
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
                setOpen(false)
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
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button type='button'>
                        Post a gig
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px] max-h-screen customScroll overflow-y-auto">
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
                                                    className="flex gap-x-4 pt-2"
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
                            <div className='grid grid-cols-3 gap-4'>
                                <FormField
                                    control={form.control}
                                    name="experience"
                                    render={({ field }) => (
                                        <FormItem className='col-span-1'>
                                            <FormLabel className='text-lg font-semibold'>Experience</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select experience level you are expecting" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='entry level'>
                                                        Entry level
                                                    </SelectItem>
                                                    <SelectItem value='intermediate'>
                                                        Intermediate
                                                    </SelectItem>
                                                    <SelectItem value='expert'>
                                                        Expert
                                                    </SelectItem>
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
                                <FormField
                                    control={form.control}
                                    name="schedule"
                                    render={({ field }) => (
                                        <FormItem className='col-span-1'>
                                            <FormLabel className='text-lg font-semibold'>Schedule</FormLabel>
                                            <Select onValueChange={field.onChange}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Part time or Full time" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value='part-time'>
                                                        Part Time
                                                    </SelectItem>
                                                    <SelectItem value='full-time'>
                                                        Full Time
                                                    </SelectItem>
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
                                <FormField
                                    control={form.control}
                                    name="remote"
                                    render={({ field }) => (
                                        <FormItem className="col-span-1">
                                            <FormLabel className='text-lg font-semibold pb-5'>Remote</FormLabel>
                                            <FormControl>
                                                <RadioGroup
                                                    onValueChange={field.onChange}
                                                    // defaultValue={field.value}
                                                    className="flex gap-x-4 pt-2"
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
                            <div>
                                <FormField
                                    control={form.control}
                                    name="requirements"
                                    render={({ field }) => (
                                        <FormItem className='w-full'>
                                            <FormLabel className='text-lg font-semibold'>Requirements</FormLabel>
                                            <FormControl>
                                                <Textarea
                                                    placeholder="Gig description"
                                                    {...field}
                                                    className='resize-none'
                                                    value={newRequirement}
                                                    onChange={(e) => setNewRequirement(e.target.value)}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type='button' onClick={addRequirement} className='mt-2'>
                                    Add Requirement
                                </Button>
                                <div className='my-4'>
                                    <ul className='w-full space-y-3'>
                                        {requirements.map((req, index) => (
                                            <li key={index} className='relative text-xs w-full'>
                                                <Input
                                                    value={req}
                                                    onChange={(e) => handleEditChange(e.target.value)}
                                                    className='w-full'
                                                    disabled={editIndex !== index}
                                                    onBlur={saveEdit} // Stop editing on blur
                                                />
                                                <div className='absolute top-3 right-3 flex gap-x-2 bg-white'>
                                                    {editIndex === index ? (
                                                        <Check size={16} className='cursor-pointer text-green-600' onClick={saveEdit} />
                                                    ) : (
                                                        <Pencil size={15} className='cursor-pointer' onClick={() => startEditing(index)} />
                                                    )}
                                                    <X size={16} className='text-rose-500 cursor-pointer' onClick={() => deleteRequirement(index)} />
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                </div>
                            </div>
                            <Button type='submit' disabled={!isDirty || isSubmitting} className='w-full mt-8'>
                                Create Gig
                            </Button>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default NewGigForm