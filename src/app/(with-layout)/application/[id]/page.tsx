import {auth} from "@/lib/auth";
import qs from "qs";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";
import ChangeStatusWindow from "@/app/(with-layout)/application/[id]/ChangeStatusWindow";
import Link from "next/link";
import {ROUTES} from "@/constants/routes";
import RemoveApplicationAction from "@/app/(with-layout)/application/[id]/RemoveApplication.action";
import CopyApplicationAction from "@/app/(with-layout)/application/[id]/CopyApplication.action";
import ResponseApplicationAction from "@/app/(with-layout)/application/[id]/ResponseApplication.action";

export default async function ApplicationPage({params}: { params: { id: string } }) {
    const session = await auth()

    const str = qs.stringify({
        populate: [
            'partner',
            'status',
            'direction',
            'responses.cv_file',
            'responses.response_status',
            'responses.student',
            'responses.student.cv_file',
            'responses.student.group',
            'responses.student.group.direction',
            'responses.student.users_permissions_user'
        ]
    })
    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/applications/${params.id}?${str}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
        },
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })

    const statusesData = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/statuses`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
        },
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })

    if (!data.data) {
        return <div className="p-3 flex flex-col gap-y-4">
            <h2 className="font-semibold text-2xl">Заявка не найдена</h2>
        </div>
    }

    if (session?.user.type === 'Студент' && (data.data.status.status_name === 'Отозвано'
        || data.data.status.status_name === 'Заблокировано'
        || data.data.status.status_name === 'Закрыто')) {
        return <p>Набор на данную практику закончился</p>
    }

    return <div className="p-3 flex flex-col gap-y-4">
        <div className={'flex items-center gap-x-2'}>
            <h2 className="font-semibold text-2xl">{data.data.partner.company_name}</h2>
            <div><Badge className={'capitalize'}>{data.data.application_type}</Badge></div>
            {data.data.paid_internship &&
                <div><Badge>Оплачивается</Badge></div>}
            <div><Badge>{data.data.status.status_name}</Badge></div>
        </div>
        {
            session?.user.type === 'Студент'
                ? (
                    (data.data.status.status_name === 'Отозвано'
                        || data.data.status.status_name === 'Заблокировано'
                        || data.data.status.status_name === 'Закрыто')
                        ? <p>Набор на данную практику закончился</p>
                        : <form action={ResponseApplicationAction}>
                            <input type={'hidden'} name={'application_id'} value={params.id}/>
                            {data.data.responses.length > 0
                            && data.data.responses.some((i: any) => String(i.student.users_permissions_user.id) == String(session?.user.id))
                                ? <p>Вы оставили отклик</p>
                                : <Button size={'sm'} className="text-sm w-fit">Откликнуться</Button>
                            }
                        </form>
                )
                : <div className={"flex gap-x-2"}>
                    {
                        (session?.user.type === 'Руководитель отделения практики' || session?.user.type === 'Администратор') &&
                        <ChangeStatusWindow
                            currentStatusId={data.data.status.id}
                            statuses={statusesData.data.map((i: any) => ({id: i.id, name: i.status_name}))}>
                            <Button size={'sm'}>Сменить статус</Button>
                        </ChangeStatusWindow>
                    }
                    {
                        (session?.user.type === 'Партнёр' || session?.user.type === 'Администратор') &&
                        (<form action={CopyApplicationAction}>
                            <input type={'hidden'} name={'application_id'} value={params.id}/>
                            <Button size={'sm'} className="text-sm w-fit">Скопировать</Button>
                        </form>)
                    }
                    <Link href={`${ROUTES.application}/${params.id}/edit`}>
                        <Button size={'sm'}
                                className="text-sm w-fit">Изменить</Button>
                    </Link>
                    <form action={RemoveApplicationAction}>
                        <input type={'hidden'} name={'application_id'} value={params.id}/>
                        <Button type={'submit'} size={'sm'} className="text-sm w-fit">Удалить</Button>
                    </form>
                </div>

        }
        <div>
            <p className="text-muted-foreground text-sm">Направление</p>
            <p className="font-medium leading-none text-md">{data.data.direction.direction_name}</p>
        </div>
        <div>
            <p className="text-muted-foreground text-sm">Количество студентов</p>
            <p className="font-medium leading-none text-md">{data.data.number_of_students}</p>
        </div>
        <div>
            <p className="text-muted-foreground text-sm">Описание задачи</p>
            <p className="font-medium leading-none text-md">{data.data.task_description}</p>
        </div>
        <div>
            <p className="text-muted-foreground text-sm">Требования к студентам</p>
            <p className="font-medium leading-none text-md">{data.data.requirements}</p>
        </div>
        {data.data.results && <div>
            <p className="text-muted-foreground text-sm">Результаты</p>
            <p className="font-medium leading-none text-md">{data.data.results}</p>
        </div>}
        {data.data.start_date && <div>
            <p className="text-muted-foreground text-sm">Сроки</p>
            <p className="font-medium leading-none text-md">{`с ${
                new Date(data.data.start_date).toLocaleDateString('ru', {
                    timeZone: 'Europe/Moscow'
                })
            } по ${
                new Date(data.data.end_date).toLocaleDateString('ru', {
                    timeZone: 'Europe/Moscow'
                })
            }`}</p>
        </div>}
        {session?.user.type !== 'Студент'
            && (data.data.responses.length > 0
                    ? <Table>
                        <TableHeader className="bg-[#ffd600]">
                            <TableRow>
                                <TableHead className="w-80 text-black">ФИО студента</TableHead>
                                <TableHead className="text-black">Группа</TableHead>
                                <TableHead className="text-black">Направление</TableHead>
                                <TableHead className="text-black">CV</TableHead>
                                <TableHead className="text-right w-48 text-black">Дата подачи отклика</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.data.responses.map((i: any) => (
                                <TableRow key={i.id}>
                                    <TableCell
                                        className="font-medium">{i.student.users_permissions_user.username}</TableCell>
                                    <TableCell>{i.student.group.group_name}</TableCell>
                                    <TableCell>{i.student.group.direction.direction_name}</TableCell>
                                    <TableCell>{i.student?.cv_file
                                        ? <Link
                                            className={'text-primary underline'}
                                            href={`${ROUTES.previewfile}?uri=${decodeURIComponent(process.env.NEXT_PUBLIC_STRAPI_URL + i.student?.cv_file.url)}`}>Открыть</Link>
                                        : <p>Отсутствует</p>
                                    }</TableCell>
                                    <TableCell
                                        className="text-right w-48">
                                        {new Date(i.createdAt as string).toLocaleString('ru', {
                                            timeZone: 'Europe/Moscow',
                                            day: 'numeric',
                                            month: 'numeric',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    : <p className="leading-7 [&:not(:first-child)]:mt-6">Пока ещё никто не оставил отклик</p>
            )}
    </div>;
}