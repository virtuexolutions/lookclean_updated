import { moderateScale, ScaledSheet } from "react-native-size-matters";
import Color from "./Color";

const Constants = ScaledSheet.create({
  h1: {
    fontSize: moderateScale(40, 0.3),
    fontWeight: "bold",
    color: Color.lightGrey,
  },
  h2: {
    fontSize: moderateScale(30, 0.6),
    color: Color.lightGrey,
    fontWeight: "600",
  },
  h3: {
    fontSize: moderateScale(18, 0.6),
    color: Color.lightGrey,
    fontWeight: "bold",
  },
  h4: {
    fontSize: moderateScale(15, 0.6),
    color: Color.veryLightGray,
  },
  h5: {
    fontSize: moderateScale(10, 0.6),
    color: Color.veryLightGray,
  },
  h6: {
    fontSize: moderateScale(9, 0.6),
    color: Color.veryLightGray,
  },
});
export default Constants;
