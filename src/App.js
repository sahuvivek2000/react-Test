import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import AddUser from './AddUser';
import './style.css';

let record;
export default function App() {
  const [tableData, setTableData] = useState();
  // const [record, setRecord] = useState();
  const [open, setOpen] = useState(false);
  const [editStatus, setEditStatus] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((json) => {
        setTableData(json);
        console.log(json);
      });
  }, []);

  const deleteRecord = (id) => {
    // console.log('delete');
    const temp = tableData.filter((item) => item.id != id);
    setTableData(temp);
  };

  const handleClose = () => {
    setOpen(false);
    // record.id = null;
    // record = {};
  };
  const addUser = (data) => {
    console.log('data', data);

    const lastId = tableData[tableData.length - 1].id;
    data.id = lastId + 1;
    setTableData([...tableData, data]);
  };
  const editUser = (data) => {
    const index = tableData.findIndex((item) => item.id === data.id);
    console.log(index);
    if (index >= 0) {
      tableData[index] = data;
    } else {
      setTableData([...tableData, data]);
    }
  };

  const editRecord = (data) => {
    setEditStatus(true);
    record = data;
    // console.log(data,record)
    setOpen(true);
  };

  return (
    <div>
      {tableData && (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead
              // style={{ backgroundColor: 'grey' }}
              >
                <TableRow>
                  <TableCell className="tableH">ID</TableCell>
                  <TableCell className="tableH">Name</TableCell>
                  <TableCell className="tableH">Email</TableCell>
                  <TableCell className="tableH">Phone</TableCell>
                  <TableCell className="tableH">City</TableCell>
                  <TableCell className="tableH">ZipCode</TableCell>
                  <TableCell className="tableH">
                    <AddIcon
                      onClick={() => {
                        setOpen(true);
                        setEditStatus(false);
                      }}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((item) => (
                  <TableRow
                    key={item.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {item.id}
                    </TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phone}</TableCell>
                    <TableCell>{item.address.city}</TableCell>
                    <TableCell>{item.address.zipcode}</TableCell>
                    <TableCell>
                      <DeleteIcon onClick={() => deleteRecord(item.id)} />
                      <EditIcon onClick={() => editRecord(item)} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      <AddUser
        open={open}
        handleClose={handleClose}
        addUser={addUser}
        edit={record}
        editUser={editUser}
        editStatus={editStatus}
      />
    </div>
  );
}
