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
import { useSelector } from 'react-redux';
import moment from 'moment';
import navigationService from '../navigationService';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import PaymentModal from './PaymentModal';






const ReviewModal = ({ item, setRef, rbRef, setClientReview }) => {
  const token = useSelector(state => state.authReducer.token);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [tipSelected, setTipSelected] = useState(false);
  console.log(tipSelected, 'tipSelectedtipSelectedtipSelected');

  const [stripeToken, setStripeToken] = useState('');
  const [tip, setTip] = useState(0);

  const sendReview = async () => {
    const body = {
      rating: rating,
      description: review,
      booking_id: item?.id,
      status: 'complete',
      tip: tip,
      stripetoken: stripeToken,

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
    console.log('first==================== >>>>>>> body', JSON.stringify(body, null, 2))
    const url = 'auth/review';
    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setLoading(false);
    if (response != undefined) {

      rbRef.close();
      navigationService.navigate('TabNavigation')
      setClientReview({

        rating: rating,
        description: review,
        created_at: moment().format(),

      });
    }
  };




  return (
    <RBSheet
      ref={ref => setRef(ref)}
      closeOnDragDown={true}
      height={450}
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
          <TouchableOpacity disabled={tip} onPress={() => setTipSelected(true)}

            style={styles.btn}>
            {tipSelected || tip && <Icon name="check" as={Entypo} size={21} color={Color.themeColor1} />
            }</TouchableOpacity>

          <CustomText
            style={styles.tipText}>
            would you like to tip your barber?  </CustomText>
        </View>



        <CustomButton
          text={'send review'}
          loader={loading}
          loaderColor={'white'} ƒ
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
      </View>
      <PaymentModal setIsVisible={setTipSelected} isVisible={tipSelected} setTip={setTip} stripeToken={stripeToken} setStripeToken={setStripeToken} />
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
  }
});
