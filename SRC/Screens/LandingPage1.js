import React from "react";
import { ImageBackground, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Color from "../Assets/Utilities/Color";
import CustomText from "../Components/CustomText";
import CustomImage from "../Components/CustomImage";
import { windowHeight, windowWidth } from "../Utillity/utils";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import ScreenBoiler from "../Components/ScreenBoiler";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../Components/CustomButton";

const LandingPage1 = () => {
    const backgroundImage = require("../Assets/Images/appLogo.png");
    return (
      <ScreenBoiler
       
        statusBarBackgroundColor={Color.black}
        statusBarContentStyle={"light-content"}
      >
       <LinearGradient 
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        colors={Color.themeGradient}
       style={styles.container}>
       
        
            <CustomImage
              animation="fadeInDown"
              duration={2500}
              useNativeDriver
              source={backgroundImage}
              resizeMode={"contain"}
              style={[styles.bottomImage]}
              onAnimationEnd={() => {
              }}
            />
              <CustomText isBold style={styles.text}>amazing things come from</CustomText>
              <CustomText isBold style={styles.text1}>perfect LookClean_updated</CustomText>
             <CustomButton
            bgColor={Color.themePink}
            borderColor={'white'}
            borderWidth={1}
            textColor={Color.black}
            onPress={()=>{}}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            text={'Sign In'}
            fontSize={moderateScale(14, 0.3)}
            // borderRadius={moderateScale(30, 0.3)}
            textTransform ={'uppercase'}
            isGradient={true}
            isBold
            marginTop={moderateScale(20, 0.3)}
            
          />
        
          <CustomButton
            bgColor={Color.themePink}
            borderColor={'white'}
            borderWidth={1}
            textColor={Color.black}
            onPress={()=>{}}
            width={windowWidth * 0.75}
            height={windowHeight * 0.06}
            text={'Sign Up'}
            fontSize={moderateScale(14, 0.3)}
            // borderRadius={moderateScale(30, 0.3)}
            textTransform ={'uppercase'}
            isGradient={true}
            isBold
            marginTop={moderateScale(15, 0.3)}
            
          />
       

          <View style={{
         
            position : 'absolute',
            bottom : 0,
            right : 0
          }}>

         
            <CustomImage
            source={require('../Assets/Images/backgroundLogo.png')}
            // resizeMode={'stretch'}
            style={{
            }}
            />
             </View>
        </LinearGradient>
      </ScreenBoiler>
    );
}

export default LandingPage1

const styles = ScaledSheet.create({
    container: {
      justifyContent: "center",
      height: windowHeight,
      width: windowWidth,
      alignItems : 'center',
      // backgroundColor : Color.green
    },
    bottomImage: {
      width : windowWidth * 0.4,
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
    text : {
        textTransform : 'uppercase',
        color : Color.white,
        fontSize : moderateScale(16,0.3),
        // marginTop : moderateScale(10,0.3),
        // fontStyle : 'normal'
    },
    text1 :{
        textTransform : 'uppercase',
        color : Color.white,
        fontSize : moderateScale(32,0.3),
        // marginTop : moderateScale(10,0.3),
        lineHeight : moderateScale(32,0.3)

    },
  });