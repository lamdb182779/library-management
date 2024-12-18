import { SquarePen } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import useSWRMutation from "swr/mutation"
import { updater } from "@/service/fetch"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

export default function Role({
    role,
    id,
    mutate
}: {
    role: number,
    id: string,
    mutate: Function
}
) {

    const { trigger, isMutating } = useSWRMutation(`/user/role/${id}`, updater)

    const changeRole = async (item: number) => {
        const update = await trigger({ role: item })
        if (update) mutate()
    }
    const [isOpen, setisOpen] = useState(false)

    const roles = ["Admin", "Thủ thư", "Người đọc"]
    return (
        <div className="flex items-center justify-end gap-1">
            {role !== 1 &&
                <DropdownMenu>
                    <DropdownMenuTrigger disabled={isMutating}>
                        <SquarePen size={20} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {[1, 2, 3].map((item: number) =>
                            <>
                                {item !== role &&
                                    <DropdownMenuItem className="cursor-pointer" onClick={() => item === 1 ? setisOpen(true) : changeRole(item)}>
                                        {roles[item - 1]}
                                    </DropdownMenuItem >
                                }
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            }
            {roles[role - 1]}

            <AlertDialog open={isOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Bạn có chắc muốn thêm quyền admin không?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Hành động này không thường xuyên xảy ra. Cảnh báo này để đảm bảo bạn không nhầm lẫn khi thêm quyền admin cho người dùng này.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setisOpen(false)}>Từ bỏ</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => changeRole(1)}>Tiếp tục</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div >
    )
}