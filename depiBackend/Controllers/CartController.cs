using Microsoft.AspNetCore.Mvc;
using depiBackend.Services;
using depiBackend.Models;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet("{userName}")]
    public ActionResult<Cart> GetCart(string userName)
    {
        var cart = _cartService.GetCart(userName);
        return Ok(cart);
    }

    [HttpPost("{userName}/add")]
    public IActionResult AddItem(string userName, [FromBody] CartItem item)
    {
        _cartService.AddItem(userName, item);
        return Ok();
    }

    [HttpDelete("{userName}/remove/{productId}")]
    public IActionResult RemoveItem(string userName, int productId)
    {
        _cartService.RemoveItem(userName, productId);
        return Ok();
    }
}