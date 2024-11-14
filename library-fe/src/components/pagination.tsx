import { ReactNode, useRef } from "react"
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Ellipsis } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

export default function PaginationC({
    page = 1,
    length = 1,
    handlePage = () => { }
}: {
    page?: number,
    length?: number,
    handlePage?: Function
}) {

    const ref = useRef<HTMLInputElement>(null)
    const handleGoto = () => {
        const value = ref?.current?.value
        const goto = value ? parseInt(value) : 1
        handlePage(goto > 0 ? goto : 1)
    }

    const PageList = () => {
        if (length < 2) {
            return <></>
        }
        if (length < 11) {
            return (
                <>
                    {
                        Array.from({ length: length }, (_, index) => index + 1)?.map((item: number) => {
                            return (
                                <PaginationItem className="cursor-pointer" key={item} onClick={() => handlePage(item)}>
                                    <PaginationLink>
                                        {item}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        })
                    }
                </>
            )
        }
        if (page < 5) {
            return (
                <>
                    {Array.from({ length: page + 1 }, (_, index) => index + 1)?.map((item: number) => {
                        return (
                            <PaginationItem className="cursor-pointer" key={item} onClick={() => handlePage(item)}>
                                <PaginationLink>
                                    {item}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })
                    }
                    <PaginationEllipsis />
                    <PaginationItem className="cursor-pointer" onClick={() => handlePage(length)}>
                        <PaginationLink>
                            {length}
                        </PaginationLink>
                    </PaginationItem>
                </>
            )
        }
        if (page > length - 4) {
            return (
                <>
                    <PaginationItem className="cursor-pointer" onClick={() => handlePage(1)}>
                        <PaginationLink>
                            1
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationEllipsis />
                    {Array.from({ length: length - page + 2 }, (_, index) => page + index - 1)?.map((item: number) => {
                        return (
                            <PaginationItem className="cursor-pointer" key={item} onClick={() => handlePage(item)}>
                                <PaginationLink>
                                    {item}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    })
                    }
                </>
            )
        }
        return (
            <>
                <PaginationItem className="cursor-pointer" onClick={() => handlePage(1)}>
                    <PaginationLink>
                        1
                    </PaginationLink>
                </PaginationItem >
                <PaginationEllipsis />
                <PaginationItem className="cursor-pointer" onClick={() => handlePage(page - 1)}>
                    <PaginationLink>
                        {page - 1}
                    </PaginationLink>
                </PaginationItem >
                <PaginationItem className="cursor-pointer" onClick={() => handlePage(page)}>
                    <PaginationLink>
                        {page}
                    </PaginationLink>
                </PaginationItem >
                <PaginationItem className="cursor-pointer" onClick={() => handlePage(page + 1)}>
                    <PaginationLink>
                        {page + 1}
                    </PaginationLink>
                </PaginationItem >
                <PaginationEllipsis />
                <PaginationItem className="cursor-pointer" onClick={() => handlePage(length)}>
                    <PaginationLink>
                        {length}
                    </PaginationLink>
                </PaginationItem >
            </>
        )
    }

    const PaginationEllipsis = () => {
        return (
            <Popover>
                <PopoverTrigger>
                    <PaginationItem>
                        <PaginationLink>
                            <Ellipsis />
                        </PaginationLink>
                    </PaginationItem>
                </PopoverTrigger>
                <PopoverContent className="text-sm flex gap-3 items-center">
                    Trang:
                    <Input type="number" className="h-7" ref={ref} />
                    <Button variant={"outline"} size={"sm"} onClick={() => handleGoto()}>Đi tới</Button>
                </PopoverContent>
            </Popover>
        )
    }
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem className="cursor-pointer" onClick={() => page > 1 && handlePage(page - 1)}>
                    <PaginationPrevious />
                </PaginationItem>
                <PageList />
                <PaginationItem className="cursor-pointer" onClick={() => page < length && handlePage(page + 1)}>
                    <PaginationNext />
                </PaginationItem>
            </PaginationContent>
        </Pagination>

    )
}