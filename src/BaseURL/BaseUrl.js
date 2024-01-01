
const BASE_URL = "https://localhost:44331/";



const getAuthenticationToken = () => {
  const token = localStorage.getItem('accessToken');
  return token ? `Bearer ${token}` : '';
}





// // Department
// export const getAllDepartments = () => {
//   return fetch(`${BASE_URL}api/Department/GetAllDepartment`)
//     .then((response) => response.json())
//     .catch((error) => console.error("API Error:", error));
// };

// export const addDepartment = (data) => {
//   return fetch(`${BASE_URL}api/Department/InsertDepartment`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .catch((error) => console.error("API Error:", error));
// };

// export const updateDepartment = (data) => {
//   return fetch(`${BASE_URL}api/Department/UpdateDepartment`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(data),
//   })
//     .then((response) => response.json())
//     .catch((error) => console.error("API Error:", error));
// };

// export const deleteDepartment = (id) => {
//   return fetch(`${BASE_URL}api/Department/DeleteDepartment?Id=${id}`, {
//     method: 'DELETE',
//   })
//     .then((response) => response.json())
//     .catch((error) => console.error("API Error:", error));
// };







// // Employee

// export const getAllEmployee = () => {
//     return fetch(`${BASE_URL}api/Employee/GetAllEmployee`)
//       .then((response) => response.json())
//       .catch((error) => console.error("API Error:", error));
//   };
  
//   export const addEmployee = (data) => {
//     return fetch(`${BASE_URL}api/Employee/InserEmployee`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .catch((error) => console.error("API Error:", error));
//   };
  
//   export const updateEmployee = (data) => {
//     return fetch(`${BASE_URL}api/Employee/UpdateEmployee`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .catch((error) => console.error("API Error:", error));
//   };
  
//   export const deleteEmployee = (id) => {
//     return fetch(`${BASE_URL}api/Employee/DeleteEmployee?Id=${id}`, {
//       method: 'DELETE',
//     })
//       .then((response) => response.json())
//       .catch((error) => console.error("API Error:", error));
//   };










  

// // Salary

// export const getAllSalary = () => {
//     return fetch(`${BASE_URL}api/Salary/GetAllSalary`)
//       .then((response) => response.json())
//       .catch((error) => console.error("API Error:", error));
//   };
  
//   export const addSalary = (data) => {
//     return fetch(`${BASE_URL}api/Salary/InsertSalary`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .catch((error) => console.error("API Error:", error));
//   };
  
//   export const updateSalary = (data) => {
//     return fetch(`${BASE_URL}api/Salary/UpdateSalary`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .catch((error) => console.error("API Error:", error));
//   };
  
//   export const deleteSalary = (id) => {
//     return fetch(`${BASE_URL}api/Salary/DeleteSalary?Id=${id}`, {
//       method: 'DELETE',
//     })
//       .then((response) => response.json())
//       .catch((error) => console.error("API Error:", error));
//   };




//   // Login
//   export const userLogin = (data) => {
//     return fetch(`${BASE_URL}api/Login/Login`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .catch((error) => console.error("API Error:", error));
//   };


//   // registration
//   export const Registration = (data) => {
//     return fetch(`${BASE_URL}api/Login/Register`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .catch((error) => console.error("API Error:", error));
//   };


//    // Logout
//    export const Logout = (data) => {
//     return fetch(`${BASE_URL}api/Login/Logout`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(data),
//     })
//       .then((response) => response.json())
//       .catch((error) => console.error("API Error:", error));
//   };







  
//   // Condition
//   export const searchEmployeename = (empname) => {
//     return fetch(`${BASE_URL}/api/Condition/GetEmployeesByName?employeeName=${empname}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`API Error: ${response.status} - ${response.statusText}`);
//         }
//         return response.json();
//       })
//       .catch((error) => {
//         console.error("API Error:", error);
//         throw error;
//       });
//   };
  
  



 // Department
export const getAllDepartments = () => {
  return fetch(`${BASE_URL}api/Department/GetAllDepartment`, {
    headers: {
      Authorization: getAuthenticationToken(),
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error("API Error:", error));
};

export const addDepartment = (data) => {
  return fetch(`${BASE_URL}api/Department/InsertDepartment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthenticationToken(),
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error("API Error:", error));
};

export const updateDepartment = (data) => {
  return fetch(`${BASE_URL}api/Department/UpdateDepartment`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthenticationToken(),
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error("API Error:", error));
};

export const deleteDepartment = (id) => {
  return fetch(`${BASE_URL}api/Department/DeleteDepartment?Id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthenticationToken(),
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error("API Error:", error));
};

// Employee
export const getAllEmployee = () => {
  return fetch(`${BASE_URL}api/Employee/GetAllEmployee`, {
    headers: {
      Authorization: getAuthenticationToken(),
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error("API Error:", error));
};

export const addEmployee = (data) => {
  return fetch(`${BASE_URL}api/Employee/InserEmployee`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthenticationToken(),
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error("API Error:", error));
};

export const updateEmployee = (data) => {
  return fetch(`${BASE_URL}api/Employee/UpdateEmployee`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthenticationToken(),
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error("API Error:", error));
};

export const deleteEmployee = (id) => {
  return fetch(`${BASE_URL}api/Employee/DeleteEmployee?Id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthenticationToken(),
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error("API Error:", error));
};

// Salary
export const getAllSalary = () => {
  return fetch(`${BASE_URL}api/Salary/GetAllSalary`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthenticationToken(),
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error("API Error:", error));
};

export const addSalary = (data) => {
  return fetch(`${BASE_URL}api/Salary/InsertSalary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthenticationToken(),
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error("API Error:", error));
};

export const updateSalary = (data) => {
  return fetch(`${BASE_URL}api/Salary/UpdateSalary`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthenticationToken(),
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error("API Error:", error));
};

export const deleteSalary = (id) => {
  return fetch(`${BASE_URL}api/Salary/DeleteSalary?Id=${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthenticationToken(),
    },
  })
    .then((response) => response.json())
    .catch((error) => console.error("API Error:", error));
};

// Login
export const userLogin = (data) => {
  return fetch(`${BASE_URL}api/Login/Login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error("API Error:", error));
};

// Registration
export const Registration = (data) => {
  return fetch(`${BASE_URL}api/Login/Register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error("API Error:", error));
};

// Logout
export const Logout = (data) => {
  return fetch(`${BASE_URL}api/Login/Logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: getAuthenticationToken(),
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.error("API Error:", error));
};

// Condition
export const searchEmployeename = (empname) => {
  return fetch(`${BASE_URL}/api/Condition/GetEmployeesByName?employeeName=${empname}`, {
    headers: {
      Authorization: getAuthenticationToken(),
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} - ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("API Error:", error);
      throw error;
    });
};
