import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    restaurants: []
}

const restaurantSlice = createSlice({
    name:"restaurantSlice",
    initialState,
    reducers:{
        getRestaurants:(state, action)=> {
            state.restaurants = action.payload
        },
        delRestaurant:(state, action)=>{
            state.restaurants = state.restaurants.filter(
                (restaurant) => restaurant._id !== action.payload
              )
        },
        addRestaurant:(state, action)=>{
            state.restaurants.push(action.payload)
        },
    }
});

export const {getRestaurants, addRestaurant, delRestaurant} = restaurantSlice.actions;
export default restaurantSlice.reducer;