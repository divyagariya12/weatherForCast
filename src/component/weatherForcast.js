/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Image, Text, FlatList, TouchableHighlight} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {bindActionCreators} from 'redux';
import LottieView from 'lottie-react-native';
import {getCurrentWDAction, getDailyWDAction} from '../actions/action';
import styles from '../style/styles';

navigator.geolocation = require('react-native-geolocation-service');

export default () => {
  const [state, setState] = useState({
    lat: 28.70406,
    long: 77.102493,
    location: '',
    isLoading: true,
    currentTemp: 0,
    currentIcon: '',
    currentDescription: '',
    dailyWeatherData: null,
    isError: false,
  });

  const action = bindActionCreators(
    {
      getCurrentWD: getCurrentWDAction,
      getDailyWD: getDailyWDAction,
    },
    useDispatch(),
  );

  const {dailyWeatherList, currentWDList} = useSelector(state => state);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      ({coords}) => {
        // let cords = {
        //   lat: coords.latitude,
        //   long: coords.longitude,
        // };
        // action.getCurrentWD(cords);
        // action.getDailyWD(cords);
        setState({
          ...state,
          lat: coords.latitude,
          long: coords.longitude,
        });
        getData();
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  const getData = () => {
    let cords = {
      lat: state.lat,
      long: state.long,
    };
    action.getCurrentWD(cords);
    action.getDailyWD(cords);
  };

  useEffect(() => {
    console.log('1', currentWDList);
    console.log('2', dailyWeatherList);
    if (currentWDList?.loading || dailyWeatherList.loading) {
      setState({
        ...state,
        isLoading: true,
      });
    }
    if (currentWDList?.isError || dailyWeatherList?.isError) {
      setState({
        ...state,
        isLoading: false,
        isError: true,
      });
    } else {
      setState({
        ...state,
        isLoading: false,
        isError: false,
        location: currentWDList?.data?.name,
        currentTemp: currentWDList?.data?.main?.temp,
        currentIcon: currentWDList?.data?.weather[0]?.icon,
        currentDescription: currentWDList?.data?.weather[0]?.description,
        dailyWeatherData: dailyWeatherList?.data?.daily,
      });
    }
  }, [dailyWeatherList, currentWDList]);

  const renderHeader = () => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.mainHeading}>{state.location}</Text>
        <Text>{state.currentTemp}</Text>
        <Image
          source={{
            uri: `http://openweathermap.org/img/w/${state.currentIcon}.png`,
          }}
          style={styles.weatherIcon}
          resizeMode="cover"
        />
        <Text>{state.currentDescription}</Text>
      </View>
    );
  };

  const renderItem = item => {
    let date = new Date(item.dt * 1000);
    let day = moment(date).format('dddd');
    return (
      <View style={styles.listContainer}>
        <Text>{day}</Text>
        <Text>{item?.humidity}</Text>
        <View style={styles.listIconContainer}>
          <Image
            source={{
              uri: `http://openweathermap.org/img/w/${item?.weather[0].icon}.png`,
            }}
            style={styles.weatherIcon}
            resizeMode="contain"
          />
          <Text>{item?.weather[0]?.main}</Text>
        </View>
      </View>
    );
  };

  return (
    <>
      {state.isLoading ? (
        <View style={styles.loaderContainer}>
          <LottieView source={require('../loader.json')} autoPlay />
          <Text style={styles.mainHeading}>Loading....</Text>
        </View>
      ) : state.isError ? (
        <View style={styles.loaderContainer}>
          <Text style={styles.mainHeading}>Something went wrong</Text>
          <TouchableHighlight
            underlayColor={'rgba(0,0,0,0.2)'}
            style={styles.btn}
            onPress={() => getData()}>
            <Text>Retry</Text>
          </TouchableHighlight>
        </View>
      ) : (
        <FlatList
          data={state.dailyWeatherData}
          keyExtractor={(i, index) => index.toString()}
          ListHeaderComponent={() => renderHeader()}
          renderItem={({item}) => renderItem(item)}
          ItemSeparatorComponent={() => <View style={styles.ItemSeparator} />}
          ListFooterComponent={() => {
            return <View style={styles.listFooter} />;
          }}
        />
      )}
    </>
  );
};
