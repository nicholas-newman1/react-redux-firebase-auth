import { User } from '../types/client';

const initialState: {
  user: User | null;
  loaded: boolean;
  signInDialog: {
    open: boolean;
    error: string;
    loading: boolean;
  };
  signUpDialog: {
    open: boolean;
    error: string;
    loading: boolean;
  };
  resetPasswordDialog: {
    open: boolean;
    error: string;
    loading: boolean;
  };
  editProfileDialog: {
    open: boolean;
    error: string;
    loading: boolean;
  };
  resetPasswordSentToast: {
    open: boolean;
  };
  sentEmailVerificationDialog: {
    open: boolean;
  };
  verifyEmailDialog: {
    open: boolean;
    email?: string;
    password?: string;
  };
} = {
  user: null,
  loaded: false,
  signInDialog: {
    open: false,
    error: '',
    loading: false,
  },
  signUpDialog: {
    open: false,
    error: '',
    loading: false,
  },
  resetPasswordDialog: {
    open: false,
    error: '',
    loading: false,
  },
  editProfileDialog: {
    open: false,
    error: '',
    loading: false,
  },
  resetPasswordSentToast: {
    open: false,
  },
  sentEmailVerificationDialog: {
    open: false,
  },
  verifyEmailDialog: {
    open: false,
  },
};

export default initialState;
