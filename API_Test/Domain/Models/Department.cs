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
    public class Department : BaseEntityClass
    {
        [Required(ErrorMessage = "Department Name is required.")]
        public string DepName { get; set; }

        [JsonIgnore]
        public ICollection<Employee> Employees { get; set; }
    }
}
