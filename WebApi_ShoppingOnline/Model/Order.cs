namespace WebApi_ShoppingOnline.Entity
{
    public class Order
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public float TotalPrice { get; set; }
        public Cart Cart { get; set; }
    }
}
