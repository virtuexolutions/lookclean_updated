import {ActivityIndicator, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import CustomImage from './CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import FontAwesone5 from 'react-native-vector-icons/FontAwesome5';
import CustomButton from './CustomButton';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import navigationService from '../navigationService';
import numeral from 'numeral';
import moment from 'moment/moment';
import { Get } from '../Axios/AxiosInterceptorFunction';

const CompletedOrderCard = ({
  item,
  fromModal,
  selectedItem,
  setSelectedItem,
  setIsVisible,
  isVisible,
  fromSupportScreen,
  setBookingData
}) => {
  const navigationService = useNavigation();
  const user = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token)
  const [cancelBookingState ,setCancelBookingState] =useState()
  const [isLoadding, setIsLoading] = useState(false)


  const cancelBooking = async ()=>{
   
    const url = `auth/cancel_booking/${item?.booking_detail[0]?.booking_id}`
    setIsLoading(true)
    const response = await Get(url,token);
    setIsLoading(false)
    if(response != undefined){
       console.log("Response ====> , ", response?.data);
        setBookingData(prevState => prevState?.filter(prevStateItem => prevStateItem?.booking_detail[0]?.booking_id !== item?.booking_detail[0]?.booking_id))
       // setCancelBookingState(response?.data)
        }
  }

// const dateDiff = (date, time) => {
//   const formattedTime = moment(time, 'h:mm A').format('HH:mm:ss');
//   const combinedDateTime = moment(date + ' ' + formattedTime);
//   const diff = combinedDateTime.diff(moment(), 'hour');
//   return diff;
// };


const dateDiff = (date, time) => {
   
  return moment(date + ' ' + moment(time, 'h:mm A').format('HH:mm:ss')).diff(
    moment(),
    'hours',
  )
};

  return (
    <TouchableOpacity
      onPress={() => {
        // fromSupportScreen == true &&
        setSelectedItem(item);
        setIsVisible(false);
      }}
      disabled={fromModal == true ? false : true}
      style={styles.mainContainer}>
      <View
        style={[
          styles.statusView,
          {
            backgroundColor:
              item?.review == null
                ? item?.status.toLowerCase() == 'reject'
                  ? 'rgba(255,0,0,0.6)'
                  : item?.status.toLowerCase() == 'accept'
                  ? 'rgba(0,255,0,0.6)'
                  : item?.status.toLowerCase() == 'complete'
                  ? 'rgba(0,255,255,0.6)'
                  : 'rgba(233,255,0,0.6)'
                : 'rgba(4, 7, 166, 0.8)',
          },
        ]}>
        <CustomText isBold style={styles.status}>
          {item?.review == null ? item?.status : 'Reviewed'}
        </CustomText>
      </View>

      <View style={styles.imageView}>
        <CustomImage
          // onPress={() => {
          //   if (fromSupportScreen == true) {
          //     setSelectedItem(item);
          //     setIsVisible(false);
          //   }
          // }}
          style={{
            height: '100%',
            width: '100%',
          }}
          source={
            item?.barber_info?.photo
              ? {uri: item?.barber_info?.photo}
              : require('../Assets/Images/dummyCustomer1.png')
          }
        />
      </View>
      <View>
        <View style={styles.row}>
          <CustomText isBold style={styles.heading}>
            {user?.role == 'customer' ? 'Barber name' : 'Customer name'} :
          </CustomText>
          <CustomText
            numberOfLines={1}
            isBold
            style={[styles.Text, {width: windowWidth * 0.2}]}>
            {user?.role == 'customer'
              ? `${item?.barber_info?.first_name} ${item?.barber_info?.last_name}`
              : `${item?.member_info?.first_name} ${item?.member_info?.last_name}`}
          </CustomText>
        </View>
        <View style={styles.row}>
          <CustomText isBold style={styles.heading}>
            Date :
          </CustomText>
          <CustomText numberOfLines={1} style={styles.Text}>
            {item?.booking_date}
            {/* aug 12,2023 */}
          </CustomText>
        </View>
        <View style={styles.row}>
          <CustomText isBold style={styles.heading}>
            Time :
          </CustomText>
          <CustomText numberOfLines={1} style={styles.Text}>
            {item?.booking_time}
          </CustomText>
        </View>
        <View style={styles.row}>
          <CustomText isBold style={styles.heading}>
            Amount :
          </CustomText>
          <CustomText
            numberOfLines={1}
            style={[styles.Text, {width: windowWidth * 0.25}]}>
            {numeral(item?.total_price).format('$0,0.00')}
          </CustomText>
        </View>
        <View style={styles.row}>
          <View style={styles.iconView}>
            <Icon
              style={{
                textAlign: 'center',
              }}
              name="map-marker-alt"
              as={FontAwesone5}
              color={Color.black}
              size={17}
            />
          </View>
          <CustomText
            // isBold
            style={{
              color: Color.white,
              fontSize: moderateScale(12, 0.6),
              paddingHorizontal: moderateScale(5, 0.6),
            }}>
            {item?.custom_location}
          </CustomText>
        </View>
      </View>
      <View style={{
      marginTop :moderateScale(30,.3)   
    }}>

      <CustomButton
        textColor={Color.white}
        borderWidth={1}
        borderRadius={moderateScale(15, 0.6)}
        borderColor={Color.white}
        width={windowWidth * 0.2}
        height={windowHeight * 0.04}
        text={'details'}
        fontSize={moderateScale(13, 0.3)}
        onPress={() => navigationService.navigate('OrderDetails', {item: item})}
        isBold
        marginHorizontal={moderateScale(20, 0.3)}
        marginTop={moderateScale(5, 0.3)}
        disabled={fromModal == true || fromSupportScreen}
      />
        { 
         item?.status.toLowerCase() != 'complete' && 
        <CustomButton
        textColor={Color.white}
        borderWidth={1}
        borderRadius={moderateScale(15, 0.6)}
        borderColor={Color.white}
        width={windowWidth * 0.2}
        height={windowHeight * 0.04}
        text={isLoadding ? <ActivityIndicator size={'small'} color={'white'}/> :'cancel'}
        fontSize={moderateScale(13, 0.3)}
        onPress={() =>{
          cancelBooking()
        }}
        isBold
        marginHorizontal={moderateScale(20, 0.3)}
        marginTop={moderateScale(10, 0.3)}
        disabled={dateDiff(item?.booking_date ,item?.booking_time ,) <= 12 ? true :false }
      />}
      </View>
    </TouchableOpacity>
  );
};

export default CompletedOrderCard;

const styles = StyleSheet.create({
  mainContainer: {
    borderBottomWidth: moderateScale(1, 0.6),
    borderColor: Color.white,
    flexDirection: 'row',
    width: windowWidth * 0.85,
    paddingBottom: moderateScale(10, 0.6),
    marginBottom: moderateScale(15, 0.3),
  },
  row: {
    flexDirection: 'row',
    padding: moderateScale(1, 0.6),
    paddingHorizontal: moderateScale(8, 0.6),
    width: windowWidth * 0.5,
    // backgroundColor : 'red'
  },
  statusView: {
    position: 'absolute',
    right: 2,
    top: 2,
    paddingHorizontal: moderateScale(6, 0.6),
    paddingVertical: moderateScale(2, 0.6),
    borderRadius: moderateScale(10, 0.6),
  },
  status: {
    textAlign: 'center',
    color: Color.white,
    fontSize: moderateScale(9, 0.6),
  },
  Text: {
    // backgroundColor:'orange',
    marginLeft: moderateScale(10, 0.3),
    color: Color.white,
    fontSize: moderateScale(13, 0.6),
    paddingRight: moderateScale(25, 0.6),
    // backgroundColor : 'red',
    width: windowWidth * 0.3,
  },
  heading: {
    fontSize: moderateScale(12, 0.6),
    color: Color.white,
  },
  heading1: {
    color: Color.white,
    // backgroundColor:'red',
    width: windowWidth * 0.45,
    paddingHorizontal: moderateScale(8, 0.6),
    fontSize: moderateScale(15, 0.6),
  },
  imageView: {
    height: windowHeight * 0.08,
    width: windowHeight * 0.08,
    borderRadius: moderateScale((windowHeight * 0.08) / 2),
    overflow: 'hidden',
    marginVertical: moderateScale(25, 0.3),
  },
  iconView: {
    backgroundColor: Color.white,
    width: windowHeight * 0.03,
    height: windowHeight * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale((windowHeight * 0.03) / 2),
    marginHorizontal: moderateScale(5, 0.6),
    // marginTop:moderateScale(1,.6)
  },
});
