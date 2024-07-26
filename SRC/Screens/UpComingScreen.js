import React, {useState} from 'react';
import {ImageBackground, View, ScrollView, FlatList} from 'react-native';
import Color from '../Assets/Utilities/Color';
import CustomText from '../Components/CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment/moment';
import OrderCard from '../Components/OrderCard';
import NoData from '../Components/NoData';

const UpComingScreen = (props) => {
  const data = props?.route?.params?.data

  
  // const orderArray = [
  //   {
  //     image: require('../Assets/Images/dummyCustomer1.png'),
  //     name: 'Lorraine Lebrun',
  //     date: moment().format('ll'),
  //     time: moment().format('hh : mm A'),
  //     amount: 1000,
  //     address: '13th Street. 47 W 13th St, New York,',
  //         services: [
  //       'Blow dry with curling and striaght iron',
  //       'Blow dry',
  //       'Hair cut with Blow dry',
  //       'Mens haircut',
  //       'Gloss',
  //       'Gel Polist',
  //       'Meni pedi',
  //       'nail cutting',
  //       'pink and white fill',
  //     ]
  //   },
  //   {
  //     image: require('../Assets/Images/dummyCustomer2.png'),
  //     name: 'Benjamin Evalent',
  //     date: moment().format('ll'),
  //     time: moment().format('hh : mm A'),
  //     amount: 1000,
  //     address: '13th Street. 47 W 13th St, New York,',
  //       services: [
  //       'Blow dry with curling and striaght iron',
  //       'Blow dry',
  //       'Hair cut with Blow dry',
  //       'Mens haircut',
  //       'Gloss',
  //       'Gel Polist',
  //       'Meni pedi',
  //       'nail cutting',
  //       'pink and white fill',
  //     ],
  //   },
  //   {
  //     image: require('../Assets/Images/dummyCustomer3.png'),
  //     name: 'Jay cuttler',
  //     date: moment().format('ll'),
  //     time: moment().format('hh : mm A'),
  //     amount: 1000,
  //     address: '13th Street. 47 W 13th St, New York,',
  //       services: [
  //       'Blow dry with curling and striaght iron',
  //       'Blow dry',
  //       'Hair cut with Blow dry',
  //       'Mens haircut',
  //       'Gloss',
  //       'Gel Polist',
  //       'Meni pedi',
  //       'nail cutting',
  //       'pink and white fill',
  //     ],
  //   },
  //   {
  //     image: require('../Assets/Images/dummyCustomer4.png'),
  //     name: 'mark joe',
  //     date: moment().format('ll'),
  //     time: moment().format('hh : mm A'),
  //     amount: 1000,
  //     address: '13th Street. 47 W 13th St, New York,',
  //       services: [
  //       'Blow dry with curling and striaght iron',
  //       'Blow dry',
  //       'Hair cut with Blow dry',
  //       'Mens haircut',
  //       'Gloss',
  //       'Gel Polist',
  //       'Meni pedi',
  //       'nail cutting',
  //       'pink and white fill',
  //     ],
  //   },
  //   {
  //     image: require('../Assets/Images/dummyCustomer1.png'),
  //     name: 'Danjay joesph',
  //     date: moment().format('ll'),
  //     time: moment().format('hh : mm A'),
  //     amount: 1000,
  //     address: '13th Street. 47 W 13th St, New York,',
  //       services: [
  //       'Blow dry with curling and striaght iron',
  //       'Blow dry',
  //       'Hair cut with Blow dry',
  //       'Mens haircut',
  //       'Gloss',
  //       'Gel Polist',
  //       'Meni pedi',
  //       'nail cutting',
  //       'pink and white fill',
  //     ],
  //   },
  // ];
  return (
    <ScreenBoiler
      showHeader={true}
      showBack={true}
      showUser={true}
      statusBarBackgroundColor={Color.black}
      statusBarContentStyle={'light-content'}>
      <LinearGradient
        start={{x: 0.0, y: 0.25}}
        end={{x: 0.5, y: 1.0}}
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
                paddingVertical : moderateScale(30,0.3)
              }}
              data={data}
              numColumns={2}
              ListEmptyComponent={()=>{
                return(<NoData
                  style={{
                    height: windowHeight * 0.25,
                    width: windowWidth * 0.6,
                    alignItems: 'center',
                  }}
                  text={'No Upcoming Orders'}
                />)
              }}
           
              
              renderItem={({item, index}) => {
                return <OrderCard item={item} />;
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
    text1Absolute: {
      textTransform: 'uppercase',
      color: Color.white,
      textAlign: 'center',
      fontSize: moderateScale(16, 0.3),
      // position : 'absolute',
      // bottom : moderateScale(10,0.3),
      // marginTop : moderateScale(10,0.3),
      // lineHeight: moderateScale(32, 0.3),
    },
    bannerView: {
      width: windowWidth * 0.85,
      height: windowHeight * 0.46,
      backgroundColor: 'black',
      marginTop: moderateScale(10, 0.3),
    },
    viewAll : {
      color : Color.white,
      fontSize : moderateScale(12,0.3)
  
    },
  });