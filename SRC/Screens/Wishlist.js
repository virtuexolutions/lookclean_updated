import React, {useEffect, useState} from 'react';
import {ImageBackground, View, ScrollView, FlatList} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import navigationService from '../navigationService';
import moment from 'moment/moment';
import CustomTextWithMask from '../Components/CustomTextWithMask';
import BarberCard from '../Components/BarberCard';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native';
import NoData from '../Components/NoData';

const Wishlist = () => {
  const isFocused = useIsFocused();
  const [selected, setSelected] = useState('barber');
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [wishListData, setWishListData] = useState([]);

  const getWishList = async () => {
    const url = `auth/wishlist?type=${selected}`;
    setIsLoading(true);
    const response = await Get(url, token);
    setIsLoading(false);
    if (response != undefined) {

      setWishListData(response?.data?.Wishlist_list);
    }
  };

 
 
  useEffect(() => {
    getWishList();
  }, [isFocused, selected]);

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
        <CustomText isBold style={styles.text1}>
          Wishlist
        </CustomText>
        {/* <View
          style={{
            flexDirection: 'row',
            marginTop: moderateScale(10, 0.3),
            justifyContent: 'space-evenly',
            // backgroundColor:'red',
            alignItems: 'center',
            // alignSelf: 'center',
            width: windowWidth * 0.48,
          }}>
          {userData?.role != 'barber' && (
            <CustomButton
              textColor={Color.black}
              onPress={() => {
                setSelected('barber');
              }}
              width={windowWidth * 0.22}
              height={windowHeight * 0.05}
              borderRadius={moderateScale(25, 0.6)}
              text={'barber'}
              fontSize={moderateScale(14, 0.3)}
              textTransform={'uppercase'}
              isGradient={true}
              isBold
              marginBottom={moderateScale(30, 0.3)}
            />
          )}
          <CustomButton
            textColor={Color.black}
            onPress={() => {
              setSelected('product');
            }}
            width={windowWidth * 0.22}
            height={windowHeight * 0.05}
            borderRadius={moderateScale(25, 0.6)}
            text={'Product'}
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
            marginBottom={moderateScale(30, 0.3)}
          />
        </View> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: windowHeight * 0.15,
            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
          }}>
          {isLoading ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: windowHeight * 0.6,
              }}>
              <ActivityIndicator color={Color.themeColor} size={'large'} />
            </View>
          ) : (
            <FlatList
              decelerationRate={'fast'}
              numColumns={2}
              ListEmptyComponent={() => {
                return (
                  <NoData
                    style={{
                      height: windowHeight * 0.25,
                      width: windowWidth * 0.6,
                      alignItems: 'center',
                    }}
                    text={'No Upcoming Orders'}
                  />
                );
              }}
              style={{
                marginTop: moderateScale(10, 0.3),
              }}
              contentContainerStyle={{
                width: windowWidth,
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              data={wishListData.reverse()}
              renderItem={({item, index}) => {
                return (
                   <BarberCard
                    item={item?.barber_info}
                    onPress={() => {
                      navigationService.navigate('BarberServicesScreen', {
                        detail: item?.barber_info,
                      });
                    }}
                    addedInWishlist={true}
                    data={wishListData}
                    setData={setWishListData}
                    fromWishList={true}

                  />
                );
              }}
            />
          )}
        </ScrollView>
      </LinearGradient>
    </ScreenBoiler>
  );
};
export default Wishlist;

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.03,
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
  text1Absolute: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(16, 0.3),
  },
  bannerView: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.46,
    backgroundColor: 'black',
    marginTop: moderateScale(10, 0.3),
  },
});

// <MaskedView
// style={{ flex: 1, flexDirection: 'row', height: '100%' }}
// maskElement={
//   <View
//     style={{
//       // Transparent background because mask is based off alpha channel.
//       backgroundColor: 'transparent',
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center'
//     }}
//   >
//     <Text
//       style={{
//         fontSize: 60,
//         color: 'black',
//         fontWeight: 'bold'
//       }}
//     >
//       Basic Mask
//     </Text>
//   </View>
// }
// >
// {/* Shows behind the mask, you can put anything here, such as an image */}
// {/* <View style={{ flex: 1, height: '100%', backgroundColor: '#324376' }} /> */}
// <View style={{ flex: 1, height: '100%', backgroundColor: '#F5DD90' }} />
// <View style={{ flex: 1, height: '100%', backgroundColor: '#F76C5E' }} />
// <View style={{ flex: 1, height: '100%', backgroundColor: '#e1e1e1' }} />
// </MaskedView>
