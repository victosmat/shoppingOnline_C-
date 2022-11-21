namespace WebApi_ShoppingOnline.Entity
{
    public class CartBook
    {
        public int Id { get; set; }
        public Cart Cart{ get; set; }
        public Book Book { get; set; }
    }
}
