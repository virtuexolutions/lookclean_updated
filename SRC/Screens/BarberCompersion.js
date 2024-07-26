import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import navigationService from '../navigationService';
import moment from 'moment/moment';
import CustomTextWithMask from '../Components/CustomTextWithMask';
import BarberCard from '../Components/BarberCard';
import {useSelector} from 'react-redux';
import OrderCard from '../Components/OrderCard';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import NoData from '../Components/NoData';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CompletedOrderCard from '../Components/CompletedOrderCard';
import FilteringModal from '../Components/FilteringModal';
import ShowReview from '../Components/ShowReview';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Alert} from 'react-native';
import {Platform} from 'react-native';
import CustomButton from '../Components/CustomButton';
import {Rating} from 'react-native-ratings';

const BarberCompersion = props => {
  const detail = props?.route?.params?.item;
  const user = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);

  const navigation = useNavigation();
  const focused = useIsFocused();

  const [isLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [barberData, setBarberData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [index, setIndex] = useState(0);



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
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: windowHeight * 0.155,
            // paddingTop : moderateScale(20,0.3),
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
                height: windowHeight * 0.2,
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
                    text={'No barber found'}
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
              data={detail}
              renderItem={({item, index}) => {
                return (
                  <View
                    // style={
                    //   {
                    //     // backgroundColor:'red'
                    //   }
                    // }
                    >
                    <TouchableOpacity style={styles.mainContainer}>
                      <View style={styles.imageConatiner}>
                        <CustomImage
                          style={{
                            width: '100%',
                            height: '100%',
                          }}
                          // resizeMode= "contain"
                          source={{uri: item?.photo}}
                        />
                      </View>
                      <View
                        style={[
                          styles.row,
                          {
                            paddingTop: moderateScale(5, 0.6),
                          },
                        ]}>
                        <CustomText
                          style={{
                            fontSize: moderateScale(12, 0.6),
                          }}>
                          name :
                        </CustomText>
                        <CustomText
                          style={
                            styles.h1
                          }>{`${item?.first_name}${item?.last_name} `}</CustomText>
                      </View>
                      <View style={styles.row}>
                        <CustomText
                          style={{
                            fontSize: moderateScale(12, 0.6),
                          }}>
                          ratings :
                        </CustomText>
                        <Rating
                          type="custom"
                          readonly
                          // startingValue={3}
                          startingValue={item?.reviews_avg_rating ?item?.reviews_avg_rating :0}
                          ratingCount={5}
                          imageSize={moderateScale(10, 0.3)}
                          style={{
                            width: windowWidth * 0.17,
                            justifyContent: 'center',
                            // backgroundColor: 'green',
                          }}
                          ratingBackgroundColor={'yellow'}
                        />
                      </View>
                      <View style={styles.row}>
                        <CustomText
                          style={{
                            fontSize: moderateScale(12, 0.6),
                          }}>
                          total reviews :
                        </CustomText>
                        <CustomText
                          style={{
                            fontSize: moderateScale(12, 0.6),
                            paddingHorizontal: moderateScale(5, 0.6),
                          }}>
                          {item?.reviews_count}
                          {/* 331 */}
                        </CustomText>
                      </View>
                      <View style={styles.row}>
                        <CustomText
                          style={{
                            fontSize: moderateScale(12, 0.6),
                          }}>
                          price :
                        </CustomText>
                        <CustomText style={styles.h1}>{item?.tier}</CustomText>
                      </View>
                    </TouchableOpacity>

                    <CustomButton
                      textColor={Color.black}
                      width={windowWidth * 0.3}
                      height={windowHeight * 0.045}
                      text={'book now'}
                      fontSize={moderateScale(14, 0.3)}
                      onPress={() => {
                        navigation.navigate('BarberServicesScreen', {
                          detail: item,
                        });
                      }}
                      isGradient={true}
                      borderRadius={moderateScale(30, 0.4)}
                      isBold
                      marginTop={moderateScale(5, 0.3)}
                      marginBottom={moderateScale(14, 0.6)}
                    />
                  </View>
                );
              }}
            />
          )}
        </ScrollView>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default BarberCompersion;

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
  h1: {
    fontSize: moderateScale(12, 0.6),
    paddingHorizontal: moderateScale(5, 0.6),
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
  viewAll: {
    color: Color.white,
    fontSize: moderateScale(12, 0.3),
  },
  mapview: {
    width: windowWidth * 0.76,
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: moderateScale(5, 0.6),
  },
  mainContainer: {
    backgroundColor: 'white',
    height: windowHeight * 0.25,
    width: windowWidth * 0.45,
    borderRadius: moderateScale(10, 0.6),
    overflow: 'hidden',
    marginHorizontal: moderateScale(10, 0.3),
    marginVertical: moderateScale(5, 0.6),
  },
  imageConatiner: {
    height: windowHeight * 0.13,
    width: windowWidth * 0.45,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(10, 0.6),
  },
});
