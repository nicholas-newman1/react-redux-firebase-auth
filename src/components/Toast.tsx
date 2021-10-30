import Snackbar from '@material-ui/core/Snackbar';
import { Alert, Color } from '@material-ui/lab';
import React from 'react';

interface Props {
  open: boolean;
  onClose: () => void;
  message: string;
  severity?: Color;
}

const Toast: React.FC<Props> = ({ open, onClose, message, severity }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        elevation={6}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Toast;
