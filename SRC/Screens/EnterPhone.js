import React, {useState} from 'react';
import {
  Image,
  Dimensions,
  ImageBackground,
  Platform,
  ToastAndroid,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {useDispatch, useSelector} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import navigationService from '../navigationService';

import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import CustomStatusBar from '../Components/CustomStatusBar';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {Alert} from 'react-native';
import CustomImage from '../Components/CustomImage';
import {View} from 'react-native';
// import CardContainer from '../Components/CardContainer';
// import CustomHeader from '../Components/CustomHeader';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const EnterPhone = props => {
  const fromForgot = props?.route?.params?.fromForgot;
  const [phone, setPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const EnterOTP = async () => {
    const body = {
      email: phone,
    };

    for (let key in body) {
      if (body[key] == '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`${key} field is empty`, ToastAndroid.SHORT)
          : Alert.alert(`${key} field is empty`);
      }
    }

    const url = 'password/email';
    setIsLoading(true)
    const response = await Post(url, body, apiHeader());
    setIsLoading(false)

    if (response != undefined) {
      alert(response?.data?.data[0].code)
      Platform.OS === 'android' 
        ? ToastAndroid.show('Your OTP is Send', ToastAndroid.SHORT)
        : Alert.alert('OTP is Send')       
        navigationService.navigate('VerifyNumber',{phoneNumber : phone})
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
            Your Email
          </CustomText>
          <CustomText style={styles.txt3}>
            Enter Your Email to Reset password
          </CustomText>
          {/* <View style={styles.phoneView}> */}
          <TextInputWithTitle
            iconName="envelope"
            iconType={FontAwesome}
            // titleText={'Email'}
            secureText={false}
            placeholder={'Email'}
            setText={setPhone}
            value={phone}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.7}
            border={1}
            borderColor={'#1B5CFB45'}
            backgroundColor={'#FFFFFF'}
            // marginTop={moderateScale(30, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(25, 0.3)}
            marginTopDown={moderateScale(10,0.3)}
            elevation
          />

          <CustomButton
            text={
              isLoading ? (
                <ActivityIndicator color={'#ffffff'} size={'small'} />
              ) : (
                'Send'
              )
            }
            isBold
            textColor={Color.white}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            marginTop={moderateScale(15, 0.3)}
            onPress={() => {
              EnterOTP();
             
            }}
            bgColor={Color.themeColor}
            borderColor={Color.white}
            // borderWidth={2}
            borderRadius={moderateScale(25, 0.3)}
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

export default EnterPhone;
