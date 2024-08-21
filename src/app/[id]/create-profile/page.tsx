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
    const authToken = cookies().get('qjsessionid');
    const getUser = async (userId: string) => {
        const res = await fetch(
            `${API_BASE_URL}/users/${userId}`,
            {
                cache: 'no-store',
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
    };
    const user = await getUser(id)
    console.log(user);
    console.log('---------TOKEN--------', authToken)
    // const cookieStore = cookies()

    return (
        <div>
            users: {id}
        </div>
    )
}

export default CreateProfile