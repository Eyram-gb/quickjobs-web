import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff } from 'lucide-react'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'

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
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<TLogin>();

  const { formState: { isDirty, isSubmitting }, handleSubmit } = form;

  const onSubmit: SubmitHandler<TLogin> = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='flex '>
      <h1>Login</h1>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className='w-80 max-w-sm'>
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
          <button type="submit">Login</button>
        </form>
      </Form>
      <p>Don&apos;t have an account? <a href="/register">Sign up</a></p>
    </div>
  )
}

export default Login