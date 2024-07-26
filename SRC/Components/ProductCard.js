import {
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    ToastAndroid,
    Platform,
    Alert,
    View,
  } from 'react-native';
  import React, {useEffect, useRef, useState} from 'react';
  import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
  import CustomImage from './CustomImage';
  import Color from '../Assets/Utilities/Color';
  import CustomText from './CustomText';
  import {moderateScale} from 'react-native-size-matters';
  import Lottie from 'lottie-react-native';
  import {Icon} from 'native-base';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import numeral from 'numeral';
  import {useDispatch, useSelector} from 'react-redux';
  import {setCartData, setRemoveCardData} from '../Store/slices/common';
  import {Post} from '../Axios/AxiosInterceptorFunction';
  import HolidayModal from './HolidayModal';
  import {act} from 'react-test-renderer';
  // import {setCartData} from '../Store/combineReducer';
  
  const ProductCard = ({
    item,
    onPress,
    addedInWishlist,
    setIsHolidayMode,
    isHolidayMode,
    data,
    setData,
  }) => {

    const cartData = useSelector(state => state.commonReducer.cartData);
    const token = useSelector(state => state.authReducer.token);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [start, setStart] = useState(false);
    const [added, setAdded] = useState(addedInWishlist ? addedInWishlist : false);
    const animationRef = useRef();
  
    // const addToWishList = async action => {
    
    //   const url = 'auth/wishlist';
    //   const body = {
    //     barber_id: item?.id,
    //     type: 'product',
    //     action: action,
    //   };
    
  
    //   setIsLoading(true);
    //   const response = await Post(url, body, apiHeader(token));
    //   setIsLoading(true);
    //   if (response != undefined) {
    //     action == 'remove' &&
    //       setData(data?.filter(item1 => item1?.barber_id != item?.id));
    //     action == 'remove' ? setAdded(false) : setAdded(true);
    //     Platform.OS == 'android'
    //       ? ToastAndroid.show(
    //           action == 'remove' ? 'removed from wishlist' : 'Added to wishList',
    //           ToastAndroid.SHORT,
    //         )
    //       : Alert.alert( action == 'remove' ? 'removed from wishlist' : 'Added to wishList',);
    //   }
    // };
  
    useEffect(() => {
      if (start) {
        setTimeout(() => {
          animationRef.current.reset(), setStart(false),setAdded(true)
        }, 4000);
      }
    }, [start]);
  
    return (
      <View
        style={{
          // backgroundColor:'red',
          paddingHorizontal: moderateScale(10, 0.6),
          paddingVertical: moderateScale(15, 0.6),
        }}>
        <Pressable
          onLongPress={() => {
            added == false &&
              (setStart(true),
              animationRef.current?.play()
            //   addToWishList('add')
              );
          }}
          onPress={onPress}>
          {({pressed}) => (
            <View
              style={[
                styles.cardContainer,
                cartData?.some(data => data.id == item?.id) && {
                  borderWidth: 2,
                  borderColor: '#0000FF',
                },
              ]}>
              <Lottie
                ref={animationRef}
                style={{zIndex: 1}}
                source={require('../Assets/Images/heart.json')}
                speed={1}
             
                loop
                 onAnimationLoop={() => {
                  // setSpeed(0)
                }}
              />
              {item?.price && (
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
                    top: moderateScale(10, 0.3),
                    left: moderateScale(4, 0.3),
                    zIndex: 1,
                    // marginTop : moderateScale(-5,0.3)
                  }}>
                  <CustomText isBold style={{color: Color.white}}>
                    {numeral(item?.price).format('$0,0.0')}
                  </CustomText>
                </View>
              )}
              <CustomImage
                source={item?.image}
                resizeMode={'cover'}
                style={{
                  height: '100%',
                  width: '100%',
                  zIndex: -1,
                  // backgroundColor : '#000'
                }}
              />
             
  
             
  
              <CustomText
                isBold
                style={{
                  color: Color.black,
                  textAlign: 'center',
                  marginTop: moderateScale(5, 0.3),
                }}>
                {item?.name}
              </CustomText>
              {added && (
                <TouchableOpacity
                  onPress={() => {
                    addToWishList('remove');
                  }}
                  activeOpacity={0.9}
                  style={styles.heart}>
                  <Icon
                    name="heart"
                    as={AntDesign}
                    color={Color.white}
                    size={moderateScale(19, 0.3)}
                    onPress={() => {
                      addToWishList('remove');
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        </Pressable>
        {cartData?.some(data => data.id == item?.id) && (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              // let data=[];
              // data = [...cartData],
              let index1 = cartData.findIndex(x => x?.id == item?.id);
              dispatch(setRemoveCardData(index1));
              // data.splice(index1,1),
            }}
            style={styles.remove}>
            <CustomText
              isBold
              style={{
                color: Color.white,
                fontSize: moderateScale(14, 0.3),
              }}>
              Remove
            </CustomText>
          </TouchableOpacity>
        )}
      </View>
    );
  };
  
  export default ProductCard;
  
  const styles = StyleSheet.create({
    cardContainer: {
      width: windowWidth * 0.4,
      height: windowHeight * 0.26,
      backgroundColor: 'white',
      // overflow: 'hidden',
      borderRadius: moderateScale(20, 0.5),
      marginBottom: moderateScale(10, 0.3),
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
    remove: {
      marginBottom: moderateScale(10, 0.3),
      width: windowWidth * 0.4,
      height: windowHeight * 0.05,
      backgroundColor: 'rgb(175, 4, 60)',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  