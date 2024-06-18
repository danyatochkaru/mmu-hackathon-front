import {Textarea} from "@/components/ui/textarea"
import {SelectScrollable} from "./ScrollableSelect"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button";
import DateWithType from "@/app/(with-layout)/application/new/DateWithType";
import NewApplicationAction from "@/app/(with-layout)/application/new/NewApplication.action";
import {auth} from "@/lib/auth";

export default async function NewApplicationPage() {
    const session = await auth()

    const directions = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/directions`, {
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

    return <form className="p-3 flex flex-col gap-y-4" action={NewApplicationAction}>
        <div>
            <p className="text-muted-foreground text-md">Описание задачи</p>
            <Textarea name={'description'} required placeholder="Введите описание задачи"/>
        </div>
        <div>
            <p className="text-muted-foreground text-md">Требования к студентам</p>
            <Textarea name={'requirements'} required placeholder="Введите требования к студентам"/>
        </div>
        <div className={'flex gap-4 flex-wrap'}>
            <div>
                <p className="text-muted-foreground text-md">Направление</p>
                <SelectScrollable directions={directions.data}/>
            </div>
            <div>
                <p className="text-muted-foreground text-md">Количество студентов</p>
                <Input name={'students_count'} className={'min-w-[300px]'} min={1} type="number"
                       placeholder="Введите число студентов"/>
            </div>
        </div>
        <DateWithType/>
        <div>
            <p className="text-muted-foreground text-md">Результаты стажировки (необязательно)</p>
            <Textarea name={'results'} placeholder="Введите результаты стажировки"/>
        </div>
        <div>
            <Button type={'submit'}>Создать</Button>
        </div>
    </form>
}
