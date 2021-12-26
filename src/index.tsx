import reducer from './store/authSlice';
import * as actions from './store/authSlice';
import { useAppDispatch } from './hooks/useAppDispatch';
import { SignUpFormFields, User } from './types/client';
import { useContext } from 'react';
import ReactReduxFirebaseAuthContext from './ReactReduxFirebaseAuthContext';

export * from './types/client';
export * from './components';
export * from './containers';
export { default as ReactReduxFirebaseAuthProvider } from './ReactReduxFirebaseAuthProvider';
export const authReducer = reducer;
export * from './store/authSlice';

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const context = useContext(ReactReduxFirebaseAuthContext);
  const app = context?.app;
  const config = context?.config;

  // Actions
  const verifySuccess = (user: User | null) =>
    dispatch(actions.verifySuccess(user));
  const displaySignInDialog = () => dispatch(actions.displaySignInDialog());
  const hideSignInDialog = () => dispatch(actions.hideSignInDialog());
  const displayEditProfileDialog = () =>
    dispatch(actions.displayEditProfileDialog());
  const hideEditProfileDialog = () => dispatch(actions.hideEditProfileDialog());
  const displaySignUpDialog = () => dispatch(actions.displaySignUpDialog());
  const hideSignUpDialog = () => dispatch(actions.hideSignUpDialog());
  const displayResetPasswordDialog = () =>
    dispatch(actions.displayResetPasswordDialog());
  const hideResetPasswordDialog = () =>
    dispatch(actions.hideResetPasswordDialog());
  const displayResetPasswordSentToast = () =>
    dispatch(actions.displayResetPasswordSentToast());
  const hideResetPasswordSentToast = () =>
    dispatch(actions.hideResetPasswordSentToast());
  const displaySentEmailVerificationDialog = () =>
    dispatch(actions.displaySentEmailVerificationDialog());
  const hideSentEmailVerificationDialog = () =>
    dispatch(actions.hideSentEmailVerificationDialog());
  const displayVerifyEmailDialog = () =>
    dispatch(actions.displayVerifyEmailDialog());
  const hideVerifyEmailDialog = () => dispatch(actions.hideVerifyEmailDialog());

  // Thunks
  const signOut = () => dispatch(actions.signOut({ app }));
  const signIn = (email: string, password: string) =>
    dispatch(actions.signIn({ app, config, email, password }));
  const signUp = (fields: SignUpFormFields) =>
    dispatch(actions.signUp({ app, config, fields }));

  return {
    // Actions
    verifySuccess,
    displaySignInDialog,
    hideSignInDialog,
    displayEditProfileDialog,
    hideEditProfileDialog,
    displaySignUpDialog,
    hideSignUpDialog,
    displayResetPasswordDialog,
    hideResetPasswordDialog,
    displayResetPasswordSentToast,
    hideResetPasswordSentToast,
    displaySentEmailVerificationDialog,
    hideSentEmailVerificationDialog,
    displayVerifyEmailDialog,
    hideVerifyEmailDialog,

    // Thunks
    signOut,
    signIn,
    signUp,
  };
};
