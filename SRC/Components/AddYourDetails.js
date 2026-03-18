import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { windowHeight, windowWidth } from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import CustomText from './CustomText';
import Modal from 'react-native-modal';
import ReviewCard from './ReviewCard';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import { theme } from 'native-base';
import { mode } from 'native-base/lib/typescript/theme/tools';
import CustomButton from './CustomButton';

import CustomImage from '../Components/CustomImage';


const AddYourDetails = ({
    isVisible,
    setIsVisible,
    setSelectedUserRole,
}) => {
    return (
        <Modal
            isVisible={isVisible}
            swipeDirection="up"
            style={{
                alignItems: 'center',
                justifyContent: 'center',
            }}
            onBackdropPress={() => {
                setIsVisible(false);
            }}>
            <View style={styles.container}>
                <View style={styles.Header}>
                    <CustomText
                        style={styles.heading}>
                        add your details
                    </CustomText>
                </View>



            </View>
        </Modal>
    )
}

export default AddYourDetails

const styles = StyleSheet.create(
    {
        Header: {
            width: '100%',
            height: windowHeight * 0.07,
            backgroundColor: Color.themeColor1,
            marginBottom: moderateScale(20, 0.3),
            alignItems: 'center',
            justifyContent: 'center',
        },
        container: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: windowWidth * 0.85,
            borderWidth: 2,
            borderColor: Color.themeColor1,
            paddingBottom: moderateScale(10, 0.6),
            borderRadius: moderateScale(10, 0.6),
            paddingBottom: moderateScale(15, .6),
            overflow: 'hidden',
        },

        heading: {
            fontSize: moderateScale(15, 0.6),
            fontStyle: 'italic',
        }, main_row: {
            flexDirection: 'row',
            paddingHorizontal: moderateScale(10, .6),
            justifyContent: 'space-between'

        }, image_con: {
            height: windowHeight * 0.15,
            width: windowWidth * 0.38,
            backgroundColor: Color.red,
            borderRadius: moderateScale(10, 0.6),
            overflow: 'hidden',
            borderWidth: 1, borderColor: Color.themeColor1
        }, text: {
            fontSize: moderateScale(15, 0.6),
            color: Color.themeColor1,
            textAlign: 'center',
            marginTop: moderateScale(5, 0.6),
        }
    })