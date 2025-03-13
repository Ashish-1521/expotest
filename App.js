import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, SafeAreaView, TextInput } from 'react-native';
import { ThemeProvider } from '@rneui/themed';
import { CheckBox } from '@rneui/themed';
import { useState } from 'react';

export default function App() {
  const [data, setData] = useState([
    {
      key: "1",
      title: "Title1",
      completed: true
    },
    {
      key: "2",
      title: "Title2",
      completed: false
    }
  ]);

  const [task, setTask] = useState('');

  const addTask = () => {
    if (task.trim() === '') return;
    setData(prevData => [{ key: (prevData.length + 1).toString(), title: task, completed: false }, ...prevData]);
    setTask('');
  }

  const changeStatus = (item) => {
    setData(prevData => prevData.map(itemData =>
      itemData.key === item.key ? { ...itemData, completed: !itemData.completed } : itemData
    ));
  }
  const renderItem = ({ item }) => {
    return <View style={styles.item}>
      <Text style={[styles.title,
      item.completed && { textDecorationLine: item.completed ? 'line-through' : 'none' }
      ]}>{item.title}
        <CheckBox
          checked={item.completed}
          onPress={() => { changeStatus(item) }}
          iconType="material-community"
          checkedIcon="check"
          uncheckedIcon="checkbox-blank-outline"
          checkedColor="blue" />
      </Text>
    </View>
  }
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input}
          placeholder="Add a new task..." value={task} onChangeText={(e) => setTask(e)} />
        <button onClick={addTask}>Add Task</button>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});