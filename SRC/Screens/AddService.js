import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import { ScaledSheet, moderateScale, verticalScale } from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Color from '../Assets/Utilities/Color';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import { Icon } from 'native-base';
import CustomButton from '../Components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import CustomText from '../Components/CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ServiceComponent from '../Components/ServiceComponent';
import { useDispatch, useSelector } from 'react-redux';
import { Get, Post } from '../Axios/AxiosInterceptorFunction';
import { useNavigation } from '@react-navigation/native';
import NoData from '../Components/NoData';
import SelectedServicesModal from '../Components/SelectdServicesModal';
import { setUserData } from '../Store/slices/common';
// import SelectedService from '../Components/selectdService';
// import { setbarberServices } from '../Store/slices/common';

const AddService = props => {
  const fromSettings = props?.route?.params?.fromSettings;

  const userData = useSelector(state => state.commonReducer.userData);
  const token = useSelector(state => state.authReducer.token);
  console.log(token, 'tokeeeeeeeeen')
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [isVisiable, setIsVisiable] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [service, setService] = useState([]);
  const [serviceArray, setServiceArray] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [price, setPrice] = useState('');
  const [event_type, setEventType] = useState({})
  const GetServices = async () => {
    const url = `auth/barber/service`;
    setLoading(true);
    const response = await Get(url, token);
    setLoading(false);
    if (response != undefined) {
      setIsSelected(response?.data?.data?.find(item => item.main_service == 1));
      setService(response?.data?.data);
    }
  };


  const GetServicesList = async () => {
    const url = `auth/service?level=main`;
    setLoading(true);
    const response = await Get(url, token);
    setLoading(false);
    if (response != undefined) {
      setServiceArray(response?.data?.data?.data);
    }
  };

  useEffect(() => {
    GetServicesList();
    fromSettings && GetServices();
  }, []);

  const Services = async () => {
    if (service.some(item => item?.name == '')) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
          'Please select your added service or delete the slot',
          ToastAndroid.SHORT,
        )
        : Alert.alert('Please select your added service or delete the slot');
    }
    if (service.some(item => item?.price == '')) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
          'Please add price for all the services',
          ToastAndroid.SHORT,
        )
        : Alert.alert('Please add price for all the services');
    }

    const body = {
      service_name: service.map(item => {
        let serviceId;
        for (let category of serviceArray) {
          const child = category.children.find(c => c.name === item.name);
          if (child) {
            serviceId = child.id;
            break;
          }
        }

        return {
          service_id: serviceId,
          price: item.price,
          main_service: item.name === isSelected?.name ? true : false,
        };
      }),
    };

  console.log(body)
    const url = 'auth/barber/service';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);

    if (response != undefined) {
      Platform.OS === 'android'
        ? ToastAndroid.show('Services Added', ToastAndroid.SHORT)
        : Alert.alert('Services Added');

      dispatch(setUserData(response?.data?.data));
    }
  };

  return (
   
    <ScreenBoiler
      showHeader={true}
      showBack={fromSettings ? true : false}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        colors={Color.themeGradient}
        style={styles.container}>

        <CustomText isBold style={[styles.AddService, { marginLeft: moderateScale(16, 0.6) }]}>
          Choose Category
        </CustomText>
        <DropDownSingleSelect
          array={serviceArray}
          value={selectedCategory}
          labelField="name"
          valueField="id"
          label={'Select Category'}
          setValue={val => {
            setSelectedCategory(val);
          }}
          item={event_type}
          setItem={setEventType}
          backgroundColor={Color.lightGray}
          Colors={Color.veryLightGray}
          fontSize={moderateScale(12, 0.6)}
          placeholder={'Please Select Service'}
          width={windowWidth * 0.9}
          dropdownStyle={{
            width: windowWidth * 0.92,
            alignSelf: "center",
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: moderateScale(6, 0.6),
            marginTop: moderateScale(10, 0.6)
          }}
          style={{
            borderWidth: 2,
            borderRadius: moderateScale(10, 0.4),
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem.name;
          }}
          rowTextForSelection={(item, index) => {
            return item.name;
          }}
        />
         {/* <KeyboardAvoidingView
     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
     > */}
        <View
          style={{
            width: windowWidth * 0.95,
            paddingVertical: moderateScale(10, 0.6),
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: moderateScale(10, 0.6),
          }}>
          <CustomText isBold style={styles.AddService}>
            Choose Services
          </CustomText>

          <TouchableOpacity
            onPress={() => {
              setService(prev => [...prev, { name: '', price: '' }]);
            }}
            activeOpacity={0.7}
            style={{
              width: windowWidth * 0.06,
              height: windowWidth * 0.06,
              borderRadius: (windowWidth * 0.06) / 2,
              backgroundColor: Color.themeColor,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon
              name="plus"
              as={AntDesign}
              size={moderateScale(18, 0.3)}
              color={Color.white}
            />
          </TouchableOpacity>
        </View>

        {Loading ? (
          <View
            style={{ alignSelf: 'center', marginTop: moderateScale(150, 0.3) }}>
            <ActivityIndicator size={moderateScale(40, 0.6)} color={'white'} />
          </View>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={service}
            contentContainerStyle={{
              paddingBottom:moderateScale(180,0.2)}}
            ListEmptyComponent={() => {
              return (
                <NoData
                  style={{
                    height: windowHeight * 0.25,
                    width: windowWidth * 0.6,
                    alignItems: 'center',
                    // backgroundColor:'red'
                  }}
                  text={'No Services Added Yet'}
                />
              );
            }}
            renderItem={({ item, index }) => {
              return (
                <ServiceComponent
                  service={service}
                  setService={setService}
                  item={item}
                  serviceArray={event_type?.children}
                />
              );
            }}
          />
        )}
         {/* </KeyboardAvoidingView> */}
        {service?.length > 0 && (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: moderateScale(70, 0.6)
            }}>
            <CustomButton
              onPress={() => {
                if ([undefined, null, ''].includes(isSelected) || Object.keys(isSelected).length == 0) {
                  setIsVisiable(true);
                } else {
                  Services();
                }
              }}
              text={
                isLoading ? (
                  <ActivityIndicator
                    size={moderateScale(30, 0.6)}
                    color={'white'}
                  />
                ) : (
                  'Save'
                )
              }
              textColor={Color.white}
              width={windowWidth * 0.7}
              height={windowHeight * 0.07}
              marginTop={moderateScale(50, 0.3)}
              bgColor={Color.themeColor}
              borderRadius={moderateScale(25, 0.3)}
            // isGradient
            />
          </View>
        )}
        <SelectedServicesModal
          item={event_type?.children?.filter((item, index) => {
            return service?.some(item1 => item?.name == item1?.name);
          })}
          isVisiable={isVisiable}
          setIsVisiable={setIsVisiable}
          isSelected={isSelected}
          setIsSelected={setIsSelected}
        />
      </LinearGradient>
    </ScreenBoiler>
     
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.02,
    height: windowHeight * 0.9,
    width: windowWidth,
    // alignItems: 'center',
  },
  AddService: {
    fontSize: moderateScale(16, 0.6),
    color: Color.white,
  },

  icon: {
    marginVertical: 10,
    marginLeft: 60,
  },
});

export default AddService;
