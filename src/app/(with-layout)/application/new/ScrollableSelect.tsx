'use client'

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {useEffect, useState} from "react";

export function SelectScrollable({directions}: { directions: any }) {
    const [selected, setSelected] = useState<string>()
    const [direction, setDirection] = useState<any>()

    useEffect(() => {
        setDirection(directions.find((i: any) => `${i.id}-${i.direction_name}` === selected))
    }, [selected]);

    return (
        <>
            <Select name={'direction'} onValueChange={v => setSelected(v)} value={selected}>
                <SelectTrigger className="min-w-[300px]">
                    <SelectValue placeholder="Выберите направление"/>
                </SelectTrigger>
                <SelectContent>
                    {directions.map((i: any) => (
                        <SelectItem value={`${i.id}-${i.direction_name}`}
                                    key={i.direction_name}>{i.direction_name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {
                direction && direction?.practice_start &&
                <p className="text-sm font-medium leading-none mt-1">
                    {`Практика с ${
                        new Date(direction?.practice_start)?.toLocaleDateString()
                    }${
                        direction?.practice_end && ' по '
                    }${
                        new Date(direction?.practice_end)?.toLocaleDateString()
                    }`}
                </p>
            }
        </>
    )
}
