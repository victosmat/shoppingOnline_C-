using WebApi_ShoppingOnline.Entity;

namespace WebApi_ShoppingOnline.Repository.BookRepository
{
    public interface IBookRepository
    {
        List<Book> GetBooks();
        Book AddBook(Book book);
        Book UpdateBook(Book book);
        int DeleteBook(int bookID);
    }
}
