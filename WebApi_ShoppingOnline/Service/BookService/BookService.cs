using WebApi_ShoppingOnline.Entity;

namespace WebApi_ShoppingOnline.Service.BookService
{
    public class BookService : IBookService
    {
        private IBookService _bookService;
        public BookService()
        {
            _bookService = new BookService();
        }
        public Book AddBook(Book book)
        {
            return _bookService.AddBook(book);
        }

        public int DeleteBook(int bookID)
        {
            return _bookService.DeleteBook(bookID);
        }

        public List<Book> GetBooks()
        {
            return _bookService.GetBooks();
        }

        public Book UpdateBook(Book book)
        {
            return _bookService.UpdateBook(book);
        }
    }
}
