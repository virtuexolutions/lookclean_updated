import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  Alert,
  TouchableOpacity
} from 'react-native';
import React, { useRef, useState } from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from './CustomText';
import { AirbnbRating } from 'react-native-ratings';
import { moderateScale, scale } from 'react-native-size-matters';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomButton from './CustomButton';
import TextInputWithTitle from './TextInputWithTitle';
import { Platform } from 'react-native';
import { ToastAndroid } from 'react-native';
import { Post } from '../Axios/AxiosInterceptorFunction';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import navigationService from '../navigationService';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import PaymentModal from './PaymentModal';
import { setUserWallet } from '../Store/slices/common';






const ReviewModal = ({ item, setRef, rbRef, setClientReview }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.authReducer.token);
  const userWallet = useSelector(state => state.commonReducer.userWallet);

  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [tipSelected, setTipSelected] = useState(false);
  // console.log(tipSelected, 'tipSelectedtipSelectedtipSelected');
  console.log(userWallet, 'userWalletuserWalletuserWallet');
  const [isEnteringTipAmount, setIsEnteringTipAmount] = useState(false);
  console.log("isEnteringTipAmount", isEnteringTipAmount)

  const [stripeToken, setStripeToken] = useState('');
  const [tip, setTip] = useState(0);
  console.log(tip > userWallet?.amount, tip, userWallet?.amount)

  const sendReview = async () => {
    const body = {
      rating: rating,
      description: review,
      booking_id: item?.id,
      status: 'complete',
      tip: tip,
      // stripetoken: stripeToken,
    };
    if (rating == 0) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Be Generous , give some rating too', ToastAndroid.SHORT)
        : Alert.alert('Be Generous , give some rating too');
    }
    if (review == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Please give some feedback', ToastAndroid.SHORT)
        : Alert.alert('Please give some feedback');
    }
    console.log('first==================== >>>>>>> bpappody', JSON.stringify(body, null, 2))
    const url = 'auth/review';
    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setLoading(false);

    if (response != undefined) {
      Platform.OS == 'android' ? ToastAndroid.show('Review submitted successfully', ToastAndroid.SHORT) : Alert.alert('Review submitted successfully')
      console.log("=====>", response?.data)
      dispatch(setUserWallet(response?.data?.user_info?.wallet))
      setClientReview({

        rating: rating,
        description: review,
        created_at: moment().format(),

      });
      rbRef.close();
      navigationService.navigate('TabNavigation')

    }
  };





  return (
    <RBSheet
      ref={ref => setRef(ref)}
      closeOnDragDown={true}
      height={550}
      dragFromTopOnly={true}
      openDuration={250}
      customStyles={{
        container: {
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        },
      }}>
      <View
        style={{
          alignItems: 'center',
          // backgroundColor: 'red',
          // height: tipSelected ? windowHeight * 0.9 : windowHeight * 0.4,
        }}>
        {/* <CustomText style={styles.heading} >Reviews</CustomText> */}
        <CustomText
          style={{
            width: windowWidth * 0.6,
            fontSize: 22,
            textAlign: 'center',
            color: Color.themeColor1,
          }}>
          Please share your experience
        </CustomText>
        {/* <View style={{backgroundColor:Color.red, 
          width:scale(60),
          height:scale(60)}}> */}


        <AirbnbRating
          reviewColor={Color.themeColor1}
          reviewSize={25}
          size={25}
          count={5}
          selectedColor={Color.black}
          reviews={['OK', 'Good', 'Very Good', 'Wow', 'Amazing']}
          defaultRating={0}
          onFinishRating={rating => {
            setRating(rating);
          }}

        />
        {/* </View> */}
        <View
          style={{
            marginTop: 10,
          }}
        />

        <TextInputWithTitle
          multiline={true}
          secureText={false}
          placeholder={'Your review'}
          setText={setReview}
          value={review}
          viewHeight={0.15}
          viewWidth={0.75}
          inputWidth={0.66}
          border={1}
          borderColor={Color.themeColor1}
          backgroundColor={'#FFFFFF'}
          // marginTop={moderateScale(50, 0.6)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(25, 0.3)}
        />
        <View style={styles.tipContainer}>
          <TouchableOpacity
            onPress={() => {
              if (userWallet == 0) {
                return Platform.OS == 'android'
                  ? ToastAndroid.show('You must have coin balance to add tip', ToastAndroid.SHORT)
                  : Alert.alert('You must have coin balance to add tip');
              }
              if (tipSelected) {
                setTipSelected(false);
                setIsEnteringTipAmount(false);
                setTip(0);
              } else {
                setTipSelected(true);
                setIsEnteringTipAmount(true);
              }
            }}
            style={styles.btn}
          >
            {tipSelected && (
              <Icon
                name="check"
                as={Entypo}
                size={21}
                color={Color.themeColor1}
              />
            )}
          </TouchableOpacity>

          <CustomText style={styles.tipText}>
            would you like to tip your barber?
          </CustomText>
        </View>

        {tipSelected && tip > 0 && (
          <CustomText
            style={{
              color: Color.themeColor1,
              fontSize: moderateScale(14, 0.6),
              marginTop: moderateScale(10, 0.6),
            }}
          >
            Tip Added : ${tip}
          </CustomText>
        )}

        {tipSelected && isEnteringTipAmount && (
          <>
            <CustomText
              children={'Enter Tip amount'}
              style={{
                width: windowWidth * 0.65,
                color: Color.themeColor1,
                textAlign: 'left',
                fontSize: moderateScale(14, 0.6),
                marginTop: moderateScale(10, 0.6),
              }}
            />
            <View
              style={styles.tipInputContainer}
            >

              <TextInputWithTitle

                placeholder={'Tip amount'}
                setText={(val) => setTip(Number(val) || 0)}
                value={tip.toString()}
                viewHeight={0.06}
                viewWidth={0.45}
                inputWidth={0.4}
                keyboardType={'numeric'}
                border={1}
                borderColor={Color.themeColor1}
                backgroundColor={'#FFFFFF'}
                color={Color.themeColor}
                placeholderColor={Color.themeLightGray}
                borderRadius={moderateScale(25, 0.3)}
              />

              <CustomButton
                iconName="check"
                iconType={Entypo}
                width={windowWidth * 0.18}
                height={windowHeight * 0.06}
                onPress={() => {
                  if (Number(tip) > userWallet?.amount) {
                    return Platform.OS == 'android'
                      ? ToastAndroid.show('You must have coin balance to add tip', ToastAndroid.SHORT)
                      : Alert.alert('You must have coin balance to add tip');
                  }
                  else if (tip > 0) {
                    setIsEnteringTipAmount(false);
                  } else {
                    Platform.OS == 'android'
                      ? ToastAndroid.show('Please enter a tip amount', ToastAndroid.SHORT)
                      : Alert.alert('Please enter a tip amount');
                  }
                }}
                bgColor={Color.themeColor1}
                borderRadius={moderateScale(30, 0.3)}
                fontSize={moderateScale(15, 0.3)}
                isGradient={true}
                borderColor={'white'}
                borderWidth={1}
              />
            </View>
            <CustomText
              children={`Avaible coin Balance :$${userWallet?.amount - tip}`}
              style={{
                width: windowWidth * 0.65,
                color: Color.themeColor1,
                textAlign: 'left',
                fontSize: moderateScale(14, 0.6),
                marginTop: moderateScale(10, 0.6),
              }}
            />
          </>

        )}

        {isEnteringTipAmount == false &&


          <CustomButton
            text={'send review'}
            loader={loading}
            loaderColor={'white'}
            textColor={Color.black}
            width={windowWidth * 0.38}
            height={windowHeight * 0.06}
            marginTop={moderateScale(15, 0.3)}
            onPress={() => {
              sendReview();
            }}
            bgColor={Color.themeColor1}
            borderRadius={moderateScale(30, 0.3)}
            fontSize={moderateScale(15, 0.3)}
            //   bgColor={Color.themeColor}
            isGradient={true}
            borderColor={'white'}
            borderWidth={1}
          />
        }
      </View>
      {/* <PaymentModal setIsVisible={setTipSelected} isVisible={tipSelected} setTip={setTip} stripeToken={stripeToken} setStripeToken={setStripeToken} /> */}
    </RBSheet>
  );
};

export default ReviewModal;

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 22,
    color: Color.themeColor1,
    padding: moderateScale(10, 0.3),
  },
  input: {
    width: windowWidth * 0.8,
    paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.lightGray,
    borderRadius: 10,
    height: windowHeight * 0.2,
    marginVertical: moderateScale(20, 0.3),
  },
  tipText: {
    marginTop: moderateScale(10, .6),
    fontSize: moderateScale(14, .6),
    color: Color.themeColor1,
    textAlign: 'center',
  }, tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: moderateScale(10, .6),
  }, btn: {
    width: windowWidth * 0.06,
    marginTop: moderateScale(8, .6),
    height: windowHeight * 0.03,
    borderRadius: moderateScale(5, 0.3),
    borderWidth: 1,
    marginRight: moderateScale(5, .6),
    justifyContent: 'center',
    alignItems: 'center',
  }, header: {
    width: '100%',
    height: windowHeight * 0.07,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(10, 0.6),
  },
  tipInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
    // justifyContent: 'space-between',
    marginTop: moderateScale(15, 0.6),
  }
});
