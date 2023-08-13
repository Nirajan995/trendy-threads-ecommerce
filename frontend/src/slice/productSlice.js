import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
   name: 'Cart',
   initialState: {
      cartItems: [],
      shippingAddress: {},
      paymentMethod: ''
   },
   reducers: {
      addToCart: (state, data) => {
         const item = data.payload;
         const existItem = state.cartItems.find((x) => x.productId === item.productId);

         if (existItem) {
            state.cartItems = state.cartItems.map((x) => x.productId === item.productId ? item : x)
         } else {
            state.cartItems = [...state.cartItems, item]
         }

      },
      removeFromCart: (state, data) => {
         state.cartItems = state.cartItems.filter((cartItem) => {
            return cartItem.productId !== data.payload;
         })
      },
      resetCart: (state,) => {
         state.cartItems = [],
            state.shippingAddress = {},
            state.paymentMethod = ''
      },
      addShippingAddress: (state, data) => {
         state.shippingAddress = data.payload;
      },
      addPaymentMethod: (state, data) => {
         state.paymentMethod = data.payload;
      }
   }
})

export default cartSlice.reducer;
export const { addToCart, removeFromCart, resetCart, addShippingAddress, addPaymentMethod } = cartSlice.actions;