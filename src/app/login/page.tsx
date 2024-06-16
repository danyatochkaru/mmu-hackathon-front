import {Button} from "@/components/ui/button"
import {Card, CardContent, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {ROUTES} from "@/constants/routes";
import {auth, signIn} from "@/lib/auth";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export default async function Auth() {
    const session = await auth()

    if (session?.user) {
        redirect('/')
    }

    return (
        <div className="container">
            <form action={async (formData: FormData) => {
                'use server'

                const res = await signIn("credentials", formData)

                console.log('ok', res)

                revalidatePath(ROUTES.home)
                redirect(ROUTES.home)
            }}>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Авторизация</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Почта</Label>
                                <Input id="email" name={'email'} placeholder="Напишите почту..."/>
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Пароль</Label>
                                <Input id="password" name={'password'} type="password"
                                       placeholder="Напишите пароль..."/>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="footer">
                        <Button type={'submit'}>Войти</Button>
                        <a href={ROUTES.registration} className="underline hover:opacity-80">У меня нет аккаунта</a>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}
