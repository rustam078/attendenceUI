import { configureStore } from "@reduxjs/toolkit"
import excelSlice from "./counter";

const store = configureStore({
    reducer: excelSlice.reducer
  })
  
  export default store;