import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import { moderateScale } from 'react-native-size-matters';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const SelectLocationModal = ({ isVisible, setIsVisibleModal, setLocation, onPress }) => {
  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isVisible}
      onBackdropPress={() => {
        onPress ? onPress() : setIsVisibleModal(false);
      }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.maincontainer}>
          <CustomText
            style={{
              color: Color.themeColor,
              marginBottom: moderateScale(20, 0.3),
              fontSize: moderateScale(22, 0.6),
            }}
            isBold>
            Select Location
          </CustomText>
          <GooglePlacesAutocomplete
            keepResultsAfterBlur={true}
            placeholder="Search"
            textInputProps={{
              placeholderTextColor: '#5d5d5d',
            }}
            onPress={(data, details = null) => {
              console.log('location hrfeeeeeeee , ', data)
              setLocation({
                name: data?.description,
                lat: details?.geometry?.location?.lat,
                lng: details?.geometry?.location?.lng,
              });
              onPress ? onPress() : setIsVisibleModal(false);
            }}
            query={{
              key: 'AIzaSyAqNK7IfM16zi79N0u7qX4Ncm5QgGvBqmg',
              // key: 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc',

              language: 'en',
            }}
            onFail={(error) => {
              console.log('Google Places Error:', error);
              // yahan error ko alert ya toast se show bhi kar sakte ho
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
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SelectLocationModal;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: Color.black,
    width: windowWidth * 0.9,
    height: windowHeight * 0.8,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    borderWidth: 1,
    borderColor: Color.themeColor,
  },
});
