using Domain.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.ViewModels
{
    public class EmployeeViewModel
    {
        public int Id { get; set; }
        public string EmpName { get; set; }
        public string Email { get; set; }
  
        public string Phoneno { get; set; }
        public string Gender { get; set; }
        public DateTime DOB { get; set; }
        public int DepId { get; set; }
     
        public string  DepName { get; set; }
        public double SalaryAmount { get; set; }
        public virtual ICollection<Salary> Salarys { get; set; }



    }
    public class InserEmployee
    {
        [Required(ErrorMessage = "Employee name is required.")]
        public string EmpName { get; set; }


        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }


        [Required(ErrorMessage = "Phone number is required.")]
        public string Phoneno { get; set; }

        [Required(ErrorMessage = "Gender is required.")]
        public string Gender { get; set; }


       

        public DateTime DOB { get; set; }


        [Required(ErrorMessage = "Department ID is required.")]

        public string DepName { get; set; }

    }
    public class UpdateEmployee : InserEmployee
    {
        public int Id { get; set; }
        public int DepId { get; set; }
    }
    public class Login
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
    public class RegisterViewModel
    {
        public string Name { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }
        public string Phoneno { get; set; }
        public string Gender { get; set; }
    }
}
