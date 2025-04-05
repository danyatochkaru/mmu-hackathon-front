﻿import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {ROUTES} from "@/constants/routes";
import AccountType from "@/app/reg/AccountType";
import {auth} from "@/lib/auth";
import {registrationAction} from "@/app/reg/Registration.action";
import {redirect} from "next/navigation";

export default async function Registration() {
    const session = await auth()

    if (session?.user) {
        redirect('/')
    }

    const groups = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/groups`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })

    const directions = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/directions`, {
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })

    return (
        <div className="auth_container">
            <form action={registrationAction}>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Регистрация</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">ФИО</Label>
                                <Input id="name" autoComplete={'name'} required name={'full_name'}
                                       placeholder="Напишите ФИО..."/>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Почта</Label>
                                <Input id="email" type={'email'} required name={'email'}
                                       placeholder="Напишите почту..."/>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Пароль</Label>
                                <Input id="password" minLength={6} required name={'password'} type="password"
                                       placeholder="Придумайте пароль..."/>
                            </div>
                            <AccountType
                                directions={directions.data?.map((i: any) => ({
                                    id: i.id,
                                    direction_name: i.direction_name
                                }))}
                                groups={groups.data?.map((i: any) => ({id: i.id, group_name: i.group_name}))}/>
                        </div>
                    </CardContent>
                    <CardFooter className="auth_footer">
                        <Button type={'submit'}>Зарегистрироваться</Button>
                        <a href={ROUTES.login} className="underline hover:opacity-80">У меня есть аккаунт</a>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
