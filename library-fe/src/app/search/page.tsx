"use client"

import { fetcher } from "@/service/fetch"
import useSWR from "swr"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import PaginationC from "@/components/pagination"
import Loader from "@/components/loader"
import Book from "./book"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function Home() {
    const [page, setPage] = useState(1)
    const [keyword, setKeyword] = useState("")
    const [type, setType] = useState("name")
    const [select, setSelect] = useState("name")

    const { data, isLoading } = useSWR(
        `/search?page=${page}&keyword=${keyword}&type=${type}`,
        fetcher
    )
    console.log(data);

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
                        <Input id="book-search" className="" type="text" placeholder="Nhập từ khóa" />
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
                            <div className="flex flex-wrap gap-10 justify-between px-20">
                                {data.result.map((item: any) => <Book key={item.id} book={item} />)}
                            </div>
                            <PaginationC page={page} length={data?.pageCount} handlePage={handlePage} />
                        </div>
                    </>
                    :
                    <>
                        <div className="text-center">Không tìm thấy cuốn sách nào</div>
                    </>
                }
            </div >
        </>
    )
}