import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Dimensions, TouchableHighlight, BackHandler, Keyboard, Alert } from 'react-native';
import * as Location from 'expo-location';
import Status from './Status';
import MessageList from './messageList';
import { createTextMessage, createImageMessage, createLocationMessage } from './messageUtils';
import Toolbar from './toolbar';
import sampleImage from '../assets/gateway.jpg';

const App = () => {
  const [messages, setMessages] = useState([
  ]);
  const [fullscreenImageId, setFullscreenImageId] = useState(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (fullscreenImageId) {
        dismissFullscreenImage();
        return true;
      }
      return false;
    });

    return () => backHandler.remove();
  }, [fullscreenImageId]);

  const handleSendTextMessage = (text) => {
    if (text.trim()) {
      setMessages([createTextMessage(text), ...messages]);
    }
  };

  const handleSendImageMessage = (image, isLocal) => {
    const newMessage = createImageMessage(image, isLocal);
    setMessages([newMessage, ...messages]);
  };

  const handleDeleteMessage = (messageId) => {
    setMessages(messages.filter((message) => message.id !== messageId));
  };

  const renderFullscreenImage = () => {
    if (!fullscreenImageId) return null;
    const image = messages.find((message) => message.id === fullscreenImageId);
    if (!image) return null;

    const source = image.isLocal ? image.uri : { uri: image.uri };

    return (
      <TouchableHighlight style={styles.fullscreenOverlay} onPress={dismissFullscreenImage}>
        <Image style={styles.fullscreenImage} source={source} />
      </TouchableHighlight>
    );
  };

  const dismissFullscreenImage = () => {
    setFullscreenImageId(null);
  };

  const handlePressCamera = () => {
    launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        const { uri } = response.assets[0];
        handleSendImageMessage({ uri }, true);
      }
    });
  };

  const handlePressMessage = (messageId) => {
    dismissFullscreenImage();
    setFullscreenImageId(messageId);
    Keyboard.dismiss();
    setIsFocused(false);
  };

  // Add the new location handler using Expo Location
  const handlePressToolbarLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Location permission is required to send your location.');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    setMessages([
    createLocationMessage({ latitude: 14.62785689100395, longitude: 121.06534086850502 }),
      ...messages,
    ]);
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Status />
      <MessageList
        messages={messages}
        onDeleteMessage={handleDeleteMessage}
        onPressMessage={handlePressMessage}
      />
      <Toolbar
        isFocused={isFocused}
        onChangeFocus={setIsFocused}
        onSubmit={handleSendTextMessage}
        onPressCamera={handlePressCamera}
        onPressLocation={handlePressToolbarLocation} // Pass the new location handler
      />
      {renderFullscreenImage()}
    </KeyboardAvoidingView>
  );
};

const { height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  fullscreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});

export default App;