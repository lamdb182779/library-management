"use client"

import { useState } from 'react';
import { CldUploadWidget } from 'next-cloudinary';

const ImageUpload = () => {
    const [imageUrl, setImageUrl] = useState('');

    const handleUploadSuccess = (result) => {
        if (result.event === 'success') {
            const url = result.info.secure_url;
            setImageUrl(url); // Lưu URL của hình ảnh đã tải lên
            console.log('URL hình ảnh:', url);
        }
    };

    return (
        <div className='pt-20'>
            <h2>Upload Image</h2>
            <CldUploadWidget
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME} // Cung cấp tên Cloudinary
                uploadPreset="your-upload"
                onSuccess={handleUploadSuccess}
                options={{
                    cropping: true,
                    multiple: false,
                    clientAllowedFormats: ['jpg', 'jpeg', 'png'],
                    theme: 'minimal',
                }}
            >
                {({ open }) => (
                    <button
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#3C8DBC',
                            color: 'white',
                            borderRadius: '50px', // Làm nút thành hình tròn
                            cursor: 'pointer',
                            border: 'none',
                        }}
                        onClick={open} // Mở widget tải lên khi nhấn nút
                    >
                        Upload Image
                    </button>
                )}
            </CldUploadWidget>

            {imageUrl && (
                <div>
                    <h3>Uploaded Image</h3>
                    <img src={imageUrl} alt="Uploaded" style={{ maxWidth: '300px', borderRadius: '50%' }} />
                </div>
            )}
        </div>
    );
};

export default ImageUpload;