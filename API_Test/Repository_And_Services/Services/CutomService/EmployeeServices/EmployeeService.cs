/*using Domain.Models;
using Domain.ViewModels;
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
        private readonly MainDBContext _dbContext;
        
        public EmployeeService(IRepository<Employee> repository,MainDBContext mainDBContext)
        {
            _repository = repository;
            _dbContext = mainDBContext;
        }
        public async Task<bool> Delete(int id)
        {

            if (id != null)
            {
                Employee student = await _repository.GetById(id);
                if (student != null)
                {
                    return await _repository.Delete(student);
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

        *//*public async Task<ICollection<EmployeeViewModel>> GetAll()
        {
            ICollection<EmployeeViewModel> orderViewModels = new List<EmployeeViewModel>();
            ICollection<Employee> orders = await _dbContext.Employees
                .Include(d => d.Departments)
                .Include(d => d.Salarys)
                .ToListAsync();

           
            foreach (Employee order in orders)
            {
                EmployeeViewModel viewModel = new()
                {
                    Id = order.Id,
                    EmpName = order.EmpName,
                    Email = order.Email,
                    Password = Encryptor.DecryptString(order.Password),
                    // Password = order.Password,
                    Phoneno = order.Phoneno,
                    Gender = order.Gender,
                    DOB = order.DOB,
                    DepId = order.DepId,
                    DepName = order.Departments?.DepName,
                 
                    
                  

                };
                orderViewModels.Add(viewModel);
            }
            return orderViewModels;
        }*//*
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
                  //  Password = Encryptor.DecryptString(employee.Password),
                  Password = employee.Password,
                    Phoneno = employee.Phoneno,
                    Gender = employee.Gender,
                    DOB = employee.DOB,
                    DepId = employee.DepId,
                    DepName = employee.Departments?.DepName,
                    SalaryAmount = employee.Salarys?.FirstOrDefault()?.Amount ?? 0
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
                  //  Password = Encryptor.DecryptString(result.Password),
                  Password = result.Password,
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
                    Password = result.Password,
                    Phoneno = result.Phoneno,
                    Gender = result.Gender,
                    DOB = result.DOB,
                    DepId = result.DepId,
                };
                return viewModel;
            }
        }

        public Task<bool> Insert(InserEmployee inserFood)
        {
            Employee student = new()
            {
                EmpName = inserFood.EmpName,
                Email = inserFood.Email,
                Password = inserFood.Password,
                Phoneno = inserFood.Phoneno,
                Gender = inserFood.Gender,
                DOB = inserFood.DOB,
                DepId = inserFood.DepId,
            };
            return _repository.Insert(student);
        }

        public async Task<bool> Update(UpdateEmployee StudentUpdateModel)
        {
            Employee student = await _repository.GetById(StudentUpdateModel.Id);
            if (student != null)
            {
                student.Id = StudentUpdateModel.Id;
                student.EmpName = StudentUpdateModel.EmpName;
                student.Email = StudentUpdateModel.Email;
                student.Password = StudentUpdateModel.Password;
                student.Phoneno = StudentUpdateModel.Phoneno;
                student.Gender = StudentUpdateModel.Gender;
                student.DOB = StudentUpdateModel.DOB;
                student.DepId = StudentUpdateModel.DepId;

                var result = await _repository.Update(student);
                return result;
            }
            else
            {
                return false;
            }
        }
    }
}
*/
























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
        private readonly UserManager<ApplicationUser> _userManager;

        public EmployeeService(IRepository<Employee> repository, IRepository<Department> deprepo , MainDBContext mainDBContext, UserManager<ApplicationUser> userManager)
        {
            _repository = repository;
            _dbContext = mainDBContext;
            _userManager = userManager;
            _depRepo = deprepo;
        }
        public async Task<bool> Delete(int id)
        {

            if (id != null)
            {
                Employee student = await _repository.GetById(id);
                if (student != null)
                {
                    return await _repository.Delete(student);
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
                    //  Password = Encryptor.DecryptString(result.Password),
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

     
        public async Task<bool> Insert(InserEmployee inserFood)
        {
            Department department = await _dbContext.Departments.FirstOrDefaultAsync(d=>d.DepName == inserFood.DepName);
            if (department == null)
            {
                return false;
            }
            Employee student = new()
            {
                EmpName = inserFood.EmpName,
                Email = inserFood.Email,
                Phoneno = inserFood.Phoneno,
                Gender = inserFood.Gender,
                DOB = inserFood.DOB,
                DepId = department.Id,
            };
            return await _repository.Insert(student);
        }
      
        public async Task<bool> Update(UpdateEmployee studentUpdateModel)
        {

            Employee student = await _repository.GetById(studentUpdateModel.Id);
            if (student != null)
            {
                student.Id = studentUpdateModel.Id;
               
                student.EmpName = studentUpdateModel.EmpName;
                student.Email = studentUpdateModel.Email;
                student.Phoneno = studentUpdateModel.Phoneno;
                student.Gender = studentUpdateModel.Gender;
                student.DOB = studentUpdateModel.DOB    ;
                student.DepId = studentUpdateModel.DepId;

                var result = await _repository.Update(student);
                return result;
            }
            else
            {
                return false;
            }
        }

    }
}
