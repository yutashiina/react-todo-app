import React, { useState } from "react";
import type { Todo } from "../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleSave = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <li style={{ margin: "0.5rem 0" }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            style={{ marginLeft: "0.5rem" }}
          />
          <button onClick={handleSave} style={{ marginLeft: "0.5rem" }}>
            保存
          </button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              marginLeft: "0.5rem",
            }}
          >
            {todo.text}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            style={{ marginLeft: "0.5rem" }}
          >
            編集
          </button>
        </>
      )}
      <button onClick={() => onDelete(todo.id)} style={{ marginLeft: "1rem" }}>
        削除
      </button>
    </li>
  );
};

export default TodoItem;