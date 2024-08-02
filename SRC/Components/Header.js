import React, {useState} from 'react';
import {Icon} from 'native-base';
import {View, Platform, Dimensions, TouchableOpacity} from 'react-native';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomText from './CustomText';
import CustomImage from './CustomImage';
const {height, width} = Dimensions.get('window');
import AntDesign from 'react-native-vector-icons/AntDesign';
import Modal from 'react-native-modal';

import {useDispatch, useSelector} from 'react-redux';
import {imageUrl} from '../Config';
import {setUserLogout} from '../Store/slices/auth';

const Header = props => {
  const dispatch = useDispatch();
  const notification = useSelector(state => state.commonReducer.notification);
  const navigationN = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const {
    title,
    showBack,
    headerColor,
    titleColor,
    close,
    navigateTO,
    headerType,
    Notify,
    showUser,
    showUndo,
    onUndoPress
  } = props;

  const [searchText, setSearchText] = useState('');
  const user = useSelector(state => state.commonReducer.userData);

  const token = useSelector(state => state.authReducer.token);
  const statusArray = [
    {label: 'Change Password', value: 'ChangePassword'},

    {label: 'Terms & Conditions', value: 'TermsAndConditions'},
    {label: 'Financial Breakdown', value: 'FinancialBreakDown'},
    {label: 'Logout', value: 'Logout'},
  ];

  return (
    <View
      style={[
        styles.header2,
        headerColor && {
          backgroundColor: headerColor,
        },
      ]}>
      {showBack && (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => showBack && navigationN.goBack()}
          style={{
            position: 'absolute',
            zIndex: 1,
            left: moderateScale(10, 0.3),
            height: moderateScale(30, 0.3),
            width: moderateScale(30, 0.3),
            borderRadius: moderateScale(5, 0.3),
            // backgroundColor: Color.themeBlack,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name={'arrowleft'}
            as={AntDesign}
            color={Color.white}
            size={moderateScale(25, 0.3)}
          />
        </TouchableOpacity>
      )}
      <CustomImage
        source={require('../Assets/Images/Logo.png')}
        resizeMode={'stretch'}
        style={{
          width: windowWidth * 0.3,
          height: windowHeight * 0.1,
          alignSelf: 'center',
        }}
      />
      {showUser && (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            // navigationN.navigate('MyAccounts');
          }}
          style={{
            position: 'absolute',
            right: moderateScale(10, 0.3),

            alignSelf: 'center',
            width: moderateScale(40, 0.3),
            height: moderateScale(40, 0.3),
            borderRadius: moderateScale(20, 0.3),
            backgroundColor: Color.white,
            overflow: 'hidden',
          }}>
          <CustomImage
            onPress={() => {
              // navigationN.navigate('MyAccounts');
            }}
            source={
              user?.photo
                ? {uri: `${user?.photo}`}
                : require('../Assets/Images/user.png')
            }
            resizeMode={'cover'}
            style={{
              width: '100%',
              height: '100%',
            }}
          />
          {/* )} */}
        </TouchableOpacity>
      )}
      {showUndo && (
        <TouchableOpacity
        
        onPress={onUndoPress}
          style={{
            paddingHorizontal: moderateScale(10, 0.6),
            paddingVertical: moderateScale(5, 0.6),
            // borderWidth: 1,
            // borderColor: Color.veryLightGray,
            position: 'absolute',
            right: moderateScale(10, 0.3),
            // borderRadius : moderateScale(10,0.6),
            alignSelf: 'center',
          }}>
          <Icon
            name={'back'}
            as={AntDesign}
            color={'#FFFFFF'}
            size={moderateScale(20, 0.6)}
            onPress={onUndoPress}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = ScaledSheet.create({
  header2: {
    width: windowWidth,
    height: windowHeight * 0.1,
    backgroundColor: Color.black,
    justifyContent: 'center',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // paddingHorizontal: moderateScale(20, 0.3),
    // backgroundColor: 'red',
  },
});
export default Header;
