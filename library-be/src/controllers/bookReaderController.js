const { BookReader, Book, User } = require('../models');

const bookReaderController = {
  // Thêm phiếu mượn
  addBookReader: async (req, res) => {
    const { readerId, bookId, startDate, duration } = req.body;

    try {
      const book = await Book.findByPk(bookId);
      if (!book) {
        return res.status(404).json({ message: 'Không tìm thấy sách' });
      }

      const reader = await User.findByPk(readerId);
      if (!reader) {
        return res.status(404).json({ message: 'Người dùng không tồn tại' });
      }

      const expiredDate = new Date(startDate);
      expiredDate.setDate(expiredDate.getDate() + duration);

      const newBookReader = await BookReader.create({
        bookId,
        readerId,
        startedDate: startDate,
        expiredDate,
        isExtended: false,
        isReturned: false,
      });

      res.status(201).json({ message: 'Thêm phiếu mượn thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi thêm phiếu mượn', error });
    }
  }
};

module.exports = bookReaderController;
