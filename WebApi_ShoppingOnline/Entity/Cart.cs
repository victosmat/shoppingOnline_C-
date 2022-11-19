namespace WebApi_ShoppingOnline.Entity
{
    public class Cart
    {
        public int Id { get; set; }
        public int amount { get; set; }
        public User user { get; set; }
    }
}
