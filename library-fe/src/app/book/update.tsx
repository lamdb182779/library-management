"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { PenSquare } from "lucide-react";
import { Label } from "@/components/ui/label";
import { updater } from "@/service/fetch";
import useSWRMutation from "swr/mutation";
import { PublisherSelect } from "./publisher-select";
import { AuthorSelect } from "./author-select";
import { TagSelect } from "./tag-select";
import { PositionSelect } from "./position-select";

export function Update({
    mutate,
    book
}: {
    mutate: Function,
    book: {
        id: string,
        name: string,
        image?: string,
        describe?: string,
        Authors: any[],
        Positions: any[],
        Publisher: any,
        Tags: any[],
        quantity: number
    }
}) {
    const [name, setName] = useState(book.name);
    const [describe, setDescribe] = useState(book.describe);
    const [publisher, setPublisher] = useState<any>(book.Publisher)
    const [authors, setAuthors] = useState<any[]>(book.Authors)
    const [tags, setTags] = useState<any[]>(book.Tags)
    const [positions, setPositions] = useState<any[]>(book.Positions)
    const [quantity, setQuantity] = useState(book.quantity);

    const { trigger, isMutating } = useSWRMutation(`/book/${book.id}`, updater)

    const handleSubmit = async () => {
        const update = await trigger({
            name,
            describe,
            publisherId: publisher.id,
            authorIds: authors.map(author => author.id),
            tagIds: tags.map(tag => tag.id),
            positionIds: positions.map(position => position.id),
            quantity,
        });
        if (update) {
            mutate();
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
                <DialogHeader className="md:text-center font-semibold">Thêm sách</DialogHeader>
                <div className="space-y-2">
                    <Label htmlFor="name">Tên sách</Label>
                    <Input
                        id="name"
                        placeholder="Nhập tên sách"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="describe">Mô tả</Label>
                    <Textarea
                        id="describe"
                        placeholder="Nhập mô tả"
                        value={describe}
                        onChange={(e) => setDescribe(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="publisher">Nhà xuất bản</Label>
                    <PublisherSelect publisher={publisher} setPublisher={setPublisher} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="authors">Tác giả</Label>
                    <AuthorSelect authors={authors} setAuthors={setAuthors} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="tags">Thể loại</Label>
                    <TagSelect tags={tags} setTags={setTags} />
                </div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                        <Label htmlFor="positions">Vị trí</Label>
                        <PositionSelect positions={positions} setPositions={setPositions} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="quantity">Số lượng</Label>
                        <Input
                            id="quantity"
                            type="number"
                            placeholder="Nhập số lượng"
                            value={quantity}
                            onChange={(e) => setQuantity(Math.floor(Number(e.target.value)))}
                            min={1}
                            step={10}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={isMutating} onClick={() => handleSubmit()}>
                        Cập nhật
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
