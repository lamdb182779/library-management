"use client"

import { fetcher } from "@/service/fetch"
import useSWR from "swr"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, FC } from "react"
import PaginationC from "@/components/pagination"

export default function Home() {
    const [page, setPage] = useState(1)
    const [keyword, setKeyword] = useState("")

    const { data, mutate } = useSWR(
        `/author?page=${page}&keyword=${keyword}`,
        fetcher
    )

    const handlePage = (page: number) => {
        setPage(page)
    }

    const handleSearch = () => {
        const keyword = document.querySelector('input[type="text"]#author-search') as HTMLInputElement
        setKeyword(keyword?.value)
    }

    console.log(data)

    return (
        <div className="min-h-screen p-20 gap-10 flex flex-col">
            <div className="w-full flex gap-5 justify-center">
                <div className="w-1/2 gap-3 flex flex-col">
                    <Input id="author-search" className="" type="text" placeholder="Nhập tên tác giả" />
                </div>
                <Button variant={"outline"} onClick={() => handleSearch()}>Tìm kiếm</Button>
            </div>
            {data?.result?.length > 0 ?
                <>
                    <div className="text-center text-xl">Danh sách tác giả</div>
                    <div className="w-full items-center flex flex-col gap-5">
                        <div className="w-3/5">
                        </div>
                        <PaginationC page={page} length={data?.pageCount} handlePage={handlePage} />
                    </div>
                </>
                :
                <div className="text-center">Không tìm thấy tác giả</div>
            }
        </div>
    )
}