namespace WebApi_ShoppingOnline.Entity
{
    public class User
    {
        public string id { get; set; }
        public string name { get; set; }
        public DateTime dateOfBirth { get; set; }
        public string phoneNumber { get; set; }
        public string email { get; set; }
        public string gender { get; set; }
        public string position { get; set; }
        public User user { get; set; }
    }
}
