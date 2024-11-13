import { mutate } from "swr"

const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN

export const fetcher = (path: string) => fetch(`${SERVER_DOMAIN}${path}`, {
    credentials: "include"
})
    .then(res => res.json())

export const mutation = (path: string, data?: any, options?: any) => {
    mutate(`${SERVER_DOMAIN}${path}`, data, options)
}

export const logout = async () => {
    const data = await fetcher("/logout")
    if (data.message === "Log out successfully!") return true
    else return false
}