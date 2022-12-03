namespace WebApi_ShoppingOnline.Entity
{
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? PhoneNumber { get; set; }
        public string? Email { get; set; }
        public string? Address { get; set; }
        public string? Gender { get; set; }
        public string? Position { get; set; }
        public string? Username { get; set; }
        public string? Password { get; set; }
    }
}
