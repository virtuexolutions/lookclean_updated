import { LogBox, SafeAreaView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './SRC/Store';
import { NativeBaseProvider } from 'native-base';
import { useState, useEffect } from 'react';
import { Platform } from 'react-native';
import {
  requestCameraPermission,
  requestLocationPermission,
  requestWritePermission,
} from './SRC/Utillity/utils';
import SplashScreen from './SRC/Screens/SplashScreen';
import AppNavigator from './SRC/appNavigation';
import { StripeProvider } from '@stripe/stripe-react-native';
import { PersistGate } from 'redux-persist/integration/react';
import RNCalendarEvents from 'react-native-calendar-events';

const App = () => {
  LogBox.ignoreLogs([
    'Warning: ...',
    'VirtualizedLists should never be nested',
  ]);
  LogBox.ignoreAllLogs();
  return (
    <StripeProvider
      publishableKey={"pk_live_51P9XFVE0duL4FerOlgZZZu31QkZerkL5IFURa8jAmOVVPidjMLZ5CIGjto5cG0Fs5tXdh33mBvAZYkxGZXYGLfjr00vWU9iqMA"}
    // publishableKey={
    //   'pk_live_51P9XFVE0duL4FerOlgZZZu31QkZerkL5IFURa8jAmOVVPidjMLZ5CIGjto5cG0Fs5tXdh33mBvAZYkxGZXYGLfjr00vWU9iqMA'
    // }
    // merchantIdentifier="merchant.identifier" // required for Apple Pay
    // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NativeBaseProvider>
            <MainContainer />
          </NativeBaseProvider>
        </PersistGate>
      </Provider>
    </StripeProvider>
  );
};

const MainContainer = () => {
  useEffect(() => {
    async function GetPermission() {
      await requestCameraPermission();
      await requestWritePermission();
      await requestLocationPermission();
      await checkCalendarPermission()
    }

    if (Platform.OS == 'android') {
      GetPermission();
    }
  }, []);


  const checkCalendarPermission = async () => {
    const result = await RNCalendarEvents.checkPermissions((readOnly = false));
    if (result != 'authorized') {
      const askPermission = await RNCalendarEvents.requestPermissions(
        (readOnly = false),
      );
      if (askPermission == 'authorized') {
        Platform.OS == 'android'
          ? ToastAndroid.show('Calander access granted', ToastAndroid.SHORT)
          : alert('Calander access granted');
        const CalendersAvailble = await RNCalendarEvents.findCalendars();
      }
    } else {
      const CalendersAvailble = await RNCalendarEvents.findCalendars();
    }
  };



  const [isloading] = useloader(true);
  if (isloading == true) {
    return <SplashScreen />;
  }
  // return <Purchase/>
  // return <SplashScreen/>;
  return <AppNavigator />;
};

const useloader = value => {
  const [isloading, setIsloading] = useState(value);
  const [loadingTime] = useState(4000);
  useEffect(() => {
    setTimeout(() => setIsloading(false), loadingTime);
  }, []);
  return [isloading];
};

export default App;

const styles = StyleSheet.create({});
