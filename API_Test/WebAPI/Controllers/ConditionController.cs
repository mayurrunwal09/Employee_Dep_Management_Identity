using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Repository_And_Services.context;
using Repository_And_Services.Services.CutomService.DepartmentServices;
using Repository_And_Services.Services.CutomService.EmployeeServices;
using Repository_And_Services.Services.CutomService.SalaryServices;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ConditionController : ControllerBase
    {
        private readonly IEmployeeSerive _employeeService;
        private readonly ISalaryService _salaryService;
        private readonly IDepartmentService _departmentService;
       

        public ConditionController(IEmployeeSerive employeeService, IDepartmentService departmentService, ISalaryService salaryService)
        {
            _employeeService = employeeService;
            _salaryService = salaryService;
       
            _departmentService = departmentService;
        }

        [HttpGet("GetDepartmentWiseMonthlySalaries")]
        public async Task<IActionResult> GetDepartmentWiseMonthlySalaries(int year)
        {
            try
            {
                var result = await _departmentService.GetDepartmentWiseMonthlySalaryAsync(year);

                if (result == null || result.Count == 0)
                    return NotFound($"No records found for department-wise monthly salary in the year {year}");

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [Route("GetEmployeesByNames")]
        [HttpGet]
        public async Task<IActionResult> GetEmployeesByNames(string employeeName)
        {
            try
            {
                if (string.IsNullOrEmpty(employeeName))
                    return BadRequest("Employee name cannot be empty");

                var employees = await _employeeService.GetEmployeesByNameAsync(employeeName);

                if (employees == null || employees.Count == 0)
                    return NotFound($"No records found for Employee with name {employeeName}");

                return Ok(employees);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("GetEmployeesBySalaryRanges")]
        public async Task<IActionResult> GetEmployeesBySalaryRanges(double minSalary, double maxSalary)
        {
            try
            {
                var employees = await _employeeService.GetEmployeesBySalaryRangeAsync(minSalary, maxSalary);

                if (employees == null || employees.Count == 0)
                    return NotFound($"No records found for employees with salary in the range {minSalary} - {maxSalary}");

                return Ok(employees);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
    }
}
