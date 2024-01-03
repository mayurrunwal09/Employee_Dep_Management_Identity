using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Domain.Models;
using Microsoft.AspNetCore.Identity;

namespace Repository_And_Services.context
{
    public class MainDBContext : IdentityDbContext<ApplicationUser>
    {
        public MainDBContext(DbContextOptions options) : base(options) { }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Departments { get; set; }
        public DbSet<Salary> Salarys { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Employee>()
                .HasOne(d => d.Departments)
                .WithMany(d => d.Employees)
                .HasForeignKey(d => d.DepId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Salary>()
                .HasOne(d => d.Employee)
                .WithMany(d => d.Salarys)
                .HasForeignKey(d => d.EmpId)
                .OnDelete(DeleteBehavior.Cascade);


        }
    }
}
