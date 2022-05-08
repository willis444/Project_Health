import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      setisLoading: (state, status) => {
        state.isLoading = status;
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setisLoading } = appSlice.actions
  
  export default appSlice.reducer