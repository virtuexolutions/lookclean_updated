import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Platform,
  OS,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import Color from '../Assets/Utilities/Color';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import CustomText from './CustomText';
import CustomButton from './CustomButton';
import navigationService from '../navigationService';
import {Post} from '../Axios/AxiosInterceptorFunction';
import {useNavigation} from '@react-navigation/native';
import VideoReplyScreen from '../Screens/VideoReplyScreen';

const ConsultationModal = ({modalVisible, setModalVisible ,item}) => {
 
  const token = useSelector(state => state.authReducer.token);
  const userData = useSelector(state => state.commonReducer.userData);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);



  return (
    <Modal
      hasBackdrop={true}
      isVisible={modalVisible}
      onBackdropPress={() => {
        setModalVisible(false);
      }}>
      <View style={styles.main}>
        <View
          style={{
            width: '100%',
            height: windowHeight * 0.065,
            backgroundColor: Color.themeColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <CustomText style={styles.heading} >
            Consultation video
          </CustomText>
        </View>
     
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
              width: '85%',
              height: '60%',
            }}>
            <CustomButton
              textColor={Color.white}
              width={windowWidth * 0.3}
              height={windowHeight * 0.06}
              borderRadius={moderateScale(10, 0.4)}
              text={'PREVIEW'}
              fontSize={moderateScale(15, 0.3)}
              onPress={() => {
                navigationService.navigate('CustomerVideoPlayer',{text:'preview',item:item});
              }}
              isBold
              marginHorizontal={moderateScale(10, 0.6)}
              bgColor={Color.themeColor}
              marginTop={moderateScale(15, 0.3)}
              marginBottom={moderateScale(5, 0.3)}
            />
{item?.reply != null &&
            <CustomButton
              textColor={Color.white}
              width={windowWidth * 0.3}
              height={windowHeight * 0.06}
              borderRadius={moderateScale(10, 0.4)}
              text={'VIEW REPLY'}
              fontSize={moderateScale(15, 0.3)}
              onPress={() => {
                navigation.navigate('CustomerVideoPlayer' ,{text:'viewReply',item:item})
              }}
              isBold
              bgColor={Color.themeColor}
              marginTop={moderateScale(15, 0.3)}
              marginBottom={moderateScale(5, 0.3)}
            />}
          </View>
       
      </View>
    </Modal>
  );
};

export default ConsultationModal;

const styles = StyleSheet.create({
  main: {
    backgroundColor: Color.white,
    borderRadius: moderateScale(20, 0.3),
    height: windowHeight * 0.2,
    width: windowWidth * 0.8,
    borderWidth: moderateScale(2, 0.6),
    borderColor: Color.blue,
    marginHorizontal: moderateScale(20, 0.6),
    overflow: 'hidden',
    alignItems: 'center',
  },
  image: {
    height: windowHeight * 0.1,
    width: windowWidth * 0.2,
  },
  heading: {
    color: Color.black,
    fontSize: moderateScale(17, 0.6),
  },
});
