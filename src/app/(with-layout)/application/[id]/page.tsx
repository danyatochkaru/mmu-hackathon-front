import {auth} from "@/lib/auth";
import qs from "qs";
import {Button} from "@/components/ui/button";

export default async function ApplicationPage({params}: { params: { id: string } }) {
    const session = await auth()

    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/applications/${params.id}?${qs.stringify({populate: '*'})}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
        },
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })

    return <div className="p-3 flex flex-col gap-y-4">
        <div className="font-semibold text-2xl">{data.data.partner.company_name}</div>
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
    </div>
}