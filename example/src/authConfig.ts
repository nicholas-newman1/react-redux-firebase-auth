import { Config } from 'react-redux-firebase-auth';
import { theme } from './theme';

const authConfig: Config = {
  theme,
  props: {
    TextFieldProps: {
      variant: 'outlined',
    },
    SubmitButtonProps: {
      // fullWidth: true,
    },
  },
  signInWith: {
    username: true,
  },
  signUpFields: {
    name: true,
    username: true,
  },
  createProfile: true,
};

export default authConfig;
