using Dapper;
using MySqlConnector;
using WebApi_ShoppingOnline.Entity;

namespace WebApi_ShoppingOnline.Repository.UserRepo
{
    public class UserRepository : IUserRepository
    {
        static private string connectionString = DBConnection.ConnectionString;
        private MySqlConnection mySqlConnection = new MySqlConnection(connectionString);
        private DynamicParameters parameters = new DynamicParameters();

        public User AddUser(User user)
        {
            string stm = "insert into users (name, username, password, address, dateOfBirth, phoneNumber, email, gender, position)" +
                " values (@name, @username, @password, @address, @dateOfBirth, @phoneNumber, @email, @gender, @position);";
            parameters.Add("@name", user.Name);
            parameters.Add("@username", user.Username);
            parameters.Add("@password", user.Password);
            parameters.Add("@address", user.Address);
            parameters.Add("@dateOfBirth", user.DateOfBirth);
            parameters.Add("@phoneNumber", user.PhoneNumber);
            parameters.Add("@email", user.Email);
            parameters.Add("@gender", user.Gender);
            parameters.Add("@position", user.Position);
            mySqlConnection.Execute(stm, parameters);
            return user;
        }

        public int DeleteUser(int userID)
        {
            String stm = "delete from users where id = @id";
            parameters.Add("@id", userID);
            mySqlConnection.Execute(stm, parameters);
            return userID;
        }

        public List<User> GetUsers()
        {
            string stm = "select * from users";
            using (mySqlConnection)
            {
                var users = mySqlConnection.Query<User>(stm).ToList();
                return users;
            }
        }

        public User UpdateUser(User user)
        {
            String stm = "UPDATE users SET name = @name, username = @username, password = @password, address = @address, dateOfBirth = @dateOfBirth, phoneNumber = @phoneNumber, email = @email, gender = @gender, position = @position " +
                                             "WHERE id = @id;";
            parameters.Add("@id", user.Id);
            parameters.Add("@name", user.Name);
            parameters.Add("@username", user.Username);
            parameters.Add("@password", user.Password);
            parameters.Add("@address", user.Address);
            parameters.Add("@dateOfBirth", user.DateOfBirth);
            parameters.Add("@phoneNumber", user.PhoneNumber);
            parameters.Add("@email", user.Email);
            parameters.Add("@gender", user.Gender);
            parameters.Add("@position", user.Position);
            mySqlConnection.Execute(stm, parameters);
            return user;
        }
    }
}
