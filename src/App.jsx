import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainTimeline from './components/MainTimeline';
import Footer from './components/Footer';
import './index.css'; // 全体CSSをインポート

// 仮のデータ取得関数
// 実際にはpublic/data/students.jsonをfetchします
const fetchStudentsData = async () => {
  try {
    const response = await fetch('/data/students.json'); // publicフォルダからの相対パス
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("生徒データの取得に失敗しました:", error);
    return {}; // エラー時は空のオブジェクトを返す
  }
};

function App() {
  const [students, setStudents] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 生徒データ（Schale DB相当）を読み込む
  useEffect(() => {
    fetchStudentsData().then(data => {
      setStudents(data);
      setLoading(false);
    }).catch(err => {
      setError(err);
      setLoading(false);
    });
  }, []);

  if (loading) return <div style={{ textAlign: 'center', padding: '50px' }}>データ読み込み中...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '50px', color: 'red' }}>エラー: {error.message}</div>;

  return (
    <Router basename={import.meta.env.BASE_URL}> {/* ViteのBASE_URLを使用 */}
      <Header />
      <div style={{ display: 'flex', flexGrow: 1 }}> {/* 左右カラムのコンテナ */}
        <Sidebar students={students} /> {/* 左カラム */}
        <MainTimeline students={students} /> {/* 右カラム */}
      </div>
      <Footer />
    </Router>
  );
}

export default App;
