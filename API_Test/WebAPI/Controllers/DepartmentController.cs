using Domain.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repository_And_Services.Services.CutomService.DepartmentServices;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _depService;

        public DepartmentController(IDepartmentService depService)
        {
            _depService = depService;
        }

        [Route("GetAllDepartment")]
        [HttpGet]
        public async Task<IActionResult> GetAllDepartment()
        {
            try
            {
                var departments = await _depService.GetAll();
                if (departments == null || departments.Count == 0)
                    return NotFound("No records found for departments");

                return Ok(departments);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [Route("GetDepartmentById")]
        [HttpGet]
        public async Task<IActionResult> GetDepartmentById(int id)
        {
            try
            {
                if (id <= 0)
                    return BadRequest("Invalid Department Id");

                var department = await _depService.GetById(id);
                if (department == null)
                    return NotFound($"No records found for Department Id {id}");

                return Ok(department);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [Route("InsertDepartment")]
        [HttpPost]
        public async Task<IActionResult> InsertDepartment(InsertDepartment insertDepartment)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _depService.Insert(insertDepartment);
                    if (result)
                        return Ok("Department inserted successfully");
                    else
                        return BadRequest("Something went wrong. Please try again later.");
                }
                else
                    return BadRequest("Invalid Department Information. Please enter valid data.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [Route("UpdateDepartment")]
        [HttpPut]
        public async Task<IActionResult> UpdateDepartment(UpdateDepartment updateDepartment)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _depService.Update(updateDepartment);
                    if (result)
                        return Ok(updateDepartment);
                    else
                        return BadRequest("Something went wrong. Please try again later.");
                }
                else
                    return BadRequest("Invalid Department Information. Please enter valid data.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [Route("DeleteDepartment")]
        [HttpDelete]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            try
            {
                var result = await _depService.Delete(id);
                if (result)
                    return Ok($"Department with Id {id} deleted successfully.");
                else
                    return BadRequest("Department is not deleted. Please try again later.");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

    }
}
