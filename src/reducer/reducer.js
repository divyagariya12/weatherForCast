import * as types from '../constants';

const initialState = {
  loading: false,
  data: null,
  isError: false,
  error: null,
};

const initialCurrentWDState = {
  loading: false,
  data: null,
  isError: false,
  error: null,
};

export const GetDailyWDReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING_DAILY_WEATHER_DATA:
      return Object.assign({}, state, {loading: true, isError: false});
    case types.GET_DAILY_WEATHER_DATA:
      return Object.assign({}, state, {
        loading: false,
        data: action.payload,
        isError: false,
      });
    case types.ERROR_DAILY_WEATHER_DATA:
      return Object.assign({}, state, {
        loading: false,
        isError: true,
        error: action?.payload,
      });
  }
  return state;
};

export const GetCurrentWDReducer = (state = initialCurrentWDState, action) => {
  switch (action.type) {
    case types.LOADING_CURRENT_WEATHER_DATA:
      return Object.assign({}, state, {loading: true, isError: false});
    case types.GET_CURRENT_WEATHER_DATA:
      return Object.assign({}, state, {
        loading: false,
        data: action.payload,
        isError: false,
      });
    case types.ERROR_CURRENT_WEATHER_DATA:
      return Object.assign({}, state, {
        loading: false,
        isError: true,
        error: action?.payload,
      });
  }
  return state;
};
