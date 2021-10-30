import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import getFunctions from 'firebase-auth-functions';
admin.initializeApp();

export const { signUp, signIn, editProfile } = getFunctions(admin, functions);
