import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
  ToastAndroid,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {Get, Post} from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import {Icon} from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {setUserData} from '../Store/slices/common';

const QuestionAnswerScreen = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authReducer.token);
  const [isLoading, setIsLoading] = useState(false);
  const [aboutShop, setAboutShop] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState([]);


  const infoAboutShop = async () => {
    const url = `auth/question`;
    setIsLoading(true);
    const response = await Get(url, token);

    setIsLoading(false);

    if (response != undefined) {
      setAboutShop(response?.data?.data);
    }
  };

  const answerPost = async () => {
    const body = {
      answers: selectedAnswer,
    };

    const url = 'auth/question-answer';

    if (selectedAnswer?.length < 3) {
      return Platform.OS == 'android'
        ? ToastAndroid.show(
            'please answer all the question',
            ToastAndroid.SHORT,
          )
        : alert('Please Answer All The Question');
    }
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);
    if (response != undefined) {

      dispatch(setUserData(response?.data?.user_info));
    }
  };

  useEffect(() => {
    infoAboutShop();
  }, []);

  return (
    <ScreenBoiler
      showHeader={true}
      showback={false}
      showUser={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
        colors={Color.themeGradient}
        style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: windowHeight * 0.155,

            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
          }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            // decelerationRate={'fast'}
            numColumns={1}
            contentContainerStyle={{
              width: '100%',
              alignItems: 'center',
              height: windowHeight * 0.7,
              paddingTop: moderateScale(20, 0.6),
              paddingBottom: moderateScale(100, 0.6),
            }}
            data={aboutShop}
            renderItem={({item, index}) => {
              return (
                <View
                  style={{
                    marginVertical: moderateScale(10, 0.6),
                  }}>
                  <View style={styles.container1}>
                    <CustomText isBold style={styles.text2}>
                      {item?.id}.
                    </CustomText>
                    <CustomText isBold style={styles.text3}>
                      {item?.name}
                    </CustomText>
                  </View>
                  <View style={styles.container3}>
                    <TouchableOpacity
                      onPress={() => {
                        if (
                          selectedAnswer?.some(item1 => item1?.id == item?.id)
                        ) {
                          setSelectedAnswer(
                            prev => [...prev],
                            (selectedAnswer[
                              selectedAnswer.findIndex(
                                item2 => item2?.id == item?.id,
                              )
                            ].answer = 'yes'),
                          );
                        } else {
                          setSelectedAnswer(prev => [
                            ...prev,
                            {id: item?.id, answer: 'yes'},
                          ]);
                        }
                      }}
                      style={[
                        styles.row,
                        // {backgroundColor:'red'}
                      ]}>
                      <View style={styles.checkbox}>
                        {selectedAnswer?.some(
                          (data, index) =>
                            data?.id == item?.id && data?.answer === 'yes',
                        ) && (
                          <Icon
                            as={FontAwesome}
                            name="check"
                            size={moderateScale(12, 0.6)}
                            color={Color.themeColor}
                          />
                        )}
                      </View>
                      <CustomText isBold style={styles.yes}>
                        yes
                      </CustomText>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        if (
                          selectedAnswer?.some(item1 => item1?.id == item?.id)
                        ) {
                          setSelectedAnswer(
                            prev => [...prev],
                            (selectedAnswer[
                              selectedAnswer.findIndex(
                                item2 => item2?.id == item?.id,
                              )
                            ].answer = 'no'),
                          );
                        } else {
                          setSelectedAnswer(prev => [
                            ...prev,
                            {id: item?.id, answer: 'no'},
                          ]);
                        }
                      }}
                      style={styles.row}>
                      <View style={styles.checkbox}>
                        {selectedAnswer?.some(
                          (data, index) =>
                            data?.id == item?.id && data?.answer === 'no',
                        ) && (
                          <Icon
                            as={FontAwesome}
                            name="check"
                            size={moderateScale(12, 0.6)}
                            color={Color.themeColor}
                          />
                        )}
                      </View>
                      <CustomText isBold style={styles.yes}>
                        no
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />

          <CustomButton
            isBold
            text={
              isLoading ? (
                <ActivityIndicator size={'small'} color={Color.themeColor} />
              ) : (
                'Submit'
              )
            }
            textColor={Color.black}
            width={windowWidth * 0.9}
            height={windowHeight * 0.06}
            marginTop={moderateScale(20, 0.3)}
            onPress={() => {
              answerPost();
            }}
            isGradient
            bgColor={['#FFFFFF', '#FFFFFF']}
            borderRadius={moderateScale(30, 0.3)}
          />
        </ScrollView>
      </LinearGradient>
    </ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.03,
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
  },
  text1: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(20, 0.6),
  },
  container1: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text2: {
    fontSize: moderateScale(8, 6),
    color: Color.white,
    width: windowWidth * 0.07,
  },
  text3: {
    fontSize: moderateScale(8, 6),
    color: Color.white,
    width: windowWidth * 0.85,
  },
  container3: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: windowWidth * 0.4,
    // backgroundColor : 'red',
    marginHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(5, 0.6),
  },
  row: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  yes: {
    fontSize: moderateScale(12,0.6),
    color: Color.white,
    marginHorizontal: moderateScale(5, 0.6),
  },
  checkbox: {
    height: windowHeight * 0.02,
    width: windowWidth * 0.04,
    borderRadius: moderateScale(3, 0.6),
    borderWidth: moderateScale(1, 0.6),
    borderColor: Color.themeColor,
  },
});
export default QuestionAnswerScreen;
