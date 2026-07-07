'use client';

// 画面上で変化する値を管理するための機能。
import { useState } from 'react';

// import Image from "next/image";
import styles from './page.module.css';

type Todo = {
  id: string;
  text: string;
  done: boolean;
};

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  // 入力欄の文字を管理している。
  // inputValue = 現在の入力欄の値
  // setInputValue = inputValueを更新するための関数
  // useState('') = 最初の値は空です。と教えている。
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editText, setEditText] = useState('');
  const [removeIndex, setRemoveIndex] = useState<number | null>(null);

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { id: crypto.randomUUID(), text: input, done: false }]);
    setInput('');
  };

  const toggleTodo = (index: number) => {
    setTodos(todos.map((todo, i) => (i === index ? { ...todo, done: !todo.done } : todo)));
  };

  const editMode = (index: number) => {
    setEditIndex(index);
    setEditText(todos[index].text);
  };

  const confirmEdit = () => {
    if (editIndex === null) return;
    const trimmed = editText.trim();
    if (trimmed === '') {
      removeTodo(editIndex);
    } else {
      setTodos(todos.map((todo, i) => (i === editIndex ? { ...todo, text: trimmed } : todo)));
    }
    setEditIndex(null);
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const requestRemove = (index: number) => {
    setRemoveIndex(index);
    setTimeout(() => {
      removeTodo(index);
      setRemoveIndex(null)
    }, 200);
  }

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
        {todos.map((todo, index) => (
          <li className={`${styles.item} ${removeIndex === index ? styles.itemOut : ''}`} key={index}>
            <button className={styles.checkButton} type="button" role="checkbox" aria-checked={todo.done} aria-label={todo.done ? '未完了に戻す' : '完了にする'} onClick={() => toggleTodo(index)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
                  {/* 枠。doneが切り替わるたびkeyでDOMを作り直し、CSSアニメーションを再生させる */}
                  <path key={todo.done ? 'frame-on' : 'frame-off'} className={todo.done ? styles.frame : undefined} fill="currentColor" fillOpacity={todo.done ? undefined : 0} d="M4 12v-7c0 -0.55 0.45 -1 1 -1h14c0.55 0 1 0.45 1 1v14c0 0.55 -0.45 1 -1 1h-14c-0.55 0 -1 -0.45 -1 -1Z" />

                  {/* チェックマーク。未完了時はDOMに存在させない */}
                  {todo.done && <path className={styles.check} d="M8 12l3 3l5 -5" />}
                </g>
              </svg>
            </button>
            {editIndex === index ? (
              <input
                className={styles.editInput}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={confirmEdit}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') confirmEdit();
                  if (e.key === 'Escape') setEditIndex(null);
                }}
                autoFocus
              />
            ) : (
              <span className={`${styles.text} ${todo.done ? styles.textDone : ''}`} onDoubleClick={() => editMode(index)}>
                {todo.text}
              </span>
            )}
            {editIndex !== index && (<button type="button" onClick={() => editMode(index)}>編集</button>)}
            <button type="button" onClick={() => requestRemove(index)}>
              削除
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}
