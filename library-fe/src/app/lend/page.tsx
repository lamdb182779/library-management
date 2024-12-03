"use client";

import { useState } from "react";
import lightuser from "@/assets/unknown-light.png"
import darkuser from "@/assets/unknown-dark.png"
import lightbook from "@/assets/book-light.png"
import darkbook from "@/assets/book-dark.png"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import useSWR from "swr";
import { fetcher, poster } from "@/service/fetch";
import { CalendarIcon, Check } from "lucide-react";
import Image from "next/image";
import { useTheme } from "next-themes";
import PaginationC from "@/components/pagination";
import useSWRMutation from "swr/mutation";
import { cn } from "@/lib/utils";
import { format, startOfDay } from "date-fns";

export default function Home() {
    const [date, setDate] = useState<Date | undefined>(startOfDay(new Date()))
    const { theme } = useTheme()
    const [userSearch, setUserSearch] = useState("")
    const [bookSearch, setBookSearch] = useState("")
    const [userPage, setUserPage] = useState(1)
    const [bookPage, setBookPage] = useState(1)
    const handleUserPage = (page: number) => {
        setUserPage(page)
    }
    const handleBookPage = (page: number) => {
        setBookPage(page)
    }
    const [userInfo, setUserInfo] = useState<any | null>(null)
    const [bookInfo, setBookInfo] = useState<any | null>(null)
    const [duration, setDuration] = useState(7)

    const { data: usersData } = useSWR(`/user?keyword=${userSearch}&types=name&page=${userPage}`, fetcher)
    const { data: booksData, mutate } = useSWR(`/book?keyword=${bookSearch}&type=name&pagesize=5&page=${bookPage}`, fetcher)
    const { trigger, isMutating } = useSWRMutation("/loan", poster)



    const handleUserSearch = () => {
        const keyword = document.querySelector('input[type="text"]#user-search') as HTMLInputElement
        setUserSearch(keyword?.value)
    };

    const handleBookSearch = () => {
        const keyword = document.querySelector('input[type="text"]#book-search') as HTMLInputElement
        setBookSearch(keyword?.value)
    };

    const handleSubmit = async () => {
        const post = await trigger({
            startedDate: date,
            readerId: userInfo?.id,
            bookId: bookInfo?.id,
            duration
        })
        if (post) {
            mutate()
        }
    };

    return (
        <div className="container mx-auto pt-[9vh] grid grid-cols-2 gap-6">
            {/* Phần Người Dùng */}
            <Card>
                <CardHeader>
                    <h2 className="text-lg text-center font-semibold">Tìm Người Dùng</h2>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input id="user-search" className="" type="text"
                            placeholder="Nhập tên người dùng"
                        />
                        <Button variant={"outline"} onClick={handleUserSearch}>
                            Tìm kiếm
                        </Button>
                    </div>
                    {usersData?.result?.length > 0 && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tên</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Chọn</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {usersData.result.map((user: any) => (
                                    <TableRow key={user.id}>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => setUserInfo(user)}
                                                className="border-none rounded-full" size={"icon"} variant={"outline"}>
                                                <Check />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                    <PaginationC page={userPage} length={usersData?.pageCount} handlePage={handleUserPage} />
                </CardContent>
            </Card>

            {/* Phần Sách */}
            <Card>
                <CardHeader>
                    <h2 className="text-lg font-semibold text-center">Tìm Sách</h2>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input
                            placeholder="Nhập tên sách"
                            id="book-search" className="" type="text"
                        />
                        <Button variant={"outline"} onClick={handleBookSearch}>
                            Tìm kiếm
                        </Button>
                    </div>
                    {booksData?.result?.length > 0 && (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Tên</TableHead>
                                    <TableHead>Tác giả</TableHead>
                                    <TableHead>Còn</TableHead>
                                    <TableHead>Chọn</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {booksData.result.map((book: any) => (
                                    <TableRow key={book.id}>
                                        <TableCell>{book.name}</TableCell>
                                        <TableCell>{book.Authors.map((item: any) => item.name).join(", ")}</TableCell>
                                        <TableCell>{book.quantity - book.borrowCount}</TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => setBookInfo(book)}
                                                className="border-none rounded-full" size={"icon"} variant={"outline"}>
                                                <Check />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                    <PaginationC page={bookPage} length={booksData?.pageCount} handlePage={handleBookPage} />
                </CardContent>
            </Card>

            {/* Phần Phiếu Mượn */}
            <Card className="col-span-2">
                <CardHeader>
                    <div className="text-lg font-bold text-center">Thông Tin Phiếu Mượn</div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-5">
                    <div className="space-y-5">
                        <div className="relative h-[100px] w-[100px] mx-auto">
                            <Image
                                className="rounded-full"
                                src={userInfo?.image || (theme === "light" ? darkuser : lightuser)}
                                fill
                                alt={userInfo?.name || ""}
                            />
                        </div>
                        <div className="flex">
                            <span className="w-1/4">Người mượn:</span>
                            <span className="flex-1">{userInfo?.name}</span>
                        </div>
                        <div className="flex">
                            <span className="w-1/4">Email:</span>
                            <span className="flex-1">{userInfo?.email}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-1/4">Ngày mượn:</span>
                            <span className="flex-1">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-[280px] justify-start text-left font-normal",
                                                !date && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover></span>
                        </div>
                        <div className="flex items-center">
                            <span className="w-1/4">Số ngày mượn:</span>
                            <span className="flex-1">
                                <Input
                                    className="w-auto"
                                    type="number"
                                    value={duration}
                                    onChange={(e) => setDuration(Math.floor(Number(e.target.value)))}
                                    min={1}
                                /></span>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <div className="relative h-[100px] w-[100px] mx-auto">
                            <Image
                                className="rounded"
                                src={bookInfo?.image || (theme === "dark" ? darkbook : lightbook)}
                                fill
                                alt={bookInfo?.name || ""}
                            />
                        </div>
                        <div className="flex">
                            <span className="w-1/4">Tên Sách:</span>
                            <span className="flex-1">{bookInfo?.name}</span>
                        </div>
                        <div className="flex">
                            <span className="w-1/4">Tác Giả:</span>
                            <span className="flex-1">{bookInfo?.Authors.map((item: any) => item.name).join(", ")}</span>
                        </div>
                        <div className="flex">
                            <span className="w-1/4">Nhà Xuất Bản:</span>
                            <span className="flex-1">{bookInfo?.Publisher.name}</span>
                        </div>
                        <div className="flex">
                            <span className="w-1/4">Thể Loại:</span>
                            <span className="flex-1">{bookInfo?.Tags.map((item: any) => item.name).join(", ")}</span>
                        </div>
                        <div>
                            <Label className="line-clamp-2 leading-normal">{bookInfo?.describe}</Label>
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button disabled={isMutating} className="mx-auto" onClick={handleSubmit}>
                        Lưu Phiếu Mượn
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
