using Dapper;
using MySqlConnector;
using System.Net;
using WebApi_ShoppingOnline.Entity;
using WebApi_ShoppingOnline.Repository;

namespace WebApi_ShoppingOnline.Service.BookService
{
    public class BookService : IBookService
    {
        static private string connectionString = DBConnection.ConnectionString;
        private MySqlConnection mySqlConnection = new MySqlConnection(connectionString);
        private DynamicParameters parameters = new DynamicParameters();

        public Book AddBook(Book book)
        {
            string stm = "insert into books (name, author, price , category, imageUrl)" +
                            " values (@name, @author, @price, @category, @imageUrl);";
            parameters.Add("@name", book.Name);
            parameters.Add("@author", book.Author);
            parameters.Add("@price", book.Price);
            parameters.Add("@category", book.Category);
            parameters.Add("@imageUrl", book.ImageUrl);
            mySqlConnection.Execute(stm, parameters);
            return book;
        }

        public int DeleteBook(int bookID)
        {
            string stm = "delete from books where id = @id";
            parameters.Add("@id", bookID);
            mySqlConnection.Execute(stm, parameters);
            return bookID;
        }

        public List<Book> GetBookByCategory(string bookCategory)
        {
            string stm = "select * from books where category = @category;";
            parameters.Add("@category", bookCategory);
            List<Book> books = mySqlConnection.Query<Book>(stm, parameters).ToList();
            return books;
        }

        public List<Book> GetBookByKeyword(string bookKeyword)
        {
            string stm = "select * from books where name like @bookKeyword or author like @bookKeyword or category like @bookKeyword;";
            parameters.Add("@bookKeyword", "%" + bookKeyword + "%");
            List<Book> books = mySqlConnection.Query<Book>(stm, parameters).ToList();
            return books;
        }

        public List<Book> GetBooks()
        {
            string stm = "select * from books";
            List<Book> books = mySqlConnection.Query<Book>(stm, parameters).ToList();
            return books;
        }

        public List<Book> GetBooksById(int bookID)
        {
            string stm = "select * from books where id = @id;";
            parameters.Add("@id", bookID);
            List<Book> books = mySqlConnection.Query<Book>(stm, parameters).ToList();
            return books;
        }

        public Book UpdateBook(Book book)
        {
            string stm = "UPDATE books SET name = @name, author = @author, price = @price, category = @category, imageUrl = @imageUrl" +
                                                         " WHERE id = @id;";
            parameters.Add("@id", book.Id);
            parameters.Add("@name", book.Name);
            parameters.Add("@author", book.Author);
            parameters.Add("@price", book.Price);
            parameters.Add("@category", book.Category);
            parameters.Add("@imageUrl", book.ImageUrl);
            mySqlConnection.Execute(stm, parameters);
            return book;
        }
    }
}
