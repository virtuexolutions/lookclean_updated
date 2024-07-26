import React, {useState} from 'react';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const GetStarted = () => {
    const navigation= useNavigation();
    return (
    <ScreenBoiler
    // showBack={true}
    showHeader={true}
    statusBarBackgroundColor={Color.black}
    statusBarContentStyle={'light-content'}>
    <LinearGradient
      start={{x: 0.0, y: 0.25}}
      end={{x: 0.5, y: 1.0}}
      colors={Color.themeGradient}
      style={styles.container}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          // paddingBottom: windowHeight * 0.15,
          // paddingTop : moderateScale(20,0.3),
          alignItems: 'center',
        }}
        style={{
          width: windowWidth,
          zIndex : 1,
        }}>
   
   <CustomButton
          bgColor={Color.themePink}
          borderColor={'white'}
          borderWidth={1}
          textColor={Color.black}
          onPress={() => {
            navigation.navigate('Signup')

            // dispatch(setUserToken({token: 'skjfhkjhfdjjsdfjlkjlkfj;kdf;l'}));
          }}
          width={windowWidth * 0.75}
          height={windowHeight * 0.06}
          text={"join as a professional"}
          fontSize={moderateScale(14, 0.3)}
          borderRadius={moderateScale(30, 0.4)}
          textTransform={'uppercase'}
          isGradient={true}
          isBold
          marginTop={moderateScale(30, 0.3)}
        />

        <CustomText
          isBold
          onPress={() => {
           
          }}
          style={{
            color: '#fff',
            fontSize: moderateScale(13, 0.3),
            textTransform: 'uppercase',
            marginTop: moderateScale(10, 0.3),
            zIndex: 1,
          }}>
          Offering A Service?
        </CustomText>
   <CustomButton
          bgColor={Color.themePink}
          borderColor={'white'}
          borderWidth={1}
          textColor={Color.black}
          onPress={() => {
            navigation.navigate('LoginScreen')

            // dispatch(setUserToken({token: 'skjfhkjhfdjjsdfjlkjlkfj;kdf;l'}));
          }}
          width={windowWidth * 0.75}
          height={windowHeight * 0.06}
          text={"Get Started"}
          fontSize={moderateScale(14, 0.3)}
          textTransform={'uppercase'}
          isGradient={true}
          isBold
          marginTop={moderateScale(30, 0.3)}
          borderRadius={moderateScale((windowWidth * 0.7) / 2, 0.3)}


        />

        <CustomText
          isBold
          onPress={() => {
           
          }}
          style={{
            color: '#fff',
            fontSize: moderateScale(13, 0.3),
            textTransform: 'uppercase',
            marginTop: moderateScale(10, 0.3),
            zIndex: 1,
          }}>
          LookClean_updateding for A Service?
        </CustomText>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          // backgroundColor: 'red',
        }}>
        <CustomImage
          source={require('../Assets/Images/backgroundLogo.png')}
          // resizeMode={'stretch'}
          style={{}}
        />
      </View>

    </LinearGradient>
  </ScreenBoiler>
  )
}

export default GetStarted;

const styles = ScaledSheet.create({
    container: {
      paddingTop: windowHeight * 0.2,
      // justifyContent: "center",
      height: windowHeight * 0.9,
      width: windowWidth,
      alignItems: 'center',
      // backgroundColor : Color.green
    },
    bottomImage: {
      width: windowWidth * 0.4,
      alignSelf: 'center',
      // backgroundColor : 'red'
    },
    textContainer: {
      flexDirection: 'row',
  
      width: windowWidth * 0.7,
      height: windowWidth * 0.7,
      borderRadius: moderateScale((windowWidth * 0.7) / 2, 0.3),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Color.white,
    },
    LogoText: {
      fontSize: moderateScale(35, 0.3),
      fontWeight: 'bold',
    },
    text: {
      textTransform: 'uppercase',
      color: Color.white,
      fontSize: moderateScale(16, 0.3),
      // marginTop : moderateScale(10,0.3),
      // fontStyle : 'normal'
    },
    text1: {
      textTransform: 'uppercase',
      color: Color.white,
      fontSize: moderateScale(32, 0.3),
      // marginTop : moderateScale(10,0.3),
      // lineHeight: moderateScale(32, 0.3),
    },
  });