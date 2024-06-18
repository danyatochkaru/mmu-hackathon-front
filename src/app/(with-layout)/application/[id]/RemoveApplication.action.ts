'use server'

import {auth} from "@/lib/auth";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export default async function RemoveApplicationAction(formData: FormData) {
    const {application_id} = Object.fromEntries(formData)
    const session = await auth()

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/applications/${application_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user.token}`
        }
    })
        .catch(err => {
            console.error(err)
        })


    const route = `${process.env.BASE_URL}?successMessage=${encodeURIComponent('Заявка удалена')}`
    revalidatePath(route)
    redirect(route)
}