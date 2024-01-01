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

namespace Repository_And_Services.Services.CutomService.DepartmentServices
{
    public class DepartmentService : IDepartmentService
    {
        private readonly IRepository<Department> _repository;
        private readonly MainDBContext _dbContext;
        public DepartmentService(IRepository<Department> repository, MainDBContext dbContext)
        {
            _repository = repository;
            _dbContext = dbContext;
        }
        public async Task<bool> Delete(int id)
        {
            if (id != null)
            {
                Department department = await _repository.GetById(id);
                if (department != null)
                {
                    return await _repository.Delete(department);
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

        public Task<Department> Find(Expression<Func<Department, bool>> match)
        {
           return _repository.Find(match);
        }

        public async Task<ICollection<DepartmentViewModel>> GetAll()
        {
            ICollection<DepartmentViewModel> departmentViewModels = new List<DepartmentViewModel>();
            ICollection<Department> departments = await _repository.GetAll();
            foreach (Department dep in departments)
            {
                DepartmentViewModel depviewModel = new()
                {
                    Id = dep.Id,
                   DepName = dep.DepName,


                };
                departmentViewModels.Add(depviewModel);
            }
            return departmentViewModels;
        }

        public async Task<DepartmentViewModel> GetById(int id)
        {
            var result = await _repository.GetById(id);
            if (result == null)
            {
                return null;
            }
            else
            {
                DepartmentViewModel depviewModel = new()
                {
                    Id = result.Id,
                   DepName = result.DepName,
                };
                return depviewModel;
            }
        }

        public async Task<DepartmentViewModel> GetByName(string name)
        {
            var result = await _repository.GetByName(name);
            if (result == null)
            {
                return null;
            }
            else
            {
                DepartmentViewModel viewModel = new()
                {
                    Id = result.Id,
                    DepName = result.DepName,
                };
                return viewModel;
            }
        }

        public Task<bool> Insert(InsertDepartment insertDepartment)
        {
            Department student = new()
            {
                DepName = insertDepartment.DepName,    
            };
            return _repository.Insert(student);
        }

        public async Task<bool> Update(UpdateDepartment updateDepartment)
        {
            Department student = await _repository.GetById(updateDepartment.Id);
            if (student != null)
            {
                student.Id = updateDepartment.Id;
                student.DepName = updateDepartment.DepName;
              

                var result = await _repository.Update(student);
                return result;
            }
            else
            {
                return false;
            }
        }
        public async Task<List<DepartmentWiseMonthlySalaryViewModel>> GetDepartmentWiseMonthlySalaryAsync(int year)
        {
            try
            {
                var salaries = await _dbContext.Salarys
                    .Include(s => s.Employee.Departments)
                    .Where(s => s.Date.Year == year)
                    .ToListAsync();

                var result = salaries
                    .GroupBy(s => new { s.Employee.Departments.Id, s.Employee.Departments.DepName, s.Date.Month })
                    .Select(group => new DepartmentWiseMonthlySalaryViewModel
                    {
                        DepartmentId = group.Key.Id,
                        DepartmentName = group.Key.DepName,
                        Month = group.Key.Month,
                        TotalSalary = group.Sum(s => s.Amount)
                    })
                    .ToList();

                return result;
            }
            catch (Exception ex)
            {
               
                throw;
            }
        }
    }
}
