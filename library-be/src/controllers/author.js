const Author = require('../models/author');

// Helper function: Validate ID and find author
const findAuthorById = async (id, res) => {
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    const author = await Author.findByPk(id);
    if (!author) {
        return res.status(404).json({ message: 'Author not found' });
    }
    return author;
};

// Thêm tác giả
exports.addAuthor = async (req, res) => {
    try {
        const { id, name, image, describe } = req.body;

        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ message: 'Author name must be a valid, non-empty string' });
        }

        if (id) {
            const existingAuthor = await Author.findByPk(id);
            if (existingAuthor) {
                return res.status(400).json({ message: 'Author with the given ID already exists' });
            }
        }

        const newAuthor = await Author.create({
            id: id || undefined,
            name,
            image,
            describe
        });

        return res.status(201).json({ message: 'Author created successfully', author: newAuthor });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Xóa tác giả
exports.deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params;
        const author = await findAuthorById(id, res);
        if (!author) return; // Error response already sent by findAuthorById

        await author.destroy();
        return res.status(200).json({ message: 'Author deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Cập nhật tác giả
exports.updateAuthor = async (req, res) => {
    try {
        const { id, name, image, describe } = req.body;
        const author = await findAuthorById(id, res);
        if (!author) return;

        if (name && (typeof name !== 'string' || name.trim() === '')) {
            return res.status(400).json({ message: 'Author name must be a valid, non-empty string' });
        }

        author.name = name || author.name;
        author.image = image || author.image;
        author.describe = describe || author.describe;

        await author.save();
        return res.status(200).json({ message: 'Author updated successfully', author });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// Lấy thông tin tác giả theo ID hoặc tất cả
exports.getAuthors = async (req, res) => {
    try {
        const { id } = req.params;

        if (id) {
            const author = await findAuthorById(id, res);
            if (!author) return;

            return res.status(200).json(author);
        }

        const authors = await Author.findAll();
        return res.status(200).json(authors);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
