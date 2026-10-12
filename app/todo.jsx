import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";

const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    if (text === "") return;

    setTodos([...todos, text]);
    setText("");
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((item, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Enter todo"
        value={text}
        onChangeText={setText}
      />

      <Button title="Add Todo" onPress={addTodo} />

      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <View>
            <Text>{item}</Text>

            <Button
              title="Delete"
              onPress={() => deleteTodo(index)}
            />
          </View>
        )}
      />
    </View>
  );
};

export default App;