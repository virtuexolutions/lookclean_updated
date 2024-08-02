import {View, Text, Alert, TouchableOpacity , TextInput} from 'react-native';
import React, {useState} from 'react';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import CustomButton from './CustomButton';
import Color from '../Assets/Utilities/Color';
import DropDownSingleSelect from './DropDownSingleSelect';
import Entypo from 'react-native-vector-icons/Entypo';
import {Icon} from 'native-base';
import SelectDropdown from 'react-native-select-dropdown';
// import {TextInput} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomImage from './CustomImage';
import CustomText from './CustomText';
import TextInputWithTitle from './TextInputWithTitle';
import {Platform} from 'react-native';
import {ToastAndroid} from 'react-native';

const ServiceComponent = ({setService, service, item, serviceArray}) => {
  console.log('item ======= >>>>>>', item?.name, item?.price);

  return (
    // <CustomText style={{
    //   color : 'white'
    // }}>hello</CustomText>
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: moderateScale(10, 0.6),
        width: windowWidth * 0.95,
        justifyContent: 'space-between',
        // backgroundColor : 'red',
        alignItems: 'center',
      }}>
      {item?.name == '' ? (
        <SelectDropdown
          data={serviceArray.map(item => {
            return item?.name;
          })}
          // defaultValue={item?.name}
          dropdownStyle={{
            width: windowWidth * 0.6,
            borderRadius: moderateScale(10, 0.3),
            marginTop: windowHeight * 0.01,
          }}
          buttonTextStyle={styles.dropDownBtnText}
          buttonStyle={styles.dropDownBtn}
          rowStyle={{
            backgroundColor: Color.white,
            width: windowWidth * 0.6,
            // marginTop : 10,
          }}
          rowTextStyle={{
            width: windowWidth * 0.75,
            fontSize: moderateScale(16, 0.3),
            color: 'black',
            textAlign: 'left',
            textTransform: 'capitalize',
            marginLeft: moderateScale(15, 0.3),
          }}
          selectedRowStyle={{
            backgroundColor: Color.themeColor,
          }}
          defaultButtonText={'choose a service'}
          renderDropdownIcon={() => {
            return (
              <>
                <Icon
                  name="chevron-small-down"
                  as={Entypo}
                  size={moderateScale(27, 0.3)}
                  style={[
                    styles.icon,
                    {
                      color: Color.themeGray,
                    },
                  ]}
                />
              </>
            );
          }}
          onSelect={(selectedItem, index) => {
            if (service.some(item => item?.name == selectedItem)) {
              return Platform.OS == 'android'
                ? ToastAndroid.show(
                    'Service already added!',
                    ToastAndroid.SHORT,
                  )
                : Alert.alert('Service already added!');
            } else {
              setService(prev => [...prev], (item.name = selectedItem));
            }
          }}
          backgroundColor={Color.white}
        />
       
      ) : (
        <TextInputWithTitle
          value={item?.name}
          viewHeight={0.05}
          viewWidth={0.5}
          inputWidth={0.5}
          backgroundColor={'#FFFFFF'}
          marginTop={moderateScale(20, 0.3)}
          color={Color.themeColor}
          placeholderColor={Color.themeLightGray}
          borderRadius={moderateScale(25, 0.3)}
          disable
        />
      
      )}

      <TextInput
        style={styles.inputText}
        placeholderTextColor={Color.black}
        placeholder={`${item?.price != '' ? item?.price : 'price'}`}
        onChangeText={text => {
          setService(prev => [...prev], (item.price = text));
        }}
        value={item.price}
      />

      <CustomImage
        onPress={() => {
          let tempData = [...service];

          tempData.splice(
            service?.findIndex(x => x?.name == item?.name),
            1,
          );
          setService(tempData);
        }}
        source={require('../Assets/Images/delete.png')}
        style={[styles.image]}
        resizeMode="contain"
      />
    </View>
  );
};

export default ServiceComponent;
const styles = ScaledSheet.create({
  dropDownBtn: {
    backgroundColor: Color.white,
    height: windowHeight * 0.057,
    borderRadius: moderateScale(20, 0.3),
    borderWidth: 1,
    borderColor: Color.themeColor1,
  },
  main: {
    position: 'relative',
    backgroundColor: Color.themeInputText,
    height: windowHeight * 0.06,
    borderBottomWidth: moderateScale(1, 0.3),
    borderColor: 'lightgrey',
    marginTop: moderateScale(6, 0.3),
    // borderRadius: moderateScale(20, 0.3),
    paddingLeft: moderateScale(32, 0.3),
    width: windowWidth * 0.81,
  },
  dropDownBtnText: {
    width: windowWidth * 0.75,
    // marginLeft: 38,
    fontSize: moderateScale(15, 0.3),
    color: Color.themeLightGray,
    textAlign: 'left',
    textTransform: 'capitalize',
  },
  inputText: {
    backgroundColor: 'white',
    width: windowWidth * 0.3,
    marginVertical: 10,
    borderRadius: 25,
    height: windowHeight * 0.05,
    paddingHorizontal: 15,
    // textAlign:'center',
    paddingTop: 10,
    color:Color.black
  },
  dropDownRow: {
    backgroundColor: Color.white,
  },
  dropDownRowText: {
    width: windowWidth * 0.75,
    fontSize: moderateScale(16, 0.3),
    color: 'black',
    textAlign: 'left',
    textTransform: 'capitalize',
    marginLeft: moderateScale(15, 0.3),
  },
  icon: {
    marginTop: 3,
    color: Color.themeColor1,
  },
  icon2: {
    color: Color.themeColor,
    position: 'absolute',
    left: moderateScale(10, 0.3),
    top: moderateScale(12, 0.3),
  },

  image: {
    width: windowWidth * 0.06,
    height: windowHeight * 0.05,
  },
});
