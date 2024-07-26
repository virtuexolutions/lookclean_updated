import React, {useState} from 'react';
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  Alert,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import {ScaledSheet, moderateScale} from 'react-native-size-matters';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import TextInputWithTitle from '../Components/TextInputWithTitle';
import Color from '../Assets/Utilities/Color';
import {apiHeader, windowHeight, windowWidth} from '../Utillity/utils';
import ImageView from "react-native-image-viewing";
import ScreenBoiler from '../Components/ScreenBoiler';
import {Icon} from 'native-base';
import CustomImage from '../Components/CustomImage';
import {setUserData} from '../Store/slices/common';
import {Patch, Post} from '../Axios/AxiosInterceptorFunction';
import ImagePickerModal from '../Components/ImagePickerModal';
import {formRegEx, formRegExReplacer, imageUrl} from '../Config';
import CustomButton from '../Components/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import CustomText from '../Components/CustomText';

const TermsAndConditions = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [termsData, setTermsData] = useState('');

  // const parser = new DOMParser.DOMParser();

  // const GetSupportData = async () => {
  //   const url = 'term/conditions';
  //   setIsLoading(true);
  //   const response = await Get(url);
  //   setIsLoading(false);
  //   if (response != undefined) {

  //     setTermsData(response?.data?.data);
  //   }
  // };

  // useEffect(() => {
  //   GetSupportData();
  // }, []);

  // useEffect(() => {

    
  //   const parsed = parser.parseFromString(termsData?.description, 'text/html');
  
  // }, [termsData]);

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
    
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: windowHeight * 0.15,
            // paddingTop : moderateScale(20,0.3),
            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
          }}>
              <CustomText isBold style={styles.text1}>
         Terms And Conditions
        </CustomText>
          
            <CustomText
              style={[styles.text2 ,{
                paddingTop :moderateScale(15,.6)
              }]}>By using this application, you understand and agree with the accompanying terms and conditions. If you do not agree to these terms and conditions described on this page, please do not use Look Clean.
            </CustomText>
            <CustomText isBold style={styles.heading}>
            Definitions :
        </CustomText>
        <CustomText style={styles.text2}>
        The words "Client," "You," and "Your" refer to the individual who accesses this application. The person agrees to the Company's terms and conditions. "The Company," "Ourselves," "We," "Our," and "Us" refer to the company that created this application. "Party," "Parties," and "Us" refer to both the customer and the company. 
        </CustomText>
        <CustomText isBold style={styles.heading}>
        License :
        </CustomText>
        <CustomText style={styles.text2}>
        Look Clean and its agents reserve all intellectual property rights for its items.  Access to Look Clean is for personal use only subject to the terms and conditions set out below.
</CustomText>
        <CustomText isBold style={styles.heading}>       
        User Accounts :
        </CustomText>
        <CustomText style={styles.text2}>
        You are responsible for maintaining the secrecy of your password and account, as well as any activity carried out using your account. Look Clean is not responsible for any loss or harm by your failure to safeguard your password or account.
        </CustomText>
        <CustomText isBold style={styles.heading}>
        User Generated Content :
        </CustomText>
        <CustomText style={styles.text2}>
        Certain portions of this application allow users to submit their thoughts and information. Before the publish, we do not review, edit, publish, or explain user-generated content. Such content does not reflect the views of Look Clean, or its associates. But rather those of the individuals who post it.
          </CustomText>
        <CustomText isBold style={styles.heading}>
        Linking to our content:
        </CustomText>
        <CustomText style={styles.text2}>
        {
            'The following entities may link to our application without previous written consent: \n\u29BF  Government agencies \n\u29BF  Search engines .\n\u29BF  News organizations \n\u29BF  Online directory distributors can connect to our application as they do to the websites of other listed businesses. .'
          }
       
        </CustomText>
        <CustomText isBold style={styles.heading}>
          iFrames :
        </CustomText>
        <CustomText style={styles.text2}>
        Frames that alter the visual presentation or appearance of our application in any way are not authorized without pre-written approval.
         </CustomText>
        <CustomText isBold style={styles.heading}>
        Content Liability :
        </CustomText>
        <CustomText style={styles.text2}>
        We are not responsible for the material shown on your application. By using our application, you agree to cover and defend us against any claims based on its content. Links on the application must not be interpreted as offensive, vulgar, or illegal, nor may they violate third-party rights.
          </CustomText>
        <CustomText isBold style={styles.heading}>
        Your Privacy :
        </CustomText>
        <CustomText style={styles.text2}>
        Please go through our Privacy Policy for details on how we manage your data. </CustomText>
        <CustomText isBold style={styles.heading}>
        Reservation of Rights :
        </CustomText>
        <CustomText style={styles.text2}>
        We retain the right to seek the removal of any connections to our application. You agree to swiftly delete any connections to our application upon our request.
         </CustomText>
        <CustomText isBold style={styles.heading}>
        Link removal from our application :
        </CustomText>
        <CustomText style={styles.text2}>
        If you see any objectionable links on our application, please notify us at any time. We will examine 
          </CustomText>
        <CustomText isBold style={styles.heading}>
        Disclaimer :
        </CustomText>
        <CustomText style={styles.text2}>
        To the maximum extent permissible by applicable law, we make no representations, warranties, or conditions about our application or its usage.  </CustomText>
        
    </ScrollView></LinearGradient></ScreenBoiler>
  );
};

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.03,
    // justifyContent: "center",
    height: windowHeight * 0.9,
    width: windowWidth,
    alignItems: 'center',
    // backgroundColor : Color.themeColor
  },
  text1: {
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'center',
    fontSize: moderateScale(20, 0.3),
    // marginTop : moderateScale(10,0.3),
    // lineHeight: moderateScale(32, 0.3),
  },
  heading:{
    textTransform: 'uppercase',
    color: Color.white,
    textAlign: 'left',
    // backgroundColor :'red',
    width :windowWidth,
    paddingVertical :moderateScale(10,.6),
    fontSize: moderateScale(15, 0.3),
    paddingHorizontal :moderateScale(5,.6)
  },
  text2:{
    // backgroundColor: 'red',
    color: 'white',
    textAlign: 'left',
    width:windowWidth*0.98,
    // marginTop: moderateScale(10, 0.3),
    lineHeight: moderateScale(20, 0.3),
    fontSize: moderateScale(13, 0.3),
  }
});

export default TermsAndConditions;
