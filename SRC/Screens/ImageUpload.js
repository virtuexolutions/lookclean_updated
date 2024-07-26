import {StyleSheet, Text, View} from 'react-native';
import React, { useEffect, useState } from 'react';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../Assets/Utilities/Color';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../Components/CustomButton';
import {background} from 'native-base/lib/typescript/theme/styled-system';
import navigationService from '../navigationService';
import ImagePickerModal from '../Components/ImagePickerModal';

const ImageUpload = props => {
  const selectedServices = props?.route.params?.data;
  const barber = props?.route?.params?.barber
  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState({});

  useEffect(() => {
    
    if(Object.keys(image).length > 0){
      navigationService.navigate('ImageScreen', {data: selectedServices , image : image, barber:barber});
    }
  }, [image])

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      showUser={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        <CustomText isBold style={styles.text}>
          Image Upload
        </CustomText>

        <CustomText style={styles.text1}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi non
          pellentesque est, et luctus lacus. Nam bibendum imperdiet metus sit
          amet sodales. Vivamus efficitur.
        </CustomText>

        {/* <Icon
          name="scan-outline"
          as={Ionicons}
          size={moderateScale(250, 0.3)}
          color={'#DADADA'}
          style={{
            marginTop: moderateScale(70, 0.3),
            marginBottom: moderateScale(70, 0.3),
          }}
        /> */}
        <View
          style={{
            marginVertical: moderateScale(20, 0.3),
            width: windowWidth,
            height: windowHeight * 0.45,
           
          }}>
          <CustomImage
            source={require('../Assets/Images/scan.png')}
            resizeMode={'stretch'}
            style={{
              width: '100%',
              height: '100%',
              tintColor: 'white',
             
            }}
          />
        </View>

        <CustomButton
          bgColor={Color.themeColor}
          borderColor={'white'}
          borderWidth={1}
          textColor={Color.black}
          width={windowWidth * 0.85}
          height={windowHeight * 0.06}
          text={'Choose Image'}
          fontSize={moderateScale(14, 0.3)}
          isGradient={true}
          borderRadius={moderateScale(30, 0.4)}
          isBold
          marginTop={moderateScale(20, 0.3)}
          onPress={() => {
          setShowModal(true)
          }}
        />

        <View
          style={{
            position: 'absolute',
            bottom: 30,
            right: 0,
          }}>
          <CustomImage
            source={require('../Assets/Images/backgroundLogo.png')}
            resizeMode={'stretch'}
          />
        </View>
      </LinearGradient>
      <ImagePickerModal
          show={showModal}
          setShow={setShowModal}
          setFileObject={setImage}
        />
    </ScreenBoiler>
  );
};

export default ImageUpload;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },

  text: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(21, 0.3),
  },

  text1: {
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(10, 0.3),
    width: windowWidth * 0.8,
    lineHeight: 16,
    marginTop: moderateScale(20),
  },
});
