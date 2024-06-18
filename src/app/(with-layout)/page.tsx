import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
import Link from "next/link";
import {ROUTES} from "@/constants/routes";
import {auth} from "@/lib/auth";
import qs from "qs"

export default async function Home() {
    const session = await auth()

    const queryString = qs.stringify(Object.assign(
        {
            populate: '*',
            sort: ['createdAt:desc']
        },
        session?.user.type === 'Студент'
            ? {
                filters: {
                    direction: {
                        '$eqi': (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/students?${qs.stringify({
                            populate: 'group.direction',
                            filters: {
                                users_permissions_user: {
                                    id: {
                                        '$eq': session?.user.id
                                    }
                                }
                            }
                        })}`, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${session?.user.token}`
                            }
                        })
                            .then(res => res.json())).data[0].group.direction.id
                    },
                    status: {
                        status_name: {
                            '$eqi': 'открыто'
                        }
                    }
                }
            }
            : undefined,
        session?.user.type === 'Партнёр'
            ? {
                filters: {
                    partner: {
                        id: {
                            '$eqi': (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/partners?${qs.stringify({
                                populate: 'group.direction',
                                filters: {
                                    users_permissions_user: {
                                        id: {
                                            '$eq': session?.user.id
                                        }
                                    }
                                }
                            })}`, {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${session?.user.token}`
                                }
                            })
                                .then(res => res.json())).data[0].id
                        }
                    },
                }
            }
            : undefined,
        session?.user.type === 'Руководитель отделения практики'
            ? {
                filters: {
                    direction: {
                        id: {
                            '$eqi': (await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rops?${qs.stringify({
                                populate: 'direction',
                                filters: {
                                    users_permissions_user: {
                                        id: {
                                            '$eq': session?.user.id
                                        }
                                    }
                                }
                            })}`, {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${session?.user.token}`
                                }
                            })
                                .then(res => res.json())).data[0].id
                        }
                    },
                }
            }
            : undefined
    ))

    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/applications?${queryString}`, {
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
            <p>Всего заявок: {data.meta.pagination.total}</p>
            <Table>
                <TableHeader className="bg-[#ffd600]">
                    <TableRow>
                        <TableHead className="w-80 text-black">Название компании</TableHead>
                        <TableHead className="text-black">Описание</TableHead>
                        <TableHead className="text-black w-48">Тип</TableHead>
                        <TableHead className="text-black w-48">Статус</TableHead>
                        <TableHead className="text-right w-48 text-black">Дата создания</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        data.data?.map((app: any) => {
                            const link = `${ROUTES.application}/${app.id}`
                            return <TableRow key={app.company_name}>
                                <TableCell className="font-medium">
                                    <Link href={link}>
                                        <p className={'font-semibold'}>{app.partner?.company_name}</p>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link href={link}>
                                        <p className={'line-clamp-1'}>{app.task_description}</p>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link href={link}>
                                        <p>{app.application_type}</p>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Link href={link}>
                                        <p>{app.status?.status_name}</p>
                                    </Link>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Link href={link}>
                                        <p>{new Date(app.createdAt).toLocaleString('ru', {
                                            timeZone: 'Europe/Moscow',
                                            day: 'numeric',
                                            month: 'numeric',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}</p>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        })
                    }
                </TableBody>
            </Table>
        </div>
    );
}
