import React from 'react';
import { StyleSheet, View, Image, TextInput, KeyboardType, Text } from 'react-native';

interface Props {
  image: any;
  placeholder: string;
  value: string;
  keyboardType: KeyboardType;
  secureTextEntry?: boolean;
  property: string;
  onChangeText: (property: string, value: any) => void;
  error?: string; // ✅ nuevo
}

export const CustomTextInput = ({
  image,
  placeholder,
  value,
  keyboardType,
  secureTextEntry = false,
  property,
  onChangeText,
  error
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={[
        styles.formInput,
        { borderBottomColor: error ? 'red' : '#AAAAAA', borderBottomWidth: 1 } // ✅ cambia el color del borde
      ]}>
        <Image style={[styles.formIcon, error && { tintColor: 'red' }]} source={image} /> {/* ✅ Ícono rojo si hay error */}
        <TextInput
          style={[styles.formTextInput, { color: error ? 'red' : 'black' }]} // ✅ Texto rojo opcional
          placeholder={placeholder}
          keyboardType={keyboardType}
          value={value}
          onChangeText={text => onChangeText(property, text)}
          secureTextEntry={secureTextEntry}
        />
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null} {/* ✅ Mensaje de error debajo */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  formIcon: {
    width: 25,
    height: 25,
    marginTop: 5,
  },
  formInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  formTextInput: {
    flex: 1,
    marginLeft: 15,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 3,
    marginLeft: 40
  }
});
