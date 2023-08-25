import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Bill from './Bill';

const ListBills = ({bills, setModal, setBill, filter, billsFilter}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gastos</Text>

      {filter
        ? billsFilter.map(bill => (
            <Bill
              bill={bill}
              key={bill.id}
              setModal={setModal}
              setBill={setBill}
            />
          ))
        : bills.map(bill => (
            <Bill
              bill={bill}
              key={bill.id}
              setModal={setModal}
              setBill={setBill}
            />
          ))}

      {bills.length === 0 ||
        (billsFilter.length === 0 && !!filter && (
          <Text style={styles.noBill}>No hay gastos</Text>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 100,
  },
  title: {
    color: '#64748b',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: '700',
    marginTop: 20,
  },
  noBill: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 20,
  },
});
export default ListBills;
