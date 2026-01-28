import React, { useState } from 'react';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';
import { setIsWelcome, setUserData, setUserWallet } from '../Store/slices/common';
import { setUserLogin, setUserToken } from '../Store/slices/auth';
import { useDispatch } from 'react-redux';

const GreetingScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    return (
        <ScreenBoiler style={{ width: windowWidth, height: windowHeight }}
            statusBarBackgroundColor={Color.black}
            statusBarContentStyle={'light-content'}>
            <LinearGradient
                start={{ x: 0.0, y: 0.25 }}
                end={{ x: 0.5, y: 1.0 }}
                colors={Color.themeGradient}
                style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        alignItems: 'center',
                    }}
                    style={{
                        width: windowWidth,
                        zIndex: 1,
                    }}>
                    <View style={{
                        width: windowWidth * 0.6,
                        height: windowWidth * 0.6,
                        // backgroundColor: 'red'
                    }}>
                        <CustomImage source={require('../Assets/Images/Logo.png')} style={{ width: '100%', height: '100%' }} />
                    </View>
                    <View style={{
                        alignItems: 'center',
                        marginTop: windowWidth * 0.1
                    }}>
                        <CustomText isBold style={{
                            fontSize: moderateScale(37, 0.6),
                            color: Color.white,
                            textTransform: 'uppercase',
                        }}>Welcome</CustomText>
                        <CustomText style={{
                            fontSize: moderateScale(22, 0.6),
                            color: Color.themeColor1,
                            textAlign: 'center',
                            width: windowWidth * 0.9,
                            marginTop: moderateScale(3, 0.6)
                        }}>Book expert providers & beauty services with ease.</CustomText>
                        <CustomText style={{
                            fontSize: moderateScale(14, 0.6),
                            color: Color.lightGray,
                            textAlign: 'center',
                            width: windowWidth * 0.92,
                            marginTop: moderateScale(10, 0.6),

                        }}>LookClean brings professional grooming and beauty services right to your fingertips. Browse skilled providers and stylists, compare services, read reviews, and book appointments in just a few taps. Enjoy a smooth, modern salon experience with secure bookings, instant confirmations, and trusted service providers ready to elevate your look.</CustomText>
                        <CustomButton
                            textColor={Color.black}
                            width={windowWidth * 0.8}
                            height={windowHeight * 0.067}
                            text={'Get Started'}
                            textTransform={'uppercase'}
                            fontSize={moderateScale(14, 0.3)}
                            onPress={() => {
                                dispatch(setIsWelcome(true))
                            }}
                            isGradient={true}
                            borderRadius={moderateScale(30, 0.4)}
                            isBold
                            marginTop={moderateScale(30, 0.3)}
                        />
                    </View>
                </ScrollView>
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                    }}>
                    <CustomImage
                        source={require('../Assets/Images/backgroundLogo.png')}
                    />
                </View>
            </LinearGradient>
        </ScreenBoiler>
    )
}

export default GreetingScreen;

const styles = ScaledSheet.create({
    container: {
        paddingTop: windowHeight * 0.2,
        // justifyContent: "center",
        height: windowHeight,
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