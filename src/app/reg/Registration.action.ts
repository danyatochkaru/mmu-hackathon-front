'use server'

import {revalidatePath} from "next/cache";
import {ROUTES} from "@/constants/routes";
import {redirect} from "next/navigation";
import {ERROR_NAMES} from "@/constants/error-messages";
import {signIn} from "@/lib/auth";

export async function
registrationAction(formData: FormData) {
    const {
        full_name,
        email,
        password,
        account_type,
        student_group,
        company_name,
        phone_number,
        rop_direction,
        position
    } = Object.fromEntries(formData) as Record<string, string>

    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/auth/local/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: full_name,
            email,
            password
        })
    })
        .then(res => res.json())

    if (data.error) {
        console.log(data.error)
        let err_mes = ERROR_NAMES.UNKNOWN_ERROR

        if (data.error.message === 'Email or Username are already taken') {
            err_mes = ERROR_NAMES.ALREADY_EXISTS
        }

        const route = ROUTES.registration + `?errorMessage=${err_mes}`
        revalidatePath(route)
        redirect(route)
    }

    const roles = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users-permissions/roles`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.jwt}`
        },
    })
        .then(res => res.json())
        .catch(err => console.error(err))

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/users/${data.user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.jwt}`
        },
        body: JSON.stringify({
            role: roles.roles.find((i: any) => i.type === account_type).id
        })
    })
        .then(res => res.json())
        .catch(err => console.error(err))

    if (account_type === 'student') {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.jwt}`
            },
            body: JSON.stringify({
                data: {
                    group: student_group,
                    users_permissions_user: data.user.id
                }
            })
        })
            .then(res => res.json())
            .catch(err => console.error(err))
    }

    if (account_type === 'partner') {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/partners`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.jwt}`
            },
            body: JSON.stringify({
                data: {
                    company_name: company_name,
                    position: position,
                    phone_number: phone_number,
                    users_permissions_user: data.user.id
                }
            })
        })
            .then(res => res.json())
            .catch(err => console.error(err))
    }

    if (account_type === 'rop') {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL!}/rops`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${data.jwt}`
            },
            body: JSON.stringify({
                data: {
                    direction: rop_direction,
                    users_permissions_user: data.user.id
                }
            })
        })
            .then(res => res.json())
            .catch(err => console.error(err))
    }

    await signIn('credentials', {
        email,
        password,
        redirect: false,
    })
        .catch(err => console.error(err))

    revalidatePath(ROUTES.home)
    redirect(ROUTES.home)
}