using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Repository_And_Services.context;

[Route("api/[controller]")]
[ApiController]
public class ApplicationUserController : ControllerBase
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly MainDBContext _context;

    public ApplicationUserController(UserManager<ApplicationUser> userManager, MainDBContext context)
    {
        _userManager = userManager;
        _context = context;
    }


    [HttpGet("GetApplicationUsers")]
    public async Task<ActionResult<IEnumerable<ApplicationUser>>> GetApplicationUsers()
    {
        return await _userManager.Users.ToListAsync();
    }

    [HttpGet("GetApplicationUser")]
    public async Task<ActionResult<ApplicationUser>> GetApplicationUser(string id)
    {
        var applicationUser = await _userManager.FindByIdAsync(id);

        if (applicationUser == null)
        {
            return NotFound();
        }

        return applicationUser;
    }

   
    [HttpPost]
    public async Task<ActionResult<ApplicationUser>> PostApplicationUser(ApplicationUser applicationUser)
    {
        var result = await _userManager.CreateAsync(applicationUser);

        if (result.Succeeded)
        {
            return CreatedAtAction("GetApplicationUser", new { id = applicationUser.Id }, applicationUser);
        }

        return BadRequest(result.Errors);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> PutApplicationUser(string id, ApplicationUser applicationUser)
    {
        if (id != applicationUser.Id)
        {
            return BadRequest();
        }

        _context.Entry(applicationUser).State = EntityState.Modified;

        try
        {
            await _userManager.UpdateAsync(applicationUser);
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!ApplicationUserExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/ApplicationUser/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteApplicationUser(string id)
    {
        var applicationUser = await _userManager.FindByIdAsync(id);
        if (applicationUser == null)
        {
            return NotFound();
        }

        await _userManager.DeleteAsync(applicationUser);

        return NoContent();
    }

    private bool ApplicationUserExists(string id)
    {
        return _userManager.Users.Any(e => e.Id == id);
    }
}
