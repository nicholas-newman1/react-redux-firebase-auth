import SentEmailVerificationDialog from '../components/SentEmailVerificationDialog';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import {
  hideSentEmailVerificationDialog,
  displaySignInDialog,
} from '../store/authSlice';
import React, { useContext } from 'react';
import ReactReduxFirebaseAuthContext from '../ReactReduxFirebaseAuthContext';

const SentEmailVerificationDialogContainer = () => {
  const dispatch = useAppDispatch();
  const context = useContext(ReactReduxFirebaseAuthContext);
  const { open } = useAppSelector(
    state => state.auth.sentEmailVerificationDialog
  );

  return (
    <SentEmailVerificationDialog
      open={open}
      onClose={() => {
        dispatch(hideSentEmailVerificationDialog());
        dispatch(displaySignInDialog());
      }}
      config={context?.config}
    />
  );
};

export default SentEmailVerificationDialogContainer;
