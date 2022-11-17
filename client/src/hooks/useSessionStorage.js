import { useState } from "react"

export const useSessionStorage = (key, defaultVal) => {
    const [value, setValue] = useState(() => {
        const hasUser = sessionStorage.getItem(key)
        const authUser = hasUser? JSON.parse(hasUser) : defaultVal
        return authUser
    })

    const setData = (data) => {
        sessionStorage.setItem(key, JSON.stringify(data))
        setValue(data)
    }

    return [
        value,
        setData
    ]
}