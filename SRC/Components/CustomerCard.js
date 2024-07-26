import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
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
import { useNavigation } from '@react-navigation/native';

const CustomerCard = ({item}) => {
    const navigation =useNavigation()
  //   const amount = () => {
  //     let totalAmount = 0;
  //     item?.booking_detail.map(data => {
  //       totalAmount += data?.service_info?.price;
  //     });
  //     // console.log('Total======>>>>>>>>>', totalAmount);
  //     return totalAmount;
  //   };

  //   const calculateTotalAmount = () => {
  //     const bookingDetail = item?.booking_detail;
  //     // const amount = item?.booking_detail.reduce((a,b)=> a+b)

  //     if (!Array.isArray(bookingDetail) || bookingDetail.length === 0) {
  //       return 0;
  //     }

  //     const serviceNames = bookingDetail
  //       .map(service => service?.service_info?.name)
  //       .filter(Boolean);

  //     return serviceNames.join(', ');
  //   };
  //   const servicesText = calculateTotalAmount();

  return (
    <TouchableOpacity
    onPress={() => navigation.navigate('CustomerBookingDetail')}
    style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: moderateScale(2, 0.3),
        }}>
        <View
          style={{
            height: windowHeight * 0.13,
            width: windowWidth * 0.25,
            // backgroundColor:'red',
            overflow: 'hidden',
          }}>
          <CustomImage
            source={{
              uri: item?.barber_info?.photo
                ? item?.barber_info?.photo
                : item?.member_info?.photo,
            }}
            style={[
              styles.image,
              {
                height: '100%',
                width: '100%',
              },
            ]}
          />
        </View>
        <View style={{
            paddingHorizontal:moderateScale(10,0.3),
            // backgroundColor:'red',
            width:windowWidth*0.58
        }}>

        <CustomText isBold numberOfLines={2} style={styles.name}>
          {item?.barber_info?.first_name
            ? item?.barber_info?.first_name
            : item?.member_info?.first_name}
        </CustomText>
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
          {/* {numeral(calculateTotalAmount()).format('$0,0.0')}
          {amount()}  */}
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
          {/* {servicesText}  */}
        </CustomText>
      </View>
        </View>
      </View>
      {/* <CustomButton
        bgColor={Color.themeColor}
        borderColor={'white'}
        borderWidth={1}
        textColor={Color.black}
        onPress={() => {
          navigationService.navigate('OrderDetails', {item: item});
        }}
        width={windowWidth * 0.15}
        height={windowHeight * 0.02}
        text={'Details'}
        fontSize={moderateScale(8, 0.3)}
        textTransform={'uppercase'}
        isGradient={true}
        isBold
        alignSelf={'flex-end'}
        marginTop={moderateScale(10, 0.3)}
      /> */}
    </TouchableOpacity>
  );
};

export default CustomerCard;

const styles = ScaledSheet.create({
  card: {
    // width: windowWidth * 0.85,
    // height: windowHeight * 0.15,
    borderWidth: 2,
    borderRadius: moderateScale(10, 0.3),
    backgroundColor: Color.white,
    borderColor: Color.themeColor,
    marginRight: moderateScale(10, 0.3),
    padding: moderateScale(5, 0.3),
    marginBottom: moderateScale(15, 0.3),
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
    width: '70%',
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
