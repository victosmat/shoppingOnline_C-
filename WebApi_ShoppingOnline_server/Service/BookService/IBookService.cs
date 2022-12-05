using Microsoft.AspNetCore.Mvc.RazorPages;
using WebApi_ShoppingOnline.Entity;

namespace WebApi_ShoppingOnline.Service.BookService
{
    public interface IBookService
    {
        List<Book> GetBooks(int pageNumber, int pageSize);
        List<string> GetCategory();
        Book AddBook(Book book);
        Book UpdateBook(Book book);
        int DeleteBook(int bookID);
        Book GetBooksById(int bookID);
        List<Book> GetBookByCategory(string bookCategory);
        List<Book> GetBookByKeyword(string bookKeyword);
        int GetNumberOfBook(int pageSize);
    }
}
