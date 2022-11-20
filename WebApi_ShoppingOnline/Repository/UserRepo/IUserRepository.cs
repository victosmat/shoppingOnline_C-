using WebApi_ShoppingOnline.Entity;

namespace WebApi_ShoppingOnline.Repository.UserRepo
{
    public interface IUserRepository
    {
        List<User> GetUsers();
    }
}
