'use client'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { useAuthStore } from '@/lib/store/authStore';
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const LoginSchema = z.object({
  email: z.string({
    required_error: 'email is required'
  }).email(),
  password: z.string({
    required_error: 'password is required'
  }).min(8, {
    message: 'Password must be at least 8 characters long'
  })
})
type TLogin = z.infer<typeof LoginSchema>
const Login = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { isAuthenticated, login, user } = useAuthStore();
  const form = useForm<TLogin>();

  const { formState: { isDirty, isSubmitting }, handleSubmit } = form;

  const onSubmit: SubmitHandler<TLogin> = async (data) => {
    const { email, password } = data;
    try {
      const loginRes = await fetch(`/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      })
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
        login(user)
        return router.push(`/${user.id}/${user.user_type==='client'? 'client-profile': ''}`);
        // return toast.success('login successful');
      } else {
        return toast.error('login failed');
        // return router.push(`/login`)
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='flex flex-col h-screen justify-center items-center '>
      <Form {...form}>
        <Card className='p-5 h-fit w-fit'>
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} className='w-80 max-w-sm space-y-3'>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className=''>
                  <FormLabel className='text-lg font-semibold'>Email</FormLabel>
                  <FormControl>
                    <Input type='email' placeholder="example@john.com" {...field} />
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
            <Button type="submit" disabled={isSubmitting || !isDirty} className='w-full'>Login</Button>
          </form>
          <p className='text-xs pt-1.5'>Don&apos;t have an account? <a href="/register" className='text-sky-500 hover:underline'>Sign up</a></p>
        </Card>
      </Form>
    </div>
  )
}

export default Login