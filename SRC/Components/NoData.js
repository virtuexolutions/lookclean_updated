import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import Lottie from 'lottie-react-native';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import LottieView from 'lottie-react-native';
import * as Animatable from "react-native-animatable";
import CustomImage from './CustomImage';

const backgroundImage = require("../Assets/Images/Logo.png");
const NoData = ({textStyle, style, text}) => {
  return (
    <View style={{
      // backgroundColor:'green',
      // justifyContent:'center',
      alignItems:'center'
    }}>
      <View style={style}>
      <LottieView
          source={require('../Assets/Images/animation3.json')}
          autoPlay
          loop
          style={{
            width: windowWidth * 0.4,
            height: windowHeight * 0.2,
            alignSelf: 'center',
          }}
        
        />
         {/* <CustomImage
        source={require('../Assets/Images/Logo.png')}
        resizeMode={'stretch'}
       
      /> */}
      </View>
      <CustomText style={styles.nodata} isBold>
        {text ? text : 'Data not found'} 
      </CustomText>
    </View>
  );
};

export default NoData;

const styles = StyleSheet.create({
  nodata: {
    fontSize: moderateScale(14, 0.6),
    textAlign: 'center',
    marginTop: moderateScale(5, 0.3),
    color: Color.themeColor,
  },
  bottomImage: {
    width : windowWidth * 0.65,
    alignSelf :'center',
    // backgroundColor : 'red'
  },
});
