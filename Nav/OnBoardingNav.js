import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import FTUE from '../FTUE/FTUE';
import Preferences from '../Preferences/Preferences';
import colors from '../assets/colors';
import PropTypes from 'prop-types';

const Stack = createStackNavigator();

class OnBoardingNav extends Component {
  render() {
    return (
      <>
        <NavigationContainer>
          <Stack.Navigator>
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
              initialParams={this.props.handleOnDone}
            />
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

OnBoardingNav.propTypes = {
  handleOnDone: PropTypes.func.isRequired,
};
export default OnBoardingNav;
