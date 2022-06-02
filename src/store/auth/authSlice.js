import { createSlice } from '@reduxjs/toolkit'
import { checkJWT, getJWT } from '../../../AsyncStorage/store.js'

const initialState = {
  loginStatus: false,
}

export const loginSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      setLoginStatus: (state, value) => {
        state.loginStatus = value.payload
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setLoginStatus } = loginSlice.actions
  
  export default loginSlice.reducer