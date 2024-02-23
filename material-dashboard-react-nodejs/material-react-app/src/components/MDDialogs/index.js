import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Icon from "@mui/material/Icon";
import AudioRecorderAndUploader from 'components/AudioRecorderAndUpdater/AudioRecorderAndUpdater';
import { AuthContext } from 'context';
import { useNavigate } from 'react-router-dom';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


export default function CustomizedDialogs() {
  const [open, setOpen] = React.useState(false);
  const navigate=useNavigate()
  const {isAuthenticated,Setaudios,audios}=React.useContext(AuthContext)


  const handleClickOpen = () => {
    
    if(isAuthenticated){
      setOpen(true);
    }else{
      navigate("/authentication/sign-in")
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  

  return (
    <React.Fragment>
      <Button variant="outlined" style={{color:"blue"}}  onClick={handleClickOpen}>
      <Icon>add</Icon>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2,mr:12 }} id="customized-dialog-title">
          Record or Upload your audio
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          
          sx={{
            position: 'absolute',
            right: 20,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <AudioRecorderAndUploader/>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Upload
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}