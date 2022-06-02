import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getProfile, updateProfile } from '../../../axios/user'

const initialState = {
  isLoading: false,
  user_id: null,
  user_role: null,
  user_gender: null,
  user_language: null,
  isPork: null,
  isBeef: null,
  isVegetarian: null,
  isSeafood: null,
}

export const retrieveUserProfile = createAsyncThunk(
  'retrieveUserProfile',
  async (_, {rejectWithValue}) => {
    try {
      const data = await getProfile();
      return {
        data,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
      setisLoading: (state, status) => {
        state.isLoading = status;
      },
      setUserGender: (state, value) => {
        state.user_gender = value.payload;
      },
      setUserLanguage: (state, value) => {
        state.user_language = value.payload;
      },
      setIsPork: (state, value) => {
        state.isPork = value.payload;
      },
      setIsBeef: (state, value) => {
        state.isBeef = value.payload;
      },
      setIsVegetarian: (state, value) => {
        state.isVegetarian = value.payload;
      },
      setIsSeafood: (state, value) => {
        state.isSeafood = value.payload;
      },
    },
    extraReducers: builder => { 
      builder.addCase(retrieveUserProfile.fulfilled, (state, {payload}) => {
        state.user_id = payload.data._id;
        state.user_role = payload.data.user_role;
        state.user_gender = payload.data.user_gender;
        state.user_language = payload.data.user_language;
        state.isPork = payload.data.user_eating_habits.isPork;
        state.isBeef = payload.data.user_eating_habits.isBeef;
        state.isVegetarian = payload.data.user_eating_habits.isVegetarian;
        state.isSeafood = payload.data.user_eating_habits.isSeafood;
        state.isLoading = false;
      })
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { setisLoading, setUserGender ,setIsPork, setIsBeef, setIsVegetarian, setIsSeafood, setUserLanguage } = appSlice.actions
  
  export default appSlice.reducer