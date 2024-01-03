using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Domain.ViewModels;
using WebAPI.Middleware.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.UI.V4.Pages.Account.Internal;

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly IJWTAuthManager _jwtAuthManager;

    public LoginController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, IJWTAuthManager jwtAuthManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
        _jwtAuthManager = jwtAuthManager;
    }

        [HttpPost("Register")]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new ApplicationUser
                {
                    Name = model.Name,
                    UserName = model.Email,
                    Email = model.Email,
                    Phoneno = model.Phoneno,
                    Gender = model.Gender,
                };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                return Ok(new { success = true, message = "Registration successful." });
            }

            return BadRequest(new { success = false, errors = result.Errors });
        }

        return BadRequest(new { success = false, message = "Invalid model state." });
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] Login model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new { Message = "Invalid login data", Errors = ModelState.Values.SelectMany(v => v.Errors) });
        }

        var user = await _userManager.FindByNameAsync(model.Email);

        if (user == null)
        {
            return BadRequest(new { Message = "Login failed", Errors = "Invalid login attempt" });
        }

        if (!await _userManager.CheckPasswordAsync(user, model.Password))
        {
            return BadRequest(new { Message = "Login failed", Errors = "Invalid login attempt" });
        }

        var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, lockoutOnFailure: false);

        if (result.Succeeded)
        {
            var token = _jwtAuthManager.GenerateJWT(user);

            return Ok(new { Message = "Login successful", Token = token });
        }

        if (result.IsLockedOut)
        {
            return BadRequest(new { Message = "Account locked out", Errors = "Too many failed login attempts. Try again later." });
        }

        if (result.RequiresTwoFactor)
        {
            return BadRequest(new { Message = "Two-factor authentication required", Errors = "Two-factor authentication is required for this account." });
        }

        if (result.IsNotAllowed)
        {
            return BadRequest(new { Message = "Login failed", Errors = "Account is not allowed to log in." });
        }

        return BadRequest(new { Message = "Login failed", Errors = "Invalid login attempt" });
    }

    [HttpPost("Logout")]
    public async Task<IActionResult> Logout()
    {
        await _signInManager.SignOutAsync();
        return Ok("Logout successful.");
    }
}











































