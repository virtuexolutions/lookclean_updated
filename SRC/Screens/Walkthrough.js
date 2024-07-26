import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  PixelRatio,
} from 'react-native';
import {Icon} from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';
import Color from '../Assets/Utilities/Color';
import {useSelector, useDispatch} from 'react-redux';
import ScreenBoiler from '../Components/ScreenBoiler';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {setWalkThrough} from '../Store/slices/auth';
import LinearGradient from 'react-native-linear-gradient';

const Walkthrough = props => {
  const dispatch = useDispatch();

  const slides = [
    {
      key: '1',
      title: 'Buy or Sell Residential',
      text:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ',
      logo: require('../Assets/Images/walkthrough1.png'),
    },
    {
      key: '2',
      title: 'Buy or Sell Residential',
      text:
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the ',
      logo: require('../Assets/Images/walkthrough2.png'),
    },
  ];

  const RenderSlider = ({item}) => {
    return (
      <View style={styles.SliderContainer}>
        <Image
          source={item.logo}
          resizeMode={'contain'}
          style={{height: windowHeight * 0.5}}
        />
        <LinearGradient
          start={{x: 0.0, y: 0.25}}
          end={{x: 0.5, y: 1.0}}
          colors={[Color.green, Color.themeGreen]}
          style={[styles.subcontainer]}
        >
          {/* <View style={styles.subcontainer}> */}
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Text numberOfLines={1} style={styles.title}>
              {item.title}
            </Text>
            <Text numberOfLines={4} style={styles.subText}>
              {item.text}
            </Text>
          </View>
          {/* <CustomImage
            source={require('../Assets/Images/Vector.png')}
            resizeMode={'cover'}
            style={{
              position: 'absolute',
              left: 0,
              width: windowWidth,
              // zIndex: -1,
              bottom: -10,
            }}
          /> */}
          {/* </View> */}
        </LinearGradient>
      </View>
    );
  };

  const RenderNextBtn = () => {
    return (
      <CustomText style={[styles.generalBtn, styles.btnRight]}>Next</CustomText>
    );
  };
  const RenderDoneBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough());
        }}
        style={[styles.generalBtn, styles.btnRight]}
      >
        Done
      </CustomText>
    );
  };
  const RenderSkipBtn = () => {
    return (
      <CustomText
        onPress={() => {
          dispatch(setWalkThrough());
        }}
        style={[styles.generalBtn, styles.btnLeft]}
      >
        Skip
      </CustomText>
    );
  };
  const RenderBackBtn = () => {
    return (
      <CustomText style={[styles.generalBtn, styles.btnLeft]}>Back</CustomText>
    );
  };
  return (
    <ScreenBoiler
      showHeader={false}
      statusBarBackgroundColor={[Color.white, Color.white]}
      statusBarContentStyle={'dark-content'}
    >
      <View style={styles.container}>
        {/* <CustomImage
          source={backgroundImage}
          resizeMode="contain"
          style={styles.bgImage}
        /> */}
        <AppIntroSlider
          renderItem={RenderSlider}
          data={slides}
          showSkipButton={true}
          showPrevButton={true}
          activeDotStyle={{backgroundColor: Color.white}}
          dotStyle={{
            backgroundColor: 'transparent',
            borderWidth: 1,
            borderColor: Color.white,
          }}
          renderDoneButton={RenderDoneBtn}
          renderNextButton={RenderNextBtn}
          renderSkipButton={RenderSkipBtn}
          renderPrevButton={RenderBackBtn}
        />
      </View>
    </ScreenBoiler>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
  },
  SliderContainer: {
    // flex: 1,
    height: windowHeight,
    width: windowWidth,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
  title: {
    color: Color.white,
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
    color: Color.white,
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
    width: windowWidth * 0.8,
    marginTop: moderateScale(10, 0.3),
  },
  generalBtn: {
    paddingVertical: moderateScale(15, 0.3),
    textAlign: 'center',
    fontWeight: '400',
    fontSize: moderateScale(15, 0.3),
  },
  btnLeft: {
    color: Color.white,
    paddingLeft: moderateScale(20, 0.3),
  },
  btnRight: {
    color: Color.white,
    paddingRight: moderateScale(20, 0.3),
  },
});

export default Walkthrough;
