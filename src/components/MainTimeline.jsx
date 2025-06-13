import React from 'react';

function MainTimeline({ students }) {
  // students データはオブジェクトなので、Object.valuesで配列に変換してマップ
  const studentList = Object.values(students);

  return (
    <main className="ba-panel" style={{ flexGrow: 1, position: 'relative', overflow: 'hidden' }}>
      <h2 style={{ fontSize: '1.2em', color: '#007BFF', marginBottom: '15px' }}>タイムライン</h2>

      {/* コストバー */}
      <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', color: 'white', padding: '5px 10px', borderRadius: '5px', fontSize: '0.9em', zIndex: 10 }}>
        コスト: 50 / 100
      </div>

      {/* 時間軸 */}
      <div style={{ display: 'flex', borderBottom: '1px dashed rgba(0,0,0,0.2)', marginBottom: '10px' }}>
        <div style={{ width: '80px', flexShrink: 0, fontWeight: 'bold' }}>時間</div>
        {Array.from({ length: 12 }, (_, i) => i * 10).map(time => ( // 10秒刻みで2分間
          <div key={time} style={{ flex: '1 0 100px', textAlign: 'center', borderLeft: '1px solid rgba(0,0,0,0.1)', fontSize: '0.8em', padding: '5px 0' }}>
            {time}s
          </div>
        ))}
      </div>

      {/* 生徒レーン */}
      {studentList.slice(0, 4).map(student => ( // 例として最初の4人のレーン
        <div key={student.Id + '-lane'} style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '10px 0', minHeight: '60px' }}>
          <div style={{ width: '80px', flexShrink: 0, fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
            <img src={`https://assets.schaledb.com/ui/StudentPortraits/${student.Id}.webp`} alt={student.Name} style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '5px', border: '1px solid #007BFF' }} />
            {student.Name}
          </div>
          <div style={{ flexGrow: 1, height: '100%', position: 'relative', background: 'rgba(0,123,255,0.05)', borderRadius: '5px' }}>
            {/* ここにスキルアイコンをドラッグ＆ドロップで配置するエリア */}
            <div style={{ position: 'absolute', left: '150px', top: '5px', background: '#6A5ACD', color: 'white', padding: '5px', borderRadius: '5px', fontSize: '0.7em' }}>
              EXスキル (30s)
            </div>
          </div>
        </div>
      ))}

      {/* ボス行動レーン */}
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid rgba(0,0,0,0.1)', padding: '10px 0', minHeight: '60px' }}>
        <div style={{ width: '80px', flexShrink: 0, fontWeight: 'bold', color: '#CC0000' }}>ボス</div>
        <div style={{ flexGrow: 1, height: '100%', position: 'relative', background: 'rgba(204,0,0,0.05)', borderRadius: '5px' }}>
          <div style={{ position: 'absolute', left: '250px', top: '5px', background: '#CC0000', color: 'white', padding: '5px', borderRadius: '5px', fontSize: '0.7em' }}>
            大技発動 (50s)
          </div>
        </div>
      </div>

      {/* セグメント区切り（仮） */}
      <div style={{ position: 'absolute', top: 0, bottom: 0, left: 'calc(80px + 400px)', width: '5px', background: 'orange', zIndex: 5, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ writingMode: 'vertical-rl', textOrientation: 'upright', color: 'white', background: 'orange', padding: '5px', borderRadius: '3px', fontSize: '0.8em' }}>P2 開始</span>
      </div>
    </main>
  );
}

export default MainTimeline;
