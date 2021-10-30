import React, { useContext } from 'react';
import { hideEditProfileDialog } from '../store/authSlice';
import EditProfileDialog from '../components/EditProfileDialog';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import ReactReduxFirebaseAuthContext from '../ReactReduxFirebaseAuthContext';
import { editProfile } from '../store/authSlice';

const EditProfileDialogContainer = () => {
  const context = useContext(ReactReduxFirebaseAuthContext);
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.auth.user);
  const { open, loading, error } = useAppSelector(
    state => state.auth.editProfileDialog
  );
  return (
    <EditProfileDialog
      open={open}
      loading={loading}
      error={error}
      onSubmit={fields => {
        dispatch(
          editProfile({ app: context?.app, config: context?.config, fields })
        );
      }}
      hideDialog={() => dispatch(hideEditProfileDialog())}
      defaultValues={user}
      config={context?.config}
    />
  );
};

export default EditProfileDialogContainer;
