import {combineReducers} from 'redux';
import * as Reducer from '../reducer/reducer';

const appReducer = combineReducers({
  dailyWeatherList: Reducer.GetDailyWDReducer,
  currentWDList: Reducer.GetCurrentWDReducer,
});
const rootReducer = (state, action) => {
  if (action.type === 'IS_LOGOUT') {
    state = undefined;
  }
  return appReducer(state, action);
};
export default rootReducer;
