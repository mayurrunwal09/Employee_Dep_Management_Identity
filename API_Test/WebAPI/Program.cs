
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Net;
using System.Text;
using WebAPI.Middleware;
using WebAPI.Middleware.Auth;
using Domain.Helpers;
using Microsoft.EntityFrameworkCore;
using Repository_And_Services.context;
using Repository_And_Services.Repository;
using Repository_And_Services.Services.CutomService.DepartmentServices;
using Repository_And_Services.Services.CutomService.EmployeeServices;
using Repository_And_Services.Services.CutomService.SalaryServices;
using Repository_And_Services.Services.GenericService;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddDbContext<MainDBContext>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("Database")));
builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<MainDBContext>()
    .AddDefaultTokenProviders();




builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddTransient(typeof(IService<>), typeof(Service<>));
builder.Services.AddTransient(typeof(IDepartmentService), typeof(DepartmentService));
builder.Services.AddTransient(typeof(IEmployeeSerive), typeof(EmployeeService));
builder.Services.AddTransient(typeof(ISalaryService), typeof(SalaryService));
builder.Services.AddTransient<IJWTAuthManager, JWTAuthManager>();

#region CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});
#endregion




var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseDeveloperExceptionPage();
    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebApi v1"));
}

app.UseHttpsRedirection();
app.UseExceptionHandlerMiddleware();
app.UseRouting();
app.UseCors(options => options.WithOrigins("http://localhost:3000")
                            .AllowAnyHeader()
                            .AllowAnyMethod());
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();


































