import {Textarea} from "@/components/ui/textarea"
import {SelectScrollable} from "./ScrollableSelect"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import DateWithType from "@/app/(with-layout)/application/new/DateWithType";
import qs from "qs";
import {auth} from "@/lib/auth";
import EditApplicationAction from "@/app/(with-layout)/application/[id]/edit/EditApplication.action";

export default async function EditApplicationPage({params}: { params: { id: string } }) {
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

    if (!data.data) {
        return <div className="p-3 flex flex-col gap-y-4">
            <h2 className="font-semibold text-2xl">Заявка не найдена</h2>
        </div>
    }

    return <form className="p-3 flex flex-col gap-y-4" action={EditApplicationAction}>
        <input type={'hidden'} name={'application_id'} value={params.id}/>
        <div>
            <p className="text-muted-foreground text-md">Описание задачи</p>
            <Textarea name={'description'} required defaultValue={data.data.task_description}
                      placeholder="Введите описание задачи"/>
        </div>
        <div>
            <p className="text-muted-foreground text-md">Требования к студентам</p>
            <Textarea name={'requirements'} required defaultValue={data.data.requirements}
                      placeholder="Введите требования к студентам"/>
        </div>
        <div className={'flex gap-4 flex-wrap'}>
            <div>
                <p className="text-muted-foreground text-md">Направление</p>
                <SelectScrollable defaultDirection={data.data.direction.id}/>
            </div>
            <div>
                <p className="text-muted-foreground text-md">Количество студентов</p>
                <Input name={'students_count'} className={'min-w-[300px]'} min={1} type="number"
                       defaultValue={data.data.number_of_students}
                       placeholder="Введите число студентов"/>
            </div>
        </div>
        <DateWithType
            isPaid={data.data.paid_internship}
            defaultType={data.data.application_type === 'практика' ? 'practice' : 'internship'}
            defaultDates={{
                from: new Date(data.data.start_date || data.data.direction.practice_start),
                to: new Date(data.data.end_date || data.data.direction.practice_end)
            }}
        />
        <div>
            <p className="text-muted-foreground text-md">Результаты стажировки (необязательно)</p>
            <Textarea name={'results'} defaultValue={data.data.results}
                      placeholder="Введите результаты стажировки"/>
        </div>
        <div>
            <Button type={'submit'}>Сохранить</Button>
        </div>
    </form>
}