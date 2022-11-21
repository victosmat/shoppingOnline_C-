using WebApi_ShoppingOnline.Entity;

namespace WebApi_ShoppingOnline.Service.BookService
{
    public interface IBookService
    {
        List<Book> GetBooks();
        Book AddBook(Book book);
        Book UpdateBook(Book book);
        int DeleteBook(int bookID);
    }
}
