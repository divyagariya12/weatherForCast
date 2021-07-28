/* eslint-disable no-unused-vars */
import {auth} from '../axois';
import * as types from '../constants';
import {pass, say} from '../axois/action';

export const getCurrentWDAction = props => async dispatch => {
  dispatch(say(types.LOADING_CURRENT_WEATHER_DATA));
  await auth
    .get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${props.lat}&lon=${props.long}&units=metric&appid=aa2e6dec90a2a06507400ecaa5e24d1c`,
    )
    .then(res => {
      // console.log('response', res);
      dispatch(pass(types.GET_CURRENT_WEATHER_DATA, res?.data));
    })
    .catch(err => dispatch(pass(types.ERROR_CURRENT_WEATHER_DATA, err)));
};

export const getDailyWDAction = props => async dispatch => {
  dispatch(say(types.LOADING_DAILY_WEATHER_DATA));
  await auth
    .get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${props.lat}&lon=${props.long}&exclude=hourly,minutely,alerts&units=metric&appid=aa2e6dec90a2a06507400ecaa5e24d1c`,
    )
    .then(res => {
      // console.log('response222', res);
      dispatch(pass(types.GET_DAILY_WEATHER_DATA, res?.data));
    })
    .catch(err => dispatch(pass(types.ERROR_DAILY_WEATHER_DATA, err)));
};
