import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import TitleWithDescription from './TitleWithDescription';
import Color from '../Assets/Utilities/Color';
import IconWithText from './IconWithText';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {Divider} from 'native-base';
import CustomText from './CustomText';
import {windowHeight, windowWidth} from '../Utillity/utils';
import CustomImage from './CustomImage';
import {useSelector} from 'react-redux';
const BarberServicesInfo = ({data}) => {
  const user = useSelector(state => state.commonReducer.userData);
  console.log(user?.rush_service , user?.holiday_mode ,user?.health_mode , user?.temporary_address)
  return (
    <View style={styles.servicesInfo}>
      <View style={styles.column}>
        <CustomText
          isBold={true}
          style={[styles.txt11, styles.title]}
          children={'Offered Services'}
        />
        {user?.services?.map((item, index) => {
          return <CustomText style={styles.text2} children={item?.name} />;
        })}
        {/* <TitleWithDescription
                    title='Offered Services'
                    titleStyle={styles.title}
                    description={`${user?.services[0]?.name}`}
                /> */}
        <Divider />
        <TitleWithDescription
          title="Completed Services Record"
          titleStyle={styles.title}
          description={`${user?.completed_bookings_count} services completed`}
        />
        <Divider />
        <TitleWithDescription
          title="Rating & Tier"
          titleStyle={styles.title}
          description={
            <IconWithText
              iconName={'star'}
              iconType={AntDesign}
              iconColor={Color.themeColor}
              text={`${user?.reviews_count} / 5`}
              textStyle={styles.text2}
            />
          }
        />
        <TitleWithDescription
          titleIsBold={false}
          title={'$$$'}
          titleStyle={styles.text1}
        />
      </View>
      <Divider orientation="vertical" height={windowHeight * 0.35} />
      <View style={styles.column}>
        <TitleWithDescription
          title="Certifications"
          titleStyle={styles.title}
          description={
            ['', null, undefined].includes(user?.any_certification)
              ? 'No certifications yet'
              : user?.any_certification
          }
        />


        <View style={styles.serviceImage}>
          <CustomImage
            style={styles.image}
            source={require('../Assets/Images/bannerImage2.png')}
          />
        </View>
      <TitleWithDescription
          title="Current Statuses"
          titleStyle={[styles.title,{
            marginBottom : moderateScale(-15,0.6),
          }]}
          description={''}
        />
         {user?.health_mode == true &&
        <View style = {{
          paddingHorizontal: scale(10),
          flexDirection : 'row',
          alignItems : 'center'
        }}>

        <CustomText
        style={{
          color : 'white',
          fontSize : moderateScale(13,0.6),
        }}
        >Health Mode</CustomText>
        <CustomText style={{
          color : 'green',
          fontSize : moderateScale(15,0.6),
        }}> ✔ </CustomText>
        </View>
        }


           {user?.holiday_mode == true &&
        <View style = {{
          paddingHorizontal: scale(10),
          flexDirection : 'row',
          alignItems : 'center'
        }}>

        <CustomText
        style={{
          color : 'white',
          fontSize : moderateScale(13,0.6),
        }}
        >Holiday Mode</CustomText>
        <CustomText style={{
          color : 'green',
          fontSize : moderateScale(15,0.6),
        }}> ✔ </CustomText>
        </View>
        }
           {![null , undefined , ''].includes(user?.temporary_address) &&
        <View style = {{
          paddingHorizontal: scale(10),
          flexDirection : 'row',
          alignItems : 'center'
        }}>

        <CustomText
        style={{
          color : 'white',
          fontSize : moderateScale(13,0.6),
        }}
        >Travel Mode</CustomText>
        <CustomText style={{
          color : 'green',
          fontSize : moderateScale(15,0.6),
        }}> ✔ </CustomText>
        </View>
        }

  {user?.rush_service == true &&
        <View style = {{
          paddingHorizontal: scale(10),
          flexDirection : 'row',
          alignItems : 'center'
        }}>

        <CustomText
        style={{
          color : 'white',
          fontSize : moderateScale(13,0.6),
        }}
        >Rush Mode</CustomText>
        <CustomText style={{
          color : 'green',
          fontSize : moderateScale(15,0.6),
        }}> ✔ </CustomText>
        </View>
        } 


      </View>
    </View>
  );
};

export default BarberServicesInfo;

const styles = StyleSheet.create({
  servicesInfo: {
    paddingTop: verticalScale(6),
    flexDirection: 'row',
    gap: scale(10),
  },
  column: {
    gap: scale(10),
    paddingTop: verticalScale(8),
    width: windowWidth * 0.45,
  },
  title: {
    textTransform: 'capitalize',
  },
  text1: {
    fontWeight: 'light',
    width: windowWidth * 0.3,
  },
  serviceImage: {
    // top: verticalScale(-20),
    width: windowWidth * 0.35,
    height: windowWidth * 0.25,
    overflow: 'hidden',
    borderRadius: moderateScale(10, 0.2),
    marginLeft : moderateScale(10,0.6)
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text2: {
    fontSize: moderateScale(14, 0.2),
    color: '#7F8489',
  },
  txt11: {
    fontSize: moderateScale(16, 0.2),
    color: Color.white,
  },
});
