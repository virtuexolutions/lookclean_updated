import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import navigationService from '../navigationService';
import moment from 'moment/moment';
import CustomTextWithMask from '../Components/CustomTextWithMask';
import BarberCard from '../Components/BarberCard';
import {useSelector} from 'react-redux';
import OrderCard from '../Components/OrderCard';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import NoData from '../Components/NoData';
import {useIsFocused} from '@react-navigation/native';
import CompletedOrderCard from '../Components/CompletedOrderCard';
import FilteringModal from '../Components/FilteringModal';
import ShowReview from '../Components/ShowReview';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Alert} from 'react-native';
import {Platform} from 'react-native';
import CustomButton from '../Components/CustomButton';

const CompareBaberScreen = () => {
  const user = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  const [isLoading, setIsLoading] = useState(false);

  const focused = useIsFocused();

  const [Loading, setLoading] = useState(false);
  const [barberData, setBarberData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [isHolidayMode, setIsHolidayMode] = useState(false);
  const [selectedBarber, setSelectedBarber] = useState([]);
  const [index, setIndex] = useState(0);

  const GetBarberBooking = async () => {
    const url = `auth/barber/booking/list`;
    setLoading(true);
    const response = await Get(url, token);

    setLoading(false);

    if (response != undefined) {
      setOrderData(response?.data?.barber_booking_list);
    }
  };

  const barberFilter = async () => {
    const url = 'auth/barber/filter';
    const body = {
      featured: selectedItem?.includes('featured barber') ? 1 : 0,
      near: selectedItem?.includes('nearest to me') ? 1 : 0,
      earlier: selectedItem?.includes('earliest') ? 1 : 0,
    };

    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
  
      setBarberData(response?.data?.users);
    }
  };

  useEffect(() => {
    if (user?.role == 'barber') {
      // BarberList();
      GetBarberBooking();
    }
  }, [focused]);

  useEffect(() => {
    if (user?.role == 'customer') {
      barberFilter();
    }
  }, [focused, selectedItem.length]);

 

  return (
    <ScreenBoiler
      showHeader={true}
      showback={true}
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
            paddingBottom: windowHeight * 0.155,
            alignItems: 'center',
            height: windowHeight * 0.95,
           }}>
          {isLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: windowHeight * 0.2,
              }}>
              <ActivityIndicator color={Color.themeColor} size={'large'} />
            </View>
          ) : (
            <FlatList
              decelerationRate={'fast'}
              numColumns={2}
              ListEmptyComponent={() => {
                return (
                  <NoData
                    style={{
                      height: windowHeight * 0.25,
                      width: windowWidth * 0.6,
                      alignItems: 'center',
                    }}
                    text={'No barber found'}
                  />
                );
              }}
              style={{
                marginTop: moderateScale(10, 0.3),
              }}
              contentContainerStyle={{
                width: windowWidth,
                alignItems: 'center',
                justifyContent: 'space-between',
                // paddingHorizontal: moderateScale(8, 0.3),
              }}
              // data={barberdata}
              data={barberData}
              renderItem={({item, index}) => {
                return (
                  <BarberCard
                    selectedBarber={selectedBarber}
                    setSelectedBarber={setSelectedBarber}
                    fromComparebarber={true}
                    item={item}
                    setIsHolidayMode={setIsHolidayMode}
                    isHolidayMode={isHolidayMode}
                    onPress={() => {
                      if (item?.holiday_mode == true) {
                        setIsHolidayMode(true);
                      } else {
                        navigationService.navigate('BarberServicesScreen', {
                          detail: item,
                        });
                      }
                    }}
                  />
                );
              }}
            />
          )}
          {selectedBarber?.length === 4 && (
            <View
              style={{
                position: 'absolute',
                bottom: 100,
                // backgroundColor: 'red',
              }}>
              <CustomButton
                textColor={Color.black}
                width={windowWidth * 0.8}
                height={windowHeight * 0.06}
                text={'compare'}
                fontSize={moderateScale(14, 0.3)}
                onPress={() => {
                  navigationService.navigate('BarberCompersion', {
                    item: selectedBarber,
                  });
                }}
                isGradient={true}
                borderRadius={moderateScale(30, 0.4)}
                isBold
                marginTop={moderateScale(5, 0.3)}
              />
            </View>
          )}
        </View>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default CompareBaberScreen;

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
  mapview: {
    // backgroundColor: 'red',
    width: windowWidth * 0.76,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(5, 0.6),
  },
});
