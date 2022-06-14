import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import './style.css';

const AddUser = ({
  open,
  handleClose,
  addUser,
  edit,
  editUser,
  editStatus,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');

  useEffect(() => {
    console.log('in use effect');
    console.log('dsf', edit);

    if (editStatus) {
      setName(edit.name);
      setEmail(edit.email);
      setPhone(edit.phone);
      setCity(edit.address.city);
      setZipCode(edit.address.zipcode);
    }
  }, [edit]);

  const addData = () => {
    let data;
    // console.log('dsf', edit);

    if (editStatus) {
      // console.log('dsf', edit);
      data = {
        ...edit,
        name,
        email,
        phone,
        address: {
          city,
          zipcode: zipCode,
        },
      };
      editUser(data);
    } else {
      data = {
        name,
        email,
        phone,
        address: {
          city,
          zipcode: zipCode,
        },
      };
      addUser(data);
    }
    console.log(data);
    close();
  };

  const close = () => {
    setName('');
    setEmail('');
    setPhone('');
    setCity('');
    setZipCode('');
    handleClose();
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Add User</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          value={name}
          label="Name"
          type="text"
          fullWidth
          onChange={(event) => setName(event.target.value)}
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          value={email}
          label="Email Address"
          type="email"
          fullWidth
          onChange={(event) => setEmail(event.target.value)}
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          value={phone}
          label="Phone"
          type="phone"
          fullWidth
          onChange={(event) => setPhone(event.target.value)}
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          value={city}
          label="City"
          type="text"
          fullWidth
          onChange={(event) => setCity(event.target.value)}
          variant="standard"
        />
        <TextField
          autoFocus
          margin="dense"
          value={zipCode}
          label="Zip Code"
          // type="number"
          fullWidth
          onChange={(event) => setZipCode(event.target.value)}
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        {editStatus ? (
          <Button onClick={addData}>Edit</Button>
        ) : (
          <Button onClick={addData}>Add</Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default AddUser;
