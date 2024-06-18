'use server'

import {auth} from "@/lib/auth";
import qs from "qs";
import {ROUTES} from "@/constants/routes";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export default async function ResponseApplicationAction(formData: FormData) {
    const session = await auth()
    const {application_id} = Object.fromEntries(formData)

    const studentData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students?${qs.stringify({
        populate: '*',
        filters: {
            users_permissions_user: {
                id: {
                    '$eq': session?.user?.id
                }
            }
        }
    })}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user.token}`
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/responses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({
            data: {
                student: studentData.data[0].id,
                application: application_id
            }
        })
    })

    const route = ROUTES.application + `/${application_id}?successMessage=${encodeURIComponent('Отклик создан!')}`
    revalidatePath(route)
    redirect(route)
}