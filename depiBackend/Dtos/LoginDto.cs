using System.ComponentModel.DataAnnotations;

namespace depiBackend.Dtos
{
    public class LoginDto
    {
        [EmailAddress(ErrorMessage = "Please enter valid email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Student password is required")]
        public string Password { get; set; }
    }
}
