using depiBackend.Models;

namespace depiBackend.Data.IRepository
{

    public interface IOrderRepository
    {
        Task PlaceOrderAsync(List<CartItem> cartItems);
    }
}
