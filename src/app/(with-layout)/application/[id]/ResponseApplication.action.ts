'use server'

import {auth} from "@/lib/auth";

export default async function ResponseApplicationAction(formData: FormData) {
    const session = await auth()
    const {application_id} = Object.fromEntries(formData)


}