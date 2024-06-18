'use server'

import {auth} from "@/lib/auth";
import {ROUTES} from "@/constants/routes";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import qs from "qs";

export default async function UploadFileAction(formData: FormData) {
    const session = await auth()

    const preparedData = new FormData()

    preparedData.append('files', formData.get('file')!)

    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/upload`, {
        method: "POST",
        body: preparedData,
        headers: {
            Authorization: `Bearer ${session?.user.token}`
        },
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })

    const studentData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students?${qs.stringify({
        populate: '*',
        filter: {
            users_permissions_user: {
                id: {
                    '$eq': session?.user.id
                }
            }
        }
    })}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students/${studentData.data[0].id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({
            data: {
                cv_file: data[0].id
            }
        })
    })

    const route = ROUTES.profile + `?successMessage=${encodeURIComponent('CV файл загружен.')}`
    revalidatePath(route)
    redirect(route)
}