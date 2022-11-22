using WebApi_ShoppingOnline.Entity;

namespace WebApi_ShoppingOnline.Service.OrderService
{
    public interface IOrderService
    {
        Boolean AddBookInCartToOrder(Cart cart, List<Book> books);
    }
}
