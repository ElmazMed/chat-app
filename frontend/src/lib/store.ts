import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/lib/slices/authSlice";
import chatReducer from "@/lib/slices/chatSlice";
export const makeStore = () => {
  return configureStore({
    reducer: { auth: authReducer, chat: chatReducer },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
