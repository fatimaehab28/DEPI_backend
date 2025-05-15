using depiBackend.Models;

namespace depiBackend.Services
{
    public interface ICartService
    {
        Cart GetCart(string userName);
        void AddItem(string userName, CartItem item);
        void RemoveItem(string userName, int productId);
    }
} 