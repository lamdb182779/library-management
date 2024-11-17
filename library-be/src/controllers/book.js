const Book = require('../models/book');

// Thêm sách
exports.addBook = async (req, res) => {
    try {
        // Kiểm tra xem name có được cung cấp và hợp lệ hay không
        if (!req.body.name || typeof req.body.name !== 'string' || req.body.name.trim() === '') {
            console.log('Book name must be valid');
            return res.status(400).json({ message: 'Book name must be valid' });
        }

        const { id, name, publisherId, image, describe, quantity } = req.body;

        // Nếu `id` được cung cấp, kiểm tra xem nó có tồn tại trong bảng Books hay chưa
        if (id) {
            const existingBook = await Book.findByPk(id);
            console.log(existingBook);
            if (existingBook) {
                return res.status(400).json({ message: 'Book with the given ID already exists' });
            }
        }

        const newBook = await Book.create({
            id: id || undefined, // Nếu `id` là null sẽ tự tạo UUID
            name,
            publisherId,
            image,
            describe,
            quantity
        });

        return res.status(201).json({ message: 'Book created successfully', book: newBook });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// Xóa sách
exports.deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra xem sách với `id` có tồn tại không
        const book = await Book.findByPk(id);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Xóa sách
        await book.destroy();
        
        return res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// Cập nhật sách
exports.updateBook = async (req, res) => {
    try {
        const { id, name, publisherId, image, describe, quantity } = req.body;
        
        // Kiểm tra quyền: Chỉ cho phép admin hoặc người dùng có quyền chỉnh sửa
        
        // Kiểm tra xem sách với `id` có tồn tại không
        const book = await Book.findByPk(id);
        
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        // Kiểm tra tính hợp lệ của tên nếu có
        if (name && (typeof name !== 'string' || name.trim() === '')) {
            return res.status(400).json({ message: 'Book name must be a valid, non-empty string' });
        }

        // Cập nhật thông tin mới cho sách
        book.name = name || book.name;
        book.publisherId = publisherId || book.publisherId;
        book.image = image || book.image;
        book.describe = describe || book.describe;
        book.quantity = quantity || book.quantity;

        await book.save();

        // Trả về phản hồi thành công với thông tin sách cập nhật
        return res.status(200).json({ message: 'Book updated successfully', book });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// Lấy thông tin sách theo ID hoặc tất cả nếu không có ID, hỗ trợ phân trang
exports.getBooks = async (req, res) => {
    try {
        const { id } = req.params;
        const { page } = req.params; 

        // Nếu `id` tồn tại, tìm sách theo ID
        if (id) {
            const book = await Book.findByPk(id);

            if (!book) {
                return res.status(404).json({ message: 'Book not found' });
            }

            return res.status(200).json(book);
        }

        // Kiểm tra nếu có tham số `page`
        if (page !== undefined) {
            // Kiểm tra `page` có phải là số nguyên dương hay không
            const pageNumber = parseInt(page, 10);
            if (isNaN(pageNumber) || pageNumber <= 0) {
                return res.status(404).json({ message: 'Not Found' });
            }

            // Phân trang
            const pageSize = 10;
            const offset = (pageNumber - 1) * pageSize;

            // Truy vấn sách theo trang
            const books = await Book.findAll({ offset, limit: pageSize });

            if (books.length === 0) {
                return res.status(404).json({ message: 'Not Found' });
            }

            return res.status(200).json(books);
        }

        // Nếu không có tham số `page`, trả về tất cả sách
        const books = await Book.findAll();
        return res.status(200).json(books);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};