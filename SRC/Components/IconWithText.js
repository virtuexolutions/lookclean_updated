import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from 'native-base'
import CustomText from './CustomText'
import { moderateScale, scale } from 'react-native-size-matters'
import Color from '../Assets/Utilities/Color'
import CustomImage from './CustomImage'

const IconWithText = ({text="", 
    textStyle,
    iconColor,iconName, iconType, iconSize, iconSource}) => {
   var icon;
   
   if(iconSource) {
    icon = <CustomImage
    source={iconSource}
    style={[styles.image, iconColor && {tintColor:iconColor}]}
    />
   } else{
     icon = <Icon 
     name={iconName}
     as={iconType}
     size={iconSize ?? moderateScale(20,0.2)}
     color={iconColor ?? Color.white}
     />
   }
    return (
    <View style={styles.container}>
    {icon}
        <CustomText
        style={[styles.text, textStyle]}
        children={text}
        />
    </View>
  )
}

export default IconWithText

const styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        gap:scale(5),
        alignItems:"center",

    },
    text:{
        fontSize:moderateScale(10,0.2),
        lineHeight:moderateScale(18,0.2),
        color:Color.white
    }
})