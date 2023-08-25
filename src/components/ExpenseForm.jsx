import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
} from 'react-native';
import globalStyles from '../styles';

const ExpenseForm = ({
  setModal,
  modal,
  handleBills,
  setBill,
  bill,
  deleteBill,
}) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [id, setId] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    if (bill?.name) {
      setName(bill.name);
      setQuantity(bill.quantity);
      setCategory(bill.category);
      setId(bill.id);
      setDate(bill.date);
    }
  }, [bill]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerBtns}>
        <View style={styles.btnContainer}>
          <Pressable
            style={[styles.btn, styles.btnCancel]}
            onPress={() => {
              setModal(false);
              setBill({});
            }}>
            <Text style={styles.btnText}>X</Text>
          </Pressable>
          {/* // Verificar si existe el id (el doble !! retorna el valor verdadero
          del booleano) para sacar el boton de eliminar en caso de que sea un
          nuevo gasto */}
          {!!id && (
            <Pressable
              style={[styles.btnDelete, styles.btn]}
              onPress={() => deleteBill(id)}>
              <Text style={styles.btnText}>Eliminar</Text>
            </Pressable>
          )}
        </View>

        <View style={styles.form}>
          <Text style={styles.title}>
            {bill?.name ? 'Editar Gasto' : 'Nuevo Gasto'}
          </Text>

          <View style={styles.camp}>
            <Text style={styles.label}>Nombre Gasto</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del gasto. Ej: Comida"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View style={styles.camp}>
            <Text style={styles.label}>Cantidad Gasto</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre del gasto. Ej: 300"
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>

          <View style={styles.camp}>
            <Text style={styles.label}>Categoría Gasto</Text>
            <View style={styles.picker}>
              <Picker
                selectedValue={category}
                onValueChange={itemValue => {
                  setCategory(itemValue);
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
          </View>
          <Pressable
            style={styles.submitBtn}
            onPress={() => handleBills({name, quantity, category, id, date})}>
            <Text style={styles.submitBtnText}>
              {bill?.name ? 'Guardar cambios' : 'Agregar Gasto'}
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1e40af',
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btn: {
    padding: 10,
    marginTop: 10,
    marginHorizontal: 10,
    borderRadius: 50,
  },

  btnDelete: {
    backgroundColor: 'red',
  },

  form: {
    ...globalStyles.container,
    marginTop: 10,
    marginHorizontal: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 30,
    color: '#64748b',
  },

  camp: {
    marginVertical: 10,
  },
  label: {
    color: '#64748b',
    textTransform: 'uppercase',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  picker: {
    borderColor: '#AFAEAC',
    borderWidth: 1,
    borderRadius: 10,
  },
  submitBtn: {
    backgroundColor: '#3b82f6',
    padding: 10,
    marginTop: 20,
    borderRadius: 10,
  },
  submitBtnText: {
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  btnCancel: {
    backgroundColor: '#db2777',
  },
  btnText: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});

export default ExpenseForm;
