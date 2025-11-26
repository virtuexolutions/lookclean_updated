import React, { useState } from 'react';
import {
    FlatList,
    ScrollView,
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
import { Icon, Modal } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import GroupMemberModal from '../Components/GroupMemberModal';

const GroupMemberDetails = props => {
    const detail = props?.route?.params?.detail;
    const fromConsultationVideo = props?.route?.params?.fromConsultationVideo;
    const userData = useSelector(state => state.commonReducer.userData);
    const userWallet = useSelector(state => state.commonReducer.userWallet);
    const token = useSelector(state => state.authReducer.token);
    const [add_memberModal, setAddMemberModal] = useState(false)
    const [members, setMembers] = useState([]);
    const handleAddMember = (memberObj) => {
        setMembers(prev => [...prev, memberObj]);
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
                    <CustomText style={styles.heading}>Enter Details of Your Group Members</CustomText>
                    <TouchableOpacity onPress={() => setAddMemberModal(true)} activeOpacity={0.5} style={[styles.row, {
                        width: windowWidth * 0.94,
                        marginTop: moderateScale(20, 0.6),
                        padding: moderateScale(10, 0.6),
                        borderRadius: moderateScale(7, 0.6),
                        borderWidth: 1.5,
                        borderColor: Color.themeColor1
                    }]}>
                        <CustomText isBold style={styles.text}>Add Member</CustomText>
                        <View style={styles.icon_view}>
                            <Icon name='plus' as={FontAwesome} size={moderateScale(14, 0.6)} color={Color.white} style={{
                                alignSelf: 'center',
                                marginLeft: moderateScale(3, 0.6)
                            }} />
                        </View>
                    </TouchableOpacity>
                    <FlatList
                        data={members}
                        renderItem={(({ item, index }) => {
                            return (
                                <TouchableOpacity style={{
                                    width: windowWidth * 0.94,
                                    paddingVertical: moderateScale(10, 0.6),
                                    backgroundColor: 'red',
                                    height: windowWidth * 0.15,
                                    marginTop: moderateScale(15, 0.6),
                                    borderRadius: moderateScale(10, 0.6),
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: moderateScale(10, 0.6)
                                }}>
                                       
                                </TouchableOpacity>
                            )
                        })}
                    />
                </ScrollView>
                <GroupMemberModal modal={add_memberModal} setModal={setAddMemberModal} onAdd={handleAddMember} />
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
        color: Color.themeColor1,
    },
    icon_view: {
        width: windowWidth * 0.06,
        height: windowWidth * 0.06,
        backgroundColor: Color.themeColor1,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: windowWidth / 0.2
    }
});

export default GroupMemberDetails;
