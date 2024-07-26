import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React, {useState, useRef} from 'react';
import Video from 'react-native-video';
import Slider from '@react-native-community/slider';
import {
  apiHeader,
  requestCameraPermission,
  windowHeight,
  windowWidth,
} from '../Utillity/utils';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import CustomButton from '../Components/CustomButton';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {launchCamera} from 'react-native-image-picker';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useNavigation} from '@react-navigation/native';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import MediaPlayer from '../Components/MediaPlayer';
// import {formats} from 'numeral';

const CustomerVideoPlayer = props => {
  const userData = useSelector(state => state.commonReducer.userData);
  const item = props?.route?.params?.item;
  const text = props?.route?.params?.text;


  const navigation = useNavigation();

  const format = secound => {
    let mins = parseInt(secound / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(secound) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        <MediaPlayer
          item={item}
          userRole={userData?.role}
          uri={text == 'viewReply' ? item?.reply?.reply : item?.video}
          text={text}
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default CustomerVideoPlayer;
const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.03,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // backgroundColor : Color.green
  },
  button: {
    height: '100%',
    width: '100%',
    // backgroundColor: 'red',
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    pointerEvents: 'none',
  },
  rowView: {
    flexDirection: 'row',
    width: '100%',
    // paddingTop :moderateScale(30,.6),
    justifyContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button2: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.12,
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '20%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    position: 'absolute',
    bottom: 0,
    paddingHorizontal: moderateScale(20, 0.6),
  },
  text: {
    fontSize: moderateScale(10, 0.6),
    color: '#fff',
  },
  buttonRow: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    // paddingVertical: moderateScale(5, 0.6),
    paddingHorizontal: moderateScale(30, 0.3),
    // height: '60%',
  },
});
