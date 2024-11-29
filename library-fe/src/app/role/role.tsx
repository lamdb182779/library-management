import { SquarePen } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import useSWRMutation from "swr/mutation"
import { updater } from "@/service/fetch"

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
                                    <DropdownMenuItem className="cursor-pointer" onClick={() => changeRole(item)}>
                                        {roles[item - 1]}
                                    </DropdownMenuItem >
                                }
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            }
            {roles[role - 1]}
        </div >
    )
}