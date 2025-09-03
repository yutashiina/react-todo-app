import React, { useState, useEffect } from "react";
import type { Todo } from "./types";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import TodoHistoryByDate from "./components/TodoHistoryByDate";
//import TodoHistoryByDate from "./components/TodoHistory"; //簡易ヒストリー表示

const LOCAL_STORAGE_KEY = "my_todo_app";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setTodos(JSON.parse(saved));
  }, []);

  const saveTodos = (newTodos: Todo[]) => {
    setTodos(newTodos);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTodos));
  };

  const addTodo = (text: string) => {
    const newTodo: Todo = { id: Date.now(), text, completed: false };
    saveTodos([...todos, newTodo]);
  };

  const toggleTodo = (id: number) => {
    const newTodos = todos.map(todo =>
      todo.id === id
        ? {
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? new Date().toISOString() : undefined,
          }
        : todo
    );
    saveTodos(newTodos);
  };

  const deleteTodo = (id: number) => {
    saveTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, text: string) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, text } : todo
    );
    saveTodos(newTodos);
  };

  const deleteHistory = (id: number) => {
    saveTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>ToDoリスト</h1>
      <p><a href="https://github.com/yutashiina/react-todo-app.git" target="_blank">ソースコード</a></p>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} onEdit={editTodo} />
      <TodoHistoryByDate todos={todos} onDelete={deleteHistory} />
    </div>
  );
};

export default App;
