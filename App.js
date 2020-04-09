import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {GetStoreData} from './utils/asyncStorage';
import {Provider} from 'react-redux';
import Nav from './Nav/Nav';
import OnBoardingNav from './Nav/OnBoardingNav';
import SplashScreen from 'react-native-splash-screen';
import colors from './assets/colors.js';
import configureStore from './store/configureStore';
// import FTUE from './FTUE/FTUE';

const store = configureStore();

function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      {statusFetched
        ? enableFTUE === 'true'
          ? <OnBoardingNav handleOnDone={handleCompleteFTUE}/>
          : <Nav />
        : <View style={styles.loading_spinner}>
            <ActivityIndicator size={'large'} color={colors.primary_theme} />
          </View>
      }
    </Provider>
  );
}

const styles = StyleSheet.create({
  loading_spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default App;
