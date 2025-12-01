import React, { useState } from 'react';
import {
    Alert,
    Platform,
    ScrollView,
    ToastAndroid,
    TouchableOpacity,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import {
    windowHeight,
    windowWidth
} from '../Utillity/utils';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import CustomButton from '../Components/CustomButton';
import navigationService from '../navigationService';

const GroupServices = props => {
    const barber = props?.route?.params?.barber;
    const fromConsultationVideo = props?.route?.params?.fromConsultationVideo;
    const userData = useSelector(state => state.commonReducer.userData);
    const userWallet = useSelector(state => state.commonReducer.userWallet);
    const token = useSelector(state => state.authReducer.token);
    const [event_type, setEventType] = useState('')
    const [event_date, setEventDate] = useState(new Date())
    const [number_of_people, setNumberOfPeople] = useState(0)
    const [endTime, setEndTime] = useState(moment().format('HH:mm'));
    const [gender_preference, setGenderPreference] = useState('')
    const [timePickerModalVisible, setTimePickerModalVisible] = useState(false)
    const [service_location, setServiceLocation] = useState('')
    const [staff_member, setStaffMember] = useState('')
    const [parking_instruction, setParkingInstruction] = useState('')
    const [add_ons, setAddOns] = useState('')
    const [preffered_style, setPrefferedStyle] = useState('')

    const submitBooking = () => {
        // if (!event_type) {
        //     return Platform.OS === 'android'
        //         ? ToastAndroid.show('Event type is required', ToastAndroid.SHORT)
        //         : Alert.alert('Event type is required');
        // }
        // if (!event_date) {
        //     return Platform.OS === 'android'
        //         ? ToastAndroid.show('Event date is required', ToastAndroid.SHORT)
        //         : Alert.alert('Event date is required');
        // }
        // if (!number_of_people || number_of_people <= 0) {
        //     return Platform.OS === 'android'
        //         ? ToastAndroid.show('Total number of members is required', ToastAndroid.SHORT)
        //         : Alert.alert('Total number of members is required');
        // }
        // if (!service_location) {
        //     return Platform.OS === 'android'
        //         ? ToastAndroid.show('Service location is required', ToastAndroid.SHORT)
        //         : Alert.alert('Service location is required');
        // }
        // if (!staff_member) {
        //     return Platform.OS === 'android'
        //         ? ToastAndroid.show('Staff member is required', ToastAndroid.SHORT)
        //         : Alert.alert('Staff member is required');
        // }

        const body = {
            event_type,
            number_of_people,
            service_location,
            staff_member,
            end_time: endTime,
            gender_preference: gender_preference || null,
            parking_instruction: parking_instruction || null,
            add_ons: add_ons || null,
            preffered_style: preffered_style || null,
        };

        console.log(body, 'Booking body');
        navigationService.navigate('GroupMemberDetails', { data: body, barber: barber })
    };

    return (
        <ScreenBoiler
            showHeader={true}
            showBack={true}
            showUser={true}
            statusBarBackgroundColor={Color.black}
            statusBarContentStyle={'light-content'}>
            <LinearGradient
                start={{ x: 0.0, y: 0.25 }}
                end={{ x: 0.5, y: 1.0 }}
                colors={Color.themeGradient}
                style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <CustomText style={styles.heading}>Enter Details of Your Group Booking</CustomText>
                    <View
                        style={{
                            marginTop: moderateScale(10, 0.3),
                        }}>
                        <CustomText isBold
                            style={styles.text}>
                            Event Type :
                        </CustomText>
                        <DropDownSingleSelect
                            array={['Birthday', 'Bachelorette Party', 'Bridal Party', 'Prom Group', 'Corporate Event', 'Girls’ Night Out', 'Holiday Event (Thanksgiving, Christmas, New Year)', 'Others']}
                            backgroundColor={Color.lightGrey}
                            item={event_type}
                            setItem={setEventType}
                            Color={Color.darkGray}
                            fontSize={moderateScale(14, 0.6)}
                            placeholder={'Choose Event Type'}
                            width={windowWidth * 0.92}
                            dropdownStyle={{
                                width: windowWidth * 0.92,
                            }}
                        />
                    </View>
                    {/* <CustomText isBold
                        style={styles.text}>
                        Event Date :
                    </CustomText>
                    <TouchableOpacity
                        onPress={() => setTimePickerModalVisible(true)}
                        style={{
                            width: windowWidth * 0.92,
                            height: windowHeight * 0.06,
                            backgroundColor: Color.lightGrey,
                            borderRadius: moderateScale(10, 0.6),
                            justifyContent: 'center',
                            paddingHorizontal: moderateScale(12, 0.6),
                        }}
                    >
                        <CustomText style={{ color: Color.darkGray }}>
                            {event_date ? moment(event_date).format('YYYY-MM-DD') : 'Select Event Date'}
                        </CustomText>
                    </TouchableOpacity> */}
                    <TextInputWithTitle
                        titleText={'Total number of people in the group'}
                        secureText={false}
                        placeholder={'Total Number of People'}
                        setText={setNumberOfPeople}
                        value={number_of_people}
                        viewHeight={0.06}
                        viewWidth={0.92}
                        inputWidth={0.74}
                        backgroundColor={Color.lightGrey}
                        marginTop={moderateScale(12, 0.3)}
                        color={Color.themeColor}
                        placeholderColor={Color.themeLightGray}
                        borderRadius={moderateScale(10, 0.4)}
                        textStyle={{
                            fontSize: moderateScale(15, 0.6),
                            paddingVertical: moderateScale(6, 0.6),
                            color: Color.white,
                            fontWeight: 'bold'
                        }}
                    />
                    <CustomText isBold
                        style={{
                            fontSize: moderateScale(15, 0.6),
                            paddingVertical: moderateScale(12, 0.6),
                            color: Color.white,
                        }}>
                        Staff/Gender preference :
                    </CustomText>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: windowWidth * 0.9
                    }}>
                        <CustomButton
                            bgColor={gender_preference === 'Male' ? Color.white : 'transparent'}
                            textColor={gender_preference === 'Male' ? Color.themeColor1 : "white"}
                            borderColor={gender_preference === 'Male' ? Color.white : Color.themeColor1}
                            text={'Male'}
                            width={windowWidth * 0.28}
                            height={windowHeight * 0.05}
                            borderRadius={moderateScale(10, 0.1)}
                            borderWidth={1.5}
                            isBold
                            fontSize={moderateScale(12, 0.6)}
                            onPress={() => setGenderPreference('Male')}
                        />
                        <CustomButton
                            text={'Female'}
                            width={windowWidth * 0.28}
                            height={windowHeight * 0.05}
                            borderRadius={moderateScale(10, 0.1)}
                            borderWidth={1.5}
                            isBold
                            fontSize={moderateScale(12, 0.6)}
                            onPress={() => setGenderPreference('Female')}
                            bgColor={gender_preference === 'Female' ? Color.white : 'transparent'}
                            textColor={gender_preference === 'Female' ? Color.themeColor1 : "white"}
                            borderColor={gender_preference === 'Female' ? Color.white : Color.themeColor1}
                        />
                        <CustomButton
                            text={'Both'}
                            width={windowWidth * 0.28}
                            height={windowHeight * 0.05}
                            borderRadius={moderateScale(10, 0.1)}
                            borderWidth={1.5}
                            fontSize={moderateScale(12, 0.6)}
                            isBold
                            onPress={() => setGenderPreference('Both')}
                            bgColor={gender_preference === 'Both' ? Color.white : 'transparent'}
                            textColor={gender_preference === 'Both' ? Color.themeColor1 : "white"}
                            borderColor={gender_preference === 'Both' ? Color.white : Color.themeColor1}
                        />
                    </View>
                    <CustomText isBold
                        style={styles.text}>
                        Service Location :
                    </CustomText>
                    <View style={[styles.row, {
                        width: windowWidth * 0.5
                    }]}>
                        <View style={[styles.row, {
                            justifyContent: 'flex-start'
                        }]}>
                            <TouchableOpacity onPress={() => setServiceLocation('in_salon')} style={{
                                width: moderateScale(14, 0.6),
                                height: moderateScale(14, 0.6),
                                backgroundColor: service_location === 'in_salon' ? Color.themeColor1 : Color.lightGray,
                                borderRadius: windowWidth,
                                borderWidth: 1.5,
                                borderColor: Color.lightGrey
                            }} />
                            <CustomText isBold style={{
                                fontSize: moderateScale(14, 0.6),
                                marginLeft: moderateScale(8, 0.6),
                                color: Color.white
                            }}>In salon</CustomText>
                        </View>
                        <View style={[styles.row, {
                            justifyContent: 'flex-start'
                        }]}>
                            <TouchableOpacity onPress={() => setServiceLocation('on_site')} style={{
                                width: moderateScale(14, 0.6),
                                height: moderateScale(14, 0.6),
                                backgroundColor: service_location === 'on_site' ? Color.themeColor1 : Color.lightGray,
                                borderRadius: windowWidth,
                                borderWidth: 1.5,
                                borderColor: Color.lightGray
                            }} />
                            <CustomText isBold style={{
                                fontSize: moderateScale(14, 0.6),
                                marginLeft: moderateScale(8, 0.6),
                                color: Color.white
                            }}>On-Site</CustomText>
                        </View>
                    </View>
                    <TextInputWithTitle
                        titleText={'Number of Staff Member Required :'}
                        secureText={false}
                        placeholder={'Number of Staff Member Required'}
                        setText={setStaffMember}
                        value={staff_member}
                        viewHeight={0.06}
                        viewWidth={0.92}
                        inputWidth={0.74}
                        backgroundColor={Color.lightGray}
                        marginTop={moderateScale(12, 0.3)}
                        color={Color.themeColor}
                        placeholderColor={Color.themeLightGray}
                        borderRadius={moderateScale(10, 0.4)}
                        textStyle={{
                            fontSize: moderateScale(15, 0.6),
                            paddingVertical: moderateScale(6, 0.6),
                            color: Color.white,
                            fontWeight: 'bold'
                        }}
                    />
                    <TextInputWithTitle
                        titleText={'Parking/Access Instructions (optional):'}
                        secureText={false}
                        placeholder={'Parking/Access Instructions'}
                        setText={setParkingInstruction}
                        value={parking_instruction}
                        viewHeight={0.06}
                        viewWidth={0.92}
                        inputWidth={0.74}
                        backgroundColor={Color.lightGray}
                        marginTop={moderateScale(12, 0.3)}
                        color={Color.themeColor}
                        placeholderColor={Color.themeLightGray}
                        borderRadius={moderateScale(10, 0.4)}
                        textStyle={{
                            fontSize: moderateScale(15, 0.6),
                            paddingVertical: moderateScale(6, 0.6),
                            color: Color.white,
                            fontWeight: 'bold'
                        }}
                    />
                    <TextInputWithTitle
                        titleText={'Add-ons (optional) :'}
                        secureText={false}
                        placeholder={'Add-ons (lashes, hair extensions, nail art, etc)'}
                        setText={setAddOns}
                        value={add_ons}
                        viewHeight={0.06}
                        viewWidth={0.92}
                        inputWidth={0.74}
                        backgroundColor={Color.lightGray}
                        marginTop={moderateScale(12, 0.3)}
                        color={Color.themeColor}
                        placeholderColor={Color.themeLightGray}
                        borderRadius={moderateScale(10, 0.4)}
                        textStyle={{
                            fontSize: moderateScale(15, 0.6),
                            paddingVertical: moderateScale(6, 0.6),
                            color: Color.white,
                            fontWeight: 'bold'
                        }}
                    />

                    <TextInputWithTitle
                        titleText={'Preferred stylist (optional) :'}
                        secureText={false}
                        placeholder={'Preferred stylist Name'}
                        setText={setPrefferedStyle}
                        value={preffered_style}
                        viewHeight={0.06}
                        viewWidth={0.92}
                        inputWidth={0.74}
                        backgroundColor={Color.lightGray}
                        marginTop={moderateScale(12, 0.3)}
                        color={Color.themeColor}
                        placeholderColor={Color.themeLightGray}
                        borderRadius={moderateScale(10, 0.4)}
                        textStyle={{
                            fontSize: moderateScale(15, 0.6),
                            paddingVertical: moderateScale(6, 0.6),
                            color: Color.white,
                            fontWeight: 'bold'
                        }}
                    />
                    <CustomButton
                        textColor={Color.black}
                        width={windowWidth * 0.92}
                        height={windowHeight * 0.06}
                        borderRadius={moderateScale(30, 0.4)}
                        text={'Proceed'}
                        fontSize={moderateScale(16, 0.3)}
                        isGradient={true}
                        isBold
                        marginTop={moderateScale(40, 0.3)}
                        marginBottom={moderateScale(40, 0.6)}
                        elevation
                        onPress={() => submitBooking()}
                        style={{
                            marginRight: moderateScale(10, 0.6)
                        }}
                    />
                </ScrollView>

                <DateTimePickerModal
                    date={event_date}
                    isVisible={timePickerModalVisible}
                    mode="date"
                    onConfirm={(selectedDate) => {
                        setEventDate(selectedDate);
                        setTimePickerModalVisible(false);
                    }}
                    onCancel={() => setTimePickerModalVisible(false)}
                    textColor={Color.themeColor1}
                />

            </LinearGradient>
        </ScreenBoiler>
    );
};

const styles = ScaledSheet.create({
    container: {
        paddingTop: windowHeight * 0.04,
        // justifyContent: "center",
        height: windowHeight * 0.9,
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: moderateScale(10, 0.6)
    },
    text1: {
        textTransform: 'uppercase',
        color: Color.white,
        textAlign: 'center',
        fontSize: moderateScale(20, 0.3),
    },
    heading: {
        fontSize: moderateScale(18, 0.6),
        color: Color.white,
        textAlign: 'left',
        width: windowWidth * 0.97
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        fontSize: moderateScale(15, 0.6),
        paddingVertical: moderateScale(6, 0.6),
        color: Color.white,
    }
});

export default GroupServices;
