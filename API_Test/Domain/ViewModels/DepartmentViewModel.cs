using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class DepartmentViewModel
    {
        public int Id { get; set; }
        public string DepName { get; set; }
    }
    public class InsertDepartment
    {

        [Required(ErrorMessage = "Department Name is required.")]
        public string DepName { get; set; }
    }
    public class UpdateDepartment : InsertDepartment
    {
        public int Id { get; set;}
    }
    public class DepartmentWiseMonthlySalaryViewModel
    {
        public int DepartmentId { get; set; }
        public string DepartmentName { get; set; }
        public int Month { get; set; }
        public double TotalSalary { get; set; }
    }
}
