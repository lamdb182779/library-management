const Author = require('../models/author');

//Thêm tác giả
exports.addAuthor = async (req, res) => {
    try {
        // Kiểm tra xem name có được cung cấp và hợp lệ hay không
        if (!req.body.name || typeof req.body.name !== 'string' || req.body.name.trim() === '') {
            console.log('Author name must be a valid');
            return res.status(400).json({ message: 'Author name must be a valid' });
        }

        const { id, name, image, describe } = req.body;

        // Nếu `id` được cung cấp, kiểm tra xem nó có tồn tại trong bảng Authors hay chưa
        if (id) {
            const existingAuthor = await Author.findByPk(id);
            console.log(existingAuthor);
            if (existingAuthor) {
                return res.status(400).json({ message: 'Author with the given ID already exists' });
            }
        }

        const newAuthor = await Author.create({
            id: id || undefined, // Nếu `id` là null sẽ tự tạo UUID
            name,
            image,
            describe
        });

        return res.status(201).json({ message: 'Author created successfully', author: newAuthor });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

//Xóa tác giả
exports.deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra xem tác giả với `id` có tồn tại không
        const author = await Author.findByPk(id);
        
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        // Xóa tác giả
        await author.destroy();
        
        return res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

//Cập nhật tác giả
exports.updateAuthor = async (req, res) => {
    try {
        const {id, name, image, describe } = req.body;
        
        // Kiểm tra quyền: Chỉ cho phép admin hoặc người dùng có quyền chỉnh sửa

        
        // Kiểm tra xem tác giả với `id` có tồn tại không
        const author = await Author.findByPk(id);
        
        if (!author) {
            return res.status(404).json({ message: 'Author not found' });
        }

        // Kiểm tra tính hợp lệ của tên nếu có
        if (name && (typeof name !== 'string' || name.trim() === '')) {
            return res.status(400).json({ message: 'Author name must be a valid, non-empty string' });
        }

        // Cập nhật thông tin mới cho tác giả
        author.name = name || author.name;
        author.image = image || author.image;
        author.describe = describe || author.describe;

        await author.save();

        // Trả về phản hồi thành công với thông tin tác giả cập nhật
        return res.status(200).json({ message: 'Author updated successfully', author });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};