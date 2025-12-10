import { useNavigation } from '@react-navigation/native';
import moment from 'moment/moment';
import { Icon } from 'native-base';
import numeral from 'numeral';
import React, { useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity, View } from 'react-native';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ReviewCard from '../Components/ReviewCard';
import ReviewModal from '../Components/ReviewModal';
import ScreenBoiler from '../Components/ScreenBoiler';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';

const OrderDetails = props => {
  const item = props?.route?.params?.item;
  console.log(item, 'itemmmmmmmmmmmmmmmmmm')
  const user = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  console.log(token, 'tokeeeeeeeeeeeeeeen')
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setisLoading2] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const [rbRef, setRbref] = useState(null);
  const [review, setReview] = useState(
    item?.review == null ? {} : item?.review,
  );
  const [selected_group_member, setSelectedGroupMember] = useState({})
  console.log('seselected_group_member', selected_group_member)

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

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        colors={Color.themeGradient}
        style={styles.container}>
        <CustomText isBold style={styles.text1}>
          Booking Details
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
            <CustomText isBold numberOfLines={1} style={styles.designation}>
              {user?.role == 'customer'
                ? `${item?.member_info?.designation}`
                : ` `}
            </CustomText>
            <View style={[styles.eachRow, { marginTop: moderateScale(30, 0.3) }]}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(14, 0.3),
                }}>
                Booking Number :{' '}
              </CustomText>
              <CustomText style={[styles.heading, { fontSize: moderateScale(11, 0.6), color: Color.darkGray }]}>
                {item?.order_no}
              </CustomText>
            </View>
            <View style={[styles.eachRow]}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(14, 0.3),
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
                  fontSize: moderateScale(14, 0.3),
                }}>
                Booking time :{' '}
              </CustomText>
              <CustomText style={styles.heading}>
                {item?.booking_time}
              </CustomText>
            </View>
            <View style={styles.eachRow}>
              <CustomText
                isBold
                style={{
                  // width: windowWidth * 0.16,
                  fontSize: moderateScale(14, 0.3),
                }}>
                Total Amount :{' '}
              </CustomText>
              <CustomText isBold style={styles.heading}>
                {item?.total_price ?? '0' + ' $'}
              </CustomText>
            </View>
            <View style={styles.eachRow}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(14, 0.3),
                }}>
                Service Location :{' '}
              </CustomText>
              <CustomText style={styles.heading}>
                {item?.custom_location}
              </CustomText>
            </View>
            <View style={styles.eachRow}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(14, 0.3),
                }}>
                Event Type :{' '}
              </CustomText>
              <CustomText style={styles.heading}>
                {item?.event_type}
              </CustomText>
            </View>
            <View style={styles.eachRow}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(14, 0.3),
                }}>
                Event Date :{' '}
              </CustomText>
              <CustomText style={styles.heading}>
                {item?.event_date}
              </CustomText>
            </View>
            <View style={styles.eachRow}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(14, 0.3),
                }}>
                Number of People :
              </CustomText>
              <CustomText style={styles.heading}>
                {' ' + item?.number_of_people}
              </CustomText>
            </View>
            <View style={styles.eachRow}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(14, 0.3),
                }}>
                Number of Staff Members :
              </CustomText>
              <CustomText style={styles.heading}>
                {' ' + item?.number_of_staff_member}
              </CustomText>
            </View>
            <View style={styles.eachRow}>
              <CustomText
                isBold
                style={{
                  fontSize: moderateScale(14, 0.3),
                }}>
                staff preference :
              </CustomText>
              <CustomText style={styles.heading}>
                {' ' + item?.staff_preference}
              </CustomText>
            </View>
            {(Array.isArray(item?.group_members) && item.group_members.length > 0) ?
              <>
                <CustomText
                  isBold
                  style={{
                    marginTop: moderateScale(20, 0.3),
                    width: windowWidth * 0.8,
                    fontSize: moderateScale(16, 0.3),
                  }}>
                  Group Members :
                </CustomText>
                <FlatList
                  data={item?.group_members}
                  showsVerticalScrollIndicator={false}
                  // style={{
                  //   height: windowHeight * 0.3
                  // }}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => setSelectedGroupMember(item)}
                        style={{
                          width: windowWidth * 0.8,
                          height: windowHeight * 0.09,
                          backgroundColor: Color.lightGray,
                          marginTop: moderateScale(10, 0.6),
                          borderRadius: moderateScale(5, 0.6),
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          paddingHorizontal: moderateScale(10, 0.6),
                        }}>
                        <View>
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                          }}>
                            <CustomText isBold style={{
                              fontSize: moderateScale(12, 0.6),
                              color: Color.themeColor1
                            }}>Name : </CustomText>
                            <CustomText isBold style={{
                              fontSize: moderateScale(12, 0.6),
                              color: Color.darkGray,
                            }}>{item?.name}</CustomText>
                          </View>
                          <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start'
                          }}>
                            <CustomText isBold style={{
                              fontSize: moderateScale(12, 0.6),
                              color: Color.themeColor1
                            }}>service name : </CustomText>
                            <CustomText isBold style={{
                              fontSize: moderateScale(12, 0.6),
                              color: Color.darkGray,
                            }}>{item?.service_info?.name}</CustomText>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )
                  }}

                />
              </>
              : <>
                <CustomText
                  isBold
                  style={{
                    marginTop: moderateScale(20, 0.3),
                    width: windowWidth * 0.7,
                    fontSize: moderateScale(14, 0.3),
                  }}>
                  Services Chose :{' '}
                </CustomText>
                {Array.isArray(item?.booking_detail) &&
                  item.booking_detail.length > 0 ? (
                  item.booking_detail.map(booking => {
                    console.log('serviceeeeeeeeeeeee _info  > > > >  >  ', booking)
                    return (
                      <View
                        key={booking?.id}
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
                        {booking?.service_info && (
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
                  <CustomText style={{ color: 'red' }}>No services chosen</CustomText>
                )}
              </>
            }

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
                  text={'Accept'}
                  loader={isLoading}
                  loaderColor={Color.black}
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
                  text={'Reject'}
                  loader={isLoading2}
                  loaderColor={Color.black}
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
                }}
                width={windowWidth * 0.75}
                height={windowHeight * 0.06}
                text={'done the job'}
                loader={isLoading2}
                loaderColor={Color.black}
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
              <CustomButton
                bgColor={Color.themeColor}
                borderColor={'white'}
                borderWidth={1}
                textColor={Color.black}
                onPress={() => {
                  accept();
                }}
                width={windowWidth * 0.75}
                height={windowHeight * 0.06}
                text={'Approve complete Request'}
                loader={isLoading2}
                loaderColor={Color.black}
                fontSize={moderateScale(14, 0.3)}
                textTransform={'uppercase'}
                isGradient={true}
                isBold
                marginTop={moderateScale(30, 0.3)}
              />
            }
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
                  text={'review'}
                  loader={isLoading}
                  loaderColor={Color.black}
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
            images={[{ uri: item?.image }]}
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
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
  },

  containerCard: {
    width: windowWidth * 0.9,
    alignItems: 'center',
    backgroundColor: Color.white,
    borderRadius: moderateScale(20, 0.3),
    paddingVertical: moderateScale(20, 0.3),
    marginTop: moderateScale(20, 0.3),
  },

  text1: {
    color: Color.white,
    fontSize: moderateScale(18, 0.3),
    marginBottom: moderateScale(10, 0.3),
  },

  image: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    borderRadius: (windowWidth * 0.25) / 2,
    marginTop: moderateScale(-40, 0.3),
  },

  name: {
    fontSize: moderateScale(16, 0.3),
    color: Color.black,
    marginTop: moderateScale(5, 0.3),
  },

  designation: {
    fontSize: moderateScale(12, 0.3),
    color: Color.darkGray,
    marginTop: moderateScale(2, 0.3),
  },

  eachRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10, 0.3),
    width: windowWidth * 0.75,
  },

  heading: {

    color: Color.black,
    fontSize: moderateScale(13, 0.3),
  },

  mapView: {
    width: windowWidth * 0.8,
    height: windowHeight * 0.18,
    borderRadius: moderateScale(10, 0.3),
    marginTop: moderateScale(15, 0.3),
  },
});
