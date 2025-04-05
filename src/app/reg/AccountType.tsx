'use client';

import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {useState} from "react";


type valueType = "student" | "partner" | "rop" | "admin" | null;

export default function AccountType({groups, directions}: {
    groups: { id: number, group_name: string }[],
    directions: { id: number, direction_name: string }[]
}) {
    const [selectedValue, setSelectedValue] = useState<valueType>(null);
    return <>
        <div className="flex flex-col space-y-1.5">
            <Label htmlFor="accountType">Тип аккаунта</Label>
            <Select
                name={'account_type'}
                required
                onValueChange={
                    (value) => setSelectedValue(value as valueType)
                }
                value={selectedValue || undefined}
            >
                <SelectTrigger id="accountType">
                    <SelectValue placeholder="Выберите тип аккаунта"/>
                </SelectTrigger>
                <SelectContent position="popper">
                    <SelectItem value="student">Студент</SelectItem>
                    <SelectItem value="partner">Компания</SelectItem>
                    <SelectItem value="rop">РОП</SelectItem>
                    <SelectItem value="admin">Администратор</SelectItem>
                </SelectContent>
            </Select>
        </div>
        {
            selectedValue === 'partner' && (<>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="companyName">Название компании</Label>
                        <Input id="companyName" required name={'company_name'} placeholder="Напишите название компании..."/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="position">Должность</Label>
                        <Input id="position" required name={'position'} placeholder="Напишите вашу должность..."/>
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="phoneNumber">Номер телефона</Label>
                        <Input id="phoneNumber" required name={'phone_number'} placeholder="Напишите номер телефона..."/>
                    </div>
                </>
            )
        }
        {
            selectedValue === 'student' && (
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="group">Ваша группа</Label>
                    <Select
                        name={'student_group'}
                        required
                    >
                        <SelectTrigger id="group">
                            <SelectValue placeholder="Выберите группу"/>
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {groups?.map(group => (
                                <SelectItem key={group.group_name} value={String(group.id)}>{group.group_name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )
        }
        {
            selectedValue === 'rop' && (
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="group">Направление</Label>
                    <Select
                        name={'rop_direction'}
                        required
                    >
                        <SelectTrigger id="direction">
                            <SelectValue placeholder="Выберите направление"/>
                        </SelectTrigger>
                        <SelectContent position="popper">
                            {directions?.map(group => (
                                <SelectItem key={group.direction_name}
                                            value={String(group.id)}>{group.direction_name}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            )
        }
    </>
}
