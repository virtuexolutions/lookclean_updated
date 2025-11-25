import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import Color from '../Assets/Utilities/Color';
import { setWalkThrough } from '../Store/slices/auth';
import { windowHeight, windowWidth } from '../Utillity/utils';

const WalkThroughScreen = () => {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);

  const slides = [
    {
      key: '1',
      title: 'Discover Top Service Providers',
      text: 'Explore top-rated salons and skilled individual service providers around your location. View detailed profiles, services, ratings, and portfolio styles so you can easily find the perfect match for your grooming needs.',
      image: require('../Assets/Images/walkthrough.jpg'),
    },
    {
      key: '2',
      title: 'Book Appointments Instantly',
      text: 'Check real-time availability and book your appointments at the time that suits you best. With just a few taps, your booking is confirmed no waiting, no extra steps, just a smooth and hassle-free experience.',
      image: require('../Assets/Images/walkthrough3.jpeg'),
    },
    {
      key: '3',
      title: 'Pay & Manage',
      text: 'Make secure in-app payments and keep all your appointments organized in one place. Track upcoming bookings, view your history, and manage everything effortlessly with complete convenience.',
      image: require('../Assets/Images/walkthrough3.jpeg'),
    },
  ];

  const RenderSlide = ({ item }) => {
    return (
      <LinearGradient
        colors={Color.themeGradient}
        style={styles.slideContainer}
      >
        <View style={styles.imageWrapper}>
          <CustomImage source={item.image} style={styles.image} />
        </View>

        <CustomText style={styles.title}>{item.title}</CustomText>

        <CustomText style={styles.description}>{item.text}</CustomText>
      </LinearGradient>
    );
  };

  const Button = ({ label, onPress }) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <CustomText style={styles.buttonText}>{label}</CustomText>
    </TouchableOpacity>
  );

  return (
    <View style={styles.main}>
      <AppIntroSlider
        renderItem={RenderSlide}
        data={slides}
        ref={sliderRef}
        bottomButton={false}

        renderPagination={(activeIndex) => {
          return (
            <View
              style={{
                position: 'absolute',
                bottom: 6,
                left: 0,
                right: 0,
                backgroundColor: 'transparent',
                borderTopLeftRadius: moderateScale(20),
                borderTopRightRadius: moderateScale(20),
                paddingVertical: moderateScale(20),
                paddingHorizontal: '5%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Button
                label="Skip"
                onPress={() => dispatch(setWalkThrough(true))}
              />
              <Button
                label={activeIndex < slides.length - 1 ? 'Next' : 'Done'}
                onPress={() => {
                  if (activeIndex < slides.length - 1) {
                    sliderRef.current.goToSlide(activeIndex + 1, true);
                  } else {
                    dispatch(setWalkThrough(true));
                  }
                }}
              />
            </View>
          );
        }}

        showNextButton={false}
        showDoneButton={false}
        showSkipButton={false}
        activeDotStyle={{ backgroundColor: Color.themeBlack }}
        dotStyle={{
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: Color.themeBlack,
        }}
      />

    </View>
  );
};

export default WalkThroughScreen;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Color.white,
  },

  slideContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: moderateScale(30),
  },

  imageWrapper: {
    width: '100%',
    height: windowHeight * 0.45,
    // borderRadius: moderateScale(20),
    overflow: 'hidden',
    borderBottomRightRadius: windowWidth,
    borderBottomLeftRadius: windowWidth
  },

  image: { width: '100%', height: '100%' },

  title: {
    fontSize: moderateScale(25, 0.6),
    fontWeight: '700',
    color: Color.white,
    textAlign: 'center',
    marginTop: moderateScale(25),
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: Color.themeColor1,
    width: "90%",
  },

  description: {
    fontSize: moderateScale(14),
    color: Color.white,
    textAlign: 'center',
    marginTop: moderateScale(15),
    paddingHorizontal: moderateScale(15, 0.6),
    width: "100%",
  },

  footer: {
    width: '100%',
    paddingHorizontal: '5%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: moderateScale(25),
    paddingTop: moderateScale(10),
  },

  button: {
    height: moderateScale(45),
    width: '46%',
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    color: Color.themeColor,
    fontSize: moderateScale(14),
    fontWeight: '600',
  },

  dot: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Color.white,
  },

  activeDot: {
    backgroundColor: Color.white,
  },
});
