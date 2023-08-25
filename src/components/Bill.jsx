import React from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import globalStyles from '../styles';
import {formatDate, formatQuantity} from '../helpers';

const diccIcons = {
  ahorro: require('../img/icono_ahorro.png'),
  comida: require('../img/icono_comida.png'),
  casa: require('../img/icono_casa.png'),
  gastos: require('../img/icono_gastos.png'),
  ocio: require('../img/icono_ocio.png'),
  salud: require('../img/icono_salud.png'),
  suscripciones: require('../img/icono_suscripciones.png'),
};

const Bill = ({bill, setModal, setBill}) => {
  const {name, category, quantity, date} = bill;

  const handleActions = () => {
    setModal(true);
    setBill(bill);
  };

  return (
    <Pressable onLongPress={handleActions}>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.containerImage}>
            <Image style={styles.image} source={diccIcons[category]} />
            <View style={styles.containerText}>
              <Text style={styles.category}>{category}</Text>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.date}>{formatDate(date)}</Text>
            </View>
          </View>

          <Text style={styles.quantity}>{formatQuantity(quantity)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  containerText: {
    flex: 1,
  },
  containerImage: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  category: {
    color: '#94a3b8',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  name: {
    fontSize: 22,
    color: '#64748b',
    marginBottom: 5,
  },
  quantity: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  date: {
    fontWeight: 'bold',
    color: '#db2777',
  },
});

export default Bill;
