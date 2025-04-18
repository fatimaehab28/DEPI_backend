using System.ComponentModel.DataAnnotations;

namespace depiBackend.Models
{

    public class UserType
    {
        [Key]
        public int Id { get; set; }
        public string Role { get; set; }

        public ICollection<User> User { get; set; }
    }
}
