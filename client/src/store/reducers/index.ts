import {combineReducers} from '@reduxjs/toolkit';
// Reducer Imports
// import authReducer from 'src/store/slices/auth-slice';
import basketReducer from 'src/store/slices/basket-slice';
import restaurantReducer from 'src/store/slices/restaurant-slice';

const rootReducer = combineReducers({
  // Reducers
  //   auth: authReducer,
  basket: basketReducer,
  restaurant: restaurantReducer,
});

export type RootReducerType = ReturnType<typeof rootReducer>;

export default rootReducer;
