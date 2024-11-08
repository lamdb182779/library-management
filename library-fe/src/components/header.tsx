"use client"

import { useRouter } from "next/navigation"
import GoogleIcon from "./svg/google"

export default function Header() {
    const router = useRouter()
    const handleLogin = () => {
        router.push("/login")
    }
    const handleLogout = () => {

    }
    return (
        <div className="fixed z-[60] w-screen min-h-[8vh] bg-gradient-to-r from-[#000000] to-[#383838] flex items-center text-white justify-end px-10">
            <div onClick={() => handleLogin()} className="flex rounded-full border-white border py-1 px-3 gap-1 items-center cursor-pointer  hover:bg-white hover:text-black">
                <GoogleIcon width={25} height={25} />
                Đăng nhập với Google
            </div>
        </div>
    )
}