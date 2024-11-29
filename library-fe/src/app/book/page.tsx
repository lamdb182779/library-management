"use client"

import { fetcher } from "@/service/fetch"
import useSWR from "swr"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import PaginationC from "@/components/pagination"
import Loader from "@/components/loader"
import { Checkbox } from "@/components/ui/checkbox"
import { AddNew } from "./add"
import Book from "./book"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useSearchParams } from "next/navigation"

export default function Home() {
    const searchParams = useSearchParams()
    const [page, setPage] = useState(1)
    const [keyword, setKeyword] = useState(searchParams?.get("author") || "")
    const [type, setType] = useState(searchParams?.get("author") ? "author" : "name")
    const [select, setSelect] = useState(searchParams?.get("author") ? "author" : "name")

    const { data, mutate, isLoading } = useSWR(
        `/book?page=${page}&keyword=${keyword}&type=${type}`,
        fetcher
    )

    const handlePage = (page: number) => {
        setPage(page)
    }

    const handleSearch = () => {
        const keyword = document.querySelector('input[type="text"]#book-search') as HTMLInputElement
        setKeyword(keyword?.value)
        setType(select)
    }

    return (
        <>
            <Loader visible={isLoading} />
            <div className="min-h-screen p-20 gap-10 flex flex-col">
                <div className="w-full flex gap-5 justify-center">
                    <div className="w-1/2 gap-3 flex flex-col">
                        <Input id="book-search" defaultValue={searchParams?.get("author") || ""} type="text" placeholder="Nhập từ khóa" />
                        <RadioGroup className="text-sm flex gap-16 ms-[0.1rem]" value={select} onValueChange={setSelect}>
                            <div className="flex gap-2">
                                <RadioGroupItem value="name" /> Tên
                            </div>
                            <div className="flex gap-2">
                                <RadioGroupItem value="author" /> Tác giả
                            </div>
                            <div className="flex gap-2">
                                <RadioGroupItem value="tag" /> Thể loại
                            </div>
                        </RadioGroup>
                    </div>
                    <Button variant={"outline"} onClick={() => handleSearch()}>Tìm kiếm</Button>
                </div>
                {data?.result?.length > 0 ?
                    <>
                        <div className="text-center text-xl">Kho sách hiện có</div>
                        <div className="w-full items-center flex flex-col gap-5">
                            <div className="grid grid-cols-5 gap-10 px-20">
                                <AddNew mutate={mutate} />
                                {data.result.map((item: any) => <Book key={item.id} book={item} mutate={mutate} />)}
                            </div>
                            <PaginationC page={page} length={data?.pageCount} handlePage={handlePage} />
                        </div>
                    </>
                    :
                    <>
                        <div className="text-center">Không tìm thấy cuốn sách nào</div>
                        <AddNew mutate={mutate} />
                    </>
                }
            </div >
        </>
    )
}