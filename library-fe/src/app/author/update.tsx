"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react";
import { PenSquare } from "lucide-react"
import { Label } from "@/components/ui/label";
import { updater } from "@/service/fetch";
import useSWRMutation from "swr/mutation";
import Image from "next/image";
import ImageUpload from "@/components/image-upload";
import light from "@/assets/unknown-light.png"
import dark from "@/assets/unknown-dark.png"
import { useTheme } from "next-themes";

export function Update({
    author, mutate
}: {
    author: {
        id: string
        name: string
        describe?: string
        image?: string
    }
    mutate: Function
}) {
    const [name, setName] = useState(author.name);
    const [describe, setDescribe] = useState(author.describe);
    const [imageUrl, setImageUrl] = useState("")

    const { trigger, isMutating } = useSWRMutation(`/author/${author.id}`, updater)

    const { theme } = useTheme()

    const handleSubmit = async () => {
        const post = await trigger({
            name: name,
            describe: describe,
            image: imageUrl || undefined
        })
        if (post) {
            mutate()
        }
    };

    return (
        <Dialog>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <DialogTrigger asChild>
                            <Button variant={"outline"} size={"icon"} className="rounded-full border-none">
                                <PenSquare />
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>Chỉnh sửa thông tin</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent>
                <DialogHeader className="md:text-center font-semibold">Sửa thông tin</DialogHeader>
                <div className="w-full justify-center flex">
                    <ImageUpload folder="author_images" imageUrl={imageUrl} setImageUrl={setImageUrl}>
                        <div className="w-[160px] h-[160px] relative">
                            <Image
                                className="object-cover rounded-full"
                                fill
                                src={imageUrl || author.image || (theme === "dark" ? dark : light)}
                                alt={"image"} />
                        </div>
                    </ImageUpload>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="name">Tên tác giả</Label>
                    <Input
                        id="name"
                        placeholder="Nhập tên"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                        id="description"
                        placeholder="Nhập mô tả"
                        value={describe}
                        onChange={(e) => setDescribe(e.target.value)}
                    />
                </div>
                <DialogFooter>
                    <Button disabled={isMutating} onClick={() => handleSubmit()}>Thay đổi</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog >
    );
}
