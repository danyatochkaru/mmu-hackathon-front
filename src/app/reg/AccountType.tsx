'use client';

import {Label} from "@/components/ui/label";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Input} from "@/components/ui/input";
import {useState} from "react";


type valueType = "student" | "company" | "rop" | "admin" | null;

export default function AccountType() {
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
                    <SelectItem value="company">Компания</SelectItem>
                    <SelectItem value="rop">РОП</SelectItem>
                    <SelectItem value="admin">Администратор</SelectItem>
                </SelectContent>
            </Select>
        </div>
        {
            selectedValue === 'company' && (
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="companyName">Название компании</Label>
                    <Input id="companyName" required name={'company_name'} placeholder="Напишите название компании..."/>
                </div>
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
                            <SelectItem value="ips311-1">ИПС311-1</SelectItem>
                            <SelectItem value="ips311-2">ИПС311-2</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )
        }
    </>
}