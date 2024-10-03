import React from 'react'
import NewUserForm from '@/components/forms/NewUserForm'
import MainLayout from '@/components/layout/MainLayout'
import { cookies } from 'next/headers'

const Register = () => {
    return (
        <>
            <h1 className='text-2xl font-semibold text-center my-4'>Sign Up</h1>
            <div className='flex justify-center max-w-xl mx-auto p-8 border rounded-md'>
                <NewUserForm />
            </div>
        </>
    )
}

export default Register