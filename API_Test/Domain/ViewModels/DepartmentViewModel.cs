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
}
