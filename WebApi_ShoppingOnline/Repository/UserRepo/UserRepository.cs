using Dapper;
using MySqlConnector;
using WebApi_ShoppingOnline.Entity;

namespace WebApi_ShoppingOnline.Repository.UserRepo
{
    public class UserRepository : IUserRepository
    {

        public List<User> GetUsers()
        {
            string connectionString = DBConnection.ConnectionString;
            string stm = "select * from users";
            using (var mySqlConnection = new MySqlConnection(connectionString))
            {
                var users = mySqlConnection.Query<User>(stm).ToList();
                return users;
            }
        }
    }
}
