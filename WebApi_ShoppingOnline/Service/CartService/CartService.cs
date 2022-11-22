using Dapper;
using MySqlConnector;
using WebApi_ShoppingOnline.Entity;
using WebApi_ShoppingOnline.Repository;

namespace WebApi_ShoppingOnline.Service.CartService
{
    public class CartService : ICartService
    {
        static private string connectionString = DBConnection.ConnectionString;
        private MySqlConnection mySqlConnection = new MySqlConnection(connectionString);
        private DynamicParameters parameters = new DynamicParameters();
        public Boolean AddBooksToCart(Cart cart, Book book, int NumberOfBooks)
        {
            //báo lỗi khi cartID và bookID đã có trong cart_book
            string stmTest = "select * from cart_book where cart_id = @cart_id and book_id = @book_id;";
            parameters.Add("@cart_id", cart.Id);
            parameters.Add("@book_id", book.Id);
            int numberOfAffectedRows = mySqlConnection.Execute(stmTest, parameters);
            if (numberOfAffectedRows == 0)
            {
                mySqlConnection = new MySqlConnection(connectionString);
                parameters = new DynamicParameters();
                string stmAddCartBook = "insert into cart_book (cart_id, book_id, mumber_of_books)" +
                        "values (@cart_id, @book_id, @number_of_books);";
                parameters.Add("@cart_id", cart.Id);
                parameters.Add("@book_id", book.Id);
                parameters.Add("@mumber_of_books", NumberOfBooks);
                mySqlConnection.Execute(stmAddCartBook, parameters);
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<CartBook> GetCartBooks()
        {
            /*List<Book> listBooks = new List<Book>();
            string stmGetBookIdInCart = "select book_id from cart_book where cart_id = @cart_id";
            parameters.Add("@cart_id", cart.Id);
            List<int> listBooksId = mySqlConnection.Query<int>(stmGetBookIdInCart, parameters).ToList();
            foreach (int bookId in listBooksId)
            {
                string stmGetBook = "select * from books where id = @id";
                mySqlConnection = new MySqlConnection(connectionString);
                parameters = new DynamicParameters();
                parameters.Add("@id", bookId);
                List<Book> book = mySqlConnection.Query<Book>(stmGetBook, parameters).ToList();
                listBooks.Add(book[0]);
            }*/
            string stm = "select * from cart_book";
            List<CartBook> cartBooks = mySqlConnection.Query<CartBook>(stm).ToList();    
            return cartBooks;
        }
    }
}
