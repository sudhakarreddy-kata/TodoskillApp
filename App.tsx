import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IToDo {
  text: string;
  completed: boolean;
}

export default function App() {
  const [value, setValue] = useState<string>('');
  const [toDoList, setToDos] = useState<IToDo[]>([]);
  const [error, showError] = useState<Boolean>(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('myArray');
        const parsedData = JSON.parse(storedData);
        console.log(storeData + 'data');
        if (parsedData) {
          setToDos(parsedData);
          console.log(parsedData + '............');
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };

    getData();
  }, []);

  const handleSubmit = (): void => {
    console.log('task started');
    if (value.trim()) setToDos([...toDoList, {text: value, completed: false}]);
    else showError(true);
    setValue('');
    storeData();
  };

  const removeItem = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList.splice(index, 1);
    setToDos(newToDoList);
  };

  const toggleComplete = (index: number): void => {
    const newToDoList = [...toDoList];
    newToDoList[index].completed = !newToDoList[index].completed;
    setToDos(newToDoList);
  };
  const storeData = async () => {
    try {
      await AsyncStorage.setItem('myArray', JSON.stringify(toDoList));
      console.log('setting data');
    } catch (e) {
      // saving error
      console.log('error');
    }
  };
  // const getData = async () => {
  //   console.log('getting data');
  //   try {
  //     const value1 = await AsyncStorage.getItem('my-key');
  //     setValue(value1);
  //     console.log('got data', value1);
  //   } catch (e) {
  //     // error reading value
  //     console.log('error occured');
  //   }
  // };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Enter your todo task..."
          value={value}
          onChangeText={e => {
            setValue(e);
            showError(false);
          }}
          style={styles.inputBox}
        />
        <Button title="Add Task" onPress={handleSubmit} />
      </View>
      {error && (
        <Text style={styles.error}>Error: Input field is empty...</Text>
      )}
      <Text style={styles.subtitle}>Your Tasks :</Text>
      {toDoList.length === 0 && <Text>No to do task available</Text>}
      {toDoList.map((toDo: IToDo, index: number) => (
        <View style={styles.listItem} key={`${index}_${toDo.text}`}>
          <Text
            style={[
              styles.task,
              {textDecorationLine: toDo.completed ? 'line-through' : 'none'},
            ]}>
            {toDo.text}
          </Text>
          <Button
            title={toDo.completed ? 'Completed' : 'Complete'}
            onPress={() => toggleComplete(index)}
          />
          <Button
            title="X"
            onPress={() => {
              removeItem(index);
            }}
            color="crimson"
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 35,
    alignItems: 'center',
  },
  inputWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputBox: {
    width: 200,
    borderColor: 'purple',
    borderRadius: 8,
    borderWidth: 2,
    paddingLeft: 8,
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
    color: 'purple',
    textAlign: 'left',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  addButton: {
    alignItems: 'flex-end',
  },
  task: {
    width: 200,
  },
  error: {
    color: 'red',
  },
});
// import React, {useEffect, useState} from 'react';
// import {View, Text, TextInput, Button} from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const App = () => {
//   const [name, setName] = useState('');
//   const [greeting, setGreeting] = useState('');

//   useEffect(() => {
//     async function getGreeting() {
//       try {
//         const value = await AsyncStorage.getItem('greeting');
//         if (value !== null) {
//           setGreeting(value);
//         }
//       } catch (error) {
//         console.log('Error retrieving data:', error);
//       }
//     }
//     getGreeting();
//   }, []);

//   const storeGreeting = async () => {
//     try {
//       await AsyncStorage.setItem('greeting', `Hello, ${name}!`);
//       setGreeting(`Hello, ${name}!`);
//     } catch (error) {
//       console.log('Error saving data:', error);
//     }
//   };

//   return (
//     <View style={{flex: 1, justifyContent: 'center'}}>
//       <TextInput
//         value={name}
//         onChangeText={text => setName(text)}
//         placeholder="Enter your name"
//         style={{justifyContent: 'center', marginLeft: '40%'}}
//       />
//       <Button title="Save Greeting" onPress={storeGreeting} />
//       {greeting ? <Text>{greeting}</Text> : null}
//     </View>
//   );
// };

// export default App;
