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

const MyBookings = () => {
  const user = useSelector(state => state.commonReducer.userData);
  const [item, setItem] = useState('');
  const [Loading, setLoading] = useState(false);
  const [bookingResponse, setBookingResponse] = useState([]);
  
  const isFocused = useIsFocused();

  const token = useSelector(state => state.authReducer.token);
  
  // Booking GET API START
  const GetBooking = async () => {
    const url = `auth/booking/list?status=${item == '' ? 'all' : item}`;
    setLoading(true);
    setBookingResponse([]);

    const response = await Get(url, token);

    setLoading(false);
    if (response != undefined) {
      setBookingResponse(response?.data?.data);
    }
  };

  const barberBooking = async () => {
    const url = `auth/barber/booking/list?status=${item == '' ? 'all' : item}`;
    setLoading(true);
    setBookingResponse([]);
    const response = await Get(url, token);
    setLoading(false);
    if (response != undefined) {
   
      setBookingResponse(response?.data?.barber_booking_list);
    }
  };

  useEffect(() => {
    user?.role == 'customer' ? GetBooking() : barberBooking();
  }, [isFocused, item]);

  
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
        <CustomText isBold style={styles.text1}>
          My Bookings
        </CustomText>

        <DropDownSingleSelect
          array={
            [
                  'complete',
                  'reject',
                  'pending',
                  'accept',
                  'waiting for approval',
                ]
           
          }
          backgroundColor={Color.white}
          item={item}
          setItem={setItem}
          placeholder={'Choose any category'}
          width={windowWidth * 0.95}
          dropdownStyle={{
            width: windowWidth * 0.95,
            borderBottomWidth: 0,
            marginTop: moderateScale(30, 0.3),
          }}
        />

        {Loading ? (
          <View
            style={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.7,
              justifyContent: 'center',
            }}>
            <ActivityIndicator size={'large'} color={Color.themeColor} />
          </View>
        ) : (
          <FlatList
            numOfColumns={1}
            decelerationRate={'fast'}
            showsVerticalScrollIndicator={false}
            style={{
              marginTop: moderateScale(10, 0.3),
            }}
            contentContainerStyle={{
              paddingHorizontal: moderateScale(8, 0.3),
              paddingBottom: moderateScale(50, 0.3),
            }}
            data={bookingResponse}
            numColumns={user?.role == 'customer' ? 1 : 2}
            // numColumns={item != 'complete' ? 2 :1}
            ListEmptyComponent={() => {
              return (
                <NoData
                  style={{
                    height: windowHeight * 0.25,
                    width: windowWidth * 0.6,
                    alignItems: 'center',
                  }}
                  text={'No Booking yet'}
                />
              );
            }}
            renderItem={({item, index}) => {
              return user?.role == 'customer' ? (
                <CompletedOrderCard 
                setBookingData={setBookingResponse}
            // data={bookingResponse}
            // bookings={}
                item={item}  />
              ) : (
                <OrderCard item={item} />
              );
            }}
          />
        )}
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default MyBookings;

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.03,
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
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
    height: windowHeight * 0.46,
    backgroundColor: 'black',
    marginTop: moderateScale(10, 0.3),
  },
  viewAll: {
    color: Color.white,
    fontSize: moderateScale(12, 0.3),
  },
});
