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
        public Boolean AddBookInCartToOrder(Cart cart, List<Book> books)
        {
            if (books.Count == 0) return false;
            int totalPrice = 0;
            DateTime dateTime = DateTime.Now;
            foreach (Book book in books)
            {
                mySqlConnection = new MySqlConnection(connectionString);
                parameters = new DynamicParameters();
                totalPrice += book.Price;
                string stmDeleteBookInCart = "delete from cart_book where cart_id = @cart_id and book_id = @book_id";
                parameters.Add("@cart_id", cart.Id);
                parameters.Add("@book_id", book.Id);
                mySqlConnection.Execute(stmDeleteBookInCart, parameters);
            }

            mySqlConnection = new MySqlConnection(connectionString);
            parameters = new DynamicParameters();
            string stmAddOrder = "insert into orders (date, total_price, cart_id) " +
                "values (@date, @total_price, @cart_id);";
            parameters.Add("@date", dateTime);
            parameters.Add("@total_price", totalPrice);
            parameters.Add("@cart_id", cart.Id);
            mySqlConnection.Execute(stmAddOrder, parameters);
            return true;
        }
    }
}
