import {
  Alert,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import CustomText from '../Components/CustomText';
import CustomImage from '../Components/CustomImage';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../Assets/Utilities/Color';
import CustomButton from '../Components/CustomButton';
import ImagePickerModal from '../Components/ImagePickerModal';
import CustomHairCutModal from '../Components/CustomHairCutModal';
import {Icon} from 'native-base';
import Entypo from 'react-native-vector-icons/Entypo';
import Draggable from 'react-native-draggable';
import Slider from '@react-native-community/slider';
import ViewShot from 'react-native-view-shot';
import navigationService from '../navigationService';

const ImageScreen = props => {
  const data = props?.route?.params?.data;
  const Image = props?.route?.params?.image;
  const barber = props?.route?.params?.barber

  const ref = useRef();

  const [size, setSize] = useState(100);
  const [rotation, setRotation] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState('');
  const [image, setImage] = useState([
    {category: selectedCat, uri: Image?.uri, name:Image?.name, type:Image?.type},
  ]);

  const [selectedImage, setSelectedImage] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [xPosition, setXPosition] = useState(100);
  const [YPosition, setYPosition] = useState(200);
  

  const [selectedStyle, setSelectedStyle] = useState({});
  const [array, setArray] = useState([]);


  const HairStyle = [
    {
      id: 1,
      image: require('../Assets/Images/MenHair/1.png'),
      category: 'Hair',
    },
    {
      id: 2,
      image: require('../Assets/Images/MenHair/2.png'),
      category: 'Hair',
    },
    {
      id: 3,
      image: require('../Assets/Images/MenHair/3.png'),
      category: 'Hair',
    },
    {
      id: 4,
      category: 'Hair',
      image: require('../Assets/Images/MenHair/4.png'),
    },
    {
      id: 5,
      image: require('../Assets/Images/MenHair/5.png'),
      category: 'Hair',
    },
    {
      id: 6,
      image: require('../Assets/Images/MenHair/6.png'),
      category: 'Hair',
    },
  ];
  const BeardStyle = [
    {
      id: 1,
      image: require('../Assets/Images/MenHair/1.png'),
      category: 'Beard',
    },
    {
      id: 2,
      image: require('../Assets/Images/MenHair/2.png'),
      category: 'Beard',
    },
    {
      id: 3,
      image: require('../Assets/Images/MenHair/3.png'),
      category: 'Beard',
    },
    {
      id: 4,
      category: 'Beard',
      image: require('../Assets/Images/MenHair/4.png'),
    },
    {
      id: 5,
      image: require('../Assets/Images/MenHair/5.png'),
      category: 'Beard',
    },
    {
      id: 6,
      image: require('../Assets/Images/MenHair/6.png'),
      category: 'Beard',
    },
  ];

  const Mustaches = [
    {
      id: 1,
      image: require('../Assets/Images/Mustaches/1.png'),
      category: 'Mustaches',
    },
    {
      id: 2,
      image: require('../Assets/Images/Mustaches/2.png'),
      category: 'Mustaches',
    },
    {
      id: 3,
      image: require('../Assets/Images/Mustaches/3.png'),
      category: 'Mustaches',
    },
    {
      id: 4,
      image: require('../Assets/Images/Mustaches/4.png'),
      category: 'Mustaches',
    },
    {
      id: 5,
      image: require('../Assets/Images/Mustaches/5.png'),
      category: 'Mustaches',
    },
    {
      id: 6,
      image: require('../Assets/Images/Mustaches/6.png'),
      category: 'Mustaches',
    },
  ];

  const handlePrompt = item => {
    Alert.alert('Confirmation', 'Are you sure you want to discard changes?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Confirm',
        onPress: () => {
          const imageClone = image.slice(0, 1);
          setImage(imageClone);
          setSelectedStyle(item);
          return true;
        },
      },
    ]);
  };

  const captureShot = () => {
    // on mount
    ref.current.capture().then(uri => {
      setImage(prev => [...prev, {category: selectedCat, uri: uri, type:image[0]?.type, name:image[0]?.name}]);
      setIsVisible(!isVisible);
      setSelectedStyle({});
      setSelectedCat('');
    });
  };

  useEffect(() => {
    if (Object.keys(selectedStyle).length > 0) {
      setIsVisible(true);
    }
  }, [selectedStyle]);

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}
      showUndo={image?.length > 1 && Object.keys(selectedStyle) <= 0}
      onUndoPress={() => {
        const newImages = [...image];
        newImages.pop();
        setImage([...newImages]);
      }}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        <CustomText isBold style={styles.text}>
          Image
        </CustomText>

        <View
          style={{
            width: windowWidth * 0.8,
            height: windowHeight * 0.4,
            alignSelf: 'center',
            borderRadius: moderateScale(20, 0.6),
            overflow: 'hidden',
            marginTop: moderateScale(30, 0.3),
          }}>
          <ViewShot
            ref={ref}
            options={{fileName: 'hello', format: 'jpg', quality: 0.9}}>
            <ImageBackground
              source={
                image.length > 0
                  ? {uri: image[image.length - 1]?.uri}
                  : require('../Assets/Images/barber.png')
              }
              resizeMode={'cover'}
              style={{height: '100%', width: '100%'}}>
              <View>
                {isVisible && (
                  <Draggable
                    x={100}
                    y={100}
                    minX={0}
                    maxX={300}
                    minY={-70}
                    maxY={300}
                    onDrag={(e, gestureState) => {
                      // setXPosition(gestureState?.moveX)
                      // setYPosition(gestureState?.moveY)
                      
                    }}>
                    <CustomImage
                      source={selectedStyle?.image}
                      style={{
                        width: size + 40,
                        height: size,
                        transform: [{rotate: `${rotation}deg`}],
                      }}
                      resizeMode={'stretch'}
                    />
                  </Draggable>
                )}
              </View>
            </ImageBackground>
          </ViewShot>

          {/* <Draggable x={200} y={300} renderColor='red' renderText='B'/> */}
        </View>

        {selectedCat == '' ? (
          <>
            <CustomButton
              bgColor={Color.themeColor}
              borderColor={'white'}
              borderWidth={1}
              textColor={Color.black}
              width={windowWidth * 0.8}
              height={windowHeight * 0.06}
              text={'Hair'}
              fontSize={moderateScale(14, 0.3)}
              isGradient={true}
              isBold
              onPress={() => {
                setSelectedCat('Hair');

                setArray(HairStyle);
              }}
              borderRadius={moderateScale(30, 0.4)}
              marginTop={moderateScale(30, 0.3)}
            />

            <CustomButton
              bgColor={Color.themeColor}
              borderColor={'white'}
              borderWidth={1}
              textColor={Color.black}
              width={windowWidth * 0.8}
              height={windowHeight * 0.06}
              text={'Beard'}
              fontSize={moderateScale(14, 0.3)}
              isGradient={true}
              isBold
              onPress={() => {
                setSelectedCat('Beard');
                setArray(BeardStyle);
              }}
              borderRadius={moderateScale(30, 0.4)}

              marginTop={moderateScale(10, 0.3)}
            />

            <CustomButton
              bgColor={Color.themeColor}
              borderColor={'white'}
              borderWidth={1}
              textColor={Color.black}
              width={windowWidth * 0.8}
              height={windowHeight * 0.06}
              text={'Mustaches'}
              fontSize={moderateScale(14, 0.3)}
              borderRadius={moderateScale(30, 0.4)}
              isGradient={true}
              isBold
              onPress={() => {
                setSelectedCat('Mustaches');
                setArray(Mustaches);
              }}
              marginTop={moderateScale(10, 0.3)}
            />
            {image.length > 1 && (
              <CustomButton
                bgColor={Color.themeColor}
                borderColor={'white'}
                borderWidth={1}
                textColor={Color.black}
                width={windowWidth * 0.8}
                height={windowHeight * 0.06}
                borderRadius={moderateScale(30, 0.4)}
                text={'Proceed'}

                fontSize={moderateScale(14, 0.3)}
                isGradient={true}
                isBold
                onPress={() => {
                  navigationService.navigate('ChooseDate',{data : data, image: image.slice(image.length-1), barber:barber})
                }}
                marginTop={moderateScale(10, 0.3)}
              />
            )}
          </>
        ) : (
          <View
            style={{
              width: windowWidth * 0.95,
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignSelf: 'center',
              zIndex: 1,
              // backgroundColor : 'green'
            }}>
            <View
              style={{
                width: windowWidth,
                flexDirection: 'row',
                marginTop: moderateScale(5, 0.3),
                marginLeft: moderateScale(-10, 0.3),
                justifyContent: 'center',
                alignItems: 'center',
                // zIndex:2,
              }}>
              <Icon
                name={'chevron-small-left'}
                as={Entypo}
                color={Color.themeColor}
                size={10}
                style={{left: 10, position: 'absolute'}}
                onPress={() => {
                  if (isVisible) {
                    setIsVisible(!isVisible);
                    setSelectedStyle({});
                  } else {
                    setSelectedCat('');
                  }
                }}
              />
              <CustomText
                style={{color: Color.white, fontSize: moderateScale(15, 0.6)}}
                isBold>
                {selectedCat}
              </CustomText>
            </View>
            {!isVisible ? (
              array?.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (
                        image.find(i => {
                          return i?.category == item?.category;
                        })
                      ) {
                        handlePrompt(item);
                      } else {
                        setSelectedStyle(item);
                      }
                    }}
                    style={{
                      width: windowWidth * 0.3,
                      height: windowHeight * 0.13,
                      marginRight: windowWidth * 0.015,
                      borderRadius: moderateScale(10, 0.6),
                      overflow: 'hidden',
                      backgroundColor: 'white',
                      marginTop: moderateScale(10, 0.3),
                      // alignItems : 'center',
                      justifyContent: 'center',
                    }}>
                    <CustomImage
                      onPress={() => {
                        if (
                          image.find(i => {
                            return i?.category == item?.category;
                          })
                        ) {
                          handlePrompt(item);
                        } else {
                          setSelectedStyle(item);
                        }
                      }}
                      source={item?.image}
                      style={{
                        width: '90%',
                        height: '90%',
                      }}
                    />
                  </TouchableOpacity>
                );
              })
            ) : (
              <>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: windowWidth,
                    // backgroundColor:'red',
                    // position:'absolute',
                    zIndex: 1,
                    marginTop: moderateScale(50, 0.3),
                  }}>
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
                        color: Color.white,
                      }}
                      isBold>
                      Size
                    </CustomText>
                    <Slider
                      style={{width: 250, height: 40}}
                      minimumValue={60}
                      maximumValue={200}
                      value={130}
                      minimumTrackTintColor={Color.themeColor}
                      maximumTrackColor={Color.themeColor}
                      maximumTrackTintColor={Color.white}
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
                        color: Color.white,
                      }}
                      isBold>
                      rotate
                    </CustomText>
                    <Slider
                      style={{width: 250, height: 40}}
                      minimumValue={-180}
                      value={0}
                      maximumValue={180}
                      thumbTintColor={Color.themeColor1}
                      minimumTrackTintColor={Color.themeColor}
                      maximumTrackTintColor={Color.themeColor}
                      onValueChange={data => {
                        setRotation(data);
                      }}
                    />
                  </View>
                  <CustomButton
                    bgColor={Color.themeColor}
                    borderColor={'white'}
                    borderWidth={1}
                    textColor={Color.black}
                    width={windowWidth * 0.8}
                    height={windowHeight * 0.06}
                    text={'Save'}
                    fontSize={moderateScale(14, 0.3)}
              borderRadius={moderateScale(30, 0.4)}

                    isGradient={true}
                    isBold
                    onPress={() => {
                      captureShot();
                    }}
                    marginTop={moderateScale(30, 0.3)}
                  />
                </View>
              </>
            )}
          </View>
        )}
        <View
          style={{
            position: 'absolute',
            bottom: 30,
            right: 0,
            zIndex: 0,
            // backgroundColor:'black'
          }}>
          <CustomImage
            source={require('../Assets/Images/backgroundLogo.png')}
            resizeMode={'stretch'}
          />
        </View>
      </LinearGradient>
      <ImagePickerModal
        show={showModal}
        setShow={setShowModal}
        setFileObject={setImage}
      />
      {/* <CustomHairCutModal
        data={array}
        image={image}
        setImage={setImage}
        setShow={setIsVisible}
        show={isVisible}
        setStyle={setSelectedStyle}
        style={selectedStyle}
      /> */}
    </ScreenBoiler>
  );
};

export default ImageScreen;

const styles = StyleSheet.create({
  container: {
    height: windowHeight,
    width: windowWidth,
  },

  text: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(21, 0.3),
  },
});
