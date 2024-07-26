import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomButton from '../Components/CustomButton';
import Color from '../Assets/Utilities/Color';
import ImagePickerModal from '../Components/ImagePickerModal';
import CustomImage from '../Components/CustomImage';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomText from '../Components/CustomText';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validateEmail} from '../Config';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useDispatch} from 'react-redux';
import {setUserData, setUserWallet} from '../Store/slices/common';
import {setUserLogin, setUserToken} from '../Store/slices/auth';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import navigationService from '../navigationService';
import CustomStatusBar from '../Components/CustomStatusBar';
import Header from '../Components/Header';
import Feather from 'react-native-vector-icons/Feather';
import SelectLocationModal from '../Components/SelectLocationModal';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';

const Signup = ({navigation}) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  // const [designation, setDesignation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
 
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState({});
  const [userRole, setUserRole] = useState('Barber');
 
  const [showModal, setShowModal] = useState(false);
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState({});
 
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [selectLocationModal, setselectLocationModal] = useState(false);
 
  const [designation, setDesignation] = useState('');

  const formData = new FormData();

  const SignUp = async () => {
    const params = {
      role: userRole,
      first_name: `${firstName}`,
      last_name: `${lastName}`,
    
      email: email,
      phone: contact,
      password: password,
      confirm_password: confirmPassword,
      address_name: address?.name,
      address_lat: address?.lat,
      address_lng: address?.lng,
    };


    for (let key in params) {
      if (params[key] === '') {
        return Platform.OS == 'android'
          ? ToastAndroid.show(` ${key} field is empty`, ToastAndroid.SHORT)
          : Alert.alert(` ${key} field is empty`);
      }
      formData.append(key, params[key]);
    }
    if (Object.keys(image).length > 0) {
      formData.append('photo', image);
    } else {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`Image is required`, ToastAndroid.SHORT)
        : Alert.alert(` Image is required`);
    }

    if (isNaN(contact)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('phone is not a number', ToastAndroid.SHORT)
        : Alert.alert('phone is not a number');
    }
    if(userRole == 'Barber'){
      if(designation == ''){
       return Platform.OS == 'android'
       ? ToastAndroid.show('Designation should not be empty.', ToastAndroid.SHORT)
       : Alert.alert('Designation should not be empty.');
      }
      formData.append('designation', designation)
    }
    if (!validateEmail(email)) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('email is not validate', ToastAndroid.SHORT)
        : Alert.alert('email is not validate');
    }
    if (password.length < 8) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            'Password should atleast 8 character long',
            ToastAndroid.SHORT,
          )
        : Alert.alert('Password should atleast 8 character long');
    }

    if (password != confirmPassword) {
      return Platform.OS == 'android'
        ? ToastAndroid.show('Password does not match', ToastAndroid.SHORT)
        : Alert.alert('Password does not match');
    }

    const url = 'register';
    setIsLoading(true);
    const response = await Post(url, formData, apiHeader());
    setIsLoading(false);
    if (response != undefined) {

      Platform.OS === 'android'
        ? ToastAndroid.show('User Registered Succesfully', ToastAndroid.SHORT)
        : Alert.alert('User Registered Succesfully');
      dispatch(setUserData(response?.data?.user_info));
      dispatch(setUserLogin(response?.data?.token));
      dispatch(setUserToken({token: response?.data?.token}));
      dispatch(setUserWallet(response?.data?.user_info?.wallet));
    }
  };

  return (
    <>
      <CustomStatusBar backgroundColor={'black'} barStyle={'light-content'} />
      <Header showBack={true}/>
      <KeyboardAvoidingView    
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>


      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          // paddingBottom:moderateScale(10,.6),
          // backgroundColor  : 'red'
        }}>
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          colors={Color.themeGradient}
          style={styles.container}>
          <View>
            {Object.keys(image).length > 0 ? (
              <CustomImage source={{uri: image?.uri}} style={styles.image} />
            ) : (
              <CustomImage
                style={styles.image}
                source={require('../Assets/Images/user.png')}
              />
            )}
            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
              }}
              style={styles.edit}>
              <Icon
                name="pencil"
                as={FontAwesome}
                style={styles.icon2}
                color={Color.white}
                size={moderateScale(16, 0.3)}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.userTypeContainer}>
            <View style={styles.innerContainer}>
              <CustomText isBold style={styles.txt2}>
                Barber
              </CustomText>
              <TouchableOpacity
                onPress={() => {
                  setUserRole('Barber');
                }}
                activeOpacity={0.9}
                style={[
                  styles.circle,
                  userRole == 'Barber' && {
                    backgroundColor: Color.themeColor1,
                    borderColor: Color.themeColor1,
                  },
                ]}></TouchableOpacity>
            </View>
            <View style={styles.innerContainer}>
              <CustomText isBold style={styles.txt2}>
                Customer
              </CustomText>
              <TouchableOpacity
                onPress={() => {
                  setUserRole('Customer');
                }}
                activeOpacity={0.9}
                style={[
                  styles.circle,
                  userRole == 'Customer' && {
                    backgroundColor: Color.themeColor1,
                    borderColor: Color.themeColor1,
                  },
                ]}></TouchableOpacity>
            </View>
          </View>

          <TextInputWithTitle
            titleText={'First Name'}
            placeholder={'First Name'}
            setText={setFirstName}
            value={firstName}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.74}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(10, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(30, 0.4)}
          />
          <TextInputWithTitle
            titleText={'Last Name'}
            placeholder={'Last Name'}
            setText={setLastName}
            value={lastName}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.74}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(12, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(30, 0.4)}
          />

          <TextInputWithTitle
            titleText={'Email'}
            placeholder={'Email'}
            setText={setEmail}
            value={email}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.74}
            backgroundColor={'#FFFFFF'}
            marginTop={moderateScale(12, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(30, 0.4)}
          />
          {userRole != 'Customer' && (
            <View
              style={{
                marginTop: moderateScale(10, 0.3),
              }}>
              <CustomText
                style={{fontSize: moderateScale(13, 0.6), color: Color.white}}>
                designation
              </CustomText>
              <DropDownSingleSelect
                array={['Textured Hair', 'Face treatments','Med spa', 'Braids', 'beautician' ,'Nails']}
                backgroundColor={Color.white}
                item={designation}
                setItem={setDesignation}
                Color={Color.darkGray}
                fontSize={moderateScale(14, 0.6)}
                placeholder={'Choose designation'}
                width={windowWidth * 0.75}
                // buttonStyle={{backgroundColor :Color.white}}
                dropdownStyle={{
                  width: windowWidth * 0.75,
                  borderBottomWidth: 0,
                }}
              />
            </View>
          )}

          <TextInputWithTitle
            titleText={'Contact'}
            placeholder={'Contact'}
            setText={setContact}
            value={contact}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.74}
            backgroundColor={'#FFFFFF'}
            // marginTop={moderateScale(10, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(30, 0.4)}
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
          <View
            style={{
              zIndex: 1,
            }}>
            <TextInputWithTitle
              secureText
              titleText={'Password'}
              placeholder={'Password'}
              setText={setPassword}
              value={password}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.6}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(12, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(30, 0.4)}
            />
            <TextInputWithTitle
              secureText
              titleText={'Confirm Password'}
              placeholder={'Confirm Password'}
              setText={setConfirmPassword}
              value={confirmPassword}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.6}
              backgroundColor={'#FFFFFF'}
              marginTop={moderateScale(12, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(30, 0.4)}
            />
          </View>
          <CustomButton
            bgColor={Color.themeColor}
            borderColor={'white'}
            borderRadius={moderateScale(30, 0.4)}
            borderWidth={1}
            textColor={Color.black}
            onPress={() => {
              SignUp();

              // dispatch(
              //   setUserData(
              //     userRole == 'Customer'
              //       ? {role: 'customer', name: 'Justin Beber'}
              //       : {role: 'barber', name: 'Justin Beber'},
              //   ),
              // );
              // dispatch(setUserToken({token : true}))
            }}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            text={
              isLoading ? (
                <ActivityIndicator color={Color.black} size={'small'} />
              ) : (
                'Sign Up'
              )
            }
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
            marginTop={moderateScale(30, 0.3)}
            // marginBottom={moderateScale(30, 0.3)}

          />
          <CustomText
            onPress={() => {
              navigation.goBack();
            }}
            isBold
            style={{
              color: 'rgb(227,196,136)',
              fontSize: moderateScale(15, 0.3),
              textTransform: 'uppercase',
              marginTop: moderateScale(10, 0.3),
              zIndex: 1,
              paddingBottom :moderateScale(90,.6)
            }}>
            Sign in instead
          </CustomText>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              right: 0,
              // zIndex : -1,
              // backgroundColor: 'red',
            }}>
            <CustomImage
              source={require('../Assets/Images/backgroundLogo.png')}
              // resizeMode={'stretch'}
              style={{}}
            />
          </View>
        </LinearGradient>

        <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={setImage}
        />
      </ScrollView>


      </KeyboardAvoidingView>
      <SelectLocationModal
        isVisible={selectLocationModal}
        setIsVisibleModal={setselectLocationModal}
        setLocation={setAddress}
      />
      {/* // </ScreenBoiler> */}
    </>
  );
};

export default Signup;

const styles = ScaledSheet.create({
  container: {
    // paddingTop: windowHeight * 0.02,
    // justifyContent: "center",
    minHeight: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    paddingBottom: moderateScale(50, 0.3),

    // backgroundColor : Color.green
  },
  userTypeContainer: {
    width: windowWidth * 0.7,
    // backgroundColor : Color.red,
    padding: moderateScale(10, 0.3),
    marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerContainer: {
    width: '48%',
    // backgroundColor : 'green',
    // paddingVertical : moderateScale(5,0.3),
    flexDirection: 'row',
    alignItems: 'center',
  },

  edit: {
    backgroundColor: Color.themeColor1,
    width: moderateScale(25, 0.3),
    height: moderateScale(25, 0.3),
    position: 'absolute',
    bottom: moderateScale(5, 0.3),
    right: moderateScale(1, 0.3),
    borderRadius: moderateScale(12.5, 0.3),
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: moderateScale(100, 0.3),
    height: moderateScale(100, 0.3),
    borderRadius: moderateScale(49, 0.3),
    marginLeft: moderateScale(2.5, 0.3),
    marginTop: moderateScale(2.5, 0.3),
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.9,
    // marginTop: moderateScale(10,0.3),
  },
  txt4: {
    color: Color.themeColor,
    fontSize: moderateScale(14, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.themeColor,
    marginBottom: moderateScale(5, 0.3),
  },
  txt5: {
    color: Color.themeLightGray,

    fontSize: moderateScale(12, 0.6),
  },
  circle: {
    height: moderateScale(13, 0.3),
    width: moderateScale(13, 0.3),
    borderRadius: moderateScale(6.5, 0.3),
    borderWidth: 1,
    backgroundColor: Color.white,
    borderColor: Color.themeColor,
    marginLeft: moderateScale(15, 0.3),
  },
  txt2: {
    fontSize: moderateScale(12, 0.3),
    color: Color.themeColor,
    // fontWeight : 'bold'
    // backgroundColor : 'red'
  },
});
