using Domain.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Repository_And_Services.Services.CutomService.EmployeeServices;
using System;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   // [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeSerive _empService;
        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(IEmployeeSerive empService, ILogger<EmployeeController> logger)
        {
            _empService = empService;
            _logger = logger;
        }

        [Route("GetAllEmployee")]
        [HttpGet]
        public async Task<IActionResult> GetAllEmployee()
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

        [Route("GetEmployeeById")]
        [HttpGet]
        public async Task<IActionResult> GetEmployeeById(int id)
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

  
        
        [Route("InserEmployee")]
        [HttpPost]
        public async Task<IActionResult> InserEmployee(InserEmployee categoryModel)
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
        

        [Route("UpdateEmployee")]
        [HttpPut]
        public async Task<IActionResult> UpdateEmployee(UpdateEmployee categoryModel)
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

        [Route("DeleteEmployee")]
        [HttpDelete]
        public async Task<IActionResult> DeleteEmployee(int id)
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
