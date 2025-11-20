import {
  Pressable,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
  Platform,
  Alert,
  View,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import CustomImage from './CustomImage';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import { moderateScale } from 'react-native-size-matters';
import Lottie from 'lottie-react-native';
import { Icon } from 'native-base';
import numeral from 'numeral';
import { useDispatch, useSelector } from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { Post } from '../Axios/AxiosInterceptorFunction';
import HolidayModal from './HolidayModal';
import LottieView from 'lottie-react-native';
import LinearGradient from 'react-native-linear-gradient';
import { mode } from 'native-base/lib/typescript/theme/tools';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import moment from 'moment';


const BarberCard = ({
  item,
  onPress,
  addedInWishlist,
  setIsHolidayMode,
  isHolidayMode,
  data,
  setData,
  fromWishList,
  selectedBarber,
  fromComparebarber,
  setSelectedBarber,
  isDetails = true
}) => {
  console.log(item, 'item========================>')
  const cartData = useSelector(state => state.commonReducer.cartData);
  const token = useSelector(state => state.authReducer.token);

  const dispatch = useDispatch();
  const animationRef = useRef();

  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState(false);
  const [added, setAdded] = useState(addedInWishlist ? addedInWishlist : false);

  const addToWishList = async action => {

    const url = 'auth/wishlist';
    const body = {
      barber_id: item?.id,
      type: 'barber',
      action: action,
    };

    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(true);
    if (response != undefined) {
      action == 'remove' &&
        setData(data?.filter(item1 => item1?.barber_id != item?.id));
      action == 'remove' ? setAdded(false) : setAdded(true);
      Platform.OS == 'android'
        ? ToastAndroid.show(
          action == 'remove' ? 'removed from wishlist' : 'Added to wishList',
          ToastAndroid.SHORT,
        )
        : Alert.alert(
          action == 'remove' ? 'removed from wishlist' : 'Added to wishList',
        );
    }
  };
  const rating = parseFloat(item?.reviews_avg_rating) || 0;
  const timeAgo = moment(item?.created_at).format('DD MMM YYYY')
  console.log(timeAgo, '=================>')
  useEffect(() => {
    if (start) {
      setTimeout(() => {
        animationRef.current?.reset(), setStart(false);
      }, 4000);
    }
  }, [start]);

  return (
    <View
      style={{
        paddingHorizontal: moderateScale(10, 0.6),
        paddingVertical: moderateScale(5, 0.6),
      }}>
      <Pressable
        onLongPress={() => {
          added == false &&
            (setStart(true),
              animationRef.current?.play(),
              addToWishList('add'));
        }}
        onPress={() => {
          if (fromComparebarber == true) {
            if (
              selectedBarber?.length == 4 ||
              selectedBarber.some(item1 => item1?.id == item?.id)
            ) {
              selectedBarber.some(item1 => item1?.id == item?.id) &&
                setSelectedBarber(
                  selectedBarber?.filter(
                    (value, index) => value?.id !== item?.id,
                  ),
                );
            } else {
              setSelectedBarber(prev => [...prev, item]);
            }
          } else {
            onPress();
          }
        }}>
        {({ pressed }) => (
          // <View style={[styles.cardContainer]}>
          //   <Lottie
          //     ref={animationRef}
          //     style={{ zIndex: 1 }}
          //     source={require('../Assets/Images/heart.json')}
          //     speed={1}
          //     loop
          //     onAnimationLoop={() => {
          //       // setSpeed(0)
          //     }}
          //   />
          //   {item?.price && (
          //     <View
          //       style={{
          //         alignSelf: 'flex-end',
          //         minWidth: moderateScale(50, 0.3),
          //         paddingHorizontal: moderateScale(10, 0.3),
          //         paddingVertical: moderateScale(5, 0.3),
          //         marginHorizontal: moderateScale(10, 0.3),
          //         borderRadius: moderateScale(25, 0.3),
          //         backgroundColor: 'rgba(0,0,0,0.7)',
          //         justifyContent: 'center',
          //         alignItems: 'center',
          //         position: 'absolute',
          //         top: moderateScale(10, 0.3),
          //         left: moderateScale(4, 0.3),
          //         zIndex: 1,

          //       }}>
          //       <CustomText isBold style={{ color: Color.white }}>
          //         {numeral(item?.price).format('$0,0.0')}
          //       </CustomText>
          //     </View>
          //   )}
          //   <CustomImage
          //     onPress={() => {
          //       if (fromComparebarber == true) {
          //         if (
          //           selectedBarber?.length == 4 ||
          //           selectedBarber.some(item1 => item1?.id == item?.id)
          //         ) {
          //           selectedBarber.some(item1 => item1?.id == item?.id) &&
          //             setSelectedBarber(
          //               selectedBarber?.filter(
          //                 (value, index) => value?.id !== item?.id,
          //               ),
          //             );
          //         } else {
          //           setSelectedBarber(prev => [...prev, item]);
          //         }
          //       } else {
          //         onPress();
          //       }
          //     }}
          //     source={{ uri: item?.photo }}
          //     resizeMode={'cover'}
          //     style={{
          //       height: '100%',
          //       width: '100%',
          //       zIndex: -1,

          //     }}
          //   />
          //   {selectedBarber?.some((item1, index) => item1?.id == item?.id) && (
          //     <View
          //       style={{
          //         // backgroundColor : 'red',
          //         height: windowHeight * 0.022,
          //         width: windowHeight * 0.022,
          //         borderRadius: (windowHeight * 0.022) / 2,
          //         position: 'absolute',
          //         top: 10,
          //         right: 10,
          //         borderWidth: 1,
          //         borderColor: Color.green,
          //       }}>
          //       <Icon
          //         name="check"
          //         as={AntDesign}
          //         size={15}
          //         color={Color.green}
          //       />
          //     </View>
          //   )}

          //   {item?.holiday_mode == true && (
          //     <View
          //       style={{
          //         height: windowHeight * 0.07,
          //         width: windowWidth * 0.15,
          //         position: 'absolute',
          //         top: 10,
          //         right: 5,
          //       }}>
          //       <CustomImage
          //         style={{
          //           height: '100%',
          //           width: '100%',
          //         }}
          //         source={require('../Assets/Images/holidaybatch.png')}
          //       />
          //     </View>
          //   )}

          //   <HolidayModal
          //     setIsHolidayMode={setIsHolidayMode}
          //     isHolidayMode={isHolidayMode}
          //   />
          //   <View style={styles.absoluteContainer}>
          //     <CustomText
          //       isBold
          //       style={{
          //         color: Color.white,
          //         marginTop: moderateScale(5, 0.3),
          //       }}>
          //       {item?.first_name}
          //     </CustomText>
          //     <CustomText
          //       isBold
          //       style={{
          //         color: Color.themeColor,
          //         marginTop: moderateScale(5, 0.3),
          //       }}>
          //       {item?.tier}
          //     </CustomText>
          //   </View>
          //   {added && (
          //     <TouchableOpacity
          //       onPress={() => {
          //         fromWishList && addToWishList('remove');
          //       }}
          //       activeOpacity={0.9}
          //       style={styles.heart}>
          //       <Icon
          //         name="heart"
          //         as={AntDesign}
          //         color={Color.white}
          //         size={moderateScale(19, 0.3)}
          //         onPress={() => {
          //           fromWishList && addToWishList('remove');
          //         }}
          //       />
          //     </TouchableOpacity>
          //   )}
          // </View>
          <LinearGradient
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            colors={['#000000', 'rgba(0,0,0,0)']}
            style={styles.cardContainer}
          >
            <View style={{
              width: windowWidth * 0.43,
              height: windowHeight * 0.13,
              borderRadius: moderateScale(10, 0.5),
            }}>
              {isDetails &&
                <View
                  style={{
                    alignSelf: 'flex-end',
                    minWidth: moderateScale(50, 0.3),
                    paddingHorizontal: moderateScale(10, 0.3),
                    paddingVertical: moderateScale(5, 0.3),
                    marginHorizontal: moderateScale(10, 0.3),
                    borderRadius: moderateScale(25, 0.3),
                    backgroundColor: 'rgba(0,0,0,0.7)',
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute',
                    top: moderateScale(8, 0.3),
                    left: 0,
                    zIndex: 1,

                  }}>
                  <CustomText isBold style={{ color: Color.white }}>
                    {numeral(item?.price).format('$0,0.0')}
                  </CustomText>
                </View>
              }
              < CustomImage
                onPress={() => {
                  if (fromComparebarber == true) {
                    if (
                      selectedBarber?.length == 4 ||
                      selectedBarber.some(item1 => item1?.id == item?.id)
                    ) {
                      selectedBarber.some(item1 => item1?.id == item?.id) &&
                        setSelectedBarber(
                          selectedBarber?.filter(
                            (value, index) => value?.id !== item?.id,
                          ),
                        );
                    } else {
                      setSelectedBarber(prev => [...prev, item]);
                    }
                  } else {
                    onPress();
                  }
                }}
                source={{ uri: item?.photo }}
                resizeMode={'cover'}
                style={{
                  height: '100%',
                  width: '100%',
                }}
              />
            </View>
            {selectedBarber?.some((item1, index) => item1?.id == item?.id) && (
              <View
                style={{
                  // backgroundColor : 'red',
                  height: windowHeight * 0.024,
                  width: windowHeight * 0.024,
                  borderRadius: (windowHeight * 0.022) / 2,
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  backgroundColor: Color.green,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <Icon
                  name="check"
                  as={AntDesign}
                  size={15}
                  color={Color.white}
                />
              </View>
            )}

            {item?.holiday_mode == 1 && (
              <View
                style={{
                  height: windowHeight * 0.07,
                  width: windowWidth * 0.15,
                  position: 'absolute',
                  top: 10,
                  right: 5,
                }}>
                <CustomImage
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={require('../Assets/Images/holidaybatch.png')}
                />
              </View>
            )}
            <HolidayModal
              setIsHolidayMode={setIsHolidayMode}
              isHolidayMode={isHolidayMode}
            />
            <CustomText
              isBold
              style={{
                color: Color.white,
                marginTop: moderateScale(5, 0.3),
                fontSize: moderateScale(14, 0.6),
                textAlign: 'left',
                width: '90%'
              }}>
              {item?.first_name + ' ' + item?.last_name}
            </CustomText>
            <View style={[styles.absoluteContainer, { paddingHorizontal: moderateScale(7, 0.6) }]}>
              <CustomText
                isBold
                style={{
                  color: Color.themeColor1,
                  marginTop: moderateScale(2, 0.3),
                  fontSize: moderateScale(10, 0.6),
                  textAlign: 'left',
                  width: '50%',
                }}>
                {item?.designation}
              </CustomText>
              <CustomText numberOfLines={1} style={{
                fontSize: moderateScale(9, 0.6),
                color: Color.veryLightGray,
                textAlign: 'right',
                width: '60%',
                right: 10
              }}>{timeAgo}
              </CustomText>
            </View>
            {isDetails &&
              <>
                <View style={styles.absoluteContainer}>
                  <View style={[styles.absoluteContainer, { width: '40%' }]}>
                    <Icon name='location' as={EvilIcons} size={moderateScale(18, 0.6)} color={Color.themeColor1} />
                    <CustomText numberOfLines={1} style={{
                      fontSize: moderateScale(10, 0.6),
                      color: Color.lightGrey,
                      textAlign: 'left',
                    }}>{item?.distance?.toFixed(2)} km
                    </CustomText>
                  </View>
                  <View style={[styles.absoluteContainer, { width: '30%' }]}>
                    <Icon name='star' as={EvilIcons} size={moderateScale(18, 0.6)} color={Color.themeColor1} />
                    <CustomText numberOfLines={1} style={{
                      fontSize: moderateScale(10, 0.6),
                      color: Color.lightGrey,
                      textAlign: 'left',
                      width: moderateScale(20, 0.6)
                    }}>{rating.toFixed(1)}
                    </CustomText>
                  </View>
                </View>
                <CustomText numberOfLines={1} style={{
                  fontSize: moderateScale(12, 0.6),
                  color: Color.themeColor1,
                  textAlign: 'right',
                  width: '90%',
                  marginTop: moderateScale(7, 0.5),
                  textDecorationLine: 'underline'
                }}>View More...
                </CustomText>
              </>
            }
          </LinearGradient>
        )}
      </Pressable>
    </View >
  );
};

export default BarberCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: windowWidth * 0.43,
    // height: windowHeight * 0.26,
    paddingBottom: moderateScale(10, 0.6),
    backgroundColor: Color.themeBlack,
    borderRadius: moderateScale(10, 0.5),
    marginBottom: moderateScale(10, 0.3),
    overflow: 'hidden',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Color.themeColor1
  },
  heart: {
    width: moderateScale(40, 0.3),
    height: moderateScale(40, 0.3),
    borderRadius: moderateScale(20, 0.3),
    backgroundColor: Color.themePink,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: moderateScale(10, 0.3),
    top: moderateScale(10, 0.3),
    zIndex: 1,
  },
  absoluteContainer: {
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(2, 0.6),
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(2, 0.6),
  },
  remove: {
    marginBottom: moderateScale(10, 0.3),
    width: windowWidth * 0.4,
    height: windowHeight * 0.05,
    backgroundColor: 'rgb(175, 4, 60)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
