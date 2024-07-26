import React, {useRef, useState} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Color from '../Assets/Utilities/Color';
import MultiSelect from 'react-native-multiple-select';
import {moderateScale} from 'react-native-size-matters';
import {useSelector} from 'react-redux';

const CustomDropDownMultiSelect = props => {
  const {min, max, item, setItem, array, title} = props;
  const reduxTextObject = useSelector(state => state.langViewReducer.data);
  return (
    <View style={[styles.container]}>
      <MultiSelect
        items={props.newArray}
        onSelectedItemsChange={selectedItems => {
          setItem(selectedItems);
        }}
        selectedItems={props.selectedItems}
        selectText={reduxTextObject?.Pick_Items}
        searchInputPlaceholderText={`${reduxTextObject?.Search_Items}...`}
        textInputProps={{autoFocus: false}}
        hideDropdown
        tagRemoveIconColor={Color.themePurpleLevel4}
        tagBorderColor={Color.themePurpleLevel4}
        tagTextColor={Color.themePurpleLevel4}
        displayKey="name"
        uniqueKey="id"
        // hideSubmitButton
        submitButtonColor={Color.themePurpleLevel4}
        submitButtonText={reduxTextObject?.Done}
        styleMainWrapper={{
          width: Dimensions.get('window').width * 0.9,
          flexWrap: 'wrap',
          flexDirection: 'row',
          borderRadius: 10,
        }}
        styleInputGroup={{
          borderColor: Color.lightGrey,
          borderTopWidth: 1,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          paddingRight: 10,
          borderTopEndRadius: 10,
          borderTopStartRadius: 10,
          height: moderateScale(50, 0.3),
          fontSize: moderateScale(20, 0.3),
        }}
        selectedItemIconColor={Color.themePurpleLevel3}
        selectedItemTextColor={Color.themePurpleLevel3}
        styleDropdownMenu={{
          width: Dimensions.get('window').width * 0.9,
          paddingHorizontal: 10,
          borderColor: Color.lightGrey,
          borderWidth: 1,
          height: Dimensions.get('window').height * 0.065,
          borderRadius: 10,
        }}
        styleItemsContainer={{
          backgroundColor: Color.white,
          width: Dimensions.get('window').width * 0.9,
          borderColor: Color.lightGrey,
          borderWidth: 1,
          maxHeight: Dimensions.get('window').height * 0.2,
        }}
        styleTextDropdownSelected={{
          fontSize: 16,
          color: Color.gray,
          fontFamily: 'Inter-Medium',
        }}
        styleTextDropdown={{
          fontSize: 16,
          color: Color.gray,
          paddingLeft: Dimensions.get('window').width * 0.0325,
          fontFamily: 'Inter-Medium',
        }}
        styleRowList={{
          height: moderateScale(40, 0.3),
          fontSize: moderateScale(20, 0.3),
          justifyContent: 'center',
          borderBottomColor: Color.themePurpleLevel1,
          borderBottomWidth: 1,
          fontFamily: 'Inter-Medium',
        }}
        searchInputStyle={{
          fontFamily: 'Inter-Medium',
          color: Color.black,
        }}
        selectedItemFontFamily="Inter-Medium"
        fontFamily="Inter-Medium"
        itemFontFamily="Inter-Medium"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Dimensions.get('window').height * 0.01,
    // backgroundColor: 'red',
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
    // position: 'absolute',
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: Color.black,
    marginBottom: Dimensions.get('window').height * 0.01,
    textTransform: 'capitalize',
  },

  dropDownBtn: {
    width: Dimensions.get('window').width * 0.9,
    backgroundColor: Color.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Color.lightGrey,
    height: Dimensions.get('window').height * 0.08,
    // backgroundColor: 'red',
  },
  dropDownBtnText: {
    width: Dimensions.get('window').width * 0.9,
    fontSize: 16,
    color: Color.gray,
    textAlign: 'center',
    // fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  dropDownRow: {
    backgroundColor: Color.white,
  },
  dropDownRowText: {
    width: Dimensions.get('window').width * 0.9,
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default CustomDropDownMultiSelect;
