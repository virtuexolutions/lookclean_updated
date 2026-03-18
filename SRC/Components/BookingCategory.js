import LottieView from 'lottie-react-native';
import { FlatList, Icon } from 'native-base';
import React from 'react';
import { Alert, Platform, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import numeral from 'numeral';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import navigationService from '../navigationService';

const BookingCategory = ({ modal, setModal, setType, type, onPress, services, selectedService, setSelectedService, barberDetails }) => {
    return (
        <Modal
            isVisible={modal}
            onBackdropPress={() => {
                setModal(false);
            }}>
            <View style={styles.mainContainer}>
                <Icon
                    name={'cross'}
                    color={Color.black}
                    as={Entypo}
                    size={moderateScale(30, 0.6)}
                    onPress={() => {
                        setModal(!modal);
                    }}
                    style={{
                        position: 'absolute',
                        top: 7,
                        right: 10
                    }}
                />
                <CustomText isBold style={styles.heading}>{type === 'individual' ? 'Select Service' : ' Select Booking Type'}</CustomText>
                {type === 'individual' ? <>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={services}
                        style={{
                            width: windowWidth,
                            flexGrow: 0,
                        }}
                        contentContainerStyle={{
                            paddingBottom: moderateScale(30, 0.3),
                            paddingTop: moderateScale(10, 0.3),
                        }}
                        ListEmptyComponent={() => {
                            return (
                                <View
                                    style={{
                                        height: windowHeight * 0.1,
                                        justifyContent: 'center',
                                    }}>
                                    <CustomText
                                        style={{
                                            fontSize: moderateScale(15, 0.6),
                                            color: Color.white,
                                            textAlign: 'center',
                                        }}
                                        isBold>
                                        No services found
                                    </CustomText>
                                </View>
                            );
                        }}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => {
                                        if (
                                            selectedService?.some(data => data?.name == item?.name)
                                        ) {
                                            setSelectedService(
                                                selectedService?.filter(
                                                    data => data?.name != item?.name,
                                                ),
                                            );
                                        } else {
                                            setSelectedService(prev => [...prev, item]);
                                        }
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        marginVertical: moderateScale(10, 0.3),
                                        width: windowWidth * 0.85,
                                        paddingRight: moderateScale(10, 0.3),
                                        alignItems: 'center',
                                        alignSelf: 'center'
                                    }}>
                                    <Icon
                                        name={
                                            selectedService.some(data => {
                                                return data.name == item?.name;
                                            })
                                                ? 'check-circle-o'
                                                : 'circle-o'
                                        }
                                        as={FontAwesome}
                                        color={
                                            selectedService.some(data => {
                                                return data.name == item?.name;
                                            })
                                                ? Color.themeColor
                                                : Color.darkGray
                                        }
                                        size={moderateScale(17, 0.3)}
                                    />
                                    <CustomText
                                        isBold
                                        style={{
                                            fontSize: moderateScale(14, 0.3),
                                            width: windowWidth * 0.45,
                                            color: Color.black,
                                            position: 'absolute',
                                            left: moderateScale(25, 0.3),
                                        }}>
                                        {item?.name}
                                    </CustomText>
                                    <CustomText
                                        isBold
                                        style={{
                                            fontSize: moderateScale(14, 0.3),
                                            color: Color.black,
                                        }}>
                                        {numeral(item?.price).format('$0,0.0')}
                                    </CustomText>
                                </TouchableOpacity>
                            );
                        }}
                    />
                    <CustomButton
                        textColor={Color.black}
                        onPress={() => {
                            if (selectedService.length > 0) {
                                setModal(false);
                                navigationService.navigate('ChooseDate', {
                                    data: selectedService,
                                    barber: barberDetails,
                                });
                            } else {
                                Platform.OS == 'android'
                                    ? ToastAndroid.show(
                                        'Choose any service first to proceed',
                                        ToastAndroid.SHORT,
                                    )
                                    : Alert.alert('Choose any service first to proceed');
                            }
                        }}
                        width={windowWidth * 0.75}
                        height={windowHeight * 0.06}
                        text={'Book Now'}
                        fontSize={moderateScale(14, 0.3)}
                        textTransform={'uppercase'}
                        isGradient={true}
                        isBold
                        borderRadius={moderateScale(35, 0.6)}
                    // disabled={totalPrice > userWallet?.amount}
                    />
                </> :
                    <>
                        <View style={styles.row_view}>
                            <TouchableOpacity onPress={() => setType('individual')} style={type === 'individual' ? styles.focused_btn : styles.btn_view}>
                                <LottieView
                                    source={require('../Assets/Images/person.json')}
                                    autoPlay
                                    loop
                                    style={{
                                        width: windowWidth * 0.4,
                                        height: windowHeight * 0.15,
                                        alignSelf: 'center',
                                    }}
                                />
                                <CustomText isBold style={{
                                    fontSize: moderateScale(14, 0.6)
                                }}>Individual Service</CustomText>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setType('group')} style={type === 'group' ? styles.focused_btn : styles.btn_view}>
                                <LottieView
                                    source={require('../Assets/Images/people_group.json')}
                                    autoPlay
                                    loop
                                    style={{
                                        width: windowWidth * 0.4,
                                        height: windowHeight * 0.15,
                                        alignSelf: 'center',
                                    }}
                                />
                                <CustomText isBold style={{
                                    fontSize: moderateScale(14, 0.6)
                                }}>Party / Group Service</CustomText>
                            </TouchableOpacity>
                        </View>
                        <CustomButton
                            textColor={Color.black}
                            width={windowWidth * 0.8}
                            height={windowHeight * 0.06}
                            text={'Proceed'}
                            fontSize={moderateScale(13, 0.3)}
                            onPress={onPress}
                            isGradient={true}
                            borderRadius={moderateScale(30, 0.4)}
                            isBold
                            marginTop={moderateScale(20, 0.3)}
                            elevation
                        />
                    </>
                }

            </View>
        </Modal >
    );
};

export default BookingCategory;

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: moderateScale(10, 0.6),
        alignItems: 'center',
        // height: windowHeight * 0.35,
        backgroundColor: Color.white,
        width: windowWidth * 0.9,
        paddingVertical: moderateScale(28, 0.6)
    },
    heading: {
        textAlign: 'left',
        color: Color.themeColor1,
        fontSize: moderateScale(16, 0.6),
        width: '90%'
    },
    row_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: windowWidth * 0.88,
        paddingHorizontal: moderateScale(10, 0.6),
        marginTop: moderateScale(10, 0.6)
    },
    btn_view: {
        width: windowWidth * 0.4,
        height: windowHeight * 0.2,
        backgroundColor: Color.lightGray,
        borderRadius: moderateScale(10, 0.6),
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,
        elevation: 8,
    },
    focused_btn: {
        width: windowWidth * 0.4,
        height: windowHeight * 0.2,
        backgroundColor: Color.lightGray,
        borderRadius: moderateScale(10, 0.6),
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 3,
        borderColor: Color.themeColor1
    }
});
