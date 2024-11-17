const { Users, Book, BookReader, Publisher, Author, Tag } = require('../models');
const { Op } = require('sequelize');

const ReaderController = {
  // Xem danh sách sách đã mượn
  viewBorrowedBooks: async (req, res) => {
    const { readerId } = req.params;

    try {
      const borrowedBooks = await BookReader.findAll({
        where: { readerId, isReturned: false },
        include: [
            {
                model: Book,
                attributes: ['name', 'image'],
                include: [
                    {
                        model: Author,
                        attributes: ['name'],
                        through: { attributes: [] } 
                    },
                    {
                        model: Tag,
                        attributes: ['name'],
                        through: { attributes: [] } 
                    },
                    {
                        model: Publisher,
                        attributes: ['name']
                    }
                ]
            }
        ]
      });
      res.status(200).json(borrowedBooks);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi lấy danh sách sách đã mượn', error });
    }
  },

  // Gia hạn sách
  renewBook: async (req, res) => {
    const { readerId, bookId } = req.params;

    try {
      const bookReader = await BookReader.findOne({
        where: { bookId, readerId, isReturned: false }
      });

      if (!bookReader) {
        return res.status(404).json({ message: 'Không tìm thấy giao dịch mượn sách' });
      }

      // Kiểm tra nếu sách đã đc gia hạn trước đó
      if (bookReader.isExtended) {
        return res.status(400).json({ message: 'Không thể gia hạn thêm' });
      }

      // Gia hạn sách thêm 7 ngày
      const newExpiredDate = new Date(bookReader.expiredDate);
      newExpiredDate.setDate(newExpiredDate.getDate() + 7);
      bookReader.expiredDate = newExpiredDate;
      bookReader.isExtended = true;
      await bookReader.save();

      res.status(200).json({ message: 'Gia hạn sách thành công', bookReader });
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi gia hạn sách', error });
    }
  },

  // Tra cứu sách
  searchBooks: async (req, res) => {
    const { bookName, authorName, publisherName } = req.query;

    try {
      const books = await Book.findAll({
        where: {
          ...(bookName && { name: { [Op.iLike]: `%${bookName}%` } })
        },
        include: [
          {
            model: Author,
            where: authorName ? { name: { [Op.iLike]: `%${authorName}%` } } : {},
            attributes: ['name'],
            through: { attributes: [] }
          },
          {
            model: Publisher,
            where: publisherName ? { name: { [Op.iLike]: `%${publisherName}%` } } : {},
            attributes: ['name']
          }
        ]
      });

      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ message: 'Lỗi khi tìm kiếm sách', error });
    }
  }
};

module.exports = ReaderController;

