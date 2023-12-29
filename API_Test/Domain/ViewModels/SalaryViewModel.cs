using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class SalaryViewModel
    {
        public int Id { get; set; } 
        public int EmpId { get; set; }
        public string EmpName { get; set; }
        public double Amount { get; set; }
        public DateTime Date { get; set; }

        public EmployeeViewModel Employee { get; set; }
    }
    public class InsertSalary
    {
        [Required(ErrorMessage = "Employee Name is required.")]
        public string EmpName { get; set; }

        [Required(ErrorMessage = "Amount is required.")]
        public double Amount { get; set; }

        [Required(ErrorMessage = "Date is required.")]
        public DateTime Date { get; set; }
    }
    public class UpdateSalary : InsertSalary
    {
        public int Id { get; set;}
    }
}
