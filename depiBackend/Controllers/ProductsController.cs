using Microsoft.AspNetCore.Mvc;
using depiBackend.Data.IRepository;
using depiBackend.Models;
using depiBackend.Dtos;
using depiBackend.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Caching.Memory;

namespace depiBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IDataRepository<Product> _repo;
        private readonly IMemoryCache _cache;

        public ProductsController(IDataRepository<Product> repo, IMemoryCache cache)
        {
            _repo = repo;
            _cache = cache;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromForm] ProductDto dto)
        {
            var product = new Product
            {
                Name = dto.Name,
                Price = dto.Price,
                CategoryId = dto.CategoryId,
            };

            if (dto.Image != null)
            {
                var result = UploadHandler.Upload(dto.Image, "products");
                if (!string.IsNullOrEmpty(result.ErrorMessage))
                    return BadRequest(result.ErrorMessage);

                product.ImageUrl = result.FileName;
            }

            await _repo.AddAsync(product);
            await _repo.Save();
            _cache.Remove("all_products"); // Clear cache after create

            return Ok(new { message = "Product created." });
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var baseUrl = "https://localhost:7130/";
            const string cacheKey = "all_products";
            if (!_cache.TryGetValue(cacheKey, out List<Product> products))
            {
                var productsFromDb = await _repo.GetAllAsyncInclude(p => true, p => p.Category);
                products = productsFromDb.ToList();

                foreach (var product in products)
                {
                    product.ImageUrl = baseUrl + product.ImageUrl;
                }

                _cache.Set(cacheKey, products, TimeSpan.FromMinutes(10));
            }

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var product = await _repo.GetByIdAsyncInclude(p => p.Id == id, p => p.Category);

            if (product == null)
                return NotFound();

            // Ensure full image URL is returned just like GetAll
            if (!string.IsNullOrEmpty(product.ImageUrl) && !product.ImageUrl.StartsWith("http"))
            {
                var baseUrl = "https://localhost:7130/";
                product.ImageUrl = baseUrl + product.ImageUrl;
            }

            return Ok(product);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromForm] ProductDto dto)
        {
            var product = await _repo.GetByIdAsync(id);
            if (product == null) return NotFound();

            if (dto.Image != null)
            {
                var upload = UploadHandler.Upload(dto.Image, "products");
                if (upload.ErrorMessage != null) return BadRequest(upload.ErrorMessage);
                product.ImageUrl = upload.FileName;
            }

            product.Name = dto.Name;
            product.Price = dto.Price;
            product.CategoryId = dto.CategoryId;

            await _repo.UpdateAsync(product);
            await _repo.Save();
            _cache.Remove("all_products"); // Clear cache after update

            return Ok(product);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _repo.GetByIdAsync(id);
            if (product == null) return NotFound();

            await _repo.DeleteAsync(product);
            await _repo.Save();
            _cache.Remove("all_products"); // Clear cache after delete

            return Ok();
        }
    }
}
