import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-native-date-picker';

interface IToDo {
  text: string;
  completed: boolean;
  taskdate: Date;
}

export default function App() {
  const [value, setValue] = useState<string>('');
  const [toDoList, setToDos] = useState<IToDo[]>([]);
  const [error, showError] = useState<Boolean>(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('myArray');
        const parsedData = JSON.parse(storedData);
        console.log(storeData + 'data');
        if (parsedData) {
          setToDos(parsedData);
          console.log(JSON.stringify(parsedData) + '............');
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    };
    getData();
  }, []);

  const handleSubmit = (): void => {
    console.log('task created');
    if (value.trim() && date != new Date()) {
      setToDos([
        ...toDoList,
        {text: value, completed: false, taskdate: date.toDateString()},
      ]);
      storeData();
      //getData();
    } else showError(true);
    setDate(date);
    setValue('');
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
  const getData = async () => {
    try {
      const storedData = await AsyncStorage.getItem('myArray');
      const parsedData = JSON.parse(storedData);
      console.log(storeData + 'data');
      if (parsedData) {
        setToDos(parsedData);
        console.log(JSON.stringify(parsedData) + '............');
      }
    } catch (error) {
      console.log('Error retrieving data:', error);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Todo List</Text>
      <View>
        <Button
          title=" Pick Date "
          onPress={() => setOpen(true)}
          color="green"
        />
        <DatePicker
          modal
          open={open}
          mode="date"
          date={date}
          minimumDate={date}
          onConfirm={date => {
            setOpen(false);
            //setToDos([...toDoList, {date}]);
            setDate(date);
            console.log(date.toDateString());
            showError(false);
          }}
          onCancel={() => {
            setOpen(false);
            //setDate(null);
            showError(true);
          }}
        />
      </View>
      <Text>{date.toDateString()}</Text>
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
            ]}
            numberOfLines={3}>
            {toDo.text}
          </Text>
          <Text style={{color: 'green'}}>{toDo.taskdate}</Text>
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
    alignItems: 'center',
    marginBottom: 10,
  },
  addButton: {
    alignItems: 'flex-end',
  },
  task: {
    width: 90,
  },
  error: {
    color: 'red',
  },
});