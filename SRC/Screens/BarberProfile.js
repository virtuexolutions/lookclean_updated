import React from 'react';
import {View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ScaledSheet, moderateScale, scale, verticalScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import ScreenBoiler from '../Components/ScreenBoiler';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from '../Components/CustomImage';
import { Avatar, Divider, Icon } from 'native-base';
import IconWithText from '../Components/IconWithText';
import TitleWithDescription from '../Components/TitleWithDescription';
import ProfileInfo from '../Components/ProfileInfo';
import BarberServicesInfo from '../Components/BarberServicesInfo';
import CustomTextWithMask from '../Components/CustomTextWithMask';

const BarberProfile = () => {
  return (
    <ScreenBoiler
    showHeader={true}
      showBack={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        colors={Color.themeGradient}
        style={styles.container}>
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
        <View style={styles.card}>
        <ProfileInfo
        data={{}}
        />
       <Divider
       w={windowWidth * 0.9}
       />
<BarberServicesInfo/>

        </View>
      </LinearGradient>
     </ScreenBoiler>
  );
};

export default BarberProfile;
const styles = ScaledSheet.create({
    container: {
      paddingTop: windowHeight * 0.03,
      width: windowWidth,
      alignItems: 'center',
      height:windowHeight
    },  
  
});  
