import React from 'react';
import {SafeAreaView} from 'react-native';
import {Provider, useDispatch} from 'react-redux';
import {createStore, applyMiddleware, bindActionCreators} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './src/store/reducers';
import WeatherApp from './src/component/weatherForcast';

export default () => {
  let store = createStore(rootReducer, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <SafeAreaView>
        <WeatherApp />
      </SafeAreaView>
    </Provider>
  );
};
