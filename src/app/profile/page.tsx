import * as React from "react"

type profileTypes = "student" | "company" | "rop" | "admin"
let currentProfileType = "company"

let fullName = "Иванов Иван Иванович"
let email = "example@example.com"
let group = "ИПС311-1"
let companyName = "ООО \"Название компании\""

export default function Profile(){
    return (
        <div>
            <p>ФИО: {fullName}</p>
            <p>Почта: {email}</p>

            {
                currentProfileType === "student" && <p>Группа: {group}</p> ||
                currentProfileType === "company" && <p>Название компании: {companyName}</p>
            }
            
        </div>
    )
}