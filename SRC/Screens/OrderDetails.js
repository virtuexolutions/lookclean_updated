import React, {useEffect, useState} from 'react';
import {ImageBackground, View, ScrollView, FlatList} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment/moment';
import OrderCard from '../Components/OrderCard';
import CustomImage from '../Components/CustomImage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import numeral from 'numeral';
import {Icon} from 'native-base';
import CustomButton from '../Components/CustomButton';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import ImageView from 'react-native-image-viewing';
import ReviewModal from '../Components/ReviewModal';
import ReviewCard from '../Components/ReviewCard';

const OrderDetails = props => {
  const item = props?.route?.params?.item;
  console.log("🚀 ~ OrderDetails ~ item:", item?.booking_date)

  const user = useSelector(state => state.commonReducer.userData);

  const token = useSelector(state => state.authReducer.token);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [rbRef, setRbref] = useState(null);
  const [review, setReview] = useState(
    item?.review == null ? {} : item?.review,
  );

  const dateDiff = (date, time) => {
   
    return moment(date + ' ' + moment(time, 'h:mm A').format('HH:mm:ss')).diff(
      moment(),
      'minute',
    )
  };


  const calculateTotalAmount = () => {

    const totalAmount = item?.booking_detail?.reduce((sum, booking) => {
      const bookingTotal =
        booking?.service_info?.price !== undefined
          ? parseFloat(booking?.service_info?.price)
          : 0;

      return sum + bookingTotal;
    }, 0);


    return numeral(totalAmount).format('$0,0.0');
  };

  const changeStatus = async value => {
    const url = `auth/barber/booking/status/${item?.id}`;
    const body = {
      status: value,
    };
    value == 'accept' ? setIsLoading(true) : setisLoading2(true);
    const response = await Post(url, body, apiHeader(token));
    value == 'accept' ? setIsLoading(false) : setisLoading2(false);
    if (response != undefined) {
      navigation.goBack();
    }
  };

  const accept = async () => {
    const body = {
      status: item?.status == 'accept' ? 'waiting for approval' : 'complete',
    };
    const url = `auth/barber/booking/status/${item?.id}`;
    setisLoading2(true);
    const response = await Post(url, body, apiHeader(token));
    setisLoading2(false);
    if (response != undefined) {
      
      navigation.goBack();

    }
  };
 const date = dateDiff()
 console.log("🚀 ~ OrderDetails ~ date:", date)

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
          Orders Details
        </CustomText>
        <View style={styles.containerCard}>
          <CustomImage
            source={{
              uri: item?.member_info?.photo,
            }}
            style={styles.image}
          />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: windowHeight * 0.15,
              // paddingTop : moderateScale(20,0.3),
              alignItems: 'center',
            }}
            style={{
              width: windowWidth,
            }}>
            <CustomText isBold numberOfLines={1} style={styles.name}>
              {user?.role == 'customer'
                ? `${item?.barber_info?.first_name}${item?.barber_info?.last_name}`
                : `${item?.member_info?.first_name}${item?.member_info?.last_name}`}
            </CustomText>
            <View style={[styles.eachRow, {marginTop: moderateScale(30, 0.3)}]}>
              <CustomText
                isBold
                style={{
                  // width: windowWidth * 0.16,
                  fontSize: moderateScale(14, 0.3),
                  // backgroundColor : 'red'
                }}>
                Date :{' '}
              </CustomText>
              <CustomText style={styles.heading}>
                {item?.booking_date}
              </CustomText>
            </View>
            <View style={styles.eachRow}>
              <CustomText
                isBold
                style={{
                  // width: windowWidth * 0.16,
                  fontSize: moderateScale(14, 0.3),
                }}>
                time :{' '}
              </CustomText>
              <CustomText style={styles.heading}>
                {item?.booking_time}
              </CustomText>
            </View>

            {item?.dis_price && (
              <View style={styles.eachRow}>
                <CustomText
                  isBold
                  style={{
                    // width: windowWidth * 0.16,
                    fontSize: moderateScale(14, 0.3),
                  }}>
                  Voucher :{' '}
                </CustomText>
                <CustomText style={styles.heading}>
                  {numeral(item?.dis_price).format('$0,0.0')} OFF
                </CustomText>
              </View>
            )}
            <View style={styles.eachRow}>
              <CustomText
                isBold
                style={{
                  // width: windowWidth * 0.16,
                  fontSize: moderateScale(14, 0.3),
                }}>
                Amount :{' '}
              </CustomText>
              <CustomText style={styles.heading}>
                {numeral(calculateTotalAmount()).format('$0,0.0')}
              </CustomText>
            </View>
            {item?.dis_price && (
              <View style={styles.eachRow}>
                <CustomText
                  isBold
                  style={{
                    // width: windowWidth * 0.16,
                    fontSize: moderateScale(14, 0.3),
                  }}>
                  After discount :{' '}
                </CustomText>
                <CustomText style={styles.heading}>
                  {numeral(item?.total_price).format('$0,0.0')}
                </CustomText>
              </View>
            )}

            <CustomText
              isBold
              style={{
                marginTop: moderateScale(20, 0.3),
                width: windowWidth * 0.7,
                // width: windowWidth * 0.16,
                fontSize: moderateScale(14, 0.3),
              }}>
              Services Chose :{' '}
            </CustomText>
            {Array.isArray(item?.booking_detail) &&
            item.booking_detail.length > 0 ? (
              item.booking_detail.map(booking => {
                return (
                  <View
                    key={booking.id}
                    style={{
                      width: windowWidth * 0.7,
                      flexDirection: 'row',
                      paddingVertical: moderateScale(5, 0.3),
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="dot-circle-o"
                      as={FontAwesome}
                      size={moderateScale(14, 0.3)}
                      color={Color.themeColor}
                    />
                    {booking.service_info && (
                      <CustomText
                        style={{
                          marginLeft: moderateScale(5, 0.3),
                          color: Color.black,
                        }}>
                        {booking.service_info.name}
                      </CustomText>
                    )}
                  </View>
                );
              })
            ) : (
              <CustomText style={{color: 'red'}}>No services chosen</CustomText>
            )}

            {item?.image && (
              <View
                style={{
                  flexDirection: 'row',
                  width: windowWidth * 0.7,
                  alignItems: 'center',
                }}>
                <CustomText
                  onPress={() => {
                    setImageModal(true);
                  }}
                  isBold
                  style={{
                    // marginTop: moderateScale(20, 0.3),
                    // width: windowWidth * 0.7,
                    // width: windowWidth * 0.16,
                    fontSize: moderateScale(14, 0.3),
                  }}>
                  Attachments{' '}
                </CustomText>
                <Icon
                  name="document-attach-sharp"
                  as={Ionicons}
                  size={moderateScale(15, 0.6)}
                  color={Color.themeColor}
                />
              </View>
            )}
            {item?.image && (
              <CustomText
                onPress={() => {
                  setImageModal(true);
                }}
                isBold
                style={{
                  marginTop: moderateScale(20, 0.3),
                  width: windowWidth * 0.7,
                  // width: windowWidth * 0.16,
                  fontSize: moderateScale(14, 0.3),
                }}>
                location :{' '}
              </CustomText>
            )}

            {item?.location && (
              <CustomText
                onPress={() => {
                  setImageModal(true);
                }}
                isBold
                style={{
                  marginTop: moderateScale(20, 0.3),
                  width: windowWidth * 0.7,
                  // width: windowWidth * 0.16,
                  fontSize: moderateScale(14, 0.3),
                }}>
                Attachments :{' '}
              </CustomText>
            )}

            <CustomImage
              source={require('../Assets/Images/map.png')}
              style={styles.mapView}
            />
            {item?.status == 'pending' && user?.role != 'customer' && (
              <>
                <CustomButton
                  bgColor={Color.themeColor}
                  borderColor={'white'}
                  borderWidth={1}
                  textColor={Color.black}
                  onPress={() => {
                    changeStatus('accept');
                  }}
                  width={windowWidth * 0.75}
                  height={windowHeight * 0.06}
                  text={
                    isLoading ? (
                      <ActivityIndicator color={Color.black} size={'small'} />
                    ) : (
                      'Accept'
                    )
                  }
                  fontSize={moderateScale(14, 0.3)}
                  textTransform={'uppercase'}
                  isGradient={true}
                  isBold
                  borderRadius={moderateScale(30, 0.4)}
                  marginTop={moderateScale(30, 0.3)}
                />
                <CustomButton
                  bgColor={Color.themeColor}
                  borderColor={'white'}
                  borderWidth={1}
                  borderRadius={moderateScale(30, 0.4)}
                  textColor={Color.black}
                  onPress={() => {
                    changeStatus('reject');
                  }}
                  width={windowWidth * 0.75}
                  height={windowHeight * 0.06}
                  text={
                    isLoading2 ? (
                      <ActivityIndicator color={Color.black} size={'small'} />
                    ) : (
                      'Reject'
                    )
                  }
                  fontSize={moderateScale(14, 0.3)}
                  textTransform={'uppercase'}
                  isGradient={true}
                  isBold
                  marginTop={moderateScale(10, 0.3)}
                />
              </>
            )}
            {item?.status == 'accept' &&
              user?.role == 'barber' &&
              dateDiff(item?.booking_date, item?.booking_time) <= 0 && 
              
                <CustomButton
                  bgColor={Color.themeColor}
                  borderColor={'white'}
                  borderWidth={1}
                  textColor={Color.black}
                  onPress={() => {
                    accept();
                    // buttonText == 'review' &&  rbRef.open()
                  }}
                  width={windowWidth * 0.75}
                  height={windowHeight * 0.06}
                  text={
                    isLoading2 ? (
                      <ActivityIndicator color={Color.black} size={'small'} />
                    ) : (
                      'done the job'
                    )
                  }
                  fontSize={moderateScale(14, 0.3)}
                  textTransform={'uppercase'}
                  isGradient={true}
                  isBold
                  marginTop={moderateScale(30, 0.3)}
                />
              }
            {item?.status == 'waiting for approval' &&
              user?.role == 'customer' &&
              dateDiff(item?.booking_date, item?.booking_time) <= 0 && 
              (
                <CustomButton
                  bgColor={Color.themeColor}
                  borderColor={'white'}
                  borderWidth={1}
                  textColor={Color.black}
                  onPress={() => {
                    accept();
                    // buttonText == 'review' &&  rbRef.open()
                  }}
                  width={windowWidth * 0.75}
                  height={windowHeight * 0.06}
                  text={
                    isLoading2 ? (
                      <ActivityIndicator color={Color.black} size={'small'} />
                    ) : (
                      'Approve complete Request'
                    )
                  }
                  fontSize={moderateScale(14, 0.3)}
                  textTransform={'uppercase'}
                  isGradient={true}
                  isBold
                  marginTop={moderateScale(30, 0.3)}
                />
              )}
            {item?.status == 'complete' &&
              (user?.role == 'customer' &&
              item?.review == null &&
              Object.keys(review).length == 0 ? (
                <CustomButton
                  bgColor={Color.themeColor}
                  borderColor={'white'}
                  borderWidth={1}
                  textColor={Color.black}
                  onPress={() => {
                    rbRef.open();
                  }}
                  width={windowWidth * 0.75}
                  height={windowHeight * 0.06}
                  text={
                    isLoading ? (
                      <ActivityIndicator color={Color.black} size={'small'} />
                    ) : (
                      'review'
                    )
                  }
                  fontSize={moderateScale(14, 0.3)}
                  textTransform={'uppercase'}
                  isGradient={true}
                  isBold
                  marginTop={moderateScale(30, 0.3)}
                  borderRadius={moderateScale(20, 0.6)}
                />
              ) : Object.keys(review).length > 0 ? (
                <>
                  <CustomText
                    isBold
                    style={{
                      fontSize: moderateScale(16, 0.6),
                      color: Color.black,
                      marginTop: moderateScale(10, 0.6),
                    }}>
                    Customer Review
                  </CustomText>
                  <ReviewCard item={item} review={review} />
                </>
              ) : (
                <CustomText
                  isBold
                  style={{
                    fontSize: moderateScale(16, 0.6),
                    color: Color.black,
                    marginTop: moderateScale(40, 0.6),
                  }}>
                  No review from customer yet !!
                </CustomText>
              ))}
          </ScrollView>
          <ImageView
            images={[{uri: item?.image}]}
            imageIndex={0}
            visible={imageModal}
            onRequestClose={() => setImageModal(false)}
          />
          <ReviewModal
            setRef={setRbref}
            rbRef={rbRef}
            item={item}
            setClientReview={setReview}
          />
        </View>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default OrderDetails;

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
  containerCard: {
    marginTop: windowHeight * 0.08,
    width: windowWidth * 0.9,
    height: windowHeight * 0.68,
    backgroundColor: Color.white,
    borderRadius: moderateScale(20, 0.3),
    alignItems: 'center',
  },
  image: {
    width: moderateScale(100, 0.3),
    height: moderateScale(100, 0.3),
    borderRadius: moderateScale(50, 0.3),
    overflow: 'hidden',
    marginTop: moderateScale(-50, 0.3),
  },
  name: {
    marginTop: moderateScale(5, 0.3),
    fontSize: moderateScale(20, 0.3),
  },
  eachRow: {
    flexDirection: 'row',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: moderateScale(13, 0.3),
  },
  mapView: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.2,
  },
});
