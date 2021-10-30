import { Button } from '@material-ui/core';
import CustomDialog from './CustomDialog';
import React from 'react';
import { Config } from '../types/client';

interface Props {
  open: boolean;
  onClose: () => void;
  config?: Config;
}

const SentEmailVerificationDialog: React.FC<Props> = ({
  open,
  onClose,
  config,
}) => {
  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      heading="Email Verification Sent"
      DialogHeadingProps={config?.props?.DialogHeadingProps}
      DialogProps={config?.props?.DialogProps}
      CardProps={config?.props?.CardProps}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={onClose}
        fullWidth
        {...config?.props?.SubmitButtonProps}
      >
        Close
      </Button>
    </CustomDialog>
  );
};

export default SentEmailVerificationDialog;
