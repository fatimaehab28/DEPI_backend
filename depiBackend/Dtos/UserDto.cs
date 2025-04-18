using System.ComponentModel.DataAnnotations;

namespace depiBackend.Dtos
{

    public class UserDto
    {
        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [EmailAddress(ErrorMessage = "Please enter valid email")]
        public string Email { get; set; }
        public string Password { get; set; }
         public int UserTypeId { get; set; }



        
    }
}
