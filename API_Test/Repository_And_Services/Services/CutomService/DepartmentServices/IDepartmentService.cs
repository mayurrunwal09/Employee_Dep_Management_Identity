using Domain.Models;
using Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Repository_And_Services.Services.CutomService.DepartmentServices
{
    public interface IDepartmentService
    {
        Task<ICollection<DepartmentViewModel>> GetAll();
        Task<DepartmentViewModel> GetById(int id);
        Task<DepartmentViewModel> GetByName(string name);
   
        Task<bool> Insert(InsertDepartment inserFood);
        Task<bool> Update(UpdateDepartment StudentUpdateModel);
        Task<bool> Delete(int id);
        Task<Department> Find(Expression<Func<Department, bool>> match);
    }
}
