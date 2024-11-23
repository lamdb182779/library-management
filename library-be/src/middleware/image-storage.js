const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const cloudinary = require('../config/cloudinaryConfig');

// Thư mục lưu trữ bìa sách
const bookImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'book-images', 
      allowed_formats: ['jpg', 'jpeg', 'png']
    }
});

// Thư mục lưu trữ ảnh tác giả
const authorImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'author-images', 
      allowed_formats: ['jpg', 'jpeg', 'png']
    }
});

// Thư mục lưu trữ avata người dùng
const userImageStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'user-images', 
      allowed_formats: ['jpg', 'jpeg', 'png']
    }
});
  

const uploadBookImage = multer({ storage: bookImageStorage });
const uploadAuthorImage = multer({ storage: authorImageStorage });
const uploadUserImage = multer({ storage: userImageStorage });
  
module.exports = { uploadBookImage, uploadAuthorImage, uploadUserImage };
  
