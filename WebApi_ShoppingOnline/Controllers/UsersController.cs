using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi_ShoppingOnline.Entity;
using WebApi_ShoppingOnline.Repository.UserRepo;
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
            _userService= new UserService();
        }

        [HttpGet]
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
                return StatusCode(StatusCodes.Status500InternalServerError, "e001");

            }
        }


    }
}
