import { Button } from '@material-ui/core';
import CustomDialog from './CustomDialog';
import React from 'react';
import { Config } from '../types/client';

interface Props {
  open: boolean;
  onClose: () => void;
  config?: Config;
}

const VerifyEmailDialog: React.FC<Props> = ({ open, onClose, config }) => {
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      heading="Please Verify Your Email Address"
      DialogHeadingProps={config?.props?.DialogHeadingProps}
      DialogProps={config?.props?.DialogProps}
      CardProps={config?.props?.CardProps}
    >
      <Button
        fullWidth
        variant="contained"
        onClick={onClose}
        {...config?.props?.SubmitButtonProps}
      >
        Close
      </Button>
    </CustomDialog>
  );
};

export default VerifyEmailDialog;
