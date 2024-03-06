import { configureStore } from '@reduxjs/toolkit';
// import counterReducer from '../features/counter/counterSlice';
// import loginSlice from '../features/login/loginSlice';
// import prodSlice from '../features/products/productsSlicer';
// import adminSlice from '../features/admin/adminSlice';
// import cartReducer from '../features/cart/cartSlicer';

export const store = configureStore({
  reducer: {
    // login: loginSlice,
    // products: prodSlice,
    // admin: adminSlice,
    // cart: cartReducer,
  },
});
