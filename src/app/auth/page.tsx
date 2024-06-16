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

export function AuthorisationForm() {
    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Авторизация</CardTitle>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">Почта</Label>
                            <Input id="email" placeholder="Напишите почту..."/>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Пароль</Label>
                            <Input id="password" type="password" placeholder="Напишите пароль..."/>
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="footer">
                <Button>Войти</Button>
                <a href="/registration" className="underline hover:opacity-80">У меня нет аккаунта</a>
            </CardFooter>
        </Card>
    )
}


export default function Auth(){
    return (
        <div className="container">
            <AuthorisationForm />
        </div>
    )
}
