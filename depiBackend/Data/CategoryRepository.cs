using depiBackend.Data.IRepository;
using depiBackend.Models;

namespace depiBackend.Data
{
    public class CategoryRepository : DataRepository<Category>, ICategoryRepository
    {
        public CategoryRepository(DataContext context) : base(context)
        {
        }
    }
}
