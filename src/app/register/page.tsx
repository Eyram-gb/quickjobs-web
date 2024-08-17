import React from 'react'
import NewUserForm from '@/components/forms/NewUserForm'
import MainLayout from '@/components/layout/MainLayout'

const Register = () => {
    return (
        <MainLayout>
            <h1 className='text-2xl font-semibold text-center my-4'>Sign Up</h1>
            <div className='flex justify-center max-w-xl mx-auto p-8 border rounded-md'>
                <NewUserForm/>
            </div>
        </MainLayout>
    )
}

export default Register