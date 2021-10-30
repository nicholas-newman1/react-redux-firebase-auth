import React from 'react';
import { Config, FirebaseApp } from './types/client';

const ReactReduxFirebaseAuthContext = React.createContext<{
  app: FirebaseApp;
  config?: Config;
} | null>(null);

export default ReactReduxFirebaseAuthContext;
