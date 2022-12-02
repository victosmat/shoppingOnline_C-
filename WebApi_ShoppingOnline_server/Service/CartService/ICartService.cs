using WebApi_ShoppingOnline.Entity;
using static System.Reflection.Metadata.BlobBuilder;

namespace WebApi_ShoppingOnline.Service.CartService
{
    public interface ICartService
    {
        Boolean AddBooksToCart(int cartID, int bookID, int NumberOfBooks);
        List<CartBook> GetCartBooks();
        CartBook UpdateNumberOfBookInCart(int cartBookID ,int numberOfBookInCart);
        int DeleteBooksInCart(int cartBookID);
    }
}
