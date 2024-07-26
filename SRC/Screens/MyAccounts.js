import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  KeyboardAvoidingView
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ImageView from 'react-native-image-viewing';
import ScreenBoiler from '../Components/ScreenBoiler';
import {Icon} from 'native-base';
import CustomImage from '../Components/CustomImage';
import {setUserData} from '../Store/slices/common';
import {Patch, Post} from '../Axios/AxiosInterceptorFunction';
import ImagePickerModal from '../Components/ImagePickerModal';
import {formRegEx, formRegExReplacer, imageUrl} from '../Config';
import CustomButton from '../Components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';
import Feather from 'react-native-vector-icons/Feather';
import HolidayModal from '../Components/HolidayModal';
import TravelModal from '../Components/TravelModal';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import SelectLocationModal from '../Components/SelectLocationModal';

const MyAccounts = props => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.commonReducer.userData);


  const token = useSelector(state => state.authReducer.token);

  const [showModal, setShowModal] = useState(false);
  const [imageObject, setImageObject] = useState({});
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [phone, setPhone] = useState(user?.phone);
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(
    user?.location == null
      ? {}
      : {name: user?.location, lng: user?.lng, lat: user?.lat},
  );
  const [selectLocationModal, setselectLocationModal] = useState(false);
  const [country, setCountry] = useState(user?.country);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [travelDateFrom, setTravelDateFrom] = useState(user?.travel_date_from ? user?.travel_date_from :'');
  const [travelDateTo, setTravelDateTo] = useState(user?.travel_date_to ? user?.travel_date_to :'');
  const [isHolidayMode, setIsHolidayMode] = useState(
    user?.holiday_mode ? user?.holiday_mode : false,
  );
  const [temproaryAddress, setTemproaryAddress] = useState(
    user?.temporary_address == null ? {} : user?.temporary_address,
  );
  const [rushService, setRushService] = useState(
    user?.rush_service ? user?.rush_service : false,
  );

  const imageArray =
    Object.keys(imageObject).length > 0
      ? [
          {
            uri: imageObject.uri,
          },
        ]
      : [
          {
            uri: `${user?.photo}`,
          },
        ];

  const EditProfile = async () => {
    const params = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      address_name: address?.name,
      address_lat: address?.lat,
      address_lng: address?.lng,
      rush_service: rushService == true ? 1 : 0,
      holiday_mode: isHolidayMode == true ? 1 : 0,
    };
    const formdata = new FormData();
    for (let key in params) {
      if ([undefined, '', null].includes(params[key])) {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`Required field is empty`, ToastAndroid.SHORT)
          : Alert.alert(`Required field is empty`);
      }
      formdata.append(key, params[key]);
    }
    if (Object.keys(imageObject).length > 0) {
      formdata.append('photo', imageObject);
    }
    if (Object.keys(temproaryAddress).length > 0) {
      formdata.append('temporary_address_name', temproaryAddress?.name);
      formdata.append('temporary_address_lat', temproaryAddress?.lat);
      formdata.append('temporary_address_lng', temproaryAddress?.lng);
      formdata.append('travel_date_from', travelDateFrom);
      formdata.append('travel_date_to', travelDateTo);
      formdata.append('travel_mode', 1);
    } else {
      formdata.append('travel_mode', 0);
    }

    const url = 'auth/profile';
    setIsLoading(true);
    const response = await Post(url, formdata, apiHeader(token));
    setIsLoading(false);
    if (response !== undefined) {

      dispatch(setUserData(response?.data?.user_info));

      Platform.OS == 'android'
        ? ToastAndroid.show('Profile Updated Succesfully', ToastAndroid.SHORT)
        : Alert.alert('Profile Updated Succesfully');
      // props.navigation.goBack();
    }
  };

  const CustomerEditProfile = async () => {
    const params = {
      first_name: firstName,
      last_name: lastName,
      phone: phone,
      email: email,
      address_name: address?.name,
      address_lat: address?.lat,
      address_lng: address?.lng,
    };
    const formdata = new FormData();
    for (let key in params) {
      if ([undefined, '', null].includes(params[key])) {
        return Platform.OS == 'android'
          ? ToastAndroid.show(`Required field is empty`, ToastAndroid.SHORT)
          : Alert.alert(`Required field is empty`);
      }
      formdata.append(key, params[key]);
    }
    if (Object.keys(imageObject).length > 0) {
      formdata.append('photo', imageObject);
    }


    const url = 'auth/profile';
    setIsLoading(true);
    const response = await Post(url, formdata, apiHeader(token));
    setIsLoading(false);

    if (response !== undefined) {

      dispatch(setUserData(response?.data?.user_info));

      Platform.OS == 'android'
        ? ToastAndroid.show('Profile Updated Succesfully', ToastAndroid.SHORT)
        : Alert.alert('Profile Updated Succesfully');
      // props.navigation.goBack();
    }
  };

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

<KeyboardAvoidingView    
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        
        
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: windowHeight * 0.18,
            // paddingTop : moderateScale(20,0.3),
            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
          }}>
          <View>
            {Object.keys(imageObject).length > 0 ? (
              <CustomImage
                onPress={() => {
                  setIsVisible(true);
                }}
                source={{uri: imageObject?.uri}}
                style={[styles.image]}
              />
            ) : (
              <CustomImage
                onPress={() => {
                  setIsVisible(true);
                }}
                style={[styles.image]}
                source={
                  user?.photo
                    ? {uri: `${user?.photo}`}
                    : require('../Assets/Images/user.png')
                }
              />
            )}

            <TouchableOpacity
              activeOpacity={0.9}
              style={{
                width: moderateScale(30, 0.3),
                height: moderateScale(30, 0.3),
                borderRadius: moderateScale(15, 0.3),
                backgroundColor: Color.themeColor,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                bottom: moderateScale(8, 0.3),
                right: moderateScale(10, 0.3),
              }}
              onPress={() => setShowModal(true)}>
              <Icon
                name="pencil"
                as={FontAwesome}
                size={moderateScale(18, 0.3)}
                color={Color.white}
              />
            </TouchableOpacity>
          </View>
          <TextInputWithTitle
            iconName={'user'}
            iconType={FontAwesome}
            titleText={'First Name'}
            secureText={false}
            placeholder={'First Name'}
            setText={setFirstName}
            value={firstName}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.74}
            // border={1}
            // borderColor={'#1B5CFB45'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(12, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(30, 0.4)}
          />
          <TextInputWithTitle
            iconName={'user'}
            iconType={FontAwesome}
            titleText={'Last Name'}
            secureText={false}
            placeholder={'Last Name'}
            setText={setLastName}
            value={lastName}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.74}
            // border={1}
            // borderColor={'#1B5CFB45'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(12, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(30, 0.4)}
          />
          <TextInputWithTitle
            iconName={'phone'}
            iconType={FontAwesome}
            titleText={'Phone'}
            secureText={false}
            placeholder={'Phone'}
            setText={setPhone}
            value={phone}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.74}
            // border={1}
            // borderColor={'#1B5CFB45'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(12, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(30, 0.4)}
            disable={true}
          />
          <TextInputWithTitle
            iconName={'envelope'}
            iconType={FontAwesome}
            // disable
            titleText={'Email'}
            secureText={false}
            placeholder={'Email'}
            setText={setEmail}
            value={email}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.74}
            // border={1}
            // borderColor={'#1B5CFB45'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(12, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(30, 0.4)}
            disable
          />
          <TouchableOpacity
            onPress={() => {
              setselectLocationModal(true);
            }}>
            <TextInputWithTitle
              iconName={'map-pin'}
              iconType={Feather}
              // disable
              titleText={'address'}
              secureText={false}
              placeholder={'Address'}
              setText={setAddress}
              value={address?.name}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.6}
              // border={1}
              // borderColor={'#1B5CFB45'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(12, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(30, 0.4)}
              disable
            />
          </TouchableOpacity>

          {/* <TextInputWithTitle
            iconName={'globe'}
            iconType={FontAwesome}
            titleText={'Country'}
            secureText={false}
            placeholder={'Country'}
            setText={setCountry}
            value={country}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.6}
            // border={1}
            // borderColor={'#1B5CFB45'}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(12, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(30, 0.4)}
          /> */}
          {user?.role != 'customer' && (
            <View
              style={{
                width: windowWidth * 0.7,
                // backgroundColor:'pink'
              }}>
              <TouchableOpacity
                onPress={() => {
                  setRushService(!rushService);

                }}
                style={{
                  // backgroundColor:'blue',
                  width: windowWidth * 0.3,
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingTop: moderateScale(15, 0.6),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setRushService(!rushService);
                  }}
                  style={{
                    height: windowHeight * 0.02,
                    width: windowHeight * 0.02,
                    // backgroundColor:'green',
                    borderRadius: moderateScale((windowHeight * 0.02) / 2),
                    borderWidth: moderateScale(1, 0.6),
                    borderColor: Color.themeColor,
                  }}>
                  {rushService && (
                    <Icon
                      style={{
                        textAlign: 'center',
                        // backgroundColor:'red'
                      }}
                      name="check"
                      as={FontAwesome}
                      color={Color.themeColor}
                      size={13}
                    />
                  )}
                </TouchableOpacity>

                <CustomText
                  onPress={() => {
                    setRushService(!rushService);

                  }}
                  isBold
                  style={{
                    marginHorizontal: moderateScale(8, 0.6),
                    color: Color.white,
                    fontSize: moderateScale(14, 0.6),
                  }}>
                  rush service
                </CustomText>
              </TouchableOpacity>
              <View
                style={{
                  // backgroundColor: 'red',
                  width: windowWidth * 0.3,
                  paddingVertical: moderateScale(10, 0.6),
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsVisibleModal(!isVisibleModal);
                  }}
                  style={{
                    // backgroundColor: 'green',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingBottom: moderateScale(10, 0.6),
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      if (Object.keys(temproaryAddress).length == 0) {
                        setIsVisibleModal(!isVisibleModal);
                      } else {
                        setTemproaryAddress({});
                      }
                    }}
                    style={{
                      height: windowHeight * 0.02,
                      width: windowHeight * 0.02,
                      // backgroundColor:'red',
                      borderRadius: moderateScale((windowHeight * 0.02) / 2),
                      borderWidth: moderateScale(1, 0.6),
                      borderColor: Color.themeColor,
                    }}>
                    {Object.keys(temproaryAddress).length > 0 && (
                      <Icon
                        style={{
                          textAlign: 'center',
                          // backgroundColor:'red'
                        }}
                        name="check"
                        as={FontAwesome}
                        color={Color.themeColor}
                        size={13}
                      />
                    )}
                  </TouchableOpacity>

                  <CustomText
                    onPress={() => {
                      if (Object.keys(temproaryAddress).length == 0) {
                        setIsVisibleModal(!isVisibleModal);
                      } else {
                        setTemproaryAddress({});
                      }
                    }}
                    isBold
                    style={{
                      marginHorizontal: moderateScale(8, 0.6),
                      color: Color.white,
                      fontSize: moderateScale(14, 0.6),
                    }}>
                    Travel mode
                  </CustomText>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setIsHolidayMode(prevState => !prevState);
                  }}
                  style={{
                    // backgroundColor: Color.lightGrey,
                    flexDirection: 'row',
                    // alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setIsHolidayMode(prevState => !prevState);
                    }}
                    style={{
                      height: windowHeight * 0.02,
                      width: windowHeight * 0.02,
                      // backgroundColor:'red',
                      borderRadius: moderateScale((windowHeight * 0.02) / 2),
                      borderWidth: moderateScale(1, 0.6),
                      borderColor: Color.themeColor,
                    }}>
                    {isHolidayMode && (
                      <Icon
                        style={{
                          textAlign: 'center',
                          // backgroundColor:'red'
                        }}
                        name="check"
                        as={FontAwesome}
                        color={Color.themeColor}
                        size={13}
                      />
                    )}
                  </TouchableOpacity>

                  <CustomText
                    onPress={() => {
                      setIsHolidayMode(!isHolidayMode);
                    }}
                    isBold
                    style={{
                      marginHorizontal: moderateScale(8, 0.6),
                      color: Color.white,
                      fontSize: moderateScale(14, 0.6),
                    }}>
                    Holiday mode
                  </CustomText>
                </TouchableOpacity>
              </View>
              {Object.keys(temproaryAddress).length > 0 && (
                <>
                  <CustomText
                    isBold
                    style={{
                      color: Color.white,
                      fontSize: moderateScale(20, 0.6),
                      marginTop: moderateScale(20, 0.6),
                      marginBottom: moderateScale(5, 0.6),
                    }}>
                    Holiday Location
                  </CustomText>
                  <View>
                    <Icon
                      name="close"
                      as={FontAwesome}
                      size={moderateScale(14, 0.6)}
                      color={Color.themeColor}
                      style={{
                        position: 'absolute',
                        right: 5,
                        top: 0,
                        zIndex: 1,
                      }}
                      onPress={() => {
                        setTravelDateFrom('');
                        setTravelDateTo('');
                        setTemproaryAddress({});
                      }}
                    />
                    <CustomText
                      style={{
                        color: Color.white,
                        // backgroundColor:'red',s/
                        width: windowWidth * 0.6,
                        // marginBottom: moderateScale(5, 0.6),
                      }}>
                      {temproaryAddress?.name}
                    </CustomText>
                    <CustomText
                    isBold
                    style={{
                      color: Color.white,
                      fontSize: moderateScale(14, 0.6),
                      marginTop: moderateScale(20, 0.6),
                      marginBottom: moderateScale(5, 0.6),
                    }}>
                     { `from: ${travelDateFrom} \nTo: ${travelDateTo}`}  
                  </CustomText>
                  </View>
                </>
              )}
            </View>
          )}
          <CustomButton
            bgColor={Color.themeColor}
            borderColor={'white'}
            borderWidth={1}
            textColor={Color.black}
            borderRadius={moderateScale(20, 0.3)}
            onPress={() => {
              user?.role == 'customer' ? CustomerEditProfile() : EditProfile();
            }}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            text={
              isLoading ? (
                <ActivityIndicator color={'black'} size={'small'} />
              ) : (
                'Update'
              )
            }
            marginTop={moderateScale(20, 0.3)}
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
            // marginTop={moderateScale(10, 0.3)}
          />
        </ScrollView>
        </KeyboardAvoidingView>







        <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={setImageObject}
          crop={true}
        />
        <ImageView
          images={imageArray}
          imageIndex={0}
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
        />

        <TravelModal
          setLocation={setTemproaryAddress}
          isVisibleModal={isVisibleModal}
          setIsVisibleModal={setIsVisibleModal}
          travelDateFrom={travelDateFrom}
          setDateFrom={setTravelDateFrom}
          travelDateTo={travelDateTo}
          setDateTo={setTravelDateTo}
          location={temproaryAddress}
        />
        <SelectLocationModal
          isVisible={selectLocationModal}
          setIsVisibleModal={setselectLocationModal}
          setLocation={setAddress}
        />
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  image: {
    height: windowWidth * 0.35,
    width: windowWidth * 0.35,
    borderRadius: moderateScale((windowWidth * 0.35) / 2, 0.3),
    right: moderateScale(5, 0.3),
    marginTop: moderateScale(20, 0.3),
  },
  container: {
    paddingTop: windowHeight * 0.03,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // backgroundColor : Color.themeColor
  },
});

export default MyAccounts;
