import { View } from "react-native";
import CustomText from "./CustomText";
import { Divider } from "native-base";
import Color from "../Assets/Utilities/Color";
import { moderateScale } from "react-native-size-matters";
import CustomButton from "./CustomButton";
import { windowHeight, windowWidth } from "../Utillity/utils";
import { StyleSheet } from "react-native";

export const Card = ({item, onPress}) => {
    return (
      <View style={styles2.container}>
        <CustomText style={styles2.name}>{item?.code}</CustomText>
        <Divider
          color={Color.veryLightGray}
          style={{marginVertical: moderateScale(8, 0.3)}}
        />
        <View style={styles2.row}>
          <CustomText style={styles2.text}>minimum order</CustomText>
          <CustomText style={styles2.text}>{item?.min_price}</CustomText>
        </View>
        <View style={styles2.row}>
          <CustomText style={styles2.text}>maximum Discount</CustomText>
          <CustomText style={styles2.text}>{item?.value}{item?.type=='fixed'?'$ OFF':'% OFF' }</CustomText>
        </View>
        <CustomButton
          textColor={Color.black}
          width={windowWidth * 0.8}
          height={windowHeight * 0.04}
          text={'Use'}
          fontSize={moderateScale(11, 0.3)}
           onPress={onPress}
          isGradient={true}
          borderRadius={moderateScale(30, 0.4)}
          isBold
          marginTop={moderateScale(5, 0.3)}
        />
      </View>
    );
  };
  
  const styles2 = StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: moderateScale(4, 0.3),
    },
    text: {
      fontSize: moderateScale(12, 0.6),
      color: Color.veryLightGray,
    },
    container: {
      width: windowWidth * 0.95,
      borderColor: Color.themeColor,
      borderWidth: moderateScale(2, 0.6),
      backgroundColor: 'white',
      borderRadius: moderateScale(10, 0.6),
      paddingVertical: moderateScale(10, 0.6),
      paddingHorizontal: moderateScale(10, 0.6),
      marginVertical: moderateScale(10, 0.3),
    },
    name: {
      fontSize: moderateScale(17, 0.6),
      color: 'black',
    },
  });
  