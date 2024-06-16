'use client';
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type valueType = "student"| "company"| "rop" | "admin" | null;

export function RegistrationForm() {
    const [selectedValue, setSelectedValue] = React.useState<valueType>(null);
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Регистрация</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">ФИО</Label>
                            <Input id="name" placeholder="Напишите ФИО..."/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Почта</Label>
                            <Input id="email" placeholder="Напишите почту..."/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Пароль</Label>
                            <Input id="password" type="password" placeholder="Придумайте пароль..."/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="accountType">Тип аккаунта</Label>
                            <Select
                                onValueChange={
                                (value) => setSelectedValue(value as valueType)
                            }>
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
                                    <Input id="companyName" placeholder="Напишите название компании..."/>
                                </div>
                            ) || 
                            selectedValue === 'student' && (
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="group">Ваша группа</Label>
                                    <Select>
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
                    </div>
                </form>
            </CardContent>
            <CardFooter className="footer">
                <Button>Зарегистрироваться</Button>
                <a href="/auth" className="underline hover:opacity-80">У меня есть аккаунт</a>
            </CardFooter>
        </Card>
    )
}

export default function Registration(){
    return (
        <div className="container">
            <RegistrationForm />
        </div>
    )
}
