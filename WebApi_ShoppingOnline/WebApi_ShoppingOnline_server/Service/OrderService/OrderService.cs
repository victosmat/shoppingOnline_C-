using Dapper;
using MySqlConnector;
using WebApi_ShoppingOnline.Entity;
using WebApi_ShoppingOnline.Repository;

namespace WebApi_ShoppingOnline.Service.OrderService
{
    public class OrderService : IOrderService
    {
        static private string connectionString = DBConnection.ConnectionString;
        private MySqlConnection mySqlConnection = new MySqlConnection(connectionString);
        private DynamicParameters parameters = new DynamicParameters();
        public Order AddBookInCartToOrderAndPay(List<int> cartBookIDs)
        {
            // xoá sách trong giỏ hàng
            int totalPrice = 0;
            DateTime dateTime = DateTime.Now;
            int cartID = 0;
            foreach (int cartBookID in cartBookIDs)
            {
                // lấy cartID và bookID
                mySqlConnection = new MySqlConnection(connectionString);
                parameters = new DynamicParameters();
                string stmCartBook = "select * from cart_book where id = @id;";
                parameters.Add("@id", cartBookID);
                CartBook cartBook = mySqlConnection.QueryFirstOrDefault<CartBook>(stmCartBook, parameters);
                cartID = cartBook.CartID;

                // lấy thông tin sách
                mySqlConnection = new MySqlConnection(connectionString);
                parameters = new DynamicParameters();
                string stmBook = "select * from books where id = @id;";
                parameters.Add("@id", cartBook.BookID);
                Book book = mySqlConnection.QueryFirstOrDefault<Book>(stmBook, parameters);
                totalPrice += book.Price * cartBook.NumberOfBooks;

                // xoá sách trong giỏ hàng
                mySqlConnection = new MySqlConnection(connectionString);
                parameters = new DynamicParameters();
                string stmDeleteBookInCart = "delete from cart_book where cartID = @cartID and bookID = @bookID;";
                parameters.Add("@cartID", cartBook.CartID);
                parameters.Add("@bookID", cartBook.BookID);
                mySqlConnection.Execute(stmDeleteBookInCart, parameters);
            }

            // thêm vào order
            mySqlConnection = new MySqlConnection(connectionString);
            parameters = new DynamicParameters();
            string stmAddOrder = "insert into orders (date, totalPrice, cartID) " +
                "values (@date, @totalPrice, @cartID);";
            parameters.Add("@date", dateTime);
            parameters.Add("@totalPrice", totalPrice);
            parameters.Add("@cartID", cartID);
            mySqlConnection.Execute(stmAddOrder, parameters);

            // get order
            mySqlConnection = new MySqlConnection(connectionString);
            parameters = new DynamicParameters();
            string stmOrder = "select * from orders where id = (select max(id) from orders);";
            Order orders = mySqlConnection.QueryFirstOrDefault<Order>(stmOrder);

            return orders;
        }
    }
}
