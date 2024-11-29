"use client"

import { fetcher } from "@/service/fetch"
import useSWR from "swr"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table"
import { useState, FC } from "react"
import PaginationC from "@/components/pagination"
import Role from "./role"
import Loader from "@/components/loader"

export default function Home() {
    const [page, setPage] = useState(1)
    const [keyword, setKeyword] = useState("")
    const [types, setTypes] = useState("")

    const { data, mutate, isLoading } = useSWR(
        `/user?page=${page}&keyword=${keyword}&types=${types}`,
        fetcher
    )

    const handlePage = (page: number) => {
        setPage(page)
    }

    const handleSearch = () => {
        const email = document.querySelector('button[role="checkbox"]#user-email')
        const name = document.querySelector('button[role="checkbox"]#user-name')
        const keyword = document.querySelector('input[type="text"]#user-search') as HTMLInputElement
        setKeyword(keyword?.value)
        const order = []
        if (name?.ariaChecked === "true") order.push("name")
        if (email?.ariaChecked === "true") order.push("email")
        setTypes(order.join("-"))
    }

    return (
        <>
            <Loader visible={isLoading} />
            <div className="min-h-screen p-20 gap-10 flex flex-col">
                <div className="w-full flex gap-5 justify-center">
                    <div className="w-1/2 gap-3 flex flex-col">
                        <Input id="user-search" className="" type="text" placeholder="Nhập từ khóa" />
                        <div className="text-sm flex gap-20 ms-[0.1rem]">
                            <div className="flex gap-2">
                                <Checkbox id="user-name" /> Tên
                            </div>
                            <div className="flex gap-2">
                                <Checkbox id="user-email" /> Email
                            </div>
                        </div>
                    </div>
                    <Button variant={"outline"} onClick={() => handleSearch()}>Tìm kiếm</Button>
                </div>
                {data?.result?.length > 0 ?
                    <>
                        <div className="text-center text-xl">Danh sách người dùng</div>
                        <div className="w-full items-center flex flex-col gap-5">
                            <div className="w-3/5">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">STT</TableHead>
                                            <TableHead>Họ và tên</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead className="text-right w-[150px]">Vai trò</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data?.result?.map((item: { id: string, name: string, email: string, role: number }, index: number) =>
                                            <TableRow key={item.id}>
                                                <TableCell className="">{index + 1}</TableCell>
                                                <TableCell>{item.name}</TableCell>
                                                <TableCell>{item.email}</TableCell>
                                                <TableCell><Role role={item.role} id={item.id} mutate={mutate} /></TableCell>
                                            </TableRow>)}
                                    </TableBody>
                                </Table>
                            </div>
                            <PaginationC page={page} length={data?.pageCount} handlePage={handlePage} />
                        </div>
                    </>
                    :
                    <div className="text-center">Không tìm thấy người dùng</div>
                }
            </div>
        </>
    )
}