import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  Config,
  EditProfileFormFields,
  FirebaseApp,
  SignUpFormFields,
  User,
} from '../types/client';
import initialState from './initialState';
import firebase from 'firebase/app';

export const editProfile = createAsyncThunk(
  'auth/editProfile',
  async (
    {
      app,
      config,
      fields,
    }: { app?: FirebaseApp; config?: Config; fields: EditProfileFormFields },
    { rejectWithValue, dispatch }
  ) => {
    try {
      if (!app) return;
      const user = app.auth().currentUser;
      if (!user) return;
      if (
        config?.signInWith?.username ||
        config?.initialProfileValues ||
        (config?.signUpFields?.name && config?.signUpFields.username) ||
        config?.createProfile
      ) {
        const editProfileFunction = app
          .functions()
          .httpsCallable('editProfile');
        await editProfileFunction({ config, ...fields });
      } else {
        await user.updateEmail(fields.email);
        dispatch(verifyAuth({ app }));
      }

      dispatch(hideEditProfileDialog());
      return null;
    } catch (err) {
      return rejectWithValue((err as any).message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  ({ app, email }: { app?: FirebaseApp; email: string }, { dispatch }) => {
    if (!app) return;
    return app
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        dispatch(hideResetPasswordDialog());
        dispatch(displayResetPasswordSentToast());
      });
  }
);

export const sendEmailVerification = createAsyncThunk(
  'auth/sendEmailVerification',
  ({ app }: { app?: FirebaseApp }) => {
    if (!app) return;
    return app.auth().currentUser?.sendEmailVerification();
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (
    {
      app,
      config,
      email,
      password,
    }: { app?: FirebaseApp; config?: Config; email: string; password: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      if (!app) return null;
      let user: firebase.User | null;

      // Sign in user
      if (config?.signInWith?.username) {
        const signInFunction = app?.functions().httpsCallable('signIn');
        const res = await signInFunction({ config, email, password });
        const cred = await app
          .auth()
          .signInWithEmailAndPassword(res.data.email, password);
        user = cred.user || null;
      } else {
        const cred = await app
          .auth()
          .signInWithEmailAndPassword(email, password);
        user = cred.user || null;
      }

      if (!user) return null;

      // Check email verification
      if (!config?.disableEmailVerification && !user.emailVerified) {
        dispatch(sendEmailVerification({ app }));
        dispatch(signOut({ app }));
        dispatch(displayVerifyEmailDialog({ email, password }));
        return null;
      }

      // Subscribe to user profile

      dispatch(hideSignInDialog());

      return {
        displayName: user.displayName,
        email: user.email || '',
        emailVerified: user.emailVerified,
        creationTime: user.metadata.creationTime,
        lastSignInTime: user.metadata.lastSignInTime,
        phoneNumber: user.phoneNumber,
        photoUrl: user.photoURL,
        uid: user.uid,
      };
    } catch (err) {
      let error = (err as any).message || 'Unknown error';
      if ((err as any).code === 'auth/too-many-requests') {
        error =
          'Too many failed attempts. Try again later, or reset your password';
      } else if (
        (err as any).code === 'auth/user-not-found' ||
        (err as any).code === 'auth/wrong-password'
      ) {
        error = 'Incorrect email or password';
      }
      return rejectWithValue(error);
    }
  }
);

export const signOut = createAsyncThunk(
  'auth/signOut',
  ({ app }: { app?: FirebaseApp }) => {
    if (!app) return;
    app.auth().signOut();
  }
);

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (
    {
      app,
      config,
      fields,
    }: { app?: FirebaseApp; config?: Config; fields: SignUpFormFields },
    { dispatch, rejectWithValue }
  ) => {
    try {
      if (!app) return null;
      let user: firebase.User | null;

      // Create and sign in user
      if (
        config?.signInWith?.username ||
        config?.initialProfileValues ||
        (config?.signUpFields?.name && config?.signUpFields.username) ||
        config?.createProfile
      ) {
        const signUpFunction = app?.functions().httpsCallable('signUp');
        const res = await signUpFunction({ config, ...fields });
        await app
          .auth()
          .signInWithEmailAndPassword(fields.email, fields.password);
        user = res.data as firebase.User;
      } else {
        const cred = await app
          .auth()
          .createUserWithEmailAndPassword(fields.email, fields.password);
        user = cred.user || null;
        user?.updateProfile({
          displayName:
            fields.username ||
            (fields.firstName && fields.lastName
              ? `${fields.firstName} ${fields.lastName}`
              : ''),
        });
      }

      // Send email verification and sign out
      if (!config?.disableEmailVerification) {
        dispatch(sendEmailVerification({ app }));
        dispatch(signOut({ app }));
        dispatch(hideSignUpDialog());
        dispatch(displaySentEmailVerificationDialog());
        return null;
      }

      dispatch(hideSignUpDialog());

      return user
        ? {
            displayName: user.displayName,
            email: user.email || '',
            emailVerified: user.emailVerified,
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
            phoneNumber: user.phoneNumber,
            photoUrl: user.photoURL,
            uid: user.uid,
          }
        : null;
    } catch (err) {
      return rejectWithValue((err as any).message);
    }
  }
);

export const verifyAuth = createAsyncThunk(
  'auth/verifyAuth',
  ({ app }: { app?: FirebaseApp }, thunkAPI) => {
    if (!app) return;
    app.auth().onAuthStateChanged(async user => {
      thunkAPI.dispatch(
        verifySuccess(
          user
            ? {
                displayName: user.displayName,
                email: user.email || '',
                emailVerified: user.emailVerified,
                creationTime: user.metadata.creationTime,
                lastSignInTime: user.metadata.lastSignInTime,
                phoneNumber: user.phoneNumber,
                photoUrl: user.photoURL,
                uid: user.uid,
              }
            : null
        )
      );
    });
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateUser: (state, action: { payload: { [key: string]: any } }) => {
      if (state.user) state.user = { ...state.user, ...action.payload };
    },
    verifySuccess: (state, action: { type: string; payload: User | null }) => {
      state.loaded = false;
      state.user = action.payload;
    },
    displaySignInDialog: state => {
      state.signInDialog.open = true;
    },
    hideSignInDialog: state => {
      state.signInDialog.open = false;
      state.signInDialog.error = '';
    },
    displaySignUpDialog: state => {
      state.signUpDialog.open = true;
    },
    hideSignUpDialog: state => {
      state.signUpDialog.open = false;
      state.signUpDialog.error = '';
    },
    displayEditProfileDialog: state => {
      state.editProfileDialog.open = true;
    },
    hideEditProfileDialog: state => {
      state.editProfileDialog.open = false;
      state.editProfileDialog.error = '';
    },
    displayResetPasswordDialog: state => {
      state.resetPasswordDialog.open = true;
    },
    hideResetPasswordDialog: state => {
      state.resetPasswordDialog.open = false;
      state.resetPasswordDialog.error = '';
    },
    displayResetPasswordSentToast: state => {
      state.resetPasswordSentToast.open = true;
    },
    hideResetPasswordSentToast: state => {
      state.resetPasswordSentToast.open = false;
    },
    displaySentEmailVerificationDialog: state => {
      state.sentEmailVerificationDialog.open = true;
    },
    hideSentEmailVerificationDialog: state => {
      state.sentEmailVerificationDialog.open = false;
    },
    displayVerifyEmailDialog: (
      state,
      action: { payload: { email: string; password: string } | undefined }
    ) => {
      state.verifyEmailDialog.open = true;
      if (action.payload?.email)
        state.verifyEmailDialog.email = action.payload.email;
      if (action.payload?.password)
        state.verifyEmailDialog.password = action.payload.password;
    },
    hideVerifyEmailDialog: state => {
      state.verifyEmailDialog.open = false;
      state.verifyEmailDialog.email = '';
      state.verifyEmailDialog.password = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signIn.pending, state => {
        state.signInDialog.loading = true;
        state.user = null;
        state.signInDialog.error = '';
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.signInDialog.loading = false;
        state.user = action.payload;
        state.signInDialog.error = '';
      })
      .addCase(signIn.rejected, (state, action) => {
        state.signInDialog.loading = false;
        state.signInDialog.error = action.payload as string;
      })
      .addCase(signUp.pending, state => {
        state.signUpDialog.loading = true;
        state.user = null;
        state.signUpDialog.error = '';
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.signUpDialog.loading = false;
        state.user = action.payload;
        state.signUpDialog.error = '';
      })
      .addCase(signUp.rejected, (state, action) => {
        state.signUpDialog.loading = false;
        state.signUpDialog.error = action.payload as string;
      })
      .addCase(editProfile.pending, state => {
        state.editProfileDialog.loading = true;
        state.editProfileDialog.error = '';
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.editProfileDialog.loading = false;
        if (action.payload) state.user = action.payload;
        state.signUpDialog.error = '';
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.editProfileDialog.loading = false;
        state.editProfileDialog.error = action.payload as string;
      })
      .addCase(signOut.fulfilled, state => {
        state.user = null;
      })
      .addCase(resetPassword.pending, state => {
        state.resetPasswordDialog.loading = true;
        state.resetPasswordDialog.error = '';
      })
      .addCase(resetPassword.fulfilled, state => {
        state.resetPasswordDialog.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.resetPasswordDialog.loading = false;
        if (action.error.code === 'auth/user-not-found') {
          state.resetPasswordDialog.error = 'User does not exist';
        } else {
          state.resetPasswordDialog.error =
            action.error.message || 'Unknown error';
        }
      });
  },
});

export const {
  updateUser,
  verifySuccess,
  displaySignInDialog,
  hideSignInDialog,
  displaySignUpDialog,
  hideSignUpDialog,
  displayEditProfileDialog,
  hideEditProfileDialog,
  displayResetPasswordDialog,
  hideResetPasswordDialog,
  displayResetPasswordSentToast,
  hideResetPasswordSentToast,
  displaySentEmailVerificationDialog,
  hideSentEmailVerificationDialog,
  displayVerifyEmailDialog,
  hideVerifyEmailDialog,
} = authSlice.actions;

export default authSlice.reducer;
