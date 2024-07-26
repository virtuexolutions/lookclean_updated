import React from "react";
import { ImageBackground, StatusBar, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Color from "../Assets/Utilities/Color";
import CustomStatusBar from "../Components/CustomStatusBar";
import CustomText from "../Components/CustomText";
import CustomImage from "../Components/CustomImage";
import { windowHeight, windowWidth } from "../Utillity/utils";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import ScreenBoiler from "../Components/ScreenBoiler";
import LinearGradient from "react-native-linear-gradient";
import { SafeAreaView } from "react-native";
import FastImage from "react-native-fast-image";


const SplashScreen = () => {
  const backgroundImage = require("../Assets/Images/splash2.gif");
  return (
    <SafeAreaView style={styles.container}>
    <StatusBar
     
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={"light-content"}
    />
     <LinearGradient 
      start={{ x: 0.0, y: 0.25 }}
      end={{ x: 0.5, y: 1.0 }}
      colors={Color.themeGradient}
     style={styles.container}>
     
      
      <View
        style={{
          height: windowHeight*0.55,
          width: windowWidth * 0.99, // flex: 1,
         
        }}>
        <FastImage
          source={require('../Assets/Images/splash2.gif')}
          style={{width: '100%', height: '100%'}}
          animated
        />
      </View>
        </LinearGradient>
    </SafeAreaView>
    

  );
};

const styles = ScaledSheet.create({
  container: {
    justifyContent: "center",
    height: windowHeight,
    width: windowWidth,
    // backgroundColor : Color.green
  },
  bottomImage: {
    width : windowWidth * 0.65,
    alignSelf :'center',
    // backgroundColor : 'red'
  },
  textContainer: {
    flexDirection: "row",
   
    width : windowWidth * 0.7,
    height :windowWidth * 0.7,
    borderRadius : moderateScale(windowWidth* 0.7 / 2 , 0.3),
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : Color.white,
    

  },
  LogoText: {
    fontSize: moderateScale(35, 0.3),
    fontWeight: "bold",
  },
 
});

export default SplashScreen;
