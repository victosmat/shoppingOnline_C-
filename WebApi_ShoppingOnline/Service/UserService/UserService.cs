using WebApi_ShoppingOnline.Entity;
using WebApi_ShoppingOnline.Repository.UserRepo;

namespace WebApi_ShoppingOnline.Service.UserService
{
    public class UserService : IUserService
    {
        private UserRepository _userRepo;

        public UserService()
        {
            _userRepo = new UserRepository();
        }

        public User AddUser(User user)
        {
            return _userRepo.AddUser(user);
        }

        public int DeleteUser(int userID)
        {
            return _userRepo.DeleteUser(userID);
        }

        public List<User> GetUsers()
        {
            return _userRepo.GetUsers();
        }

        public User UpdateUser(User user)
        {
            return _userRepo.UpdateUser(user);
        }
    }
}
