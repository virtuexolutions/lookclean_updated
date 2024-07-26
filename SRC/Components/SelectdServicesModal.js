import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from './CustomText';
import {Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import CustomButton from './CustomButton';
import {useNavigation} from '@react-navigation/native';
import Lottie from 'lottie-react-native';
import {useState} from 'react';
import {set} from 'react-native-reanimated';

const SelectedServicesModal = ({
  item,
  isVisiable,
  setIsVisiable,
  isSelected,
  setIsSelected,
}) => {
// console.log('Selected Services Modal ==== >',item)
  const navigation = useNavigation();
  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isVisiable}
      onBackdropPress={() => {
        // setIsVisiable(false);
      }}>
      <View style={styles.main}>
        <View
          style={{
            backgroundColor: Color.themeColor,
            height: windowHeight * 0.07,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText
            style={{
              color: Color.red,
              fontSize: moderateScale(15, 0.6),
            }}
            isBold>
            Select your main service
          </CustomText>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={true}
          contentContainerStyle={
            {
              // paddingBottom :moderateScale(50,.6)
            }
          }
          style={
            {
              // backgroundColor:'red',
              marginVertical:moderateScale(10,.6)
            }
          }>
          {item?.map((data, index) => {
            // console.log('heereer ==> ',data)
            return (
              <TouchableOpacity
                onPress={() => {
                  console.log("Pressed", data)
                  if (isSelected?.id == data?.id) {
                    console.log("DATA ===> ",data)

                    setIsSelected({});
                  } else {
                    setIsSelected(data);
                  }
                }}
                style={styles.container}>
                <CustomText
                  onPress={() => {
                    if (isSelected?.id == data?.id) {
                      setIsSelected({});
                    } else {
                      console.log("Selected Data === > ", data)
                      setIsSelected(data);
                    }
                  }}
                  style={styles.data}
                  isBold>
                  {data?.name}
                </CustomText>
                {isSelected?.id == data?.id && (
                  <View
                    style={{
                      position : 'absolute',
                      right : 1,
                      // backgroundColor:'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Icon
                      name={'check'}
                      as={FontAwesome5}
                      size={14}
                      color={Color.green}
                    />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        <View
          style={{
            width: windowWidth * 0.7,
            alignItems: 'center',
          }}>
          <CustomButton
            textColor={Color.black}
            width={windowWidth * 0.2}
            height={windowHeight * 0.04}
            borderRadius={moderateScale(30, 0.4)}
            text={'ok'}
            fontSize={moderateScale(12, 0.3)}
            onPress={() => {
              setIsVisiable(false);
              // setMainService(1);
            }}
            isGradient={true}
            isBold
            marginTop={moderateScale(5, 0.3)}
            marginBottom={moderateScale(5, 0.3)}
          />
        </View>
      </View>
    </Modal>
  );
};

export default SelectedServicesModal;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Color.white,
    width: windowWidth * 0.7,
    borderRadius: moderateScale(20, 0.3),
    overflow: 'hidden',
    // backgroundColor:'red',
  },
  container: {
    flexDirection: 'row',
    width: windowWidth * 0.6,
    marginVertical: moderateScale(5, 0.3),
    padding: moderateScale(7, 0.6),
    borderRadius: moderateScale(10, 0.6),
    borderColor: Color.themeColor,
    borderWidth: moderateScale(1, 0.6),
    alignItems: 'center',
    marginHorizontal: moderateScale(15, 0.3),
    // paddingVertical: moderateScale(5, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    // marginVertical:moderateScale(10,.6)
  },
  data: {
    color: Color.darkGray,
    // backgroundColor:'red',
    fontSize: moderateScale(13, 0.6),
  },
});
