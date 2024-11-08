const Tag = require('../models/tag');

// Thêm tag mới
exports.addTag = async (req, res) => {
    try {
        // Kiểm tra xem name có được cung cấp và hợp lệ hay không
        if (!req.body.name || typeof req.body.name !== 'string' || req.body.name.trim() === '') {
            console.log('Tag name must be a valid');
            return res.status(400).json({ message: 'Tag name must be a valid' });
        }

        const { id, name, image, describe } = req.body;

        // Nếu `id` được cung cấp, kiểm tra xem nó có tồn tại trong bảng Tags hay chưa
        if (id) {
            const existingTag = await Tag.findByPk(id);
            if (existingTag) {
                return res.status(400).json({ message: 'Tag with the given ID already exists' });
            }
        }

        const newTag = await Tag.create({
            id: id || undefined, // Nếu `id` là null sẽ tự tạo UUID
            name,
            image,
            describe
        });

        return res.status(201).json({ message: 'Tag created successfully', tag: newTag });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// Xóa tag
exports.deleteTag = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra xem tag với `id` có tồn tại không
        const tag = await Tag.findByPk(id);
        
        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        // Xóa tag
        await tag.destroy();
        
        return res.status(200).json({ message: 'Tag deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// Cập nhật tag
exports.updateTag = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, image, describe } = req.body;

        // Kiểm tra xem tag với `id` có tồn tại không
        const tag = await Tag.findByPk(id);
        
        if (!tag) {
            return res.status(404).json({ message: 'Tag not found' });
        }

        // Kiểm tra tính hợp lệ của tên nếu có
        if (name && (typeof name !== 'string' || name.trim() === '')) {
            return res.status(400).json({ message: 'Tag name must be a valid, non-empty string' });
        }

        // Cập nhật thông tin mới cho tag
        tag.name = name || tag.name;
        tag.image = image || tag.image;
        tag.describe = describe || tag.describe;

        await tag.save();

        // Trả về phản hồi thành công với thông tin tag đã cập nhật
        return res.status(200).json({ message: 'Tag updated successfully', tag });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
