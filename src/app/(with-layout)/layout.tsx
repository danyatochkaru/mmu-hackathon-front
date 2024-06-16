import {Button} from "@/components/ui/button";
import {PropsWithChildren} from "react";
import Link from "next/link";

export default function AppLayout(props: PropsWithChildren) {
    const name = "Иванов Иван Иванович"
    const email = "i.i.i@mail.ru"
    const links = [
        {name: "Заявки", href: "/"},
        {name: "Создать заявку", href: "/"},
        {name: "Статистика и отчетность", href: "/"},
    ]

    return <div className="flex">
        <nav className="w-80 border-r-4 h-dvh bg-[#C0C0C0]">
            <div className="bg-[#ffd600] p-4">
                <h4 className="scroll-m-20 text-md font-semibold tracking-tight">
                    <Link href={'/profile'}>{name}</Link>
                </h4>
                <p className="text-sm text-muted-foreground"><Link href={"/profile"}>{email}</Link></p>
            </div>
            <div className="flex flex-col px-1 py-2 gap-y-2">
                {links.map(link => (
                    <Link key={link.name} href={link.href}>
                        <Button className="bg-[#FFFFFF] w-full justify-start">
                            {link.name}
                        </Button>
                    </Link>
                ))}
            </div>
        </nav>
        <div className="w-full">
            <header className="p-3 border-b-2">
                <span className="text-lg font-semibold">Заявки</span>
            </header>
            <main>
                {props.children}
            </main>
        </div>
    </div>
}
