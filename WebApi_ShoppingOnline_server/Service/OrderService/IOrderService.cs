using WebApi_ShoppingOnline.Entity;

namespace WebApi_ShoppingOnline.Service.OrderService
{
    public interface IOrderService
    {
        Order AddBookInCartToOrderAndPay(List<int> cartBookIDs);
    }
}
