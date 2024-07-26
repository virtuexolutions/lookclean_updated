import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userData: {},
  services: [],
  cartData: [],
  selectedVoucher :{},
  financeBreakDown: [],
  notification : false,
  userWallet : {}
  // barberServices:[]
};

const CommonSlice = createSlice({
  name: 'commonReducer',
  initialState: initialState,
  reducers: {
    setCartData(state, action) {
      state.cartData.push(action.payload)

    },
    setRemoveCardData(state, action) {
      let data = [...state.cartData];
      data.splice(action.payload , 1);
      state.cartData = data ;
    },
    setWholeCart(state , action){
      state.cartData = action.payload;
    },
    setUserWallet(state , action){
      state.userWallet = action.payload
    },
    setUserData(state, action) {
      state.userData = action?.payload;

    },
    setUserLogOut(state, action) {
      state.userData = {};
    },
    setServices(state, action) {
      state.services = action?.payload;
    },
   
    setNotification(state,action){
      state.notification = action.payload
    },
    setVoucherData(state,action){
      state.selectedVoucher = action.payload

    },
 
}
});

export const {
  setUserData,
  setUserLogOut,
  setCartData,
  setNotification,
  setServices,
  setRemoveCardData,
  setWholeCart,
  setVoucherData,
  setUserWallet
} = CommonSlice.actions;

export default CommonSlice.reducer;
