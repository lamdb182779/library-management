"use client"

import { ReactNode, useRef } from 'react';
import useSWRMutation from 'swr/mutation';
import { posterNoCookie } from '@/service/fetch';
import { Input } from './ui/input';
import { X } from 'lucide-react';

const ImageUpload = ({
    children,
    setImageUrl,
    imageUrl,
    folder
}: {
    children: ReactNode
    setImageUrl: Function
    imageUrl: string
    folder: string
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    }

    const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME

    const { trigger, isMutating } = useSWRMutation(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, posterNoCookie)
    const handleUpload = async (file: File) => {
        if (file) {
            const formData = new FormData()
            formData.append("file", file)
            formData.append("upload_preset", "qldtapp")
            formData.append("folder", folder)
            const upload = await trigger(formData)
            if (upload) setImageUrl(upload.secure_url)
        }
    }
    const handleClear = (event: any) => {
        event.stopPropagation()
        setImageUrl("")
    }
    return (
        <div className='relative'>
            <div className='cursor-pointer' onClick={() => handleClick()}>
                <Input
                    ref={inputRef}
                    className='hidden'
                    id="author-image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleUpload(e.target.files?.[0] as File)}
                    disabled={isMutating}
                />
                {children}
            </div>
            {imageUrl && <div onClick={(event) => handleClear(event)} className='flex cursor-pointer absolute justify-center items-center rounded-full border p-1 right-0 top-0'><X size={10} /></div>
            }
        </div>
    );
};

export default ImageUpload;