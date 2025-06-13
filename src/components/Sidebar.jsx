import React from 'react';

function Sidebar({ students }) {
  const studentList = Object.values(students);

  // 画像パスを生成するヘルパー関数
  const getStudentIconPath = (studentId) => {
    // public フォルダからの絶対パス
    return `/images/student/icon/${studentId}.webp`; // または .png など、実際の拡張子に合わせる
  };

  return (
    <aside className="ba-panel" style={{ width: '300px', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
      <h2 style={{ fontSize: '1.2em', color: '#007BFF', marginBottom: '15px' }}>編成・データ管理</h2>

      {/* 編成セクション */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1em', color: '#6A5ACD', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '5px' }}>現在の編成</h3>
        <button className="ba-button" style={{ width: '100%' }}>編成ボタン（実装予定）</button>
        <div style={{ marginTop: '10px', display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
          {/* ここに編成された生徒のアイコンを表示する */}
          {studentList.slice(0, 4).map(student => ( // 例として最初の4人
            <div key={student.Id} style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8em', border: '2px solid #007BFF', overflow: 'hidden' }}>
              <img
                src={getStudentIconPath(student.Id)} // 動的に画像パスを生成
                alt={student.Name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { e.target.onerror = null; e.target.src="/images/default_icon.webp" }} // 画像がない場合の代替画像
              />
            </div>
          ))}
          {studentList.length === 0 && <p style={{ fontSize: '0.9em', color: '#555' }}>生徒を編成してください</p>}
        </div>
      </div>

      {/* スキルパレット */}
      <div style={{ flexGrow: 1 }}>
        <h3 style={{ fontSize: '1em', color: '#6A5ACD', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '5px' }}>スキルパレット</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
          {/* ここに編成された生徒のEXスキルアイコンを表示し、ドラッグ可能にする */}
          {studentList.slice(0, 4).map(student => ( // 例として最初の4人のスキルを表示
            <div key={student.Id + '-skill'} style={{ width: '70px', height: '70px', backgroundColor: '#f0f0f0', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '0.7em', border: '2px solid #6A5ACD', cursor: 'grab' }}>
              <img
                src={getStudentIconPath(student.Id)} // ここも生徒アイコンをEXスキルのプレースホルダーとして使用
                alt={`${student.Name} EXスキル`}
                style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }}
                onError={(e) => { e.target.onerror = null; e.target.src="/images/default_skill_icon.webp" }} // 代替スキルアイコン
              />
              <div style={{ fontSize: '0.8em', color: '#007BFF', marginTop: '5px' }}>コスト: ?</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
