import React from 'react';

function MainTimeline({ students }) {
  const studentList = Object.values(students);

  // タイムラインの表示設定
  const timelineDuration = 120; // タイムラインの秒数 (例: 120秒 = 2分)
  const secondsPerPixel = 5; // 100px あたり何秒とするか (例: 5秒 / 100px = 50px/秒)
  const laneHeight = 80; // 各生徒レーンの高さ
  const timelineWidth = (timelineDuration / secondsPerPixel) * 100; // タイムライン全体の幅 (px)

  const getStudentIconPath = (studentId) => {
    // public フォルダからの絶対パス。拡張子は実際のファイルに合わせてください
    return `/images/student/icon/${studentId}.webp`; // または .png
  };

  return (
    <main className="ba-panel" style={{
      flexGrow: 1,
      position: 'relative',
      overflowX: 'auto', // 横スクロールを可能にする
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgba(240, 242, 245, 0.9)', // 少し明るめの背景
      borderRadius: '12px',
      margin: '10px'
    }}>
      <h2 style={{ fontSize: '1.4em', color: '#007BFF', marginBottom: '15px', borderBottom: '2px solid rgba(0,0,0,0.1)', paddingBottom: '10px' }}>
        タイムラインビュー
      </h2>

      {/* コストバーと設定 */}
      <div style={{
        position: 'sticky', // スクロールしても追従
        top: '0px',
        left: '0px',
        right: '0px',
        zIndex: 10,
        background: 'rgba(50, 50, 70, 0.9)', // ダークな半透明背景
        color: 'white',
        padding: '10px 20px',
        borderRadius: '8px',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
      }}>
        <div style={{ fontSize: '1.1em', fontWeight: 'bold' }}>
          現在コスト: <span style={{ color: '#FFD700' }}>50</span> / 100
        </div>
        <button className="ba-button" style={{ background: '#6A5ACD' }}>TL設定</button>
      </div>

      {/* タイムライン本体のコンテナ */}
      <div style={{
        position: 'relative',
        width: `${timelineWidth + 100}px`, // 生徒名エリア + タイムライン幅
        minHeight: '400px', // 最低限の高さ
        border: '1px solid rgba(0,0,0,0.1)',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: 'white',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
      }}>
        {/* 時間軸のグリッド */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '100px', // 生徒名エリアの幅
          width: `${timelineWidth}px`,
          height: '100%',
          backgroundImage: `
            repeating-linear-gradient(to right, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 100px), /* 10秒ごとの太い線 */
            repeating-linear-gradient(to right, rgba(0,0,0,0.02) 0px, rgba(0,0,0,0.02) 1px, transparent 1px, transparent 10px)  /* 1秒ごとの細い線 */
          `,
          backgroundSize: `100px 100%, 10px 100%`,
          pointerEvents: 'none', // クリックイベントを通過させる
          zIndex: 0
        }}></div>

        {/* 時間ラベル */}
        <div style={{
          display: 'flex',
          position: 'sticky',
          left: '100px', // 生徒名エリアの幅に合わせる
          width: `${timelineWidth}px`,
          top: '0',
          paddingBottom: '5px',
          borderBottom: '1px solid rgba(0,0,0,0.2)',
          background: 'white',
          zIndex: 5
        }}>
          {Array.from({ length: timelineDuration / secondsPerPixel + 1 }, (_, i) => i * secondsPerPixel).map(time => (
            <div key={`time-label-${time}`} style={{
              minWidth: '100px', // 10秒ごとの幅
              textAlign: 'center',
              fontSize: '0.8em',
              color: '#555',
              fontWeight: 'bold',
              borderLeft: i > 0 ? '1px solid rgba(0,0,0,0.1)' : 'none'
            }}>
              {time}s
            </div>
          ))}
        </div>

        {/* 生徒レーンコンテナ */}
        <div style={{
          position: 'relative',
          width: '100%',
          paddingLeft: '100px', // 生徒名エリアの幅分
          boxSizing: 'border-box'
        }}>
          {studentList.slice(0, 4).map(student => ( // 例として最初の4人のレーン
            <div key={student.Id + '-lane'} style={{
              display: 'flex',
              alignItems: 'center',
              borderBottom: '1px solid rgba(0,0,0,0.1)',
              padding: '10px 0',
              minHeight: `${laneHeight}px`,
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                left: '-100px', // 生徒名エリアを左に配置
                width: '100px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(240, 242, 245, 0.8)', // 生徒名エリアの背景
                borderRight: '1px solid rgba(0,0,0,0.1)',
                padding: '5px'
              }}>
                <img
                  src={getStudentIconPath(student.Id)}
                  alt={student.Name}
                  style={{ width: '40px', height: '40px', borderRadius: '50%', marginBottom: '5px', border: '2px solid #007BFF', objectFit: 'cover' }}
                  onError={(e) => { e.target.onerror = null; e.target.src="/images/default_icon.webp" }}
                />
                <span style={{ fontSize: '0.8em', fontWeight: 'bold', color: '#333' }}>{student.Name}</span>
              </div>
              <div style={{
                flexGrow: 1,
                height: `${laneHeight}px`,
                position: 'relative',
                background: 'transparent', // グリッド線が見えるように透明に
                borderRadius: '5px',
                pointerEvents: 'auto' // このエリアでドラッグ＆ドロップを受け付ける
              }}>
                {/* 仮のスキル配置（後でドラッグ＆ドロップで追加） */}
                <div style={{
                  position: 'absolute',
                  left: '150px', // 例: 1.5秒 (150px/100px/秒 = 1.5秒)
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: '#6A5ACD',
                  color: 'white',
                  padding: '5px 8px',
                  borderRadius: '5px',
                  fontSize: '0.7em',
                  whiteSpace: 'nowrap'
                }}>
                  EXスキル (仮)
                </div>
              </div>
            </div>
          ))}

          {/* ボス行動レーン */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            padding: '10px 0',
            minHeight: `${laneHeight}px`,
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              left: '-100px',
              width: '100px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(240, 242, 245, 0.8)',
              borderRight: '1px solid rgba(0,0,0,0.1)',
              padding: '5px'
            }}>
              <span style={{ fontSize: '0.9em', fontWeight: 'bold', color: '#CC0000' }}>BOSS</span>
            </div>
            <div style={{ flexGrow: 1, height: `${laneHeight}px`, position: 'relative', background: 'transparent', borderRadius: '5px', pointerEvents: 'auto' }}>
              {/* 仮のボス行動表示 */}
              <div style={{
                position: 'absolute',
                left: '250px', // 例: 2.5秒
                top: '50%',
                transform: 'translateY(-50%)',
                background: '#CC0000',
                color: 'white',
                padding: '5px 8px',
                borderRadius: '5px',
                fontSize: '0.7em',
                whiteSpace: 'nowrap'
              }}>
                大技発動 (50s)
              </div>
            </div>
          </div>
        </div>

        {/* セグメント区切り（仮） */}
        <div style={{
          position: 'absolute',
          top: '0',
          bottom: '0',
          left: `calc(100px + ${40 * secondsPerPixel}px)`, // 例: 40秒の位置 (生徒名エリア + 40秒分の幅)
          width: '3px',
          background: 'orange',
          zIndex: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{
            writingMode: 'vertical-rl',
            textOrientation: 'upright',
            color: 'white',
            background: 'orange',
            padding: '5px',
            borderRadius: '3px',
            fontSize: '0.8em',
            fontWeight: 'bold'
          }}>P2 開始</span>
        </div>
      </div>
    </main>
  );
}

export default MainTimeline;
