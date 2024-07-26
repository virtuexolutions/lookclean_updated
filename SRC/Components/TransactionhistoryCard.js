import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowWidth} from '../Utillity/utils';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {Icon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {color} from 'react-native-reanimated';

const TransactionhistoryCard = ({item}) => {
  const userData = useSelector(state => state.commonReducer.userData);

  const [text, setText] = useState('credit');
  return (
    <View style={styles.maincontainer}>
      <View
        style={{
          paddingVertical: moderateScale(5, 0.6),
          flexDirection: 'row',
        }}>
        {item.type == 'debit' ? (
          <Icon
            name="arrowup"
            as={AntDesign}
            size={19}
            color={Color.themePink}
          />
        ) : (
          <Icon name="arrowdown" as={AntDesign} size={15} color={Color.green} />
        )}
        <CustomText
          onPress={() => {
            setText('credit');
          }}
          isBold
          style={[
            styles.heading,
            {
              width: windowWidth * 0.12,
              textAlign: 'center',
              fontSize: moderateScale(14, 0.6),
              color: Color.themeColor,
            },
          ]}>
          {item.type == 'debit' ? 'Debit' : 'Credit'}
        </CustomText>
      </View>
      <View
        style={{
          paddingTop: moderateScale(10, 0.6),
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <CustomText isBold style={styles.heading}>
          amount
        </CustomText>

        <CustomText
          isBold
          style={{
            fontSize: moderateScale(12, 0.6),
            color: Color.white,
          }}>
          ${item?.amount}
        </CustomText>
      </View>
      <View style={styles.row}>
        <CustomText isBold style={styles.heading}>
          created at
        </CustomText>
        <CustomText isBold style={styles.amounttext}>
          {moment(item?.created_at).format('MMM Do YY')}
        </CustomText>
      </View>
      <View style={styles.row}>
        <CustomText isBold style={styles.heading}>
          type
        </CustomText>
        <CustomText isBold style={styles.amounttext}>
          {item?.type}
        </CustomText>
      </View>
      <View style={styles.row}>
        <CustomText isBold style={styles.heading}>
          reason
        </CustomText>
        <CustomText isBold style={styles.amounttext}>
          {item?.reason}
        </CustomText>
      </View>
    </View>
  );
};

export default TransactionhistoryCard;

const styles = StyleSheet.create({
  heading: {
    fontSize: moderateScale(12, 0.6),
    color: Color.white,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  amounttext: {
    fontSize: moderateScale(12, 0.6),
    color: Color.white,
  },
  maincontainer: {
    borderRadius: moderateScale(15, 0.6),
    borderWidth: moderateScale(2, 0.6),
    borderColor: Color.themeColor,
    padding: moderateScale(10, 0.6),
    width: windowWidth * 0.95,
    paddingHorizontal: moderateScale(15, 0.6),
    marginHorizontal: moderateScale(10, 0.3),
    marginVertical: moderateScale(10, 0.3),
  },
});
