import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Input,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import {
  addDep,
  deleteDep,
  fetchDepartments,
  updateDep,
} from '../Slices/salarySlice';

const Salary = () => {
  const dispatch = useDispatch();
  const actors = useSelector((state) => state.salary.salary);
  const status = useSelector((state) => state.employee.status);

  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [formDataAdd, setFormDataAdd] = useState({
    empName: '',
    amount: 0,
    date: '',
  });

  const [updateActorId, setUpdateActorId] = useState(0);

  const [formDataUpdate, setFormDataUpdate] = useState({
    id: 0,
    empName: '',
    amount: 0,
    date: '',
  });

  const [validationErrorsAdd, setValidationErrorsAdd] = useState({});
  const [validationErrorsUpdate, setValidationErrorsUpdate] = useState({});

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleInputChangeAdd = (e) => {
    setFormDataAdd({ ...formDataAdd, [e.target.name]: e.target.value });
  };

  const handleInputChangeUpdate = (e) => {
    setFormDataUpdate({ ...formDataUpdate, [e.target.name]: e.target.value });
  };

  const handleAddActor = () => {
    const errors = validateAddForm(formDataAdd);
    if (Object.keys(errors).length === 0) {
      dispatch(addDep(formDataAdd));
      setAddFormVisible(false);
      setFormDataAdd({
        empName: '',
        amount: 0,
        date: '',
      });
      dispatch(fetchDepartments());
      setValidationErrorsAdd({});
    } else {
      setValidationErrorsAdd(errors);
    }
  };

  const handleUpdateActor = () => {
    const errors = validateUpdateForm(formDataUpdate);
    if (Object.keys(errors).length === 0) {
      dispatch(updateDep(formDataUpdate));
      setUpdateActorId(0);
      setFormDataUpdate({
        id: 0,
        empName: '',
        amount: 0,
        date: '',
      });
      dispatch(fetchDepartments());
      setValidationErrorsUpdate({});
    } else {
      setValidationErrorsUpdate(errors);
    }
  };

  const handleDeleteActor = (id) => {
    dispatch(deleteDep(id));
    dispatch(fetchDepartments());
  };

  const handleUpdateButtonClick = (id) => {
    setUpdateActorId(id);
    const selectedActor = actors.find((actor) => actor.id === id);
    setFormDataUpdate(selectedActor);
    setValidationErrorsUpdate({});
  };

  const validateAddForm = (data) => {
    let errors = {};

    if (!data.empName.trim()) {
      errors.empName = 'Employee Name is required.';
    }
    
    

    if (data.amount <= 0) {
      errors.amount = 'Amount must be greater than 0.';
    }

    if (!data.date.trim()) {
      errors.date = 'Date is required.';
    }

    return errors;
  };

  const validateUpdateForm = (data) => {
    let errors = {};

    if (!data.empName.trim()) {
      errors.empName = 'Employee Name is required.';
    }

    if (data.amount <= 0) {
      errors.amount = 'Amount must be greater than 0.';
    }

    if (!data.date.trim()) {
      errors.date = 'Date is required.';
    }

    return errors;
  };

  return (
    <div>
      <Typography variant="h3">Salary List</Typography>

      <Button variant="contained" onClick={() => setAddFormVisible(!isAddFormVisible)}>
        Add Salary
      </Button>

      {isAddFormVisible && (
        <Paper>
          <Typography variant="h6">Add Salary</Typography>
          <Input
            type="text"
            name="empName"
            placeholder="Employee Name"
            value={formDataAdd.empName}
            onChange={handleInputChangeAdd}
            error={!!validationErrorsAdd.empName}
            helperText={validationErrorsAdd.empName}
            validateAddForm
          />
          <Input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formDataAdd.amount}
            onChange={handleInputChangeAdd}
            error={!!validationErrorsAdd.amount}
            helperText={validationErrorsAdd.amount}
          />
          <Input
            type="date"
            name="date"
            placeholder="Date"
            value={formDataAdd.date}
            onChange={handleInputChangeAdd}
            error={!!validationErrorsAdd.date}
            helperText={validationErrorsAdd.date}
          />
          <Button onClick={handleAddActor}>Add Salary</Button>
        </Paper>
      )}

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {actors.map((actor) => (
              <TableRow key={actor.id}>
                <TableCell>{actor.id}</TableCell>
                <TableCell>{actor.empName}</TableCell>
                <TableCell>{actor.amount}</TableCell>
                <TableCell>{new Date(actor.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  {updateActorId === actor.id ? (
                    <>
                      <Input
                        type="text"
                        name="empName"
                        placeholder="Employee Name"
                        value={formDataUpdate.empName}
                        onChange={handleInputChangeUpdate}
                        error={!!validationErrorsUpdate.empName}
                        helperText={validationErrorsUpdate.empName}
                      />
                      <Input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={formDataUpdate.amount}
                        onChange={handleInputChangeUpdate}
                        error={!!validationErrorsUpdate.amount}
                        helperText={validationErrorsUpdate.amount}
                      />
                      <Input
                        type="date"
                        name="date"
                        placeholder="Date"
                        value={formDataUpdate.date}
                        onChange={handleInputChangeUpdate}
                        error={!!validationErrorsUpdate.date}
                        helperText={validationErrorsUpdate.date}
                      />
                      <Button onClick={handleUpdateActor}>Update Salary</Button>
                    </>
                  ) : (
                    <>
                      <Button onClick={() => handleUpdateButtonClick(actor.id)}>
                        Update
                      </Button>
                      <Button onClick={() => handleDeleteActor(actor.id)}>
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

export default Salary;
