'use server'

import {auth} from "@/lib/auth";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import qs from "qs";
import {addDays} from "date-fns";

const work_types: Record<string, string> = {
    'practice': 'практика',
    'internship': 'стажировка'
}

export default async function NewApplicationAction(formData: FormData) {
    const {
        description,
        requirements,
        students_count,
        dates,
        direction,
        results,
        work_type,
        paid_internship,
    } = Object.fromEntries(formData)

    const session = await auth()

    const partnerData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/partners?${qs.stringify({
        populate: '*',
        filters: {
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
            "Authorization": `Bearer ${session?.user.token}`
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

    const date_from = new Date(JSON.parse(dates as string)?.from)
    const date_to = new Date(JSON.parse(dates as string)?.to)

    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/applications`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({
            data: {
                application_type: work_types[work_type as string],
                task_description: description,
                requirements: requirements,
                number_of_students: students_count,
                start_date: dates ? addDays(date_from, 1).toISOString() : undefined,
                end_date: dates ? addDays(date_to, 1).toISOString() : undefined,
                paid_internship: paid_internship === 'on',
                results: results || undefined,
                partner: partnerData?.data[0]?.id,
                direction: (direction as string).split('-')[0],
                status: statusesData.data[0]?.id
            }
        })
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })

    revalidatePath(`${process.env.BASE_URL}/application/${data.data.id}`)
    redirect(`${process.env.BASE_URL}/application/${data.data.id}`)
}