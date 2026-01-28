import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomText from './CustomText'
import { windowWidth } from '../Utillity/utils'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'

const TitleWithDescription = ({
    title = "",
    description = "",
    style,
    titleIsBold=true,
    descriptionStyle,
    titleStyle
}) => {
    // const descType = typeof  description == ""
    return (
        <View style={[styles.container, style]}>
            <CustomText
                isBold={titleIsBold}
                style={[styles.text1, titleStyle]}
                children={title}
            />
            {
                typeof description == "string" ? <CustomText
                    style={[styles.text2, descriptionStyle]}
                    children={description}
                /> : React.isValidElement(description) ? description : null
            }

        </View>
    )
}

export default TitleWithDescription

const styles = StyleSheet.create({
    container: {
        // width: windowWidth * 0.75,
        gap: scale(6),
        paddingHorizontal: scale(10),
        // paddingVertical:verticalScale(18)

    },
    text1: {
        fontSize: moderateScale(16, 0.2),
        color: Color.white,
    },
    text2: {

        fontSize: moderateScale(14, 0.2),
        color: "#7F8489",
        // width:"60%",
    }
})