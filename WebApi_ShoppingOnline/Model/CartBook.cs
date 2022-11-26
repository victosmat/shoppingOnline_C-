namespace WebApi_ShoppingOnline.Entity
{
    public class CartBook
    {
        public int Id { get; set; }
        public int CartID { get; set; }
        public int BookID { get; set; }
        public int NumberOfBooks { get; set; }
    }
}
