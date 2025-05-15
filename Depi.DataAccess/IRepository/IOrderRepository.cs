using depiBackend.Models; // Ensure this namespace contains the CartItem class

namespace depiBackend.Data.IRepository
{
    public interface IOrderRepository
    {
        Task PlaceOrderAsync(List<CartItem> cartItems);
    }
}