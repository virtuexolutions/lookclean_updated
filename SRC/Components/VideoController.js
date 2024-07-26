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
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import {useSelector} from 'react-redux';
import {launchCamera} from 'react-native-image-picker';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useNavigation} from '@react-navigation/native';
import ConsultationModal from './ConsultationModal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import {formats} from 'numeral';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import Octicons from 'react-native-vector-icons/Octicons';

const VideoController = ({item}) => {
  const userData = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);

  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(true);
  const [progress, setProgress] = useState(null);
  const [fullScreen, setFullScreen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const videoRef = useRef();
  const navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);

  // const format = secound => {
  //   let mins = parseInt(secound / 60)
  //     .toString()
  //     .padStart(2, '0');
  //   let secs = (Math.trunc(secound) % 60).toString().padStart(2, '0');
  //   return `${mins}:${secs}`;
  // };

  return (
    <>
      <TouchableOpacity
        onPress={() => {
          userData?.role == 'barber'
            ? navigation.navigate('VideoReplyScreen', {item: item})
            : setModalVisible(true);
        }}
        style={{
          height: windowHeight * 0.08,
          width: windowWidth * 0.94,
          borderRadius: moderateScale(10, 0.6),
          alignItems: 'center',
          paddingLeft: moderateScale(5, 0.6),
          marginVertical: moderateScale(10, 0.3),
          flexDirection: 'row',
          // justifyContent: 'space-between',
          backgroundColor: 'white',
        }}>
        <Icon
          name="video"
          as={Octicons}
          size={moderateScale(35.6)}
          color={Color.black}
        />

        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: moderateScale(5.6),
          }}>
          <CustomText
            style={{
              fontSize: moderateScale(13, 0.6),
              color: Color.black,
            }}>
            {' '}
            {userData?.role == 'barber'
              ? `${item?.user_info?.first_name}${item?.user_info?.last_name}`
              : `${item?.barber_info?.first_name}${item?.barber_info?.last_name}`}
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(13, 0.6),
              color: Color.black,
            }}>
            {moment(item?.created_at).format('ll')}
          </CustomText>
        </View>
        {userData?.role == 'customer' && item?.reply != null && (
          <Icon
            style={{position: 'absolute', right: moderateScale(15.6)}}
            as={EvilIcons}
            name="envelope"
            size={moderateScale(20, 0.6)}
            color={Color.green}
          />
        )}
      </TouchableOpacity>
      {userData?.role == 'customer' && (
        <ConsultationModal
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          item={item}
        />
      )}
    </>
  );
};

export default VideoController;
