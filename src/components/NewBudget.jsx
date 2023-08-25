import React from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import globalStyles from '../styles';

const NewBudget = ({budget, setBudget, handleNewBugdet}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Definir Presupuesto</Text>

      <TextInput
        keyboardType="numeric"
        placeholder="Agrega tu presupuesto. Ej: 300"
        style={styles.input}
        value={budget.toString()}
        onChangeText={setBudget}
      />

      <Pressable style={styles.button} onPress={() => handleNewBugdet(budget)}>
        <Text style={styles.buttonText}>Agregar Presupuesto</Text>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 30,
  },
  label: {
    textAlign: 'center',
    fontSize: 24,
    color: '#3b82f6',
  },
  button: {
    marginTop: 30,
    backgroundColor: '#1048a4',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    paddingVertical: 5,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
});

export default NewBudget;
