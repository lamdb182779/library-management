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

export function PublisherSelect({
    publisher,
    setPublisher
}: {
    publisher: any,
    setPublisher: Function
}) {
    const [keyword, setKeyword] = useState("")
    const { data, isLoading, mutate } = useSWR(`/publisher?keyword=${keyword}`, fetcher)
    const { trigger, isMutating } = useSWRMutation("/publisher", poster)
    const handleAdd = async () => {
        const post = await trigger({
            name: keyword
        })
        if (post) mutate()
    }
    return (
        <>
            <Select>
                <SelectTrigger >
                    {publisher?.name || "Chọn nhà xuất bản"}
                </SelectTrigger>
                <SelectContent className="pt-0">
                    <Input
                        className="mb-1"
                        id="book-publisher"
                        placeholder="Nhập tên nhà xuất bản"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <SelectGroup>
                        {isLoading === false &&
                            <>
                                {data?.result?.length > 0 ?
                                    <>
                                        {data.result.map((item: any) =>
                                            <div
                                                onClick={() => setPublisher(item)}
                                                className="cursor-pointer select-none rounded-md p-2 text-sm dark:text-white hover dark:hover:bg-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                key={item.id} >
                                                {item.name}
                                            </div>
                                        )}
                                        <div
                                            onClick={() => setPublisher(null)}
                                            className="cursor-pointer select-none rounded-md p-2 text-sm dark:text-white hover dark:hover:bg-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" >
                                            Không rõ
                                        </div>
                                    </>
                                    :
                                    <>
                                        <Button
                                            disabled={isMutating}
                                            className="w-full"
                                            size="sm"
                                            variant={"outline"}
                                            onClick={() => handleAdd()}
                                        >
                                            Không tìm thấy nhà xuất bản này, thêm mới?
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