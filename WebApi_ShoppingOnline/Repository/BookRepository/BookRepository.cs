using Dapper;
using MySqlConnector;
using WebApi_ShoppingOnline.Entity;

namespace WebApi_ShoppingOnline.Repository.BookRepository
{
    public class BookRepository : IBookRepository
    {
        static private string connectionString = DBConnection.ConnectionString;
        private MySqlConnection mySqlConnection = new MySqlConnection(connectionString);
        private DynamicParameters parameters = new DynamicParameters();
        public Book AddBook(Book book)
        {
            string stm = "insert into users (name, author, price , category, image_url)" +
                            " values (@name, @author, @price, @category, @image_url);";
            parameters.Add("@name", book.Name);
            parameters.Add("@author", book.Author);
            parameters.Add("@price", book.Price);
            parameters.Add("@category", book.Category);
            parameters.Add("@image_url", book.ImageUrl);
            mySqlConnection.Execute(stm, parameters);
            return book;
        }

        public int DeleteBook(int bookID)
        {
            String stm = "delete from books where id = @id";
            parameters.Add("@id", bookID);
            mySqlConnection.Execute(stm, parameters);
            return bookID;
        }

        public List<Book> GetBooks()
        {
            string stm = "select * from books";
            using (mySqlConnection)
            {
                var books = mySqlConnection.Query<Book>(stm).ToList();
                return books;
            }
        }

        public Book UpdateBook(Book book)
        {
            String stm = "UPDATE books SET name = @name, author = @author, price = @price, category = @category, image_url = @image_url" +
                                                         "WHERE id = @id;";
            parameters.Add("@id", book.Id);
            parameters.Add("@name", book.Name);
            parameters.Add("@author", book.Author);
            parameters.Add("@price", book.Price);
            parameters.Add("@category", book.Category);
            parameters.Add("@image_url", book.ImageUrl);
            mySqlConnection.Execute(stm, parameters);
            return book;
        }
    }
}
