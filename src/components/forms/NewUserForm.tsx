'use client';

import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import toast from 'react-hot-toast';


const USER_TYPES = ["client", "company"] as const;

const formSchema = z.object({
    email: z.string({
        description:'Email of user',
        required_error: 'Please enter a valid email address'
    }).email(),
    user_type: z.enum(USER_TYPES),
    password: z.string({
        description:'Password of user',
        required_error: 'Please enter a password',
    }).min(8),
    confirm_password: z.string({
        description:'Confirm password of user',
        required_error: 'Please confirm your password',
    }).min(8),
});

const NewUserForm = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    // function onSubmit(values: z.infer<typeof formSchema>) {
    //     // if(values.password.toLowerCase() !== values.confirm_password.toLowerCase()) {
    //     //     return toast.error('Passwords do not match');
    //     // }
    //     // Do something with the form values.
    //     console.log(values)
    // }
    const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async(data) =>{
     if(data.password.toLowerCase() !== data.confirm_password.toLowerCase()) {
              return toast.error('Passwords do not match');
          }
        //   Do something with the form data.
         console.log(data)
    }
    return (
        <div className='w-full'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>email</FormLabel>
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
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Enter password" {...field} />
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
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input type='password' placeholder="Confirm password" {...field} />
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
                                <FormLabel>User Type</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select user type" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {USER_TYPES.map(item => (
                                            <SelectItem  key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className='w-full'>Register</Button>
                </form>
            </Form>
        </div>
    )
}

export default NewUserForm