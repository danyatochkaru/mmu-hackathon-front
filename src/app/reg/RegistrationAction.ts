'use server'

import {signIn} from "@/lib/auth";
import {revalidatePath} from "next/cache";
import {ROUTES} from "@/constants/routes";
import {redirect} from "next/navigation";

export async function registrationAction(formData: FormData) {
    // TODO: request to server

    /*const url = new URL(process.env.BASE_URL!)
    const res = await fetch(url.href)*/

    // if (res.ok) {}

    await signIn('credentials', formData)
        .catch(err => console.error(err))

    revalidatePath(ROUTES.home)
    redirect(ROUTES.home)
}