import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from '../Components/CustomText';
import Modal from 'react-native-modal';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import BookingHistoryModal from '../Components/BookingHistoryModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomImage from '../Components/CustomImage';
import {CardField, createToken} from '@stripe/stripe-react-native';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useDispatch, useSelector} from 'react-redux';
import {setUserData, setUserWallet} from '../Store/slices/common';
import {useNavigation} from '@react-navigation/native';

const Purchase = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const token = useSelector(state => state.authReducer.token);
  const [amount, setAmount] = useState();
  const [transactionAdd, setTransactionAdd] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCoins, setSelectedCoins] = useState(0);

  const [otherCoins, setOtherCoins] = useState(0);


  const [isVisible, setIsVisible] = useState(false);
  const coinsConfig = [
    {id: '1', coin: 10},
    {id: '2', coin: 20},
    {id: '3', coin: 30},
    {id: '4', coin: 40},
    {id: '5', coin: 50},
    {
      id: '6',
      coin: 'Other...',
      //   onPress: () => {
      //     setIsVisible(true);
      //   },
    },
  ];

  const addTransaction = async () => {
    const responsetoken = await createToken({
      type: 'Card',
    });
    if (responsetoken != undefined) {
      const body = {
        amount: selectedCoins == 'Other...' ? otherCoins : selectedCoins,
        reason: 'Coin Purchase',
        type: 'debit',
        pm_id: responsetoken?.token?.id,
      };

      const url = 'auth/transaction';
      setIsLoading(true);
      const response = await Post(url, body, apiHeader(token));
      setIsLoading(false);
      if (response != undefined) {
        
        // dispatch(setUserData(response?.data?.user_info));
        dispatch(setUserWallet(response?.data?.user_info?.wallet));
        setIsVisible(false);
        navigation.goBack();
      }
    }
  };

  //   useEffect(() => {
  //     addTransaction();
  //   }, []);

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      showUser={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.1, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: windowHeight * 0.155,
            justifyContent: 'center',
            // paddingTop : moderateScale(20,0.3),
            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              height: windowHeight * 0.8,
            }}>
            <View>
              <CustomText isBold style={styles.text1}>
                Buy Coins
              </CustomText>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                //
              }}>
              <View
                style={{
                  //   backgroundColor:'red',
                  height: windowHeight * 0.3,
                  width: windowWidth * 0.6,
                }}>
                <CustomImage
                  style={{
                    height: '100%',
                    width: '100%',
                  }}
                  source={require('../Assets/Images/Coins-main.png')}
                  // resizeMode={'cover'}
                />
              </View>
              <CustomText
                style={{
                  marginHorizontal: moderateScale(40, 0.6),
                  fontSize: moderateScale(60, 0.6),
                  color: Color.themeColor,
                  position: 'absolute',
                  bottom: 0,
                  right: 10,
                    // backgroundColor: 'red',
                }}>
                {/* hfsdhfg */}

                {selectedCoins != 'Other...' && selectedCoins}
              </CustomText>
            </View>

            <View style={styles.buttons}>
              <FlatList
                scrollEnabled={false}
                numColumns={2}
                data={coinsConfig}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                  <CustomButton
                    textColor={Color.black}
                    onPress={() => {
                        //  if (selectedCoins =='Other...') {
                        // setIsVisible(true)
                        //  } else {
                      setSelectedCoins(item?.coin);
                        //  }
                    }}
                    // elevation={true}
                    width={windowWidth * 0.4}
                    marginTop={moderateScale(37, 0.7)}
                    margin={moderateScale(13, 0.6)}
                    height={windowHeight * 0.05}
                    borderRadius={moderateScale(25, 0.6)}
                    text={`${item.coin} Coins`}
                    fontSize={moderateScale(14, 0.3)}
                    textTransform={'uppercase'}
                    isGradient={true}
                    gradientColor={
                      item?.coin == selectedCoins
                        ? Color.btnColor
                        : ['white', 'white']
                    }
                    isBold
                  />
                )}
              />
            </View>

            {(selectedCoins > 0|| selectedCoins == 'Other...') && (
              <CustomButton
                textColor={Color.black}
                onPress={() => {
                  setIsVisible(true);
                }}
                width={windowWidth * 0.35}
                height={windowHeight * 0.05}
                borderRadius={moderateScale(25, 0.6)}
                text={'Proceed'}
                marginTop={moderateScale(19, 0.6)}
                fontSize={moderateScale(14, 0.3)}
                textTransform={'uppercase'}
                isGradient={true}
                isBold
              />
            )}
          </View>
        </ScrollView>
      </LinearGradient>
      <Modal
        isVisible={isVisible}
        onBackdropPress={() => {
          setIsVisible(false);
        }}>
        <View style={styles.modal}>
          <View style={styles.header}>
            <CustomText
              isBold
              style={{
                color: Color.white,
                fontSize: moderateScale(15, 0.6),
              }}>
              Add Card Details
            </CustomText>
          </View>
          {/* <TextInputWithTitle/> */}
          {selectedCoins == 'Other...' && (
            <TextInputWithTitle
              titleText={'Enter Your Coins'}
              placeholder={'Enter Your Coins'}
              setText={setOtherCoins}
              value={otherCoins}
              viewHeight={0.06}
              viewWidth={0.74}
              inputWidth={0.74}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(20, 0.3)}
              marginBottom={moderateScale(20, 0.7)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(30, 0.4)}
              keyboardType={'numeric'}
            />
          )}

          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: Color.white,
              borderRadius: moderateScale(15, 0.6),
              width: windowWidth * 0.4,
              borderRadius: moderateScale(35, 0.6),
              textColor:'black'
            }}
            style={{
              width: '85%',
              height: windowHeight * 0.07,
              marginVertical: moderateScale(10, 0.3),
            }}
            onCardChange={cardDetails => {
            
            }}
            onFocus={focusedField => {
            }}
          />
          {/* </View> */}
          <CustomButton
            textColor={Color.black}
            text={
              isLoading ? (
                <ActivityIndicator color={'black'} size={'small'} />
              ) : (
                'Purchase'
              )
            }
            onPress={() => {
              addTransaction();
            }}
            width={windowWidth * 0.35}
            height={windowHeight * 0.05}
            borderRadius={moderateScale(25, 0.6)}
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
            disabled={isLoading}
          />
        </View>
      </Modal>
    </ScreenBoiler>
  );
};

export default Purchase;
const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.03,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // backgroundColor : Color.green
  },
  header: {
    width: '100%',
    height: windowHeight * 0.07,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: moderateScale(10, 0.6),
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
  buttons: {
    // flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    width: windowWidth,
  },
  modal: {
    backgroundColor: Color.black,
    backgroundColor: 'rgba(109, 106, 108, 0.72)',
    // backgroundColor: 'rgba(76, 73, 75, 0.79)',
    // backgroundColor: 'rgba(36, 35, 36, 0.53)',
    backgroundColor: 'rgba(58, 56, 56, 0.63)',

    borderRadius: moderateScale(14, 0.4),
    borderWidth: 2,
    borderColor: Color.themeColor,
    width: windowWidth * 0.9,
    // height: windowHeight * 0.3,
    paddingBottom: moderateScale(20, 0.6),
    flexDirection: 'column',
    alignItems: 'center',
    // paddingTop: windowHeight * 0.03,
    gap: 12,
    overflow: 'hidden',
  },
});
