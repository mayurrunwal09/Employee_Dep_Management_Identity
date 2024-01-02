import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Typography,
  MenuItem,
} from '@mui/material';

import { fetchDepartments } from '../Slices/departmentSlice';
import { addEmployee, deleteEmployee, fetchEmployees, updateEmployee } from '../Slices/employeeSlice';

const Employee = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);
  const status = useSelector((state) => state.employee.status);
  const departments = useSelector((state) => state.department.departments);

  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [formDataAdd, setFormDataAdd] = useState({
    empName: '',
    email: '',
    phoneno: '',
    gender: '',
    dob: '',
    depName: '',
  });

  const [updateEmployeeId, setUpdateEmployeeId] = useState(0);
  const [formDataUpdate, setFormDataUpdate] = useState({
    id: 0,
    empName: '',
    email: '',
    phoneno: '',
    gender: '',
    dob: '',
    depName: '',
  });

  const [validationErrorsAdd, setValidationErrorsAdd] = useState({});
  const [validationErrorsUpdate, setValidationErrorsUpdate] = useState({});

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchEmployees());
      dispatch(fetchDepartments());
    }
  }, [status, dispatch]);

  const handleInputChangeAdd = (e) => {
    setFormDataAdd({ ...formDataAdd, [e.target.name]: e.target.value });
  };

  const handleInputChangeUpdate = (e) => {
    setFormDataUpdate({ ...formDataUpdate, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = () => {
    const errors = validateAddForm(formDataAdd);
    if (Object.keys(errors).length === 0) {
      dispatch(addEmployee(formDataAdd));
      setAddFormVisible(false);
      setFormDataAdd({
        empName: '',
        email: '',
        phoneno: '',
        gender: '',
        dob: '',
        depName: '',
      });
      setValidationErrorsAdd({});
    } else {
      setValidationErrorsAdd(errors);
    }
  };

  const handleUpdateEmployee = () => {
    const errors = validateUpdateForm(formDataUpdate);
    if (Object.keys(errors).length === 0) {
      dispatch(updateEmployee(formDataUpdate));
      setUpdateEmployeeId(0);
      setFormDataUpdate({
        id: 0,
        empName: '',
        email: '',
        phoneno: '',
        gender: '',
        dob: '',
        depName: '',
      });
      setValidationErrorsUpdate({});
    } else {
      setValidationErrorsUpdate(errors);
    }
  };

  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id));
  };

  const handleUpdateButtonClick = (id) => {
    setUpdateEmployeeId(id);
    const selectedEmployee = employees.find((employee) => employee.id === id);
    setFormDataUpdate(selectedEmployee);
    setValidationErrorsUpdate({});
  };

  const validateAddForm = (data) => {
    let errors = {};

    if (!data.empName.trim()) {
      errors.empName = 'Employee Name is required.';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email address.';
    }

    if (!data.phoneno.trim()) {
      errors.phoneno = 'Phone Number is required.';
    } else if (!isValidPhoneNumber(data.phoneno)) {
      errors.phoneno = 'Invalid phone number.';
    }

    if (!data.gender.trim()) {
      errors.gender = 'Gender is required.';
    }

    if (!data.dob.trim()) {
      errors.dob = 'Date of Birth is required.';
    }

    if (!data.depName.trim()) {
      errors.depName = 'Department Name is required.';
    }

    return errors;
  };

  const validateUpdateForm = (data) => {
    let errors = {};

    if (!data.empName.trim()) {
      errors.empName = 'Employee Name is required.';
    }

    if (!data.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!isValidEmail(data.email)) {
      errors.email = 'Invalid email address.';
    }

    if (!data.phoneno.trim()) {
      errors.phoneno = 'Phone Number is required.';
    } else if (!isValidPhoneNumber(data.phoneno)) {
      errors.phoneno = 'Invalid phone number.';
    }

    if (!data.gender.trim()) {
      errors.gender = 'Gender is required.';
    }

    if (!data.dob.trim()) {
      errors.dob = 'Date of Birth is required.';
    }

    if (!data.depName.trim()) {
      errors.depName = 'Department Name is required.';
    }

    return errors;
  };

  const isValidEmail = (email) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhoneNumber = (phone) => {
   
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  return (
    <div>
      <Typography variant="h3">Employee List</Typography>

      <Button variant="contained" onClick={() => setAddFormVisible(!isAddFormVisible)}>
        Add Employee
      </Button>

      {isAddFormVisible && (
        <Paper>
          <Typography variant="h3">Add Employee</Typography>
          <TextField
            label="Employee Name"
            name="empName"
            value={formDataAdd.empName}
            onChange={handleInputChangeAdd}
            error={!!validationErrorsAdd.empName}
            helperText={validationErrorsAdd.empName}
          />
          <TextField
            label="Email"
            name="email"
            value={formDataAdd.email}
            onChange={handleInputChangeAdd}
            error={!!validationErrorsAdd.email}
            helperText={validationErrorsAdd.email}
          />
          <TextField
            label="Phone no"
            name="phoneno"
            value={formDataAdd.phoneno}
            onChange={handleInputChangeAdd}
            error={!!validationErrorsAdd.phoneno}
            helperText={validationErrorsAdd.phoneno}
          />
          <TextField
            select
            label="Gender"
            name="gender"
            value={formDataAdd.gender}
            onChange={handleInputChangeAdd}
            error={!!validationErrorsAdd.gender}
            helperText={validationErrorsAdd.gender}
          >
            <MenuItem value="" disabled>
              Select Gender
            </MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
          <TextField
            label=""
            type="date"
            name="dob"
            value={formDataAdd.dob}
            onChange={handleInputChangeAdd}
            error={!!validationErrorsAdd.dob}
            helperText={validationErrorsAdd.dob}
          />
          <TextField
            select
            label="Dep Name"
            name="depName"
            value={formDataAdd.depName}
            onChange={handleInputChangeAdd}
            error={!!validationErrorsAdd.depName}
            helperText={validationErrorsAdd.depName}
          >
            <MenuItem value="" disabled>
              Select Department
            </MenuItem>
            {departments && departments.map((department) => (
              <MenuItem key={department.id} value={department.depName}>
                {department.depName}
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={handleAddEmployee}>Add Employee</Button>
        </Paper>
      )}

      {(status === 'loading' || status === 'idle') ? (
        <Typography>Loading...</Typography>
      ) : !Array.isArray(employees) ? (
        <Typography>No data in list</Typography>
      ) : employees.length === 0 ? (
        <Typography>No employees available.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone no</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Date of Birth</TableCell>
                <TableCell>Department Name</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.id}</TableCell>
                  <TableCell>{employee.empName}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.phoneno}</TableCell>
                  <TableCell>{employee.gender}</TableCell>
                  <TableCell>{new Date(employee.dob).toLocaleDateString()}</TableCell>
                  <TableCell>{employee.depName}</TableCell>
                  <TableCell>
                    {updateEmployeeId === employee.id ? (
                      <>
                        <TextField
                          label="Name"
                          name="empName"
                          value={formDataUpdate.empName}
                          onChange={handleInputChangeUpdate}
                          error={!!validationErrorsUpdate.empName}
                          helperText={validationErrorsUpdate.empName}
                        />
                        <TextField
                          label="Email"
                          name="email"
                          value={formDataUpdate.email}
                          onChange={handleInputChangeUpdate}
                          error={!!validationErrorsUpdate.email}
                          helperText={validationErrorsUpdate.email}
                        />
                        <TextField
                          label="Phone no"
                          name="phoneno"
                          value={formDataUpdate.phoneno}
                          onChange={handleInputChangeUpdate}
                          error={!!validationErrorsUpdate.phoneno}
                          helperText={validationErrorsUpdate.phoneno}
                        />
                        <TextField
                          select
                          label="Gender"
                          name="gender"
                          value={formDataUpdate.gender}
                          onChange={handleInputChangeUpdate}
                          error={!!validationErrorsUpdate.gender}
                          helperText={validationErrorsUpdate.gender}
                        >
                          <MenuItem value="" disabled>
                            Select Gender
                          </MenuItem>
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                        </TextField>
                        <TextField
                          label="Date of Birth"
                          type="date"
                          name="dob"
                          value={formDataUpdate.dob}
                          onChange={handleInputChangeUpdate}
                          error={!!validationErrorsUpdate.dob}
                          helperText={validationErrorsUpdate.dob}
                        />
                        <TextField
                          select
                          label="Dep Name"
                          name="depName"
                          value={formDataUpdate.depName}
                          onChange={handleInputChangeUpdate}
                          error={!!validationErrorsUpdate.depName}
                          helperText={validationErrorsUpdate.depName}
                        >
                          <MenuItem value="" disabled>
                            Select Department
                          </MenuItem>
                          {departments && departments.map((department) => (
                            <MenuItem key={department.id} value={department.depName}>
                              {department.depName}
                            </MenuItem>
                          ))}
                        </TextField>
                        <Button onClick={handleUpdateEmployee}>
                          Update Employee
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button onClick={() => handleUpdateButtonClick(employee.id)}>
                          Update
                        </Button>
                        <Button onClick={() => handleDeleteEmployee(employee.id)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default Employee;
