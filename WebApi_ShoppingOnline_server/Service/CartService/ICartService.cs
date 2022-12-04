using WebApi_ShoppingOnline.Entity;

namespace WebApi_ShoppingOnline.Service.CartService
{
    public interface ICartService
    {
        Boolean AddBooksToCart(int cartID, int bookID, int NumberOfBooks);
        List<CartBook> GetBooksInCart(int cartID);
        CartBook UpdateNumberOfBookInCart(int cartBookID, int numberOfBookInCart);
        int DeleteBooksInCart(int cartBookID);
        int GetCartIDByUserID(int userID);
    }
}
