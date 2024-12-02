const Position = require('../models/position');

// Thêm vị trí
exports.addPosition = async (req, res) => {
    try {
        const { id, name } = req.body;

        // Kiểm tra tính hợp lệ của name
        if (!name || typeof name !== 'string' || name.trim() === '') {
            return res.status(400).json({ message: 'Position name must be a valid, non-empty string' });
        }

        const normalizedName = name.trim();

        if (id) {
            if (typeof id !== 'string') {
                return res.status(400).json({ message: 'Position ID must be a valid string' });
            }

            const existingPosition = await Position.findByPk(id);
            if (existingPosition) {
                return res.status(400).json({ message: 'Position with the given ID already exists' });
            }
        }

        // Tạo vị trí mới
        const newPosition = await Position.create({
            id: id || undefined,
            name: normalizedName,
        });

        return res.status(201).json({ message: 'Position created successfully', position: newPosition });
    } catch (error) {
        console.error('Error in addPosition:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Xóa vị trí
exports.deletePosition = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: 'Invalid position ID' });
        }

        const position = await Position.findByPk(id);
        if (!position) {
            return res.status(404).json({ message: 'Position not found' });
        }

        await position.destroy();
        return res.status(200).json({ message: 'Position deleted successfully' });
    } catch (error) {
        console.error('Error in deletePosition:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Cập nhật vị trí
exports.updatePosition = async (req, res) => {
    try {
        const { id, name } = req.body;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({ message: 'Invalid position ID' });
        }

        const position = await Position.findByPk(id);
        if (!position) {
            return res.status(404).json({ message: 'Position not found' });
        }

        if (name && (typeof name !== 'string' || name.trim() === '')) {
            return res.status(400).json({ message: 'Position name must be a valid, non-empty string' });
        }

        position.name = name ? name.trim() : position.name;

        await position.save();
        return res.status(200).json({ message: 'Position updated successfully', position });
    } catch (error) {
        console.error('Error in updatePosition:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

// Lấy thông tin vị trí theo ID hoặc tất cả nếu không có ID
exports.getPositions = async (req, res) => {
    try {
        const { id, name } = req.query; // Hỗ trợ tìm kiếm theo name qua query params

        if (id) {
            const position = await Position.findByPk(id);
            if (!position) {
                return res.status(404).json({ message: 'Position not found' });
            }
            return res.status(200).json(position);
        }

        // Nếu có `name`, tìm kiếm theo tên
        const whereClause = {};
        if (name && typeof name === 'string' && name.trim() !== '') {
            whereClause.name = { [Op.like]: `%${name.trim()}%` };
        }

        const positions = await Position.findAll({ where: whereClause });
        return res.status(200).json(positions);
    } catch (error) {
        console.error('Error in getPositions:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
