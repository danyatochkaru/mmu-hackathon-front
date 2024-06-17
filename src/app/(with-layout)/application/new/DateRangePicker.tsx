"use client"

import * as React from "react"
import {addDays, format} from "date-fns"
import {Calendar as CalendarIcon} from "lucide-react"
import {DateRange} from "react-day-picker"

import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover"
import {ru} from "date-fns/locale/ru";

export function DatePickerWithRange({
                                        className,
                                        defaultDates
                                    }: React.HTMLAttributes<HTMLDivElement> & {
    defaultDates?: { from?: Date, to?: Date }
}) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: defaultDates?.from ?? new Date(),
        to: defaultDates?.to ?? addDays(new Date(), 14),
    })

    return (
        <div className={cn("grid gap-2", className)}>
            <input type={'hidden'} required name={'dates'} value={JSON.stringify(date)}/>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn(
                            "min-w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "dd MMM y", {locale: ru})} -{" "}
                                    {format(date.to, "dd MMM y", {locale: ru})}
                                </>
                            ) : (
                                format(date.from, "dd MMM y", {locale: ru})
                            )
                        ) : (
                            <span>Выберите даты</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        locale={ru}
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
