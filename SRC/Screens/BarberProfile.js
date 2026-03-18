import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View
} from 'react-native';
import { Avatar, Divider, Icon } from 'native-base';
import ProfileInfo from '../Components/ProfileInfo';
import BarberServicesInfo from '../Components/BarberServicesInfo';
import CustomTextWithMask from '../Components/CustomTextWithMask';
import ImageView from 'react-native-image-viewing';
import LinearGradient from 'react-native-linear-gradient';
import { ScaledSheet, moderateScale } from 'react-native-size-matters';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

import { useDispatch, useSelector } from 'react-redux';
import Color from '../Assets/Utilities/Color';
import { Post } from '../Axios/AxiosInterceptorFunction';
import CustomButton from '../Components/CustomButton';
import CustomImage from '../Components/CustomImage';
import CustomText from '../Components/CustomText';
import ImagePickerModal from '../Components/ImagePickerModal';
import ScreenBoiler from '../Components/ScreenBoiler';
import SelectLocationModal from '../Components/SelectLocationModal';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import TravelModal from '../Components/TravelModal';
import { setUserData } from '../Store/slices/common';
import { apiHeader, windowHeight, windowWidth } from '../Utillity/utils';
import navigationService from '../navigationService';

const BarberProfile = (props) => {
  const  clientView = props?.route?.params?.clientView;
  const  barberDetails = props?.route?.params?.barberDetails;

  console.log('client view' , clientView ,  JSON.stringify(barberDetails , null ,2))
  const user = useSelector(state => state.commonReducer.userData);
  const [isVisible, setIsVisible] = useState(false);
 

  



  return (
    <ScreenBoiler
    showHeader={true}
      showBack={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      
      <LinearGradient
        colors={Color.themeGradient}
        style={styles.container}>
            <ScrollView
        contentContainerStyle={{
          paddingBottom : 150,
          alignItems: 'center',
        }}
        
        >
      <CustomTextWithMask
            data={'Provider Passport'}
            isBold
            size={moderateScale(30, 0.3)}
            textStyle={{
              fontSize: moderateScale(20, 0.3),
              textAlign:"center"
            }}
            containerStyle={{
                alignSelf:"center",
              marginTop: moderateScale(20, 0.3),
            }}
          />
          <View style={{
             flexDirection : 'row' ,
             width : windowWidth ,
             paddingHorizontal : moderateScale(20,0.6),
             flexWrap : 'wrap',
            //  backgroundColor : 'red',
             paddingTop : moderateScale(10,0.6)
          }}>
            <Icon 
            as={FontAwesome}
            name='home'
            color={'white'}
            size={17}
            style={{
              marginRight : moderateScale(10,0.6)
            }}
            />
            <CustomText
            numberOfLines={2}
            style={{
              color : 'white',
              fontSize : moderateScale(14,0.6),
              width : windowWidth * 0.7,
              backgroundColor : 'black'
            }}
            >{clientView ? barberDetails?.location:  user?.location}</CustomText>
          </View>

          {![null , undefined , ''].includes(user?.temporary_address) &&
           <View style={{
            flexDirection : 'row' ,
            width : windowWidth ,
            paddingHorizontal : moderateScale(20,0.6),
            flexWrap : 'wrap',
           //  backgroundColor : 'red',
            paddingTop : moderateScale(10,0.6)
         }}>
           <Icon 
           as={Fontisto}
           name='holiday-village'
           color={'white'}
           size={17}
           style={{
             marginRight : moderateScale(10,0.6)
           }}
           />
           <CustomText
           numberOfLines={2}
           style={{
             color : 'white',
             fontSize : moderateScale(14,0.6),
             width : windowWidth * 0.7,
             backgroundColor : 'black'
           }}
           >{user?.temporary_address?.name}</CustomText>
         </View>
          }
            {![null , undefined , ''].includes(barberDetails?.temporary_address) &&
           <View style={{
            flexDirection : 'row' ,
            width : windowWidth ,
            paddingHorizontal : moderateScale(20,0.6),
            flexWrap : 'wrap',
           //  backgroundColor : 'red',
            paddingTop : moderateScale(10,0.6)
         }}>
           <Icon 
           as={Fontisto}
           name='holiday-village'
           color={'white'}
           size={17}
           style={{
             marginRight : moderateScale(10,0.6)
           }}
           />
           <CustomText
           numberOfLines={2}
           style={{
             color : 'white',
             fontSize : moderateScale(14,0.6),
             width : windowWidth * 0.7,
             backgroundColor : 'black'
           }}
           >{barberDetails?.temporary_address?.name}</CustomText>
         </View>
          }
        <View style={styles.card}>
        <ProfileInfo
        setIsVisible= {setIsVisible} 
        clientView={clientView}
barberDetails={barberDetails}   
        />
       <Divider
       w={windowWidth * 0.9}
       />
<BarberServicesInfo
clientView={clientView}
barberDetails={barberDetails}


/>

{clientView != true &&
<CustomButton
              bgColor={Color.themeColor}
              borderColor={'white'}
              borderWidth={1}
              textColor={Color.black}
              borderRadius={moderateScale(20, 0.3)}
              onPress={() => {
               navigationService.navigate('MyAccounts')
              }}
              width={windowWidth * 0.75}
              height={windowHeight * 0.06}
              text={
               'Edit'
                
              }
              marginTop={moderateScale(20, 0.3)}
              fontSize={moderateScale(14, 0.3)}
              textTransform={'uppercase'}
              isGradient={true}
              isBold
            // marginTop={moderateScale(10, 0.3)}
            />}
        </View>

      
        <ImageView
          images={[
            {
              uri: `${user?.photo}`,
            },
          ]}
          imageIndex={0}
          visible={isVisible}
          onRequestClose={() => setIsVisible(false)}
        />

      
       

      </ScrollView>
      </LinearGradient>
     </ScreenBoiler>
  );
};

export default BarberProfile;
const styles = ScaledSheet.create({
    container: {
      // paddingTop: windowHeight * 0.03,
      width: windowWidth,
     
      height:windowHeight *0.95
    },  
  
});  
