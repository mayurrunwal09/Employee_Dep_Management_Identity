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

        Task<bool> Insert(InserEmployee inserEmployee);
        Task<bool> Update(UpdateEmployee updateEmployee);
        Task<bool> Delete(int id);
        Task<Employee> Find(Expression<Func<Employee, bool>> match);
        Task<ICollection<EmployeeViewModel>> GetEmployeesByNameAsync(string employeeName);
        Task<List<EmployeeViewModel>> GetEmployeesBySalaryRangeAsync(double minSalary, double maxSalary);




    }
}
