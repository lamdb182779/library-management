"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useState } from "react";
import { Plus } from "lucide-react"
import { Label } from "@/components/ui/label";
import { poster } from "@/service/fetch";
import useSWRMutation from "swr/mutation";
import ImageUpload from "@/components/image-upload";
import light from "@/assets/unknown-light.png"
import dark from "@/assets/unknown-dark.png"
import Image from "next/image";
import { useTheme } from "next-themes";

export function AddNew({
    mutate
}: {
    mutate: Function
}) {
    const [name, setName] = useState("");
    const [describe, setDescribe] = useState("");
    const [imageUrl, setImageUrl] = useState("")


    const { trigger, isMutating } = useSWRMutation(`/author`, poster)

    const { theme } = useTheme()

    const handleSubmit = async () => {
        const post = await trigger({
            name: name,
            describe: describe,
            image: imageUrl || undefined,
        })
        if (post) {
            mutate();
            setName("");
            setDescribe("");
            setImageUrl("")
        }
    };

    return (
        <Dialog>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger>
                        <DialogTrigger asChild>
                            <div className="w-[180px] h-[180px] flex justify-center items-center border rounded-lg hover:bg-neutral-100 hover:dark:bg-neutral-900">
                                <Plus size={50} />
                            </div>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                        <p>Thêm mới tác giả</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent>
                <DialogHeader className="md:text-center font-semibold">Thêm tác giả</DialogHeader>
                <div className="w-full justify-center flex">
                    <ImageUpload folder="author_images" imageUrl={imageUrl} setImageUrl={setImageUrl}>
                        <div className="w-[160px] h-[160px] relative">
                            <Image
                                className="object-cover rounded-full"
                                fill
                                src={imageUrl || (theme === "dark" ? dark : light)}
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
                    <Button disabled={isMutating} onClick={handleSubmit}>Thêm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
