"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { poster } from "@/service/fetch";
import useSWRMutation from "swr/mutation";
import { PublisherSelect } from "./publisher-select";
import { AuthorSelect } from "./author-select";
import { TagSelect } from "./tag-select";
import { PositionSelect } from "./position-select";

export function AddNew({
    mutate
}: {
    mutate: Function
}) {
    const [name, setName] = useState("");
    const [describe, setDescribe] = useState("");
    const [publisher, setPublisher] = useState<any>(null)
    const [authors, setAuthors] = useState<any[]>([])
    const [tags, setTags] = useState<any[]>([])
    const [positions, setPositions] = useState<any[]>([])
    const [quantity, setQuantity] = useState(1);

    const { trigger, isMutating } = useSWRMutation(`/book`, poster)

    const handleSubmit = async () => {
        const post = await trigger({
            name,
            describe,
            publisherId: publisher.id,
            authorIds: authors.map(author => author.id),
            tagIds: tags.map(tag => tag.id),
            positionIds: positions.map(position => position.id),
            quantity,
        });
        if (post) {
            mutate();
            setName("");
            setDescribe("");
            setPublisher(null);
            setAuthors([]);
            setTags([]);
            setPositions([]);
            setQuantity(1);
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
                        <p>Thêm mới sách</p>
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
                        Thêm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
