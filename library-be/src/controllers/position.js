const Position = require('../models/position');

// Thêm vị trí
exports.addPosition = async (req, res) => {
    try {
        // Kiểm tra xem name có được cung cấp và hợp lệ hay không
        if (!req.body.name || typeof req.body.name !== 'string' || req.body.name.trim() === '') {
            console.log('Position name must be valid');
            return res.status(400).json({ message: 'Position name must be valid' });
        }

        const { id, name } = req.body;

        // Nếu `id` được cung cấp, kiểm tra xem nó có tồn tại trong bảng Positions hay chưa
        if (id) {
            const existingPosition = await Position.findByPk(id);
            console.log(existingPosition);
            if (existingPosition) {
                return res.status(400).json({ message: 'Position with the given ID already exists' });
            }
        }

        const newPosition = await Position.create({
            id: id || undefined, // Nếu `id` là null sẽ tự tạo UUID
            name
        });

        return res.status(201).json({ message: 'Position created successfully', position: newPosition });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// Xóa vị trí
exports.deletePosition = async (req, res) => {
    try {
        const { id } = req.params;

        // Kiểm tra xem vị trí với `id` có tồn tại không
        const position = await Position.findByPk(id);
        
        if (!position) {
            return res.status(404).json({ message: 'Position not found' });
        }

        // Xóa vị trí
        await position.destroy();
        
        return res.status(200).json({ message: 'Position deleted successfully' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// Cập nhật vị trí
exports.updatePosition = async (req, res) => {
    try {
        const { id, name } = req.body;
        
        // Kiểm tra xem vị trí với `id` có tồn tại không
        const position = await Position.findByPk(id);
        
        if (!position) {
            return res.status(404).json({ message: 'Position not found' });
        }

        // Kiểm tra tính hợp lệ của tên nếu có
        if (name && (typeof name !== 'string' || name.trim() === '')) {
            return res.status(400).json({ message: 'Position name must be a valid, non-empty string' });
        }

        // Cập nhật thông tin mới cho vị trí
        position.name = name || position.name;

        await position.save();

        // Trả về phản hồi thành công với thông tin vị trí cập nhật
        return res.status(200).json({ message: 'Position updated successfully', position });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};

// Lấy thông tin vị trí theo ID hoặc tất cả nếu không có ID
exports.getPositions = async (req, res) => {
    try {
        const { id } = req.params;

        // Nếu `id` tồn tại, tìm vị trí theo ID
        if (id) {
            const position = await Position.findByPk(id);

            if (!position) {
                return res.status(404).json({ message: 'Position not found' });
            }

            return res.status(200).json(position);
        } 

        // Nếu không có `id`, trả về tất cả vị trí
        const positions = await Position.findAll();
        return res.status(200).json(positions);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
};
