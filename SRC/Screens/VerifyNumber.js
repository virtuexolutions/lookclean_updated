import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Platform,
  ToastAndroid,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';

import {useDispatch, useSelector} from 'react-redux';

import navigationService from '../navigationService';

import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';

import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomButton from '../Components/CustomButton';
import {ActivityIndicator} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {useEffect} from 'react';
// import CardContainer from '../Components/CardContainer';
import CustomStatusBar from '../Components/CustomStatusBar';
// import CustomHeader from '../Components/CustomHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';

const VerifyNumber = props => {
  const dispatch = useDispatch();
  const {fcmToken} = useSelector(state => state.commonReducer);

  //params
  const fromForgot = props?.route?.params?.fromForgot;
  const phoneNumber = props?.route?.params?.phoneNumber;

  //states
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const CELL_COUNT = 4;
  const ref = useBlurOnFulfill({code, cellCount: CELL_COUNT});
  const [abcd, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });
  const [time, settime] = useState(120);
  const [timerLabel, settimerLabel] = useState('Resend In ');
  if (time > 0) {
    setTimeout(function () {
      settime(time - 1);
    }, 1000);
  }

  const label = () => {
    time == 0 && (settimerLabel('Resend Code '), settime(''));
  };

  const sendOTP = async () => {
    const url = 'password/code/check';
    setIsLoading(true);
    const response = await Post(url, {code: code}, apiHeader());
    setIsLoading(false);
    if (response != undefined) {

      Platform.OS == 'android'
        ? ToastAndroid.show(`OTP sent to ${phoneNumber}`, ToastAndroid.SHORT)
        : alert(`OTP sent to ${phoneNumber}`);
    }
  };

  const VerifyOTP = async () => {
    const url = 'password/code/check';
    setIsLoading(true);
    
    const response = await Post(url, {code: code}, apiHeader());
    setIsLoading(false);
    if (response != undefined) {
      Platform.OS == 'android'
        ? ToastAndroid.show(`otp verified`, ToastAndroid.SHORT)
        : alert(`otp verified`);

      navigationService.navigate('ResetPassword', {phoneNumber: phoneNumber});
    }
  };

  useEffect(() => {
    label();
  }, [time]);

  // useEffect(()=>{
  //   if(timerLabel == )
  //   sendOTP();
  // },[timerLabel])

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
          <CustomText style={styles.txt2}>Verify Account</CustomText>
          <CustomText style={styles.txt3}>
            Enter four digit code we have sent to{' '}
            {
              <CustomText style={{color: Color.white}}>
                {phoneNumber}
              </CustomText>
            }
          </CustomText>
          <CodeField
            placeholder={'0'}
            ref={ref}
            value={code}
            onChangeText={setCode}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <View
                onLayout={getCellOnLayoutHandler(index)}
                key={index}
                style={[styles.cellRoot, isFocused && styles.focusCell]}>
                <CustomText
                  style={[styles.cellText, isFocused && {color: Color.black}]}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </CustomText>
              </View>
            )}
          />
          <CustomText style={styles.txt3}>
            Haven't Recieved Verification Code ?{' '}
            {
              <TouchableOpacity
                disabled={timerLabel == 'Resend Code ' ? false : true}
                onPress={() => {
                  sendOTP(), settimerLabel('ReSend in '), settime(120);
                }}>
                <CustomText style={[styles.txt4]}>
                  {timerLabel} {time}
                </CustomText>
              </TouchableOpacity>
            }
          </CustomText>
          {/* </CardContainer> */}
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
            width={windowWidth * 0.8}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={VerifyOTP}
            bgColor={Color.themeColor}
            // borderColor={Color.white}
            // borderWidth={2}
            borderRadius={moderateScale(30, 0.3)}
          />
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
    color: Color.white,
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

export default VerifyNumber;
