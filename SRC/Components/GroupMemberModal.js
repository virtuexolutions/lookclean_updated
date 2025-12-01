import { Icon } from 'native-base';
import numeral from 'numeral';
import React, { useState } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomButton from './CustomButton';
import CustomText from './CustomText';
import TextInputWithTitle from './TextInputWithTitle';

const GroupMemberModal = ({ modal, setModal, onAdd, service }) => {
    const [event_type, setEventType] = useState('');
    const [name, setName] = useState('');
    const [allergy, setAllergy] = useState('');
    const [addons, setAddons] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState({});
    const [selectedService, setSelectedService] = useState([]);
    const handleAdd = () => {
        const serviceTotal = selectedService.reduce((sum, item) => {
            return sum + Number(item?.price || 0);
        }, 0);
        console.log(serviceTotal, 'serviceTotal')
        const obj = {
            name: name.trim(),
            allergy: allergy.trim() || null,
            addons: addons.trim() || null,
            image: Object.keys(image).length ? image : null,
            selectedService: selectedService,
            totalPrice: serviceTotal
        };

        onAdd(obj);

        setName('');
        setEventType('');
        setAllergy('');
        setAddons('');
        setImage({});
        setModal(false);
        setSelectedService([])
    };

    return (
        <Modal
            isVisible={modal}
            onBackdropPress={() => setModal(false)}
            avoidKeyboard
        >
            <View style={styles.mainContainer}>
                <Icon
                    name={'cross'}
                    color={Color.black}
                    as={Entypo}
                    size={moderateScale(30, 0.6)}
                    onPress={() => setModal(false)}
                    style={{
                        position: 'absolute',
                        top: 7,
                        right: 10
                    }}
                />
                <CustomText isBold style={styles.heading}>Member Details</CustomText>

                <TextInputWithTitle
                    titleText={'Name : '}
                    secureText={false}
                    placeholder={'Enter Name Here'}
                    setText={setName}
                    value={name || ''}
                    viewHeight={0.06}
                    viewWidth={0.8}
                    inputWidth={0.74}
                    backgroundColor={Color.lightGray}
                    marginTop={moderateScale(12, 0.3)}
                    color={Color.themeColor}
                    placeholderColor={Color.themeLightGray}
                    borderRadius={moderateScale(10, 0.4)}
                    textStyle={{
                        fontSize: moderateScale(15, 0.6),
                        paddingVertical: moderateScale(6, 0.6),
                        color: Color.themeColor1,
                        fontWeight: 'bold'
                    }}
                />

                <CustomText isBold style={styles.labelText}>Choose Service :</CustomText>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={service}
                    style={{
                        width: windowWidth * 0.85,
                        height: windowHeight * 0.3,
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
                                    width: windowWidth * 0.84,
                                    alignSelf: 'center'
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
                <TextInputWithTitle
                    titleText={'Any allergies or sensitivities : '}
                    secureText={false}
                    placeholder={'Yes/No'}
                    setText={setAllergy}
                    value={allergy || ''}
                    viewHeight={0.06}
                    viewWidth={0.8}
                    inputWidth={0.74}
                    backgroundColor={Color.lightGray}
                    color={Color.themeColor}
                    placeholderColor={Color.themeLightGray}
                    borderRadius={moderateScale(10, 0.4)}
                    textStyle={{
                        fontSize: moderateScale(15, 0.6),
                        paddingVertical: moderateScale(6, 0.6),
                        color: Color.themeColor1,
                        fontWeight: 'bold'
                    }}
                />

                <TextInputWithTitle
                    titleText={'Add-ons (optional) : '}
                    secureText={false}
                    placeholder={'Add-ons (lashes, hair extensions, nail art, etc.)'}
                    setText={setAddons}
                    value={addons || ''}
                    viewHeight={0.06}
                    viewWidth={0.8}
                    inputWidth={0.74}
                    backgroundColor={Color.lightGray}
                    color={Color.themeColor}
                    placeholderColor={Color.themeLightGray}
                    borderRadius={moderateScale(10, 0.4)}
                    textStyle={{
                        fontSize: moderateScale(15, 0.6),
                        paddingVertical: moderateScale(6, 0.6),
                        color: Color.themeColor1,
                        fontWeight: 'bold'
                    }}
                />
                <CustomButton
                    textColor={Color.black}
                    width={windowWidth * 0.8}
                    height={windowHeight * 0.06}
                    text={'Add'}
                    fontSize={moderateScale(13, 0.3)}
                    isGradient={true}
                    borderRadius={moderateScale(30, 0.4)}
                    isBold
                    marginTop={moderateScale(20, 0.3)}
                    elevation
                    onPress={handleAdd}
                />
            </View>
        </Modal>
    );

};

export default GroupMemberModal;

const styles = StyleSheet.create({
    mainContainer: {
        borderRadius: moderateScale(10, 0.6),
        alignItems: 'center',
        backgroundColor: Color.white,
        width: windowWidth * 0.9,
        paddingVertical: moderateScale(28, 0.6),
        justifyContent: "center"
    },
    heading: {
        textAlign: 'left',
        color: Color.themeColor1,
        fontSize: moderateScale(16, 0.6),
        width: '90%'
    },
    labelText: {
        fontSize: moderateScale(15, 0.6),
        paddingTop: moderateScale(10, 0.6),
        color: Color.themeColor1,
        textAlign: 'left',
        width: windowWidth * 0.8
    },
    imagePicker: {
        width: windowWidth * 0.2,
        height: windowWidth * 0.24,
        backgroundColor: Color.lightGray,
        borderRadius: moderateScale(10, 0.6),
        alignSelf: 'flex-start',
        marginLeft: moderateScale(20, 0.6),
        justifyContent: 'center',
        alignItems: "center",
        marginTop: moderateScale(10, 0.6)
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: moderateScale(10, 0.6)
    }
});
