import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {REPORT_BLE_URL} from '../utils/endpoints';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {getLatestCoarseLocation} from '../utils/coarseLocation';
import colors from '../assets/colors';
import Ble from '../ble/ble';

class Report extends Component {
  constructor() {
    super();
    this.state = {
      uploadBLESuccess: false,
    };
  }

  uploadBLE = () => {
    let seeds;
    this.getDeviceSeedAndRotate().then(data => {
      seeds = data;
      getLatestCoarseLocation(true).then(location => {
        this.reportBLE(seeds, location);
      });
    });
  };

  reportBLE = (seeds, location) => {
    const requestBody = {
      "seeds": seeds,
      "region": {
        "latitudePrefix": location.latitudePrefix,
        "longitudePrefix": location.longitudePrefix,
        "precision": location.precision
      }
    };

    fetch(REPORT_BLE_URL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => {
        if (!response.ok) {
          response.json().then(err => {
            console.log(err);
            return;
          });
        }
        this.setState({
          uploadBLESuccess: true,
        });
        return;
      })
      .catch(err => {
        console.log(err);
      });
  };

  getDeviceSeedAndRotate = () => {
    //14 days ago
    return Ble.getDeviceSeedAndRotate(24 * 14 * 3600).then(
      result => {
        console.log('I got: ' + JSON.stringify(result));
        return result;
      },
      error => {
        console.log('failed eth: ' + error);
      },
    );
  };

  render() {
    return (
      <SafeAreaView>
        <Image
          style={styles.reporting_logo}
          source={require('../assets/health/report_bg.png')}
        />
        <View style={styles.result_container}>
          <Text style={styles.title}>
            Positive COVID-19 Diagnosis Reported
          </Text>
          <TouchableOpacity
            style={styles.upload_trace_button}
            onPress={this.uploadBLE}>
            <Text style={styles.upload_trace_button_text}>
              Upload Your Trace Data
            </Text>
          </TouchableOpacity>
          {this.state.uploadBLESuccess && <Text>Success!</Text>}
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  result_container: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    lineHeight: 31,
    letterSpacing: 0.33,
  },
  upload_trace_button: {
    backgroundColor: colors.primary_theme,
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 20,
  },
  upload_trace_button_text: {
    color: 'white',
    fontSize: 15,
    lineHeight: 20,
  },
});

export default Report;
