import React, {useState} from 'react';
import {
  Dimensions,
  ImageBackground,
  ToastAndroid,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import {setIsVerified, setUserLogin, setUserToken} from '../Store/slices/auth';
import {Platform} from 'react-native';
import {setUserData} from '../Store/slices/common';
import {Post} from '../Axios/AxiosInterceptorFunction';
// import CardContainer from '../Components/CardContainer';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomStatusBar from '../Components/CustomStatusBar';
// import CustomHeader from '../Components/CustomHeader';
import navigationService from '../navigationService';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomImage from '../Components/CustomImage';
import {View} from 'react-native';

const ResetPassword = props => {
  const phoneNumber = props?.route?.params?.phoneNumber;
  

  const dispatch = useDispatch();
  const {fcmToken} = useSelector(state => state.commonReducer);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const passWordReset = async () => {
    const url = 'password/reset';

    const body = {
      email: phoneNumber,
      password: password,
      confirm_password: confirmPassword,
    };

    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} field is empty`, ToastAndroid.SHORT)
          : Alert.alert(`${key} field is empty`);
      }
    }
    setIsLoading(true)

    const response = await Post(url, body, apiHeader());
    setIsLoading(false)

    if (response != undefined) {

      Platform.OS === 'android'
        ? ToastAndroid.show('Password Have been Reset', ToastAndroid.SHORT)
        : Alert.alert('Password Has been Reset');
        navigationService.navigate('LoginScreen')

    }
  }; 
  
  return (
    <>
      <ScreenBoiler
        // showBack={true}
        showHeader={true}
        statusBarBackgroundColor={Color.black}
        statusBarContentStyle={'light-content'}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          colors={Color.themeGradient}
          style={styles.container}>
          <CustomText isBold style={styles.txt2}>
            Reset Your Password
          </CustomText>
          <CustomText style={styles.txt3}>Enter your new password</CustomText>
          <TextInputWithTitle
            // iconName="lock"
            // iconType={FontAwesome}
            // titleText={'password'}
            secureText={true}
            placeholder={'password'}
            setText={setPassword}
            value={password}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.7}
            border={1}
            borderColor={'#1B5CFB45'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            marginBottom={moderateScale(10, 0.3)}
            elevation
          />
          <TextInputWithTitle
            // iconName="lock"
            // iconType={FontAwesome}
            // titleText={'Re-type password'}
            secureText={true}
            placeholder={'Re-type password'}
            setText={setConfirmPassword}
            value={confirmPassword}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.7}
            border={1}
            borderColor={'#1B5CFB45'}
            backgroundColor={'#FFFFFF'}
            // marginTop={moderateScale(15, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            marginBottom={moderateScale(10, 0.3)}
            elevation
          />

          <CustomButton
            // textTransform={"capitalize"}
            text={
              isLoading ? (
                <ActivityIndicator color={'#ffffff'} size={'small'} />
              ) : (
                'Verify now'
              )
            }
            isBold
            textColor={Color.white}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={passWordReset}
            bgColor={Color.themeColor}
            // borderColor={Color.white}
            // borderWidth={2}
            borderRadius={moderateScale(30, 0.3)}
          />

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
        </LinearGradient>
      </ScreenBoiler>
    </>
  );
};

const styles = ScaledSheet.create({
  txt2: {
    color: Color.themeColor,
    fontSize: moderateScale(25, 0.6),
    // fontWeight: 'bold',
  },
  txt3: {
    color: Color.themeLightGray,
    fontSize: moderateScale(13, 0.6),
    textAlign: 'center',
    width: '70%',
    marginTop: moderateScale(20, 0.3),
    // lineHeight: moderateScale(20, 0.3),
  },
  txt4: {
    color: Color.themePink,
    fontSize: moderateScale(14, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.white,
    // alignSelf : 'center'
  },
  txt5: {
    color: Color.black,

    fontSize: moderateScale(12, 0.6),
  },

  codeFieldRoot: {
    marginTop: moderateScale(20, 0.3),
    marginBottom: moderateScale(15, 0.3),
    width: windowWidth * 0.7,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  cellRoot: {
    width: moderateScale(50, 0.3),
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    // backgroundColor: Color.black,
    // borderRadius: moderateScale(10, 0.3),
  },
  focusCell: {
    // backgroundColor: Color.themeColor,
    // borderRadius: moderateScale(10, 0.3),

    borderBottomColor: Color.themeDarkGray,
    borderBottomWidth: 2,
  },
  cellText: {
    color: Color.themeColor,
    fontSize: moderateScale(36, 0.3),
    textAlign: 'center',
  },

  txt2: {
    color: Color.white,
    fontSize: moderateScale(20, 0.6),
    // fontWeight: 'bold',
  },
  txt3: {
    color: Color.themePink,
    fontSize: moderateScale(12, 0.6),
    textAlign: 'center',
    width: '60%',
    marginTop: moderateScale(5, 0.3),
    lineHeight: moderateScale(17, 0.3),
  },
  container: {
    paddingTop: windowHeight * 0.2,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
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

  phoneView: {
    width: '80%',
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    marginTop: moderateScale(20, 0.3),
  },
});

export default ResetPassword;
