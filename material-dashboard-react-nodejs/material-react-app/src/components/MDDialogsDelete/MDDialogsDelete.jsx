
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MDButton from 'components/MDButton';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { url } from 'utils';
import { AuthContext } from 'context';
import MDTypography from 'components/MDTypography';
export const MDDialogsDelete = () => {
    const [open, setOpen] = React.useState(false);
    const {logout} = React.useContext(AuthContext);
    const navigate=useNavigate()
    const token =localStorage.getItem("token")
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDelete=()=>{
        setOpen(false);  
    }

    return (
        <React.Fragment>
            <MDTypography onClick={handleClickOpen} component="a" ml={0.5} href="#" variant="caption" color="text" fontWeight="medium">
              Delete
            </MDTypography>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure you want to Delete!"}
                </DialogTitle>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
