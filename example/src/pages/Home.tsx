import { Button } from '@material-ui/core';
import { useAuth } from 'react-redux-firebase-auth';
import { useAppSelector } from '../hooks/useAppSelector';

const Home = () => {
  const { displaySignInDialog, displayEditProfileDialog, signOut } = useAuth();
  const state = useAppSelector(state => state.auth);

  return (
    <div>
      {state.user ? (
        <>
          <Button variant="contained" onClick={signOut}>
            Logout
          </Button>

          <h1>Welcome</h1>
          <p>
            <strong>Email: </strong>
            {state.user.email}
          </p>
          <p>
            <strong>UID: </strong>
            {state.user.uid}
          </p>
          <p>
            <strong>Created At: </strong>
            {state.user.creationTime}
          </p>

          <Button onClick={displayEditProfileDialog} variant="contained">
            Edit Profile
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          disabled={state.signInDialog.loading}
          onClick={displaySignInDialog}
        >
          Login
        </Button>
      )}
    </div>
  );
};

export default Home;
