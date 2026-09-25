import { combineReducers, configureStore } from '@reduxjs/toolkit'
import UserReducer from './user/userSlice'
import { persistReducer, persistStore } from 'redux-persist'

const storage = {
  getItem: (key) => Promise.resolve(window.localStorage.getItem(key)),
  setItem: (key, value) => Promise.resolve(window.localStorage.setItem(key, value)),
  removeItem: (key) => Promise.resolve(window.localStorage.removeItem(key)),
}

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['currentUser'],
}

const persistedUserReducer = persistReducer(
  userPersistConfig,
  UserReducer
)

const rootReducer = combineReducers({
  user: persistedUserReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export const persistor = persistStore(store)