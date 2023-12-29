using Domain.Models;
using Domain.ViewModels;
using Microsoft.EntityFrameworkCore;
using Repository_And_Services.context;
using Repository_And_Services.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Repository_And_Services.Services.CutomService.SalaryServices
{
    public class SalaryService : ISalaryService
    {
        private readonly IRepository<Salary> _repository;
        private readonly IRepository<Employee> _employeeRepository;
        private readonly MainDBContext _dbContext;
        public SalaryService(IRepository<Salary> repository, IRepository<Employee> emp,MainDBContext mainDBContext)
        {
                _repository = repository;
            _employeeRepository = emp;
            _dbContext = mainDBContext;
        }
        public async Task<bool> Delete(int id)
        {
            if (id != null)
            {
                Salary student = await _repository.GetById(id);
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

        public Task<Salary> Find(Expression<Func<Salary, bool>> match)
        {
           return _repository.Find(match);
        }

        public async Task<ICollection<SalaryViewModel>> GetAll()
        {
            ICollection<SalaryViewModel> orderViewModels = new List<SalaryViewModel>();
            ICollection<Salary> orders = await _dbContext.Salarys
                .Include(d=>d.Employee)
                .ToListAsync();
            foreach (Salary order in orders)
            {
                SalaryViewModel viewModel = new()
                {
                    Id = order.Id,
                    EmpId = order.EmpId,
                    Amount = order.Amount,
                    Date = order.Date,
                    EmpName = order.Employee?.EmpName,



                };
                orderViewModels.Add(viewModel);
            }
            return orderViewModels;
        }

        public async Task<SalaryViewModel> GetById(int id)
        {
            var result = await _repository.GetById(id);
            if (result == null)
            {
                return null;
            }
            else
            {
                SalaryViewModel viewModel = new()
                {
                    Id = result.Id,
                    EmpId = result.EmpId,
                    Amount = result.Amount,
                    Date = result.Date,
                };
                return viewModel;
            }
        }

        public async Task<SalaryViewModel> GetByName(string GetByName)
        {
            var result = await _repository.GetByName(GetByName);
            if (result == null)
            {
                return null;
            }
            else
            {
                SalaryViewModel viewModel = new()
                {
                    Id = result.Id,
                    EmpId = result.EmpId,
                    Amount = result.Amount,
                    Date = result.Date,
                };
                return viewModel;
            }
        }

        public async Task<bool> Insert(InsertSalary inserFood)
        {
            Employee employee = await  _employeeRepository.Find(d => d.EmpName == inserFood.EmpName);
            if (employee == null)
            {
                return false;
            }
            Salary student = new()
            {
                Employee = employee,
                Amount = inserFood.Amount,
                Date = inserFood.Date,
             
            };
            return await _repository.Insert(student);
        }

        public async Task<bool> Update(UpdateSalary StudentUpdateModel)
        {
            Employee employee = await _employeeRepository.Find(d => d.EmpName == StudentUpdateModel.EmpName);
            if (employee == null)
            {
                return false;
            }
            Salary student = await _repository.GetById(StudentUpdateModel.Id);
            if (student != null)
            {
                student.Id = StudentUpdateModel.Id;
                student.Employee = employee;
                student.Amount = StudentUpdateModel.Amount;
                student.Date = StudentUpdateModel.Date;
          
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
