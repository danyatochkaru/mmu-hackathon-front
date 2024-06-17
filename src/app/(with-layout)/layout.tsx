import {Button} from "@/components/ui/button";
import {PropsWithChildren} from "react";
import Link from "next/link";
import {auth, signOut} from "@/lib/auth";
import {ROUTES} from "@/constants/routes";
import Header from "@/app/(with-layout)/Header";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

const links = [
    {name: "Заявки", href: ROUTES.home, view_for: ['student', 'partner', 'admin', 'rop']},
    {name: "Создать заявку", href: ROUTES.new_application, view_for: ['partner']},
    {name: "Даты практик", href: ROUTES.dates, view_for: ['rop']},
    {name: "Статистика и отчетность", href: ROUTES.stats, view_for: ['admin', 'rop']},
    
   
]


export default async function AppLayout(props: PropsWithChildren) {
    const session = await auth()

    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/me?populate=*`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.user.token}`
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })

    return <div className="flex">
        <nav className="w-80 min-w-56 border-r-4 h-dvh bg-[#C0C0C0] flex flex-col">
            <Link href={'/profile'}>
                <div className="bg-[#ffd600] p-4">
                    <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                        {data.username}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                        {data.role.description}
                    </p>
                </div>
            </Link>
            <div className="flex flex-col px-1 py-2 gap-y-2 flex-1">
                {links
                    .filter(i => i.view_for.includes(data.role.type))
                    .map(link => (
                        <Link key={link.name} href={link.href}>
                            <Button className="bg-[#FFFFFF] w-full justify-start">
                                {link.name}
                            </Button>
                        </Link>
                    ))}
                <form
                    className="w-full mt-auto"
                    action={async () => {
                        "use server"
                        await signOut({redirect: false})

                        revalidatePath(ROUTES.login)
                        redirect(ROUTES.login)
                    }}
                >
                    <Button className={'w-full justify-start'} variant={'destructive'}>
                        Выйти
                    </Button>
                </form>
            </div>
        </nav>
        <div className="w-full">
            <Header/>
            <main className={'p-6'}>
                {props.children}
            </main>
        </div>

    </div>
}
