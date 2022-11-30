using Microsoft.AspNetCore.Http;
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

        [HttpGet("GetUser")]
        public IActionResult GetAllUsers()
        {

            try
            {
                List<User> users = _userService.GetUsers();
                return StatusCode(StatusCodes.Status200OK, users);
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
                User addedUsers = _userService.AddUser(user);
                return StatusCode(StatusCodes.Status201Created, addedUsers);
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


public class Signin{
    public String Username {get; set;}
    public String Password { get; set; }

}