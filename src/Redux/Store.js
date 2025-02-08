// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./Features/CartSlice";

// const store = configureStore({
//   reducer: {
//     cart: cartReducer,
//   },
// });

// export default store;


import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Local storage
import cartReducer from "./Features/CartSlice";

// ✅ Persist Configuration (Only "cart" slice will be stored)
const persistConfig = {
  key: "cart",
  storage,
};

// ✅ Apply Persist to "cartReducer" Only
const persistedCartReducer = persistReducer(persistConfig, cartReducer);

// ✅ Create Store
const store = configureStore({
  reducer: {
    cart: persistedCartReducer, // ✅ Persisting only "cart"
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// ✅ Create Persistor
export const persistor = persistStore(store);

export default store;
