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
    public class Salary : BaseEntityClass
    {
        [Required(ErrorMessage = "Employee ID is required.")]
        public int EmpId { get; set; }

        [Required(ErrorMessage = "Amount is required.")]
        public double Amount { get; set; }

        [Required(ErrorMessage = "Date is required.")]
        public DateTime Date { get; set; }

        [JsonIgnore]    
        public Employee Employee { get; set; }

    }
}
