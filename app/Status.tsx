// Status.js
import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import MessageContainer from './messageContainer'; // Ensure this import path is correct
import NetInfo from '@react-native-community/netinfo';

export default class Status extends React.Component {
  state = {
    isConnected: false,
  };

  componentDidMount() {
    // Fetch initial connection info
    NetInfo.fetch().then((state) => {
      this.setState({ isConnected: state.isConnected });
    });

    // Add an event listener for connection changes
    this.subscription = NetInfo.addEventListener((state) => {
      this.setState({ isConnected: state.isConnected });
    });
  }

  componentWillUnmount() {
    // Clean up the subscription
    this.subscription();
  }

  render() {
    const { isConnected } = this.state;
    const statusBarColor = isConnected ? '#66BB6A' : '#EF5350'; // Set colors based on connection status

    return (
      <View style={styles.status}>
        <StatusBar backgroundColor={statusBarColor} barStyle="light-content" />
        <MessageContainer isConnected={isConnected} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  status: {
    zIndex: 1,
    height: 100, // Increased height
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
