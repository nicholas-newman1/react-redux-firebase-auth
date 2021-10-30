import {
  CssBaseline,
  unstable_createMuiStrictModeTheme,
} from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { updateUser } from './store/authSlice';
import {
  ResetPasswordDialogContainer,
  ResetPasswordSentToastContainer,
  SentEmailVerificationDialogContainer,
  SignInDialogContainer,
  SignUpDialogContainer,
  VerifyEmailDialogContainer,
} from './containers';
import EditProfileDialogContainer from './containers/EditProfileDialogContainer';
import ReactReduxFirebaseAuthContext from './ReactReduxFirebaseAuthContext';
import { verifyAuth } from './store/authSlice';
import { customTheme } from './theme';
import { Config, FirebaseApp } from './types/client';

interface Props {
  app: FirebaseApp;
  store: any;
  config?: Config;
}

const ReactReduxFirebaseAuthProvider: React.FC<Props> = ({
  app,
  store,
  config,
  children,
}) => {
  useEffect(() => {
    store.dispatch(verifyAuth({ app }));
  }, []);

  const theme = customTheme(config?.theme);

  const combinedTheme = unstable_createMuiStrictModeTheme(config?.theme, {
    ...theme,
    overrides: { ...theme.overrides, ...config?.theme?.overrides },
  });

  useEffect(() => {
    let unsubscribe: () => any;
    app.auth().onAuthStateChanged(user => {
      if (
        config?.signInWith?.username ||
        config?.initialProfileValues ||
        (config?.signUpFields?.name && config?.signUpFields.username) ||
        config?.createProfile
      ) {
        if (user) {
          const userProfileRef = app.firestore().doc(`users/${user.uid}`);
          unsubscribe = userProfileRef.onSnapshot(snap => {
            store.dispatch(updateUser(snap.data() || {}));
          });
        } else {
          unsubscribe();
        }
      }
    });
  }, []);

  return (
    <ReactReduxFirebaseAuthContext.Provider value={{ app, config }}>
      <Provider store={store}>
        <ThemeProvider theme={combinedTheme}>
          <ResetPasswordDialogContainer />
          <ResetPasswordSentToastContainer />
          <SentEmailVerificationDialogContainer />
          <SignInDialogContainer />
          <SignUpDialogContainer />
          <VerifyEmailDialogContainer />
          <EditProfileDialogContainer />
        </ThemeProvider>

        <CssBaseline />
        {children}
      </Provider>
    </ReactReduxFirebaseAuthContext.Provider>
  );
};

export default ReactReduxFirebaseAuthProvider;
