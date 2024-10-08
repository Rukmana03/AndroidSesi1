import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';

const TodoList = () => {
  const [title, setTitle] = useState<string>('');
  const [todo, setTodo] = useState<{ id: number; title: string; completed: boolean }[]>([
    {
      id: 1,
      title: 'Learn React Native',
      completed: false,
    },
  ]);
  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');

  const handleAddTodo = () => {
    if (!title) {
      Alert.alert('Error', 'Please enter your todo');
      return;
    }
    const newTodo = {
      id: todo.length + 1,
      title: title,
      completed: false,
    };
    setTodo([...todo, newTodo]);
    setTitle('');
  };

  const handleDeleteTodo = (id: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are You Sure You Want to Delete This Todo?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedTodos = todo.filter((item) => item.id !== id);
            setTodo(updatedTodos);
          },
        },
      ]
    );
  };

  const handleEditTodo = (id: number) => {
    const updatedTodos = todo.map((item) =>
      item.id === id ? { ...item, title: editTitle } : item
    );
    setTodo(updatedTodos);
    setIsEditing(null); // Exit edit mode
    setEditTitle('');
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 20,
        backgroundColor: '#f8f8f8',
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
          gap: 15,
        }}
      >
        <TextInput
          placeholder="Enter your Todo"
          style={{
            flex: 1,
            borderColor: '#ccc',
            borderWidth: 1,
            padding: 12,
            borderRadius: 8,
            backgroundColor: '#fff',
          }}
          value={title}
          onChangeText={setTitle}
        />
        <Pressable
          style={{
            backgroundColor: 'green',
            paddingHorizontal: 15,
            paddingVertical: 10,
            borderRadius: 8,
          }}
          onPress={handleAddTodo}
        >
          <Text
            style={{
              color: 'white',
              fontSize: 16,
              fontWeight: 'bold',
            }}
          >
            Add Todo
          </Text>
        </Pressable>
      </View>

      {todo.map((item) =>
        isEditing === item.id ? (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
            }}
          >
            <TextInput
              value={editTitle}
              onChangeText={setEditTitle}
              style={{
                flex: 1,
                borderColor: '#ccc',
                borderWidth: 1,
                padding: 12,
                borderRadius: 8,
                backgroundColor: '#fff',
              }}
            />
            <Pressable
              onPress={() => handleEditTodo(item.id)}
              style={{
                backgroundColor: '#007BFF',
                padding: 10,
                borderRadius: 8,
                marginLeft: 10,
              }}
            >
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Save
              </Text>
            </Pressable>
          </View>
        ) : (
          <View
            key={item.id}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 15,
              paddingVertical: 10,
              paddingHorizontal: 15,
              backgroundColor: '#fff',
              borderRadius: 8,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: '#333',
                flex: 1,
              }}
            >
              {item.title}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
              }}
            >
              <Pressable
                onPress={() => {
                  setIsEditing(item.id);
                  setEditTitle(item.title); // Set current todo title to edit
                }}
                style={{
                  backgroundColor: '#FF6347',
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Edit
                </Text>
              </Pressable>
              <Pressable
                onPress={() => handleDeleteTodo(item.id)}
                style={{
                  backgroundColor: '#FF4500',
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  Delete
                </Text>
              </Pressable>
            </View>
          </View>
        )
      )}
    </View>
  );
};

export default TodoList;
