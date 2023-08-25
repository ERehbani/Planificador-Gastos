import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Header = () => {
  return (
    <View>
      <Text style={styles.text}>Planificador de Gastos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 30,
    color: 'white',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    paddingTop: 20,
    marginHorizontal: 10,
  },
});

export default Header;
