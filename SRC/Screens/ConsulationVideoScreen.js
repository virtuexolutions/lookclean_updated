import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment/moment';
import OrderCard from '../Components/OrderCard';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import NoData from '../Components/NoData';
import CustomerCard from '../Components/CustomerCard';
import {useIsFocused} from '@react-navigation/core';
import CompletedOrderCard from '../Components/CompletedOrderCard';
import VideoController from '../Components/VideoController';
import Video from 'react-native-video';
import {TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';

const ConsulationVideoScreen = () => {
  const isFocused = useIsFocused();
  const token = useSelector(state => state.authReducer.token);
  const user = useSelector(state => state.commonReducer.userData);
 
  const [item, setItem] = useState('');
  const [Loading, setLoading] = useState(false);
  const [barberVideo, setBarberVideo] = useState([]);
 
  const [isPlaying, setIsPlaying] = useState(false);
  const [answer, setAnswer] = useState([]);

  // barber video List Api

  const barberConsultancyVideo = async () => {
    const url = 'auth/barber/video';
    setLoading(true);
    const response = await Get(url, token);
    setLoading(false);
    if (response != undefined) {
      console.log('dfdfdfsdf ',JSON.stringify(response?.data,null,2))
      setBarberVideo(response?.data?.video_info);
    }
  };

  // barber Answer to customer list api

  const answerList = async () => {
    const url = 'auth/video';
    setLoading(true);
    const response = await Get(url, token);
    setLoading(false);
    if (response != undefined) {

      setAnswer(response?.data?.video_info);
    }
  };

  useEffect(() => {
    if (user?.role != 'customer') {
      barberConsultancyVideo();
    } else {
      answerList();
    }
  }, [isFocused]);

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
        {Loading ? (
          <View
            style={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.7,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} color={Color.themeColor} />
          </View>
        ) :(
          <FlatList
            numOfColumns={4}
            decelerationRate={'fast'}
            showsVerticalScrollIndicator={false}
            style={{
              marginTop: moderateScale(10, 0.3),
            }}
            contentContainerStyle={{
              paddingHorizontal: moderateScale(8, 0.3),
              paddingBottom: moderateScale(30, 0.3),
            }}
            data={user?.role == 'barber' ?barberVideo :answer}
            ListEmptyComponent={() => {
              return (
                <NoData
                  style={{
                    height: windowHeight * 0.25,
                    width: windowWidth * 0.6,
                    alignItems: 'center',
                  }}
                  text={'No Data'}
                />
              );
            }}
            renderItem={({item, index}) => {

              return <VideoController item={item} />;
            }}
          />
        ) }
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default ConsulationVideoScreen;

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.03,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // backgroundColor : Color.green
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
    // position : 'absolute',
    // bottom : moderateScale(10,0.3),
    // marginTop : moderateScale(10,0.3),
    // lineHeight: moderateScale(32, 0.3),
  },
  bannerView: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.46,
    backgroundColor: 'black',
    marginTop: moderateScale(10, 0.3),
  },
  viewAll: {
    color: Color.white,
    fontSize: moderateScale(12, 0.3),
  },
  activityImage: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.285,
    backgroundColor: Color.white,
    overflow: 'hidden',
    marginVertical: moderateScale(5, 0.3),
    marginHorizontal: moderateScale(2, 0.3),
  },
});
