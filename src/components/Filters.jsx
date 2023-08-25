import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import globalStyles from '../styles';
import {Picker} from '@react-native-picker/picker';

const Filters = ({setFilter, filter, billsFilter, bills, setBillsFilter}) => {
  useEffect(() => {
    if (filter === '') {
      setBillsFilter([]);
    } else {
      const billsFiltered = bills.filter(bill => bill.category === filter);

      setBillsFilter(billsFiltered);
    }
  }, [filter]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filtrar Gastos</Text>
      <Picker
        selectedValue={filter}
        onValueChange={value => {
          setFilter(value);
        }}>
        <Picker.Item label="-- Seleccione --" value="" />
        <Picker.Item label="Ahorro" value="ahorro" />
        <Picker.Item label="Comida" value="comida" />
        <Picker.Item label="Casa" value="casa" />
        <Picker.Item label="Gastos varios" value="gastos" />
        <Picker.Item label="Ocio" value="ocio" />
        <Picker.Item label="Salud" value="salud" />
        <Picker.Item label="Suscripciones" value="suscripciones" />
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    transform: [{translateY: 0}],
    marginTop: 50,
  },
  label: {
    fontSize: 22,
    fontWeight: '900',
    color: '#64748b',
  },
});

export default Filters;
