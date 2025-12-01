import React from 'react';
import { FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { moderateScale, ScaledSheet } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import NoData from '../Components/NoData';
import OrderCard from '../Components/OrderCard';
import ScreenBoiler from '../Components/ScreenBoiler';
import { windowHeight, windowWidth } from '../Utillity/utils';

const UpComingScreen = (props) => {
  const data = props?.route?.params?.data

  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      showUser={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        colors={Color.themeGradient}
        style={styles.container}>
        <CustomText isBold style={styles.text1}>
          UpComing Orders
        </CustomText>
        <FlatList
          decelerationRate={'fast'}
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: moderateScale(10, 0.3),
          }}
          contentContainerStyle={{
            paddingHorizontal: moderateScale(8, 0.3),
            paddingVertical: moderateScale(30, 0.3)
          }}
          data={data}
          numColumns={2}
          ListEmptyComponent={() => {
            return (<NoData
              style={{
                height: windowHeight * 0.25,
                width: windowWidth * 0.6,
                alignItems: 'center',
              }}
              text={'No Upcoming Orders'}
            />)
          }}
          renderItem={({ item, index }) => {
            return <OrderCard item={item} />
          }}
        />
      </LinearGradient>
    </ScreenBoiler>
  )
}

export default UpComingScreen

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
    fontSize: moderateScale(20, 0.3),
  },
  text1Absolute: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(16, 0.3),
  },
  bannerView: {
    width: windowWidth * 0.85,
    height: windowHeight * 0.46,
    backgroundColor: 'black',
    marginTop: moderateScale(10, 0.3),
  },
  viewAll: {
    color: Color.white,
    fontSize: moderateScale(12, 0.3)
  },
});