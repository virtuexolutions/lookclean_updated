import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ToastAndroid,
  ActivityIndicator,
  FlatList,
  TextInput,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ScreenBoiler from '../Components/ScreenBoiler';
import {Icon} from 'native-base';
import CustomButton from '../Components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import CustomText from '../Components/CustomText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import ServiceComponent from '../Components/ServiceComponent';
import {useDispatch, useSelector} from 'react-redux';
import {Delete, Get, Post} from '../Axios/AxiosInterceptorFunction';
import {useNavigation} from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
const TimeScreen = () => {
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [Loading, setLoading] = useState(false);
  const token = useSelector(state => state.authReducer.token);
  const navigation = useNavigation();

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirm = time => {
    const timeString = time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    setSelectedTimes([...selectedTimes, timeString]);
    hideTimePicker();
  };

  const removeTime = index => {
    const updatedTimes = [...selectedTimes];
    updatedTimes.splice(index, 1);
    setSelectedTimes(updatedTimes);
  };

  // TIME POST API START
  const TimeAdd = async () => {
    const body = {
      time: selectedTimes,
    };


 if(selectedTimes?.length == 0){
  return Platform.OS == 'android'
  ? ToastAndroid.show(`please add time to proceed`, ToastAndroid.SHORT)
  : Alert.alert(`please add time to proceed`);
 }

    const url = 'auth/barber/service_timing';
    setIsLoading(true);
    const response = await Post(url, body, apiHeader(token));
    setIsLoading(false);

    if (response != undefined) {

      Platform.OS === 'android'
        ? ToastAndroid.show('Added sucessfully', ToastAndroid.SHORT)
        : Alert.alert('Added sucessfully');
      navigation.goBack();
    }
  };
  // TIME POST API END

  // TIME GET API START
  const GetTime = async () => {
    const url = `auth/barber/service_timing`;
    setLoading(true);
    const response = await Get(url, token);

    setLoading(false);
    if (response != undefined) {
    
      setSelectedTimes(response?.data?.info?.time.map(item => item?.time));
    }
  };
  // TIME GET API END

  useEffect(() => {
    GetTime();
  }, []);

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
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
            paddingBottom : 50,
          }}

          >
       
        <View style={styles.headerContainer}>
          <CustomText isBold style={styles.addService}>
            Add Time
          </CustomText>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.plusButton}
            onPress={showTimePicker}>
            <Icon
              name="plus"
              as={AntDesign}
              size={moderateScale(18, 0.3)}
              color={Color.white}
            />
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
        />

        <View style={styles.selectedTimesContainer}>
          {selectedTimes.map((item, index) => (
            <View key={index} style={styles.selectedTimeContainer}>
              <CustomText style={styles.selectedTimeText}>
                Appointment Time: {item}
              </CustomText>
              <TouchableOpacity
                onPress={() => removeTime()}
                style={styles.removeButton}>
                <Icon
                  name="close"
                  as={AntDesign}
                  size={moderateScale(16, 0.3)}
                  color={Color.white}
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            zIndex: 1,
            right: 0,
            bottom: 35,
            left: 0,
            justifyContent: 'center',
            alignItems: 'center',
            // backgroundColor:'white'
          }}>
          <CustomButton
            onPress={() => {
              TimeAdd();
            }}
            text={
              isLoading ? (
                <ActivityIndicator
                  size={moderateScale(30, 0.6)}
                  color={'white'}
                />
              ) : (
                'Save'
              )
            }
            textColor={Color.white}
            width={windowWidth * 0.7}
            height={windowHeight * 0.07}
            marginBottom={moderateScale(80, 0.3)}
            bgColor={Color.themeColor}
            borderRadius={moderateScale(25, 0.3)}
            // isGradient
          />
        </View>
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default TimeScreen;

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.02,
    height: windowHeight * 0.9,
    width: windowWidth,
  },
  headerContainer: {
    width: windowWidth * 0.95,
    paddingVertical: moderateScale(10, 0.6),
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10, 0.6),
  },
  addService: {
    fontSize: moderateScale(16, 0.6),
    color: Color.white,
  },
  plusButton: {
    width: windowWidth * 0.06,
    height: windowWidth * 0.06,
    borderRadius: (windowWidth * 0.06) / 2,
    backgroundColor: Color.themeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  selectedTimesContainer: {
    marginTop: moderateScale(20, 0.3),
    width: windowWidth * 0.9,
    alignSelf: 'center',
  },
  selectedTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Color.themeColor,
    paddingVertical: moderateScale(5, 0.6),
    paddingHorizontal: moderateScale(10, 0.6),
    borderRadius: moderateScale(8, 0.3),
    marginBottom: moderateScale(15, 0.3),
    alignItems: 'center',
  },
  selectedTimeText: {
    color: Color.white,
    fontSize: moderateScale(16, 0.6),
  },
  removeButton: {
    padding: moderateScale(10, 0.3),
  },
});
