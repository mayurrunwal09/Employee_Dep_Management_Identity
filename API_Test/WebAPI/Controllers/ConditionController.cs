using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository_And_Services.context;
using Repository_And_Services.Services.CutomService.EmployeeServices;
using Repository_And_Services.Services.CutomService.SalaryServices;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConditionController : ControllerBase
    {
        private readonly IEmployeeSerive _employeeService;
        private readonly ISalaryService _salaryService;
        private readonly MainDBContext _dbContext;

        public ConditionController(IEmployeeSerive employeeService, ISalaryService salaryService,MainDBContext mainDBContext)
        {
            _employeeService = employeeService;
            _salaryService = salaryService;
            _dbContext = mainDBContext;
        }

        [HttpGet("GetEmployeesByName")]
        public async Task<IActionResult> GetEmployeesByName(string employeeName)
        {
            try
            {       
                if (string.IsNullOrEmpty(employeeName))
                {
                    return BadRequest("Employee name cannot be empty");
                }

              
                var employees = await _employeeService.GetAll();
                var filteredEmployees = employees
                    .Where(e => e.EmpName.ToLower().Contains(employeeName.ToLower()))
                    .ToList();

                
                var response = filteredEmployees.Select(e => new
                {
                    e.Id,
                    e.EmpName,
                    e.Email,
                 
                    e.Phoneno,
                    e.Gender,
                    e.DOB,
                    e.DepId,
                    e.DepName,
                    e.SalaryAmount,
                   
                }).ToList();

                return Ok(response);
            }
            catch (Exception ex)
            {
              
                return StatusCode(500, "Internal server error");
            }

        }



        [HttpGet("GetEmployeesBySalaryRange")]
        public async Task<IActionResult> GetEmployeesBySalaryRange(double minSalary, double maxSalary)
        {
            try
            {
                var employees = await _dbContext.Employees
                    .Include(e => e.Departments) 
                    .Include(e => e.Salarys) 
                    .ToListAsync();

                var filteredEmployees = employees
                    .Where(e => e.Salarys != null &&
                                e.Salarys.Any(s => s.Amount >= minSalary && s.Amount <= maxSalary))
                    .Select(e => new
                    {
                        e.Id,
                        e.EmpName,
                        e.Email,
                        e.Phoneno,
                        e.Gender,
                        e.DOB,
                        e.DepId,
                        e.Departments.DepName, 
                        Salary = e.Salarys.Where(s => s.Amount >= minSalary && s.Amount <= maxSalary)
                                           .Select(s => new{s.Amount,s.Date }).ToList()
                    })
                    .ToList();

                return Ok(filteredEmployees);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("GetDepartmentWiseMonthlySalary")]
        public async Task<IActionResult> GetDepartmentWiseMonthlySalary(int year)
        {
            try
            {
                var salaries = await _dbContext.Salarys
                    .Include(s => s.Employee.Departments) 
                    .Where(s => s.Date.Year == year)
                    .ToListAsync();

                var result = salaries
                    .GroupBy(s => new { s.Employee.Departments.Id, s.Employee.Departments.DepName, s.Date.Month })
                    .Select(group => new
                    {
                        DepartmentId = group.Key.Id,
                        DepartmentName = group.Key.DepName,
                        Month = group.Key.Month,
                        TotalSalary = group.Sum(s => s.Amount)
                    })
                    .ToList();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
