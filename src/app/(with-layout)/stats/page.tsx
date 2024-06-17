import * as React from "react"
import {auth} from "@/lib/auth";
import qs from "qs";

export default async function Stats() {
    const session = await auth()

    const queryData = qs.stringify({
        pagination: {limit: 1}
    })

    const studentsData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students?${queryData}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })

    const applicationsData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/applications?${queryData}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })

    return (
        <div>
            <p>Количество студентов: {studentsData.meta.pagination.total}</p>
            <p>Количество заявок: {applicationsData.meta.pagination.total}</p>
        </div>
    )
}