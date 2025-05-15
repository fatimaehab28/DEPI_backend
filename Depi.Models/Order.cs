using System.ComponentModel.DataAnnotations.Schema;

namespace depiBackend.Models
{

    public partial class Order
    {
        public int OrderId { get; set; }

        public DateTime OrderDate { get; set; }

        //public decimal? TotalPrice { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal? TotalPrice { get; set; }


        public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    }

}
