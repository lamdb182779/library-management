"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectTrigger,
} from "@/components/ui/select"
import { fetcher, poster } from "@/service/fetch"
import { useState } from "react"
import useSWR from "swr"
import useSWRMutation from "swr/mutation"

export function TagSelect({
    tags,
    setTags
}: {
    tags: any[],
    setTags: Function
}) {
    const [keyword, setKeyword] = useState("")
    const { data, isLoading, mutate } = useSWR(`/tag?keyword=${keyword}`, fetcher)
    const { trigger, isMutating } = useSWRMutation("/tag", poster)
    const handleAdd = async () => {
        const post = await trigger({
            name: keyword
        })
        if (post) mutate()
    }
    return (
        <>
            <Select>
                <SelectTrigger className="text-wrap">
                    {tags?.length > 0 ? tags.map((item: any) => item.name).join(", ") : "Chọn thể loại"}
                </SelectTrigger>
                <SelectContent className="pt-0">
                    <Input
                        className="mb-1"
                        id="book-tag"
                        placeholder="Nhập tên thể loại"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <SelectGroup>
                        {isLoading === false &&
                            <>
                                {data?.result?.length > 0 ?
                                    <>
                                        {data.result.map((item: any) => {
                                            if (!tags.map(tag => tag.id).includes(item.id)) return <div
                                                onClick={() => setTags((pre: any) => [...pre, item])}
                                                className="cursor-pointer select-none rounded-md p-2 text-sm dark:text-white hover dark:hover:bg-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                key={item.id} >
                                                {item.name}
                                            </div>
                                            return <div
                                                onClick={() => setTags((pre: any) => pre.filter((it: any) => it.id !== item.id))}
                                                className="cursor-pointer select-none rounded-md p-2 text-sm dark:text-white hover dark:hover:bg-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 line-through"
                                                key={item.id} >
                                                {item.name}
                                            </div>
                                        }
                                        )}
                                    </>
                                    :
                                    <>
                                        <Button
                                            disabled={isMutating}
                                            className="w-full"
                                            size="sm"
                                            variant={"outline"}
                                            onClick={() => handleAdd()}>
                                            Không tìm thấy thể loại này, thêm mới?
                                        </Button>
                                    </>
                                }
                            </>
                        }
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}