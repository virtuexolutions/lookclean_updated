import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import navigationService from './navigationService';
import {useSelector} from 'react-redux';
import LoginScreen from './Screens/LoginScreen';
import Color from './Assets/Utilities/Color';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale} from 'react-native-size-matters';
import {MaskedViewIOS, View} from 'react-native';
import Signup from './Screens/Signup';
import Homescreen from './Screens/Homescreen';
import Wishlist from './Screens/Wishlist';
import Settings from './Screens/Settings';
import Store from './Screens/store';
import LinearGradient from 'react-native-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import BarberServicesScreen from './Screens/BarberServicesScreen';
import ChooseDate from './Screens/ChooseDate';
import CheckoutScreen from './Screens/CheckoutScreen';
import PaymentScreen from './Screens/PaymentScreen';
import UpComingScreen from './Screens/UpComingScreen';
import OrderDetails from './Screens/OrderDetails';
import MyBookings from './Screens/MyBookings';
import MyAccounts from './Screens/MyAccounts';
import ChangePassword from './Screens/ChangePassword';
import TermsAndConditions from './Screens/TermsAndConditions';
import PaymentMethod from './Screens/PaymentMethod';
import Support from './Screens/Support';
import WalletScreen from './Screens/WalletScreen';
import ImageUpload from './Screens/ImageUpload';
import ImageScreen from './Screens/ImageScreen';
import EnterPhone from './Screens/EnterPhone';
import VerifyNumber from './Screens/VerifyNumber';
import ResetPassword from './Screens/ResetPassword';
import SearchLocation from './Screens/SearchLocation';
import AddService from './Screens/AddService';
import TimeScreen from './Screens/TimeScreen';
import Vouchers from './Screens/Vouchers';
import Purchase from './Screens/Purchase';
import CustomerBookingDetails from './Screens/CustomerBookingDetails';
import GetStarted from './Screens/GetStarted';
import CompareBaberScreen from './Screens/CompareBaberScreen';
import BarberCompersion from './Screens/BarberCompersion';
import QuestionAnswerScreen from './Screens/QuestionAnswerScreen';
import ConsulationVideoScreen from './Screens/ConsulationVideoScreen';
import VideoReplyScreen from './Screens/VideoReplyScreen';
import CustomerVideoPlayer from './Screens/CustomerVideoPlayer';

const AppNavigator = () => {
  const userData = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);

  const RootNav = createNativeStackNavigator();

  const AppNavigatorContainer = () => {

    const customerFirstScreen = token == null ? 'LoginScreen' : 'TabNavigation';

    const secondScreen =
      token == null
        ? 'LoginScreen'
        : userData?.services?.length == 0
        ? 'AddService'
        : userData?.complete_questions?.toLowerCase() == 'no'
        ? 'QuestionAnswerScreen'
        : 'TabNavigation';

  

    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <RootNav.Navigator
          initialRouteName={
            userData?.role == 'customer' ? customerFirstScreen : secondScreen
          }
          screenOptions={{headerShown: false}}>
          {/* <RootNav.Screen name="Walkthrough" component={Walkthrough} /> */}
          <RootNav.Screen
            name="QuestionAnswerScreen"
            component={QuestionAnswerScreen}
          />

          <RootNav.Screen name="EnterPhone" component={EnterPhone} />
          <RootNav.Screen name="GetStarted" component={GetStarted} />
          <RootNav.Screen name="LoginScreen" component={LoginScreen} />
          <RootNav.Screen name="Vouchers" component={Vouchers} />
          <RootNav.Screen name="Homescreen" component={Homescreen} />
          <RootNav.Screen name="OrderDetails" component={OrderDetails} />
          <RootNav.Screen name="Signup" component={Signup} />
          <RootNav.Screen name="ResetPassword" component={ResetPassword} />
          <RootNav.Screen
            name="BarberServicesScreen"
            component={BarberServicesScreen}
          />
          <RootNav.Screen name="ChooseDate" component={ChooseDate} />
          <RootNav.Screen name="TimeScreen" component={TimeScreen} />
          <RootNav.Screen name="AddService" component={AddService} />
          <RootNav.Screen
            name="CustomerBookingDetail"
            component={CustomerBookingDetails}
          />
          <RootNav.Screen name="TabNavigation" component={TabNavigation} />
          <RootNav.Screen name="CheckoutScreen" component={CheckoutScreen} />
          <RootNav.Screen name="PaymentScreen" component={PaymentScreen} />
          <RootNav.Screen name="SearchLocation" component={SearchLocation} />
          <RootNav.Screen name="MyBookings" component={MyBookings} />
          <RootNav.Screen name="MyAccounts" component={MyAccounts} />
          <RootNav.Screen name="ChangePassword" component={ChangePassword} />
          <RootNav.Screen name="VerifyNumber" component={VerifyNumber} />
          <RootNav.Screen
            name="TermsAndConditions"
            component={TermsAndConditions}
          />
          <RootNav.Screen name="PaymentMethod" component={PaymentMethod} />
          <RootNav.Screen name="Support" component={Support} />
          <RootNav.Screen name="UpComingScreen" component={UpComingScreen} />
          <RootNav.Screen name="WalletScreen" component={WalletScreen} />
          <RootNav.Screen name="ImageUpload" component={ImageUpload} />
          <RootNav.Screen name="ImageScreen" component={ImageScreen} />
          <RootNav.Screen name="Purchase" component={Purchase} />
          <RootNav.Screen
            name="CompareBaberScreen"
            component={CompareBaberScreen}
          />
          <RootNav.Screen
            name="BarberCompersion"
            component={BarberCompersion}
          />
          <RootNav.Screen
            name="ConsulationVideoScreen"
            component={ConsulationVideoScreen}
          /><RootNav.Screen
          name="VideoReplyScreen"
          component={VideoReplyScreen}
        />
        <RootNav.Screen
          name="CustomerVideoPlayer"
          component={CustomerVideoPlayer}
        />
        </RootNav.Navigator>
      </NavigationContainer>
    );
  };

  return <AppNavigatorContainer />;
};

export const TabNavigation = props => {
  const Tabs = createBottomTabNavigator();
  const userData = useSelector(state => state.commonReducer.userData);

  return (
    <Tabs.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgba(34,36,40,1)',
        },
        tabBarIcon: ({focused}) => {
          let iconName;
          let color = Color.themeColor;
          let size = moderateScale(20, 0.3);
          let type = Ionicons;

          if (route.name === 'HomeScreen') {
            iconName = focused ? 'home' : 'home-outline';
            color = focused ? Color.themeColor : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          } else if (route.name === 'Wishlist') {
            iconName = focused ? 'heart' : 'hearto';
            color = focused ? Color.themeColor : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
            type = AntDesign;
          } else if (route.name === 'WalletScreen') {
            iconName = focused ? 'wallet' : 'wallet-outline';
            color = focused ? Color.themeColor : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
            type = Ionicons;
          } 
          else if (route.name === 'Store') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
            color = focused ? Color.themeColor : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          }
           else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';

            color = focused ? Color.themeColor : Color.themeLightGray;
            size = focused ? moderateScale(30, 0.3) : moderateScale(20, 0.3);
          }

          return (
            <MaskedView
              style={{flexDirection: 'row', height: size}}
              maskElement={
                <View
                  style={{
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon name={iconName} as={type} color={color} size={size} />
                </View>
              }>
              <LinearGradient
                colors={['#C49948', '#EBDBBD', '#E3C488']}
                style={{flex: 1}}
              />
            </MaskedView>
          );
        },
        tabBarShowLabel: false,
      })}>
      <Tabs.Screen name={'HomeScreen'} component={Homescreen} />
      {userData?.role == 'customer' ? (
        <Tabs.Screen name={'Wishlist'} component={Wishlist} />
      ) : (
        <Tabs.Screen name="WalletScreen" component={WalletScreen} />
      )}

      <Tabs.Screen name={'Store'} component={Store} />
      <Tabs.Screen name={'Settings'} component={Settings} />
    </Tabs.Navigator>
  );
};

export default AppNavigator;
