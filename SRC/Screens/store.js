import React, {useState} from 'react';
import {ImageBackground, View, ScrollView, FlatList} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import navigationService from '../navigationService';
import moment from 'moment/moment';
import CustomTextWithMask from '../Components/CustomTextWithMask';
import BarberCard from '../Components/BarberCard';
import {Icon} from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {setCartData} from '../Store/slices/common';
import ProductCard from '../Components/ProductCard';

const Store = () => {
  const cartData = useSelector(state => state.commonReducer.cartData);
  const dispatch = useDispatch();

  const [index, setIndex] = useState(0);
 
  // const bannerArray = [
  //   {
  //     image: require('../Assets/Images/bannerImageStore.png'),
  //     heading: 'Best Products',
  //     description: 'The latest trend Hair Products',
  //   },
  //   {
  //     image: require('../Assets/Images/bannerImageStore.png'),
  //     heading: 'Best Products',
  //     description: 'The latest trend Hair Products',
  //   },
  //   {
  //     image: require('../Assets/Images/bannerImageStore.png'),
  //     heading: 'Best Products',
  //     description: 'The latest trend Hair Products',
  //   },
  // ];
  // const cardArray = [
  //   {
  //     id: 1,
  //     photo: require('../Assets/Images/glue.png'),
  //     name: 'Glue',
  //     price: 20,
  //     quantity: 1,
  //   },
  //   {
  //     id: 2,
  //     image: require('../Assets/Images/lotion.png'),
  //     name: 'Shampoo',
  //     price: 40,
  //     quantity: 1,
  //   },
  //   {
  //     id: 3,
  //     image: require('../Assets/Images/glue.png'),
  //     name: 'Glue',
  //     price: 200,
  //     quantity: 1,
  //   },
  //   {
  //     id: 4,
  //     image: require('../Assets/Images/lotion.png'),
  //     name: 'Shampoo',
  //     price: 20,
  //     quantity: 1,
  //   },
  // ];
  return (
    <ScreenBoiler
      showHeader={true}
      showback={true}
      showUser={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: windowHeight*0.7,
            width: windowWidth,
          }}>
          <CustomText isBold style={styles.text1}>
          coming soon....
          </CustomText>
        </View>
        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: windowWidth * 0.85,
            alignItems: 'center',
          }}>
          <CustomText isBold style={styles.text1}>
            Best Products
          </CustomText>
          <LinearGradient
            start={{x: 0.0, y: 0.25}}
            end={{x: 0.5, y: 1.0}}
            colors={Color.btnColor}
            style={styles.CircleContainer}>
            <Icon
              name={cartData.length > 0 ? 'cart' : 'cart-off'}
              as={MaterialCommunityIcons}
              size={moderateScale(20, 0.3)}
              color={Color.black}
              onPress={() => {
                cartData.length > 0 &&
                  navigationService.navigate('CheckoutScreen', {
                    fromStore: true,
                  });
                // finalData : cartData ,
              }}
            />
          </LinearGradient>
        </View> */}
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: windowHeight * 0.15,
            // paddingTop : moderateScale(20,0.3),
            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
          }}>
          <FlatList
            style={styles.bannerView}
            data={bannerArray}
            horizontal
            pagingEnabled
            renderItem={({item, index}) => {
              return (
                <View
                  style={{

                    borderRadius:moderateScale(30,0.6),
                    overflow:'hidden',
                    width: windowWidth * 0.85,
                    height: windowHeight * 0.46,
                 }}>
                  <CustomImage
                    source={item?.image}
                    resizeMode={'stretch'}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                  {/* <View style={{position : 'absolute' , bottom : 0}}> */}
        {/* <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 0, y: 1}}
                    colors={['#8A8A8A00', '#000000']}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      borderBottomLeftRadius: moderateScale(30,0.6),
                      borderBottomRightRadius: moderateScale(30,0.6),
                     
                      justifyContent: 'flex-end',
                      shadowOffset: {height: 2, width: 0},
                      shadowOpacity: 1,
                      shadowRadius: 4,
                      width: '100%',
                      alignItems: 'center',
                      paddingBottom: moderateScale(20, 0.3),
                      paddingTop: moderateScale(60, 0.3),
                    }}>
                    <CustomTextWithMask
                      data={item?.heading}
                      textStyle={[styles.text1Absolute]}
                      isBold
                      size={20}
                    />
                    <CustomText style={styles.text1Absolute}>
                      {item?.description}
                    </CustomText>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf: 'center',
                        borderRadius:moderateScale(30,0.8),
                        marginTop: moderateScale(10, 0.3),
                      }}>
                      {bannerArray.map((x, index1) => {
                        return (
                          <View
                            style={{
                              width: index1 == index ? 25 : 15,
                              height: 5,
                              backgroundColor:
                                index1 == index
                                  ? Color.themeColor
                                  : Color.white,
                              marginRight: moderateScale(5, 0.3),
                              borderRadius: moderateScale(5, 0.3),
                            }}></View>
                        );
                      })}
                    </View>
                  </LinearGradient> */}
        {/* </View> */}
        {/* </View>
              );
            }}
          />

          <CustomText
            isBold
            style={[
              styles.text1,
              {
                width: windowWidth * 0.85,
                fontSize: moderateScale(16, 0.3),
                textAlign: 'left',
                marginTop: moderateScale(10, 0.3),
              },
            ]}>
           Products
          </CustomText>
          <View style={{paddingTop: moderateScale(10, 0.3),
            paddingHorizontal:19,
            width: windowWidth,
          }}>
            <FlatList
            data={cardArray}
            renderItem={(itemData) => <ProductCard item={itemData.item}/>}
            keyExtractor={item => item.id}
            numColumns={2}
            />
          </View>
          */}
        {/* </ScrollView> */}
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default Store;

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.03,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // backgroundColor : Color.green
  },
  text1: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(20, 0.3),
    // marginTop : moderateScale(10,0.3),
    // lineHeight: moderateScale(32, 0.3),
  },
  text1Absolute: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(16, 0.3),
    // position : 'absolute',
    // bottom : moderateScale(10,0.3),
    // marginTop : moderateScale(10,0.3),
    // lineHeight: moderateScale(32, 0.3),
  },
  bannerView: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.46,
    // backgroundColor: 'black',
    marginTop: moderateScale(10, 0.3),
  },
  CircleContainer: {
    width: moderateScale(40, 0.3),
    height: moderateScale(40, 0.3),
    borderRadius: moderateScale(20, 0.3),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.themeColor,
  },
});
