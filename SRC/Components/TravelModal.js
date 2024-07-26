import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import TextInputWithTitle from './TextInputWithTitle';
import Feather from 'react-native-vector-icons/Feather';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
// import { useNavigation } from '@react-navigation/core';
// import { setVoucherData } from '../Store/slices/common';

const HolidayModal = ({
  setLocation,
  setIsVisibleModal,
  isVisibleModal,
  travelDateFrom,
  travelDateTo,
  setDateFrom,
  setDateTo,
  location,
}) => {
  const navigation = useNavigation();
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTimes, setSelectedDate] = useState([]); // const dispatch =useDispatch()
  const [dateType, setdateType] = useState('');

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };
  

  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isVisibleModal}
      onBackdropPress={() => {
        if (
          travelDateTo == '' ||
          travelDateFrom == '' ||
          Object.keys(location).length == 0
        ) {
          Platform.OS == 'android'
            ? ToastAndroid.show(
                'Required Field is Empty',
                ToastAndroid.SHORT,
              )
            : alert('Required Field is empty');
        } else {
          setIsVisibleModal(false);
        }
      }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.maincontainer}>
          <CustomText
            style={{
              color: Color.black,
              fontSize: moderateScale(22, 0.6),
            }}
            isBold>
            Where are you Travelling?
          </CustomText>

          <GooglePlacesAutocomplete
            placeholder="Search"
            textInputProps={{
              placeholderTextColor: '#5d5d5d',
            }}
            onPress={(data, details = null) => {
              
              setLocation({
                name: data?.description,
                lat: details?.geometry?.location?.lat,
                lng: details?.geometry?.location?.lng,
              });
            }}
            query={{
              key: 'AIzaSyAqNK7IfM16zi79N0u7qX4Ncm5QgGvBqmg',
              // key: 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc',

              language: 'en',
            }}
            isRowScrollable={true}
            fetchDetails={true}
            styles={{
              textInputContainer: {
                width: windowWidth * 0.8,
                marginLeft: moderateScale(5, 0.6),
                marginTop: moderateScale(50, 0.6),
              },
              textInput: {
                height: windowHeight * 0.06,
                color: '#5d5d5d',
                fontSize: 16,
                borderWidth: 2,
                borderColor: Color.lightGrey,
                borderRadius: moderateScale(20, 0.6),
              },
              listView: {
                width: windowWidth * 0.78,
                marginLeft: moderateScale(5, 0.6),
                borderColor: Color.veryLightGray,
              },

              description: {
                color: 'black',
              },
            }}
          />

          <TouchableOpacity
            onPress={() => {
              setdateType('from');
              setTimePickerVisible(true);
            }}>
            <TextInputWithTitle
              iconName={'date'}
              iconType={Fontisto}
              titleText={'Phone'}
              secureText={false}
              placeholder={'Travel Date From'}
              setText={setDateFrom}
              value={travelDateFrom}
              viewHeight={0.06}
              viewWidth={0.75}
              inputWidth={0.6}
              multiline={true}
              borderBottomWidth={2}
              borderColor={Color.themeColor}
              backgroundColor={'#FFFFFF'}
              marginBottom={moderateScale(12, 0.3)}
              color={Color.themeColor}
              placeholderColor={Color.themeLightGray}
              borderRadius={moderateScale(30, 0.4)}
              disable={true}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setdateType('to');
              setTimePickerVisible(true);
            }}>
          <TextInputWithTitle
            iconName={'date'}
            iconType={Fontisto}
            titleText={'Phone'}
            secureText={false}
            placeholder={'Travel Date To'}
            setText={setDateTo}
            value={travelDateTo}
            viewHeight={0.06}
            viewWidth={0.75}
            inputWidth={0.6}
            multiline={true}
            borderBottomWidth={2}
            borderColor={Color.themeColor}
            backgroundColor={'#FFFFFF'}
            marginBottom={moderateScale(12, 0.3)}
            color={Color.themeColor}
            placeholderColor={Color.themeLightGray}
            borderRadius={moderateScale(30, 0.4)}
            disable={true}
          />
          </TouchableOpacity>
          <CustomButton
            bgColor={Color.themeColor}
            borderColor={'white'}
            borderWidth={1}
            textColor={Color.black}
            borderRadius={moderateScale(20, 0.3)}
            onPress={() => {
              if (
                travelDateTo == '' ||
                travelDateFrom == '' ||
                Object.keys(location).length == 0
              ) {
                Platform.OS == 'android'
                  ? ToastAndroid.show(
                      'Required Field is Empty',
                      ToastAndroid.SHORT,
                    )
                  : alert('Required Field is empty');
              } 
              else if(moment(travelDateFrom).isSameOrBefore(travelDateTo)) {
                setIsVisibleModal(false)
              }

              else {
                Platform.OS == 'android'
                ? ToastAndroid.show(
                    'From Date can not  be greater than To Date',
                    ToastAndroid.SHORT,
                  )
                : alert('From Date can not  be greater than To Date');
              }
            }}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            text={'Proceed'}
            marginTop={moderateScale(20, 0.3)}
            fontSize={moderateScale(14, 0.3)}
            textTransform={'uppercase'}
            isGradient={true}
            isBold
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="date"
            onConfirm={data => {
              dateType == 'from'
                ? setDateFrom(moment(data).format('DD-MM-YYYY'))
                : setDateTo(moment(data).format('DD-MM-YYYY'));
              setTimePickerVisible(false);
            }}
            onCancel={hideTimePicker}
          />
        </View>
      </View>
    </Modal>
  );
};

export default HolidayModal;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: Color.white,
    width: windowWidth * 0.9,
    height: windowHeight * 0.7,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
  },
});
