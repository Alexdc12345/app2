import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MessageShape } from './messageUtils';

export default class MessageList extends React.Component {
  static propTypes = {
    messages: PropTypes.arrayOf(MessageShape).isRequired,
    onPressMessage: PropTypes.func,
    onDeleteMessage: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onPressMessage: () => {},
  };

  handlePressMessage = (message) => {
    // Call the onPressMessage function from props and dismiss keyboard
    this.props.onPressMessage(message.id);
    // Assuming you have a reference to the input field, you can dismiss the keyboard here
    // If you have a function passed to this component to set input focus state, call it here
    // For example, this.props.onDismissKeyboard();
  };

  handleLongPressMessage = (message) => {
    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete this message?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => this.props.onDeleteMessage(message.id) }
      ],
      { cancelable: true }
    );
  };

  renderMessageItem = ({ item }) => {
    return (
      <View style={styles.messageRow}>
        <TouchableOpacity
          onPress={() => this.handlePressMessage(item)}
          onLongPress={() => this.handleLongPressMessage(item)} // Long press for deletion
        >
          {this.renderMessageBody(item)}
        </TouchableOpacity>
      </View>
    );
  };

  renderMessageBody = ({ type, text, uri, coordinate, isLocal }) => {
    switch (type) {
      case 'text':
        return (
          <View style={styles.messageBubble}>
            <Text style={styles.messageText}>{text}</Text>
          </View>
        );
      case 'image':
        return <Image style={styles.image} source={isLocal ? uri : { uri }} />;
      case 'location':
        return (
          <MapView
            style={styles.map}
            initialRegion={{
              ...coordinate,
              latitudeDelta: 0.08,
              longitudeDelta: 0.04,
            }}
          >
            <Marker coordinate={coordinate} />
          </MapView>
        );
      default:
        return null;
    }
  };

  render() {
    const { messages } = this.props;
    return (
      <FlatList
        style={styles.container}
        inverted
        data={messages}
        renderItem={this.renderMessageItem}
        keyExtractor={(item) => item.id.toString()}
        keyboardShouldPersistTaps="handled"
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'visible',
  },
  messageRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 60,
    marginVertical: 5,
  },
  messageBubble: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
    maxWidth: '100%',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginRight: 10,
  },
  map: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginRight: 10,
  },
  messageText: {
    fontSize: 16,
    color: 'white',
  },
});
