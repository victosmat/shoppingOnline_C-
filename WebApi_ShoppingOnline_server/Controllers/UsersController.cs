using Microsoft.AspNetCore.Mvc;
using WebApi_ShoppingOnline.Entity;
using WebApi_ShoppingOnline.Service.UserService;

namespace WebApi_ShoppingOnline.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private UserService _userService;

        public UsersController()
        {
            _userService = new UserService();
        }

        [HttpGet("GetUserByKeyword/{userKeyword}")]
        public IActionResult GetUserByKeyword(string userKeyword)
        {
            try
            {
                List<User> users = _userService.GetUserByKeyword(userKeyword);
                return StatusCode(StatusCodes.Status200OK, users);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }

        [HttpGet("GetUser/{pageNumber}/{pageSize}")]
        public IActionResult GetAllUsers([FromRoute] int pageNumber, [FromRoute] int pageSize)
        {

            try
            {
                List<User> users = _userService.GetUsers(pageNumber, pageSize);
                return StatusCode(StatusCodes.Status200OK, users);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");

            }
        }
        [HttpGet("GetNumberOfUser/{pageSize}")]
        public IActionResult GetNumberOfUser(int pageSize)
        {
            try
            {
                int _pageSize = _userService.GetNumberOfUser(pageSize);
                return StatusCode(StatusCodes.Status200OK, _pageSize);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");

            }
        }
        [HttpPost("InsertUser")]
        public IActionResult AddUser([FromBody] User user)
        {
            try
            {
                string messageUsers = _userService.AddUser(user);
                if (messageUsers == "username already exists")
                {
                    return StatusCode(StatusCodes.Status500InternalServerError, "username already exists");
                }
                return StatusCode(StatusCodes.Status201Created, messageUsers);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }

        [HttpPut("updateUser")]
        public IActionResult UpdateUser([FromBody] User user)
        {
            try
            {
                User updatedUsers = _userService.UpdateUser(user);
                return StatusCode(StatusCodes.Status200OK, updatedUsers);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }

        [HttpPut("updatePosition/{userID}")]

        public IActionResult UpdatePosition([FromRoute] string userID, [FromBody] string postion)
        {
            try
            {
                int updatedUsers = _userService.UpdatePosition(userID, postion);
                return StatusCode(StatusCodes.Status200OK, updatedUsers);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }

        [HttpDelete("DeleteUser/{userID}")]
        public IActionResult DeleteUser([FromRoute] int userID)
        {
            try
            {
                int deletedUserID = _userService.DeleteUser(userID);
                return StatusCode(StatusCodes.Status200OK, deletedUserID);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }

        [HttpPost("Signin")]
        public IActionResult Signin([FromBody] Signin signin)
        {
            try
            {
                User user = _userService.CheckUser(signin.Username, signin.Password);

                if (user == null) return StatusCode(StatusCodes.Status400BadRequest, "Invalid input");
                else return StatusCode(StatusCodes.Status200OK, user);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return StatusCode(StatusCodes.Status500InternalServerError, "error");
            }
        }
    }
}


public class Signin
{
    public String Username { get; set; }
    public String Password { get; set; }

}