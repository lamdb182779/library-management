const Book = require('../models/book');
const Author = require('../models/author');
const Tag = require('../models/tag');

const testDB = async () => {
    try {
        const newBook = await Book.create({ title: 'Sample Book', authorId: 1 });
        console.log('oke tao thanh cong ', newBook);

        const book = await Book.findByPk(1);
        console.log('oke thay sach', book);


        const newAuthor = await Author.create({ name: 'Sample Author' });
        console.log('tao tacgia moi:', newAuthor);

        const author = await Author.findByPk(1);
        console.log('tim kiem tac gia:', author);

        const tag = await Tag.findByPk(1);
        console.log('Found Tag:', tag);


        
        const allBooks = await Book.findAll();
        console.log('tat ca sach:', allBooks);



    } catch (error) {
        console.error('Error:', error);
    }
};

testDB();