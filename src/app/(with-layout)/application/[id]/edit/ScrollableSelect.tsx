import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue,} from "@/components/ui/select"
import {auth} from "@/lib/auth";

export async function SelectScrollable({defaultDirection}: { defaultDirection?: number }) {
    const session = await auth()

    const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/directions`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session?.user.token}`
        }
    })
        .then(res => res.json())
        .catch(err => {
            console.error(err)
        })

    const _default = data.data.find((i: any) => i.id === defaultDirection)

    return (<>
            <Select name={'direction'}
                    defaultValue={_default ? `${_default.id}-${_default.direction_name}` : undefined}>
                <SelectTrigger className="min-w-[300px]">
                    <SelectValue placeholder="Выберите направление"/>
                </SelectTrigger>
                <SelectContent>
                    {data.data.map((i: any) => (
                        <SelectItem value={`${i.id}-${i.direction_name}`}
                                    key={i.direction_name}>{i.direction_name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    )
}
