import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Platform,
  ScrollView,
  ToastAndroid,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Get } from '../Axios/AxiosInterceptorFunction';
import { Card } from '../Components/Card';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import VoucherModal from '../Components/VoucherModal';
import { windowHeight, windowWidth } from '../Utillity/utils';

const Vouchers = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const total = props?.route?.params?.total;

  const token = useSelector(state => state.authReducer.token);

  const [isLoading, setIsLoading] = useState(false);
  const [voucherData, setVoucherData] = useState([]);

  const getVouchers = async () => {
    const url = 'auth/coupon';
    setIsLoading(true);
    const response = await Get(url, token);
    console.log(response?.data, '===================>')
    setIsLoading(false);

    if (response != undefined) {

      setVoucherData(response?.data?.data);
    }
  };

  const [isModal, setIsModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

  // const voucherCardData = [
  //   {
  //     id: 1,
  //     name: '50 OFF',
  //     code: 'LK50',
  //     maxDiscount: 50,
  //     Description: '50Rs off',
  //     minOrder: 499,
  //   },
  //   {
  //     id: 2,
  //     name: '100 OFF',
  //     code: 'LK100',
  //     maxDiscount: 100,
  //     Description: '100Rs off',
  //     minOrder: 999,
  //   },
  //   {
  //     id: 3,
  //     name: '150 OFF',
  //     code: 'LK150',
  //     maxDiscount: 150,
  //     Description: '150Rs off',
  //     minOrder: 1499,
  //   },
  //   {
  //     id: 4,
  //     name: '200 OFF',
  //     code: 'LK200',
  //     maxDiscount: 200,
  //     Description: '200Rs off',
  //     minOrder: 2000,
  //   },
  // ];

  useEffect(() => {
    getVouchers();
  }, []);

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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
          }}>
          <CustomText isBold style={styles.text1}>
            Select voucher
          </CustomText>
          {isLoading ? (
            <View
              style={{ justifyContent: 'center', height: windowHeight * 0.5 }}>
              <ActivityIndicator color={Color.themeColor} size={'large'} />
            </View>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                width: windowWidth,
                alignItems: 'center',
              }}
              style={{ paddingBottom: moderateScale(50, 0.6) }}
              data={voucherData}
              renderItem={({ item, index }) => {
                return (
                  <Card
                    item={item}
                    onPress={() => {
                      if (item?.min_price >= total) {
                        return Platform.OS == 'android'
                          ? ToastAndroid.show(
                            'You cannot use this voucher',
                            ToastAndroid.SHORT,
                          )
                          : Alert.alert('You acnnot use this voucher');
                      }
                      setSelectedItem(item);
                      setIsModal(true);
                    }}
                  />
                );
              }}
            />
          )}
        </ScrollView>
        <VoucherModal
          modal={isModal}
          setModal={setIsModal}
          item={selectedItem}
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default Vouchers;

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.06,
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
  },
  text1: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(20, 0.3),
  },
  txt2: {
    fontSize: moderateScale(12, 0.3),
    color: Color.themeColor,
  },
});
