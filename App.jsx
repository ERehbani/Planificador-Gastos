import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from './src/components/Header';
import NewBudget from './src/components/NewBudget';
import ControlBudget from './src/components/ControlBudget';
import ExpenseForm from './src/components/ExpenseForm';
import {generateId} from './src/helpers';
import ListBills from './src/components/ListBills';
import Filters from './src/components/Filters';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [isValidBudget, setIsValidBudget] = useState(false);
  const [budget, setBudget] = useState(0);
  const [bills, setBills] = useState([]);
  const [modal, setModal] = useState(false);
  const [bill, setBill] = useState({});
  const [filter, setFilter] = useState('');
  const [billsFilter, setBillsFilter] = useState([]);

  useEffect(() => {
    const obtainBudgetStorage = async () => {
      try {
        const budgetStorage =
          (await AsyncStorage.getItem('planificador_presupuesto')) ?? 0;

        if (budgetStorage > 0) {
          setBudget(budgetStorage);
          setIsValidBudget(true);
        }

        console.log(budgetStorage);
      } catch (error) {
        console.log(error);
      }
    };
    obtainBudgetStorage();
  }, []);

  useEffect(() => {
    if (isValidBudget) {
      const saveBudgetStorage = async () => {
        try {
          await AsyncStorage.setItem('planificador_presupuesto', budget);
        } catch (error) {
          console.log(error);
        }
      };
      saveBudgetStorage();
    }
  }, [isValidBudget]);

  useEffect(() => {
    const obtainBillsStorage = async () => {
      try {
        const billsStorage =
          (await AsyncStorage.getItem('planificador_gastos')) ?? [];

        setBills(billsStorage ? JSON.parse(billsStorage) : []);
      } catch (error) {
        console.log(error);
      }
    };
    obtainBillsStorage();
  }, []);

  useEffect(() => {
    const saveBillsStorage = async () => {
      try {
        await AsyncStorage.setItem(
          'planificador_gastos',
          JSON.stringify(bills),
        );
      } catch (error) {
        console.log(error);
      }
    };
    saveBillsStorage();
  }, [bills]);

  const handleNewBugdet = budget => {
    if (Number(budget) > 0) {
      setIsValidBudget(true);
    } else {
      Alert.alert('Error', 'El presupuesto no puede ser 0 o menor');
    }
  };

  const handleBills = bill => {
    if ([bill.name, bill.category, bill.quantity].includes('')) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    if (bill.id) {
      const billUpdate = bills.map(billState =>
        billState.id === bill.id ? bill : billState,
      );
      setBills(billUpdate);
    } else {
      // Añadir el nuevo gasto al state
      bill.id = generateId();
      bill.date = Date.now();
      setBills([...bills, bill]);
    }

    setModal(!modal);
  };

  const deleteBill = id => {
    Alert.alert(
      'Deseas eliminar este gasto?',
      'Un gasto eliminado no se puede recuperar',
      [
        {text: 'No', style: 'cancel'},
        {},
        {
          text: 'Si, Eliminar',
          onPress: () => {
            const updateBills = bills.filter(billState => billState.id !== id);

            setBills(updateBills);
            setModal(!modal);
            setBill({});
          },
        },
      ],
    );
  };

  const resetApp = () => {
    Alert.alert(
      'Deseas resetear la app?',
      'Esto eliminará el presupuesto y los gastos',
      [
        {text: 'No', style: 'cancel '},
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setIsValidBudget(false);
              setBudget(0);
              setBills([]);
            } catch (error) {
              console.log(error);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Header />
          {isValidBudget ? (
            <ControlBudget budget={budget} bills={bills} resetApp={resetApp} />
          ) : (
            <NewBudget
              handleNewBugdet={handleNewBugdet}
              setBudget={setBudget}
              budget={budget}
            />
          )}
        </View>

        {isValidBudget && (
          <>
            <Filters
              setFilter={setFilter}
              bills={bills}
              filter={filter}
              billsFilter={billsFilter}
              setBillsFilter={setBillsFilter}
            />
            <ListBills
              bills={bills}
              setModal={setModal}
              setBill={setBill}
              filter={filter}
              billsFilter={billsFilter}
            />
          </>
        )}
      </ScrollView>
      {modal && (
        <Modal
          animationType="slide"
          visible={modal}
          onRequestClose={() => {
            setModal(!modal);
          }}>
          <ExpenseForm
            setModal={setModal}
            modal={modal}
            handleBills={handleBills}
            setBill={setBill}
            bill={bill}
            deleteBill={deleteBill}
          />
        </Modal>
      )}

      {isValidBudget && (
        <Pressable style={styles.pressable} onPress={() => setModal(!modal)}>
          <Image
            style={styles.image}
            source={require('./src/img/nuevo-gasto.png')}
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  header: {backgroundColor: '#3b82f6', minHeight: 550},
  image: {
    width: 60,
    height: 60,
  },
  pressable: {
    position: 'absolute',
    bottom: 30,
    right: 20,
  },
});

export default App;
