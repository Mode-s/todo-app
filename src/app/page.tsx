'use client';

import { useState } from 'react';
import styles from './page.module.css';

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');
  const [removeId, setRemoveId] = useState<string | null>(null);

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { id: crypto.randomUUID(), text: input, done: false }]);
    setInput('');
  };

  // ① indexではなくidで対象を探して更新する
  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  const editMode = (id: string) => {
    const target = todos.find((todo) => todo.id === id);
    if (!target) return;
    setEditId(id);
    setEditText(target.text);
  };

  const confirmEdit = () => {
    if (editId === null) return;
    const trimmed = editText.trim();
    if (trimmed === '') {
      removeTodo(editId);
    } else {
      setTodos(todos.map((todo) => (todo.id === editId ? { ...todo, text: trimmed } : todo)));
    }
    setEditId(null);
  };

  const removeTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const requestRemove = (id: string) => {
    setRemoveId(id);
    setTimeout(() => {
      removeTodo(id);
      setRemoveId(null);
    }, 200);
  };

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Todo App</h1>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          addTodo();
        }}
      >
        <input className={styles.input} value={input} onChange={(e) => setInput(e.target.value)} placeholder="タスクを入力" />
        <button className={styles.addButton}>+</button>
      </form>
      <ul className={styles.list}>
        {todos.map((todo) => (
          <li className={`${styles.item} ${removeId === todo.id ? styles.itemOut : ''}`} key={todo.id}>
            <button
              className={styles.checkButton}
              type="button"
              role="checkbox"
              aria-checked={todo.done}
              aria-label={todo.done ? '未完了に戻す' : '完了にする'}
              onClick={() => toggleTodo(todo.id)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                  <path
                    key={todo.done ? 'frame-on' : 'frame-off'}
                    className={todo.done ? styles.frame : undefined}
                    fill="currentColor"
                    fillOpacity={todo.done ? undefined : 0}
                    d="M4 12v-7c0 -0.55 0.45 -1 1 -1h14c0.55 0 1 0.45 1 1v14c0 0.55 -0.45 1 -1 1h-14c-0.55 0 -1 -0.45 -1 -1Z"
                  />
                  {todo.done && <path className={styles.check} d="M8 12l3 3l5 -5" />}
                </g>
              </svg>
            </button>

            {editId === todo.id ? (
              <input
                className={styles.editInput}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={confirmEdit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') confirmEdit();
                  if (e.key === 'Escape') setEditId(null);
                }}
                autoFocus
              />
            ) : (
              <span
                className={`${styles.text} ${todo.done ? styles.textDone : ''}`}
                onDoubleClick={() => editMode(todo.id)}
              >
                {todo.text}
              </span>
            )}

            {editId !== todo.id && (
              <button type="button" onClick={() => editMode(todo.id)}>
                編集
              </button>
            )}
            <button type="button" onClick={() => requestRemove(todo.id)}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}