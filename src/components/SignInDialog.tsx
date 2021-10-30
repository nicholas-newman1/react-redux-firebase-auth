import {
  Button,
  Grid,
  Link,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CustomDialog from './CustomDialog';
import React from 'react';
import { Config } from '../types/client';

const useStyles = makeStyles({
  form: {
    width: '100%',
    marginBottom: '1rem',
  },
});

interface FormDetails {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (data: FormDetails) => void;
  switchToSignUpDialog: () => void;
  switchToResetPasswordDialog: () => void;
  open: boolean;
  hideDialog: () => void;
  loading: boolean;
  error: string;
  config?: Config;
}

const SignInDialog: React.FC<Props> = ({
  onSubmit,
  switchToSignUpDialog,
  switchToResetPasswordDialog,
  open,
  hideDialog,
  loading,
  error,
  config,
}) => {
  const classes = useStyles();
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();

  useEffect(() => {
    error
      ? setError('password', { message: error, shouldFocus: false })
      : clearErrors();
  }, [error, setError, clearErrors]);

  return (
    <CustomDialog
      heading="Log In"
      open={open}
      onClose={hideDialog}
      maxWidth="xs"
      DialogHeadingProps={config?.props?.DialogHeadingProps}
      DialogProps={config?.props?.DialogProps}
      CardProps={config?.props?.CardProps}
    >
      <form
        aria-label="log in form"
        className={classes.form}
        onSubmit={handleSubmit((data: FormDetails) => onSubmit(data))}
      >
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TextField
              inputRef={register({ required: 'Email is required' })}
              id="email"
              label={config?.signInWith?.username ? 'Email/Username' : 'Email'}
              fullWidth
              autoFocus
              autoComplete="email"
              name="email"
              aria-invalid={errors.email ? 'true' : 'false'}
              {...config?.props?.TextFieldProps}
            />

            {errors.email && (
              <Typography
                role="alert"
                variant="subtitle2"
                color="error"
                {...config?.props?.ErrorTypographyProps}
                style={{
                  marginTop: '0.5rem',
                  ...config?.props?.ErrorTypographyProps?.style,
                }}
              >
                {errors.email.message}
              </Typography>
            )}
          </Grid>

          <Grid item>
            <TextField
              inputRef={register({
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              id="password"
              label="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              fullWidth
              aria-invalid={errors.password ? 'true' : 'false'}
              {...config?.props?.TextFieldProps}
            />

            {errors.password && (
              <Typography
                role="alert"
                variant="subtitle2"
                color="error"
                {...config?.props?.ErrorTypographyProps}
                style={{
                  marginTop: '0.5rem',
                  ...config?.props?.ErrorTypographyProps?.style,
                }}
              >
                {errors.password.message}
              </Typography>
            )}
          </Grid>

          <Grid item container justifyContent="center">
            <Button
              disabled={loading}
              variant="contained"
              color="primary"
              type="submit"
              {...config?.props?.SubmitButtonProps}
            >
              Log In
            </Button>
          </Grid>
        </Grid>
      </form>

      <Grid container justifyContent="space-between" spacing={1}>
        <Grid item>
          <Link
            color="textPrimary"
            component="button"
            onClick={switchToSignUpDialog}
            {...config?.props?.NavigationLinkProps}
          >
            Don't have an account?
          </Link>
        </Grid>

        <Grid item>
          <Link
            color="textPrimary"
            component="button"
            onClick={switchToResetPasswordDialog}
            {...config?.props?.NavigationLinkProps}
          >
            Forgot your password?
          </Link>
        </Grid>
      </Grid>
    </CustomDialog>
  );
};

export default SignInDialog;
