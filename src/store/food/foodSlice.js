import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  foodName: [],
}

export const foodSlice = createSlice({
    name: 'food',
    initialState,
    reducers: {
      addFoodToArray: (state, foodName) => {
        state.foodName = foodName.payload; // add the object into the array
      },
      clearFoodCache: (state) => { // function to clear the food redux state
        state.foodName = [];
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { clearFoodCache, addFoodToArray} = foodSlice.actions
  
  export default foodSlice.reducer