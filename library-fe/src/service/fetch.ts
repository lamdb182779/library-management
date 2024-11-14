import axios from "axios"

const SERVER_DOMAIN = process.env.NEXT_PUBLIC_SERVER_DOMAIN

export const axiosInstance = axios.create({
    baseURL: SERVER_DOMAIN
})

export const fetcher = (path: string) => axiosInstance.get(path, {
    withCredentials: true
})
    .then(res => res.data)

export const logout = async () => {
    const data = await fetcher("/logout")
    if (data.message === "Log out successfully!") return true
    else return false
}

export const updater = async (path: string, { arg }: { arg: object }) => axiosInstance.put(path, arg, {
    withCredentials: true
}).then(res => res.data)