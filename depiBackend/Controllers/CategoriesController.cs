using Microsoft.AspNetCore.Mvc;
using depiBackend.Data.IRepository;
using depiBackend.Models;
using depiBackend.Dtos;

namespace depiBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        private readonly IDataRepository<Category> _repo;

        public CategoriesController(IDataRepository<Category> repo)
        {
            _repo = repo;
        }



        [HttpPost]
        public async Task<IActionResult> Create(CategoryDTO dto)
        {
            var category = new Category
            {
                Name = dto.Name
            };

            await _repo.AddAsync(category);
            await _repo.Save();

            return Ok(category);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var categories = await _repo.GetAllAsync();
            return Ok(categories);
        }
    }

}
