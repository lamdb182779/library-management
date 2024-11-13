"use client"

import { useRouter } from "next/navigation"

import GoogleIcon from "./svg/google"
import Image from 'next/image'

import useSWR from "swr"

import { fetcher, logout } from "@/service/fetch"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "./ui/menubar"
import Link from "next/link"
import { DropdownMenuContent, DropdownMenu, DropdownMenuTrigger, DropdownMenuItem } from "./ui/dropdown-menu"
import { LucideLogOut, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { MouseEvent } from "react"
import { Button } from "./ui/button"

export default function Header() {
    const { theme, setTheme } = useTheme()

    const { data, mutate } = useSWR(
        "/check-login",
        fetcher
    )

    const router = useRouter()
    const handleLogin = () => {
        router.push("/login")
    }
    const handleLogout = () => {
        logout().then((success) => {
            if (success) router.push("/")
            mutate()
        })
    }

    const handleTheme = (event: MouseEvent) => {
        event.preventDefault()
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    const navList = [
        {
            name: "Tra cứu sách",
            route: "/search",
        },
        {
            name: "Mượn trả sách",
            permission: [1, 2],
            action: [
                {
                    name: "Danh sách mượn trả",
                    route: "/loan"
                },
                {
                    name: "Cho muợn sách",
                    route: "/lend"
                },
                {
                    name: "Nhận lại sách",
                    route: "/return"
                }
            ]
        },
        {
            name: "Quản lý sách",
            permission: [1, 2],
            action: [
                {
                    name: "Tất cả đầu sách",
                    route: "/book",
                },
                {
                    name: "Nhập đầu sách mới",
                    route: "/book/add"
                },
            ]
        },
        {
            name: "Quản lý tác giả",
            permission: [1, 2],
            action: [
                {
                    name: "Tất cả tác giả",
                    route: "/author",
                },
                {
                    name: "Thêm tác giả mới",
                    route: "/author/add"
                },
            ]
        },
        {
            name: "Phân quyền",
            route: "/role",
            permission: [1]
        }
    ]

    return (
        <div className="fixed z-[60] w-screen h-[8vh] flex items-center justify-between px-20 text-sm">
            <Menubar className="border-none shadow-none">
                {navList.map((nav: any) => {
                    if (nav.permission?.includes(data?.user?.role) || !nav.permission) {
                        if (nav.route) return <MenubarMenu key={nav.name}>
                            <Link href={nav.route}>
                                <MenubarTrigger className="cursor-pointer">
                                    {nav.name}
                                </MenubarTrigger>
                            </Link>
                        </MenubarMenu>
                        return <MenubarMenu key={nav.name}>
                            <MenubarTrigger className="cursor-pointer">{nav.name}</MenubarTrigger>
                            <MenubarContent>
                                {nav?.action.map((item: any) => <Link href={item.route} key={item.name}>
                                    <MenubarItem className="cursor-pointer">
                                        {item.name}
                                    </MenubarItem>
                                </Link>)}
                            </MenubarContent>
                        </MenubarMenu>
                    }
                    return <div key={nav.name}></div>
                })}
            </Menubar>
            {data &&
                <>
                    {data.message === "Logged in!" ?
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Image
                                    className="rounded-full "
                                    src={data.user.image ?? ""}
                                    width={32}
                                    height={32}
                                    alt={data.user.name ?? ""}
                                />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem className="cursor-pointer pe-7" onClick={() => router.push("/borrow")}>
                                    Kho sách đã mượn
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer gap-7" onClick={(event) => handleTheme(event)}>
                                    Chế độ
                                    <div className="h-[1.2rem] w-[1.2rem] overflow-hidden">
                                        <Sun className="h-[1.2rem] w-[1.2rem] dark:-mt-[1.2rem]" />
                                        <Moon className="h-[1.2rem] w-[1.2rem]" />
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer !text-red-600" onClick={() => handleLogout()}>
                                    <LucideLogOut />
                                    Đăng xuất
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        :
                        <div className="flex items-center gap-3">
                            <Button className="rounded-full border-0" variant="outline" size="icon" onClick={(event => handleTheme(event))}>
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                            <div onClick={() => handleLogin()} className="flex rounded-full dark:border-white border py-1 px-3 gap-1 items-center cursor-pointer hover:bg-neutral-200 dark:hover:bg-white dark:hover:text-black">
                                <GoogleIcon width={25} height={25} />
                                Đăng nhập với Google
                            </div>
                        </div>
                    }
                </>
            }
        </div>
    )
}