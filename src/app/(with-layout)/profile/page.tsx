import * as React from "react"
import {auth} from "@/lib/auth";
import qs from "qs";

export default async function Profile() {
    const session = await auth()

    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me?populate=*`, {
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

    const additional_data: Record<'key' | 'value', string>[] = []

    if (data.role.name === 'Student') {
        const _data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students?${qs.stringify({
            populate: '*',
            filters: {
                users_permissions_user: {
                    id: {
                        '$eq': data.id
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
        additional_data.push({
            key: "Группа",
            value: _data.data[0]?.group.group_name
        })
    }

    if (data.role.name === 'Partner') {
        const _data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/partners?${qs.stringify({
            populate: '*',
            filters: {
                users_permissions_user: {
                    id: {
                        '$eq': data.id
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

        additional_data.push({
            key: "Название компании",
            value: _data.data[0].company_name
        })
    }

    if (data.role.name === 'Rop') {
        const _data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rops?${qs.stringify({
            populate: '*',
            filters: {
                users_permissions_user: {
                    id: {
                        '$eq': data.id
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

        additional_data.push({
            key: "Направление",
            value: _data.data[0].direction.direction_name
        })
    }


    return (
        <div>
            <p>ФИО: {data.username}</p>
            <p>Почта: {data.email}</p>
            <p>Роль аккаунта: {data.role.description}</p>
            {additional_data.map(i => (<p key={i.key}>{i.key}: {i.value}</p>))}
        </div>
    )
}