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
  fetchDepartments,
  addDep,
  updateDep,
  deleteDep,
} from '../Slices/departmentSlice';
import { useAuth } from './authContext';

const getAuthenticationToken = () => {
  const token = localStorage.getItem('accessToken');
  return token ? `Bearer ${token}` : '';
}

const Department = () => {
  const dispatch = useDispatch();
  const departments = useSelector((state) => state.department.departments);
  const status = useSelector((state) => state.department.status);
  const error = useSelector((state) => state.department.error);

  const [newDepName, setNewDepName] = useState('');
  const [editDepId, setEditDepId] = useState(null);
  const [editDepName, setEditDepName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const { user } = useAuth();
  const [validationError, setValidationError] = useState('');

  useEffect(() => {
    console.log("Geting department data");
    dispatch(fetchDepartments(getAuthenticationToken()));
  }, [dispatch]);

  const handleAdd = () => {
    if (!isAdding) {
      setIsAdding(true);
     
    } else {
     
      if (!newDepName.trim()) {
        setValidationError('Department Name is required.');
        return;
      }

      dispatch(addDep({ depName: newDepName }));
      setNewDepName('');
      setIsAdding(false);
      setValidationError('');
      dispatch(fetchDepartments(getAuthenticationToken()));
    }
  };

  const handleUpdate = () => {
   
    if (!editDepName.trim()) {
      setValidationError('Department Name is required.');
      return;
    }

    dispatch(updateDep({ id: editDepId, depName: editDepName }));
    setEditDepId(null);
    setEditDepName('');
    dispatch(fetchDepartments(getAuthenticationToken()));
    setValidationError('');
  };

  const handleDelete = (id) => {
    dispatch(deleteDep(id));
  };

  return (
    <div>
      <Typography variant="h3">Department List</Typography>

      <div>
        {isAdding ? (
          <>
            <Input
              type="text"
              placeholder="Department Name"
              value={newDepName}
              onChange={(e) => setNewDepName(e.target.value)}
            />
            <Button variant="contained" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleAdd}>
              Add Department
            </Button>
          </>
        ) : (
          <Button variant="contained" onClick={() => setIsAdding(true)}>
            Add Department
          </Button>
        )}
        {validationError && (
          <Typography color="error" variant="body2">
            {validationError}
          </Typography>
        )}
      </div>

      {status === 'loading' && <Typography>Loading...</Typography>}
      {status === 'failed' && <Typography>Error: {error}</Typography>}
      {status === 'succeeded' && departments && departments.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {/* <TableCell>ID</TableCell> */}
                <TableCell>Department Name</TableCell>
                <TableCell> Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {departments.map((department) => (
                <TableRow key={department.id}>
                  {/* <TableCell>{department.id}</TableCell> */}
                  <TableCell>
                    {editDepId === department.id ? (
                      <Input
                        type="text"
                        value={editDepName}
                        onChange={(e) => setEditDepName(e.target.value)}
                      />
                    ) : (
                      department.depName
                    )}
                  </TableCell>
                  <TableCell>
                    {editDepId === department.id ? (
                      <Button variant="contained" onClick={handleUpdate}>
                        Update
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="text"
                          onClick={() => setEditDepId(department.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="text"
                          onClick={() => handleDelete(department.id)}
                        >
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

export default Department;
