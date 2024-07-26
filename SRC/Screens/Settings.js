import React, {useState} from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import navigationService from '../navigationService';
import ImagePickerModal from '../Components/ImagePickerModal';
import {setUserLogoutAuth} from '../Store/slices/auth';
import {useDispatch, useSelector} from 'react-redux';

const Settings = () => {
  const dispatch = useDispatch();
  const [image, setImage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const UserData = useSelector(state => state.commonReducer.userData);

console.log('user data =============  >>>>>>>>>> ',UserData)


  const cardArray = [
    {
      name: 'Profile',
      onPress: () => {
        navigationService.navigate('MyAccounts');
      },
    },
    {
      name: 'My Bookings',
      onPress: () => {
        navigationService.navigate('MyBookings');
      },
    },

    ...(UserData?.role === 'barber'
      ? [
          {
            name: 'Add Time',
            onPress: () => {
              navigationService.navigate('TimeScreen');
            },
          },
          {
            name: 'Add Service',
            onPress: () => {
              navigationService.navigate('AddService', {fromSettings: true});
            },
          },
        ]
      : []),
    ...(UserData?.role == 'customer'
      ? [
          {
            name: 'compare barber',
            onPress: () => {
              navigationService.navigate('CompareBaberScreen');
            },
          },
        ]
      : []),
    // {
    //   name: 'Payment Method',
    //   onPress: () => {
    //     navigationService.navigate('PaymentMethod');
    //   },
    // },
    {
      name: 'consultation video',
      onPress: () => {
        navigationService.navigate('ConsulationVideoScreen');
      },
    },
    {
      name: 'Change Password',
      onPress: () => {
        navigationService.navigate('ChangePassword');
      },
    },
    {
      name: 'Terms And Conditions',
      onPress: () => {
        navigationService.navigate('TermsAndConditions');
      },
    },
    {
      name: 'Support',
      onPress: () => {
        navigationService.navigate('Support');
      },
    },
    {
      name: 'purchase Coin',
      onPress: () => {
        navigationService.navigate('Purchase');
      },
    },
    {
      name: 'Wallet',
      onPress: () => {
        navigationService.navigate('WalletScreen');
      },
    },
    {
      name: 'Log Out',
      onPress: () => {
        dispatch(setUserLogoutAuth());
      },
    },
  ];

  return (
    <ScreenBoiler
      showHeader={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        <CustomText isBold style={styles.text1}>
          Settings
        </CustomText>

        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          style={{
            width: windowWidth,
          }}
          data={cardArray}
          contentContainerStyle={{
            paddingBottom: windowHeight * 0.2,
            alignItems: 'center',
          }}
          renderItem={({item, index}) => {
            return (
              <CustomButton
                bgColor={Color.themeColor}
                borderColor={'white'}
                borderWidth={1}
                textColor={Color.black}
                onPress={item?.onPress}
                width={windowWidth * 0.85}
                height={windowHeight * 0.06}
                borderRadius={moderateScale(25, 0.6)}
                text={item?.name}
                // borderRadius={moderateScale(30,0.4)}s
                fontSize={moderateScale(14, 0.3)}
                textTransform={'uppercase'}
                isGradient={true}
                isBold
                marginTop={moderateScale(20, 0.3)}
              />
            );
          }}
          ListHeaderComponent={() => {
            return (
              <View style={{
               width : windowWidth,
              //  backgroundColor :'red',
               alignItems: 'center'
              }}>
                <View
                  style={{
                    paddingTop: moderateScale(50, 0.3),
                  }}>
                  {Object.keys(image).length > 0 ? (
                    <CustomImage
                      source={{uri: image?.uri}}
                      style={styles.image}
                    />
                  ) : (
                    <CustomImage
                      style={styles.image}
                      source={{uri: UserData?.photo}}
                    />
                  )}
                </View>
                <CustomText
                  isBold
                  style={{
                    fontSize: moderateScale(14, 0.3),
                    color: Color.white,
                    textAlign: 'center',
                    marginTop: moderateScale(5, 0.4),
                  }}>
                  {UserData.first_name}
                </CustomText>
                <View style={{
                  flexDirection :'row',
                  justifyContent:'center',
                  gap : moderateScale(5,0.6),
                  paddingHorizontal :moderateScale(20,.6) 
                }}>
                  <CustomText
                    style={{
                      fontSize: moderateScale(13, 0.3),
                      color: Color.white,
                      textAlign: 'center',
                    }}>
                    {UserData.role}
                  </CustomText>
                {UserData?.role == 'Barber' &&                
                  <CustomText
                    style={{
                      fontSize: moderateScale(13, 0.3),
                      color: Color.white,
                    }}>
                      ({UserData.designation})
                  </CustomText>
                  }
                </View>
              </View>
            );
          }}
        />
      </LinearGradient>
      <ImagePickerModal
        show={showModal}
        setShow={setShowModal}
        setFileObject={setImage}
      />
    </ScreenBoiler>
  );
};

export default Settings;

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
  },
  bannerView: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.46,
    backgroundColor: 'black',
    marginTop: moderateScale(10, 0.3),
  },
  image: {
    width: moderateScale(100, 0.3),
    height: moderateScale(100, 0.3),
    borderRadius: moderateScale(49, 0.3),
    marginLeft: moderateScale(2.5, 0.3),
    marginTop: moderateScale(2.5, 0.3),
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
});
