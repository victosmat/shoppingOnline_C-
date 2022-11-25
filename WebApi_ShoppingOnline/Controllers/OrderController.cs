using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi_ShoppingOnline.Entity;
using WebApi_ShoppingOnline.Service.OrderService;

namespace WebApi_ShoppingOnline.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        OrderService _orderService;
        public OrderController()
        {
            _orderService = new OrderService();
        }

        [HttpGet("AddBookInCartToOrder")]
        public IActionResult AddBookInCartToOrderAndPay([FromRoute] int cartID, [FromBody] List<Book> books)
        {
            try
            {
                List<Order> order = _orderService.AddBookInCartToOrder(cartID, books);
                return StatusCode(StatusCodes.Status200OK, order);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "có lỗi xảy ra");
            }
        }
    }
}
