import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import TitleWithDescription from './TitleWithDescription'
import Color from '../Assets/Utilities/Color'
import IconWithText from './IconWithText'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { Divider } from 'native-base'
import CustomText from './CustomText'
import { windowHeight, windowWidth } from '../Utillity/utils'
import CustomImage from './CustomImage'
const BarberServicesInfo = ({ data }) => {
    return (
        <View style={styles.servicesInfo}>
            <View style={styles.column}>
                <TitleWithDescription
                    title='Primary Credential'
                    titleStyle={styles.title}
                    description='Primary License'
                />
                <Divider/>
                <TitleWithDescription
                    title='Services Record'
                    titleStyle={styles.title}
                    description='256 Services Completed'
                    />
                    <Divider/>
                <TitleWithDescription
                    title="Rating & Tier"
                    titleStyle={styles.title}
                    description={<IconWithText
                        iconName={"star"}
                        iconType={AntDesign}
                        iconColor={Color.themeColor}
                        text='Gold Provider'
                        textStyle={styles.text2}
                    />}

                />
                <TitleWithDescription
                    titleIsBold={false}
                    title="Cerrtification: Certified Provider"
                    titleStyle={styles.text1}
                />
            </View>
            <Divider
                orientation='vertical'
                height={windowHeight * 0.15}
            />
            <View style={styles.column}>
                <TitleWithDescription
                    title="Service Record"
                    titleStyle={styles.title}
                    description={<IconWithText
                        iconName={"star"}
                        iconType={AntDesign}
                        iconColor={Color.themeColor}
                        text='Gold Provider'
                        textStyle={styles.text2}
                    />}
                />
                <TitleWithDescription
                    titleIsBold={false}
                    title="Cerrtification: Certified Provider"
                    titleStyle={styles.text1}
                />
                <View style={styles.serviceImage}>

                    <CustomImage
                        style={styles.image}
                        source={require("../Assets/Images/bannerImage2.png")}
                    />
                </View>




            </View>
        </View>
    )
}

export default BarberServicesInfo

const styles = StyleSheet.create({
    servicesInfo: {
        paddingTop: verticalScale(6),
        flexDirection: "row",
        gap: scale(10),
    },
    column: {
        gap: scale(10),
        paddingTop: verticalScale(8)
    },
    title: {
        textTransform: "capitalize",
    },
    text1: {
        fontWeight: "light",
        width: windowWidth * 0.3
    },
    serviceImage: {
        top: verticalScale(-20),
        width: windowWidth * 0.35,
        height: windowWidth * 0.25,
        overflow: "hidden",
        borderRadius: moderateScale(10, 0.2)
    },
    image: {
        width: "100%",
        height: "100%"
    },
    text2:{
        fontSize: moderateScale(14, 0.2),
        color: "#7F8489",
    }
})