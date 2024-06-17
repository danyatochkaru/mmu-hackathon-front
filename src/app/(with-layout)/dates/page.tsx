import { auth } from "@/lib/auth";
import qs from "qs"

export default async function Home() {
const session = await auth()
const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/rops?${qs.stringify({
    populate:"*",
    filters:{
        users_permissions_user:{
            id:{"$eq":session?.user.id}
        }
    }
})}`, {
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
    
    
    return <div>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
      С {data.data[0].direction.practice_start} по {data.data[0].direction.practice_end}
    </p>
    </div>
}