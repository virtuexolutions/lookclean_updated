import React from "react";
import { View, StatusBar, SafeAreaView, Platform } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { moderateScale } from "react-native-size-matters";
import Color from "../Assets/Utilities/Color";
import { windowWidth } from "../Utillity/utils";

export default function CustomStatusBar(props) {
  const { backgroundColor, barStyle } = props;

  const isGradient = Array.isArray(backgroundColor);
  const StatusBarHeight = StatusBar.currentHeight;
  return (
    <>
      {isGradient ? (
        <LinearGradient
          // start={{ x: 0, y: 0 }}
          // end={{ x: 1, y: 0 }}
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          colors={backgroundColor ? backgroundColor : [Color.statusBarColor]}
          style={[
            {
              height: StatusBarHeight,
              width: windowWidth,
            },
          ]}
        >
          <StatusBar
            translucent={true}
            backgroundColor={"transparent"}
            barStyle={barStyle ? barStyle : "light-content"}
          />
          <SafeAreaView style={{ flex: 0 }} />
        </LinearGradient>
      ) : (
        <View
          style={[
            {
              height: Platform.OS == "android" ? 0 : StatusBarHeight,
              width: windowWidth,
              backgroundColor: backgroundColor
                ? backgroundColor
                : Color.themePurpleLevel4,
            },
          ]}
        >
          <StatusBar
            translucent={Platform.OS == "android" ? false : true}
            backgroundColor={
              Platform.OS == "android"
                ? backgroundColor
                  ? backgroundColor
                  : Color.gray
                : "transparent"
            }
            barStyle={barStyle ? barStyle : "light-content"}
          />
          <SafeAreaView style={{ flex: 0 }} />
        </View>
      )}
    </>
  );
}
