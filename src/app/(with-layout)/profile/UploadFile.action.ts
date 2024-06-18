'use server'

import {auth} from "@/lib/auth";
import {ROUTES} from "@/constants/routes";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export default async function UploadFileAction(formData: FormData) {
    const session = await auth()

    const preparedData = new FormData()

    preparedData.append('files', formData.get('file')!)

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/upload`, {
        method: "POST",
        body: preparedData,
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${session?.user.token}`
        },
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })


    const route = ROUTES.profile + `?successMessage=${encodeURIComponent('CV файл загружен.')}`
    revalidatePath(route)
    redirect(route)
}