'use client';
/**
 * @fileOverview Authentication utilities for Slice & Spice.
 * Handles various sign-in methods using the Firebase Client SDK.
 */

import {
  Auth,
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth';

/**
 * Initiate anonymous sign-in.
 */
export function initiateAnonymousSignIn(authInstance: Auth): Promise<UserCredential> {
  return signInAnonymously(authInstance);
}

/**
 * Initiate email/password sign-up.
 */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): Promise<UserCredential> {
  return createUserWithEmailAndPassword(authInstance, email, password);
}

/**
 * Initiate email/password sign-in.
 */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): Promise<UserCredential> {
  return signInWithEmailAndPassword(authInstance, email, password);
}

/**
 * Initiate Google sign-in via popup.
 * Returns the promise of the UserCredential.
 */
export function initiateGoogleSignIn(authInstance: Auth): Promise<UserCredential> {
  const provider = new GoogleAuthProvider();
  // Optional: Force account selection if needed
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  return signInWithPopup(authInstance, provider);
}
