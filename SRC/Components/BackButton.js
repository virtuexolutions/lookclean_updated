import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { moderateScale } from 'react-native-size-matters'
import {Icon} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import Color from '../Assets/Utilities/Color';
import AntDesign from 'react-native-vector-icons/AntDesign';
const BackButton = ({color, style}) => {
    const navigationN = useNavigation();
  return (
    <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigationN.goBack()}
          style={[{
            position: 'absolute',
            zIndex: 1,
               top: 40,
            left: moderateScale(10, 0.3),
            height: moderateScale(30, 0.3),
            width: moderateScale(30, 0.3),
            borderRadius: moderateScale(5, 0.3),
            // backgroundColor: Color.themeBlack,
            justifyContent: 'center',
            alignItems: 'center',
          }, style]} >
          <Icon
            name={'arrowleft'}
            as={AntDesign}
            color={color ??  Color.white}
            size={moderateScale(25, 0.3)}
          />
        </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({})