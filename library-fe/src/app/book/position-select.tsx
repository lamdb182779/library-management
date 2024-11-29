"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectTrigger,
} from "@/components/ui/select"
import { fetcher } from "@/service/fetch"
import { useState } from "react"
import useSWR from "swr"

export function PositionSelect({
    positions,
    setPositions
}: {
    positions: any[],
    setPositions: Function
}) {
    const { data, isLoading, mutate } = useSWR(`/position`, fetcher)

    return (
        <>
            <Select>
                <SelectTrigger className="text-wrap">
                    {positions?.length > 0 ? positions.map((item: any) => item.name).join(", ") : "Chọn vị trí"}
                </SelectTrigger>
                <SelectContent className="pt-0">
                    <SelectGroup>
                        {isLoading === false &&
                            <>
                                {data?.result?.length > 0 &&
                                    <>
                                        {data.result.map((item: any) => {
                                            if (!positions.includes(item)) return <div
                                                onClick={() => setPositions((pre: any) => [...pre, item])}
                                                className="cursor-pointer select-none rounded-md p-2 text-sm dark:text-white hover dark:hover:bg-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                                key={item.id} >
                                                {item.name}
                                            </div>
                                            return <div
                                                onClick={() => setPositions((pre: any) => pre.filter((it: any) => it.id !== item.id))}
                                                className="cursor-pointer select-none rounded-md p-2 text-sm dark:text-white hover dark:hover:bg-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 line-through"
                                                key={item.id} >
                                                {item.name}
                                            </div>
                                        }
                                        )}
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