import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  OS,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useNavigation} from '@react-navigation/native';
import VideoReplyScreen from '../Screens/VideoReplyScreen';
import Lottie from 'lottie-react-native';

const VideoUploadingModal = ({modalVisible, setModalVisible}) => {
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Modal
      hasBackdrop={true}
      isVisible={modalVisible}
      onBackdropPress={() => {
        setModalVisible(false);
      }}>
      <View style={styles.main}>
        <View
          style={{
            width: windowWidth * 0.3,
            height: windowHeight * 0.5,
            // backgroundColor: Color.red,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Lottie
            style={{
              //   zIndex: 1,
              height: windowHeight * 0.15,
              width: windowWidth * 0.2,
            }}
            source={require('../Assets/Images/loading.json')}
            loop
            autoPlay
          />
          <CustomText
            isBold
            style={{
              marginHorizontal: moderateScale(10, 0.6),
              fontSize: moderateScale(20, 0.6),
              color: Color.white,
              textAlign: 'center',
              // backgroundColor :'red'
              paddingHorizontal :moderateScale(10,.6),
             marginTop:moderateScale(35,.3)
            }}>
            loading
          </CustomText>
        </View>
      </View>
    </Modal>
  );
};

export default VideoUploadingModal;
const styles = StyleSheet.create({
  main: {
    height: windowHeight,
    width: windowWidth,
    backgroundColor: 'rgba(0,0,0,0.4)',

    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.2,
  },
  heading: {
    color: Color.black,
    fontSize: moderateScale(17, 0.6),
  },
});
