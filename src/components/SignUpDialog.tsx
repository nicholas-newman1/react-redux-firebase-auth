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
import { Config, SignUpFormFields } from '../types/client';

const useStyles = makeStyles({
  form: {
    width: '100%',
    marginBottom: '1rem',
  },
});

interface Props {
  switchToSignInDialog: () => void;
  loading: boolean;
  open: boolean;
  onSubmit: (data: SignUpFormFields) => void;
  hideDialog: () => void;
  error: string;
  config?: Config;
}

const SignUpDialog: React.FC<Props> = ({
  switchToSignInDialog,
  loading,
  open,
  onSubmit,
  hideDialog,
  error,
  config,
}) => {
  const {
    register,
    handleSubmit,
    errors,
    setError,
    watch,
    clearErrors,
  } = useForm<SignUpFormFields>();
  const classes = useStyles();

  useEffect(() => {
    error
      ? setError('confirmPassword', { message: error, shouldFocus: false })
      : clearErrors();
  }, [error, setError, clearErrors]);

  return (
    <CustomDialog
      heading="Sign Up"
      open={open}
      onClose={hideDialog}
      fullWidth
      maxWidth="xs"
      DialogHeadingProps={config?.props?.DialogHeadingProps}
      DialogProps={config?.props?.DialogProps}
      CardProps={config?.props?.CardProps}
    >
      <form
        aria-label="sign up"
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TextField
              inputRef={register({ required: 'Email is required' })}
              id="email"
              label="Email"
              autoFocus
              fullWidth
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

          {(config?.signInWith?.username || config?.signUpFields?.username) && (
            <Grid item>
              <TextField
                inputRef={register({
                  required: 'Username is required',
                  ...config.usernameRules,
                })}
                id="username"
                label="Username"
                fullWidth
                autoComplete="username"
                name="username"
                aria-invalid={errors.username ? 'true' : 'false'}
                {...config?.props?.TextFieldProps}
              />
              {errors.username && (
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
                  {errors.username.message}
                </Typography>
              )}
            </Grid>
          )}

          {config?.signUpFields?.name && (
            <Grid item>
              <Grid container spacing={2} wrap="nowrap">
                <Grid item>
                  <TextField
                    inputRef={register({ required: 'First name is required' })}
                    id="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    name="firstName"
                    aria-invalid={errors.firstName ? 'true' : 'false'}
                    {...config?.props?.TextFieldProps}
                  />

                  {errors.firstName && (
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
                      {errors.firstName.message}
                    </Typography>
                  )}
                </Grid>

                <Grid item>
                  <TextField
                    inputRef={register({ required: 'Last name is required' })}
                    id="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="family-name"
                    name="lastName"
                    aria-invalid={errors.lastName ? 'true' : 'false'}
                    {...config?.props?.TextFieldProps}
                  />

                  {errors.lastName && (
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
                      {errors.lastName.message}
                    </Typography>
                  )}
                </Grid>
              </Grid>
            </Grid>
          )}

          <Grid item>
            <TextField
              inputRef={register({
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                ...config?.passwordRules,
              })}
              id="password"
              label="Password"
              type="password"
              name="password"
              autoComplete="new-password"
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

          <Grid item>
            <TextField
              inputRef={register({
                required: 'Please confirm password',
                validate: value =>
                  value === watch('password') || 'Passwords must match',
              })}
              id="confirmPassword"
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              autoComplete="new-password"
              fullWidth
              aria-invalid={errors.password ? 'true' : 'false'}
              {...config?.props?.TextFieldProps}
            />

            {errors.confirmPassword && (
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
                {errors.confirmPassword.message}
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
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>

      <Link
        color="textPrimary"
        component="button"
        onClick={switchToSignInDialog}
        {...config?.props?.NavigationLinkProps}
      >
        Already have an account?
      </Link>
    </CustomDialog>
  );
};

export default SignUpDialog;
