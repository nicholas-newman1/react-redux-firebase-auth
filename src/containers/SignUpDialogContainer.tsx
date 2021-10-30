import SignUpDialog from '../components/SignUpDialog';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { hideSignUpDialog, displaySignInDialog } from '../store/authSlice';
import React, { useContext } from 'react';
import ReactReduxFirebaseAuthContext from '../ReactReduxFirebaseAuthContext';
import { SignUpFormFields } from '../types/client';
import { signUp } from '../store/authSlice';

const SignUpDialogContainer = () => {
  const context = useContext(ReactReduxFirebaseAuthContext);
  const dispatch = useAppDispatch();
  const hideDialog = () => dispatch(hideSignUpDialog());
  const switchToSignInDialog = () => {
    dispatch(hideSignUpDialog());
    dispatch(displaySignInDialog());
  };
  const { open, loading, error } = useAppSelector(
    state => state.auth.signUpDialog
  );

  const onSubmit = (data: SignUpFormFields) => {
    dispatch(
      signUp({ app: context?.app, config: context?.config, fields: data })
    );
  };

  return (
    <SignUpDialog
      switchToSignInDialog={switchToSignInDialog}
      loading={loading}
      open={open}
      onSubmit={onSubmit}
      hideDialog={hideDialog}
      error={error}
      config={context?.config}
    />
  );
};

export default SignUpDialogContainer;
