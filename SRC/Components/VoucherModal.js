import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/core';
import { setVoucherData } from '../Store/slices/common';

const VoucherModal = ({item, modal, setModal}) => {
    const navigation =useNavigation()
    const dispatch =useDispatch()
  const Voucher = useSelector(state => state.commonReducer.selectedVoucher);

  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={modal}
      onBackdropPress={() => {
        setModal(false);
      }}>
      <View
        style={{
          backgroundColor: Color.white,
          width: windowWidth * 0.8,
          alignItems: 'center',
          borderRadius: moderateScale(20, 0.3),
          paddingVertical: moderateScale(15, 0.3),
        }}>
        <View
          style={{
            height: windowHeight * 0.15,
            width: windowWidth * 0.3,
          }}>
          <Image
            style={{
              height: '100%',
              width: '100%',
            }}
            source={require('../Assets/Images/coupon.png')}
          />
        </View>

        <CustomText
          style={{
            color: Color.black,
            fontSize: moderateScale(22, 0.6),
          }}
          isBold>
          Voucher Selected!
        </CustomText>

        <CustomText
          style={{
            color: Color.black,
            fontSize: moderateScale(13, 0.6),
            paddingBottom: moderateScale(5, 0.3),
          }}
          isBold>
          you got Discount {item?.value}{item?.type=='fixed' ? '$' : '%'}
        </CustomText>
        <View
          style={{
            width: windowWidth * 0.7,
            alignItems: 'center',
          }}>
          <CustomButton
            textColor={Color.black}
            width={windowWidth * 0.2}
            height={windowHeight * 0.04}
            borderRadius={moderateScale(30, 0.4)}
            text={'ok'}
            fontSize={moderateScale(12, 0.3)}
               onPress={() => {
                dispatch(setVoucherData(item));
                setModal(false) 
                  navigation.goBack()}}
            isGradient={true}
            isBold
            marginTop={moderateScale(5, 0.3)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default VoucherModal;

const styles = StyleSheet.create({});
