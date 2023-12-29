
using Domain.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Repository_And_Services.Services.CutomService.DepartmentServices;
using System;
using System.Threading.Tasks;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   // [Authorize]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _depService;
        private readonly ILogger<DepartmentController> _logger;

        public DepartmentController(IDepartmentService depService, ILogger<DepartmentController> logger)
        {
            _depService = depService;
            _logger = logger;
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
                _logger.LogError(ex, "Error occurred while retrieving all departments");
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
                _logger.LogError(ex, $"Error occurred while retrieving department with Id {id}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [Route("InsertDepartment")]
        [HttpPost]
        public async Task<IActionResult> InsertDepartment(InsertDepartment categoryModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _depService.Insert(categoryModel);
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
                _logger.LogError(ex, "Error occurred while inserting department");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [Route("UpdateDepartment")]
        [HttpPut]
        public async Task<IActionResult> UpdateDepartment(UpdateDepartment categoryModel)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var result = await _depService.Update(categoryModel);
                    if (result)
                        return Ok(categoryModel);
                    else
                        return BadRequest("Something went wrong. Please try again later.");
                }
                else
                    return BadRequest("Invalid Department Information. Please enter valid data.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while updating department");
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
                _logger.LogError(ex, $"Error occurred while deleting department with Id {id}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
    }
}
