const express = require('express');
const ReaderController = require('../controllers/readerController');

const router = express.Router();

// Xem danh sách sách đã mượn
router.get('/:readerId/borrowed-books', ReaderController.viewBorrowedBooks);

// Gia hạn sách
router.post('/:readerId/renew/:bookId', ReaderController.renewBook);

// Tra cứu sách
router.get('/search-books', ReaderController.searchBooks);

module.exports = router;