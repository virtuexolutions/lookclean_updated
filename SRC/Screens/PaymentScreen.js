import { Icon } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import BookingDateModal from '../Components/BookingDateModal';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import navigationService from '../navigationService';
import {
  setUserWallet,
  setVoucherData
} from '../Store/slices/common';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { useNavigation } from '@react-navigation/native';
import { CardField, createToken } from '@stripe/stripe-react-native';

const PaymentScreen = props => {
  const navigation = useNavigation();
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const fromStore = props?.route?.params?.fromStore;
  const finalData = props?.route?.params?.finalData;
  console.log(finalData , 'fdsfdsfdsfsdfsd')
  const userWallet = useSelector(state => state.commonReducer.userWallet);

  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('wallet');

  const [isVisible, setIsVisible] = useState(false);
  // console.log('hereeeeeeeeeeeeee ', isVisible)
  const [loading, setLoading] = useState(false);
  const [stripeToken, setStripeToken] = useState(null);
  const [totalPrice, settotalPrice] = useState(0);


  const Booking = async () => {
    const selectedServiceIds = finalData?.services.map(service => service.service_id);
    const formData = new FormData();

    const body = {
      barber_id: finalData?.time?.barber_id,
      booking_date: finalData?.date,
      booking_time: finalData?.time?.time,
      service_time_id: finalData?.time?.id,
      image: finalData?.image && finalData?.image[0],
      custom_location: finalData?.location?.name,
      price: finalData?.total,
      payment_method: selectedPaymentMethod,
      stripeToken: stripeToken,
      // dis_price:!isNaN(finalData?.discount) ? finalData?.discount : 0 ,
    };

    if (!isNaN(finalData?.discount)) {
      formData.append('dis_price', finalData?.discount);
    }

    for (let key in body) {
      formData.append(key, body[key]);
    }
    selectedServiceIds?.map((item, index) =>
      formData.append(`service[${index}]`, item),
    );
   console.log('bodyyyyyyyyy == == = == = >> > >> > ', formData)

    const url = 'auth/booking';
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader(token));
    setIsLoading(false);

    if (response != undefined) {
      console.log('testing ====== >>>> ', response?.data)
      Platform.OS === 'android'
        ? ToastAndroid.show('Booking successful', ToastAndroid.SHORT)
        : Alert.alert('Booking successful');
      dispatch(setUserWallet(response?.data?.user_info?.wallet));
      dispatch(setVoucherData({}));
      Alert.alert(
        'save the booking',
        'you want to save this booking to your calendar ?',
        [

          {
            text: 'Cancel',
            style: 'cancel',
            onPress: () => {
              navigationService.navigate('TabNavigation');
              // fromStore && dispatch(setWholeCart([]));
            },
          },
          {
            text: 'Yes',
            onPress: () => {
              setModalIsVisible(true);
            },
          },
        ],
      );
      // navigation.navigate('HomeScreen')
    }
  };






  const GroupBooking = async () => {
    // return  console.log('object ====================== >>> booking group')
    try {
      // console.log('Function started');
      const barber = finalData?.barberDetails;
      const serviceInfo = finalData?.services;
    // console.log('services info ======> ' , JSON.stringify(serviceInfo , null ,2) )
      const timeInfo = finalData?.time;

      if (!serviceInfo?.members?.length) {
        console.log('No members found');
        return;
      }
      const membersArray = (serviceInfo?.members || []).map(member => {
       const servicesTaken  = member.selectedService.map(item => item?.service_id)
    

        return {
          name: member.name || "",
          service: servicesTaken,
         
          any_alergies: member.allergy || "",
          // add_ons: member.addons ? String(member.addons) : "",
          // reference_image: member.image || ""
        };
      });
    //  console.log('Members Array:', membersArray);

      // const allServiceIds = finalData?.services?.members?.flatMap(member =>
      //   member.selectedService?.map(service => service.service_id) || []
      // );

      // console.log('All Service IDs:', allServiceIds);
    const formData = new FormData();
      const body = {
        booking_time: timeInfo?.time || "",
        booking_date: finalData?.date || "",
        event_type: serviceInfo?.event_type || "",
        event_date: finalData?.date || "",
        number_of_people: Number(serviceInfo?.number_of_people) || 0,
        staff_preference: serviceInfo?.gender_preference || "",
        service_location: serviceInfo?.service_location || "",
        number_of_staff_member: Number(serviceInfo?.staff_member) || 0,
        parking_instructions: serviceInfo?.parking_instruction || "",
        // add_ons: serviceInfo?.add_ons ? String(serviceInfo.add_ons) : "",
        preferred_stylist_name: serviceInfo?.preffered_style || "",
        price: Number(serviceInfo?.totalPrice) || 0,
        dis_price: serviceInfo?.discount || 0,
        barber_id: barber?.id || "",
        service_time_id: timeInfo?.id || "",
        custom_location: finalData?.location?.name || "",
        payment_method: selectedPaymentMethod,
        stripeToken: stripeToken,
        // service_id: allServiceIds,
        // members: membersArray
      };
      for (let key in body) {
        formData.append(key, body[key]);
      }
      // selectedServiceIds?.map((item, index) =>
      //   formData.append(`members[${index}][name]`, item?.name),
      //   formData.append(`members[${index}][any_alergies]`, item?.any_alergies),
      //   item?.service?.map((item2 , index2) =>
      //   formData.append(`members[${index}][service][${index2}]`, item2),
      //   )

      membersArray?.forEach((item, index) => {
          formData.append(`members[${index}][name]`, item?.name);
          formData.append(`members[${index}][any_alergies]`, item?.any_alergies);
        
          item?.service?.forEach((serviceItem, index2) => {
            formData.append(
              `members[${index}][service][${index2}]`,
              serviceItem
            );
          });
        })
        

      
    

  // return   console.log( JSON.stringify(formData , null ,2), '-------------------------body')
      setIsLoading(true);
      const response = await Post('auth/booking-group', formData, apiHeader(token));
      // console.log('Booking Body:========= ?>>>>>>>>> ', response?.data);
      if (response != undefined) {
      console.log('testing ====== >>>> ', response?.data)
        Platform.OS === 'android'
          ? ToastAndroid.show('Booking successful', ToastAndroid.SHORT)
          : Alert.alert('Booking successful');
        dispatch(setUserWallet(response?.data?.user_info?.wallet));
        dispatch(setVoucherData({}));
        Alert.alert(
          'save the booking',
          'you want to save this booking to your calendar ?',
          [

            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => {
                navigationService.navigate('TabNavigation');
              },
            },
            {
              text: 'Yes',
              onPress: () => {
                setModalIsVisible(true);
              },
            },
          ],
        );
      }
      setIsLoading(false);
      console.log('API response:', response?.data);
    } catch (err) {
      setIsLoading(false);
      console.log('Function Error:', err);
    }
  };


  const strpieToken = async () => {
    setLoading(true);
    const responsetoken = await createToken({
      type: 'Card',
    });
// return console.log("======> ", responsetoken);
    if (responsetoken != undefined) {
      setStripeToken(responsetoken?.token?.id);
      setLoading(false);
      setIsVisible(false);
    }
  };

  useEffect(() => {
    if (selectedPaymentMethod == 'stripe' && stripeToken == null) {
      setIsVisible(true);
    }
  }, [selectedPaymentMethod]);

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      showUser={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        colors={Color.themeGradient}
        style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>

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
            <CustomText isBold style={styles.text1}>
              Payment
            </CustomText>
            <CustomText
              isBold
              style={[styles.subHeading, { width: windowWidth * 0.9 }]}>
              Address
            </CustomText>
            <View style={[styles.container1, { height: windowHeight * 0.15 }]}>
              <CustomImage
                source={require('../Assets/Images/address.png')}
                resizeMode={'stretch'}
                style={{
                  width: windowWidth * 0.4,
                  height: '100%',
                }}
              />
              <View
                style={{
                  marginLeft: moderateScale(10, 0.3),
                  justifyContent: 'center',
                }}>
                <CustomText
                  isBold
                  style={{
                    fontSize: moderateScale(14, 0.3),
                    width: windowWidth * 0.4,
                    color: Color.black,
                  }}>
                  Home Address:
                </CustomText>
                <CustomText
                  style={{
                    fontSize: moderateScale(13, 0.3),
                    width: windowWidth * 0.4,
                    color: Color.themeLightGray,
                  }}>
                  {finalData?.location?.name}
                </CustomText>
              </View>
            </View>
            {fromStore && (
              <>
                <CustomText
                  isBold
                  style={[styles.subHeading, { width: windowWidth * 0.9 }]}>
                  Courier
                </CustomText>
                <View style={[styles.container1, { height: windowHeight * 0.06 }]}>
                  <CustomText
                    isBold
                    style={[
                      styles.subHeading,
                      { color: Color.black, marginTop: moderateScale(0, 0.3) },
                    ]}>
                    Regular
                  </CustomText>
                  <CustomText
                    style={[
                      styles.subHeading,
                      {
                        color: Color.themeLightGray,
                        marginTop: moderateScale(0, 0.3),
                      },
                    ]}>
                    3-6 days
                  </CustomText>
                  <CustomText
                    style={[
                      styles.subHeading,
                      { color: Color.black, marginTop: moderateScale(0, 0.3) },
                    ]}>
                    $2.05
                  </CustomText>
                </View>
              </>
            )}
            <CustomText
              isBold
              style={[styles.subHeading, { width: windowWidth * 0.9 }]}>
              payment method
            </CustomText>
            <View
              style={[
                styles.container1,
                { height: windowHeight * 0.1, justifyContent: 'flex-start' },
              ]}>
              <View
                style={{
                  width: 50,
                  height: 30,
                  backgroundColor: '#000',
                  marginLeft: moderateScale(20, 0.3),
                }}></View>
              <View
                style={{
                  marginLeft: moderateScale(20, 0.3),
                }}>
                <CustomText
                  style={[
                    styles.subHeading,
                    { color: Color.black, marginTop: moderateScale(0, 0.3) },
                  ]}>
                  Wallet
                </CustomText>

                <CustomText
                  style={[
                    styles.subHeading,
                    {
                      color: Color.themeLightGray,
                      marginTop: moderateScale(0, 0.3),
                    },
                  ]}>
                  My wallet
                </CustomText>
              </View>
              <View style={styles.addCardContainer}>
                <Icon
                  name="keyboard-arrow-down"
                  as={MaterialIcons}
                  size={moderateScale(20, 0.3)}
                  color={Color.black}
                />
              </View>
            </View>
            <View style={styles.userTypeContainer}>
              <View style={styles.innerContainer}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedPaymentMethod('wallet');
                  }}
                  activeOpacity={0.9}
                  style={[
                    styles.circle,
                    selectedPaymentMethod == 'wallet' && {
                      backgroundColor: Color.themeColor1,
                      borderColor: Color.themeColor1,
                    },
                  ]}></TouchableOpacity>
                <CustomText
                  isBold
                  style={styles.txt2}
                  onPress={() => {
                    // if (finalData?.total > userWallet?.amount) {
                    //   Platform.OS == 'android'
                    //     ? ToastAndroid.show(
                    //         'insufficient amount',
                    //         ToastAndroid.SHORT,
                    //       )
                    //     : alert('insufficient amount');
                    //   // navigation.navigate('Purchase')
                    // } else {
                    setSelectedPaymentMethod('wallet');
                    // }
                  }}>
                  from wallet
                </CustomText>
              </View>
              <View style={[styles.innerContainer, {
                    marginLeft:moderateScale(10,0.2),
              }]}>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedPaymentMethod('stripe');
                  }}
                  activeOpacity={0.9}
                  style={[
                    styles.circle,
                    selectedPaymentMethod == 'stripe' && {
                      backgroundColor: Color.themeColor1,
                      borderColor: Color.themeColor1,
                    },
                  ]}></TouchableOpacity>
                <CustomText
                  isBold
                  onPress={() => {
                    setSelectedPaymentMethod('stripe');
                    setIsVisible(true);
                  }}
                  style={styles.txt2}>
                  {/* pay through stripe */}
                 {" Debit or Credit Card"}
                </CustomText>
              </View>
            </View>
            {selectedPaymentMethod == 'stripe' && isVisible &&
              <View style={styles.modal}>
                <View style={styles.header}>
                  <CustomText
                    isBold
                    style={{
                      color: Color.white,
                      fontSize: moderateScale(17, 0.6),
                    }}>
                    Add Card Details
                  </CustomText>
                </View>


                <CardField
                  postalCodeEnabled={false}
                  placeholderColor={Color.darkGray}
                  placeholders={{
                    number: '4242 4242 4242 4242',
                  }}
                  // placeholdersColor={'black'}
                  cardStyle={{
                    backgroundColor: Color.white,
                    borderRadius: moderateScale(15, 0.6),
                    width: windowWidth * 0.4,
                    borderRadius: moderateScale(35, 0.6),
                    // placeholderColor:'red',
                    textColor: 'black',
                    placeholderColor: Color.darkGray,
                  }}
                  style={{
                    width: '85%',
                    height: windowHeight * 0.07,
                    marginVertical: moderateScale(10, 0.3),
                  }}
                  onCardChange={cardDetails => {
                        console.log("===========> ", cardDetails)
                  }}
                  onFocus={focusedField => {

                  }}
on
                />
                <CustomButton
                  textColor={Color.black}
                  text={'add'}
                  loader={loading}
                  loaderColor={'black'}
                  onPress={() => {
                    strpieToken();
                  }}
                  width={windowWidth * 0.35}
                  height={windowHeight * 0.05}
                  borderRadius={moderateScale(25, 0.6)}
                  fontSize={moderateScale(16, 0.3)}
                  textTransform={'uppercase'}
                  isGradient={true}
                  isBold
                  disabled={isLoading}
                />
              </View>}


            <CustomButton
              textColor={Color.black}
              onPress={() => {
                if (finalData?.total > userWallet?.amount && selectedPaymentMethod == 'wallet') {
                  Platform.OS == 'android'
                    ? ToastAndroid.show('insufficient amount', ToastAndroid.SHORT)
                    : alert('insufficient amount');
                } else {
                  if (Array.isArray(finalData?.services?.members) && finalData.services.members.length > 0) {
                    // console.log('Members found:', finalData.services.members);
                    GroupBooking();
                  } else {
                    Booking();
                  }
                }
              }}
              width={windowWidth * 0.9}
              height={windowHeight * 0.06}
              text={'Pay now'}
              loader={isLoading}
              loaderColor={Color.black}
              fontSize={moderateScale(16, 0.3)}
              borderRadius={moderateScale(30, 0.4)}
              textTransform={'uppercase'}
              isGradient={true}
              isBold
              marginTop={moderateScale(30, 0.3)}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </LinearGradient>

      <BookingDateModal
        modalIsVisible={modalIsVisible}
        setModalIsVisible={setModalIsVisible}
        bookingDate={finalData?.date}
        bookingStartTime={finalData?.time?.time}
      />
    </ScreenBoiler>
  );
};

export default PaymentScreen;

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
    fontSize: moderateScale(22, 0.3),
  },
  container1: {
    backgroundColor: Color.white,
    borderRadius: moderateScale(18, 0.6),
    width: windowWidth * 0.9,
    marginTop: moderateScale(10, 0.3),
    paddingHorizontal: moderateScale(10, 0.3),
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subHeading: {
    color: Color.white,
    fontSize: moderateScale(14, 0.3),
    marginTop: moderateScale(20, 0.3),
  },
  addCardContainer: {
    width: moderateScale(26, 0.3),
    height: moderateScale(26, 0.3),
    borderRadius: moderateScale(13, 0.3),
    backgroundColor: 'rgba(235, 219, 189, 1)',
    position: 'absolute',
    right: moderateScale(10, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
  },
  userTypeContainer: {
    width: windowWidth * 0.7,
    padding: moderateScale(10, 0.3),
    marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  txt2: {
    fontSize: moderateScale(14, 0.3),
    color: Color.themeColor,
  },
  circle: {
    height: moderateScale(13, 0.3),
    width: moderateScale(13, 0.3),
    borderRadius: moderateScale(6.5, 0.3),
    borderWidth: 1,
    backgroundColor: Color.white,
    borderColor: Color.themeColor,
    marginRight: moderateScale(5, 0.3),
  },
  header: {
    width: '100%',
    height: windowHeight * 0.07,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(10, 0.6),
  },
  modal: {
    backgroundColor: Color.black,
    backgroundColor: 'rgba(109, 106, 108, 0.72)',
    // backgroundColor: 'rgba(76, 73, 75, 0.79)',
    // backgroundColor: 'rgba(36, 35, 36, 0.53)',
    backgroundColor: 'rgba(58, 56, 56, 0.63)',

    borderRadius: moderateScale(14, 0.4),
    borderWidth: 2,
    borderColor: Color.themeColor,
    width: windowWidth * 0.9,
    // height: windowHeight * 0.3,
    paddingBottom: moderateScale(20, 0.6),
    flexDirection: 'column',
    alignItems: 'center',
    // paddingTop: windowHeight * 0.03,
    gap: 12,
    overflow: 'hidden',
  },
});
