import ResetPasswordDialog from '../components/ResetPasswordDialog';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import {
  hideResetPasswordDialog,
  displaySignInDialog,
  displaySignUpDialog,
} from '../store/authSlice';
import React, { useContext } from 'react';
import ReactReduxFirebaseAuthContext from '../ReactReduxFirebaseAuthContext';
import { resetPassword } from '../store/authSlice';

const ResetPasswordDialogContainer = () => {
  const context = useContext(ReactReduxFirebaseAuthContext);
  const dispatch = useAppDispatch();
  const { open, loading, error } = useAppSelector(
    state => state.auth.resetPasswordDialog
  );

  const onSubmit = (email: string) => {
    dispatch(resetPassword({ app: context?.app, email }));
  };

  return (
    <ResetPasswordDialog
      onSubmit={onSubmit}
      open={open}
      hideDialog={() => dispatch(hideResetPasswordDialog())}
      loading={loading}
      error={error}
      switchToSignInDialog={() => {
        dispatch(hideResetPasswordDialog());
        dispatch(displaySignInDialog());
      }}
      switchToSignUpDialog={() => {
        dispatch(hideResetPasswordDialog());
        dispatch(displaySignUpDialog());
      }}
      config={context?.config}
    />
  );
};

export default ResetPasswordDialogContainer;
