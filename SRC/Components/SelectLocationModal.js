import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import { moderateScale } from 'react-native-size-matters';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SelectLocationModal = ({isVisible , setIsVisibleModal , setLocation}) => {
  return (
    <Modal
    hasBackdrop={true}
    style={{
      justifyContent: 'center',
      alignItems: 'center',
    }}
    isVisible={isVisible}
    onBackdropPress={() => {
      setIsVisibleModal(false);
    }}>
    <View style={styles.maincontainer}>
      <CustomText
        style={{
          color: Color.themeColor,
          marginBottom:moderateScale(10,.3),
          fontSize: moderateScale(22, 0.6),
        }}
        isBold>
        Select Location
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
            setIsVisibleModal(false)
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
              width: windowWidth * 0.8,
              marginLeft: moderateScale(5, 0.6),
              borderColor: Color.veryLightGray,
            
            },

            description: {
              color: 'black',
            },
          }}
        />
      </View></Modal>
  )
}

export default SelectLocationModal


const styles = StyleSheet.create({
    maincontainer: {
      backgroundColor: Color.black,
      width: windowWidth * 0.9,
      height : windowHeight * 0.8,
      alignItems: 'center',
      borderRadius: moderateScale(20, 0.3),
      paddingVertical: moderateScale(15, 0.3),
      borderWidth : 1,
      borderColor : Color.themeColor
    },
  });