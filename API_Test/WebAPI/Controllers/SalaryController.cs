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
    [Authorize]
    public class SalaryController : ControllerBase
    {
        private readonly ISalaryService _salaryService;

        public SalaryController(ISalaryService salaryService)
        {
            _salaryService = salaryService;
        }

        [Route("GetAllSalary")]
        [HttpGet]
        public async Task<IActionResult> GetAllSalary()
        {
            try
            {
                var sal = await _salaryService.GetAll();
                if (sal == null || sal.Count == 0)
                    return NotFound("No records found");

                return Ok(sal);
            }
            catch (Exception ex)
            {
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
                    return BadRequest("Invalid Salary Id");

                var salr = await _salaryService.GetById(id);
                if (salr == null)
                    return NotFound($"No records found for Salary Id {id}");

                return Ok(salr);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [Route("InsertSalary")]
        [HttpPost]
        public async Task<IActionResult> InsertSalary(InsertSalary insertsalary)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _salaryService.Insert(insertsalary);
                    if (result)
                        return Ok(insertsalary);
                    else
                        return BadRequest("Something went wrong. Please try again later.");
                }
                else
                    return BadRequest("Invalid Salary Information. Please enter valid data.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [Route("UpdateSalary")]
        [HttpPut]
        public async Task<IActionResult> UpdateSalary(UpdateSalary updatesalary)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _salaryService.Update(updatesalary);
                    if (result)
                        return Ok(updatesalary);
                    else
                        return BadRequest("Something went wrong. Please try again later.");
                }
                else
                    return BadRequest("Invalid salary Information. Please enter valid data.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [Route("DeleteSalary")]
        [HttpDelete]
        public async Task<IActionResult> DeleteSalary(int id)
        {
            try
            {
                var result = await _salaryService.Delete(id);
                if (result)
                    return Ok($"Salary with Id {id} deleted successfully.");
                else
                    return BadRequest("Salary is not deleted. Please try again later.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
    }
}
