// const Book = require('../models');

// // exports.addBook = async (req, res) => {
// //     try {
// //         const newBook = new Book(req.body);
// //         const savedBook = await newBook.save();
// //         res.status(201).json(savedBook);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // exports.updateBook = async (req, res) => {
// //     try {
// //         const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //         if (!updatedBook) {
// //             return res.status(404).json({ message: 'Book not found' });
// //         }
// //         res.status(200).json(updatedBook);
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };

// // exports.deleteBook = async (req, res) => {
// //     try {
// //         const deletedBook = await Book.findByIdAndDelete(req.params.id);
// //         if (!deletedBook) {
// //             return res.status(404).json({ message: 'Book not found' });
// //         }
// //         res.status(200).json({ message: 'Book deleted successfully' });
// //     } catch (error) {
// //         res.status(500).json({ message: error.message });
// //     }
// // };


// //Book tags

// // Thêm booktag 
// // Xóa booktag
// exports.addBookTag = async (req, res) => {
//     try {
//         const book = await Book.findByPk(req.params.bookId);
//         if (!book) {
//             return res.status(404).json({ message: 'Book not found' });
//         }
//         const tag = await Tag.findByPk(req.params.tagId);
//         if (!tag) {
//             return res.status(404).json({ message: 'Tag not found' });
//         }
//         await book.addTag(tag);
//         res.status(200).json({ message: 'Tag added to book successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };