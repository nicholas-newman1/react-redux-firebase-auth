import Toast from '../components/Toast';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { useAppSelector } from '../hooks/useAppSelector';
import { hideResetPasswordSentToast } from '../store/authSlice';
import React from 'react';

const ResetPasswordSentToastContainer = () => {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector(state => state.auth.resetPasswordSentToast);

  return (
    <Toast
      message="An email has been sent with further instructions"
      severity="success"
      open={open}
      onClose={() => dispatch(hideResetPasswordSentToast())}
    />
  );
};

export default ResetPasswordSentToastContainer;
