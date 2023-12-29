using Domain.Models;
using Domain.ViewModels;
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
        public DepartmentService(IRepository<Department> repository)
        {
            _repository = repository;
        }
        public async Task<bool> Delete(int id)
        {
            if (id != null)
            {
                Department student = await _repository.GetById(id);
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

        public Task<Department> Find(Expression<Func<Department, bool>> match)
        {
           return _repository.Find(match);
        }

        public async Task<ICollection<DepartmentViewModel>> GetAll()
        {
            ICollection<DepartmentViewModel> orderViewModels = new List<DepartmentViewModel>();
            ICollection<Department> orders = await _repository.GetAll();
            foreach (Department order in orders)
            {
                DepartmentViewModel viewModel = new()
                {
                    Id = order.Id,
                   DepName = order.DepName,


                };
                orderViewModels.Add(viewModel);
            }
            return orderViewModels;
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
                DepartmentViewModel viewModel = new()
                {
                    Id = result.Id,
                   DepName = result.DepName,
                };
                return viewModel;
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

        public Task<bool> Insert(InsertDepartment inserFood)
        {
            Department student = new()
            {
                DepName = inserFood.DepName,    
            };
            return _repository.Insert(student);
        }

        public async Task<bool> Update(UpdateDepartment StudentUpdateModel)
        {
            Department student = await _repository.GetById(StudentUpdateModel.Id);
            if (student != null)
            {
                student.Id = StudentUpdateModel.Id;
                student.DepName = StudentUpdateModel.DepName;
              

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
