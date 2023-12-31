import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loginReducer from '../slice/loginSlice';
import cartReducer from '../slice/productSlice';
import orderReducer from '../slice/orderSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
   key: 'root',
   storage,
}

const rootReducer = combineReducers({
   auth: loginReducer,
   cart: cartReducer,
   order: orderReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: false,
      }),
})

let persistor = persistStore(store);

export default persistor;
