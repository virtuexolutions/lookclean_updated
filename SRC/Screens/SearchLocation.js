import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import Color from '../Assets/Utilities/Color';
import {windowHeight, windowWidth} from '../Utillity/utils';
import {moderateScale, ScaledSheet} from 'react-native-size-matters';
import ScreenBoiler from '../Components/ScreenBoiler';
import LinearGradient from 'react-native-linear-gradient';
import CustomButton from '../Components/CustomButton';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import navigationService from '../navigationService';

const SearchLocation = props => {
  const data = props?.route?.params?.finalData;

  const [searchData, setSearchData] = useState('');

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
        {/* <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: windowHeight * 0.15,
            // paddingTop : moderateScale(20,0.3),
            alignItems: 'center',
          }}
          style={{
            width: windowWidth,
          }}> */}
        <GooglePlacesAutocomplete
          placeholder="Search"
          textInputProps={{
            placeholderTextColor: '#5d5d5d',
          }}
          onPress={(data, details = null) => {
           
            setSearchData({
              name: data?.description,
              location: details?.geometry?.location,
            });
          }}
          query={{
            key: 'AIzaSyAqNK7IfM16zi79N0u7qX4Ncm5QgGvBqmg',
            // key: 'AIzaSyCHuiMaFjSnFTQfRmAfTp9nZ9VpTICgNrc',

            language: 'en',
          }}
          isRowScrollable={true}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              width: windowWidth * 0.8,
              marginLeft: moderateScale(5, 0.6),
            },
            textInput: {
              height: windowHeight * 0.06,
              color: '#5d5d5d',
              fontSize: 16,
              borderWidth: 2,
              borderColor: Color.lightGrey,
              borderRadius: moderateScale(20, 0.6),
            },
            listView: {
              width: windowWidth * 0.8,
              marginLeft: moderateScale(5, 0.6),
              borderColor: Color.veryLightGray,
            },

            description: {
              color: '#5d5d5d',
            },
          }}
        />

        {Object.keys(searchData).length > 0 && (
          <View
            style={{
              alignSelf: 'center',
              position: 'absolute',
              bottom: 50,
            }}>
            <CustomButton
              bgColor={Color.themePink}
              borderWidth={1}
              textColor={Color.black}
              onPress={() => {
                navigationService.navigate('CheckoutScreen', {
                  finalData: {...data, location: searchData},
                });
              }}
              width={windowWidth * 0.75}
              height={windowHeight * 0.06}
              text={'Proceed'}
              fontSize={moderateScale(14, 0.3)}
              textTransform={'uppercase'}
              borderRadius={moderateScale(30, 0.4)}
              isGradient={true}
              isBold
              marginTop={moderateScale(30, 0.3)}
            />
          </View>
        )}
        {/* </ScrollView> */}
      </LinearGradient>
    </ScreenBoiler>
  );
};

export default SearchLocation;

const styles = ScaledSheet.create({
  container: {
    paddingTop: windowHeight * 0.06,
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
  circle: {
    height: moderateScale(13, 0.3),
    width: moderateScale(13, 0.3),
    borderRadius: moderateScale(6.5, 0.3),
    borderWidth: 1,
    backgroundColor: Color.white,
    borderColor: Color.themeColor,
    marginRight: moderateScale(5, 0.3),
  },
  timingView: {
    width: windowWidth * 0.8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10, 0.3),
  },
  userTypeContainer: {
    width: windowWidth * 0.7,
    padding: moderateScale(10, 0.3),
    marginTop: moderateScale(10, 0.3),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt2: {
    fontSize: moderateScale(12, 0.3),
    color: Color.themeColor,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txt4: {
    color: Color.white,
    fontSize: moderateScale(14, 0.6),
    borderBottomWidth: 1,
    borderColor: Color.themeColor,
    marginBottom: moderateScale(5, 0.3),
  },
});
