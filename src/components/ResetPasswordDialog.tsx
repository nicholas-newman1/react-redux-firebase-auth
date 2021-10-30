import {
  Button,
  Grid,
  Link,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Config } from '../types/client';
import CustomDialog from './CustomDialog';

interface Props {
  onSubmit: (email: string) => void;
  open: boolean;
  hideDialog: () => void;
  loading: boolean;
  error: string;
  switchToSignInDialog: () => any;
  switchToSignUpDialog: () => any;
  config?: Config;
}

const useStyles = makeStyles({
  form: {
    width: '100%',
    marginBottom: '1rem',
  },
});

const ResetPasswordDialog: React.FC<Props> = ({
  onSubmit,
  open,
  hideDialog,
  loading,
  error,
  switchToSignInDialog,
  switchToSignUpDialog,
  config,
}) => {
  const classes = useStyles();
  const { register, handleSubmit, errors, setError, clearErrors } = useForm();

  useEffect(() => {
    error ? setError('email', { message: error }) : clearErrors();
  }, [error, setError, clearErrors]);

  return (
    <CustomDialog
      heading="Reset Password"
      open={open}
      onClose={hideDialog}
      maxWidth="xs"
      DialogHeadingProps={config?.props?.DialogHeadingProps}
      DialogProps={config?.props?.DialogProps}
      CardProps={config?.props?.CardProps}
    >
      <form
        aria-label="reset password form"
        className={classes.form}
        onSubmit={handleSubmit(data => onSubmit(data.email))}
      >
        <Grid container direction="column" spacing={3}>
          <Grid item>
            <TextField
              inputRef={register({ required: 'Email is required' })}
              id="email"
              label="Email"
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

          <Grid item container justifyContent="center">
            <Button
              disabled={loading}
              variant="contained"
              color="primary"
              type="submit"
              {...config?.props?.SubmitButtonProps}
            >
              Send Password Reset Email
            </Button>
          </Grid>
        </Grid>
      </form>

      <Grid container justifyContent="space-between" spacing={1}>
        <Grid item>
          <Link
            color="textPrimary"
            component="button"
            onClick={switchToSignInDialog}
            {...config?.props?.NavigationLinkProps}
          >
            Remember Your Password?
          </Link>
        </Grid>

        <Grid item>
          <Link
            color="textPrimary"
            component="button"
            onClick={switchToSignUpDialog}
            {...config?.props?.NavigationLinkProps}
          >
            Don't Have an Account?
          </Link>
        </Grid>
      </Grid>
    </CustomDialog>
  );
};

export default ResetPasswordDialog;
