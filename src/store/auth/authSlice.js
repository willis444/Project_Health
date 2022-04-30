import { createSlice } from '@reduxjs/toolkit'
import { getJWT } from '../../../AsyncStorage/store.js'

const initialState = {
  loginStatus: getJWT() ? true: false,
}

export const loginSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
      setLoginSession: (state) => {
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the Immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        state.loginStatus = true
      },
      destroyLoginSession: (state) => {
        state.loginStatus = false
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setLoginSession, destroyLoginSession } = loginSlice.actions
  
  export default loginSlice.reducer