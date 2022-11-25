using WebApi_ShoppingOnline.Entity;

namespace WebApi_ShoppingOnline.Service.OrderService
{
    public interface IOrderService
    {
        List<Order> AddBookInCartToOrder(int cartID, List<Book> books);
    }
}
