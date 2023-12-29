using Domain.Models;
using Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repository_And_Services.Services.CutomService.EmployeeServices
{
    public interface IEmployeeSerive
    {
        Task<ICollection<EmployeeViewModel>> GetAll();
        Task<EmployeeViewModel> GetById(int id);
        Task<EmployeeViewModel> GetByName(string name);

        Task<bool> Insert(InserEmployee inserFood);
        Task<bool> Update(UpdateEmployee StudentUpdateModel);
        Task<bool> Delete(int id);
        Task<Employee> Find(Expression<Func<Employee, bool>> match);
    }
}
