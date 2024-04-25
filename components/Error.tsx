/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line react-native/no-inline-styles

import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

export function Error({
  setError,
}: {
  setError: (variable: boolean) => void;
}): React.JSX.Element {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={styles.thumbContainer}>
        <Image
          source={require('../assets/4041.png')}
          style={styles.thumbnail}
        />
      </View>
      <Text
        style={{
          color: '#000',
          fontWeight: 'bold',
          fontSize: 25,
          textAlign: 'center',
          marginTop: 0,
        }}>
        {`نعتذر لك التطبيق يحتاج الى الانترنت`}
      </Text>
      <Text
        style={{
          color: '#000',
          fontWeight: '600',
          fontSize: 14,
          marginVertical: 10,
        }}>
        تاكد ان الجهاز متصل بالانترنت
      </Text>
      <TouchableOpacity
        onPress={() => setError(false)}
        style={{
          backgroundColor: '#000',
          paddingVertical: 10,
          paddingHorizontal: 20,
          marginTop: 10,
          borderRadius: 5,
        }}>
        <Text
          style={{
            color: '#FFF',
            fontWeight: '600',
            fontSize: 14,
          }}>
          حاول مرة اخرى
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  thumbContainer: {
    width: '100%',
    height: 400,
  },
  thumbnail: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
});
