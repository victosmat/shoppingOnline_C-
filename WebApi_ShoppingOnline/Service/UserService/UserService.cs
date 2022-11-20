using WebApi_ShoppingOnline.Entity;
using WebApi_ShoppingOnline.Repository.UserRepo;

namespace WebApi_ShoppingOnline.Service.UserService
{
    public class UserService : IUserService
    {
        // Tạm thời bỏ qua cái Dependency Injection, viết kiểu clas cucngx đc
        private UserRepository _userRepo;

        public UserService()
        {
            _userRepo = new UserRepository();
        }

        public User AddUser(User user)
        {
            throw new NotImplementedException();
        }

        public User GetByEmail(string email)
        {
            throw new NotImplementedException();
        }

        public User GetById(int id)
        {
            throw new NotImplementedException();
        }

        public User GetByUserName(string userName)
        {
            throw new NotImplementedException();
        }

        public List<User> GetUsers()
        {
            return _userRepo.GetUsers();
        }
    }
}
