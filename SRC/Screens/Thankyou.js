import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { windowHeight, windowWidth } from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import CustomImage from '../Components/CustomImage';
import CustomModal from '../Components/CustomModal';
import navigationService from '../navigationService';


const Thankyou = () => {
    const [visible, setVisible] = useState(true);
    const [firstSection, setFirstSection] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [email , setEmail] = useState('');
    const [password , setPassword]=useState('')
    
  
    const Splash1 = require('../Assets/Images/AccesoriesBig.png');
    const Splash2 = require('../Assets/Images/AccesoriesRight.png');
    const Splash3 = require('../Assets/Images/AccesoriesSmall.png');

    useEffect(() => {
        setTimeout(() => {
          navigationService.navigate('LoginScreen')
        }, 2000);

    }, [])
    

  return (
    <ScreenBoiler
      statusBarBackgroundColor={Color.white}
      statusBarContentStyle={'dark-content'}>
      <View style={styles.container}>
        <View style={[styles?.textContainer]}>
          <CustomImage
            source={Splash1}
            resizeMode={'contain'}
            style={[styles.bottomImage]}
          />
        </View>
        <View style={[styles?.textContainer1]}>
          <CustomImage
            source={Splash2}
            resizeMode={'contain'}
            style={[styles.bottomImage1]}
          />
        </View>
        <View style={[styles?.textContainer2]}>
          <CustomImage
            source={Splash3}
            resizeMode={'contain'}
            style={[styles.bottomImage2]}
          />
        </View>
      </View>
      <CustomModal isModalVisible={visible} hasBackdrop={false}>
          <Text style={styles.Heading}>Thank You</Text>
      
      </CustomModal>
    </ScreenBoiler>
  )
}

export default Thankyou

const styles = ScaledSheet.create({
    container: {
      // flex: 1,
      // justifyContent: "center",
      height: windowHeight,
      width: windowWidth,
      backgroundColor: Color.white,
    },
    bottomImage: {
      width: windowWidth * 0.5,
    },
   
    bottomImage1: {
      width: windowWidth * 0.25,
    },
    bottomImage2: {
      width: windowWidth * 0.19,
    },
  
    textContainer: {
      marginTop: moderateScale(20, 0.3),
    },
    textContainer2: {
      height: windowHeight * 0.3,
      marginTop: moderateScale(50, 0.3),
      justifyContent: 'center',
      // backgroundColor : 'red'
    },
    textContainer1: {
      marginTop: moderateScale(-70, 0.3),
      alignSelf: 'flex-end',
      // backgroundColor : 'green'
    },
    Heading: {
      fontSize: moderateScale(36, 0.3),
      fontWeight: 'bold',
      color: '#1B5CFB',
      textAlign: 'center',
      // fontFamily : 'serif',
    },
    text: {
      fontSize: moderateScale(12, 0.3),
      color: '#000000',
      textAlign: 'center',
      lineHeight: moderateScale(20, 0.3),
      // marginTop: moderateScale(10, 0.3),
      width : '60%',
      alignSelf : 'center'
    },
 
  
  });