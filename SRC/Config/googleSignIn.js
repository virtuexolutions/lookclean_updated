import { GoogleSignin } from '@react-native-google-signin/google-signin';

export const GOOGLE_SIGN_IN = {
  webClientId:
    '338134714519-uvm38sasm11h3783klbu3e16n58edma0.apps.googleusercontent.com',
  iosClientId:
    '338134714519-scha06en0vqjiv7iifo6e9qaq9qc6qg3.apps.googleusercontent.com',
  androidPackageName: 'com.lookclean',
  // Register these SHA-1 fingerprints on the matching Android OAuth clients
  // in Google Cloud Console (project 338134714519).
  debugSha1: '5E:8F:16:06:2E:A3:CD:2C:4A:0D:54:78:76:BA:A6:F3:8C:AB:F6:25',
  releaseSha1: '49:5E:90:AD:3E:1F:9A:D7:84:22:77:A3:71:8D:13:69:DA:F5:D1:35',
};

export const configureGoogleSignIn = () => {
  GoogleSignin.configure({
    offlineAccess: false,
    webClientId: GOOGLE_SIGN_IN.webClientId,
    iosClientId: GOOGLE_SIGN_IN.iosClientId,
    scopes: ['openid', 'profile', 'email'],
  });
};

export const signInWithGoogle = async () => {
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  await GoogleSignin.signOut();

  const result = await GoogleSignin.signIn();

  if (result?.type === 'cancelled') {
    return null;
  }

  if (result?.type !== 'success' || !result?.data) {
    throw new Error('Google sign-in did not return user data.');
  }

  return result.data;
};

export const getGoogleSignInConfigHelp = () =>
  [
    'Register these in Google Cloud Console → Credentials → Android OAuth clients:',
    `Package name: ${GOOGLE_SIGN_IN.androidPackageName}`,
    `Debug SHA-1: ${GOOGLE_SIGN_IN.debugSha1}`,
    `Release SHA-1: ${GOOGLE_SIGN_IN.releaseSha1}`,
    'Also add the Play App Signing SHA-1 from Play Console for production builds.',
  ].join('\n');
