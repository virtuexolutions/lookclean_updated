import React, { useState } from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  ToastAndroid,
  Platform,
  ActivityIndicator
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import navigationService from '../navigationService';
import { setUserToken, setWalkThrough } from '../Store/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { setIsProfileCompleted, setUserData, setUserWallet } from '../Store/slices/common';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import SelectUserRole from '../Components/SelectUserRole';
import AddYourDetails from '../Components/AddYourDetails';
import SelectLocationModal from '../Components/SelectLocationModal';
import { appleAuth, AppleButton, AppleButtonStyle } from '@invertase/react-native-apple-authentication';




const LoginScreen = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const [selectedUserRole, setSelectedUserRole] = useState('');

  const [contact, setContact] = useState('');
  const [address, setAddress] = useState({});
  console.log(address, 'address ========= >>>>>>> ');
  const [designation, setDesignation] = useState('');
  const [selectLocationModal, setselectLocationModal] = useState(false);
  const [isAppleLogin, setIsAppleLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  // console.log(userInfo, 'userInfo');

  const login = async () => {
    const url = 'login';
    const body = { email: email, password: password };

    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
          : Alert.alert(`${key} is required`);
      }
    }

    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
      console.log("🚀 ~ login ~ response:", response?.data)
      dispatch(setUserToken({ token: response?.data?.token }));
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserWallet(response?.data?.user_info?.wallet));
    }
  };

  const loginWithGoogle = async (user, addressData = null, roleData = null, designationData = null, { isApple = false } = {}) => {
    // console.log(address, 'address');
    // return console.log("user", JSON.stringify(user, null, 2))
    const currentAddress = addressData || address;
    const currentRole = roleData || selectedUserRole;
    const currentDesignation = designationData || designation;

    const isActuallyApple = isApple || !!user?.appleId;

    const body = {
      idToken: user.idToken,
      email: user.user.email,
      first_name: user.user.givenName,
      last_name: user.user.familyName,
      photo: user.user.photo,
      role: currentRole,
      address_name: currentAddress?.name || currentAddress?.location,
      address_lat: currentAddress?.lat,
      address_lng: currentAddress?.lng,
      designation: currentDesignation,
      type: isActuallyApple ? 'apple' : 'google',
    };
    if (isActuallyApple) {
      body.apple_id = user.appleId;
    }
    if (currentRole == 'Barber') {
      body.designation = currentDesignation;
    }
    // return console.log("body", JSON.stringify(body, null, 2))

    if (Object.keys(currentAddress || {}).length == 0) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`Address is required`, ToastAndroid.SHORT)
        : Alert.alert(`Address is required`);
    }
    if (currentRole == 'Barber') {
      if (currentDesignation == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`Designation is required`, ToastAndroid.SHORT)
          : Alert.alert(`Designation is required`);
      }
    }
    // return console.log(body, 'body');
    const url = 'google-login';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {

      setIsVisible(false)
      // return console.log("🚀 ~ loginWithGoogle ~ response:", response?.data?.user_info)
      dispatch(setUserToken({ token: response?.data?.token }));
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserWallet(response?.data?.user_info?.wallet));
    }
  };

  const verifyUserExist = async (user, { isApple = false } = {}) => {
    const isActuallyApple = isApple || !!user?.appleId;
    // setIsAppleLogin(isActuallyApple);
    // return console.log(user, 'userInfo');


    const body = {
      type: isActuallyApple ? 'apple' : 'google',
      idToken: user.idToken,
      email: user.user.email,
    };

    if (isActuallyApple) {
      body.apple_id = user.appleId;
    }

    console.log(JSON.stringify(body, null, 2), 'body');
    const url = 'email-check';
    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
      // return console.log(response?.data?.message, JSON.stringify(response?.data?.user_info, null, 2), 'message');
      // setIsVisible(false)
    // return  console.log("🚀 ~ userexust ~ response:", response?.data)
      if (response?.data?.message == 'User not found..!') {
        setUserInfo(user)
        setIsVisible(true)
      }
      else {
        console.log('here ==>')
        const addr = { location: response?.data?.user_info?.location, lat: response?.data?.user_info?.lat, lng: response?.data?.user_info?.lng };
        const role = response?.data?.user_info?.role;
        const desig = response?.data?.user_info?.designation;

        setAddress(addr)
        setDesignation(desig)
        setSelectedUserRole(role)
        loginWithGoogle(user, addr, role, desig, { isApple: isActuallyApple })
      }
    }
  };




  return (
    <ScreenBoiler
      // showBack={true}
      showHeader={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      {/* <KeyboardAvoidingView
        style={{
          zIndex: 1,
          // paddingBottom:moderateScale(50,.6)
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}

      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        colors={Color.themeGradient}
        style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: windowHeight * 0.15,
            // paddingTop : moderateScale(20,0.3),
            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
            zIndex: 1,
          }}>
          <CustomText isBold style={styles.text1}>
            Sign in
          </CustomText>
          <TextInputWithTitle
            titleText={'Your Email'}
            placeholder={'Enter Your Email'}
            setText={setEmail}
            value={email}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.74}
            // border={1}
            // borderColor={'#1B5CFB45'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(12, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(30, 0.4)}
          />
          <TextInputWithTitle
            secureText
            titleText={'Your Password'}
            placeholder={'Enter Your Password'}
            setText={setPassword}
            value={password}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.74}
            // border={1}
            // borderColor={'#1B5CFB45'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(12, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(30, 0.4)}
          />

          <CustomButton
            bgColor={Color.themePink}
            borderColor={'white'}
            borderWidth={1}
            textColor={Color.black}
            onPress={() => {
              login();
              // dispatch(setWalkThrough(false)); 
              // console.log("Pressed")

              // dispatch(setUserToken({token: 'skjfhkjhfdjjsdfjlkjlkfj;kdf;l'}));
            }}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            borderRadius={moderateScale(25, 0.6)}
            text={
              loading ? (
                <ActivityIndicator size={'small'} color={'black'} />
              ) : (
                'Sign In'
              )
            }
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
            marginTop={moderateScale(30, 0.3)}
          />

          <CustomText
            isBold
            onPress={() => {
              navigationService.navigate('Signup');
            }}
            style={{
              color: 'rgb(227,196,136)',
              fontSize: moderateScale(13, 0.3),
              textTransform: 'uppercase',
              marginTop: moderateScale(10, 0.3),
              zIndex: 1,
            }}>
            Sign Up
          </CustomText>
          <CustomText
            onPress={() => {
              navigationService.navigate('EnterPhone');
            }}
            isBold
            style={{
              zIndex: 1,
              color: 'rgb(227,196,136)',
              fontSize: moderateScale(10, 0.3),
              textTransform: 'uppercase',
              marginTop: moderateScale(5, 0.3),
            }}>
            forgot password?
          </CustomText>

          <CustomButton
            image={require('../Assets/Images/googleicon.png')}
            imagestyle={{
              width: windowWidth * 0.06,
              height: windowWidth * 0.06,
              marginHorizontal: moderateScale(10, 0.3),
            }}
            bgColor={'white'}
            borderColor={'white'}
            borderWidth={1}
            textColor={Color.black}
            onPress={() => {
              GoogleSignin.hasPlayServices()
                .then(hasPlayService => {
                  if (hasPlayService) {
                    GoogleSignin.signIn()
                      .then(userInfo => {
                        console.log(
                          'Google Sign-In Success',
                          JSON.stringify(userInfo?.data, null, 2),
                        );
                        console.log("🚀 ~ .then ~ userInfo?.data:", userInfo?.data)
                        verifyUserExist(userInfo?.data)


                      })
                      .catch(e => {
                        console.log(
                          'ERROR IS=============: ' + JSON.stringify(e.message),
                        );
                        Alert.alert('Login failed', e.message);
                      });
                  }
                })
                .catch(e => {
                  console.log('ERROR IS: ' + JSON.stringify(e, null, 2));
                  Alert.alert('Play services not available');
                });

            }}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            borderRadius={moderateScale(25, 0.6)}
            text={
              isloading ? (
                <ActivityIndicator size={'small'} color={'black'} />
              ) : (
                'Sign In with google'
              )
            }
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            isBold
            marginTop={windowHeight * 0.05}
          />
          {/* <View
              style={styles.ios_button_container}
            // pointerEvents="none"
            > */}

          {Platform.OS == 'ios' && <AppleButton
            style={styles.ios_button_container}

            buttonStyle={AppleButton.Style.WHITE_OUTLINE}  // REQUIRED - defines appearance
            buttonType={AppleButton.Type.SIGN_IN}
            // cornerRadius={moderateScale(5, 0.6)}

            onPress={() => {
              // console.log("pressed")
              // loginWithApple()
              appleAuth.performRequest({
                requestedOperation: appleAuth.Operation.LOGIN,
                requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
              }).then((res) => {
                // return console.log("res", JSON.stringify(res, null, 2))
                // setIsAppleLogin(true);

                const {
                  user: appleId,
                  email,
                  fullName,
                  identityToken,
                  nonce,
                  realUserStatus /* etc */,
                } = res;

                const user = {
                  appleId: appleId,
                  idToken: identityToken,
                  user: {
                    email: email,
                    givenName: fullName?.givenName,
                    familyName: fullName?.familyName,
                    photo: appleId, // Using Apple user ID as photo placeholder
                  },
                };
                verifyUserExist(user, { isApple: true });

              }).catch((error) => {
                console.log("error", error.code == appleAuth.Error.CANCELED)
              })
            }}
          />}
          {/* </View> */}

          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              // backgroundColor: 'red',
            }}>
            <CustomImage
              source={require('../Assets/Images/backgroundLogo.png')}
              // resizeMode={'stretch'}
              style={{}}
            />
          </View>
        </ScrollView>

      </LinearGradient>
      <SelectUserRole
        setIsVisible={setIsVisible}
        isVisible={isVisible}
        setSelectedUserRole={setSelectedUserRole}
        selectedUserRole={selectedUserRole}
        address={address}
        setAddress={setAddress}
        // contact={contact}
        // setContact={setContact}
        designation={designation}
        setDesignation={setDesignation}
        setselectLocationModal={setselectLocationModal}
        onPress={() => {
          if (selectedUserRole == '') {
            Platform.OS == 'ios'
              ? Alert.alert('Please select user role')
              : ToastAndroid.show('Please select user role', ToastAndroid.SHORT);
            return;
          } else if (selectedUserRole == 'Barber') {
            if (address == '' || designation == '') {
              Platform.OS == 'ios'
                ? Alert.alert('Please fill all the fields')
                : ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
              return;
            } else {
              loginWithGoogle(userInfo, null, null, null, { isApple: isAppleLogin });
            }
          } else if (selectedUserRole == 'Customer') {
            if (address == '') {
              Platform.OS == 'ios'
                ? Alert.alert('Please fill all the fields')
                : ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
              return;
            } else {
              loginWithGoogle(userInfo, null, null, null, { isApple: isAppleLogin });
            }
          }
        }}
        loader={loading}
      />

      <SelectLocationModal
        // setLocation={setAddress}
        // address={address}
        isVisible={selectLocationModal}
        setIsVisibleModal={setselectLocationModal}
        setLocation={setAddress}
        onPress={() => {
          setselectLocationModal(false);
          setTimeout(() => {
            setIsVisible(true)
          }, 500);
        }}
      />

      {/* </KeyboardAvoidingView> */}
    </ScreenBoiler>
  );
};

export default LoginScreen;

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.2,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    // alignItems: 'center',
    // backgroundColor : Color.green
  },
  bottomImage: {
    width: windowWidth * 0.4,
    alignSelf: 'center',
    // backgroundColor : 'red'
  },
  textContainer: {
    flexDirection: 'row',

    width: windowWidth * 0.7,
    height: windowWidth * 0.7,
    borderRadius: moderateScale((windowWidth * 0.7) / 2, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: 'bold',
  },
  text: {
    textTransform: 'uppercase',
    color: Color.white,
    fontSize: moderateScale(16, 0.3),
    // marginTop : moderateScale(10,0.3),
    // fontStyle : 'normal'
  },
  text1: {
    textTransform: 'uppercase',
    color: Color.white,
    fontSize: moderateScale(32, 0.3),
    // marginTop : moderateScale(10,0.3),
    // lineHeight: moderateScale(32, 0.3),
  },
  ios_button_container: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.06,
    marginTop: windowHeight * 0.04,
    borderRadius: moderateScale(30, 0.2),
    overflow: "hidden",

  },
  apple_button: {
    width: "100%",
    height: "100%"

  }

});
