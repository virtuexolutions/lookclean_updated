import { FlatList, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
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
import Feather from 'react-native-vector-icons/Feather'
import TextInputWithTitle from '../Components/TextInputWithTitle';
import CustomImage from '../Components/CustomImage';
import DropDownSingleSelect from './DropDownSingleSelect';


const SelectUserRole = ({
    isVisible,
    setIsVisible,
    setAddress,
    address,
    selectedUserRole,
    setSelectedUserRole,
    designation,
    setDesignation,
    setselectLocationModal,
    onPress,
    loader
}) => {
    console.log(selectedUserRole, 'selectedUserRole');
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
                        isBold
                        style={styles.heading}>
                        Required fields for Login
                    </CustomText>
                </View>

                <View style={styles.main_row}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setSelectedUserRole('Barber')}>
                        < View style={[styles.image_con, {
                            marginHorizontal: moderateScale(15, .6),
                            borderColor: selectedUserRole === 'Barber' ? Color.themeColor : Color.themeColor1,
                            borderWidth: selectedUserRole === 'Barber' ? 2 : 1,
                        }]}>
                            <CustomImage
                                onPress={() => setSelectedUserRole('Barber')}

                                style={{
                                    height: '100%',
                                    width: '100%',
                                    // resizeMode: 'contain'
                                }} source={require('../Assets/Images/bannerImage2.png')} />
                        </ View>
                        <CustomText isBold style={[styles.text, selectedUserRole === 'Barber' && { color: Color.themeColor }]}>Service Provider</CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setSelectedUserRole('Customer')}>
                        <View style={[styles.image_con, {
                            borderColor: selectedUserRole === 'Customer' ? Color.themeColor : Color.themeColor1,
                            borderWidth: selectedUserRole === 'Customer' ? 2 : 1,
                        }]}>
                            <CustomImage
                                onPress={() => setSelectedUserRole('Customer')}
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    // resizeMode: 'contain'
                                }} source={require('../Assets/Images/barber.png')} />
                        </ View>
                        <CustomText isBold style={[styles.text, selectedUserRole === 'Customer' && { color: Color.themeColor }]}>Client</CustomText>
                    </TouchableOpacity>
                </View>

                {selectedUserRole && (
                    <TouchableOpacity
                        onPress={() => {
                            setIsVisible(false);
                            setTimeout(() => {
                                setselectLocationModal(true);
                            }, 500);
                        }}>
                        <TextInputWithTitle
                            iconName={'map-pin'}
                            iconType={Feather}
                            // disable
                            titleText={'address'}
                            secureText={false}
                            placeholder={'Address'}
                            setText={setAddress}
                            value={address?.name}
                            viewHeight={0.06}
                            viewWidth={0.75}
                            inputWidth={0.6}
                            // border={1}
                            // borderColor={'#1B5CFB45'}
                            backgroundColor={'#FFFFFF'}
                            marginTop={moderateScale(12, 0.3)}
                            color={Color.themeColor}
                            placeholderColor={Color.themeLightGray}
                            borderRadius={moderateScale(30, 0.4)}
                            disable
                        />
                    </TouchableOpacity>
                )}

                {selectedUserRole === 'Barber' && (
                    <View style={{ marginTop: moderateScale(10, 0.3) }}>
                        <CustomText style={{ fontSize: moderateScale(15, 0.6), color: Color.white }}>
                            Category
                        </CustomText>
                        <DropDownSingleSelect
                            array={['Hair & Styling', 'Makeup & Lashes', 'Skin & Spa', 'Wellness & Therapy', 'Other / Custom', 'Nails']}
                            backgroundColor={Color.white}
                            item={designation}
                            setItem={setDesignation}
                            Color={Color.darkGray}
                            fontSize={moderateScale(16, 0.6)}
                            placeholder={'Choose Specialty Category'}
                            width={windowWidth * 0.75}
                            dropdownStyle={{
                                width: windowWidth * 0.75,
                                borderBottomWidth: 0,
                            }}
                        />
                    </View>
                )}

                <CustomButton
                    text={
                        loader ? (
                            <ActivityIndicator color={Color.white} />
                        ) : 'Submit'
                    }
                    onPress={onPress}
                    width={windowWidth * 0.75}
                    height={windowHeight * 0.06}
                    bgColor={Color.themeColor}
                    borderColor={Color.white}
                    borderWidth={1}
                    textColor={Color.white}
                    borderRadius={moderateScale(30, 0.4)}
                    marginTop={moderateScale(12, 0.3)}
                />


            </View>
        </Modal>
    )
}

export default SelectUserRole

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
            width: windowWidth * 0.9,
            borderWidth: 2,
            borderColor: Color.themeColor1,
            paddingBottom: moderateScale(10, 0.6),
            borderRadius: moderateScale(10, 0.6),
            paddingBottom: moderateScale(15, .6),
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
        },

        heading: {
            fontSize: moderateScale(15, 0.6),

            color: Color.white
        }, main_row: {
            flexDirection: 'row',
            paddingHorizontal: moderateScale(10, .6),
            justifyContent: 'space-between'

        }, image_con: {
            height: windowHeight * 0.12,
            width: windowWidth * 0.3,
            // backgroundColor: Color.red,
            borderRadius: moderateScale(10, 0.6),
            overflow: 'hidden',
            borderWidth: 1, borderColor: Color.themeColor1
        }, text: {
            fontSize: moderateScale(13, 0.6),
            color: Color.themeColor1,
            textAlign: 'center',
            marginTop: moderateScale(5, 0.6),
        }
    })