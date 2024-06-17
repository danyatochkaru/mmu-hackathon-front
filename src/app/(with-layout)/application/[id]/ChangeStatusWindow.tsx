'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {PropsWithChildren} from "react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Button} from "@/components/ui/button";
import {useParams} from "next/navigation";
import ChangeStatusAction from "@/app/(with-layout)/application/[id]/ChangeStatusAction";

export default function ChangeStatusWindow({children, statuses, currentStatusId}: PropsWithChildren & {
    statuses: { id: number, name: string }[],
    currentStatusId?: number
}) {
    const params = useParams()
    return <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Изменение статуса у заявки #{params.id}</DialogTitle>
                <DialogDescription>
                    <form className={'flex flex-col gap-y-4 mt-5'} action={ChangeStatusAction}>
                        <Select
                            name={'application_status'}
                            required
                            defaultValue={currentStatusId ? String(statuses.find(i => i.id === currentStatusId)?.id) : undefined}
                        >
                            <SelectTrigger id="application_status">
                                <SelectValue placeholder="Выберите статус"/>
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {statuses.map(status => (
                                    <SelectItem key={`${status.id}-status`}
                                                value={String(status.id)}>{status.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button type={'submit'}>Сохранить</Button>
                    </form>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    </Dialog>
}