import React, {useState} from 'react';
import {Picker, Text, StyleSheet, View, TextInput, Button} from 'react-native';
import RNPickerSelect from "react-native-picker-select";
import Itemtype_Picker from './AddComponents/Itemtype_Picker';

const clothTypes = [{ name: "shirts" }, { name: "Overtops" }];
const AddScreen = () => {
  const [currency, setCurrency] = useState('US Dollar');
  return (
    
    <View style={styles.container}>
      <Text style={styles.formLabel}> Name </Text>
      <View>
        <TextInput placeholder="Ex: Bape Hoodie" style={styles.inputStyle} />
        <Text style={styles.formLabel}> Color </Text>
        <TextInput
          secureTextEntry={true}
          placeholder="Ex: Blue"
          style={styles.inputStyle}
        />
         <Text style={styles.formLabel}> Cloth Type </Text>
        <Itemtype_Picker items = {clothTypes}/>
        { <Button
          title="Submit"
          color="#fff"
          onPress={() => alert('Simple Button pressed')}
        /> }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#356859',
    alignItems: 'center',
    justifyContent: 'center',
  },

  formLabel: {
    fontSize: 20,
    color: '#fff',
  },
  inputStyle: {
    marginTop: 20,
    width: 300,
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#b9e4c9',
  },
  formText: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  },
  inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: 'purple',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30 // to ensure the text is never behind the icon
  }
});

export default AddScreen;