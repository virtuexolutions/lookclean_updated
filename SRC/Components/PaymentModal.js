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
import { CardField, createToken } from '@stripe/stripe-react-native';

import TextInputWithTitle from './TextInputWithTitle';

const PaymentModal = ({
    isVisible,
    setIsVisible,
    loading,
    setStripeToken,
    setTip, tip,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const strpieToken = async () => {
        setIsLoading(true);
        const responsetoken = await createToken({
            type: 'Card',
        });
        // return console.log("======> ", responsetoken);
        if (responsetoken != undefined) {
            setStripeToken(responsetoken?.token?.id);
            setIsLoading(false);
            setIsVisible(false);
        }
    };
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


                <View style={styles.header}>
                    <CustomText
                        isBold
                        style={{
                            color: Color.white,
                            fontSize: moderateScale(17, 0.6),
                        }}>
                        Show your appreciation
                    </CustomText>
                </View>

                <TextInputWithTitle
                    // multiline={true}
                    secureText={false}
                    placeholder={'Add Tip'}
                    setText={setTip}
                    value={tip}
                    viewHeight={0.065}
                    viewWidth={0.78}
                    inputWidth={0.66}
                    border={1}
                    borderColor={Color.themeColor1}
                    backgroundColor={'#FFFFFF'}
                    // marginTop={moderateScale(50, 0.6)}
                    color={Color.themeColor}
                    placeholderColor={Color.themeLightGray}
                    borderRadius={moderateScale(8, 0.3)}
                />
                <CardField
                    postalCodeEnabled={false}
                    placeholderColor={Color.darkGray}
                    placeholders={{
                        number: '4242 4242 4242 4242',
                    }}
                    cardStyle={styles.card_con
                    }
                    style={styles.card_style}
                    onCardChange={cardDetails => {
                        console.log("===========> ", cardDetails)
                    }}
                    onFocus={focusedField => {

                    }}

                />
                <CustomButton
                    textColor={Color.black}
                    text={'add'}
                    loader={isLoading}
                    loaderColor={'black'}
                    onPress={() => {
                        strpieToken();
                    }}
                    marginTop={moderateScale(10, 0.6)}
                    width={windowWidth * 0.35}
                    height={windowHeight * 0.05}
                    borderRadius={moderateScale(25, 0.6)}
                    fontSize={moderateScale(16, 0.3)}
                    textTransform={'uppercase'}
                    isGradient={true}
                    isBold
                    disabled={isLoading}
                />


            </View>
        </Modal>
    );
};

export default PaymentModal;

const styles = ScaledSheet.create({
    header: {
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
        paddingBottom: moderateScale(22, 0.6),
        borderRadius: moderateScale(10, 0.6),
        overflow: 'hidden',
        alignItems: 'center',

        justifyContent: 'center',
    },
    button: {
        padding: moderateScale(8, 0.6),
        borderRadius: moderateScale(25, 0.6),
        borderColor: Color.themeColor,
        borderWidth: 1,
        marginHorizontal: moderateScale(5, 0.3),
        marginVertical: moderateScale(2, 0.3),
    },
    text: {
        fontSize: moderateScale(13, 0.6),
        paddingHorizontal: moderateScale(8, 0.6),
        color: Color.black,
    },
    heading: {
        fontSize: moderateScale(15, 0.6),
        fontStyle: 'italic',
    },
    card_con: {
        backgroundColor: Color.white,
        borderRadius: moderateScale(15, 0.6),
        width: windowWidth * 0.4,
        borderRadius: moderateScale(35, 0.6),
        textColor: 'black',
        placeholderColor: Color.darkGray,
    },
    card_style: {
        width: '85%',
        height: windowHeight * 0.07,
        marginVertical: moderateScale(15, 0.3),
    }
});
