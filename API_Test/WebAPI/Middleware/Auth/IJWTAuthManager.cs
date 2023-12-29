using Domain.Models;

namespace WebAPI.Middleware.Auth
{
    public interface IJWTAuthManager
    {
        string GenerateJWT(ApplicationUser user);
    }
}
