"use client"

import { deleter, fetcher, updater } from "@/service/fetch"
import useSWR from "swr"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import PaginationC from "@/components/pagination"
import Loader from "@/components/loader"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button"
import { format, startOfDay } from "date-fns"
import useSWRMutation from "swr/mutation"
import { useSearchParams } from "next/navigation"

export default function Home() {
    const [page, setPage] = useState(1)
    const [keyword, setKeyword] = useState("")

    const { data, mutate, isLoading } = useSWR(
        `/borrowed?page=${page}`,
        fetcher
    )

    const handlePage = (page: number) => {
        setPage(page)
    }

    const handleSearch = () => {
        const keyword = document.querySelector('input[type="text"]#loan-search') as HTMLInputElement
        setKeyword(keyword?.value)
    }

    const { trigger, isMutating } = useSWRMutation("/renew", updater)

    const handleExtend = async (bookId: string) => {
        const update = await trigger({
            bookId
        })
        if (update) mutate()
    }

    return (
        <>
            <Loader visible={isLoading} />
            <div className="min-h-screen p-20 gap-10 flex flex-col">
                <div className="w-full flex gap-5 justify-center">
                    <div className="w-1/2 gap-3 flex flex-col">
                        <Input id="loan-search" className="" type="text" placeholder="Nhập từ khóa" />
                    </div>
                    <Button variant={"outline"} onClick={() => handleSearch()}>Tìm kiếm</Button>
                </div>
                {data?.result?.length > 0 ?
                    <>
                        <div className="text-center text-xl">Kho sách đã mượn</div>
                        <div className="w-full items-center flex flex-col gap-5">
                            <div className="w-full flex flex-wrap gap-10 justify-between">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-center">Sách</TableHead>
                                            <TableHead className="text-center">Ngày mượn</TableHead>
                                            <TableHead className="text-center">Hạn trả</TableHead>
                                            <TableHead className="text-center">Đã trả</TableHead>
                                            <TableHead className="text-center">Ngày trả</TableHead>
                                            <TableHead className="text-center">Thao tác</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data.result.map((item: any, index: number) => (
                                            <TableRow key={item.bookId + item.readerId + index}>
                                                <TableCell className="text-center">{item.Book.name}</TableCell>
                                                <TableCell className="text-center">{format(new Date(item.startedDate), "dd/MM/yyyy")}</TableCell>
                                                <TableCell className={`text-center ${(startOfDay(new Date()) > startOfDay(new Date(item.expiredDate)) && !item.isReturned) && "text-red-500"}`}>{format(new Date(item.expiredDate), "dd/MM/yyyy")}</TableCell>
                                                <TableCell className="px-0">
                                                    <Checkbox
                                                        className="ms-[50%] -translate-x-1/2"
                                                        disabled
                                                        checked={item.isReturned}
                                                    />
                                                </TableCell>
                                                <TableCell className="text-center">{item.returnedDate && format(new Date(item.returnedDate), "dd/MM/yyyy")}</TableCell>
                                                <TableCell className="text-center">
                                                    <Button
                                                        onClick={() => handleExtend(item.bookId)}
                                                        disabled={item.isExtended || item.isReturned || isMutating} variant="outline" size="sm">
                                                        Gia hạn
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                            <PaginationC page={page} length={data?.pageCount} handlePage={handlePage} />
                        </div>
                    </>
                    :
                    <>
                        <div className="text-center">Không tìm thấy phiếu mượn nào</div>
                    </>
                }
            </div >
        </>
    )
}