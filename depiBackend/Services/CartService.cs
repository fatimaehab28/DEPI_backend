using Microsoft.EntityFrameworkCore;
using depiBackend.Data;
using depiBackend.Models;

namespace depiBackend.Services
{
    public class CartService : ICartService
    {
        private readonly DataContext _context;
        public CartService(DataContext context)
        {
            _context = context;
        }

        public Cart GetCart(string userName)
        {
            var cart = _context.Carts
                .Include(c => c.Items)
                .FirstOrDefault(c => c.UserName == userName);

            if (cart == null)
            {
                cart = new Cart { UserName = userName };
                _context.Carts.Add(cart);
                _context.SaveChanges();
            }
            return cart;
        }

        public void AddItem(string userName, CartItem item)
        {
            var cart = GetCart(userName);
            var existing = cart.Items.FirstOrDefault(i => i.ProductId == item.ProductId);
            if (existing != null)
                existing.Quantity += item.Quantity;
            else
                cart.Items.Add(item);

            _context.SaveChanges();
        }

        public void RemoveItem(string userName, int productId)
        {
            var cart = GetCart(userName);
            var item = cart.Items.FirstOrDefault(i => i.ProductId == productId);
            if (item != null)
            {
                cart.Items.Remove(item);
                _context.SaveChanges();
            }
        }
    }
}