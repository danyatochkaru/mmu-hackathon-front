import {auth} from "@/lib/auth";
import qs from "qs";
import {Button} from "@/components/ui/button";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Badge} from "@/components/ui/badge";

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

    console.log(data.data.responses[0])

    return <div className="p-3 flex flex-col gap-y-4">
        <div className={'flex items-center gap-x-2'}>
            <h2 className="font-semibold text-2xl">{data.data.partner.company_name}</h2>
            <div><Badge>{data.data.status.status_name}</Badge></div>
        </div>
        {
            session?.user.type === 'Студент'
                ? <Button size={'sm'} className="text-sm w-fit">Откликнуться</Button>
                : <div className={"flex gap-x-2"}>
                    <Button size={'sm'} className="text-sm w-fit">Изменить</Button>
                    <Button size={'sm'} className="text-sm w-fit">Удалить</Button>
                </div>
        }
        <div>
            <p className="text-muted-foreground text-sm">Описание задачи</p>
            <p className="font-medium leading-none text-md">{data.data.task_description}</p>
        </div>
        <div>
            <p className="text-muted-foreground text-sm">Требования к студентам</p>
            <p className="font-medium leading-none text-md">{data.data.requirements}</p>
        </div>
        <div>
            <p className="text-muted-foreground text-sm">Направление</p>
            <p className="font-medium leading-none text-md">{data.data.direction.direction_name}</p>
        </div>
        <div>
            <p className="text-muted-foreground text-sm">Количество студентов</p>
            <p className="font-medium leading-none text-md">{data.data.number_of_students}</p>
        </div>
        {data.data.start_date && <div>
            <p className="text-muted-foreground text-sm">Сроки</p>
            <p className="font-medium leading-none text-md">с {new Date(data.data.start_date).toLocaleDateString()} по {new Date(data.data.end_date).toLocaleDateString()}</p>
        </div>}
        {session?.user.type !== 'Студент'
            && <Table className="max-w-7xl">
                <TableHeader className="bg-[#ffd600]">
                    <TableRow>
                        <TableHead className="w-80 text-black">ФИО студента</TableHead>
                        <TableHead className="text-black">Группа</TableHead>
                        <TableHead className="text-black">Направление</TableHead>
                        <TableHead className="text-black">Статус</TableHead>
                        <TableHead className="text-right w-48 text-black">Дата подачи отклика</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.data.responses.map((i: any) => (
                        <TableRow key={i.id}>
                            <TableCell className="font-medium">{i.student.users_permissions_user.username}</TableCell>
                            <TableCell>{i.student.group.group_name}</TableCell>
                            <TableCell>{i.student.group.direction.direction_name}</TableCell>
                            <TableCell>{i.response_status.response_status}</TableCell>
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
            </Table>}
    </div>;
}