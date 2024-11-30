import React from 'react';
import { View, Text, StatusBar, StyleSheet, Platform } from 'react-native';

const MessageContainer = ({ isConnected }) => {
  const backgroundColor = isConnected ? '#66BB6A' : '#EF5350';
  const statusBar = (
    <StatusBar
      backgroundColor={backgroundColor}
      barStyle={isConnected ? 'dark-content' : 'light-content'}
      animated={false}
    />
  );

  const messageText = isConnected ? 'Connected' : 'No network connection';
  const bubbleColor = backgroundColor;

  const messageContainer = (
    <View style={styles.messageContainer} pointerEvents="none">
      {statusBar}
      <View style={[styles.bubble, { backgroundColor: bubbleColor }]}>
        <Text style={styles.text}>{messageText}</Text>
      </View>
    </View>
  );

  if (Platform.OS === 'ios') {
    return (
      <View style={[styles.status, { backgroundColor }]}>
        {messageContainer}
      </View>
    );
  }

  return messageContainer;
};

const styles = StyleSheet.create({
  messageContainer: {
    zIndex: 1,
    position: 'absolute',
    top: 20,
    right: 0,
    left: 30,
    height: 80,
    alignItems: 'center',
  },
  bubble: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  text: {
    color: 'white',
  },
  status: {
    flex: 1,
  },
});

export default MessageContainer;
