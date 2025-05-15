using depiBackend.Data.IRepository;
using depiBackend.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace depiBackend.Data
{
    public class OrderRepository : IOrderRepository
    {
         
        private readonly DataContext _context;

        public OrderRepository(DataContext context)
        {
            _context = context;
        }


        public async Task PlaceOrderAsync(List<CartItem> cartItems)
        {
            var productTable = new DataTable();
            productTable.Columns.Add("ProductId", typeof(int));
            productTable.Columns.Add("Quantity", typeof(int));

            foreach (var item in cartItems)
            {
                productTable.Rows.Add(item.ProductId, item.Quantity);
            }

            using (var connection = new SqlConnection(_context.Database.GetDbConnection().ConnectionString))

             {
                await connection.OpenAsync();

                using (var command = new SqlCommand("PlaceOrder", connection))
                {
                    command.CommandType = CommandType.StoredProcedure;

                    var parameter = new SqlParameter
                    {
                        ParameterName = "@Products",
                        SqlDbType = SqlDbType.Structured,
                        Value = productTable,
                        TypeName = "ProductTableType" // Ensure this matches the SQL table type
                    };

                    command.Parameters.Add(parameter);
                    await command.ExecuteNonQueryAsync();
                }
            }
        }
    }
}