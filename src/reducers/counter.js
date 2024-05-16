import { createSlice } from '@reduxjs/toolkit'

const excelSlice = createSlice({
  name: 'counter',
  initialState: {
    excelData: [],
    extractedData:[],
    daysInMonth:[],
  },
  reducers: {
    getExcelData: (state,action) => {
      state.excelData =action.payload
    },
    getExtractedData: (state,action) => {
      state.extractedData =action.payload
    },
    getDaysInMonthData: (state,action) => {
      state.daysInMonth =action.payload
    }
  }
})

export const {getExcelData,getExtractedData,getDaysInMonthData } = excelSlice.actions

export default excelSlice;
