import NewClientForm from '@/components/forms/NewClientForm';
import NewCompanyForm from '@/components/forms/NewCompanyForm';
import { API_BASE_URL } from '@/lib/constants';
import { User } from '@/lib/store/authStore';
import React from 'react'
import { cookies } from 'next/headers'

const CreateProfile = async ({
    params: { id },
    children,
}: {
    children: React.ReactNode;
    params: { id: string };
}) => {
    const authToken = cookies();
    const getUser = async (userId: string) => {
        try {
            // console.log('-------ENTERED-----')
            const res = await fetch(
                `http://localhost:3000/api/getUser/${userId}`,
                {
                    // cache: 'no-store',
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                }
            );
            console.log("-----------RESPONSE------------", res)
            const data = await res.json() as User;
            console.log(data);

            return !data ? null : data;

        } catch (error) {
            return;
        }
    };
    const user = await getUser(id)
    console.log(user);
    console.log('---------TOKEN--------', authToken)
    const cookieStore = cookies()
    console.log('---------+++++++++',cookieStore)

    return (
        <div className='flex justify-center max-w-xl mx-auto p-8 border rounded-md mt-12'>
            {
                user?.user_type === 'client' ?
                    <NewClientForm user_id={id} email={user.email} /> : <NewCompanyForm />
            }
        </div>
    )
}

export default CreateProfile