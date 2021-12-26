## Getting Started

```
npm install --save react-redux-firebase-auth react react-dom firebase @material-ui/core @reduxjs/toolkit react-redux
```

react-redux-firebase-auth depends on React, React DOM, Redux, Material-UI, and Firebase which must also be installed.

### Using react-redux-firebase-auth

1. Initialize firebase app
2. Create redux store and add authReducer
3. Create custom theme
4. Wrap your app in ReactReduxFirebaseAuthProvider and pass the firebase app, redux store, material ui theme, and any other optional config values.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import {
  authReducer,
  ReactReduxFirebaseAuthProvider,
  useAuth,
} from 'react-redux-firebase-auth';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { createTheme } from '@material-ui/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';
import 'firebase/storage';

// firebase config
let config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// initialize app
const app = firebase.initializeApp(config);

// custom theme
const theme = createTheme();

// if using firestore profile and typescript, you can define it here
interface Profile {
  isAdmin: boolean;
}

// add auth reducer under the name auth!
export const reducer = combineReducers({
  // typecast if using profile, otherwise skip the "as AuthReducer<Profile>" part
  auth: authReducer as AuthReducer<Profile>,
  // ...your other reducers
});

// create store
const store = configureStore({
  reducer,
  devTools: process.env.NODE_ENV === 'development',
});

// home page
const Home = () => {
  const { state, displaySignInDialog, signOut } = useAuth();

  return state.user ? (
    <button onClick={signOut}>Logout</button>
  ) : (
    <button onClick={displaySignInDialog}>Login</button>
  );
};

function App() {
  return (
    <ReactReduxFirebaseAuthProvider
      app={app}
      store={store}
      config={{
        theme,
      }}
    >
      <Home />
    </ReactReduxFirebaseAuthProvider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
```

## useAuth

The useAuth hook conveniently provides the all of the packages actions without having to dispatch them. For example, if you want to create a login button that displays the login dialog. You can do the following:

```js
import { useAuth } from 'react-redux-firebase-auth';

const LoginButton = () => {
  const { displaySignInDialog } = useAuth();

  // no need to dispatch
  return <button onClick={displaySignInDialog}>Log In</button>;
};
```

If you decide to import the action directly from the package, you will have to dispatch it.

```js
import { displaySignInDialog } from 'react-redux-firebase-auth';
import { useDispatch } from 'react-redux';

const LoginButton = () => {
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(displaySignInDialog())}>Log In</button>
  );
};
```

## Config

You can configure the form fields, theme, custom props, and more by passing a config to the ReactReduxFirebaseAuthProvider

The config object has the following interface

```ts
interface Config {
  signUpFields?: SignUpFieldsConfig;
  signInWith?: SignInWithConfig;
  theme?: Theme;
  props?: {
    TextFieldProps?: TextFieldProps;
    SubmitButtonProps?: ButtonProps;
    NavigationLinkProps?: LinkProps<'button'>;
    DialogHeadingProps?: TypographyProps<'h1'>;
    DialogProps?: DialogProps;
    CardProps?: CardProps;
    ErrorTypographyProps?: TypographyProps;
  };
  disableEmailVerification?: boolean;
  passwordRules?: InputRules;
  usernameRules?: InputRules;
  initialProfileValues?: { [key: string]: any };
  createProfile?: boolean;
}
```

### SignUpFieldsConfig (config.signUpFields)

Setting any of the following fields to true will add them to the sign up form.

```ts
interface SignUpFieldsConfig {
  username?: boolean;
  name?: boolean;
}
```

Depending on your configuration, you may need to install and setup the [cloud functions package](https://www.npmjs.com/package/firebase-auth-functions) to manage user profiles in firestore. Managing user profiles is required if you wish to have both username and name set to true.

### SignInWithConfig (config.signInWith)

Setting any of the following fields to true will allow the use of that sign in method

```ts
interface SignInWithConfig {
  username?: boolean;
}
```

If you wish to be able to sign in with usernames, you will need to install and setup the [cloud functions package](https://www.npmjs.com/package/firebase-auth-functions) to manage user profiles in firestore.

### Theme (config.theme)

You may pass a [Material UI Theme](https://mui.com/customization/theming/) which will be applied to all UI components in the package

### Props (config.props)

You may override the default props of some components used within the package.

```ts
interface Props {
  TextFieldProps?: TextFieldProps;
  SubmitButtonProps?: ButtonProps;
  NavigationLinkProps?: LinkProps<'button'>;
  DialogHeadingProps?: TypographyProps<'h1'>;
  DialogProps?: DialogProps;
  CardProps?: CardProps;
  ErrorTypographyProps?: TypographyProps;
}
```

### Email Verifitcation (config.disableEmailVerification)

Email verification is enabled by default, but can be disabled by passing false

### PasswordRules (config.passwordRules) & UsernameRules (config.usernameRules)

You may add rules to the password/username fields such as a minLength or pattern match

```tsx
interface InputRules {
  minLength?: InputRule<number>;
  maxLength?: InputRule<number>;
  pattern?: InputRule<RegExp>;
}
type InputRule<T> = T | { value: T; message: string };

// example
const config = {
  passwordRules: {
    pattern: {
      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      message:
        'Password must have minimum eight characters, at least one letter and one number',
    },
  },
  usernameRules: {
    minLength: 4,
    // can optionally override default message
    maxLength: { value: 16, message: 'Username cannot exceed 16 characters' },
  },
};
```

### Create Profile (config.createProfile)

You may choose to have user profiles even if it is not required simply to be able to access user data without being signed in as them. You can pass true here to do so. Remember, you'll need the [cloud functions package](https://www.npmjs.com/package/firebase-auth-functions) to manage user profiles in firestore.

### Initial Profile Values (config.initialProfileValues)

Perhaps you have a social media site and want to set a users friends to 0 when they sign up. First you'll need the [cloud functions package](https://www.npmjs.com/package/firebase-auth-functions) to manage user profiles in firestore. Then, you may pass an object with all the default values you wish.

```ts
const config = {
  // any new user will have a friends field with a value of 0 on their document in firestore
  initialProfileValues: {
    friends: 0,
  },
};
```
