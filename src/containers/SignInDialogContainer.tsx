import SignInDialog from '../components/SignInDialog';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import {
  hideSignInDialog,
  displaySignUpDialog,
  displayResetPasswordDialog,
} from '../store/authSlice';
import React, { useContext } from 'react';
import ReactReduxFirebaseAuthContext from '../ReactReduxFirebaseAuthContext';
import { signIn } from '../store/authSlice';

interface FormDetails {
  email: string;
  password: string;
}

const SignInDialogContainer = () => {
  const context = useContext(ReactReduxFirebaseAuthContext);
  const dispatch = useAppDispatch();
  const hideDialog = () => dispatch(hideSignInDialog());
  const switchToSignUpDialog = () => {
    dispatch(hideSignInDialog());
    dispatch(displaySignUpDialog());
  };
  const switchToResetPasswordDialog = () => {
    dispatch(hideSignInDialog());
    dispatch(displayResetPasswordDialog());
  };
  const { open, loading, error } = useAppSelector(
    state => state.auth.signInDialog
  );

  const onSubmit = ({ email, password }: FormDetails) => {
    dispatch(
      signIn({ app: context?.app, config: context?.config, email, password })
    );
  };

  return (
    <SignInDialog
      onSubmit={onSubmit}
      switchToSignUpDialog={switchToSignUpDialog}
      switchToResetPasswordDialog={switchToResetPasswordDialog}
      open={open}
      hideDialog={hideDialog}
      loading={loading}
      error={error}
      config={context?.config}
    />
  );
};

export default SignInDialogContainer;
