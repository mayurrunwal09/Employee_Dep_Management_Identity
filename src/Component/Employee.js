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
import {
  fetchemp,
  addemp,
  updateemp,
  deleteemp,
} from '../Slices/employeeSlice';
import { fetchDepartments } from '../Slices/departmentSlice';

const Employee = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.departments);
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

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchemp());
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
    dispatch(addemp(formDataAdd));
    setAddFormVisible(false);
    setFormDataAdd({
      empName: '',
      email: '',
      phoneno: '',
      gender: '',
      dob: '',
      depName: '',
    });
  };

  const handleUpdateEmployee = () => {
    dispatch(updateemp(formDataUpdate));
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
  };

  const handleDeleteEmployee = (id) => {
    dispatch(deleteemp(id));
  };

  const handleUpdateButtonClick = (id) => {
    setUpdateEmployeeId(id);
    const selectedEmployee = employees.find((employee) => employee.id === id);
    setFormDataUpdate(selectedEmployee);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(employees)) {
    return <div>Error: Unable to fetch data</div>;
  }

  return (
    <div>
      <Typography variant="h3">Employee</Typography>

      <Button onClick={() => setAddFormVisible(!isAddFormVisible)}>
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
          />
          <TextField
            label="Email"
            name="email"
            value={formDataAdd.email}
            onChange={handleInputChangeAdd}
          />
          <TextField
            label="Phone no"
            name="phoneno"
            value={formDataAdd.phoneno}
            onChange={handleInputChangeAdd}
          />
          <TextField
            select
            label="Gender"
            name="gender"
            value={formDataAdd.gender}
            onChange={handleInputChangeAdd}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>
          <TextField
            label=""
            type="date"
            name="dob"
            value={formDataAdd.dob}
            onChange={handleInputChangeAdd}
          />
          <TextField
            select
            label="Dep Name"
            name="depName"
            value={formDataAdd.depName}
            onChange={handleInputChangeAdd}
          >
            {departments.map((department) => (
              <MenuItem key={department.id} value={department.depName}>
                {department.depName}
              </MenuItem>
            ))}
          </TextField>
          <Button onClick={handleAddEmployee}>Add Employee</Button>
        </Paper>
      )}

      <Typography variant="h3">Employee List</Typography>
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
              <TableCell>Dep Name</TableCell>
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
                <TableCell>{employee.dob}</TableCell>
                <TableCell>{employee.depName}</TableCell>
                <TableCell>
                  {updateEmployeeId === employee.id ? (
                    <>
                      <TextField
                        label="Name"
                        name="empName"
                        value={formDataUpdate.empName}
                        onChange={handleInputChangeUpdate}
                      />
                      <TextField
                        label="Email"
                        name="email"
                        value={formDataUpdate.email}
                        onChange={handleInputChangeUpdate}
                      />
                      <TextField
                        label="Phone no"
                        name="phoneno"
                        value={formDataUpdate.phoneno}
                        onChange={handleInputChangeUpdate}
                      />
                      <TextField
                        select
                        label="Gender"
                        name="gender"
                        value={formDataUpdate.gender}
                        onChange={handleInputChangeUpdate}
                      >
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </TextField>
                      <TextField
                        label="Date of Birth"
                        type="date"
                        name="dob"
                        value={formDataUpdate.dob}
                        onChange={handleInputChangeUpdate}
                      />
                      <TextField
                        select
                        label="Dep Name"
                        name="depName"
                        value={formDataUpdate.depName}
                        onChange={handleInputChangeUpdate}
                      >
                        {departments.map((department) => (
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
    </div>
  );
};

export default Employee;

















