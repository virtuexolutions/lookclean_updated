import React, {useState} from 'react';
import {View, Image, ScrollView} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import Constants from '../Assets/Utilities/Constants';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import moment from 'moment';
import {Rating} from 'react-native-ratings';


const ReviewCard = ({item ,review , fromDetail}) => {

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image 
        source={{uri :item?.member_info?.photo}} 
        style={styles.image} />

        <View style={{marginLeft: moderateScale(10, 0.3)}}>
          <CustomText numberOfLines={2} style={styles.name}>
            {`${item?.member_info?.first_name} ${item?.member_info?.last_name}`}
          </CustomText>
          <Rating
            type="custom"
            readonly
            // startingValue={1}
            startingValue={fromDetail ? item?.rating : review?.rating}
            ratingCount={5}
            imageSize={moderateScale(12, 0.3)}
            style={{
              width: windowWidth * 0.24,
            }}
            ratingBackgroundColor={'transparent'}
          />

          <CustomText numberOfLines={4} style={styles.description}>
            {fromDetail ? item?.description: review?.description}
          </CustomText>
        </View>
      </View>

      <CustomText numberOfLines={1} style={styles.moment}>
        {moment(review?.created_at).format('ll')}
      </CustomText>
    </View>
  );
};
const styles = ScaledSheet.create({
  container: {
    width: windowWidth * 0.82,
    borderBottomWidth: 1,
    height: windowHeight * 0.13,
    borderColor: Color.lightGrey,
    borderRadius: moderateScale(10, 0.3),
    paddingTop: moderateScale(15, 0.3),
  },
  image: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,

    borderRadius: moderateScale((windowWidth * 0.1) / 2, 0.3),
  },
  description: {
    width: windowWidth * 0.6,
    color: Color.themeBlack,
  },
  moment: {
    fontSize: moderateScale(11, 0.6),
    width: '100%',
    textAlign: 'right',
  },
  name: {
    // padding:moderateScale(3,.6),
    width: windowWidth * 0.5,
    color: Color.black,
    fontWeight: 'bold',
    fontSize: moderateScale(13, 0.6),
  },
});

export default ReviewCard;
