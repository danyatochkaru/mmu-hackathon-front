import {Button} from "@/components/ui/button";
import {PropsWithChildren} from "react";
import Link from "next/link";
import {auth, signOut} from "@/lib/auth";
import {ROUTES} from "@/constants/routes";

export default async function AppLayout(props: PropsWithChildren) {
    const session = await auth()

    const data = await fetch(`${process.env.BASE_URL}/users/me?populate=*`, {
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

    const links = [
        {name: "Заявки", href: ROUTES.home},
        {name: "Создать заявку", href: ROUTES.new_application},
        {name: "Статистика и отчетность", href: ROUTES.stats},
    ]

    return <div className="flex">
        <nav className="w-80 border-r-4 h-dvh bg-[#C0C0C0] flex flex-col">
            <div className="bg-[#ffd600] p-4">
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                    <Link href={'/profile'}>{data.username}</Link>
                </h4>
                <p className="text-sm text-muted-foreground"><Link
                    href={"/profile"}>{data.role.description}</Link></p>
            </div>
            <div className="flex flex-col px-1 py-2 gap-y-2 flex-1">
                {links.map(link => (
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
                        await signOut()
                    }}
                >
                    <Button className={'w-full justify-start'} variant={'destructive'}>
                        Выйти
                    </Button>
                </form>
            </div>
        </nav>
        <div className="w-full">
            <header className="p-3 border-b-2">
                <span className="text-lg font-semibold">Заявки</span>
            </header>
            <main className={'p-6'}>
                {props.children}
            </main>
        </div>

    </div>
}
