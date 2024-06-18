'use client'

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {DatePickerWithRange} from "@/app/(with-layout)/application/new/DateRangePicker";
import {useState} from "react";
import {Switch} from "@/components/ui/switch";
import {Label} from "@/components/ui/label";

type valueType = "practice" | "internship" | null;

export default function DateWithType({defaultDates, defaultType, isPaid}: {
    defaultType?: valueType,
    defaultDates?: { from?: Date, to?: Date }
    isPaid?: boolean
}) {
    const [selectedValue, setSelectedValue] = useState<valueType>(defaultType ?? null);

    return <>
        <div className={'flex items-center gap-4 flex-wrap'}>
            <div className={'min-w-[300px]'}>
                <p className="text-muted-foreground text-md">Тип задачи</p>
                <Select
                    name={'work_type'}
                    required
                    onValueChange={
                        (value) => setSelectedValue(value as valueType)
                    }
                    value={selectedValue || undefined}
                >
                    <SelectTrigger id="workType">
                        <SelectValue placeholder="Выберите тип задачи"/>
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="practice">Практика</SelectItem>
                        <SelectItem value="internship">Стажировка</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            {selectedValue === 'internship' &&
                <div>
                    <p className="text-muted-foreground text-md">Сроки</p>
                    <DatePickerWithRange defaultDates={defaultDates}/>
                </div>
            }
            {selectedValue === 'practice' && defaultDates &&
                <div>
                    <p className="text-muted-foreground text-md">Сроки</p>
                    <p className="font-medium leading-none text-md">с {defaultDates.from?.toLocaleDateString()} по {defaultDates.to?.toLocaleDateString()}</p>
                </div>
            }
        </div>
        {
            selectedValue === 'internship' && <div className={'flex items-center space-x-2'}>
                <Switch id={'paidInternship'} defaultChecked={isPaid} name={'paid_internship'}/>
                <Label className={'text-sm'} htmlFor="paidInternship">Оплачиваемая стажировка</Label>
            </div>
        }
    </>
}