import React, { useState } from 'react';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import { windowHeight, windowWidth } from '../Utillity/utils';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { ScrollView, View } from 'react-native';

const GreetingScreen = () => {
    const navigation = useNavigation();
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