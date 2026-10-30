import { useRef, useState } from 'react'
import '../css/lockScreenCss.css'
import 'pretendard/dist/web/static/pretendard.css'
import { HomeWallpaper } from '../common/homeWallpaper'

const PASSCODE = "1234"; // 4자리 비밀번호
const SWIPE_THRESHOLD = 80;

const KEYS = [
  { num: "1", letters: "" },
  { num: "2", letters: "ABC" },
  { num: "3", letters: "DEF" },
  { num: "4", letters: "GHI" },
  { num: "5", letters: "JKL" },
  { num: "6", letters: "MNO" },
  { num: "7", letters: "PQRS" },
  { num: "8", letters: "TUV" },
  { num: "9", letters: "WXYZ" },
];

interface LockScreenProps {
  onSuccess?: (destination?: string) => void;
  showStatusBar?: boolean;
}

export const LockScreen = ({ onSuccess }: LockScreenProps) => {
  const [showPasscode, setShowPasscode] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [pin, setPin] = useState("");
  const [shake, setShake] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const [postUnlockDestination, setPostUnlockDestination] = useState<string | null>(null);
  const startY = useRef<number | null>(null);

  /* ---------- 위로 밀기 제스처 ---------- */
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (showPasscode) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    startY.current = e.clientY;
    setDragging(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (startY.current === null || showPasscode) return;
    const delta = e.clientY - startY.current;
    setDragY(Math.min(0, delta));
  };

  const handlePointerUp = () => {
    if (startY.current === null || showPasscode) return;
    if (dragY < -SWIPE_THRESHOLD) {
      setPostUnlockDestination(null);
      setShowPasscode(true);
    }
    startY.current = null;
    setDragging(false);
    setDragY(0);
  };

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (showPasscode) return;
    if (e.deltaY > 30) {
      setPostUnlockDestination(null);
      setShowPasscode(true);
    }
  };

  /* ---------- 비밀번호 입력 로직 ---------- */
  const handleKey = (n: string) => {
    if (pin.length >= 4 || unlocking) return;
    const next = pin + n;
    setPin(next);
    if (next.length === 4) {
      setTimeout(() => {
        if (next === PASSCODE) {
          setUnlocking(true);
        } else {
          setShake(true);
          setTimeout(() => {
            setShake(false);
            setPin("");
          }, 400);
        }
      }, 150);
    }
  };

  const handleUnlockTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && e.propertyName === 'transform' && unlocking) {
      onSuccess?.(postUnlockDestination ?? undefined);
    }
  };

  const handleDelete = () => setPin(pin.slice(0, -1));

  const handleCancel = () => {
    setPin("");
    setPostUnlockDestination(null);
    setShowPasscode(false);
  };

  return (
    <div
      className={`lock-wrapper${unlocking ? ' unlocking' : ''}`}
      onTransitionEnd={handleUnlockTransitionEnd}
    >
      {/* 배경 사진 (공통) */}
      <HomeWallpaper className="lock-bg" />

    
        <div className="status-bar fixed-status-bar">
          <span className="status-carrier">LG U+</span>
          <div className="dynamic-island">
            <svg width="15" height="17" viewBox="0 0 15 17" fill="none">
              <path d="M3.5 7V5a4 4 0 1 1 8 0v2" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <rect x="1" y="7" width="13" height="9" rx="5" fill="#fff" />
            </svg>
          </div>
          <div className="status-right">
            <svg width="18" height="12" viewBox="0 0 18 12" fill="#fff">
              <rect x="0" y="7.5" width="3" height="4.5" rx="0.8" />
              <rect x="5" y="5" width="3" height="7" rx="0.8" />
              <rect x="10" y="2.5" width="3" height="9.5" rx="0.8" />
              <rect x="15" y="0" width="3" height="12" rx="0.8" />
            </svg>
            <span className="status-5g">5G</span>
            <div className="battery">74</div>
          </div>
        </div>
      

      {/* ===== 2. 암호 입력 화면 (상태바 아래에 등장) ===== */}
      <div className={`passcode-screen ${showPasscode ? 'active' : ''}`}>
        <div className="passcode-title">
          암호 입력
        </div>

        <div className={`passcode-dots ${shake ? 'shake' : ''}`}>
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={`passcode-dot ${i < pin.length ? 'filled' : ''}`} />
          ))}
        </div>

        <div className="passcode-keypad">
          {KEYS.map((k) => (
            <button key={k.num} className="key-btn" onClick={() => handleKey(k.num)}>
              <span className="key-num">{k.num}</span>
              <span className="key-letters">{k.letters || "\u00A0"}</span>
            </button>
          ))}
          <button className="key-btn empty" />
          <button className="key-btn" onClick={() => handleKey("0")}>
            <span className="key-num">0</span>
          </button>
          <button className="key-btn empty" />
        </div>

        <div className="passcode-footer">
          <button className="passcode-footer-btn">긴급 상황</button>
          <button className="passcode-footer-btn" onClick={pin.length > 0 ? handleDelete : handleCancel}>
            {pin.length > 0 ? "삭제" : "취소"}
          </button>
        </div>

        <div className="home-indicator-wrapper" style={{ paddingBottom: '8px' }}>
          <div className="home-indicator" />
        </div>
      </div>

      {/* ===== 3. 기본 잠금화면 컨텐츠 (시계, 위젯, 하단바) ===== */}
      <div
        className="lock-screen-content"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onWheel={handleWheel}
        style={{
          transform: showPasscode ? 'translateY(-100%)' : `translateY(${dragY}px)`,
          transition: dragging ? 'none' : 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
          opacity: showPasscode ? 0 : 1,
        }}
      >
        {/* 날짜 & 시계 */}
        <div className="time-container">
          <div className="lock-date">7월 14일 (화)</div>
          <div className="lock-time">4:23</div>
        </div>

        {/* 위젯 */}
        <div className="widgets-container">
          <div className="widget-item widget-weather">
            <div className="widget-weather-top">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
              <span>32°</span>
            </div>
            <div className="widget-weather-text">맑음</div>
            <div className="widget-weather-range">최고:35° 최저:28°</div>
          </div>
          <div
            className="widget-item widget-schedule"
            onClick={() => {
              setPostUnlockDestination('/calendarmain');
              setPin("");
              setShowPasscode(true);
            }}
          >
            천사랑 3주년 ㅎㅎ
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="bottom-bar">
          <button className="lock-quick-btn" aria-label="Flashlight">
            <svg width="18" height="24" viewBox="0 0 22 30" fill="#fff">
              <path d="M3 0h16a1 1 0 0 1 1 1v3a2 2 0 0 1-.6 1.4L17 8v19a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V8L2.6 5.4A2 2 0 0 1 2 4V1a1 1 0 0 1 1-1z" />
              <rect x="9" y="11" width="4" height="6" rx="2" fill="rgba(60,60,60,0.8)" />
            </svg>
          </button>
          <button className="lock-quick-btn" aria-label="Camera">
            <svg width="24" height="20" viewBox="0 0 34 28" fill="#fff">
              <path d="M11 0h12l2.5 4H30a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h4.5z" />
              <circle cx="17" cy="15" r="6.5" fill="rgba(60,60,60,0.8)" />
              <circle cx="17" cy="15" r="4" fill="#fff" />
            </svg>
          </button>
        </div>

        {/* 홈 바 */}
        <div className="home-indicator-wrapper_main">
          <div className="home-indicator" />
        </div>
      </div>
    </div>
  );
};

export default LockScreen;