'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import { API_BASE_URL } from '@/lib/constants';
import { Router, useRouter } from 'next/router';


const USER_TYPES = ["client", "company"] as const;

const formSchema = z.object({
    email: z.string({
        description: 'Email of user',
        required_error: 'Please enter a valid email address'
    }).email(),
    user_type: z.enum(USER_TYPES, {
        errorMap: (issue, ctx) => ({ message: 'Please select a user type' })
    }),
    password: z.string({
        description: 'Password of user',
        required_error: 'Please enter a password',
    }).min(8),
    confirm_password: z.string({
        description: 'Confirm password of user',
        required_error: 'Please confirm your password',
    }).min(8),
});

const NewUserForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    const {
        formState: { isDirty, isSubmitting },
    } = form;

    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (data) => {
        try {
            if (data.password.toLowerCase() !== data.confirm_password.toLowerCase()) {
                return toast.error('Passwords do not match');
            }

            const { password, user_type, email } = data;
            console.log(data)
            //   Do something with the form data.
            const res = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, user_type }),
            });
            const newUserRes = await res.json() as {
                user: {
                    id: string,
                    email: string,
                    user_type: string,
                },
                message: string,
            };
            console.log(newUserRes);
            if (res.status !== 201) {
                return toast.error(newUserRes.message);
            }
            if (res.status === 201) {
                console.log(data)
                toast.success('Account created successfully');
                const loginRes = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({ email, password, id: newUserRes.user.id }),
                });
                form.reset();
                const { user } = await loginRes.json() as {
                    user: {
                        id: string,
                        email: string,
                        user_type: string,
                    },
                    message: string,
                };
                if (loginRes.status === 201) {
                    router.push(`/${user.id}/create-profile`);
                    return;
                } else {
                    return router.push(`/login`)
                }
            } else {
                toast.error('An error occurred. Please try again.')
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='w-full'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>Email</FormLabel>
                                <FormControl>
                                    <Input type='email' placeholder="example@eg.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            placeholder="Enter password"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirm_password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>Confirm Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            placeholder="Confirm password"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="user_type"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className='text-lg font-semibold'>User Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select user type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {USER_TYPES.map(item => (
                                            <SelectItem className='capitalize' key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" disabled={!isDirty || isSubmitting} className='w-full disabled:cursor-not-allowed disabled:bg-opacity-70'>{isSubmitting ? 'Submitting' : 'Register'}</Button>
                </form>
            </Form>
        </div>
    )
}

export default NewUserForm