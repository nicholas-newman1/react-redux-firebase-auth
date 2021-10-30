import { ThemeProvider } from '@material-ui/core';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseAuthProvider } from 'react-redux-firebase-auth';
import authConfig from './authConfig';
import Home from './pages/Home';
import { app } from './services/firebase';
import store from './store';
import { theme } from './theme';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <ReactReduxFirebaseAuthProvider
          app={app}
          store={store}
          config={authConfig}
        >
          <Home />
        </ReactReduxFirebaseAuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
