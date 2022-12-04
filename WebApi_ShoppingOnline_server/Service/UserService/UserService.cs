using Dapper;
using MySqlConnector;
using WebApi_ShoppingOnline.Entity;
using WebApi_ShoppingOnline.Repository;

namespace WebApi_ShoppingOnline.Service.UserService
{
    public class UserService : IUserService
    {
        static private string connectionString = DBConnection.ConnectionString;
        private MySqlConnection mySqlConnection = new MySqlConnection(connectionString);
        private DynamicParameters parameters = new DynamicParameters();

        public string AddUser(User user)
        {
            string stmGetUsername = "select * from users where username = @username;";
            parameters.Add("@username", user.Username);
            List<User> userByUsername = mySqlConnection.Query<User>(stmGetUsername, parameters).ToList();
            if (userByUsername.Count > 0)
            {
                return "username already exists";
            }

            mySqlConnection = new MySqlConnection(connectionString);
            parameters = new DynamicParameters();
            string stmUser = "insert into users (name, username, password, address, dateOfBirth, phoneNumber, email, gender, position)" +
                    " values (@name, @username, @password, @address, @dateOfBirth, @phoneNumber, @email, @gender, @position);";
            parameters.Add("@name", user.Name);
            parameters.Add("@username", user.Username);
            parameters.Add("@password", user.Password);
            parameters.Add("@address", user.Address);
            parameters.Add("@dateOfBirth", user.DateOfBirth);
            parameters.Add("@phoneNumber", user.PhoneNumber);
            parameters.Add("@email", user.Email);
            parameters.Add("@gender", user.Gender);
            parameters.Add("@position", "customer");
            mySqlConnection.Execute(stmUser, parameters);

            // thêm giỏ hàng mới sau khi thêm user
            string stmUserID = "select id from users;";
            var users = mySqlConnection.Query<int>(stmUserID).ToList();
            int userMaxId = 1;
            foreach (int x in users) if (x > userMaxId) userMaxId = x;

            parameters = new DynamicParameters();
            mySqlConnection = new MySqlConnection(connectionString);
            string stmCart = "insert into carts (userID) values (@userID);";
            parameters.Add("@userID", userMaxId);
            mySqlConnection.Execute(stmCart, parameters);

            return "oke";
        }

        public User CheckUser(string username, string password)
        {
            string stmCheckUser = "select * from users where username = @username and password = @password;";
            parameters.Add("@username", username);
            parameters.Add("@password", password);
            List<User> users = mySqlConnection.Query<User>(stmCheckUser, parameters).ToList();
            if (users.Count > 0) return users[0];
            return null;
        }

        public int UpdatePosition(string userID, string position)
        {
            string updateStm = "update users set position = @position where id = @userID";
            parameters.Add("@position", position);
            parameters.Add("@userID", userID);
            int numberOfAffectedRows = mySqlConnection.Execute(updateStm, parameters);

            return numberOfAffectedRows;
        }

        public int DeleteUser(int userID)
        {
            //xoá giỏ hàng của user
            parameters = new DynamicParameters();
            mySqlConnection = new MySqlConnection(connectionString);
            string stmDeleteUserInCart = "delete from carts where userID = @userID";
            parameters.Add("@userID", userID);
            mySqlConnection.Execute(stmDeleteUserInCart, parameters);

            parameters = new DynamicParameters();
            mySqlConnection = new MySqlConnection(connectionString);
            String stm = "delete from users where id = @id";
            parameters.Add("@id", userID);
            mySqlConnection.Execute(stm, parameters);

            return userID;
        }

        public List<User> GetUserByKeyword(string userKeyword)
        {
            string stm = "select * from users where name like @userKeyword or address like @userKeyword or phoneNumber like @userKeyword or email like @userKeyword or position like @userKeyword;";
            parameters.Add("@bookKeyword", "%" + userKeyword + "%");
            List<User> users = mySqlConnection.Query<User>(stm, parameters).ToList();
            return users;
        }

        public List<User> GetUsers()
        {
            string stm = "select * from users";
            List<User> users = mySqlConnection.Query<User>(stm).ToList();
            return users;
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

            parameters = new DynamicParameters();
            mySqlConnection = new MySqlConnection(connectionString);
            string stmUser = "select * from users where id = @userID;";
            parameters.Add("@userID", user.Id);
            user = mySqlConnection.QueryFirstOrDefault<User>(stmUser, parameters);
            return user;
        }
    }
}
