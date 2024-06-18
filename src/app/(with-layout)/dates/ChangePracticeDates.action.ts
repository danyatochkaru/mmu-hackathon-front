'use server'

import {auth} from "@/lib/auth";
import qs from "qs";
import {ROUTES} from "@/constants/routes";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {addDays} from "date-fns";

export default async function ChangePracticeDatesAction(formData: FormData) {
    const session = await auth()
    const {dates} = Object.fromEntries(formData)

    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rops?${qs.stringify({
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

    const date_from = new Date(JSON.parse(dates as string)?.from)
    const date_to = new Date(JSON.parse(dates as string)?.to)

    await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/directions/${data.data[0].direction.id}`, {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
        },
        body: JSON.stringify({
            data: {
                practice_start: addDays(date_from, 1).toISOString(),
                practice_end: addDays(date_to, 1).toISOString()
            }
        })
    })

    const route = `${process.env.BASE_URL}${ROUTES.dates}?successMessage=${encodeURIComponent('Даты изменены.')}`
    revalidatePath(route)
    redirect(route)
}