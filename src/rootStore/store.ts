/* eslint-disable import/no-extraneous-dependencies */
import alertReducer from '@core/store/alertReducer';
import loadingReducer from '@core/store/loadingReducer';
import authReducer from '@pages/auth/store/reducer';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const rootReducer = combineReducers({
  auth: authReducer,
  loader: loadingReducer,
  alert: alertReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['loader', 'alert'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const {dispatch} = store;

export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);

export default store;
