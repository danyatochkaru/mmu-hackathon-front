import { Textarea } from "@/components/ui/textarea"
import { DatePickerWithRange } from "./DateRangePicker"
import { SelectScrollable } from "./ScrollableSelect"
import { Input } from "@/components/ui/input"

export default function TextareaDemo() {
  return  <div className="p-3 flex flex-col gap-y-4">
  <div>
    <p className="text-sm text-muted-foreground text-lg">Описание задачи</p>
    <Textarea placeholder="Введите описание задачи"/>
</div>
<div>
    <p className="text-sm text-muted-foreground text-lg">Требования к студентам</p>
    <Textarea placeholder="Введите требования к студентам"/>
</div>
<div><p className="text-sm text-muted-foreground text-lg">Направление</p>
      <SelectScrollable/>
      </div>
      <div><p className="text-sm text-muted-foreground text-lg">Количество студентов</p>
      <Input min={1} type="number" placeholder="Введите число студентов" />
      </div>
      <div><p className="text-sm text-muted-foreground text-lg">Сроки</p>
      <DatePickerWithRange/>
      </div> 
</div>
}
