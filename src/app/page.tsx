'use client';

// 画面上で変化する値を管理するための機能。
import { useState } from 'react';

// import Image from "next/image";
import styles from './page.module.css';

type Todo = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
}

type Filter = 'all' | 'active' | 'done';

export default function Home() {
  // 入力欄の文字を管理している。
  // inputValue = 現在の入力欄の値
  // setInputValue = inputValueを更新するための関数
  // useState('') = 最初の値は空です。と教えている。
  const [inputValue, setInputValue] = useState('');

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Todo App</h1>
      <form className={styles.form}>
        <input className={styles.input} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Todoを入力" />
        <button className={styles.submit} type="submit" >+</button>
      </form>
      <ul className={styles.list}>
        <li className={styles.item}>
          <input type="checkbox" />
          <span>サンプル</span>
          <button type="button">編集</button>
          <button type="button">削除</button>
        </li>
      </ul>
    </main>
  );
}
