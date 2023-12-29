using Domain.BaseEntity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Domain.Models
{
    public class Employee : BaseEntityClass
    {
        [Required(ErrorMessage = "Employee name is required.")]
        public string EmpName { get; set; }


        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email address.")]
        public string Email { get; set; }

     

        [Required(ErrorMessage = "Phone number is required.")]
        public string Phoneno { get; set; }

        [Required(ErrorMessage = "Gender is required.")]
        public string Gender {  get; set; }


       // [Required(ErrorMessage = "Date of Birth is required.")]

        public DateTime DOB {  get; set; }


        [Required(ErrorMessage = "Department ID is required.")]

        public int DepId { get; set; }
        [JsonIgnore]
        public Department Departments { get; set; }
        public ICollection<Salary> Salarys { get; set;}
    }
}
