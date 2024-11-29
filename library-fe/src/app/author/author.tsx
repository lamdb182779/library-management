"use client"

import Image from "next/image";
import light from "@/assets/unknown-light.png"
import dark from "@/assets/unknown-dark.png"
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { Update } from "./update";

export default function Author({
    author, mutate
}: {
    author: {
        id: string,
        name: string,
        image?: string,
        describe?: string
    }
    mutate: Function
}) {
    const router = useRouter()
    const { theme } = useTheme()
    return (
        <div onClick={() => router.push(`/book?author=${author.name}`)} className="flex flex-col cursor-pointer relative">
            <div className="w-[180px] h-[180px] relative">
                <Image
                    className="object-cover rounded-full"
                    fill
                    src={author.image || (theme === "dark" ? dark : light)}
                    alt={author.name || ""} />
            </div>
            <div className="text-center text-wrap w-[180px]">{author.name}</div>
            <div onClick={(event) => event.stopPropagation()} className="absolute right-0">
                <Update mutate={mutate} author={author} />
            </div>
        </div>
    )
}