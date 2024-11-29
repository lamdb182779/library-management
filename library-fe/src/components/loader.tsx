import React from "react";
import { cn } from "@/lib/utils"; // Hàm merge class của ShadCN UI (nếu không có, bạn có thể dùng clsx)

interface LoaderProps {
    visible: boolean; // Điều kiện hiển thị loader
}

const Loader: React.FC<LoaderProps> = ({ visible }) => {
    if (!visible) return null

    return (
        <div
            className={cn(
                "fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50",
                "cursor-not-allowed"
            )}
        >
            <div className="flex flex-col items-center gap-4 text-white">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-t-transparent border-white"></div>
                <p className="text-lg">Đang tải thông tin, vui lòng đợi</p>
            </div>
        </div>
    )
}

export default Loader;