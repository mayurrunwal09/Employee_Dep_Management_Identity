using Domain.Models;
using Domain.ViewModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Repository_And_Services.context;
using Repository_And_Services.Repository;
using Repositroy_And_Services.common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Repository_And_Services.Services.CutomService.EmployeeServices
{
    public class EmployeeService : IEmployeeSerive
    {
        private readonly IRepository<Employee> _repository;
        private readonly IRepository<Department> _depRepo;
        private readonly MainDBContext _dbContext;

        public EmployeeService(IRepository<Employee> repository, IRepository<Department> deprepo , MainDBContext mainDBContext)
        {
            _repository = repository;
            _dbContext = mainDBContext;
            _depRepo = deprepo;
        }
        public async Task<bool> Delete(int id)
        {

            if (id != null)
            {
                Employee employee = await _repository.GetById(id);
                if (employee != null)
                {
                    return await _repository.Delete(employee);
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }

        public Task<Employee> Find(Expression<Func<Employee, bool>> match)
        {
            return _repository.Find(match);
        }

        public async Task<ICollection<EmployeeViewModel>> GetAll()
        {
            ICollection<EmployeeViewModel> employeeViewModels = new List<EmployeeViewModel>();
            ICollection<Employee> employees = await _dbContext.Employees
                .Include(d => d.Departments)
                .Include(d => d.Salarys)
                .ToListAsync();

            foreach (Employee employee in employees)
            {
                EmployeeViewModel viewModel = new()
                {
                    Id = employee.Id,
                    EmpName = employee.EmpName,
                    Email = employee.Email,
                
                    Phoneno = employee.Phoneno,
                    Gender = employee.Gender,
                    DOB = employee.DOB,
                    DepId = employee.DepId,
                    DepName = employee.Departments?.DepName,
                    SalaryAmount = employee.Salarys?.Sum(s => s.Amount) ?? 0
                };

                employeeViewModels.Add(viewModel);
            }

            return employeeViewModels;
        }







        public async Task<EmployeeViewModel> GetById(int id)
        {
            var result = await _repository.GetById(id);
            if (result == null)
            {
                return null;
            }
            else
            {
                EmployeeViewModel viewModel = new()
                {
                    Id = result.Id,
                    EmpName = result.EmpName,
                    Email = result.Email,
                   
                    Phoneno = result.Phoneno,
                    Gender = result.Gender,
                    DOB = result.DOB,
                    DepId = result.DepId,
                };
                return viewModel;
            }
        }

        public async Task<EmployeeViewModel> GetByName(string name)
        {
            var result = await _repository.GetByName(name);
            if (result == null)
            {
                return null;
            }
            else
            {
                EmployeeViewModel viewModel = new()
                {
                    Id = result.Id,
                    EmpName = result.EmpName,
                    Email = result.Email,
                    Phoneno = result.Phoneno,
                    Gender = result.Gender,
                    DOB = result.DOB,
                    DepId = result.DepId,
                };
                return viewModel;
            }
        }

     
        public async Task<bool> Insert(InserEmployee inserEmployee)
        {
            Department department = await _dbContext.Departments.FirstOrDefaultAsync(d=>d.DepName == inserEmployee.DepName);
            if (department == null)
            {
                return false;
            }
            Employee student = new()
            {
                EmpName = inserEmployee.EmpName,
                Email = inserEmployee.Email,
                Phoneno = inserEmployee.Phoneno,
                Gender = inserEmployee.Gender,
                DOB = inserEmployee.DOB,
                DepId = department.Id,
            };
            return await _repository.Insert(student);
        }
      
        public async Task<bool> Update(UpdateEmployee updateEmployee)
        {
            Department department = await _dbContext.Departments.FirstOrDefaultAsync(d => d.DepName == updateEmployee.DepName);
            if (department == null)
            {
                return false;
            }

            Employee student = await _repository.GetById(updateEmployee.Id);
            if (student != null)
            {
                student.Id = updateEmployee.Id;
               
                student.EmpName = updateEmployee.EmpName;
                student.Email = updateEmployee.Email;
                student.Phoneno = updateEmployee.Phoneno;
                student.Gender = updateEmployee.Gender;
                student.DOB = updateEmployee.DOB ;
               
                student.DepId = department.Id;

                var result = await _repository.Update(student);
                return result;
            }
            else
            {
                return false;
            }
        }
     
        public async Task<ICollection<EmployeeViewModel>> GetEmployeesByNameAsync(string employeeName)
        {
            try
            {
                if (string.IsNullOrEmpty(employeeName))
                {
                    return null;
                }

                var employees = await _dbContext.Employees
                    .Include(d => d.Departments)
                    .Include(d => d.Salarys)
                    .Where(e => e.EmpName.ToLower().Contains(employeeName.ToLower()))
                    .ToListAsync();

                var employeeViewModels = employees.Select(e => new EmployeeViewModel
                {
                    Id = e.Id,
                    EmpName = e.EmpName,
                    Email = e.Email,
                    Phoneno = e.Phoneno,
                    Gender = e.Gender,
                    DOB = e.DOB,
                    DepId = e.DepId,
                    DepName = e.Departments?.DepName,
                    SalaryAmount = e.Salarys?.Sum(s => s.Amount) ?? 0
                }).ToList();

                return employeeViewModels;
            }
            catch (Exception ex)
            {

                return null;
            }
        }





        public async Task<List<EmployeeViewModel>> GetEmployeesBySalaryRangeAsync(double minSalary, double maxSalary)
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
                    .Select(e => new EmployeeViewModel
                    {
                        Id = e.Id,
                        EmpName = e.EmpName,
                        Email = e.Email,
                        Phoneno = e.Phoneno,
                        Gender = e.Gender,
                        DOB = e.DOB,
                        DepId = e.DepId,
                        DepName = e.Departments?.DepName,
                        SalaryAmount = e.Salarys?.Sum(s => s.Amount) ?? 0,
                    })
                    .ToList();

                return filteredEmployees;
            }
            catch (Exception ex)
            {
                throw;
            }
        }



    }
}
