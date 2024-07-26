import React from "react";
import { ImageBackground, View } from "react-native";
import * as Animatable from "react-native-animatable";
import Color from "../Assets/Utilities/Color";
import CustomStatusBar from "../Components/CustomStatusBar";
import CustomText from "../Components/CustomText";
import CustomImage from "../Components/CustomImage";
import { windowHeight, windowWidth } from "../Utillity/utils";
import { moderateScale, ScaledSheet } from "react-native-size-matters";
import ScreenBoiler from "../Components/ScreenBoiler";
import LinearGradient from "react-native-linear-gradient";
import CustomButton from "../Components/CustomButton";

const LandingPage = () => {
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
             <CustomButton
            bgColor={Color.themePink}
            borderColor={'white'}
            borderWidth={1}
            textColor={Color.black}
            onPress={()=>{}}
            width={windowWidth * 0.8}
            height={windowHeight * 0.06}
            text={'Join as a Professional'}
            fontSize={moderateScale(14, 0.3)}
            // borderRadius={moderateScale(30, 0.3)}
            textTransform ={'uppercase'}
            isGradient={true}
            isBold
            marginTop={moderateScale(12, 0.3)}
            
          />
          <CustomText style={styles.text}>Offering a service?</CustomText>
          <CustomButton
            bgColor={Color.themePink}
            borderColor={'white'}
            borderWidth={1}
            textColor={Color.black}
            onPress={()=>{}}
            width={windowWidth * 0.8}
            height={windowHeight * 0.06}
            text={'Get started'}
            fontSize={moderateScale(14, 0.3)}
            // borderRadius={moderateScale(30, 0.3)}
            textTransform ={'uppercase'}
            isGradient={true}
            isBold
            marginTop={moderateScale(12, 0.3)}
            
          />
          <CustomText style={styles.text}>LookClean_updateding for a service?</CustomText>

          <View style={{
            // backgroundColor : 'red',
            // height : 20,
            // width : 20,
            position : 'absolute',
            bottom : 0,
            right : 0
          }}>

         
            <CustomImage
            source={require('../Assets/Images/backgroundLogo.png')}
            resizeMode={'stretch'}
            style={{
            //   flexGrow : 0 ,
            //   position : 'absolute',
            //   bottom : moderateScale(0,0.3) ,
            //   right : 1,
            //   zIndex : 1,
              // left : 0,
            //   top : moderateScale(50,0.3),
              // backgroundColor : 'red'
            }}
            />
             </View>
        </LinearGradient>
      </ScreenBoiler>
    );
}

export default LandingPage

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
        fontSize : moderateScale(12,0.3),
        marginTop : moderateScale(10,0.3),
    },
  });