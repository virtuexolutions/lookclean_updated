import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
  ToastAndroid,
  Alert,
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
import VideoUploadingModal from './VideoUploadingModal';

const MediaPlayer = ({uri, item, userRole, replied, text}) => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);

  const [clicked, setClicked] = useState(false);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const videoRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const format = secound => {
    let mins = parseInt(secound / 60)
      .toString()
      .padStart(2, '0');
    let secs = (Math.trunc(secound) % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  // functions starts

  const openCamera = async () => {
    let options = {
      mediaType: 'video',
      maxWidth: 500,
      maxHeight: 500,
      quailty: 0.9,
      saveToPhotos: true,
    };
    if (Platform.OS === 'android') {
      if (PermissionsAndroid.PERMISSIONS.CAMERA) {
      } else {
        await requestCameraPermission();
      }
    }
    launchCamera(options, response => {
      try {
        if (Platform.OS == 'ios') {
          setShow(false);
        } else if (response?.assets && response?.assets[0]?.duration > 30) {
          alert('Video is too long you can post  maximum video of 30 seconds');
        }
        // if (response.didCancel) {
        // } else if (response.error) {
        // }
        // else if (response.customButton) {
        //   Alert.alert(response.customButton);
        // }
        else {
          if (response?.assets && response?.assets[0]) {
            setModalVisible(true);
            answerToCustomer({
              uri: response?.assets[0]?.uri,
              type: response?.assets[0]?.type,
              name: response?.assets[0]?.fileName,
            });
          }else{
          }
        }
      } catch (error) {

      }
    });
  };

  // reply to customer with video api
  const answerToCustomer = async videoObject => {
    console.log('answering d')
    const formData = new FormData();
    const url = 'auth/barber/video';
    setIsLoading(true);
    const body = {
      video: videoObject,
      post_id: item?.id,
    };
    formData.append('video', body.video);
    formData.append('post_id', String(body.post_id));
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);
    if (response !== undefined) {

      navigation.navigate('ConsulationVideoScreen');
    }
  };

  const reject = async () => {
    const url = 'auth/barber/video_delete';
    const body = {
      post_id: item?.id,
    };
    console.log('body',body)
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      console.log('response ===>' , response?.data)
      Platform.OS == 'android' ? 
      ToastAndroid.show('Video deleted successfully' , ToastAndroid.SHORT) :
      Alert.alert('consultancy request denied successfully')
      navigation.goBack()
    }
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.9}
        style={{
          backgroundColor: 'white',
          width :windowWidth,
          // height : 400,
          // justifyContent : 'center'
        }}
        onPress={() => {
          setClicked(!clicked);
        }}>
        <Video
          source={
            {
              uri: uri,
            }
           
          }
          volume={1}
          ref={videoRef}
          paused={paused}
          onProgress={x => {
            setLoading(false)
            console.log(x , 'progress')
            setProgress(x);
          }}
          onLoadStart={x => {
            setLoading(true);
            console.log(x , 'loading start')
          }}
          onLoad={x => {
            setLoading(false);
            console.log(x , 'loading end')
          }}
          style={{
            height: windowHeight * 0.4,
            width: windowWidth,
            backgroundColor :'black'
          }}
        />
        {clicked && (
          <TouchableOpacity
            onPress={() => {
              console.log('clicking')
              // setClicked(!clicked);
            }}
            style={styles.button}>
            <View style={styles.rowView}>
              <TouchableOpacity
                onPress={() => {
                  videoRef.current.seek(progress.currentTime - 5);
                }}
                style={styles.button2}>
                <CustomImage
                  onPress={() => {
                    videoRef.current.seek(progress.currentTime - 10);
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    tintColor : 'white'
                  }}
                  source={require('../Assets/Images/backword.png')}
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setPaused(!paused);
                  console.log('dasdasdasda')
                }}
                style={[
                  styles.button2,
                  {
                    marginHorizontal: moderateScale(25, 0.6),
                  },
                ]}>
                <CustomImage
                  onPress={() => {
                    console.log('dasdasdasda')
                    setPaused(!paused);
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    tintColor : 'white'
                    // backgroundColor : 'green'
                  }}
                  source={
                    isLoading ? (
                      <ActivityIndicator size={'small'} color={Color.black} />
                    ) : paused ? (
                      require('../Assets/Images/play.png')
                    ) : (
                      require('../Assets/Images/paused.png')
                    )
                  }
                />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  videoRef.current.seek(progress?.currentTime + 5);
                }}
                style={styles.button2}>
                <CustomImage
                  onPress={() => {

                    videoRef.current.seek(progress?.currentTime + 10);
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    tintColor : 'white'
                  }}
                  source={require('../Assets/Images/forward.png')}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.row2}>
              <CustomText style={styles.text}>
                {format(progress?.currentTime)}
              </CustomText>
              <Slider
                style={{
                  // width :progress?.playableDuration,
                  width: windowWidth * 0.67,
                  height: windowHeight * 0.02,
                }}
                minimumValue={0}
                maximumValue={progress?.seekableDuration}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#FFF"
                onValueChange={x => {
                  videoRef.current.seek(x);
                }}
                value={progress?.currentTime}
              />
              <CustomText style={styles.text}>
                {format(progress?.seekableDuration)}
              </CustomText>
            </View>
          </TouchableOpacity>
        )}
        {loading && (
          <View
            style={{
              position: 'absolute',
              height: windowHeight * 0.41,
              width: windowWidth,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex : 1,
            }}>
            <ActivityIndicator size={'large'} color={Color.white} />
          </View>
        )}
      </TouchableOpacity>

      {userData?.role == 'customer' && text != 'preview' && (
        <CustomButton
          textColor={Color.black}
          width={windowWidth * 0.8}
          height={windowHeight * 0.07}
          text={'appoint this barber'}
          fontSize={moderateScale(14, 0.3)}
          onPress={() => {
            navigation.navigate('BarberServicesScreen', {
              detail: item?.barber_info,
              fromConsultationVideo: true,
            });
          }}
          isGradient={true}
          borderRadius={moderateScale(30, 0.4)}
          isBold
          marginTop={moderateScale(15, 0.3)}
          marginBottom={moderateScale(14, 0.6)}
        />
      )}
      {userRole == 'barber' && !replied && (
        <View style={styles.buttonRow}>
          <CustomButton
            textColor={Color.white}
            width={windowWidth * 0.3}
            height={windowHeight * 0.06}
            borderRadius={moderateScale(10, 0.4)}
            text={'reply'}
            fontSize={moderateScale(15, 0.3)}
            onPress={() => {
              openCamera();
            }}
            isBold
            marginHorizontal={moderateScale(10, 0.6)}
            bgColor={Color.green}
            marginTop={moderateScale(15, 0.3)}
            marginBottom={moderateScale(5, 0.3)}
          />

          <CustomButton
            textColor={Color.white}
            width={windowWidth * 0.3}
            height={windowHeight * 0.06}
            borderRadius={moderateScale(10, 0.4)}
            text={'Denied'}
            fontSize={moderateScale(15, 0.3)}
            onPress={() => {
              isLoading ? (
                <ActivityIndicator size={'small'} color={Color.white} />
              ) : (
                reject()
              );
            }}
            isBold
            bgColor={Color.red}
            marginTop={moderateScale(15, 0.3)}
            marginBottom={moderateScale(5, 0.3)}
          />
        </View>
      )}
      <VideoUploadingModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default MediaPlayer;

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
    height: 100,
    width: '100%',
    // backgroundColor: 'green',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    zIndex : 1,
    // top : 0
    // pointerEvents: 'none',
    // justifySelf  : 'center'
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
