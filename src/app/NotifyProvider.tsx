'use client'

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {PropsWithChildren, useEffect} from "react";
import {useToast} from "@/components/ui/use-toast";
import {ERROR_MESSAGES} from "@/constants/error-messages";
import {Toaster} from "@/components/ui/toaster";

export default function NotifyProvider({children}: PropsWithChildren) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const {toast} = useToast()

    useEffect(
        () => {
            if (searchParams.has('errorMessage')) {
                const _sp = new URLSearchParams(searchParams)
                toast({
                    title: 'Произошла ошибка!',
                    description: ERROR_MESSAGES[searchParams.get('errorMessage') as string],
                    variant: 'destructive'
                })
                _sp.delete('errorMessage')
                router.replace(`${pathname}?${_sp.toString()}`)
            }

            if (searchParams.has('successMessage')) {
                const _sp = new URLSearchParams(searchParams)
                toast({
                    title: 'Успех!',
                    description: searchParams.get('successMessage')
                })
                _sp.delete('successMessage')
                router.replace(`${pathname}?${_sp.toString()}`)
            }

            if (searchParams.has('message')) {
                const _sp = new URLSearchParams(searchParams)
                toast({
                    description: searchParams.get('message')
                })
                _sp.delete('message')
                router.replace(`${pathname}?${_sp.toString()}`)
            }
        },
        [searchParams.has('errorMessage'), searchParams.has('successMessage'), searchParams.has('message')]);

    return <>
        {children}
        <Toaster/>
    </>;
}