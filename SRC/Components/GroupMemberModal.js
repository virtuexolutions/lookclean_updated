import LottieView from 'lottie-react-native';
import { Icon } from 'native-base';
import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { moderateScale } from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import Color from '../Assets/Utilities/Color';
import { windowHeight, windowWidth } from '../Utillity/utils';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import TextInputWithTitle from './TextInputWithTitle';
import DropDownSingleSelect from './DropDownSingleSelect';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ImagePickerModal from './ImagePickerModal';
import CustomImage from './CustomImage';

const GroupMemberModal = ({ modal, setModal, setType, type, onPress, onAdd }) => {
    console.log(type, '==============>')
    const [event_type, setEventType] = useState('')
    const [name, setName] = useState("");
    const [allergy, setAllergy] = useState("");
    const [addons, setAddons] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [image, setImage] = useState({});
    console.log(image, '===================')
    const handleAdd = () => {
        const obj = {
            name,
            event_type,
            allergy,
            addons,
            image
        };

        onAdd(obj);
        setModal(false);
        setName('');
        setEventType('');
        setAllergy('');
        setAddons('');
        setImage({})
    };

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
                <CustomText isBold style={styles.heading}>Member Details</CustomText>
                <TextInputWithTitle
                    titleText={'Name : '}
                    secureText={false}
                    placeholder={'Enter Name Here'}
                    setText={setName}
                    value={name}
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
                <CustomText isBold
                    style={{
                        fontSize: moderateScale(15, 0.6),
                        paddingTop: moderateScale(10, 0.6),
                        color: Color.themeColor1,
                        textAlign: 'left',
                        width: windowWidth * 0.8
                    }}>
                    Choose Service :
                </CustomText>
                <DropDownSingleSelect
                    array={['Birthday', 'Bachelorette Party', 'Bridal Party', 'Prom Group', 'Corporate Event', 'Girls’ Night Out', 'Holiday Event (Thanksgiving, Christmas, New Year)', 'Others']}
                    backgroundColor={Color.lightGray}
                    item={event_type}
                    setItem={setEventType}
                    Colors={Color.veryLightGray}
                    fontSize={moderateScale(12, 0.6)}
                    placeholder={'Please Select Service'}
                    width={windowWidth * 0.8}
                    dropdownStyle={{
                        width: windowWidth * 0.92,
                        alignSelf: "center",
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: moderateScale(6, 0.6)
                    }}
                    style={{
                        borderWidth: 0,
                        borderRadius: moderateScale(10, 0.4),
                    }}
                />
                <TextInputWithTitle
                    titleText={'Any allergies or sensitivities : '}
                    secureText={false}
                    placeholder={'Yes/No'}
                    setText={setAllergy}
                    value={allergy}
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
                    value={addons}
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
                <CustomText isBold
                    style={{
                        fontSize: moderateScale(15, 0.6),
                        paddingTop: moderateScale(10, 0.6),
                        color: Color.themeColor1,
                        textAlign: 'left',
                        width: windowWidth * 0.8
                    }}>
                    Any Reference (optional) :
                </CustomText>
                <TouchableOpacity onPress={() => setShowModal(true)} style={{
                    width: windowWidth * 0.2,
                    height: windowWidth * 0.24,
                    backgroundColor: Color.lightGray,
                    borderRadius: moderateScale(10, 0.6),
                    alignSelf: 'flex-start',
                    marginLeft: moderateScale(20, 0.6),
                    justifyContent: 'center',
                    alignItems: "center",
                    marginTop: moderateScale(10, 0.6)
                }}>
                    {Object.keys(image).length > 0 ? (
                        <CustomImage
                            source={{ uri: image?.uri }}
                            style={styles.image}
                        />) :
                        <Icon name='plus' as={FontAwesome} size={moderateScale(24, 0.6)} color={Color.veryLightGray} style={{
                            alignSelf: 'center',
                            marginLeft: moderateScale(3, 0.6)
                        }} />
                    }
                </TouchableOpacity>
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
            <ImagePickerModal
                show={showModal}
                setShow={setShowModal}
                setFileObject={setImage}
            />
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
