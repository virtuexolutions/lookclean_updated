import {Icon} from 'native-base';
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import {setWalkThrough} from '../Store/slices/auth';
import {windowHeight, windowWidth} from '../Utillity/utils';
import { useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';


const WalkThroughScreen = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const slidesref =useRef(null)
  const slides = [
    {
      key: '1',
      image: require('../Assets/Images/walkthrough.jpg'),
      title: 'Book a Professional Barber',
    text:
      'Easily discover and book top-rated barbers near you. Choose the perfect stylist based on reviews, services, and availability.',
    },
    {
      key: '2',
      image: require('../Assets/Images/walkthrough2.jpg'),
      title: 'Look Sharp, Feel Confident',
    text:
      'Enjoy a seamless grooming experience. From trims to transformations, Look_Clean helps you stay fresh and stylish with just a few taps.',
    },
    {
      key: '3',
      title: 'Track Appointments & History',
      text:
        'Manage your upcoming appointments and view your grooming history all in one place. Stay on top of your style routine effortlessly.',
      image: require('../Assets/Images/walkthrough3.jpeg'),
    }
    // {
    //   key: '3',
    //   image: require('../Assets/Images/walkthrough1.jpg'),
    //   title: 'DODGE CARAVAN',
    //   text: `Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Pellentesque Eu Pulvinar Metus, Fringilla Semper Enim. Etiam Viverra Porttitor Nunc Laoreet Faucibus. Fusce Accumsan Mauris At Sem Finibus Gravida. Donec Cursus Tincidunt Eros In Efficitur. Maecenas Cursus Pretium Dui, In Tristique Turpis Finibus Nec. Class Aptent.`,
    // },
  ];
  console.log(slidesref.current ,'indexxxxxxx')

  const RenderSlider = ({item}) => {
    return (
<LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        <View style={{
          width: windowWidth * 0.94,
          height: windowHeight * 0.6,
          borderRadius: moderateScale(20,0.2),
          overflow:"hidden"
        }}>
          <CustomImage source={item.image} style={{
            width: "100%",
            height: "100%",
          }}/>
        </View>
                        <CustomText style={{
                          fontSize : moderateScale(20,0.6),
                          // position:'absolute',
                          // bottom:'126%',
                          // top:'60%',
                          width:'100%',
                          fontWeight: "bold",
                          textAlign:'center',
                          color:Color.white,
                          marginTop:moderateScale(30,0.2)
                          // marginHorizontal:moderateScale(50,.3)
                        }}>{item?.title}</CustomText>

                        <CustomText style={{
                          fontSize : moderateScale(15,0.6),
                          // position:'absolute',
                          // bottom:'26%',
                          width:'97%',
                          // fontWeight: "bold",
                          textAlign:'center',
                          marginTop:moderateScale(30,0.2),
                          color:Color.white
                          // marginHorizontal:moderateScale(50,.3)
                        }}>{item?.text}</CustomText>
      </LinearGradient>
       
      //   <ImageBackground
      //   imageStyle={{
      //     height:'100%',
      //     width:'100%'
      //   }}
      // resizeMode='cover'
      //     style={{
      //       width: windowWidth,
      //       height: windowHeight,
      //       alignItems: "center",
      //       backgroundColor : 'white'
      //               }}
      //     source={item.image}>
            
      //                   <CustomText style={{
      //                     fontSize : moderateScale(20,0.6),
      //                     position:'absolute',
      //                     // bottom:'126%',
      //                     top:'60%',
      //                     width:'100%',
      //                     fontWeight: "bold",
      //                     textAlign:'center',
      //                     color:Color.white,
      //                     // marginHorizontal:moderateScale(50,.3)
      //                   }}>{item?.title}</CustomText>

      //                   <CustomText style={{
      //                     fontSize : moderateScale(15,0.6),
      //                     position:'absolute',
      //                     bottom:'26%',
      //                     width:'100%',
      //                     fontWeight: "bold",
      //                     textAlign:'center',
      //                     color:Color.themeColor
      //                     // marginHorizontal:moderateScale(50,.3)
      //                   }}>{item?.text}</CustomText>
      //     <LinearGradient
      //                 start={{x: 0, y: 0.7}}
      //                 end={{x: 0.1, y: 1}}
      //                 colors={['#8A8A8A00', '#000000']}
      //                 style={{
      //                   height: windowHeight * 0.4,
      //                   position: 'absolute',
      //                   bottom: 0,
      //                   borderRadius: 5,
      //                   justifyContent: 'flex-end',
      //                   shadowOffset: {height: 1, width: 0},
      //                   shadowOpacity: 1,
      //                   shadowRadius: 4,
      //                   width: '100%',
      //                   alignItems: 'center',
      //                   paddingBottom: moderateScale(20, 0.3),
      //                   paddingTop: moderateScale(60, 0.3),
      //                 }}>
          
                      
      //               </LinearGradient>
      //   </ImageBackground>
    );
  };

  const RenderNextBtn = ({onPress, text}) => {
    return (
      <TouchableOpacity 
      onPress={onPress}
    style={{
          height: windowHeight * 0.07,
          width: windowWidth * 0.45,
          borderRadius: (windowHeight * 0.09) / 2,
          // backgroundColor: 'white',
          // borderWidth: 5,
          backgroundColor:"rgba(0,0,0,0.1)",
          alignItems: 'center',
          justifyContent: 'center',

          borderColor: Color.lightGray,
          bottom: -170,
          left: moderateScale(-20,0.2),
          alignSelf : 'flex-end'
        }}>
       <CustomText style={{
        color:Color.themeColor1,
        fontSize : moderateScale(14,0.6)
       }} >{text}</CustomText>
      </TouchableOpacity>
    );
  };
  const RenderDoneBtn = () => {
    return (
      <TouchableOpacity 
      onPress={()=>{
        dispatch(setWalkThrough(true))
      }} 
      // onPress={onPress}
    style={{
          height: windowHeight * 0.09,
          width: windowHeight * 0.09,
          borderRadius: (windowHeight * 0.09) / 2,
          // backgroundColor: 'white',
          borderWidth: 5,
          alignItems: 'center',
          justifyContent: 'center',

          borderColor: Color.themeColor,
          bottom: 70,
          left: moderateScale(-20,0.2),
          alignSelf : 'center'
        }}>
       <CustomText style={{
        color:Color.themeColor1,
        fontSize : moderateScale(14,0.6)
       }} >Done</CustomText>
      </TouchableOpacity>
    );
  };
  const RenderSkipBtn = () => {
    return (
      <TouchableOpacity 
      onPress={()=>{
        dispatch(setWalkThrough(true))
      }}
      // <View 
      // onPress={onPress}
    style={{
          height: windowHeight * 0.07,
          width: windowWidth * 0.45,
          borderRadius: (windowHeight * 0.09) / 2,
          // backgroundColor: 'white',
          // borderWidth: 5,
          backgroundColor:"rgba(0,0,0,0.1)",
          alignItems: 'center',
          justifyContent: 'center',

          borderColor: Color.lightGray,
          bottom: -270,
          left: moderateScale(10,0.2),
          // alignSelf : 'flex-start'
        }}>
       <CustomText style={{
        color:Color.themeColor1,
        fontSize : moderateScale(14,0.6)
       }} >SKIP</CustomText>
      {/* </View> */}
      </TouchableOpacity>
    );
  };

  return (

      <View style={styles.container1}>
     
        <AppIntroSlider
          renderItem={RenderSlider}
          data={slides}
          ref={slidesref}

        renderPagination={(activeindex)=>{
          console.log('activeeeeeee ,index ' ,activeindex) 

          return(

            <View style={{
              width : windowWidth ,
              height : windowHeight * 0.21,
              backgroundColor : 'transparent',
              position : 'absolute',
              bottom : '23%',
              rowGap : moderateScale(35,0.6),
            }}>
              <RenderSkipBtn />
              <RenderNextBtn text={
                slidesref.current && activeindex < slides.length - 1 ? 
                "Next" : "Done"
              } onPress={() => {
              if (slidesref.current) {
                if (activeindex < slides.length - 1) {
                  slidesref.current.goToSlide(activeindex + 1, true); 
                } else {
                  dispatch(setWalkThrough(true)); 
                }}}}
                />
            </View>
          )
        }}
        // renderDoneButton={RenderDoneBtn}
        // renderNextButton={RenderNextBtn}
        // renderPrevButton={}
        // pagingEnabled={false}
        
        // showSkipButton={true}
          // renderSkipButton={RenderSkipBtn}
          showNextButton={true}
          activeDotStyle={{backgroundColor: Color.themeBlack}}
          dotStyle={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: Color.themeBlack,
          }}
      
        />

      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: windowHeight * 0.03,
    height: windowHeight,
    width: windowWidth,
    alignItems: 'center',
  },
  container1: {
    height:windowHeight,
    width:windowWidth,
    backgroundColor:'white'
  },
  bgImage: {
    flex: 1,
  },
  SliderContainer: {
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  title: {
    color: Color.themeColor1,
    fontWeight: '700',
    fontSize: 30,
    textAlign: 'center',
    width: windowWidth * 0.8,
    marginTop: windowHeight * 0.065,
  },
  subcontainer: {
    width: windowWidth,
    height: windowHeight * 0.55,
    backgroundColor: Color.green,
    borderTopLeftRadius: moderateScale(35, 0.3),
    borderTopRightRadius: moderateScale(35, 0.3),
  },
  subText: {
    color: Color.themeColor1,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
    width: windowWidth * 0.8,
    marginTop: moderateScale(10, 0.3),
  },
  generalBtn: {
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
  },
  btnLeft: {
    color: Color.themeBlack,
  },
  btnRight: {
    color: Color.white,
  },
});

export default WalkThroughScreen;
const BoldText = ({children}) => {
  return <Text style={{fontWeight: 'bold'}}>{children}</Text>;
};
