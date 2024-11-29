"use client"

import Image from "next/image";
import light from "@/assets/book-light.png"
import dark from "@/assets/book-dark.png"
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState, MouseEvent } from "react";

export default function Book({
    book
}: {
    book: {
        id: string,
        name: string,
        image?: string,
        describe?: string,
        Authors: any[],
        Positions: any[],
        Publisher: any,
        Tags: any[],
        quantity: number,
        borrowCount: number,
    }
}) {
    const router = useRouter()
    const { theme } = useTheme()
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Popover open={isOpen}>
            <PopoverTrigger className="outline-none"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}>
                <div className="flex flex-col cursor-pointer">
                    <div className="w-[150px] h-[180px] relative">
                        <Image
                            className="object-cover rounded"
                            fill
                            src={book.image || (theme === "dark" ? dark : light)}
                            alt={book.name || ""} />
                    </div>
                    <div className="text-center text-wrap w-[150px] text-sm">{book.name}</div>
                    <div className="text-center text-wrap w-[150px] text-xs italic">
                        {book?.Authors.map(item => item.name).join(", ")}
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto px-10">
                <div className="flex items-start gap-5 rounded-lg">
                    <div className="w-[120px] h-[180px] relative">
                        <Image
                            className="object-cover rounded"
                            fill
                            src={book.image || (theme === "dark" ? dark : light)}
                            alt={book.name || ""} />
                    </div>
                    <div className="h-[180px] py-5 grow space-y-2">
                        <div className="h-1/2 space-y-1">
                            <div className="text-lg font-semibold">{book.name} (hiện còn: {book.quantity - book.borrowCount})</div>
                            <div className="text-sm italic">{book?.Publisher.name}</div>
                            <div className="text-xs">{book?.Tags.map(item => item.name).join(", ")}</div>
                        </div>
                        <div className="w-[450px] text-sm line-clamp-3">{book.describe}</div>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}