import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomButton from '../Components/CustomButton';
import CustomTextWithMask from '../Components/CustomTextWithMask';
import {Icon} from 'native-base';
import numeral from 'numeral';
import navigationService from '../navigationService';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {useDispatch, useSelector} from 'react-redux';
import {setVoucherData, setWholeCart} from '../Store/slices/common';

const CheckoutScreen = props => {
  const dispatch = useDispatch();

  const cartData = useSelector(state => state.commonReducer.cartData);
  const voucher = useSelector(state => state.commonReducer.selectedVoucher);
 
  const fromStore = props?.route?.params?.fromStore;
  const finalData = props?.route?.params?.finalData;

  const [subTotal, setSubTotal] = useState(0);
  const [type, setItem] = useState('');
  const [finalStateData, setFinalStateData] = useState(
    fromStore ? cartData : finalData?.services,
  );
  const [arrayDropDown, setArrayDropdown] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState();

  const servicesArray = [
    {
      name: 'Cargo',
      price: 20,
    },
    {
      name: 'by air',
      price: 7,
    },
    {
      name: 'Deluxe',
      price: 8,
    },
  ];

  const calculateDiscountedPrice = () => {
    const finalValue =
      voucher?.type == 'fixed'
        ? subTotal - voucher?.value
        : (subTotal * (100 - voucher?.value)) / 100;

    return finalValue;
  };
  const calculateDiscount = () => {
    const finalValue =
      voucher?.type == 'fixed'
        ? subTotal - voucher?.value
        : (subTotal * voucher?.value) / 100;

    return finalValue;
  };

  useEffect(() => {
    setSubTotal(0);
    setArrayDropdown([]);
    servicesArray.map(x => setArrayDropdown(prev => [...prev, x?.name]));
  }, []);

  useEffect(() => {
    fromStore &&
      setSelectedPrice(servicesArray.find(data => data.name == type));
  }, [type]);

  useEffect(() => {
    setSubTotal(0), fromStore && dispatch(setWholeCart(finalStateData));
    finalStateData?.map((x, index) => {
      return setSubTotal(prev => prev + x?.price);
    });
  }, [finalStateData]);

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      showUser={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: windowHeight * 0.15,
            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
          }}>
          {finalStateData?.map((item, index) => {
            return (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  width: windowWidth * 0.9,
                }}>
                <Icon
                  name={'check-circle-o'}
                  as={FontAwesome}
                  color={Color.white}
                  size={moderateScale(20, 0.3)}
                />

                <View
                  style={[
                    styles.container1,
                    fromStore && {
                      justifyContent: 'space-between',
                    },
                  ]}>
                  <View>
                    <CustomText
                      style={[styles.text1, {width: windowWidth * 0.5}]}>
                      {item?.name}
                    </CustomText>
                    <CustomText isBold>
                      {numeral(item?.price).format('$0,0.0')}
                    </CustomText>
                  </View>
                  {fromStore && (
                    <View
                      style={{
                        marginRight: moderateScale(15, 0.3),
                      }}>
                      <Icon
                        name={'add-circle-sharp'}
                        as={Ionicons}
                        color={Color.themeColor}
                        size={moderateScale(20, 0.3)}
                        onPress={() => {
                          setFinalStateData(
                            prev => [...prev],
                            (finalStateData[index].quantity += 1),
                          );
                        }}
                      />
                      <CustomText
                        isBold
                        style={{
                          marginLeft: moderateScale(5, 0.3),
                          fontSize: moderateScale(12, 0.3),
                        }}>
                        {finalStateData[index]?.quantity}
                      </CustomText>
                      <Icon
                        name={'circle-with-minus'}
                        as={Entypo}
                        color={Color.themeColor}
                        size={moderateScale(19, 0.3)}
                        onPress={() => {
                          finalStateData[index].quantity > 0 &&
                            (setFinalStateData(
                              prev => [...prev],
                              (finalStateData[index].quantity -= 1),
                            ),
                            setFinalStateData(
                              finalStateData.filter(
                                (x, index) => x?.quantity > 0,
                              ),
                            ));
                        }}
                      />
                    </View>
                  )}
                </View>
              </View>
            );
          })}
          {fromStore && (
            <>
              <CustomTextWithMask
                data={`Choose Courier Service`}
                textStyle={{
                  fontSize: moderateScale(13, 0.3),
                  marginTop: moderateScale(10, 0.3),
                  marginLeft: moderateScale(20, 0.3),
                }}
                isBold
                size={30}
              />
              <DropDownSingleSelect
                array={arrayDropDown}
                backgroundColor={Color.white}
                item={type}
                setItem={setItem}
                placeholder={'Choose any category'}
                width={windowWidth * 0.9}
                dropdownStyle={{
                  width: windowWidth * 0.9,
                  borderBottomWidth: 0,
                }}
              />

              <View style={styles.row}>
                <CustomText style={[styles.text1, {color: Color.white}]}>
                  Shipping Cost
                </CustomText>
                <CustomText isBold style={{color: Color.white}}>
                  {numeral(selectedPrice?.price).format('$0.0')}
                </CustomText>
              </View>
              <View style={styles.row}>
                {/* finalData */}
                <CustomText style={[styles.text1, {color: Color.white}]}>
                  Subtotal
                </CustomText>
                <CustomText isBold style={{color: Color.white}}>
                  {numeral(subTotal).format('$0,0.0')}
                </CustomText>
              </View>
            </>
          )}
          <View style={styles.underline} />
          <View style={styles.row}>
            <CustomText style={[styles.text1, {color: Color.white}]}>
              Location :
            </CustomText>
            <CustomText
              isBold
              style={{
                color: Color.white,
                // backgroundColor: 'red',
                width: windowWidth * 0.5,
              }}>
              {`${finalData?.location?.name}`}
            </CustomText>
          </View>
          <View style={styles.underline} />
          <View style={styles.row}>
            <CustomText style={[styles.text1, {color: Color.white}]}>
              Apply voucher :
            </CustomText>
            {Object.keys(voucher).length == 0 ? (
              <CustomButton
                textColor={Color.black}
                onPress={() => {
                  navigationService.navigate('Vouchers', {total: subTotal});
                }}
                width={windowWidth * 0.3}
                height={windowHeight * 0.05}
                text={'select voucher'}
                fontSize={moderateScale(12, 0.3)}
                isGradient={true}
                isBold
                borderRadius={moderateScale(30, 0.4)}
              />
            ) : (
              <View
                style={{
                  borderColor: Color.themeColor,
                  borderRadius: moderateScale(10, 0.6),
                  borderWidth: moderateScale(2, 0.6),
                  paddingVertical: moderateScale(10, 0.6),
                  paddingHorizontal: moderateScale(15, 0.6),
                  alignItems: 'center',
                  flexDirection: 'row',
                  // backgroundColor:'green'
                }}>
                <Icon
                  onPress={() => {
                    dispatch(setVoucherData({}));
                  }}
                  style={{position: 'absolute', top: 2, right: 2}}
                  name={'cross'}
                  as={Entypo}
                  color={Color.white}
                  size={moderateScale(11, 0.6)}
                />
                <CustomText isBold style={{color: Color.white}}>
                  {voucher?.value}
                  {voucher?.type == 'fixed' ? '$' : '%'}
                </CustomText>
              </View>
            )}
          </View>
          <View style={styles.underline} />
          <View style={styles.row}>
            <CustomText style={[styles.text1, {color: Color.white}]}>
              total
            </CustomText>
            <CustomText isBold style={{color: Color.white}}>
              {numeral(
                selectedPrice?.price
                  ? selectedPrice?.price + subTotal
                  : subTotal,
              ).format('$0,0.0')}
            </CustomText>
          </View>
          {Object.keys(voucher).length > 0 && (
            <View style={styles.row}>
              <CustomText style={[styles.text1, {color: Color.white}]}>
                Discount
              </CustomText>
              <CustomText isBold style={{color: Color.white}}>
                {voucher?.type == 'fixed'
                  ? numeral(voucher?.value).format('$0,0.0')
                  : numeral(voucher?.value / 100).format('0%')}
              </CustomText>
            </View>
          )}
          {Object.keys(voucher).length > 0 && (
            <View style={styles.row}>
              <CustomText style={[styles.text1, {color: Color.white}]}>
                SubTotal
              </CustomText>
              <CustomText isBold style={{color: Color.white}}>
                {numeral(calculateDiscountedPrice()).format('$0,0.0')}
              </CustomText>
            </View>
          )}
        </ScrollView>
        <CustomButton
          // borderColor={'white'}
          // borderWidth={1}
          textColor={Color.black}
          onPress={() => {
            navigationService.navigate('PaymentScreen', {
              finalData: {
                ...finalData,
                total: subTotal,
                discount: calculateDiscount(),
              },
              fromStore: fromStore,
            });
          }}
          width={windowWidth * 0.9}
          height={windowHeight * 0.06}
          text={'Book your slot'}
          fontSize={moderateScale(14, 0.3)}
          // borderRadius={moderateScale(30, 0.3)}
          textTransform={'uppercase'}
          isGradient={true}
          isBold
          // marginTop={moderateScale(10,.3)}
          marginBottom={windowHeight * 0.15}
          borderRadius={moderateScale(30, 0.4)}
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default CheckoutScreen;

const styles = ScaledSheet.create({
  row: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(20, 0.3),
    width: windowWidth,
    justifyContent: 'space-between',
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  container: {
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
  },
  text1: {
    color: Color.black,
    fontSize: moderateScale(14, 0.3),
  },
  container1: {
    backgroundColor: Color.white,
    width: windowWidth * 0.8,
    height: windowHeight * 0.12,
    marginBottom: moderateScale(10, 0.3),
    marginLeft: moderateScale(10, 0.3),
    paddingLeft: moderateScale(10, 0.3),
    paddingTop: moderateScale(20, 0.3),
    borderRadius: moderateScale(18, 0.6),
    flexDirection: 'row',
  },
  underline: {
    width: windowWidth * 0.9,
    borderTopWidth: 1,
    borderColor: Color.white,
    marginVertical: moderateScale(20, 0.3),
  },
});
