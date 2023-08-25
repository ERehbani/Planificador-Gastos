import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, StyleSheet} from 'react-native';
import globalStyles from '../styles';
import {formatQuantity} from '../helpers';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Circle} from 'react-native-svg';

const ControlBudget = ({budget, bills, resetApp}) => {
  const [available, setAvailable] = useState(0);
  const [spent, setSpent] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const totalSpent = bills.reduce(
      (total, bill) => Number(bill.quantity) + total,
      0,
    );
    const totalAvailable = budget - totalSpent;

    const newPercet = ((budget - totalAvailable) / budget) * 100;

    setPercent(newPercet);

    setSpent(totalSpent);
    setAvailable(totalAvailable);
  }, [bills]);

  function fillTrunc(number) {
    return Math.round(number * 100) / 100;
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewButton}>
        <Pressable style={styles.button} onPress={resetApp}>
          <Text style={styles.buttonText}>Reiniciar Presupuesto</Text>
        </Pressable>
      </View>
      <View style={styles.centerGraphic}>
        <AnimatedCircularProgress
          size={200}
          width={10}
          fill={percent}
          delay={500}
          tintColor="#3b82f6"
          backgroundColor="#f5f5f5"
          renderCap={({center}) => (
            <Circle cx={center.x} cy={center.y} r="5" fill="blue" />
          )}
          duration={2000}
          lineCap="round"
          backgroundWidth={15}>
          {fill => <Text style={styles.fillProgress}>{fillTrunc(fill)}%</Text>}
        </AnimatedCircularProgress>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.value}>
          <Text style={styles.label}>Presupuesto: </Text>
          {formatQuantity(budget)}
        </Text>

        <Text style={styles.value}>
          <Text style={styles.label}>Disponible: </Text>
          {formatQuantity(available)}
        </Text>

        <Text style={styles.value}>
          <Text style={styles.label}>Gastado: </Text>
          {formatQuantity(spent)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  centerGraphic: {
    alignItems: 'center',
  },
  viewButton: {
    width: 150,
  },
  button: {
    backgroundColor: '#db2777',
    padding: 10,
    marginBottom: 40,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 10,
  },
  containerText: {
    marginTop: 50,
  },
  value: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontWeight: '700',
    color: '#3b82f6',
  },
  fillProgress: {
    fontSize: 45,
    color: '#3b82f6',
  },
  fillProgressText: {
    fontSize: 20,
    color: 'grey',
  },
});

export default ControlBudget;
