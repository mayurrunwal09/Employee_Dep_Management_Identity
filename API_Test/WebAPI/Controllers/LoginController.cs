
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Domain.ViewModels;

[Route("api/[controller]")]
[ApiController]
public class LoginController : ControllerBase
{
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly UserManager<ApplicationUser> _userManager;

    public LoginController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager)
    {
        _signInManager = signInManager;
        _userManager = userManager;
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
                Email = model.Email, // Make sure to set the email address here
                Phoneno = model.Phoneno,
                Gender = model.Gender,
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                // Optionally, you may sign in the user after registration
                // await _signInManager.SignInAsync(user, isPersistent: false);

                return Ok("Registration successful.");
            }

            return BadRequest(result.Errors);
        }

        return BadRequest("Invalid model state.");
    }

    [HttpPost("Login")]
    public async Task<IActionResult> Login(Login model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(new { Message = "Invalid login data", Errors = ModelState.Values.SelectMany(v => v.Errors) });
        }

        var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, lockoutOnFailure: false);

        if (result.Succeeded)
        {
            return Ok(new { Message = "Login successful" });
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











































