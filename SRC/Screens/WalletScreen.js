import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../Assets/Utilities/Color';
import NoData from '../Components/NoData';
import TransactionhistoryCard from '../Components/TransactionhistoryCard';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import moment from 'moment';
import {useIsFocused, useNavigation} from '@react-navigation/native';

const WalletScreen = () => {
  const focused = useIsFocused();
  const navigation = useNavigation();
  const userData = useSelector(state => state.commonReducer.userData);
  const userWallet = useSelector(state => state.commonReducer.userWallet);
  
  const token = useSelector(state => state.authReducer.token);

  const [loading, setLoading] = useState(false);
  const [Transactionhistory, setTransactionHistory] = useState([]);
  const [loadMore, setLoadMore] = useState(false);

  const [pageNum, setPageNum] = useState(1);
  const [getMore, setGetMore] = useState(false);

  const userTransactionList = async type => {
    const url = `auth/transaction?page=${pageNum}`;
    type == 'loadMore' ? setLoadMore(true) : setLoading(true);
    const response = await Get(url, token);
    type == 'loadMore' ? setLoadMore(false) : setLoading(false);
    setLoading(false);
    if (response != undefined) {
      if (type == 'loadMore') {
        setTransactionHistory(prev => [...prev, ...response?.data?.date?.data]);
      } else {
        setTransactionHistory(response?.data?.date?.data);
      }
    }
  };

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 10;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };
  useEffect(() => {
    userTransactionList();
  }, [focused]);

  useEffect(() => {
    setPageNum(1);
  }, [Transactionhistory]);

  useEffect(() => {
    if (pageNum > 1) {
      userTransactionList('loadMore');
    }
  }, [pageNum]);

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
        <CustomText isBold style={styles.text}>
          MY WALLET
        </CustomText>

        <View style={styles.Card}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: moderateScale(10, 0.3),
              //   backgroundColor:'yellow',
              paddingHorizontal: moderateScale(20, 0.6),
            }}>
            <View style={{alignItems: 'center'}}>
              <CustomText isBold style={styles.text1}>
                Balance
              </CustomText>
              <CustomText isBold style={styles.text2}>
                {moment().format('MMM Do YYYY')}
                {/* Today, 21 Feb */}
              </CustomText>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Purchase');
              }}
              style={{
                flexDirection: 'row',
                height: windowHeight * 0.04,
                width: windowWidth * 0.17,
                borderWidth: moderateScale(2, 0.3),
                borderColor: '#E3A33D',
                borderRadius: moderateScale(6, 0.3),
                justifyContent: 'space-evenly',
                alignItems: 'center',
                padding: moderateScale(2, 0.3),
              }}>
              <CustomText isBold style={{color: '#E3A33D'}}>
                +
              </CustomText>
              <CustomText
                isBold
                style={{color: '#E3A33D', fontSize: moderateScale(12, 0.6)}}>
                Add
              </CustomText>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: moderateScale(15, 0.3),
              //    backgroundColor:'red'
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(70, 0.6),
                color: Color.lightGrey,
                marginLeft: moderateScale(10, 0.3),
              }}>
              {/* 8219 */}
              {userWallet?.amount}
            </CustomText>

            <CustomText
              style={{
                fontSize: 24,
                color: 'rgba(238,238,238,0.8)',
                marginLeft: moderateScale(5, 0.3),
              }}>
              coins
            </CustomText>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: moderateScale(15, 0.3),
              marginTop: moderateScale(-10, 0.3),
              marginTop: moderateScale(8, 0.3),
            }}>
            <CustomText
              style={{
                fontSize: moderateScale(12, 0.6),
                color: 'rgba(238,238,238,0.5)',
              }}>
              1 coin is equals to $1
            </CustomText>
          </View>
        </View>
        {loading ? (
          <View
            style={{
              width: windowWidth,
              height: windowHeight * 0.4,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator size={'large'} color={Color.themeColor} />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            // decelerationRate={'fast'}
            numColumns={1}
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
              paddingBottom: moderateScale(200, 0.6),
            }}
            data={Transactionhistory}
            renderItem={({item, index}) => {
              return <TransactionhistoryCard item={item} />;
            }}
            keyExtractor={item => item?.id}
            onScrollEndDrag={({nativeEvent}) => {
              {
                if (isCloseToBottom(nativeEvent)) {
                  setPageNum(prev => prev + 1);
                  setGetMore(true);
                }
              }
            }}
            ListFooterComponent={() => {
              return (
                loadMore && (
                  <View
                    style={{
                      // height: windowHeight * 0.1,
                      width: windowWidth,
                      // backgroundColor: 'red',
                      marginTop: moderateScale(10, 0.3),
                    }}>
                    <ActivityIndicator
                      size={moderateScale(35, 0.6)}
                      color={Color.themeColor}
                    />
                  </View>
                )

                // loadMore && (
                //   <View
                //     style={{
                //       height :windowHeight*0.5,
                //       width :windowWidth,
                //       alignSelf: 'center',
                //     }}>
                //   </View>
                // )
              );
            }}
          />
        )}

        <View
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}>
          <CustomImage
            source={require('../Assets/Images/backgroundLogo.png')}
            resizeMode={'stretch'}
          />
        </View>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default WalletScreen;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
  },
  text: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(24, 0.3),
  },

  text1: {
    color: Color.lightGray,
    fontSize: moderateScale(20, 0.3),
  },

  text2: {
    color: 'rgba(238,238,238,0.5)',
    fontSize: moderateScale(11, 0.3),
  },

  Card: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.25,
    backgroundColor: '#333333',
    alignSelf: 'center',
    borderRadius: moderateScale(15, 0.3),
    marginTop: moderateScale(30, 0.3),
    elevation: 2,
  },
});
