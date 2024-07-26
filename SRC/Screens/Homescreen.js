import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
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
import {useIsFocused} from '@react-navigation/native';
import CompletedOrderCard from '../Components/CompletedOrderCard';
import FilteringModal from '../Components/FilteringModal';
import ShowReview from '../Components/ShowReview';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Homescreen = () => {
  const user = useSelector(state => state.commonReducer.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [barberData, setBarberData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState([]);
  const [isHolidayMode, setIsHolidayMode] = useState(false);
  const focused = useIsFocused();

  

  const token = useSelector(state => state.authReducer.token);
  
  const [index, setIndex] = useState(0);

  const GetBarberBooking = async () => {
    const url = `auth/barber/booking/list`;
    setIsLoading(true);
    const response = await Get(url, token);

    setIsLoading(false);

    if (response != undefined) {
      setOrderData(response?.data?.barber_booking_list);
    }
  };

  // TIME GET API END

  const barberFilter = async () => {
    const url = 'auth/barber/filter';
    const body = {
      featured: selectedItem?.includes('featured barber') ? 1 : 0,
      near: selectedItem?.includes('nearest to me') ? 1 : 0,
      earlier: selectedItem?.includes('earliest') ? 1 : 0,
    };
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {
      
      setBarberData(response?.data?.users);
    }
  };

  useEffect(() => {
    if (user?.role == 'barber') {
      // BarberList();
      GetBarberBooking();
    }
  }, [focused]);

  useEffect(() => {
    if (user?.role == 'customer') {
      barberFilter();
    }
  }, [focused, selectedItem.length]);

  const bannerArray = [
    {
      image: require('../Assets/Images/bannerImage.png'),
      heading: 'Lorraine R. Lebrun',
      description: 'The latest trend Hair Dresser',
    },
    {
      image: require('../Assets/Images/bannerImage1.png'),
      heading: 'Kelli M. Scalf',
      description: 'The latest trend Hair Dresser',
    },
    {
      image: require('../Assets/Images/bannerImage2.png'),
      heading: 'Andrew E. Hall',
      description: 'The latest trend Hair Dresser',
    },
  ];

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
        {user?.role == 'customer' ? (
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
            <View
              style={{
                flexDirection: 'row',
                // backgroundColor: 'red',
                width: windowWidth * 0.9,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: Color.themeColor1,
                  height: windowHeight * 0.05,
                  width: windowHeight * 0.05,
                  borderRadius: (windowHeight * 0.05) / 2,
                  alignItems: 'center',
                  justifyContent: 'center',

                  marginRight: moderateScale(10, 0.3),
                }}
                onPress={() => {
                  setIsVisible(true);
                }}>
                <Icon
                  style={{
                    textAlign: 'center',
                  }}
                  onPress={() => {
                    setIsVisible(true);
                  }}
                  name="filter"
                  as={FontAwesome}
                  size={25}
                  color={Color.lightGrey}
                />
              </TouchableOpacity>
              <View style={styles.mapview}>
                {selectedItem?.map((item, index) => {
                  return (
                    <>
                      <CustomText
                        onPress={() => {
                          setIsVisible(true);
                        }}
                        isBold
                        style={{
                          color: Color.white,
                          borderColor: Color.themeColor,
                          borderWidth: 1,
                          borderRadius: moderateScale(20, 0.6),
                          padding: moderateScale(7, 0.6),
                          marginHorizontal: moderateScale(5, 0.3),
                          fontSize: moderateScale(13, 0.6),
                          marginVertical: moderateScale(5, 0.3),
                        }}>
                        {item}
                      </CustomText>
                      <View
                      // style={{
                      //   position: 'absolute',
                      //   top: -4,
                      //   right: 7,
                      //   backgroundColor: 'red',
                      // }}
                      >
                        <Icon
                          style={{
                            position: 'absolute',
                            right: 2,
                          }}
                          onPress={() => {
                            let temp = [...selectedItem];
                            temp.splice(index, 1);
                            setSelectedItem(temp);
                          }}
                          name="circle-with-cross"
                          as={Entypo}
                          size={15}
                          color={Color.lightGrey}
                        />
                      </View>
                    </>
                  );
                })}
              </View>
            </View>

            <FilteringModal
              barberFilter={barberFilter}
              selectedItem={selectedItem}
              setSelectedItem={setSelectedItem}
              isVisible={isVisible}
              setIsVisible={setIsVisible}
            />

            <CustomText isBold style={styles.text1}>
              New HairStyle Trends
            </CustomText>

            <CustomTextWithMask
              data={`${moment().format('YYYY')}`}
              textStyle={styles.text1}
              isBold
              size={40}
            />

            <FlatList
              style={styles.bannerView}
              data={bannerArray}
              horizontal
              pagingEnabled
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
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
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 0, y: 1}}
                      colors={['#8A8A8A00', '#000000']}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        borderRadius: 5,
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
                    </LinearGradient>
                    {/* </View> */}
                  </View>
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
              Recommended
            </CustomText>
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
                data={barberData?.reverse()}
                renderItem={({item, index}) => {
                  return (
                    <BarberCard
                      item={item}
                      setIsHolidayMode={setIsHolidayMode}
                      isHolidayMode={isHolidayMode}
                      onPress={() => {
                        if (item?.holiday_mode == true) {
                          setIsHolidayMode(true);
                        } else {
                          navigationService.navigate('BarberServicesScreen', {
                            detail: item,
                          });
                        }
                      }}
                    />
                  );
                }}
              />
            )}
          </ScrollView>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: windowHeight * 0.155,

              alignItems: 'center',
            }}
            style={{
              width: windowWidth,
            }}>
            <View
              style={{
                width: windowWidth,
              }}>
              <CustomText isBold style={styles.text1}>
                Welcome
              </CustomText>

              <CustomTextWithMask
                data={user?.name}
                textStyle={[
                  styles.text1,
                  {
                    fontSize: moderateScale(30, 0.3),
                  },
                ]}
                isBold
                size={40}
              />
            </View>
            <View
              style={{
                borderBottomWidth: 1,
                borderColor: Color.themeLightGray,
                width: windowWidth,
                // marginLeft : moderateScale(10,0.3)
              }}
            />
            <View
              style={{
                marginTop: moderateScale(10, 0.3),

                flexDirection: 'row',
                // backgroundColor : 'red',
                justifyContent: 'space-between',
                width: windowWidth * 0.95,
                alignItems: 'center',
              }}>
              <CustomText
                isBold
                style={[
                  {
                    fontSize: moderateScale(15, 0.3),
                    // width: windowWidth,
                    color: Color.white,

                    // marginLeft: moderateScale(10, 0.3),
                  },
                ]}>
                Upcoming Orders
              </CustomText>
              <CustomText
                onPress={() => {
                  navigationService.navigate('UpComingScreen');
                }}
                style={styles.viewAll}>
                View all
              </CustomText>
            </View>
            {isLoading ? (
              <View
                style={{height: windowHeight * 0.23, justifyContent: 'center'}}>
                <ActivityIndicator color={Color.themeColor} size={'large'} />
              </View>
            ) : (
              <FlatList
                decelerationRate={'fast'}
                ListEmptyComponent={() => {
                  return (
                    <NoData
                      style={{
                        height: windowHeight * 0.25,
                        width: windowWidth * 0.6,
                        alignItems: 'center',
                        // backgroundColor : 'red'
                      }}
                      text={'No Upcoming Orders'}
                    />
                  );
                }}
                showsHorizontalScrollIndicator={false}
                style={{
                  marginTop: moderateScale(10, 0.3),
                }}
                contentContainerStyle={{
                  paddingHorizontal: moderateScale(8, 0.3),
                }}
                data={orderData
                  ?.filter(item => item?.status == 'pending')
                  .reverse().slice(0,5)}
                horizontal
                renderItem={({item, index}) => {
                  return <OrderCard item={item} />;
                }}
              />
            )}
            <CustomText
              isBold
              style={[
                {
                  fontSize: moderateScale(15, 0.3),
                  width: windowWidth,
                  marginTop: moderateScale(10, 0.3),
                  color: Color.white,

                  marginLeft: moderateScale(10, 0.3),
                },
              ]}>
              Completed Orders
            </CustomText>
            {isLoading ? (
              <View
                style={{height: windowHeight * 0.23, justifyContent: 'center'}}>
                <ActivityIndicator color={Color.themeColor} size={'large'} />
              </View>
            ) : (
              <FlatList
                decelerationRate={'fast'}
                showsVerticalScrollIndicator={false}
                style={{
                  marginTop: moderateScale(10, 0.3),
                }}
                contentContainerStyle={{
                  paddingHorizontal: moderateScale(8, 0.3),
                }}
                data={orderData?.filter(item => item?.status == 'complete')}
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
                numColumns={1}
                renderItem={({item, index}) => {
                  return <CompletedOrderCard item={item} />;

                  //  <OrderCard item={item} />;
                }}
              />
            )}
          </ScrollView>
        )}
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default Homescreen;

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
    backgroundColor: 'black',
    marginTop: moderateScale(10, 0.3),
  },
  viewAll: {
    color: Color.white,
    fontSize: moderateScale(12, 0.3),
  },
  mapview: {
    // backgroundColor: 'red',
    width: windowWidth * 0.76,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(5, 0.6),
  },
});
