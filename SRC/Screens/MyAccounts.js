import { Icon } from 'native-base';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import Entypo from 'react-native-vector-icons/Entypo';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ImagePickerModal from '../Components/ImagePickerModal';
import ScreenBoiler from '../Components/ScreenBoiler';
import SelectLocationModal from '../Components/SelectLocationModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import TravelModal from '../Components/TravelModal';
import { setUserData } from '../Store/slices/common';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { mode } from 'native-base/lib/typescript/theme/tools';

const MyAccounts = props => {
  const dispatch = useDispatch();

  const user = useSelector(state => state.commonReducer.userData);
  console.log(user?.phone)

  const token = useSelector(state => state.authReducer.token);

  const [showModal, setShowModal] = useState(false);
  const [imageObject, setImageObject] = useState({});
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastName] = useState(user?.last_name);
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email);
  const [address, setAddress] = useState(
    user?.location == null
      ? {}
      : { name: user?.location, lng: user?.lng, lat: user?.lat },
  );
  const [selectLocationModal, setselectLocationModal] = useState(false);
  const [country, setCountry] = useState(user?.country);
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [travelDateFrom, setTravelDateFrom] = useState(user?.travel_date_from ? user?.travel_date_from : '');
  const [travelDateTo, setTravelDateTo] = useState(user?.travel_date_to ? user?.travel_date_to : '');
  const [specilization, setSpecilization] = useState(user?.specialty ? user?.specialty : '');
  const [certification, setCertification] = useState(user?.any_certification ? user?.any_certification : '');
  const [experience, setExperience] = useState(`${user?.experience}`);
  console.log('dsfesfsdfdsf', experience)
  const [isHolidayMode, setIsHolidayMode] = useState(
    user?.holiday_mode ? user?.holiday_mode : false,
  );
  const [temproaryAddress, setTemproaryAddress] = useState(
    user?.temporary_address == null ? {} : user?.temporary_address,
  );
  const [rushService, setRushService] = useState(
    user?.rush_service ? user?.rush_service : false,
  );
  const [isHealthMode, setIsHealthMode] = useState(user?.health_mode ? user?.health_mode : false)
  const [isAvailble, setIsAvailble] = useState(user?.health_mode || user?.temporary_address != null || user?.holiday_mode ? false : true)

  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState(user?.state || '');
  console.log('selectedState', selectedState)
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dob, setDob] = useState(user?.dob || '');
  const [selectedGender, setSelectedGender] = useState(user?.gender || '');
  const [selectedType, setSelectedType] = useState(user?.type || '');

  const fetchStates = async () => {
    try {
      const response = await axios.post(
        'https://countriesnow.space/api/v0.1/countries/states',
        {
          country: 'united states',
        },
      );
      setState(response.data.data?.states);
    } catch (error) {
      console.log('Error fetching cities', error);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDob(moment(date).format('YYYY-MM-DD'));
    hideDatePicker();
  };

  const gender = [
    { name: 'Male' },
    { name: 'Female' },
    { name: 'Prefer not to say' },
  ]


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
      phone: 1234567890,
      email: email,
      specialty: specilization,
      any_certification: certification,
      experience: experience,

      address_name: address?.name,
      address_lat: address?.lat,
      address_lng: address?.lng,
      rush_service: rushService == true ? 1 : 0,
      holiday_mode: isHolidayMode == true ? 1 : 0,
      health_mode: isHealthMode == true ? 1 : 0,
      dob: dob,
      state: selectedState,
      gender: selectedGender,
      type: selectedType,
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
      return console.log(JSON.stringify(response?.data?.user_info, null, 2))

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
      phone: 1234567890,
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
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        colors={Color.themeGradient}
        style={styles.container}>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: windowHeight * 0.18,
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
                  source={{ uri: imageObject?.uri }}
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
                      ? { uri: `${user?.photo}` }
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
              inputWidth={0.64}
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
              inputWidth={0.64}
              // border={1}
              // borderColor={'#1B5CFB45'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(12, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(30, 0.4)}
            />
            {/* <TextInputWithTitle
              iconName={'phone'}
              iconType={FontAwesome}
              titleText={'Phone'}
              secureText={false}
              placeholder={'Phone'}
              setText={setPhone}
              value={`${phone}`}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.64}
              // border={1}
              // borderColor={'#1B5CFB45'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(12, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(30, 0.4)}
              keyboardType={'number-pad'}
            // disable={true}
            /> */}
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
              inputWidth={0.64}
              // border={1}
              // borderColor={'#1B5CFB45'}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(12, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(30, 0.4)}
              disable
            />
            {user?.role != 'customer' && (
              <>
                <TextInputWithTitle
                  iconName={'flag-checkered'}
                  iconType={FontAwesome}
                  // disable
                  titleText={'Experience'}
                  secureText={false}
                  placeholder={'Experience in Years'}
                  setText={setExperience}
                  value={experience}
                  viewHeight={0.06}
                  viewWidth={0.75}
                  inputWidth={0.64}
                  // border={1}
                  // borderColor={'#1B5CFB45'}
                  backgroundColor={'#FFFFFF'}
                  marginTop={moderateScale(12, 0.3)}
                  color={Color.themeColor}
                  placeholderColor={Color.themeLightGray}
                  borderRadius={moderateScale(30, 0.4)}
                  keyboardType={'numeric'}
                  maxLength={2}
                />
                <TextInputWithTitle
                  iconName={'book'}
                  iconType={FontAwesome}
                  // disable
                  titleText={'Specialty'}
                  secureText={false}
                  placeholder={'Any one main specility'}
                  setText={setSpecilization}
                  value={specilization}
                  viewHeight={0.06}
                  viewWidth={0.75}
                  inputWidth={0.64}
                  // border={1}
                  // borderColor={'#1B5CFB45'}
                  backgroundColor={'#FFFFFF'}
                  marginTop={moderateScale(12, 0.3)}
                  color={Color.themeColor}
                  placeholderColor={Color.themeLightGray}
                  borderRadius={moderateScale(30, 0.4)}

                />
                <TextInputWithTitle
                  iconName={'trophy'}
                  iconType={FontAwesome}
                  // disable
                  titleText={'Certification'}
                  secureText={false}
                  placeholder={'Any certification'}
                  setText={setCertification}
                  value={certification}
                  viewHeight={0.06}
                  viewWidth={0.75}
                  inputWidth={0.64}
                  // border={1}
                  // borderColor={'#1B5CFB45'}
                  backgroundColor={'#FFFFFF'}
                  marginTop={moderateScale(12, 0.3)}
                  color={Color.themeColor}
                  placeholderColor={Color.themeLightGray}
                  borderRadius={moderateScale(30, 0.4)}

                />
              </>
            )}
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

            {user?.role != 'customer' && (
              <>
                <TouchableOpacity
                  onPress={showDatePicker}
                  activeOpacity={0.9}
                  style={[styles.row_con, { marginTop: moderateScale(12, 0.3) }]}>
                  <View style={styles.icon_container}>
                    <Icon as={Entypo} name="calendar" size={moderateScale(18, .6)} color={Color.themeColor} />
                  </View>
                  <View style={styles.text_container}>
                    <CustomText style={styles.dob_text}>{dob ? dob : 'Date of Birth'}</CustomText>
                  </View>
                </TouchableOpacity>

                <View style={{ marginTop: moderateScale(12, 0.3), width: windowWidth * 0.75 }}>
                  <DropDownSingleSelect
                    item={selectedState}
                    setItem={setSelectedState}
                    array={state?.map(item => item?.name) || []}
                    placeholder={selectedState || "Select State"}
                    style={{
                      width: windowWidth * 0.75,
                      backgroundColor: Color.white,
                      borderRadius: moderateScale(30, .4),
                      height: windowHeight * 0.06,
                    }}

                  />
                </View>

                <View style={[styles.gender_label_con, { marginTop: moderateScale(12, 0.3) }]}>
                  <CustomText style={styles.label_text}>Gender</CustomText>
                </View>
                <View style={styles.gender_map_con}>
                  {gender?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => setSelectedGender(item?.name)}
                        style={[styles.gen_con, selectedGender === item?.name && { backgroundColor: Color.themeColor }]}>
                        <CustomText style={[styles.gen_text, selectedGender === item?.name && { color: Color.white }]}>{item?.name}</CustomText>
                      </TouchableOpacity>
                    )
                  })}
                </View>

                <View style={[styles.gender_label_con, { marginTop: moderateScale(12, 0.3) }]}>
                  <CustomText style={styles.label_text}>Profile Type</CustomText>
                </View>
                <View style={[styles.type_con, { marginTop: moderateScale(10, .6) }]}>
                  <TouchableOpacity
                    onPress={() => setSelectedType('physical selfcare business')}
                    style={styles.radio_row}>
                    <View style={styles.radio_outer}>
                      {selectedType === 'physical selfcare business' && <View style={styles.radio_inner} />}
                    </View>
                    <CustomText style={[styles.radio_text, { marginLeft: moderateScale(10, .6) }]}>physical selfcare business</CustomText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => setSelectedType('independant freelancer')}
                    style={[styles.radio_row, { marginTop: moderateScale(10, .6) }]}>
                    <View style={styles.radio_outer}>
                      {selectedType === 'independant freelancer' && <View style={styles.radio_inner} />}
                    </View>
                    <CustomText style={[styles.radio_text, { marginLeft: moderateScale(10, .6) }]}>independant freelancer</CustomText>
                  </TouchableOpacity>
                </View>
              </>
            )}

            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

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
            <View style={[styles.gender_label_con, { marginTop: moderateScale(12, 0.3) }]}>
              <CustomText style={styles.label_text}>Provider Status</CustomText>
            </View>
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
                    style={styles.checkbox}>
                    {rushService && (
                      <Icon
                        style={{
                          textAlign: 'center',
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
                    style={styles.chechkbox_text}>
                    rush service
                  </CustomText>
                </TouchableOpacity>
                <View
                  style={{
                    // backgroundColor: 'red',
                    width: windowWidth * 0.4,
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
                      style={styles.checkbox}>
                      {Object.keys(temproaryAddress).length > 0 && (
                        <Icon
                          style={{
                            textAlign: 'center',
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
                      style={styles.chechkbox_text}>
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
                      style={styles.checkbox}>
                      {isHolidayMode && (
                        <Icon
                          style={{
                            textAlign: 'center',
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
                      style={styles.chechkbox_text}>
                      Holiday mode
                    </CustomText>
                  </TouchableOpacity>

                  {/* //health mode */}
                  <TouchableOpacity
                    onPress={() => {
                      setIsHealthMode(prevState => !prevState);
                    }}
                    style={{
                      marginTop: moderateScale(10, 0.6),
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsHealthMode(prevState => !prevState);
                      }}
                      style={styles.checkbox}>
                      {isHealthMode && (
                        <Icon
                          style={{
                            textAlign: 'center',
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
                        setIsHealthMode(!isHealthMode);
                      }}
                      isBold
                      style={styles.chechkbox_text}>
                      Health mode
                    </CustomText>
                  </TouchableOpacity>

                  {/* //availble mode */}
                  <TouchableOpacity
                    onPress={() => {
                      setIsAvailble(prevState => !prevState);
                    }}
                    style={{
                      marginTop: moderateScale(10, 0.6),
                      flexDirection: 'row',
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        setIsAvailble(prevState => !prevState);
                      }}
                      style={styles.checkbox}>
                      {isAvailble && (
                        <Icon
                          style={{
                            textAlign: 'center',
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
                        setIsAvailble(!isHealthMode);
                      }}
                      isBold
                      style={styles.chechkbox_text}>
                      available
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
                      Provider Location
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
                        {`from: ${travelDateFrom} \nTo: ${travelDateTo}`}
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
              disabled={isLoading}
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
  checkbox: {
    height: windowHeight * 0.02,
    width: windowHeight * 0.02,
    // backgroundColor:'red',
    borderWidth: 1,
    borderColor: Color.white,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chechkbox_text: {
    color: Color.white,
    fontSize: moderateScale(12, 0.6),
    marginLeft: moderateScale(10, 0.6),
  },
  row_con: {
    flexDirection: 'row',
    alignItems: 'center',
    width: windowWidth * 0.75,
    height: windowHeight * 0.06,
    backgroundColor: Color.white,
    borderRadius: moderateScale(30, 0.4),
    paddingHorizontal: moderateScale(15, 0.6),
  },
  icon_container: {
    width: moderateScale(25, 0.6),
    alignItems: 'center',
  },
  text_container: {
    marginLeft: moderateScale(10, 0.6),
  },
  dob_text: {
    fontSize: moderateScale(13),
    color: Color.themeColor,
  },
  gender_label_con: {
    width: windowWidth * 0.75,
    alignItems: 'flex-start',
  },
  label_text: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: Color.white,
  },
  gender_map_con: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: windowWidth * 0.75,
    marginTop: moderateScale(5, 0.6),
  },
  gen_con: {
    paddingVertical: moderateScale(8, .6),
    paddingHorizontal: moderateScale(12, .6),
    backgroundColor: 'transparent',
    borderWidth: moderateScale(1, .6),
    borderColor: Color.white,
    borderRadius: moderateScale(30, .6),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(8, .6),
    marginTop: moderateScale(8, .6),
  },
  gen_text: {
    fontSize: moderateScale(12),
    color: Color.white,
  },
  type_con: {
    width: windowWidth * 0.75,
    alignItems: 'flex-start',
  },
  radio_row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radio_outer: {
    height: moderateScale(20, .6),
    width: moderateScale(20, .6),
    borderRadius: moderateScale(10, .6),
    borderWidth: moderateScale(2, .6),
    borderColor: Color.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  radio_inner: {
    height: moderateScale(10, .6),
    width: moderateScale(10, .6),
    borderRadius: moderateScale(5, .6),
    backgroundColor: Color.themeColor,
  },
  radio_text: {
    fontSize: moderateScale(14),
    color: Color.white,
  },
});

export default MyAccounts;
