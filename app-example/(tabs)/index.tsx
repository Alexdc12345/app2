// App.js
import React from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';
import Status from './Status';

const MessageList = () => {
  const messages = [
    { id: '1', text: 'Hello! How are you?' },
  ];

  return (
    <FlatList
      data={messages}
      renderItem={({ item }) => (
        <View style={styles.messageBubble}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
      )}
      keyExtractor={item => item.id}
    />
  );
};

// Toolbar component to switch between sending text, images, or location
const Toolbar = () => {
  return (
    <View style={styles.toolbar}>
      <TextInput
        placeholder="Type your message..."
        style={styles.textInput}
      />
    </View>
  );
};

// IME component for custom input methods (image picker, etc.)
const InputMethodEditor = () => {
  return (
    <View style={styles.inputMethodEditor}>
      <Text>Image Picker</Text>
    </View>
  );
};

// Main App component
const App = () => {
  return (
    <View style={styles.container}>
      {/* Status Component */}
      <Status />

      {/* MessageList Component */}
      <MessageList />

      {/* Toolbar Component */}
      <Toolbar />

      {/* Input Method Editor (IME) Component */}
      <InputMethodEditor />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  messageBubble: {
    backgroundColor: '#007AFF',  // Blue bubble color
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 10,
    maxWidth: '80%',
    alignSelf: 'flex-end',  // Align messages to the right
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
  toolbar: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.04)',
    backgroundColor: 'white',
    padding: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
  },
  inputMethodEditor: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
