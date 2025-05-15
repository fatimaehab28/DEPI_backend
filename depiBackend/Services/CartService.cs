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
            var cart = _context.Carts as DbSet<Cart>;
            if (cart == null)
            {
                throw new InvalidOperationException("Carts is not properly configured as a DbSet<Cart>.");
            }

            var userCart = cart
                .Include(c => c.Items)
                .FirstOrDefault(c => c.UserName == userName);

            if (userCart == null)
            {
                userCart = new Cart { UserName = userName };
                cart.Add(userCart);
                _context.SaveChanges();
            }
            return userCart;
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