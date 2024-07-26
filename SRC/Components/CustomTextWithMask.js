import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view'
import CustomText from './CustomText'
import LinearGradient from 'react-native-linear-gradient'
import Color from '../Assets/Utilities/Color'
import { moderateScale } from 'react-native-size-matters'
import { windowWidth } from '../Utillity/utils'

const CustomTextWithMask = ({containerStyle , data , isBold , textStyle , size}) => {
  return (
   <MaskedView
   style={[{
    flexDirection: 'row', height: moderateScale(size,0.3),
   
   }, containerStyle &&containerStyle ]}
   maskElement={

        <CustomText isBold={isBold && isBold} style={textStyle}>{data}</CustomText>


}
   >
       <LinearGradient
       start={{x : 0 , y : 0}}
       end={{ x : 0 , y : 1}}
              colors={['#C49948', '#EBDBBD' , '#E3C488']}
              style={{ height : moderateScale(50,0.3) , width : windowWidth }}
            />
    

   </MaskedView>
  )
}

export default CustomTextWithMask

const styles = StyleSheet.create({})