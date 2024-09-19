import React, { useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import ImageView from "react-native-image-viewing";
import ScreenBoiler from '../Components/ScreenBoiler';
import { Icon } from 'native-base';
import CustomImage from '../Components/CustomImage';
import { setUserData } from '../Store/slices/common';
import { Patch, Post } from '../Axios/AxiosInterceptorFunction';
import ImagePickerModal from '../Components/ImagePickerModal';
import { formRegEx, formRegExReplacer, imageUrl } from '../Config';
import CustomButton from '../Components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';
import navigationService from '../navigationService';

const ChangePassword = props => {
  const token = useSelector(state => state.authReducer.token);
  const dispatch = useDispatch();

  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const passwordReset = async () => {
    const params = {
      current_password: currentPassword,
      new_password: password,
      confirm_password: confirmPassword,
    };


    const url = 'auth/change_password';
    setIsLoading(true);
    const response = await Post(url, params, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      console.log('response is here ',JSON.stringify(response?.data))
      if (currentPassword != currentPassword) {
        Platform.OS == 'android'
          ? ToastAndroid.show('Current password is incorrect ', ToastAndroid.SHORT)
          : alert('Current password is incorrect ');

      } else {

        Platform.OS == 'android'
          ? ToastAndroid.show('Password changed successfully', ToastAndroid.SHORT)
          : alert('Password changed successfully');

        navigationService.navigate('HomeScreen')
      }
    }
  };


  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        colors={Color.themeGradient}
        style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>



          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: windowHeight * 0.18,
              // paddingTop : moderateScale(20,0.3),
              alignItems: 'center',
            }}
            style={{
              width: windowWidth,
            }}>
            <CustomText isBold style={styles.text1}>
              Change Password
            </CustomText>
            <View style={{ marginTop: moderateScale(50, 0.3) }}>
              <TextInputWithTitle
                iconName={'lock'}
                iconType={FontAwesome}
                titleText={'Current Password'}
                secureText
                placeholder={'Current Password'}
                setText={setCurrentPassword}
                value={currentPassword}
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

                iconName={'lock'}
                iconType={FontAwesome}
                titleText={'New password'}
                secureText
                placeholder={'New password'}
                setText={setPassword}
                value={password}
                viewHeight={0.06}
                viewWidth={0.75}
                inputWidth={0.74}
                backgroundColor={'#FFFFFF'}
                marginTop={moderateScale(12, 0.3)}
                color={Color.themeColor}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(30, 0.4)}

              />
              <TextInputWithTitle
                iconName={'lock'}
                iconType={FontAwesome}
                titleText={'Confirm New password'}
                secureText
                placeholder={'Confirm New password'}
                setText={setConfirmPassword}
                value={confirmPassword}
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
            </View>
            <CustomButton
              bgColor={Color.themeColor}
              borderColor={'white'}
              borderWidth={1}
              textColor={Color.black}
              onPress={() => { passwordReset() }}
              borderRadius={moderateScale(25, 0.6)}
              width={windowWidth * 0.75}
              height={windowHeight * 0.06}
              text={isLoading ? <ActivityIndicator color={'black'} size={'small'} /> : 'Update'}
              fontSize={moderateScale(14, 0.3)}
              textTransform={'uppercase'}
              isGradient={true}
              isBold
              marginTop={moderateScale(30, 0.3)}

            />
          </ScrollView>

        </KeyboardAvoidingView>

      </LinearGradient></ScreenBoiler>

  );
};

const styles = ScaledSheet.create({

  container: {
    paddingTop: windowHeight * 0.03,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // backgroundColor : Color.themeColor
  },
  text1: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(20, 0.3),
    // marginTop : moderateScale(10,0.3),
    // lineHeight: moderateScale(32, 0.3),
  },
});

export default ChangePassword;
