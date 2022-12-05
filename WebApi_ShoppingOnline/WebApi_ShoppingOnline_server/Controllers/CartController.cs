using Microsoft.AspNetCore.Mvc;
using WebApi_ShoppingOnline.Entity;
using WebApi_ShoppingOnline.Service.CartService;

namespace WebApi_ShoppingOnline.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private CartService _cartService;
        public CartController()
        {
            _cartService = new CartService();
        }

        [HttpGet("GetCartIDByUserID/{userID}")]
        public IActionResult GetCartIDByUserID([FromRoute] int userID)
        {
            try
            {
                int cartID = _cartService.GetCartIDByUserID(userID);
                return StatusCode(StatusCodes.Status200OK, cartID);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }

        [HttpGet("GetBooksInCart/{cartID}")]
        public IActionResult GetBooksInCart(int cartID)
        {
            try
            {
                List<CartBook> cartBooks = _cartService.GetBooksInCart(cartID);
                return StatusCode(StatusCodes.Status200OK, cartBooks);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }

        [HttpPost("AddBooksToCart/{cartID}/{bookID}/{numberOfBooks}")]
        public IActionResult AddBooksToCart([FromRoute] int cartID, [FromRoute] int bookID, [FromRoute] int NumberOfBooks)
        {
            try
            {
                Boolean checkAdd = _cartService.AddBooksToCart(cartID, bookID, NumberOfBooks);
                if (checkAdd) return StatusCode(StatusCodes.Status201Created, checkAdd);
                else return StatusCode(StatusCodes.Status400BadRequest, "Đã có sách trong giỏ hàng!");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }

        [HttpPut("UpdateNumberOfBookInCart/{cartBookID}/{numberOfBookInCart}")]
        public IActionResult UpdateNumberOfBookInCart([FromRoute] int cartBookID, [FromRoute] int numberOfBookInCart)
        {
            try
            {
                CartBook cartBook = _cartService.UpdateNumberOfBookInCart(cartBookID, numberOfBookInCart);
                return StatusCode(StatusCodes.Status200OK, cartBook);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }

        [HttpDelete("DeleteBooksInCart/{cartBookID}")]
        public IActionResult DeleteBooksInCart([FromRoute] int cartBookID)
        {
            try
            {
                int deletedCartBookID = _cartService.DeleteBooksInCart(cartBookID);
                return StatusCode(StatusCodes.Status200OK, deletedCartBookID);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }
    }
}
