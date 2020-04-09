import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FTUE from '../FTUE/FTUE';
import Preferences from '../Preferences/Preferences';
import colors from '../assets/colors';
import PropTypes from 'prop-types';
import {GetStoreData, SetStoreData} from './utils/asyncStorage';

const Stack = createStackNavigator();

class AppNav extends Component {
  constructor() {
    this.state = {
      statusFetched: false,
      enableFTUE: 'true',
    };
  }

  componentDidMount() {
    this.getEnableFTUE().then(enableFTUE => {
      if (enableFTUE) {
        this.setState({
          enableFTUE,
        });
      }
    });
  }

  getEnableFTUE = () => {
    return GetStoreData('ENABLE_FTUE').then(val => {
      return val;
    });
  };

  render() {
    const {enableFTUE} = this.state;
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator>
            {enableFTUE && (
              <Stack.Screen
                name={'FTUE'}
                component={FTUE}
                options={{
                  title: 'FTUE',
                  // headerShown: false,
                  headerStyle: {
                    height: 0,
                  },
                }}
              />
            )}

            {enableFTUE && (
              <Stack.Screen
                name="Preferences"
                component={Preferences}
                options={{
                  title: 'Select your preferences',
                  headerTintColor: colors.primary_theme,
                  // headerBackTitle: '',
                }}
              />
            )}
            <Stack.Screen
              name="Preferences"
              component={Preferences}
              options={{
                title: 'Select your preferences',
                headerTintColor: colors.primary_theme,
                // headerBackTitle: '',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}

AppNav.propTypes = {

};

export default AppNav;
