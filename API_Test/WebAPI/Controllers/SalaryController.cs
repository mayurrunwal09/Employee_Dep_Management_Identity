using Domain.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Repository_And_Services.Services.CutomService.EmployeeServices;
using Repository_And_Services.Services.CutomService.SalaryServices;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class SalaryController : ControllerBase
    {
        private readonly ISalaryService _empService;
        private readonly ILogger<SalaryController> _logger;

        public SalaryController(ISalaryService empService, ILogger<SalaryController> logger)
        {
            _empService = empService;
            _logger = logger;
        }

        [Route("GetAllSalary")]
        [HttpGet]
        public async Task<IActionResult> GetAllSalary()
        {
            try
            {
                var employees = await _empService.GetAll();
                if (employees == null || employees.Count == 0)
                    return NotFound("No records found");

                return Ok(employees);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while retrieving all employees");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [Route("GetSalaryById")]
        [HttpGet]
        public async Task<IActionResult> GetSalaryById(int id)
        {
            try
            {
                if (id <= 0)
                    return BadRequest("Invalid Employee Id");

                var employee = await _empService.GetById(id);
                if (employee == null)
                    return NotFound($"No records found for Employee Id {id}");

                return Ok(employee);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while retrieving employee with Id {id}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }



        [Route("InsertSalary")]
        [HttpPost]
        public async Task<IActionResult> InsertSalary(InsertSalary categoryModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _empService.Insert(categoryModel);
                    if (result)
                        return Ok(categoryModel);
                    else
                        return BadRequest("Something went wrong. Please try again later.");
                }
                else
                    return BadRequest("Invalid Employee Information. Please enter valid data.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating employee");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }


        [Route("UpdateSalary")]
        [HttpPut]
        public async Task<IActionResult> UpdateSalary(UpdateSalary categoryModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _empService.Update(categoryModel);
                    if (result)
                        return Ok(categoryModel);
                    else
                        return BadRequest("Something went wrong. Please try again later.");
                }
                else
                    return BadRequest("Invalid Employee Information. Please enter valid data.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating employee");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [Route("DeleteSalary")]
        [HttpDelete]
        public async Task<IActionResult> DeleteSalary(int id)
        {
            try
            {
                var result = await _empService.Delete(id);
                if (result)
                    return Ok($"Employee with Id {id} deleted successfully.");
                else
                    return BadRequest("Employee is not deleted. Please try again later.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error occurred while deleting employee with Id {id}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
    }
}
