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

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchDepartments());
    }
  }, [status, dispatch]);

  const handleInputChangeAdd = (e) => {
    setFormDataAdd({ ...formDataAdd, [e.target.name]: e.target.value });
  };

  const handleInputChangeUpdate = (e) => {
    setFormDataUpdate({ ...formDataUpdate, [e.target.name]: e.target.value });
  };

  const handleAddActor = () => {
    dispatch(addDep(formDataAdd));
    setAddFormVisible(false);
    setFormDataAdd({
      empName: '',
      amount: 0,
      date: '',
    });
  };

  const handleUpdateActor = () => {
    dispatch(updateDep(formDataUpdate));
    setUpdateActorId(0);
    setFormDataUpdate({
      id: 0,
      empName: '',
      amount: 0,
      date: '',
    });
  };

  const handleDeleteActor = (id) => {
    dispatch(deleteDep(id));
  };

  const handleUpdateButtonClick = (id) => {
    setUpdateActorId(id);
    const selectedActor = actors.find((actor) => actor.id === id);
    setFormDataUpdate(selectedActor);
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(actors)) {
    return <div>Error: Unable to fetch data</div>;
  }

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
          />
          <Input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formDataAdd.amount}
            onChange={handleInputChangeAdd}
          />
          <Input
            type="date"
            name="date"
            placeholder="Date"
            value={formDataAdd.date}
            onChange={handleInputChangeAdd}
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
                <TableCell>{actor.date}</TableCell>
                <TableCell>
                  {updateActorId === actor.id ? (
                    <>
                      <Input
                        type="text"
                        name="empName"
                        placeholder="Employee Name"
                        value={formDataUpdate.empName}
                        onChange={handleInputChangeUpdate}
                      />
                      <Input
                        type="number"
                        name="amount"
                        placeholder="Amount"
                        value={formDataUpdate.amount}
                        onChange={handleInputChangeUpdate}
                      />
                      <Input
                        type="date"
                        name="date"
                        placeholder="Date"
                        value={formDataUpdate.date}
                        onChange={handleInputChangeUpdate}
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



