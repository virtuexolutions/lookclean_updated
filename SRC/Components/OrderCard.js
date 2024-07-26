import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import numeral from 'numeral';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';
import {useSelector} from 'react-redux';

const OrderCard = ({item}) => {
  const user = useSelector(state => state.commonReducer.userData);

  const amount = () => {
    let totalAmount = 0;
    item?.booking_detail?.map(data => {
      totalAmount += data?.service_info?.price;
    });

    return totalAmount;
  };

  const calculateTotalAmount = () => {
    const bookingDetail = item?.booking_detail;
    // const amount = item?.booking_detail.reduce((a,b)=> a+b)

    if (!Array.isArray(bookingDetail) || bookingDetail.length === 0) {
      return 0;
    }

    const serviceNames = bookingDetail
      .map(service => service?.service_info?.name)
      .filter(Boolean);

    return serviceNames.join(', ');
  };
  const servicesText = calculateTotalAmount();

  return (
    <View style={[styles.card]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
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
            {' '}
            {item?.review == null ? item?.status : 'Reviewed'}
          </CustomText>
        </View>
        <CustomImage
          source={{
            uri: item?.member_info?.photo,
          }}
          style={styles.image}
        />
        <CustomText isBold numberOfLines={1} style={styles.name}>
          {`${item?.member_info?.first_name} ${item?.member_info?.last_name}`}
        </CustomText>
      </View>
      <View style={styles.eachRow}>
        <CustomText
          isBold
          style={{
            width: windowWidth * 0.16,
            fontSize: moderateScale(12, 0.3),
          }}>
          Date :{' '}
        </CustomText>
        <CustomText style={styles.heading}>{item?.booking_date}</CustomText>
      </View>
      <View style={styles.eachRow}>
        <CustomText
          isBold
          style={{
            width: windowWidth * 0.16,
            fontSize: moderateScale(12, 0.3),
          }}>
          time :{' '}
        </CustomText>
        <CustomText style={styles.heading}>{item?.booking_time}</CustomText>
      </View>
      <View style={styles.eachRow}>
        <CustomText
          isBold
          style={{
            width: windowWidth * 0.16,
            fontSize: moderateScale(12, 0.3),
          }}>
          Amount :{' '}
        </CustomText>
        <CustomText style={styles.heading}>
          {/* {numeral(calculateTotalAmount()).format('$0,0.0')} */}
          {numeral(item?.total_price).format('$0,0.00')}
        </CustomText>
      </View>
      <View style={styles.eachRow}>
        <CustomText
          isBold
          style={{
            width: windowWidth * 0.16,
            fontSize: moderateScale(12, 0.3),
          }}>
          Services :{' '}
        </CustomText>
        <CustomText numberOfLines={1} style={styles.heading}>
          {servicesText}
        </CustomText>
      </View>
      {
        <CustomButton
          bgColor={Color.themeColor}
          borderColor={'white'}
          borderWidth={1}
          textColor={Color.black}
          onPress={() => {
            navigationService.navigate('OrderDetails', {item: item});
          }}
          borderRadius={moderateScale(30, 0.4)}
          width={windowWidth * 0.15}
          height={windowHeight * 0.02}
          text={'Details'}
          fontSize={moderateScale(8, 0.3)}
          textTransform={'uppercase'}
          isGradient={true}
          isBold
          alignSelf={'flex-end'}
          marginTop={moderateScale(10, 0.3)}
        />
      }
    </View>
  );
};

export default OrderCard;

const styles = ScaledSheet.create({
  card: {
    width: windowWidth * 0.45,
    height: windowHeight * 0.22,
    borderWidth: 2,
    borderRadius: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    borderColor: Color.themeColor,
    marginRight: moderateScale(10, 0.3),
    padding: moderateScale(5, 0.3),
    marginBottom: moderateScale(15, 0.3),
  },
  statusView: {
    position: 'absolute',
    right: 2,
    top: 2,
    paddingHorizontal: moderateScale(8, 0.6),
    paddingVertical: moderateScale(3, 0.6),
    borderRadius: moderateScale(10, 0.6),
  },
  status: {
    textAlign: 'center',
    fontSize: moderateScale(10, 0.6),
    color : Color.white
  },
  image: {
    width: moderateScale(40, 0.3),
    height: moderateScale(40, 0.3),
    borderRadius: moderateScale(20, 0.3),
    overflow: 'hidden',
  },
  name: {
    fontSize: moderateScale(14, 0.3),
    marginLeft: moderateScale(3, 0.3),
    width: '28%',
    // backgroundColor : 'red',
  },
  eachRow: {
    flexDirection: 'row',
    width: '99%',
    // backgroundColor : 'red',
    // marginTop : moderateScale(5,0.3),
    alignItems: 'center',
  },
  heading: {
    fontSize: moderateScale(11, 0.3),
    marginLeft: moderateScale(5, 0.3),
    fontStyle: 'italic',
    width: windowWidth * 0.24,
  },
});
