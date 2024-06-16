'use server'

import {signIn} from "@/lib/auth";
import {revalidatePath} from "next/cache";
import {ROUTES} from "@/constants/routes";
import {redirect} from "next/navigation";
import {ERROR_NAMES} from "@/constants/error-messages";

export async function registrationAction(formData: FormData) {
    // TODO: request to server

    const {full_name, email, password} = Object.fromEntries(formData)

    const res = await fetch(`${process.env.BASE_URL!}/auth/local/register`, {
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

    const data = await res.json().then(data => {
        console.error(JSON.stringify(data))
        return data
    })

    if (data.error) {
        const route = ROUTES.registration + `?errorMessage=${ERROR_NAMES.UNKNOWN_ERROR}`
        revalidatePath(route)
        redirect(route)
    }

    if (!res.ok) {
        const route = ROUTES.registration + `?errorMessage=${ERROR_NAMES.UNKNOWN_ERROR}`
        revalidatePath(route)
        redirect(route)
    }

    await signIn('credentials', {
        email,
        password
    })
        .catch(err => console.error(err))

    revalidatePath(ROUTES.home)
    redirect(ROUTES.home)
}