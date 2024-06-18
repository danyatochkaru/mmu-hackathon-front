'use server'

import {auth} from "@/lib/auth";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import qs from "qs";

export default async function CopyApplicationAction(formData: FormData) {
    const {application_id} = Object.fromEntries(formData)
    const session = await auth()

    const appData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/applications/${application_id}?populate=*`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })

    const statusesData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/statuses?${qs.stringify({
        filters: {
            status_name: {
                '$eq': 'Новая'
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

    const newAppData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/applications`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({
            data: {
                application_type: appData.data.application_type,
                task_description: appData.data.task_description,
                requirements: appData.data.requirements,
                number_of_students: appData.data.number_of_students,
                start_date: appData.data.start_date,
                end_date: appData.data.end_date,
                paid_internship: appData.data.paid_internship,
                results: appData.data.results,
                status: statusesData.data[0]?.id,
                direction: appData.data.direction.id,
                partner: appData.data.partner.id,
            }
        })
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })

    console.log(newAppData)

    const route = `${process.env.BASE_URL}/application/${newAppData.data?.id}?successMessage=${encodeURIComponent('Заявка скопирована.')}`
    revalidatePath(route)
    redirect(route)
}