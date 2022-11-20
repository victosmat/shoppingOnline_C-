using WebApi_ShoppingOnline.Entity;

namespace WebApi_ShoppingOnline.Service.UserService
{
    public interface IUserService
    {
        List<User> GetUsers();
        User GetById(int id);
        User GetByUserName(string userName);
        User AddUser(User user);
    }
}
