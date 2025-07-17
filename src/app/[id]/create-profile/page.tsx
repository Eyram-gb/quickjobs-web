import NewClientForm from '@/components/forms/NewClientForm';
import NewCompanyForm from '@/components/forms/NewCompanyForm';
import { API_BASE_URL } from '@/lib/constants';
import { User } from '@/lib/store/authStore';
import React from 'react'
import { cookies } from 'next/headers'

const CreateProfile = async ({
    params: { id },
    // children,
}: {
    // children: React.ReactNode;
    params: { id: string };
}) => {
    const getUser = async (userId: string) => {
        try {
            console.log('-------ENTERED-----')
            const res = await fetch(
                `/api/getUser/${userId}`,
                {
                    // cache: 'no-store',
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            const data = await res.json() as User;
            console.log(data);

            return !data ? null : data;

        } catch (error) {
            return console.error('--SERVER ERROR')
        }
    };
    const user = await getUser(id)
console.log('user:', user);
console.log('user_type:', user?.user_type);

    return (
        <div className='flex justify-center max-w-xl mx-auto p-8 border rounded-md mt-12'>
            {!user
                ? <div>User not found</div>
                : user.user_type?.toLowerCase() === 'client'
                    ? <NewClientForm user_id={id} email={user.email} />
                    : <NewCompanyForm user_id={id} email={user.email} />
            }
        </div>
    )
}

export default CreateProfile