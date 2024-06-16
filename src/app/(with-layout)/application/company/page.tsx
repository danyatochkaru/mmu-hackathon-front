import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
export default function TypographyMuted() {
    return (
        
        <div className="p-3 flex flex-col gap-y-4">
           <div className="text-lg font-semibold text-3xl">ОАО "Сбербанк"</div> 
           <div className="flex gap-x-2">
           <Button className="text-sm w-fit">Изменить</Button>
           <Button className="text-sm w-fit">Удалить</Button>
           </div>
      <div><p className="text-sm text-muted-foreground text-lg">Описание задачи</p>
      <p className="text-sm font-medium leading-none text-xl">Текст описания</p>
      </div>
      <div><p className="text-sm text-muted-foreground text-lg">Требования к студентам</p>
      <p className="text-sm font-medium leading-none text-xl">Требования</p>
      </div>
      <div><p className="text-sm text-muted-foreground text-lg">Направление</p>
      <p className="text-sm font-medium leading-none text-xl">Направление</p>
      </div>
      <div><p className="text-sm text-muted-foreground text-lg">Количество студентов</p>
      <p className="text-sm font-medium leading-none text-xl">Число</p>
      </div>
      <div><p className="text-sm text-muted-foreground text-lg">Сроки</p>
      <p className="text-sm font-medium leading-none text-xl">Дата</p>
      </div> 
      <Table className="max-w-7xl">
  <TableHeader className="bg-[#ffd600]">
    <TableRow>
      <TableHead className="w-80 text-black">ФИО студента</TableHead>
      <TableHead className="text-black">Группа/Направление</TableHead>
      <TableHead className="text-right w-48 text-black">Дата подачи отклика</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">ФИО студента</TableCell>
      <TableCell>Группа/Направление</TableCell>
      <TableCell className="text-right w-48">Дата подачи отклика</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">ФИО студента</TableCell>
      <TableCell>Группа/Направление</TableCell>
      <TableCell className="text-right w-48">Дата подачи отклика</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">ФИО студента</TableCell>
      <TableCell>Группа/Направление</TableCell>
      <TableCell className="text-right w-48">Дата подачи отклика</TableCell>
    </TableRow>
  </TableBody>
</Table>

      </div>


    )
  }
  