using WebApi_ShoppingOnline.Entity;

namespace WebApi_ShoppingOnline.Service.UserService
{
    public interface IUserService
    {
        List<User> GetUsers();
        User AddUser(User user);
        User UpdateUser(User user);
        int DeleteUser(int userID);
        Boolean CheckUser(string username, string password);
        List<User> GetUserByKeyword(string userKeyword);
    }
}
