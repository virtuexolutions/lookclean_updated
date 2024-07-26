import React, {useState, useEffect} from 'react';
import {
  ImageBackground,
  View,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment/moment';
import OrderCard from '../Components/OrderCard';
import DropDownSingleSelect from '../Components/DropDownSingleSelect';
import {Get} from '../Axios/AxiosInterceptorFunction';
import {useSelector} from 'react-redux';
import NoData from '../Components/NoData';
import CustomerCard from '../Components/CustomerCard';

const CustomerBookingDetails = () => {
  const user = useSelector(state => state.commonReducer.userData);
  const [item, setItem] = useState('');
  const [Loading, setLoading] = useState(false);
  const token = useSelector(state => state.authReducer.token);

 
  
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
        <CustomText isBold style={styles.text1}>
          My Bookings Details
        </CustomText>

      

       
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default CustomerBookingDetails;

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.03,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // backgroundColor : Color.green
  },
  text1: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(20, 0.3),
  },
 
});
