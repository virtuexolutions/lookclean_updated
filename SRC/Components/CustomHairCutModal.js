import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
import Slider from '@react-native-community/slider';
import Draggable from 'react-native-draggable';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const CustomHairCutModal = ({
  data,
  setImage,
  image,
  show,
  setShow,
  setStyle,
  style,
}) => {

  const [size, setSize] = useState(15);
  const [rotation, setRotation] = useState(0);
  return (
    <Modal
      isVisible={show}
      swipeDirection="up"
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: Color.white,
      }}
      onBackdropPress={() => {
        setStyle({});
        setShow(false);
      }}>
      <GestureHandlerRootView>
        <View
          style={{
            backgroundColor: Color.white,
            height: Dimensions.get('window').height * 0.9,
            width: Dimensions.get('window').width * 0.9,
            //   paddingHorizontal: moderateScale(10, 0.3),
            //   paddingVertical: moderateScale(10, 0.3),
            borderRadius: Dimensions.get('window').width * 0.02,
          }}>
          <ImageBackground
            style={{
              width: windowWidth * 0.9,
              height: windowHeight * 0.6,
              justifyContent: 'center',
              alignItems: 'center',
              //   backgroundColor: 'blue',
              //   alignSelf: 'center',1
              //   marginTop: windowHeight * 0.2,
            }}
            resizeMode={'stretch'}
            source={{uri: image?.uri}}>
            {/* <Draggable
            imageSource={require('../Assets/Images/MenHair/1.png')}
            renderSize={80}
            x={200}
            y={400}
            
          /> */}
            {/* <View style={{backgroundColor:'white', position:'absolute', alignItems:'center', justifyContent:'center',zIndex:1}}>
              <Draggable x={200} y={200}>
                <CustomImage
                  source={style.image}
                  style={{
                    width: size + 10,
                    height: size,
                    transform: [{rotate: `${rotation}deg`}],
                  }}
                />
              </Draggable>
            </View> */}
          </ImageBackground>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              style={{
                width: windowWidth * 0.15,
                fontSize: moderateScale(15, 0.6),
              }}
              isBold>
              size
            </CustomText>

            <Slider
              style={{width: 200, height: 40}}
              minimumValue={40}
              maximumValue={150}
              value={95}
              minimumTrackTintColor={Color.themeColor}
              maximumTrackTintColor={Color.themeColor}
              thumbTintColor={Color.themeColor1}
              onValueChange={data => {
               
                setSize(data);
              }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CustomText
              style={{
                width: windowWidth * 0.15,
                fontSize: moderateScale(15, 0.6),
              }}
              isBold>
              rotate
            </CustomText>
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={90}
              value={180}
              maximumValue={270}
              thumbTintColor={Color.themeColor1}
              minimumTrackTintColor={Color.themeColor}
              maximumTrackTintColor={Color.themeColor}
              onValueChange={data => {
                setRotation(data);
              }}
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
};

export default CustomHairCutModal;

const styles = ScaledSheet.create({
  modalHead: {
    fontSize: moderateScale(15, 0.3),
    marginBottom: moderateScale(7.5, 0.3),
  },
});
