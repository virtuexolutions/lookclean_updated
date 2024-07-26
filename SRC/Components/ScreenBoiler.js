import React from 'react';
import {Platform, View, ViewBase} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import {windowHeight} from '../Utillity/utils';
import CustomStatusBar from './CustomStatusBar';
import Header from './Header';

const ScreenBoiler = props => {
  const {
    navigation,
    showHeader,
    statusBarBackgroundColor,
    statusBarContentStyle,
    onPressSearch,
    onPressSearchInput,
    title,
    titleColor,
    showBack,
    showDrawer,
    useDebounce,
    headerIconStyle,
    children,
    headerColor,
    headerHeight,
    close,
    navigateTO,
    headerType,
    showList,
    Notify,
    showUser,
    showUndo,
    onUndoPress
  } = props;

  return (
    <View style={{
    }}>
      <CustomStatusBar
        backgroundColor={statusBarBackgroundColor}
        barStyle={statusBarContentStyle}
      />
      {showHeader && (
        <Header
          // navigation={navigation}
          title={title}
          showBack={showBack}
          useDebounce={useDebounce}
          iconStyle={headerIconStyle}
          showDrawer={showDrawer}
          headerColor={headerColor}
          headerHeight={headerHeight}
          close={close}
          titleColor={titleColor}
          navigateTO={navigateTO}
          headerType={headerType}
          showList={showList}
          Notify={Notify}
          showUser={showUser}
          showUndo={showUndo}
          onUndoPress={onUndoPress}
        />
      )}
      {children}
    </View>
  );
};

export default ScreenBoiler;
