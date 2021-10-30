import {
  Button,
  Grid,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { CustomDialog } from '.';
import {
  Config,
  EditProfileFormFields,
  SignUpFormFields,
} from '../types/client';

const useStyles = makeStyles({
  form: {
    width: '100%',
    marginBottom: '1rem',
  },
});

interface Props {
  loading: boolean;
  open: boolean;
  onSubmit: (data: SignUpFormFields) => void;
  hideDialog: () => void;
  error: string;
  config?: Config;
  defaultValues?: EditProfileFormFields | null;
}

const EditProfileDialog: React.FC<Props> = ({
  loading,
  open,
  onSubmit,
  hideDialog,
  error,
  config,
  defaultValues,
}) => {
  const { register, handleSubmit, errors, setError, clearErrors } = useForm<
    EditProfileFormFields
  >();
  const classes = useStyles();

  useEffect(() => {
    error
      ? setError('email', { message: error, shouldFocus: false })
      : clearErrors();
  }, [error, setError, clearErrors]);

  return (
    <CustomDialog
      onClose={hideDialog}
      open={open}
      heading="Edit Profile"
      fullWidth
      maxWidth="xs"
      DialogHeadingProps={config?.props?.DialogHeadingProps}
      DialogProps={config?.props?.DialogProps}
      CardProps={config?.props?.CardProps}
    >
      <form
        aria-label="edit profile"
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container direction="column" spacing={3}>
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
                defaultValue={defaultValues?.username}
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
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    inputRef={register({ required: 'First name is required' })}
                    id="firstName"
                    label="First Name"
                    fullWidth
                    autoComplete="given-name"
                    name="firstName"
                    aria-invalid={errors.firstName ? 'true' : 'false'}
                    defaultValue={defaultValues?.firstName}
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

                <Grid item xs={6}>
                  <TextField
                    inputRef={register({ required: 'Last name is required' })}
                    id="lastName"
                    label="Last Name"
                    fullWidth
                    autoComplete="family-name"
                    name="lastName"
                    aria-invalid={errors.lastName ? 'true' : 'false'}
                    defaultValue={defaultValues?.lastName}
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
              inputRef={register({ required: 'Email is required' })}
              id="email"
              label="Email"
              autoFocus
              fullWidth
              autoComplete="email"
              name="email"
              aria-invalid={errors.email ? 'true' : 'false'}
              defaultValue={defaultValues?.email}
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
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </CustomDialog>
  );
};

export default EditProfileDialog;
