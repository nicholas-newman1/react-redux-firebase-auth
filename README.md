# Getting Started

- npm i react-redux-firebase-auth
- nest ReactReduxFirebaseAuthProvider inside of Provider from react-redux
- pass app/store and optional config to provider
- add reducer to the store

# Importing vs useAuth

- useAuth returns methods that can be called to perform their expected duty
- importing the same methods are actions that must be dispatched

# Themeing

- Pass a theme into ReactReduxFirebaseAuthProvider through config.theme

# User Profile

- Depending on the config, you may need a user profile.
- You will need a user profile if you wish to:
  - have unique usernames
  - sign in with username
  - store both a name and username
  - access a user's profile data without being signed in as them
- The cloud functions package handles the creation and management of user profiles
