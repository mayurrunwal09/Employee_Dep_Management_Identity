using Microsoft.AspNetCore.Identity;

public class ApplicationUser : IdentityUser
{

    public string Name { get; set; }
    public string Email { get; set; }

    public string Phoneno { get; set; }
    public string Gender { get; set; }

}




