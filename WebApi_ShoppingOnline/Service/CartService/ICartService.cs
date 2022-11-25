using WebApi_ShoppingOnline.Entity;
using static System.Reflection.Metadata.BlobBuilder;

namespace WebApi_ShoppingOnline.Service.CartService
{
    public interface ICartService
    {
        Boolean AddBooksToCart(int cartID, Book book, int NumberOfBooks);
        List<CartBook> GetCartBooks();
    }
}
