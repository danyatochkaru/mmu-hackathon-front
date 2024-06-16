import { Button } from "@/components/ui/button";

export default function AppLayout(props:any){
    return <div className="flex">
       
        <nav className="w-80 border-r-4 h-dvh bg-[#C0C0C0]" >
            <div className="bg-[#ffd600] p-4">
                <p>Иванов Иван Иванович</p>
                <span>i.i.i@mail.ru</span>
            </div>
            <div className="flex flex-col py-2 gap-y-2">
            <Button className="bg-[#FFFFFF] text-[#000]" variant={"secondary"}>Заявки</Button> 
            <Button className="bg-[#FFFFFF] text-[#000]" variant={"secondary"}>Создать заявку</Button>
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