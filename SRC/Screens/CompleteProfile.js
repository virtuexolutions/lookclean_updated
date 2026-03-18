import { Icon } from 'native-base';
import React, { useState, useEffect } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ToastAndroid,
    TouchableOpacity,
    StyleSheet,
    View,

} from 'react-native';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ImagePickerModal from '../Components/ImagePickerModal';
import ScreenBoiler from '../Components/ScreenBoiler';
import SelectLocationModal from '../Components/SelectLocationModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import TravelModal from '../Components/TravelModal';
import { setUserData } from '../Store/slices/common';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import { mode } from 'native-base/lib/typescript/theme/tools';
import axios from 'axios';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { setIsProfileCompleted } from '../Store/slices/common';
import navigationService from '../navigationService';




const CompleteProfile = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.authReducer.token);
    const [state, setState] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    console.log('first ========================== >>>> from state', selectedState)
    const [city, setCity] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dob, setDob] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const fetchStates = async countryName => {
        console.log('from fetch function');
        try {
            const response = await axios.post(
                'https://countriesnow.space/api/v0.1/countries/states',
                {
                    country: 'united states',
                },
            );
            // console.log('first= =========================== >', response.data.data?.states)
            //   setCities(response.data.data?.states);
            setState(response.data.data?.states);
        } catch (error) {
            console.log('Error fetching cities', error);
        }
    };
    useEffect(() => {
        fetchStates();
    }, []);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDob(moment(date).format('YYYY-MM-DD'));
        hideDatePicker();
    };

    const handleSkip = () => {
        dispatch(setIsProfileCompleted(true));
        // navigationService.navigate('TabNavigation');
    };

    const handleComplete = () => {
        if (!dob || !selectedState || !selectedGender || !selectedType) {
            return Alert.alert('Error', 'Please fill all fields');
        }
        dispatch(setIsProfileCompleted(true));
        // navigationService.navigate('TabNavigation');
    };

    const EditProfile = async () => {
        const params = {
            dob: dob,
            state: selectedState,
            gender: selectedGender,
            type: selectedType,
        };


        const url = 'auth/profile';
        setIsLoading(true);
        const response = await Post(url, params, apiHeader(token));
        setIsLoading(false);
        if (response !== undefined) {
            console.log('second= =========================== >', response?.data?.user_info)
            dispatch(setUserData(response?.data?.user_info));
            //  return   console.log(JSON.stringify(response?.data?.user_info,null,2))
            dispatch(setIsProfileCompleted(true));
            Platform.OS == 'android'
                ? ToastAndroid.show('Profile Updated Succesfully', ToastAndroid.SHORT)
                : Alert.alert('Profile Updated Succesfully');
            // props.navigation.goBack();
        }
    };



    const gender = [
        { name: 'Male' },
        { name: 'Female' },
        { name: 'Prefer not to say' },
    ]
    return (
        <ScreenBoiler
            showHeader={true}
            statusBarBackgroundColor={Color.black}
            statusBarContentStyle={'light-content'}
            headerRight={() => (
                <TouchableOpacity onPress={handleSkip} style={{ marginTop: moderateScale(10, .6) }}>
                    <CustomText style={{ color: Color.white, fontWeight: 'bold' }}>Skip</CustomText>
                </TouchableOpacity>
            )}
        >
            <LinearGradient
                start={{ x: 0.0, y: 0.25 }}
                end={{ x: 0.5, y: 1.0 }}
                colors={Color.themeGradient}
                style={styles.container}>

                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingBottom: windowHeight * 0.18,
                            alignItems: 'center',
                        }}
                        style={{
                            width: windowWidth,
                        }}>
                        <TouchableOpacity
                            onPress={showDatePicker}
                            style={styles.row_con}>
                            <Icon as={Entypo} name="calendar" size={moderateScale(20, .6)} color={Color.themeColor} />
                            <CustomText style={[styles.text, {
                                marginHorizontal: moderateScale(10, .6), marginTop: moderateScale(2, .6)
                            }]}>{dob ? dob : 'date of birth'}</CustomText>
                        </TouchableOpacity>
                        <View style={[styles.row_con, { marginTop: moderateScale(20, .6) }]}>
                            <CustomText style={styles.text}>state of residence</CustomText>
                        </View>
                        <View style={{ marginTop: moderateScale(10, .6) }}>
                            <DropDownSingleSelect
                                item={selectedState}
                                setItem={setSelectedState}
                                array={state?.map(item => item?.name) || ['option1', 'option2', 'option3']}
                                placeholder="Select State" style={{
                                    width: windowWidth * 0.85,
                                    backgroundColor: Color.white,
                                    borderRadius: moderateScale(15, .6),
                                }}
                            />
                        </View>
                        <View style={[styles.row_con, { marginTop: moderateScale(20, .6) }]}>
                            <CustomText style={styles.text}>gender</CustomText>
                        </View>
                        <View style={styles.map_con}>

                            {gender?.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        onPress={() => setSelectedGender(item?.name)}
                                        style={[styles.gen_con, selectedGender === item?.name && { backgroundColor: Color.themeColor }]}>
                                        <CustomText style={styles.text}>{item?.name}</CustomText>
                                    </TouchableOpacity>
                                )
                            })
                            }
                        </View>
                        <View style={[styles.row_con, { marginTop: moderateScale(20, .6) }]}>
                            <CustomText style={styles.text}>profile type</CustomText>
                        </View>
                        <View style={[styles.row_con, { marginTop: moderateScale(10, .6), flexDirection: 'column', alignItems: 'flex-start' }]}>
                            <TouchableOpacity
                                onPress={() => setSelectedType('physical selfcare business')}
                                style={styles.radio_row}>
                                <View style={styles.radio_outer}>
                                    {selectedType === 'physical selfcare business' && <View style={styles.radio_inner} />}
                                </View>
                                <CustomText style={[styles.text, { marginLeft: moderateScale(10, .6) }]}>physical selfcare business</CustomText>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setSelectedType('independant freelancer')}
                                style={[styles.radio_row, { marginTop: moderateScale(10, .6) }]}>
                                <View style={styles.radio_outer}>
                                    {selectedType === 'independant freelancer' && <View style={styles.radio_inner} />}
                                </View>
                                <CustomText style={[styles.text, { marginLeft: moderateScale(10, .6) }]}>independant freelancer</CustomText>
                            </TouchableOpacity>
                        </View>

                        {(dob && selectedState && selectedGender && selectedType) && (
                            <>
                                <TouchableOpacity
                                    onPress={EditProfile}
                                    style={{
                                        marginTop: moderateScale(30, .6),
                                        width: windowWidth * 0.85,
                                        height: windowHeight * 0.06,
                                        backgroundColor: Color.themeColor,
                                        borderRadius: moderateScale(15, .6),
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    {
                                        isLoading ?
                                            <ActivityIndicator size={'small'} color={'white'} />
                                            :
                                            <CustomText style={styles.text}>Complete Profile</CustomText>
                                    }

                                </TouchableOpacity>

                            </>
                        )}

                    </ScrollView>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </KeyboardAvoidingView>







            </LinearGradient>
        </ScreenBoiler>
    )
}

export default CompleteProfile

const styles = StyleSheet.create({
    container: {
        paddingTop: windowHeight * 0.03,
        height: windowHeight * 0.9,
        width: windowWidth,
        alignItems: 'center',
    },
    row_con: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        width: windowWidth * 0.9,
    },
    text: {
        fontSize: moderateScale(14),
        fontWeight: 'bold',
        color: Color.white,
    },
    map_con: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: windowWidth * 0.9,
    },
    gen_con: {
        padding: moderateScale(10, .6),
        backgroundColor: 'transparent',
        borderWidth: moderateScale(1, .6),
        borderColor: Color.themeColor1,
        borderRadius: moderateScale(15, .6),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: moderateScale(5, .6),
        marginTop: moderateScale(10, .6),
    },
    radio_row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radio_outer: {
        height: moderateScale(20, .6),
        width: moderateScale(20, .6),
        borderRadius: moderateScale(10, .6),
        borderWidth: moderateScale(2, .6),
        borderColor: Color.themeColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radio_inner: {
        height: moderateScale(10, .6),
        width: moderateScale(10, .6),
        borderRadius: moderateScale(5, .6),
        backgroundColor: Color.themeColor,
    }
})