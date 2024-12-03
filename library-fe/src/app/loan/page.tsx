"use client"

import { deleter, fetcher, updater } from "@/service/fetch"
import useSWR from "swr"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import PaginationC from "@/components/pagination"
import Loader from "@/components/loader"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"; import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button"
import { format, startOfDay } from "date-fns"
import useSWRMutation from "swr/mutation"
import { useSearchParams } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function Home() {
    const searchParams = useSearchParams()
    const [page, setPage] = useState(1)
    const [keyword, setKeyword] = useState(searchParams?.get("book") || "")
    const [type, setType] = useState("book")
    const [radio, setRadio] = useState("book")
    const [filter, setFilter] = useState("borrowing")

    const { data, mutate, isLoading } = useSWR(
        `/loan?page=${page}&keyword=${keyword}&type=${type}&filter=${filter}`,
        fetcher,
    )

    const { trigger, isMutating } = useSWRMutation("/loan", updater)
    const { trigger: triggerDelete, isMutating: mutateDelete } = useSWRMutation("/loan", deleter)

    const handlePage = (page: number) => {
        setPage(page)
    }

    const handleReturn = async (readerId: string, bookId: string, startedDate: Date) => {
        const update = await trigger({
            readerId,
            bookId,
            startedDate
        })
        if (update) mutate()
    }

    const handleSearch = () => {
        const keyword = document.querySelector('input[type="text"]#loan-search') as HTMLInputElement
        setKeyword(keyword?.value)
        setType(radio)
    }

    const handleDelete = async (readerId: string, bookId: string, startedDate: Date) => {
        const del = await triggerDelete({
            readerId,
            bookId,
            startedDate
        })
        if (del) mutate()
    }

    return (
        <>
            <Loader visible={isLoading} />
            <div className="min-h-screen p-20 gap-10 flex flex-col">
                <div className="w-full flex gap-5 justify-center">
                    <div className="w-1/2 gap-3 flex flex-col">
                        <Input defaultValue={searchParams?.get("book") || ""} id="loan-search" className="" type="text" placeholder="Nhập từ khóa" />
                        <div className="flex justify-between items-center">
                            <RadioGroup className="text-sm flex gap-20 ms-[0.1rem]" value={radio} onValueChange={setRadio}>
                                <div className="flex gap-2">
                                    <RadioGroupItem value="book" /> Sách
                                </div>
                                <div className="flex gap-2">
                                    <RadioGroupItem value="reader" /> Người mượn
                                </div>
                            </RadioGroup>
                            <Select value={filter} onValueChange={setFilter}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Lọc theo</SelectLabel>
                                        <SelectItem value="all">Tất cả</SelectItem>
                                        <SelectItem value="returned">Đã trả</SelectItem>
                                        <SelectItem value="borrowing">Chưa trả</SelectItem>
                                        <SelectItem value="expired">Quá hạn</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button variant={"outline"} onClick={() => handleSearch()}>Tìm kiếm</Button>
                </div>
                {data?.result?.length > 0 ?
                    <>
                        <div className="text-center text-xl">Danh sách mượn trả</div>
                        <div className="w-full items-center flex flex-col gap-5">
                            <div className="w-full flex flex-wrap gap-10 justify-between">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="text-center">Người mượn</TableHead>
                                            <TableHead className="text-center">Sách</TableHead>
                                            <TableHead className="text-center">Ngày mượn</TableHead>
                                            <TableHead className="text-center">Hạn trả</TableHead>
                                            <TableHead className="text-center">Đã trả</TableHead>
                                            <TableHead className="text-center">Ngày trả</TableHead>
                                            <TableHead className="text-center">Thao tác</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {data.result.map((item: any) => (
                                            <TableRow key={item.bookId + item.readerId + format(item.startedDate, "dd/MM/yyyy")}>
                                                <TableCell className="text-center">{item.User.name}</TableCell>
                                                <TableCell className="text-center">{item.Book.name}</TableCell>
                                                <TableCell className="text-center">{format(new Date(item.startedDate), "dd/MM/yyyy")}</TableCell>
                                                <TableCell className={`text-center ${(startOfDay(new Date()) > startOfDay(new Date(item.expiredDate)) && !item.isReturned) && "text-red-500"}`}>{format(new Date(item.expiredDate), "dd/MM/yyyy")}</TableCell>
                                                <TableCell className="px-0">
                                                    {item.isReturned ?
                                                        <AlertDialog>
                                                            <AlertDialogTrigger
                                                                className="ms-[50%] -translate-x-1/2">
                                                                <Checkbox
                                                                    disabled={isMutating}
                                                                    checked={item.isReturned}
                                                                /></AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Bạn có chắc muốn thực hiện hoàn tác?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        Hành động này không thường xuyên xảy ra. Hộp thoại này để chắc chắn bạn không nhầm lẫn trong việc hoàn tác.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Từ bỏ</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleReturn(item.User.id, item.Book.id, item.startedDate)}>Tiếp tục</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                        :
                                                        <Checkbox
                                                            className="ms-[50%] -translate-x-1/2"
                                                            onClick={() => handleReturn(item.User.id, item.Book.id, item.startedDate)}
                                                            disabled={isMutating}
                                                            checked={item.isReturned}
                                                        />
                                                    }
                                                </TableCell>
                                                <TableCell className="text-center">{item.returnedDate && format(new Date(item.returnedDate), "dd/MM/yyyy")}</TableCell>
                                                <TableCell className="text-center"><AlertDialog>
                                                    <AlertDialogTrigger>
                                                        <Button disabled={mutateDelete} variant="outline" size="sm">
                                                            Xóa
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Bạn có chắc muốn xóa không?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Hành động này sẽ không thể hoàn tác. Dữ liệu sẽ bị xóa hoàn toàn.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Từ bỏ</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                onClick={() => handleDelete(item.User.id, item.Book.id, item.startedDate)}>Tiếp tục</AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
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