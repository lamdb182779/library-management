const Publisher = require('../models/publisher');

// Thêm nhà xuất bản mới
exports.addPublisher = async (req, res) => {
    try {
        // Kiểm tra xem name có được cung cấp và hợp lệ hay không
        if (!req.body.name || typeof req.body.name !== 'string' || req.body.name.trim() === '') {
            console.log('Publisher name must be a valid');
            return res.status(400).json({ message: 'Publisher name must be a valid' });
        }

        const { id, name } = req.body;

        // Nếu `id` được cung cấp, kiểm tra xem nó có tồn tại trong bảng Publishers hay chưa
        if (id) {
            const existingPublisher = await Publisher.findByPk(id);
            if (existingPublisher) {
                return res.status(400).json({ message: 'Publisher with the given ID already exists' });
            }
        }

        const newPublisher = await Publisher.create({
            id: id || undefined, // Nếu `id` là null sẽ tự tạo UUID
            name
        });

        return res.status(201).json({ message: 'Publisher created successfully', publisher: newPublisher });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// Xóa nhà xuất bản
exports.deletePublisher = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra xem nhà xuất bản với `id` có tồn tại không
        const publisher = await Publisher.findByPk(id);
        
        if (!publisher) {
            return res.status(404).json({ message: 'Publisher not found' });
        }

        // Xóa nhà xuất bản
        await publisher.destroy();
        
        return res.status(200).json({ message: 'Publisher deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// Cập nhật nhà xuất bản
exports.updatePublisher = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Kiểm tra xem nhà xuất bản với `id` có tồn tại không
        const publisher = await Publisher.findByPk(id);
        
        if (!publisher) {
            return res.status(404).json({ message: 'Publisher not found' });
        }

        // Kiểm tra tính hợp lệ của tên nếu có
        if (name && (typeof name !== 'string' || name.trim() === '')) {
            return res.status(400).json({ message: 'Publisher name must be a valid, non-empty string' });
        }

        // Cập nhật thông tin mới cho nhà xuất bản
        publisher.name = name || publisher.name;

        await publisher.save();

        // Trả về phản hồi thành công với thông tin nhà xuất bản đã cập nhật
        return res.status(200).json({ message: 'Publisher updated successfully', publisher });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
