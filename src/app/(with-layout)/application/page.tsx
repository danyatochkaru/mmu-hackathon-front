import {Button} from "@/components/ui/button";

export default function TypographyMuted() {
    return (
        <div className="p-3 flex flex-col gap-y-4">
            <div className="font-semibold text-3xl">{'ОАО "Сбербанк"'}</div>
            <Button className="text-sm w-fit">Откликнуться</Button>
            <div>
                <p className="text-muted-foreground text-lg">Описание задачи</p>
                <p className="font-medium leading-none text-xl">Текст описания</p>
            </div>
            <div>
                <p className="text-muted-foreground text-lg">Требования к студентам</p>
                <p className="font-medium leading-none text-xl">Требования</p>
            </div>
            <div>
                <p className="text-muted-foreground text-lg">Направление</p>
                <p className="font-medium leading-none text-xl">Направление</p>
            </div>
            <div>
                <p className="text-muted-foreground text-lg">Количество студентов</p>
                <p className="font-medium leading-none text-xl">Число</p>
            </div>
            <div>
                <p className="text-muted-foreground text-lg">Сроки</p>
                <p className="font-medium leading-none text-xl">Дата</p>
            </div>
        </div>
    )
}
  