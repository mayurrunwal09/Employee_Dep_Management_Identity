using Domain.Models;
using Domain.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Repository_And_Services.Services.CutomService.SalaryServices
{
    public interface ISalaryService
    {
        Task<ICollection<SalaryViewModel>> GetAll();
        Task<SalaryViewModel> GetById(int id);
        Task<SalaryViewModel> GetByName(string name);

        Task<bool> Insert(InsertSalary insertSalary);
        Task<bool> Update(UpdateSalary updateSalary);
        Task<bool> Delete(int id);
        Task<Salary> Find(Expression<Func<Salary, bool>> match);
    }
}
