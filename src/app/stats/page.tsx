import * as React from "react"

let studentsCount = 156;
let requestCount = 176;

export default function Stats(){
    return (
        <div>
            <p>Количество студентов: {studentsCount}</p>
            <p>Количество заявок: {requestCount}</p>
        </div>
    )
}