import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  foodName: [
      {title: "apa lancau"},
      {title: "ababababababa"}
  ],
}

export const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
      clearFoodCache: (state) => {
        state.foodName = null;
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { clearFoodCache } = foodSlice.actions
  
  export default foodSlice.reducer