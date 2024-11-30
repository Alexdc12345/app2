import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import PropTypes from "prop-types";
import { launchImageLibrary } from 'react-native-image-picker';

export default class Toolbar extends React.Component {
  static propTypes = {
    isFocused: PropTypes.bool.isRequired,
    onChangeFocus: PropTypes.func,
    onSubmit: PropTypes.func,
    onPressCamera: PropTypes.func,
    onPressLocation: PropTypes.func,
  };

  static defaultProps = {
    onChangeFocus: () => {},
    onSubmit: () => {},
    onPressCamera: () => {},
    onPressLocation: () => {},
  };

  state = {
    text: "",
  };

  setInputRef = (ref) => {
    this.input = ref;
  };

  componentDidUpdate(prevProps) {
    if (prevProps.isFocused !== this.props.isFocused) {
      if (this.props.isFocused) {
        this.input.focus();
      } else {
        this.input.blur();
      }
    }
  }

  handleChangeText = (text) => {
    this.setState({ text });
  };

  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if (text.trim()) {
      console.log("Submitting text:", text); // Debugging
      onSubmit(text);
      this.setState({ text: "" });
    } else {
      console.log("Ignored empty message"); // Debugging
    }
  };

  handleFocus = () => {
    const { onChangeFocus } = this.props;
    onChangeFocus(true);
  };

  handleBlur = () => {
    const { onChangeFocus } = this.props;
    onChangeFocus(false);
  };

  handlePressCamera = () => {
    const { onPressCamera } = this.props; // Use parent's camera handling
    console.log("Opening image library"); // Debugging
    onPressCamera();
  };

  render() {
    const { onPressLocation } = this.props;
    const { text } = this.state;

    return (
      <View style={styles.toolbar}>
        <ToolbarButton title={"📷"} onPress={this.handlePressCamera} />
        <ToolbarButton title={"📍"} onPress={onPressLocation} />
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder={"Type something!"}
            underlineColorAndroid={"transparent"}
            blurOnSubmit={false}
            value={text}
            onChangeText={this.handleChangeText}
            onSubmitEditing={this.handleSubmitEditing}
            ref={this.setInputRef}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />
        </View>
      </View>
    );
  }
}

const ToolbarButton = ({ title, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.buttonContainer}>
    <Text style={styles.button}>{title}</Text>
  </TouchableOpacity>
);

ToolbarButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  toolbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "white",
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.1)",
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 12,
    backgroundColor: "rgba(0,0,0,0.05)",
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
  buttonContainer: {
    paddingHorizontal: 12,
  },
  button: {
    fontSize: 24,
  },
});
