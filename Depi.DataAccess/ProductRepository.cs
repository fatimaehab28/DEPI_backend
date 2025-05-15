using depiBackend.Data.IRepository;
using depiBackend.Models;

namespace depiBackend.Data
{
    public class ProductRepository : DataRepository<Product>, IProductRepository
    {
        public ProductRepository(DataContext context) : base(context)
        {
        }
    }
}
