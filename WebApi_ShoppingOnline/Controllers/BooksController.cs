using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi_ShoppingOnline.Entity;
using WebApi_ShoppingOnline.Service.BookService;

namespace WebApi_ShoppingOnline.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private BookService _bookService;

        public BooksController()
        {
            _bookService = new BookService();
        }
        [HttpGet("GetBook")]
        public IActionResult GetAllBoook()
        {

            try
            {
                List<Book> books = _bookService.GetBooks();
                return StatusCode(StatusCodes.Status200OK, books);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");

            }
        }
        [HttpGet("GetBookByCategory/{bookCategory}")]
        public IActionResult GetBookByCategory(string bookCategory)
        {
            try
            {
                List<Book> books = _bookService.GetBookByCategory(bookCategory);
                return StatusCode(StatusCodes.Status200OK, books);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");

            }
        }
        [HttpGet("GetBooksById/{bookID}")]
        public IActionResult GetBooksById(int bookID)
        {
            try
            {
                List<Book> books = _bookService.GetBooksById(bookID);
                return StatusCode(StatusCodes.Status200OK, books);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }
        [HttpGet("GetBookByKeyword/{bookKeyword}")]
        public IActionResult GetBookByKeyword(string bookKeyword)
        {
            try
            {
                List<Book> books = _bookService.GetBookByKeyword(bookKeyword);
                return StatusCode(StatusCodes.Status200OK, books);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }
        [HttpPost("InsertBook")]
        public IActionResult AddBook([FromBody] Book book)
        {
            try
            {
                Book addedBooks = _bookService.AddBook(book);
                return StatusCode(StatusCodes.Status201Created, addedBooks);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }

        [HttpPut("updateBook")]
        public IActionResult UpdateBook([FromBody] Book book)
        {
            try
            {
                Book UpdatedBook = _bookService.UpdateBook(book);
                return StatusCode(StatusCodes.Status200OK, UpdatedBook);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }

        [HttpDelete("DeleteBook/{bookID}")]
        public IActionResult DeleteBook([FromRoute] int bookID)
        {
            try
            {
                int deletedBookID = _bookService.DeleteBook(bookID);
                return StatusCode(StatusCodes.Status200OK, deletedBookID);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }
    }
}
