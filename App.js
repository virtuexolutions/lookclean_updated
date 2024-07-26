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
    publishableKey={"pk_test_51McSueJ0WRwehn2Uuf4rm6WNHPQvaJY9NGU235gUEqPA3AJuc9Mq1x98Y8B8uE5eMfivo5l2xK4Vau21zau7ZBDp00g7qWfkx3"}
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