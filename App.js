import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { store, persistor } from './SRC/Store'
import { NativeBaseProvider } from 'native-base'
import { useState, useEffect } from 'react';
import { Platform } from 'react-native'
import {
  requestCameraPermission,
  requestLocationPermission,
  requestWritePermission,
} from './SRC/Utillity/utils';
import SplashScreen from './SRC/Screens/SplashScreen'
import AppNavigator from './SRC/appNavigation'
import { StripeProvider } from '@stripe/stripe-react-native'
import { PersistGate } from 'redux-persist/integration/react'

const App = () => {
  return (
    <StripeProvider
    publishableKey={"pk_test_51RoieKFIiQxtLicEZZqk0AwV9gdF7RWYSQsTOVEPgiGQmJQKhN5ZIINW7i5HC7LcX4teSDXXSfnwP8AJl1nUVjFg00ycMYLDEw"}

    // publishableKey={"pk_live_51P9XFVE0duL4FerOlgZZZu31QkZerkL5IFURa8jAmOVVPidjMLZ5CIGjto5cG0Fs5tXdh33mBvAZYkxGZXYGLfjr00vWU9iqMA"}
    // merchantIdentifier="merchant.identifier" // required for Apple Pay
    // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
  >
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>

      <MainContainer/>
        </NativeBaseProvider>
</PersistGate>
      </Provider>
   </StripeProvider> 
    
  )
}

const MainContainer =()=>{



  useEffect(() => {
    async function GetPermission() {
     
      await requestCameraPermission();
      await requestWritePermission();
      await requestLocationPermission();
    }

    if(Platform.OS == 'android'){

      GetPermission();
    }
  }, []);

  const [isloading] = useloader(true);
  if (isloading == true) {
    return <SplashScreen />;
  }
  // return <Purchase/>
  // return <SplashScreen/>;
  return <AppNavigator/>;

}


const useloader = value => {
  const [isloading, setIsloading] = useState(value);
  const [loadingTime] = useState(4000);
  useEffect(() => {
    setTimeout(() => setIsloading(false), loadingTime);
  }, []);
  return [isloading];
};


export default App

const styles = StyleSheet.create({})