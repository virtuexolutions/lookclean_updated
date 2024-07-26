import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useRef, useState} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import CustomText from './CustomText';
import {AirbnbRating} from 'react-native-ratings';
import {moderateScale} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomButton from './CustomButton';
import TextInputWithTitle from './TextInputWithTitle';
import {Platform} from 'react-native';
import {ToastAndroid} from 'react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import moment from 'moment';

const ReviewModal = ({item, setRef, rbRef, setClientReview}) => {
  const token = useSelector(state => state.authReducer.token);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);

  const sendReview = async () => {
    const body = {
      rating: rating,
      description: review,
      booking_id: item?.id,
    };
    if (rating == 0) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Please give a review', ToastAndroid.SHORT)
        : alert('Please give a review');
    }
    if (review == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Please give some feedback', ToastAndroid.SHORT)
        : alert('Please give some feedback');
    }
    const url = 'auth/review';
    setLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setLoading(false);
    if (response != undefined) {
      rbRef.close();
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
          // backgroundColor:'red'
          alignItems: 'center',
        }}>
        {/* <CustomText style={styles.heading} >Reviews</CustomText> */}
        <CustomText
          style={{
            width: windowWidth * 0.6,
            fontSize: 22,
            textAlign: 'center',
            color: Color.themeColor1,
            // color:Color.black
            // paddingVertical:moderateScale(10,0.3)
          }}>
          Please share your experience
        </CustomText>
        <AirbnbRating
          reviewColor={Color.themeColor1}
          reviewSize={25}
          size={25}
          count={5}
          reviews={['OK', 'Good', 'Very Good', 'Wow', 'Amazing']}
          defaultRating={0}
          onFinishRating={rating => {
            setRating(rating);
          }}
        />
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

        <CustomButton
          text={
            loading ? (
              <ActivityIndicator size={'small'} color={'white'} />
            ) : (
              'send review'
            )
          }
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
    // marginHorizontal:moderateScale(20 ,0.3),
    width: windowWidth * 0.8,
    paddingHorizontal: moderateScale(10, 0.3),
    backgroundColor: Color.lightGray,
    borderRadius: 10,
    // padding:moderateScale(20,0.3)
    height: windowHeight * 0.2,
    marginVertical: moderateScale(20, 0.3),
  },
});
