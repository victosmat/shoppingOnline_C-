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

        [HttpPost("AddBookInCartToOrderAndPay")]
        public IActionResult AddBookInCartToOrderAndPay([FromBody] List<int> cartBookIDs)
        {
            try
            {
                Order order = _orderService.AddBookInCartToOrderAndPay(cartBookIDs);
                return StatusCode(StatusCodes.Status200OK, order);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }
    }
}
