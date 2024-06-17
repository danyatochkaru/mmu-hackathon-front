'use client'

import {useEffect, useState} from "react";
import {useParams, usePathname} from "next/navigation";
import {ROUTES} from "@/constants/routes";
import {useSession} from "next-auth/react";

export default function Header() {
    const pathname = usePathname()
    const params = useParams()
    const [title, setTitle] = useState<string>('ММУ Партнёр')
    const {data: session} = useSession()

    useEffect(
        () => {
            async function getTitle(pathname: string) {
                switch (pathname) {
                    case ROUTES.home: {
                        return 'Заявки'
                    }
                    case ROUTES.new_application: {
                        return 'Новая заявка'
                    }
                    case ROUTES.stats: {
                        return 'Статистика и отчетность'
                    }
                    case ROUTES.profile: {
                        return 'Профиль'
                    }
                    default: {
                        const re = new RegExp(`^${ROUTES.application}\/[0-9]$`)
                        if (re.test(pathname) && params.id) {
                            const application = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/applications/${params.id}`, {
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${session?.user.token}`
                                },
                            })
                                .then(res => res.json())
                                .catch(err => {
                                    console.error(err)
                                })

                            return `Заявка #${application?.data?.id}`
                        }

                        return 'Страница'
                    }
                }
            }

            getTitle(pathname).then(t => setTitle(t))
        }, [params.id, pathname, session?.user.token]
    );

    return <header className="p-3 border-b-2">
        <span className="text-lg font-semibold">{title}</span>
    </header>
}