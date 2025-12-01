import React, { useEffect, useState } from 'react';
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
import CustomButton from '../Components/CustomButton';
import { windowHeight, windowWidth } from '../Utillity/utils';
import GroupMemberModal from '../Components/GroupMemberModal';
import { Icon } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import navigationService from '../navigationService';

const GroupMemberDetails = props => {
    const data = props?.route?.params?.data;
    const barber = props?.route?.params?.barber;
    const [addMemberModal, setAddMemberModal] = useState(false);
    const [members, setMembers] = useState([]);
    const handleAddMember = (memberObj) => {
        setMembers(prev => [...prev, { ...memberObj, id: Date.now().toString() }]);
    };
    console.log('memberrrrrrrrrs', members?.[0]?.selectedService)
    const handleDeleteMember = (memberId) => {
        setMembers(prev => prev.filter(member => member.id !== memberId));
    };
    const [subtotal, setSubTotal] = useState('')

    const onSubmit = () => {
        const body = {
            ...data,
            members: members || [],
            totalPrice: subtotal
        };
        navigationService.navigate('ChooseDate', {
            data: body,
            barber: barber,
        });
    };

    const getMemberTotal = (member) => {
        if (!Array.isArray(member.selectedService)) return 0;

        return member.selectedService.reduce((sum, service) => {
            return sum + Number(service.price || 0);
        }, 0);
    };

    console.log(getMemberTotal(members), 'getMemberTotal')
    const getAllMembersSubtotal = (members) => {
        return members.reduce((total, member) => {
            return total + getMemberTotal(member);
        }, 0);
    };

    useEffect(() => {
        const total = getAllMembersSubtotal(members);
        setSubTotal(total);
    }, [members]);


    const allSubtotal = getAllMembersSubtotal(members);
    console.log("Subtotal:", allSubtotal);
    return (
        <ScreenBoiler
            showHeader={true}
            showBack={true}
            showUser={true}
            statusBarBackgroundColor={Color.black}
            statusBarContentStyle={'light-content'}
        >
            <LinearGradient
                start={{ x: 0.0, y: 0.25 }}
                end={{ x: 0.5, y: 1.0 }}
                colors={Color.themeGradient}
                style={styles.container}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{
                        paddingHorizontal: moderateScale(10, 0.6)
                    }}>
                        <CustomText style={styles.heading}>
                            Enter Details of Your Group Members
                        </CustomText>

                        <TouchableOpacity
                            onPress={() => setAddMemberModal(true)}
                            activeOpacity={0.5}
                            style={[styles.row, styles.addButton]}
                        >
                            <CustomText isBold style={styles.text}>Add Member</CustomText>
                            <View style={styles.icon_view}>
                                <Icon
                                    name='plus'
                                    as={FontAwesome}
                                    size={moderateScale(14, 0.6)}
                                    color={Color.white}
                                    style={{ alignSelf: 'center', marginLeft: moderateScale(3, 0.6) }}
                                />
                            </View>
                        </TouchableOpacity>

                        <FlatList
                            data={members}
                            keyExtractor={item => item.id}
                            style={{ height: windowHeight * 0.56, marginBottom: moderateScale(10, 0.6) }}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.memberItem}
                                >
                                    <View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center'
                                        }}>
                                            <CustomText style={styles.memberType}>{'Member Name : '}</CustomText>
                                            <CustomText isBold style={styles.memberType}>{item.name}</CustomText>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center'
                                        }}>
                                            <CustomText style={styles.memberType}>{'Selected Services Count: '}</CustomText>
                                            <CustomText isBold style={styles.memberType}>{item.selectedService?.length}</CustomText>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center'
                                        }}>
                                            <CustomText style={styles.memberType}>{'Service Price : '}</CustomText>
                                            <CustomText isBold style={{
                                                fontSize: moderateScale(14, 0.6),
                                                color: Color.themeColor1
                                            }}>{item?.totalPrice + ' $'}</CustomText>
                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-start',
                                            alignItems: 'center'
                                        }}>
                                            <CustomText style={styles.memberType}>{'Any allergies or sensitivities : '}</CustomText>
                                            <CustomText style={{
                                                fontSize: moderateScale(12, 0.6),
                                                color: Color.black
                                            }}>{item?.allergy}</CustomText>
                                        </View>
                                    </View>
                                    <Icon
                                        name='delete'
                                        as={AntDesign}
                                        size={moderateScale(18, 0.6)}
                                        onPress={() => handleDeleteMember(item.id)}
                                    />
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                    <View style={{
                        height: windowHeight * 0.2,
                        backgroundColor: Color.lightGray,
                        width: windowWidth,
                        bottom: 25,
                        borderTopRightRadius: moderateScale(20, 0.5),
                        borderTopLeftRadius: moderateScale(20, 0.6),
                        paddingVertical: moderateScale(12, 0.6),
                        borderWidth: 2,
                        borderColor: Color.themeColor1,
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: moderateScale(15, 0.6)
                        }}>
                            <CustomText isBold style={{
                                fontSize: moderateScale(16, 0.6)
                            }}>Total Price</CustomText>
                            <CustomText isBold style={{
                                fontSize: moderateScale(16, 0.6),
                                color: Color.themeColor1
                            }}>{subtotal + ' $'}</CustomText>

                        </View>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: moderateScale(15, 0.6),
                            marginTop: moderateScale(10, 0.6)
                        }}>
                            <CustomText isBold style={{
                                fontSize: moderateScale(16, 0.6)
                            }}>Additional Price</CustomText>
                            <CustomText isBold style={{
                                fontSize: moderateScale(16, 0.6),
                                color: Color.themeColor1
                            }}>{0 + ' $'}</CustomText>

                        </View>
                        <CustomButton
                            textColor={Color.black}
                            width={windowWidth * 0.92}
                            height={windowHeight * 0.06}
                            borderRadius={moderateScale(30, 0.4)}
                            text={'Proceed'}
                            fontSize={moderateScale(16, 0.3)}
                            isGradient={true}
                            isBold
                            onPress={() => onSubmit()}
                            marginTop={moderateScale(20, 0.3)}
                            marginBottom={moderateScale(40, 0.6)}
                            elevation
                            style={{ marginRight: moderateScale(10, 0.6), }}
                        />
                    </View>
                </ScrollView>

                <GroupMemberModal
                    modal={addMemberModal}
                    setModal={setAddMemberModal}
                    onAdd={handleAddMember}
                    service={barber?.services}
                />
            </LinearGradient>
        </ScreenBoiler>
    );

};

const styles = ScaledSheet.create({
    container: {
        paddingTop: windowHeight * 0.04,
        height: windowHeight * 0.9,
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
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
    addButton: {
        width: windowWidth * 0.94,
        marginTop: moderateScale(20, 0.6),
        padding: moderateScale(10, 0.6),
        borderRadius: moderateScale(7, 0.6),
        borderWidth: 1.5,
        borderColor: Color.themeColor1
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
    },
    memberItem: {
        width: windowWidth * 0.94,
        paddingVertical: moderateScale(10, 0.6),
        backgroundColor: Color.lightGray,
        height: windowWidth * 0.24,
        marginTop: moderateScale(15, 0.6),
        borderRadius: moderateScale(10, 0.6),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: moderateScale(10, 0.6)
    },
    memberName: {
        fontSize: moderateScale(16, 0.6),
        color: Color.black
    },
    memberType: {
        fontSize: moderateScale(12, 0.6),
        color: Color.darkGray
    }
});

export default GroupMemberDetails;
