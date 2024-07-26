import React, {useEffect, useRef, useState} from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  Platform,
  ToastAndroid,
  Alert,
  ActivityIndicator,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {
  apiHeader,
  requestCameraPermission,
  windowHeight,
  windowWidth,
} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import CustomTextWithMask from '../Components/CustomTextWithMask';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';
import navigationService from '../navigationService';
import numeral from 'numeral';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import ReviewCard from '../Components/ReviewCard';
import ShowReview from '../Components/ShowReview';
import Entypo from 'react-native-vector-icons/Entypo';
import ImagePickerModal from '../Components/ImagePickerModal';
import Video from 'react-native-video';
import {launchCamera} from 'react-native-image-picker';
import {err} from 'react-native-svg/lib/typescript/xml';

const BarberServicesScreen = props => {
  const detail = props?.route?.params?.detail;
  const fromConsultationVideo = props?.route?.params?.fromConsultationVideo;
  const userData = useSelector(state => state.commonReducer.userData);
  const userWallet = useSelector(state => state.commonReducer.userWallet);
  const token = useSelector(state => state.authReducer.token);
 
  const [selectedService, setSelectedService] = useState([]);
  const [barberDetails, setBarberDetails] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [video, setVideo] = useState({});
  const [videos, setVideos] = useState([]);
  const [modal, setModal] = useState(false);
  const [totalPrice, settotalPrice] = useState(0);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [fileObject, setFileObject] = useState();
 
 
 
 
  const BarberDetals = async () => {
    const url = `auth/barber/detail/${detail?.id}`;
    setLoading(true);
    const response = await Get(url, token);
    setLoading(false);
    if (response != undefined) {
      setBarberDetails(response?.data?.user_detail);
    }
  };

  useEffect(() => {
    BarberDetals();
  }, []);

  // useEffect(() => {
  //   if (selectedService?.length > 0) {
  //     let t_Price = 0;
  //     selectedService?.map((item, index) => (t_Price += item?.price));
  //     settotalPrice(t_Price);
  //     if (t_Price > userWallet?.amount) {
  //       Alert.alert('Insufficient credits', 'please buy some and try again', [
  //         {
  //           text: 'Cancel',
  //           style: 'cancel',
  //         },
  //         {
  //           text: 'Buy coins',
  //           onPress: () => {
  //             navigationService.navigate('Purchase');
  //           },
  //         },
  //       ]);
  //     }
  //   }
  // }, [selectedService]);

 

  const openCamera = async () => {
    console.log('in the fucmtion')
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
        console.log("Else block")
        await requestCameraPermission();
      }
    }
    launchCamera(options, response => {
    
      try {
       
        if (response.didCancel) {
        } else if (response.error) {
        } 
        else if (response.customButton) {
          Alert.alert(response.customButton);
        }


        else if (response?.assets && response?.assets[0]?.duration > 15) {
          alert('Video is too long you can post  maximum video of 15 seconds');
        }
       
        else {
          if (response == undefined) {
            console.log('dsadas')
          } else {
          
              consultancyVideo({
                uri: response?.assets[0]?.uri,
                type: response?.assets[0]?.type,
                name: response?.assets[0]?.fileName,
              });
            }
          
        }
      } catch (error) {
        console.log(error)
      }
    });
  };


  const consultancyVideo = async videoObject => {
    const formData = new FormData();
    const url = 'auth/video';
    setLoading(true);
    const body = {
      video: videoObject,
      barber_id: detail?.id,
    };
    formData.append('video', body.video);
    formData.append('barber_id', String(body.barber_id));
    const response = await Post(url, formData, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
      
    }
  };

  // useEffect(() => {
  //   if (Object.keys(video).length > 0) {
  //     setVideos(prev => [...prev, video]);
  //     setVideo({});
  //   }
  // }, [video]);

  useEffect(() => {
    // consultancyVideo()
  }, []);

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      showUser={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        <View
          style={{
            width: windowWidth,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CustomImage style={styles.image} source={{uri: detail?.photo}} />
          <View style={{marginLeft: moderateScale(10, 0.3)}}>
            <CustomTextWithMask
              data={`${detail?.first_name} ${detail?.last_name}`}
              isBold
              size={moderateScale(20, 0.3)}
              textStyle={{
                textTransform: 'uppercase',
              }}
            />

            <TouchableOpacity
              onPress={() => {
                setModal(true);
              }}
              style={{
                width: windowWidth * 0.25,
              }}>
              <Rating
                type="custom"
                readonly
                startingValue={
                  detail?.reviews_avg_rating ? detail?.reviews_avg_rating : 0
                }
                ratingCount={5}
                imageSize={moderateScale(18, 0.3)}
                style={{
                  width: windowWidth * 0.24,
                }}
                ratingBackgroundColor={'transparent'}
              />
            </TouchableOpacity>

            <CustomText
              style={{
                color: Color.themeLightGray,
                fontSize: moderateScale(10, 0.3),
              }}>
              {barberDetails?.review?.length} Review
            </CustomText>
           
          </View>
        </View>
        <View
          style={{
            width: windowWidth,
            marginHorizontal: moderateScale(10, 0.6),
          }}>
             <View style={{
              width: windowWidth*0.9,
              paddingVertical :moderateScale(10,.6),
              justifyContent :'space-between',
            }}>
            
              <CustomText
              isBold
                style={{
                  color: Color.themeColor,
                  fontSize: moderateScale(15, 0.3),
                }}>
              designation
              </CustomText>
              <CustomText
                style={{
                  color: Color.white,
                  fontSize: moderateScale(15, 0.3),
                  // paddingHorizontal :moderateScale(10,.6)
                }}>
                  nails
              {/* designation */}
                {detail?.designation}
              </CustomText>
            </View>
          <CustomText
            isBold
            // size={moderateScale(30, 0.3)}
            style={{
              color: Color.themeColor,
              fontSize: moderateScale(18, 0.3),
            }}>
            Ambiance
          </CustomText>

          <FlatList
            showsVerticalScrollIndicator={false}
            data={barberDetails?.questions_ans}
            style={{
              width: windowWidth * 0.95,
            }}
            contentContainerStyle={{
              padding: moderateScale(10, 0.6),
            }}
            renderItem={({item, index}) => {
              return (
                <View
                  activeOpacity={0.9}
                  style={{
                    width: windowWidth,
                    paddingVertical: moderateScale(5, 0.6),
                    flexDirection: 'row',
                  }}>
                  <CustomText
                    isBold
                    style={{
                      fontSize: moderateScale(13, 0.3),
                      width: windowWidth * 0.8,
                      // backgroundColor: 'red',
                      color: Color.white,
                    }}>
                    {item?.name.split('Do u have ')}
                    {/* {barberDetails?.questions_ans[0]?.answer?.answer.toLowerCase() ==
                    'yes'
                      ? `${'i have'} ${item}`
                      : `${'i have no'} ${item}`} */}
                  </CustomText>
                  <Icon
                    as={Entypo}
                    name={
                      item?.answer?.answer.toLowerCase() == 'yes'
                        ? 'check'
                        : 'cross'
                    }
                    size={15}
                    color={
                      item?.answer?.answer.toLowerCase() == 'yes'
                        ? Color.green
                        : Color.themePink
                    }
                  />
                </View>
              );
            }}
          />
        </View>

        <CustomTextWithMask
          data={'All Services'}
          isBold
          size={moderateScale(30, 0.3)}
          textStyle={{
            fontSize: moderateScale(18, 0.3),
          }}
          containerStyle={{
            marginTop: moderateScale(20, 0.3),
          }}
        />

        {Loading ? (
          <View
            style={{
              alignItems: 'center',
              height: windowHeight * 0.4,
              justifyContent: 'center',
            }}>
            <ActivityIndicator
              size={moderateScale(30, 0.6)}
              color={Color.themeColor}
            />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={barberDetails?.services}
            style={{
              width: windowWidth,
              // backgroundColor : 'red',
              flexGrow: 0,
            }}
            contentContainerStyle={{
              paddingBottom: moderateScale(80, 0.3),
              paddingTop: moderateScale(20, 0.3),
            }}
            ListEmptyComponent={() => {
              return (
                <View
                  style={{
                    height: windowHeight * 0.1,
                    justifyContent: 'center',
                  }}>
                  <CustomText
                    style={{
                      fontSize: moderateScale(15, 0.6),
                      color: Color.white,
                      textAlign: 'center',
                    }}
                    isBold>
                    No services found
                  </CustomText>
                </View>
              );
            }}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => {
                    if (
                      selectedService?.some(data => data?.name == item?.name)
                    ) {
                      setSelectedService(
                        selectedService?.filter(
                          data => data?.name != item?.name,
                        ),
                      );
                    } else {
                      setSelectedService(prev => [...prev, item]);
                    }
                  }}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginVertical: moderateScale(10, 0.3),
                    width: windowWidth,
                    paddingRight: moderateScale(20, 0.3),
                    alignItems: 'center',
                  }}>
                  <Icon
                    name={
                      selectedService.some(data => {
                        return data.name == item?.name;
                      })
                        ? 'check-circle-o'
                        : 'circle-o'
                    }
                    as={FontAwesome}
                    color={
                      selectedService.some(data => {
                        return data.name == item?.name;
                      })
                        ? Color.themeColor
                        : Color.white
                    }
                    size={moderateScale(17, 0.3)}
                    style={{}}
                  />
                  <CustomText
                    isBold
                    style={{
                      fontSize: moderateScale(14, 0.3),
                      width: windowWidth * 0.45,
                      color: Color.white,
                      position: 'absolute',
                      left: moderateScale(40, 0.3),
                    }}>
                    {item?.name}
                  </CustomText>
                  <CustomText
                    isBold
                    style={{
                      fontSize: moderateScale(14, 0.3),
                      color: Color.white,
                    }}>
                    {numeral(item?.price).format('$0,0.0')}
                  </CustomText>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={() => {
              return (
                <>
                  {fromConsultationVideo != true && (
                    <CustomButton
                      textColor={Color.black}
                      onPress={() => {
                        openCamera();
                      }}
                      width={windowWidth * 0.75}
                      height={windowHeight * 0.06}
                      text={'Get your consultancy'}
                      fontSize={moderateScale(14, 0.3)}
                      textTransform={'uppercase'}
                      isGradient={true}
                      isBold
                      marginTop={moderateScale(30, 0.3)}
                      borderRadius={moderateScale(35, 0.6)}
                      // disabled={totalPrice > userWallet?.amount}
                    />
                  )}
                  <CustomButton
                    // bgColor={Color.themePink}
                    // borderColor={'white'}
                    // borderWidth={1}
                    textColor={Color.black}
                    onPress={() => {
                      if (selectedService.length > 0) {
                        navigationService.navigate('ImageUpload', {
                          data: selectedService,
                          barber: barberDetails,
                        });
                      } else {
                        Platform.OS == 'android'
                          ? ToastAndroid.show(
                              'Please select any service',
                              ToastAndroid.SHORT,
                            )
                          : alert('Please select any service');
                      }
                    }}
                    width={windowWidth * 0.75}
                    height={windowHeight * 0.06}
                    text={'customize your trimming'}
                    fontSize={moderateScale(14, 0.3)}
                    textTransform={'uppercase'}
                    isGradient={true}
                    isBold
                    marginTop={moderateScale(10, 0.3)}
                    borderRadius={moderateScale(35, 0.6)}
                    disabled={totalPrice > userWallet?.amount}
                  />
                  <CustomButton
                    // bgColor={Color.themePink}
                    // borderColor={'white'}
                    // borderWidth={1}
                    textColor={Color.black}
                    onPress={() => {
                      if (selectedService.length > 0) {
                        navigationService.navigate('ChooseDate', {
                          data: selectedService,
                          barber: barberDetails,
                        });
                      } else {
                        Platform.OS == 'android'
                          ? ToastAndroid.show(
                              'Choose any service first to proceed',
                              ToastAndroid.SHORT,
                            )
                          : Alert.alert('Choose any service first to proceed');
                      }
                    }}
                    width={windowWidth * 0.75}
                    height={windowHeight * 0.06}
                    text={'Book Now'}
                    fontSize={moderateScale(14, 0.3)}
                    textTransform={'uppercase'}
                    isGradient={true}
                    isBold
                    marginTop={moderateScale(10, 0.3)}
                    borderRadius={moderateScale(35, 0.6)}
                    disabled={totalPrice > userWallet?.amount}
                  />
                </>
              );
            }}
          />
        )}
        {/* <VideoRecorderModal 
        /> */}
        {/* <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={setVideo}
          type={'video'}
        /> */}

        <ShowReview
          barberDetails={barberDetails?.review}
          modal={modal}
          setModal={setModal}
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.06,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    paddingLeft: moderateScale(20, 0.3),
  },
  text1: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(20, 0.3),
  },
  text1Absolute: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(16, 0.3),
  },
  bannerView: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.36,
    backgroundColor: 'red',
    marginTop: moderateScale(20, 0.3),
  },
  image: {
    width: moderateScale(140, 0.3),
    height: moderateScale(140, 0.3),
    borderRadius: moderateScale(70, 0.3),
    marginLeft: moderateScale(2.5, 0.3),
    marginTop: moderateScale(2.5, 0.3),
  },
});

export default BarberServicesScreen;

const VideoComponent = ({item, videos, setVideos}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <View style={styles.image}>
      <TouchableOpacity
        style={{
          position: 'absolute',
          right: 2,
          top: 2,
          zIndex: 2,
          // backgroundColor: 'green',
        }}
        onPress={() => {
          setVideos(videos.filter(data => data?.uri != item?.uri));
        }}>
        <Icon
          name={'cross'}
          color={Color.black}
          as={Entypo}
          onPress={() => {
            setVideos(videos.filter(data => data?.uri != item?.uri));
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setIsPlaying(!isPlaying);
        }}
        style={{
          position: 'absolute',
          zIndex: 1,
          // backgroundColor:'red',
          width: windowWidth * 0.12,
          height: windowWidth * 0.12,
          justifyContent: 'center',
          alignItems: 'center',
          // backgroundColor: 'green',
          alignSelf: 'center',
        }}>
        {!isPlaying && (
          <Icon
            onPress={() => {
              setIsPlaying(!isPlaying);
            }}
            name={'controller-play'}
            as={Entypo}
            size={10}
            color={'rgba(255,255,255,.9)'}
          />
        )}
      </TouchableOpacity>
      <Video
        // muted
        paused={!isPlaying}
        repeat={true}
        // controls={true}
        source={{uri: item?.uri}}
        // ref={videoRef}
        // onProgress={x => {
       
        //   setProgress(x);
        // }}

        style={{
          width: '100%',
          height: '100%',
          backgroundColor: Color.white,
        }}
      />
    </View>
  );
};
