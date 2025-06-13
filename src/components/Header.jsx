import React from 'react';

function Sidebar({ students }) {
  // students データはオブジェクトなので、Object.valuesで配列に変換してマップ
  const studentList = Object.values(students);

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
            <div key={student.Id} style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8em', border: '2px solid #007BFF', overflow: 'hidden' }}>
              {/* 実際のキャラクター画像に置き換える */}
              {student.Id === 10000 ? <img src="https://assets.schaledb.com/ui/StudentPortraits/10000.webp" alt={student.Name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : student.Name}
            </div>
          ))}
          {studentList.length === 0 && <p style={{ fontSize: '0.9em', color: '#555' }}>生徒を編成してください</p>}
        </div>
      </div>

      {/* タイムライン・セグメント管理 */}
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ fontSize: '1em', color: '#6A5ACD', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '5px' }}>TLセグメント管理</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li style={{ background: 'rgba(0,123,255,0.1)', padding: '8px', borderRadius: '5px', marginBottom: '5px' }}>P1 (初動) - Part A</li>
          <li style={{ padding: '8px', borderRadius: '5px', marginBottom: '5px' }}>P2 (ゲージ削り) - Part B</li>
        </ul>
        <button className="ba-button" style={{ width: '100%' }}>+ セグメント追加（実装予定）</button>
      </div>

      {/* スキルパレット */}
      <div style={{ flexGrow: 1 }}>
        <h3 style={{ fontSize: '1em', color: '#6A5ACD', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '5px' }}>スキルパレット</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px' }}>
          {/* ここに編成された生徒のEXスキルアイコンを表示し、ドラッグ可能にする */}
          {studentList.slice(0, 4).map(student => ( // 例として最初の4人のスキルを表示
            <div key={student.Id + '-skill'} style={{ width: '70px', height: '70px', backgroundColor: '#f0f0f0', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: '0.7em', border: '2px solid #6A5ACD', cursor: 'grab' }}>
              {/* 実際のスキルアイコンに置き換える */}
              EX-{student.Name}
              <div style={{ fontSize: '0.8em', color: '#007BFF', marginTop: '5px' }}>コスト: ?</div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
