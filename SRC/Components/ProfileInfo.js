import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { Icon } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import { windowWidth } from '../Utillity/utils';
import TitleWithDescription from './TitleWithDescription';

const ProfileInfo = ({data}) => {
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.imageContainer}>
                    <CustomImage
                        style={{ width: "100%", height: "100%" }}
                        source={require("../Assets/Images/barber.png")}
                    />

                </View>
                <View style={styles.badge}>
                    <Icon
                        name='check'
                        as={AntDesign}
                        color={Color.white}
                    />
                </View>
            </View>
            <View style={styles.infoBox}>
                <CustomText isBold style={styles.name}>
                    Joseph Smith
                </CustomText>
                <TitleWithDescription
                title=' Specialty:'
                description={"Massage Therapist"}
                style={styles.infoContainer}
                titleStyle={styles.subText}
                descriptionStyle={styles.subText}
                />
                <TitleWithDescription
                title='Provider ID:'
                description={"LC-38971"}
                style={styles.infoContainer}
                titleStyle={styles.subText}
                descriptionStyle={styles.subText}
                />
                <TitleWithDescription
                title='Experience:'
                description={"8 Years"}
                style={styles.infoContainer}
                titleStyle={styles.subText}
                descriptionStyle={styles.subText}
                />
                <TitleWithDescription
                title='Status:'
                description={" ✔ Verified"}
                style={styles.infoContainer}
                titleStyle={styles.subText}
                descriptionStyle={styles.verified}
                />
            </View>
        </View>

    )
}

export default ProfileInfo

const styles = StyleSheet.create({
    container:{
        gap:scale(20),
        flexDirection:"row",
        paddingVertical:verticalScale(10),
    },
    imageContainer: {
        width: windowWidth * 0.25, height: windowWidth * 0.25,
        borderRadius: (windowWidth * 0.25) / 2,
        overflow: "hidden"
    },
    badge:{
        width:scale(20),
        height:scale(20),
        backgroundColor:Color.green,
        borderWidth:1,
        borderRadius:scale(10),
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        zIndex:1,
        borderColor:Color.white,
        left:scale(70),
        bottom:scale(18)
      },
    infoBox: {
        gap:scale(2),
        // marginLeft: scale(12),
        width: windowWidth * 0.6
    },

    name: {
        fontSize: moderateScale(16),
        color: Color.white,
    },
infoContainer:{
    flexDirection:'row',
    paddingHorizontal:0,

},
    subText: {
        fontSize: moderateScale(12),
        color: Color.white,
        marginTop: verticalScale(2),
    },

    verified: {
        fontSize: moderateScale(14,0.2),
        color: Color.green,
    },

})