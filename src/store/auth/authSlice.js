import { createSlice } from '@reduxjs/toolkit'
import { checkJWT, getJWT } from '../../../AsyncStorage/store.js'

const initialState = {
  loginStatus: checkJWT(),
  jwtToken: getJWT(),
}

export const loginSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
      setLoginSession: (state, token) => {
        state.loginStatus = true,
        state.jwtToken = token
      },
      destroyLoginSession: (state) => {
        state.loginStatus = false,
        state.jwtToken = null
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setLoginSession, destroyLoginSession } = loginSlice.actions
  
  export default loginSlice.reducer