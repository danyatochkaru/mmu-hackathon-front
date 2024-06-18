'use server'

import {auth} from "@/lib/auth";
import {revalidatePath} from "next/cache";
import {ROUTES} from "@/constants/routes";
import {redirect} from "next/navigation";

export default async function ChangeStatusAction(formData: FormData) {
    const session = await auth()
    const {application_id, application_status} = Object.fromEntries(formData)

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/applications/${application_id}`, {
        method: "PUT",
        body: JSON.stringify({
            data: {
                status: application_status
            }
        }),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
        },
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })

    const route = ROUTES.application + `/${application_id}?successMessage=${encodeURIComponent('Статус изменен')}`
    revalidatePath(route)
    redirect(route)
}