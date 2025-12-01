import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Color from '../Assets/Utilities/Color';
import MultiSelect from 'react-native-multiple-select';
import { moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const CustomDropDownMultiSelect = ({
  newArray = [],
  selectedItems = [],
  setSelectedItems,
}) => {
  const reduxTextObject = useSelector(state => state.langViewReducer?.data);

  return (
    <View style={styles.container}>
      <MultiSelect
        items={newArray}
        uniqueKey="id"
        displayKey="name"

        selectedItems={selectedItems}
        onSelectedItemsChange={setSelectedItems}

        selectText={reduxTextObject?.Pick_Items || "Select"}
        searchInputPlaceholderText={`${reduxTextObject?.Search_Items || "Search"}...`}
        hideDropdown
        submitButtonText={reduxTextObject?.Done || "Done"}
        submitButtonColor={Color.themePurpleLevel4}

        hideTags={true}
        fixedHeight={true}

        styleDropdownMenuSubsection={styles.dropdownSection}
        styleDropdownMenu={styles.dropdownMenu}
        styleMainWrapper={styles.mainWrapper}
        styleInputGroup={styles.inputGroup}

        styleItemsContainer={styles.itemsContainer}
        styleRowList={styles.rowList}

        styleTextDropdown={styles.dropdownText}
        styleTextDropdownSelected={styles.dropdownText}

        selectedItemIconColor={Color.themePurpleLevel3}
        selectedItemTextColor={Color.themePurpleLevel3}

        searchInputStyle={styles.searchInput}
        fontFamily="Inter-Medium"
      />
    </View>
  );
};

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    marginTop: height * 0.01,
  },

  mainWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: Color.lightGrey,
    width: width * 0.92,
    height: height * 0.055,
    justifyContent: 'center',
    backgroundColor: Color.white,
    alignSelf: 'center',
    marginTop: moderateScale(12, 0.6)
  },

  dropdownSection: {
    paddingHorizontal: 10,
    backgroundColor: Color.white,
    borderRadius: 10,
    height: height * 0.065,
    alignItems: 'center',
  },

  dropdownMenu: {
    borderRadius: 10,
  },

  inputGroup: {
    height: height * 0.065,
    borderWidth: 0,
    justifyContent: 'center',
  },

  dropdownText: {
    fontSize: 16,
    color: Color.gray,
    fontFamily: 'Inter-Medium',
    paddingLeft: 10,
  },

  itemsContainer: {
    backgroundColor: Color.white,
    borderColor: Color.lightGrey,
    borderWidth: 1,
    maxHeight: height * 0.25,
    width: width * 0.9,
    borderRadius: 10,
  },

  rowList: {
    height: moderateScale(40),
    justifyContent: 'center',
    paddingLeft: 10,
    borderBottomWidth: 0.7,
    borderColor: Color.lightGrey,
  },

  searchInput: {
    fontFamily: 'Inter-Medium',
    color: Color.black,
  },
});

export default CustomDropDownMultiSelect;
