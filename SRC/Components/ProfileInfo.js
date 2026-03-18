import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import CustomText from './CustomText'
import { Icon } from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import Color from '../Assets/Utilities/Color';
import CustomImage from './CustomImage';
import { windowWidth } from '../Utillity/utils';
import TitleWithDescription from './TitleWithDescription';
import { useSelector } from 'react-redux';

const ProfileInfo = ({setIsVisible , barberDetails ,clientView }) => {
    const user = useSelector(state => state.commonReducer.userData);
   

    const [exactUser , setExactUser] = useState(clientView  == true ? barberDetails : user  )
   
    return (
        <View style={styles.container}>
            <View>
            
                <CustomImage
                  onPress={() => {
                    setIsVisible(true);
                  }}
                  style={[styles.imageContainer]}
                  source={
                    exactUser?.photo
                      ? { uri: `${exactUser?.photo}` }
                      : require('../Assets/Images/user.png')
                  }
                />
              

            
            </View>
            <View style={styles.infoBox}>
                <CustomText isBold style={styles.name}>
                    {`${exactUser?.first_name} ${exactUser?.last_name}` }
                </CustomText>
                <TitleWithDescription
                title='Specialty:'
                description={`${exactUser?.specialty}`}
                style={styles.infoContainer}
                titleStyle={styles.subText}
                descriptionStyle={styles.subText}
                />
                <TitleWithDescription
                title='Provider ID:'
                description={`${exactUser?.id}`}
                style={styles.infoContainer}
                titleStyle={styles.subText}
                descriptionStyle={styles.subText}
                />
                <TitleWithDescription
                title='Experience:'
                description={exactUser?.experience == 0 ? '-' :` ${exactUser?.experience} years`}
                style={styles.infoContainer}
                titleStyle={styles.subText}
                descriptionStyle={styles.subText}
                />
                <TitleWithDescription
                title='Status:'
                description={" ✔ Verified"}
                style={styles.infoContainer}
                titleStyle={styles.subText}
                descriptionStyle={styles.verified}
                />
            </View>
        </View>

    )
}

export default ProfileInfo

const styles = StyleSheet.create({
    container:{
        gap:scale(20),
        flexDirection:"row",
        paddingVertical:verticalScale(10),
    },
    imageContainer: {
        width: windowWidth * 0.25, height: windowWidth * 0.25,
        borderRadius: (windowWidth * 0.25) / 2,
        overflow: "hidden"
    },
    badge:{
        width:scale(20),
        height:scale(20),
        backgroundColor:Color.green,
        borderWidth:1,
        borderRadius:scale(10),
        alignItems:"center",
        justifyContent:"center",
        position:"absolute",
        zIndex:1,
        borderColor:Color.white,
        left:scale(70),
        bottom:scale(18)
      },
    infoBox: {
        gap:scale(2),
        // marginLeft: scale(12),
        width: windowWidth * 0.6
    },

    name: {
        fontSize: moderateScale(16),
        color: Color.white,
    },
infoContainer:{
    flexDirection:'row',
    paddingHorizontal:0,

},
    subText: {
        fontSize: moderateScale(12),
        color: Color.white,
        marginTop: verticalScale(2),
    },

    verified: {
        fontSize: moderateScale(14,0.2),
        color: Color.green,
    },

})