//using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations;


namespace depiBackend.Dtos
{
  
    public class ProductDto
    {
        [Required]
        public string Name { get; set; }

        [Range(0, 100000)]
        public decimal Price { get; set; }

        [Required]
        public int CategoryId { get; set; }

        public IFormFile? Image { get; set; }

 
    }


}
