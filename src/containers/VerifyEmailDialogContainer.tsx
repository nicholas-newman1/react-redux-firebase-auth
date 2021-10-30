import VerifyEmailDialog from '../components/VerifyEmailDialog';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { hideVerifyEmailDialog } from '../store/authSlice';
import React, { useContext } from 'react';
import ReactReduxFirebaseAuthContext from '../ReactReduxFirebaseAuthContext';

const VerifyEmailDialogContainer = () => {
  const context = useContext(ReactReduxFirebaseAuthContext);
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(state => state.auth.verifyEmailDialog);

  return (
    <VerifyEmailDialog
      open={open}
      onClose={() => dispatch(hideVerifyEmailDialog())}
      config={context?.config}
    />
  );
};

export default VerifyEmailDialogContainer;
