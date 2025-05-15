namespace depiBackend.Models
{
    public class CartItem
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
        public int CartId { get; set; }
        public Cart Cart { get; set; }
    }

    public class Cart
    {
        public int Id { get; set; }
        public string UserName { get; set; } = string.Empty;
        public List<CartItem> Items { get; set; } = new();
    }
}