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
        public Boolean AddBooksToCart(int cartID, int bookID, int NumberOfBooks)
        {
            //báo lỗi khi cartID và bookID đã có trong cart_book
            string stmTest = "select count(*) from cart_book where cartID = @cartID and bookID = @bookID;";
            parameters.Add("@cartID", cartID);
            parameters.Add("@bookID", bookID);
            int numberOfAffectedRows = mySqlConnection.QueryFirstOrDefault<int>(stmTest, parameters);
            if (numberOfAffectedRows == 0)
            {
                mySqlConnection = new MySqlConnection(connectionString);
                parameters = new DynamicParameters();
                string stmAddCartBook = "insert into cart_book (cartID, bookID, numberOfBooks)" +
                        "values (@cartID, @bookID, @numberOfBooks);";
                parameters.Add("@cartID", cartID);
                parameters.Add("@bookID", bookID);
                parameters.Add("@numberOfBooks", NumberOfBooks);
                mySqlConnection.Execute(stmAddCartBook, parameters);
                return true;
            }
            return false;
        }

        public int DeleteBooksInCart(int cartBookID)
        {
            string stmDeleteBookInCart = "delete from cart_book where id = @cartBookID;";
            parameters.Add("@cartBookID", cartBookID);
            mySqlConnection.Execute(stmDeleteBookInCart, parameters);
            return cartBookID;
        }

        public List<CartBook> GetCartBooks()
        {
            string stm = "select * from cart_book;";
            List<CartBook> cartBooks = mySqlConnection.Query<CartBook>(stm).ToList();
            return cartBooks;
        }

        public CartBook UpdateNumberOfBookInCart(int cartBookID, int numberOfBookInCart)
        {
            string stmUpdateNumberOfBookInCart = "UPDATE cart_book SET numberOfBooks = @NumberOfBookInCart WHERE id = @cartBookID;";
            parameters.Add("@NumberOfBookInCart", numberOfBookInCart);
            parameters.Add("@cartBookID", cartBookID);
            mySqlConnection.Execute(stmUpdateNumberOfBookInCart, parameters);

            mySqlConnection = new MySqlConnection(connectionString);
            parameters = new DynamicParameters();
            string stmcartBook = "select * from cart_book where id = @cartBookID;";
            parameters.Add("@cartBookID", cartBookID);
            CartBook cartBook = mySqlConnection.QueryFirstOrDefault<CartBook>(stmcartBook, parameters);
            return cartBook;
        }
    }
}
