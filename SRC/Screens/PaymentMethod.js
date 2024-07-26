import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import {useDispatch, useSelector} from 'react-redux';
import {Get, Patch, Post} from '../Axios/AxiosInterceptorFunction';
import {CardField, createPaymentMethod, useStripe , BillingDetails} from '@stripe/stripe-react-native';
import {Icon} from 'native-base';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {userData} from '../Store/Actions/authAction';
import ScreenBoiler from '../Components/ScreenBoiler';
import {windowHeight, windowWidth} from '../Utillity/utils';
import Modal from 'react-native-modal';
import CustomButton from '../Components/CustomButton';
import TextInputWithTitle from '../Components/TextInputWithTitle';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;

const PaymentMethod = props => {
  const dispatch = useDispatch();
  const [isModalVisible , setIsModalVisible] = useState(false);
  const [isLoading , setIsLoading] = useState(false);
  const isDelete = true;
  const [cardData, setCardData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
  });


const addCard = async ()=>{
  const billingDetails: BillingDetails = {
    email: 'syedbaber115@gmail.com',
    name : 'Syed Baber Ali',
    phone : '03112048588',
    address : {
      city : 'karachi',
    }
  };
  setIsLoading(true);
  const responseData = await createPaymentMethod({type: 'Card' ,
  paymentMethodData : {
    billingDetails,
  }
  
});
  setIsLoading(false);
  if(responseData != undefined){
 
  }

}

  //   const {
  //     isDelete,
  //     eventId,
  //     newMileStones,
  //     vendorId,
  //     addonData,
  //     subscriptionId,
  //     subscriptionTitle,
  //   } = props?.route?.params;

  //   const [alertText, setAlertText] = useState(null);
  //   const [alertTitle, setAlertTitle] = useState(null);
  //   const [alertIconType, setAlertIconType] = useState(1);
  //   const [alertModalOpen, setAlertModalOpen] = useState(false);

  //   const [responseData, setResponseData] = useState([]);
  //   const [PMid, setPMid] = useState(null);
  //   const {createPaymentMethod} = useStripe();

  //   const [loading, setLoading] = useState(false);
  //   const [showCardModal, setShowCardModal] = useState(false);

  //   const [cardloading, setCardLoading] = useState(false);
  //   const [selectedCardId, setSelectedCardId] = useState(null);
  //   const [isMilsStonePay, setIsMilsStonePay] = useState(false);

  //   let getPaymentMethodApiUrl = URL('v1/users/payment-methods');
  //   let attachPMApiUrl = URL('v1/users/attach-payment-methods');
  //   let detachPMApiUrl = URL('v1/users/detach-payment-methods');
  //   let PayMileStoneApiUrl = URL(`v1/event/add/milestone/${eventId}`);
  //   let PayAddonApiUrl = URL(`v1/event/add/addons/${eventId}`);
  //   let PaySubsciptionApiUrl = URL(`v1/users/create-subscription`);

  //   const Headers = apiHeader(accessToken);

  //   const getPaymentMethodList = async () => {
  //     setLoading(true);
  //     let requestResponse = await Get(getPaymentMethodApiUrl, accessToken);
  //     if (requestResponse !== undefined) {
  //       setResponseData(requestResponse?.data?.data);
  //     }
  //     setLoading(false);
  //   };

  //   useEffect(() => {
  //     getPaymentMethodList();
  //   }, []);

  //   useEffect(() => {
  //     if (PMid !== null) {
  
  //     }
  //   }, [PMid]);

  //   const AddCardPayPress = async () => {
  //     setCardLoading(true);
  //     const responseData = await createPaymentMethod({type: 'Card'});

  //     if (responseData?.error) {
  //       setShowCardModal(false);
  //       await sleep(300);
  //       alert(responseData?.error.message);
  //       //   setAlertIconType(0);
  //       //   setAlertTitle(reduxTextObject?.Error);
  //       //   setAlertText(responseData?.error.message);
  //       //   setAlertModalOpen(true);
  //     } else {
  //       let attachResponse = await Post(
  //         attachPMApiUrl,
  //         {pmId: responseData?.paymentMethod?.id},
  //         Headers,
  //       );
  //       if (attachResponse !== undefined) {
  //         setShowCardModal(false);
  //         setResponseData(attachResponse?.data?.data);
  //         await sleep(300);
  //         // setAlertIconType(1);
  //         // setAlertTitle(reduxTextObject?.Success);
  //         // setAlertText(reduxTextObject?.Successfully_Added);
  //         // setAlertModalOpen(true);
  //         alert('successfully added');
  //       }
  //     }
  //     setCardLoading(false);
  //   };

  //   const renderCardList = ({item, index}) => {
  //     let imageUrl = require('../Assets/Images/visa.png');
  //     let isOthers = false;

  //     if (item.card.brand == 'visa') {
  //       imageUrl = require('../Assets/Images/visa.png');
  //     } else if (item.card.brand == 'mastercard') {
  //       imageUrl = require('../Assets/Images/master.png');
  //     } else if (item.card.brand == 'amex') {
  //       imageUrl = require('../Assets/Images/americanExpress.png');
  //     } else if (item.card.brand == 'discover') {
  //       imageUrl = require('../Assets/Images/discover.png');
  //     } else if (item.card.brand == 'jcb') {
  //       imageUrl = require('../Assets/Images/jcb.png');
  //     } else if (item.card.brand == 'UnionPay') {
  //       imageUrl = require('../Assets/Images/unionPay.png');
  //     } else {
  //       isOthers = true;
  //       imageUrl = require('../Assets/Images/otherCards.png');
  //     }

  //     return (
  //       <ImageBackground
  //         source={imageUrl}
  //         resizeMode="stretch"
  //         style={[styles?.cardContainer]}
  //       >
  //         <CustomText style={[styles.cardNumberText]}>
  //           {item?.card?.last4}
  //         </CustomText>
  //         <CustomText style={[styles.cardExpireText]}>
  //           {item?.card?.exp_month}/{item?.card?.exp_year}
  //         </CustomText>
  //         {isOthers && (
  //           <CustomText style={[styles.cardBrand]} isBold>
  //             {item.card.brand}
  //           </CustomText>
  //         )}
  //         <TouchableOpacity
  //           activeOpacity={0.9}
  //           onPress={() => {
  //             isDelete
  //               ? cardloading == false && SubmitDetachCard(item?.id)
  //               : cardloading == false &&
  //                 (subscriptionId
  //                   ? HandleSubcriptionPay(item?.id, false)
  //                   : addonData
  //                   ? HandleAddonPay(item?.id, false)
  //                   : HandleMileStonePay(item?.id, false));
  //           }}
  //           style={[
  //             styles?.addBtnShadow,
  //             {
  //               position: 'absolute',
  //               right: -20,
  //               top: '34%',
  //             },
  //           ]}
  //         >
  //           <LinearGradient
  //             style={[styles?.cardIconContainer, styles?.addBtnShadow]}
  //             start={{x: 0, y: 0}}
  //             end={{x: 1, y: 0}}
  //             colors={[Color.themePurpleLevel4, Color.themePurpleLevel3]}
  //           >
  //             {cardloading && item?.id == selectedCardId ? (
  //               <ActivityIndicator size="small" color={Color.white} />
  //             ) : (
  //               <Icon
  //                 as={isDelete ? MaterialCommunityIcons : AntDesign}
  //                 name={isDelete ? 'delete' : 'right'}
  //                 style={[{color: Color.white}]}
  //                 size={moderateScale(27, 0.6)}
  //               />
  //             )}
  //           </LinearGradient>
  //         </TouchableOpacity>
  //       </ImageBackground>
  //     );
  //   };

  //   const SubmitDetachCard = async id => {
  //     setSelectedCardId(id);
  //     let data = {
  //       pmId: id,
  //     };
  //     setCardLoading(true);
  //     let detachResponse = await Post(detachPMApiUrl, data, Headers);
  //     if (detachResponse !== undefined) {
  //       setResponseData(detachResponse?.data?.data);
  //       setAlertIconType(1);
  //       setAlertTitle(reduxTextObject?.Success);
  //       setAlertText(reduxTextObject?.Successfully_detached);
  //       setAlertModalOpen(true);
  //     }
  //     setSelectedCardId(null);
  //     setCardLoading(false);
  //   };

  //   const EmptyCardList = () => {
  //     return (
  //       <View
  //         style={{
  //           width: Dimensions.get('window').width,
  //           justifyContent: 'center',
  //           alignItems: 'center',
  //           height: height * 0.7,
  //         }}
  //       >
  //         <Image
  //           source={require('../Assets/Images/cardNotFound.png')}
  //           resizeMode="contain"
  //           style={{
  //             width: width * 0.4,
  //             height: width * 0.4,
  //             borderRadius: (width * 0.4) / 2,
  //             tintColor: Color.themePurpleLevel4,
  //           }}
  //         />
  //         <CustomText
  //           style={{
  //             textAlign: 'center',
  //             fontSize: moderateScale(20, 0.3),
  //             color: Color.themePurpleLevel4,
  //             marginTop: moderateScale(10, 0.3),
  //           }}
  //           isBold
  //         >
  //           {reduxTextObject?.Card_Not_Found}
  //         </CustomText>
  //       </View>
  //     );
  //   };

  //   const CloseHandler = () => {
  //     setShowCardModal(false);
  //   };

  //   const HandleMileStonePay = async (PMId, isWallet) => {
  //     setCardLoading(true);
  //     setIsMilsStonePay(true);
  //     setSelectedCardId(PMId);
  //     const params = {
  //       milestones: newMileStones,
  //       wallet: isWallet,
  //       minutes: moment(moment().format())._tzm,
  //       pmId: isWallet ? undefined : PMId,
  //       vendor: vendorId,
  //     };

  //     const response = await Patch(PayMileStoneApiUrl, params, Headers);
  //     if (response !== undefined) {
  //       setAlertIconType(1);
  //       setAlertTitle(reduxTextObject?.Success);
  //       setAlertText(reduxTextObject?.Milestones_Successfully_Created);
  //       setAlertModalOpen(true);
  //     } else {
  //       setIsMilsStonePay(false);
  //     }
  //     setSelectedCardId(null);

  //     setCardLoading(false);
  //   };

  //   const HandleAddonPay = async (PMId, isWallet) => {
  //     setCardLoading(true);
  //     setIsMilsStonePay(true);
  //     setSelectedCardId(PMId);
  //     const params = {
  //       price: addonData?.price,
  //       name: addonData?.title,
  //       description: addonData?.description,
  //       wallet: isWallet,
  //       pmId: isWallet ? undefined : PMId,
  //     };

  //     const response = await Patch(PayAddonApiUrl, params, Headers);
  //     if (response !== undefined) {
  //       setAlertIconType(1);
  //       setAlertTitle(reduxTextObject?.Success);
  //       setAlertText(reduxTextObject?.Addon_Amount_paid_Successfully);
  //       setAlertModalOpen(true);
  //     } else {
  //       setIsMilsStonePay(false);
  //     }
  //     setSelectedCardId(null);
  //     setCardLoading(false);
  //   };
  //   const HandleSubcriptionPay = async (PMId, isWallet) => {
  //     setCardLoading(true);
  //     setIsMilsStonePay(true);
  //     setSelectedCardId(PMId);
  //     const params = {
  //       planId: subscriptionId,
  //       paymentMethodId: isWallet ? undefined : PMId,
  //       title: subscriptionTitle,
  //       wallet: isWallet,
  //     };

  //     const response = await Post(PaySubsciptionApiUrl, params, Headers);
  //     if (response !== undefined) {
  //       dispatch(userData(response?.data?.data));
  //       setAlertIconType(1);
  //       setAlertTitle(reduxTextObject?.Success);
  //       setAlertText(reduxTextObject?.Package_Subcribe_Successfully);
  //       setAlertModalOpen(true);
  //     } else {
  //       setIsMilsStonePay(false);
  //     }
  //     setSelectedCardId(null);
  //     setCardLoading(false);
  //   };

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
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
              // paddingTop : moderateScale(20,0.3),
              alignItems: 'center',
            }}
            style={{
              width: windowWidth,
            }}>
                <CustomText isBold style={styles.text1}>
           Attached Cards
          </CustomText>
        <ImageBackground
          source={require('../Assets/Images/master.png')}
          resizeMode="contain"
          style={[styles?.cardContainer]}>
          {/* <CustomText style={[styles.cardNumberText]}>{'1234'}</CustomText>
        <CustomText style={[styles.cardExpireText]}>
          {'02'}/{'26'}
        </CustomText> */}
          {/* {isOthers && (
          <CustomText style={[styles.cardBrand]} isBold>
            {'Visa'}
          </CustomText> */}
          {/* )} */}
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => {
              //   isDelete
              //     ? cardloading == false && SubmitDetachCard(item?.id)
              //     : cardloading == false &&
              //       (subscriptionId
              //         ? HandleSubcriptionPay(item?.id, false)
              //         : addonData
              //         ? HandleAddonPay(item?.id, false)
              //         : HandleMileStonePay(item?.id, false));
              alert('Card will be detached');
            }}
            style={[
              styles?.addBtnShadow,
              {
                position: 'absolute',
                right: moderateScale(-25, 0.3),
                top: '40%',
              },
            ]}>
            <LinearGradient
              style={[styles?.cardIconContainer, styles?.addBtnShadow]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={Color.btnColor}>
              {/* {cardloading && item?.id == selectedCardId ? (
                <ActivityIndicator size="small" color={Color.white} />
              ) : ( */}
              <Icon
                as={isDelete ? MaterialCommunityIcons : AntDesign}
                name={isDelete ? 'delete' : 'right'}
                style={[{color: Color.white}]}
                size={moderateScale(27, 0.6)}
              />
              {/* )} */}
            </LinearGradient>
          </TouchableOpacity>
        </ImageBackground>
      </ScrollView>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            // alert(
            //   'AddCard Modal Will open after connecting to stripe but only if above card is detached ',
            // );
            setIsModalVisible(true)
            // setShowCardModal(true);
          }}
          style={[
            styles.addBtnShadow,
            {
              position: 'absolute',
              padding: moderateScale(10, 0.3),
              bottom: moderateScale(50, 0.3),
              alignSelf: 'center',
            },
          ]}>
          <LinearGradient
            style={[styles.addBtnContainer, styles?.addBtnShadow]}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={Color.btnColor}>
            <Icon
              as={AntDesign}
              name="plus"
              style={[{color: Color.white}]}
              size={moderateScale(35, 0.6)}
            />
          </LinearGradient>
        </TouchableOpacity>
      
      </LinearGradient>

      <Modal
        hasBackdrop={true}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        isVisible={isModalVisible}
        onBackdropPress={()=>{
          setIsModalVisible(false)
        }}
        >
          <View style={{ overflow : 'hidden',borderRadius : moderateScale(5,0.3),width : windowWidth * 0.9 , height : windowHeight * 0.5 , backgroundColor : 'white' , alignItems : 'center'}}>
            <View style={styles.header}>
              <CustomText style={styles.headerText}>Add Card</CustomText>
            </View>
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: '#EAEAEA',
              textColor: '#000000',
              borderRadius : moderateScale(25, 0.3),

            }}
            style={{
              width: windowWidth * 0.75,
              height: windowHeight * 0.05,
              marginVertical: moderateScale(12,0.3),
             marginTop : moderateScale(30,0.3),
              borderColor : Color.lightGrey,

            }}
            
            onCardChange={cardDetails => {

            }}
            onFocus={focusedField => {

            }}
          />
          <TextInputWithTitle
            titleText={'Cardholder Name'}
            placeholder={'Cardholder Name'}
            setText={data => {
              setCardData(prev => {
                return {...prev, name: data};
              });
            }}
            value={cardData?.name}
            viewHeight={0.05}
            viewWidth={0.75}
            inputWidth={0.72}
            border={1}
            borderColor={Color.lightGrey}
            backgroundColor={'#EAEAEA'}
            // marginTop={moderateScale(8, 0.3)}
            color={'#11A44C'}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(20, 0.3)}

            // keyboardType={'numeric'}
          />
          {/* <View style={[styles.phoneView, {marginTop: moderateScale(8, 0.3)}]}> */}
            <TextInputWithTitle
              // titleText={'Email'}
              placeholder={'Email'}
              setText={data => {
                setCardData(prev => {
                  return {...prev, email: data};
                });
              }}
              value={cardData?.email}
              viewHeight={0.05}
              viewWidth={0.75}
              inputWidth={0.72}
              border={1}
              borderColor={Color.lightGrey}
              backgroundColor={'#EAEAEA'}
              marginTopDown={moderateScale(10, 0.3)}
              color={'#11A44C'}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(20, 0.3)}
              keyboardType={'numeric'}
              // marginTop={moderateScale(10, 0.3)}

/>

           
          {/* </View> */}
          <View style={[styles.phoneView, {marginTop: moderateScale(5, 0.3)}]}>
            <TextInputWithTitle
              // titleText={'contact'}
              placeholder={'Phone'}
              setText={data => {
                setCardData(prev => {
                  return {...prev, phone: data};
                });
              }}
              value={cardData?.phone}
              viewHeight={0.05}
              viewWidth={0.3}
              inputWidth={0.3}
              border={1}
              borderColor={Color.lightGrey}
              backgroundColor={'#EAEAEA'}
              //   marginTop={moderateScale(10, 0.3)}
              color={'#11A44C'}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(20, 0.3)}
              keyboardType={'numeric'}
            />

            <TextInputWithTitle
              // titleText={'City'}
              placeholder={'City'}
              setText={data => {
                setCardData(prev => {
                  return {...prev, city: data};
                });
              }}
              value={cardData?.city}
              viewHeight={0.05}
              viewWidth={0.3}
              inputWidth={0.3}
              border={1}
              borderColor={Color.lightGrey}
              backgroundColor={'#EAEAEA'}
              //   marginTop={moderateScale(10, 0.3)}
              color={'#11A44C'}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(20, 0.3)}
              keyboardType={'numeric'}
            />
          </View>

          <CustomButton
            // textTransform={"capitalize"}
            text={
              isLoading ? (
                <ActivityIndicator color={'#FFFFFF'} size={'small'} />
              ) : (
                'Submit'
              )
            }
            isBold
            textColor={Color.white}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={addCard}
            bgColor={Color.themeColor}
            borderColor={Color.white}
            borderWidth={2}
            borderRadius={moderateScale(30, 0.3)}
          />

          </View>
        </Modal>
    </ScreenBoiler>
    // <>
    //   <CustomStatusBar
    //     isGradient={false}
    //     backgroundColor={Color.white}
    //     barStyle={'dark-content'}
    //   />
    //   <View style={styles.container}>
    //     <ColorlessHeader mainProps={props} title={reduxTextObject?.Payment} />
    //     <View>
    //       {loading == true ? (
    //         <Loader
    //           bgColor={Color.white}
    //           textColor={Color.themePurpleLevel4}
    //           height={height * 0.85}
    //           width={width}
    //         />
    //       ) : (
    //         <>
    //           <FlatList
    //             nestedScrollEnabled
    //             showsVerticalScrollIndicator={false}
    //             data={responseData}
    //             style={{
    //               height: height * 0.775,
    //               paddingTop: moderateScale(10, 0.3),
    //             }}
    //             renderItem={renderCardList}
    //             keyExtractor={item => `${item?.id}`}
    //             ListEmptyComponent={EmptyCardList}
    //             ListHeaderComponent={() => {
    //               return isDelete !== true && user.wallet.balance > 0 ? (
    //                 <View style={[styles?.walletContainer]}>
    //                   <LinearGradient
    //                     start={{x: 0, y: 0}}
    //                     end={{x: 1, y: 0}}
    //                     colors={[
    //                       Color.themePurpleLevel4,
    //                       Color.themePurpleLevel3,
    //                     ]}
    //                     style={[styles?.gradientSectionContainer]}>
    //                     <CustomText
    //                       style={[
    //                         styles.generalHeadingText,
    //                         {
    //                           fontSize: moderateScale(25, 0.3),
    //                           paddingBottom: moderateScale(5, 0.3),
    //                         },
    //                       ]}
    //                       isBold>
    //                       ${user.wallet.balance.toFixed(2)}
    //                     </CustomText>

    //                     <CustomText style={[styles.generalHeadingText]}>
    //                       {reduxTextObject?.wallets}
    //                     </CustomText>
    //                   </LinearGradient>
    //                   <TouchableOpacity
    //                     activeOpacity={0.9}
    //                     onPress={() => {
    //                       cardloading == false &&
    //                         (subscriptionId
    //                           ? HandleSubcriptionPay(null, true)
    //                           : addonData
    //                           ? HandleAddonPay(null, true)
    //                           : HandleMileStonePay(null, true));
    //                     }}
    //                     style={[
    //                       styles?.addBtnShadow,
    //                       {
    //                         position: 'absolute',
    //                         right: -20,
    //                         top: '28%',
    //                       },
    //                     ]}>
    //                     <View
    //                       style={[
    //                         styles?.cardIconContainer,
    //                         styles?.addBtnShadow,
    //                         {
    //                           backgroundColor: Color.white,
    //                         },
    //                       ]}>
    //                       {cardloading && selectedCardId == null ? (
    //                         <ActivityIndicator
    //                           size="small"
    //                           color={Color.themePurpleLevel4}
    //                         />
    //                       ) : (
    //                         <Icon
    //                           as={isDelete ? MaterialCommunityIcons : AntDesign}
    //                           name={isDelete ? 'delete' : 'right'}
    //                           style={[{color: Color.themePurpleLevel4}]}
    //                           size={moderateScale(27, 0.6)}
    //                         />
    //                       )}
    //                     </View>
    //                   </TouchableOpacity>
    //                 </View>
    //               ) : null;
    //             }}
    //           />
    //           <TouchableOpacity
    //             activeOpacity={1}
    //             onPress={() => {
    //               setShowCardModal(true);
    //             }}
    //             style={[
    //               styles?.addBtnShadow,
    //               {
    //                 padding: 10,
    //               },
    //             ]}>
    //             <LinearGradient
    //               style={[styles.addBtnContainer, styles?.addBtnShadow, {}]}
    //               start={{x: 0, y: 0}}
    //               end={{x: 1, y: 0}}
    //               colors={[Color.themePurpleLevel4, Color.themePurpleLevel3]}>
    //               <Icon
    //                 as={AntDesign}
    //                 name="plus"
    //                 style={[{color: Color.white}]}
    //                 size={moderateScale(27, 0.6)}
    //               />
    //             </LinearGradient>
    //           </TouchableOpacity>
    //         </>
    //       )}
    //     </View>
    //   </View>

    //   <AddCardModal
    //     onPress={async () => {
    //       cardloading == false && AddCardPayPress();
    //     }}
    //     loading={cardloading}
    //     isModalVisible={showCardModal}
    //     close={() => {
    //       CloseHandler();
    //     }}
    //   />
    //   <CustomAlertModal
    //     isModalVisible={alertModalOpen}
    //     onClose={() => setAlertModalOpen(false)}
    //     onOKPress={() => {
    //       setAlertModalOpen(false);
    //       isMilsStonePay && props.navigation.pop(addonData ? 1 : 2);
    //     }}
    //     title={alertTitle}
    //     message={alertText}
    //     iconType={alertIconType}
    //   />
    // </>
  );
};

const styles = ScaledSheet.create({
  // container: {
  //   flex: 1,
  //   backgroundColor: Color.white,
  // },
  addBtnShadow: {
    shadowColor: '#51087E',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  header : {
    justifyContent : 'center',
    alignItems :'center',
    width : '100%',
    height : windowHeight * 0.06,
    backgroundColor : Color.themeColor,
    borderBottomLeftRadius : moderateScale(10,0.3),
    borderBottomRightRadius : moderateScale(10,0.3),

  },
  addBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(50, 0.3),

    width: moderateScale(80, 0.3),
    height: moderateScale(80, 0.3),
  },
  phoneView: {
    width: windowWidth * 0.75,
    paddingVertical: moderateScale(5, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginTop: moderateScale(20, 0.3),
    // backgroundColor: 'rsed',
  }, 
  cardContainer: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.33,
    alignSelf: 'center',
    position: 'relative',
    marginBottom: moderateScale(20, 0.3),
    // backgroundColor: 'red',
  },
  cardIconContainer: {
    borderRadius: moderateScale(50, 0.3),
    alignSelf: 'center',
    padding: moderateScale(10, 0.3),
  },
  cardNumberText: {
    color: Color.white,
    position: 'absolute',
    right: '15%',
    top: '45%',
    fontSize: moderateScale(15, 0.3),
  },
  cardExpireText: {
    color: Color.white,
    position: 'absolute',
    left: '5%',
    bottom: '10%',
    fontSize: moderateScale(15, 0.3),
  },
  cardBrand: {
    color: Color.white,
    position: 'absolute',
    right: '5%',
    top: '10%',
    fontSize: moderateScale(25, 0.3),
    textTransform: 'uppercase',
  },
  gradientSectionContainer: {
    width: width * 0.85,
    paddingVertical: height * 0.035,
    borderRadius: moderateScale(10, 0.3),
    paddingHorizontal: moderateScale(15, 0.3),
    alignSelf: 'center',
  },
  walletContainer: {
    overflow: 'visible',
    position: 'relative',
    width: width * 0.85,
    alignSelf: 'center',
    marginBottom: moderateScale(20, 0.3),
  },
  generalHeadingText: {
    color: Color.white,
    fontSize: moderateScale(18, 0.3),
    textTransform: 'capitalize',
  },
  headerText : {
    color : Color.white , 
    fontSize : moderateScale(17,0.3),
    fontWeight : 'bold'
  },
  container: {
    paddingTop: windowHeight * 0.03,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // backgroundColor : Color.themeColor
  },
  text1: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(20, 0.3),
    // marginTop : moderateScale(10,0.3),
    // lineHeight: moderateScale(32, 0.3),
  },
});

export default PaymentMethod;
