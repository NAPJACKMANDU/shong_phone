import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import '../css/homeScreenCss.css'
import { useNavigate } from 'react-router-dom';


/* ===================== 앱 아이콘 (SVG, 60x60) ===================== */
const IconFaceTime = () => (
    <svg viewBox="0 0 60 60">
        <defs>
            <linearGradient id="ft-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#6fe068" />
                <stop offset="1" stopColor="#35b84a" />
            </linearGradient>
        </defs>
        <rect width="60" height="60" fill="url(#ft-g)" />
        <rect x="9" y="17" width="29" height="26" rx="7" fill="#fff" />
        <path d="M40 25 L49 19 Q51 18 51 21 V39 Q51 42 49 41 L40 35 Z" fill="#fff" />
    </svg>
)

const IconPhotos = () => (
    <svg viewBox="0 0 60 60">
        <rect width="60" height="60" fill="#fff" />
        {['#f7a93b', '#f2e04c', '#7ccb6b', '#4db6a0', '#5a9fe0', '#8d72cc', '#cc5fa5', '#ec5d4b'].map((c, i) => (
            <ellipse key={c} cx="30" cy="18" rx="7.5" ry="12" fill={c} opacity="0.85"
                transform={`rotate(${i * 45} 30 30)`} style={{ mixBlendMode: 'multiply' }} />
        ))}
    </svg>
)

const IconCamera = () => (
    <svg viewBox="0 0 60 60">
        <defs>
            <linearGradient id="cam-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#d6d6da" />
                <stop offset="1" stopColor="#8a8a8f" />
            </linearGradient>
        </defs>
        <rect width="60" height="60" fill="url(#cam-g)" />
        <path d="M20 17 L22 12 H38 L40 17 Z" fill="#1c1c1e" />
        <rect x="8" y="17" width="44" height="29" rx="5" fill="#1c1c1e" />
        <circle cx="30" cy="31.5" r="10" fill="#2a2a2c" stroke="#cfcfd4" strokeWidth="2.2" />
        <circle cx="43.5" cy="22" r="1.6" fill="#f6c744" />
    </svg>
)

const IconNotes = () => (
    <svg viewBox="0 0 60 60">
        <defs>
            <linearGradient id="note-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fbdc5e" />
                <stop offset="1" stopColor="#f6c84a" />
            </linearGradient>
        </defs>
        <rect width="60" height="60" fill="#fff" />
        <rect width="60" height="17" fill="url(#note-g)" />
        <line x1="0" y1="17" x2="60" y2="17" stroke="#d2c27a" strokeWidth="1" strokeDasharray="1 2" />
        <line x1="0" y1="30" x2="60" y2="30" stroke="#d8d8dc" strokeWidth="1" />
        <line x1="0" y1="45" x2="60" y2="45" stroke="#d8d8dc" strokeWidth="1" />
    </svg>
)

const IconReminders = () => (
    <svg viewBox="0 0 60 60">
        <rect width="60" height="60" fill="#fff" />
        {[{ y: 15, c: '#2f7bf5' }, { y: 30, c: '#f0453a' }, { y: 45, c: '#f5a031' }].map((r) => (
            <g key={r.c}>
                <circle cx="11.5" cy={r.y} r="6" fill="none" stroke={r.c} strokeWidth="1.6" />
                <circle cx="11.5" cy={r.y} r="3.8" fill={r.c} />
                <line x1="22" y1={r.y} x2="53" y2={r.y} stroke="#c8c8cc" strokeWidth="1" />
            </g>
        ))}
    </svg>
)

const IconClock = () => (
    <svg viewBox="0 0 60 60">
        <rect width="60" height="60" fill="#111" />
        <circle cx="30" cy="30" r="28.5" fill="#fff" />
        {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => {
            const a = (n * 30 * Math.PI) / 180
            return (
                <text key={n} x={30 + 22 * Math.sin(a)} y={30 - 22 * Math.cos(a) + 2.5}
                    textAnchor="middle" fontSize="7" fontWeight="500" fill="#1c1c1e">{n}</text>
            )
        })}
        <line x1="30" y1="30" x2="30" y2="17" stroke="#1c1c1e" strokeWidth="2.4" strokeLinecap="round" transform="rotate(41 30 30)" />
        <line x1="30" y1="30" x2="30" y2="9" stroke="#1c1c1e" strokeWidth="2" strokeLinecap="round" transform="rotate(132 30 30)" />
        <line x1="30" y1="36" x2="30" y2="8" stroke="#f5a623" strokeWidth="1" strokeLinecap="round" transform="rotate(255 30 30)" />
        <circle cx="30" cy="30" r="1.8" fill="#1c1c1e" />
    </svg>
)

const IconAppStore = () => (
    <svg viewBox="0 0 60 60">
        <defs>
            <linearGradient id="as-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#32b8fb" />
                <stop offset="1" stopColor="#1a68ee" />
            </linearGradient>
        </defs>
        <rect width="60" height="60" fill="url(#as-g)" />
        <g stroke="#fff" strokeWidth="4.6" strokeLinecap="round" fill="none">
            <path d="M30 14 L45 43" />
            <path d="M30 14 L17 40" />
            <path d="M13 36 H47" />
        </g>
    </svg>
)

const IconMaps = () => (
    <svg viewBox="0 0 60 60">
        <rect width="60" height="60" fill="#f2dfe8" />
        <path d="M0 0 H16 L0 18 Z" fill="#a3dc9c" />
        <path d="M26 0 H60 V42 L36 24 Z" fill="#7fc978" />
        <path d="M43 0 Q58 4 60 18" stroke="#cbcbce" strokeWidth="4" fill="none" />
        <path d="M60 44 V60 H36 Z" fill="#f6c944" />
        <rect x="16" y="0" width="9" height="36" fill="#3b82f6" />
        <circle cx="23" cy="37" r="15" fill="#fff" />
        <circle cx="23" cy="37" r="12" fill="#2f7bf5" />
        <path d="M23 28 L30 44 L23 40 L16 44 Z" fill="#fff" />
    </svg>
)

const IconSettings = () => (
    <svg viewBox="0 0 60 60">
        <defs>
            <linearGradient id="set-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#d9d9dc" />
                <stop offset="1" stopColor="#8a8a8f" />
            </linearGradient>
        </defs>
        <rect width="60" height="60" fill="url(#set-g)" />
        <circle cx="30" cy="30" r="25" fill="none" stroke="#48484a" strokeWidth="4" strokeDasharray="3.1 3.1" />
        <circle cx="30" cy="30" r="22" fill="#5a5a5d" />
        <circle cx="30" cy="30" r="16" fill="#3a3a3c" stroke="#b0b0b5" strokeWidth="1.6" />
        <g stroke="#c8c8cc" strokeWidth="1.5" strokeLinecap="round">
            <line x1="30" y1="30" x2="30" y2="42" />
            <line x1="30" y1="30" x2="19.6" y2="24" />
            <line x1="30" y1="30" x2="40.4" y2="24" />
        </g>
        <circle cx="30" cy="30" r="3" fill="#3a3a3c" stroke="#c8c8cc" strokeWidth="1.2" />
    </svg>
)

const IconPhone = () => (
    <svg viewBox="0 0 60 60">
        <defs>
            <linearGradient id="ph-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#6ee96b" />
                <stop offset="1" stopColor="#2eb843" />
            </linearGradient>
        </defs>
        <rect width="60" height="60" fill="url(#ph-g)" />
        <path transform="translate(11 11) scale(1.6)" fill="#fff"
            d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
)

const IconSafari = () => (
    <svg viewBox="0 0 60 60">
        <defs>
            <linearGradient id="sf-g" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#52bdf7" />
                <stop offset="1" stopColor="#1d62e0" />
            </linearGradient>
        </defs>
        <rect width="60" height="60" fill="#fff" />
        <circle cx="30" cy="30" r="26" fill="url(#sf-g)" />
        <circle cx="30" cy="30" r="23.5" fill="none" stroke="#fff" strokeWidth="2.6" strokeDasharray="0.7 2.6" />
        <path d="M45 15 L33.5 33.5 L26.5 26.5 Z" fill="#ff3b30" />
        <path d="M15 45 L33.5 33.5 L26.5 26.5 Z" fill="#fff" />
    </svg>
)

const IconMessages = () => (
    <svg viewBox="0 0 60 60">
        <defs>
            <linearGradient id="msg-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#6ee96b" />
                <stop offset="1" stopColor="#2eb843" />
            </linearGradient>
        </defs>
        <rect width="60" height="60" fill="url(#msg-g)" />
        <ellipse cx="30" cy="28" rx="22" ry="14.5" fill="#fff" />
        <path d="M17 32 Q16 40 9 44 Q19 45 25 37 Z" fill="#fff" />
    </svg>
)

const IconMusic = () => (
    <svg viewBox="0 0 60 60">
        <defs>
            <linearGradient id="mu-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#fc5c75" />
                <stop offset="1" stopColor="#e32a3a" />
            </linearGradient>
        </defs>
        <rect width="60" height="60" fill="url(#mu-g)" />
        <polygon points="24,15 45,10 45,18 24,23" fill="#fff" />
        <rect x="22" y="15" width="3.2" height="25" fill="#fff" />
        <rect x="42" y="10" width="3.2" height="25" fill="#fff" />
        <ellipse cx="18.5" cy="40" rx="6.5" ry="5" fill="#fff" />
        <ellipse cx="38.5" cy="35" rx="6.5" ry="5" fill="#fff" />
    </svg>
)

const IconKakaoTalk = () => (
    <svg viewBox="0 0 60 60" style={{ width: '100%', height: '100%', display: 'block' }}>
        {/* iOS 앱 아이콘 스타일의 둥근 모서리 배경 */}
        <rect width="60" height="60" rx="13.5" fill="#fee500" />
        
        {/* 카카오톡 말풍선 본체 */}
        <ellipse cx="30" cy="27.5" rx="21" ry="16.5" fill="#3b1e1e" />
        
        {/* 말풍선 꼬리 (왼쪽 아래로 자연스럽게 뾰족한 형태) */}
        <path d="M17 38 L12 47.5 L23 41.5 Z" fill="#3b1e1e" />
        
        {/* 중앙 'TALK' 텍스트 */}
        <text 
            x="30" 
            y="32" 
            textAnchor="middle" 
            fontSize="12.5" 
            fontWeight="800" 
            letterSpacing="-0.5" 
            fill="#fee500"
            fontFamily="system-ui, -apple-system, sans-serif"
        >
            TALK
        </text>
    </svg>
)

const IconInstagram = () => (
  <svg viewBox="0 0 60 60" style={{ width: '100%', height: '100%', display: 'block' }}>
    <defs>
      {/* Officieel Instagram kleurverloop van linksonder naar rechtsboven */}
      <linearGradient id="ig-gradient" x1="0.15" y1="0.85" x2="0.85" y2="0.15">
        <stop offset="0%" stopColor="#ffd600" />
        <stop offset="25%" stopColor="#ff7a00" />
        <stop offset="50%" stopColor="#ff0069" />
        <stop offset="75%" stopColor="#d300c5" />
        <stop offset="100%" stopColor="#7638fa" />
      </linearGradient>
    </defs>

    {/* Afgeronde achtergrond (App Icon vorm) */}
    <rect width="60" height="60" rx="13.5" fill="url(#ig-gradient)" />

    {/* Witte buitenste afgeronde vierkant */}
    <rect
      x="11.5"
      y="11.5"
      width="37"
      height="37"
      rx="10.5"
      fill="none"
      stroke="#fff"
      strokeWidth="3.6"
    />

    {/* Centrale camera-cirkel */}
    <circle
      cx="30"
      cy="30"
      r="8.8"
      fill="none"
      stroke="#fff"
      strokeWidth="3.6"
    />

    {/* Flitser stip */}
    <circle cx="40.5" cy="19.5" r="2.2" fill="#fff" />
  </svg>
);

const IconMelon = () => (
    <svg viewBox="0 0 400 400">
        <rect width="400" height="400" fill="#fff" />
        <circle cx="192" cy="231" r="72" fill="none" stroke="#05e431" strokeWidth="56" />
        <circle cx="292" cy="97" r="38" fill="#05e431" />
    </svg>
)

const IconYouTube = () => (
    <svg viewBox="0 0 60 60">
        <rect width="60" height="60" fill="#fff" />
        <rect x="7" y="15" width="46" height="31" rx="9.5" fill="#ff0000" />
        <path d="M25 23 L25 38 L38.5 30.5 Z" fill="#fff" />
    </svg>
)

const IconCGV = () => (
    <svg viewBox="0 0 512 512">
        <rect width="512" height="512" fill="#fff" />
        <g fill="none" stroke="#ee3124" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round">
            <path d="M166.6 238.2 A52 55 0 1 0 166.6 311.8" />
            <path d="M274.8 239.6 A48 55 0 1 0 286 275 H254" />
            <path d="M298 228 L345 322 L395 225" />
        </g>
        <g strokeWidth="11" strokeLinecap="round">
            <line x1="445.0" y1="177.0" x2="445.0" y2="161.0" stroke="#f58220" />
            <line x1="454.2" y1="180.8" x2="465.5" y2="169.5" stroke="#ee3124" />
            <line x1="458.0" y1="190.0" x2="474.0" y2="190.0" stroke="#f58220" />
            <line x1="454.2" y1="199.2" x2="465.5" y2="210.5" stroke="#ee3124" />
            <line x1="445.0" y1="203.0" x2="445.0" y2="219.0" stroke="#f58220" />
            <line x1="435.8" y1="199.2" x2="424.5" y2="210.5" stroke="#ee3124" />
            <line x1="432.0" y1="190.0" x2="416.0" y2="190.0" stroke="#f58220" />
            <line x1="435.8" y1="180.8" x2="424.5" y2="169.5" stroke="#ee3124" />
        </g>
    </svg>
)

const IconSetlog = () => (
    <svg viewBox="0 0 60 60">
        <defs>
            <linearGradient id="sl-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#d3c3fa" />
                <stop offset="1" stopColor="#c0aaf2" />
            </linearGradient>
            <radialGradient id="sl-face" cx="0.5" cy="0.45" r="0.6">
                <stop offset="0" stopColor="#ffedc6" />
                <stop offset="1" stopColor="#ffe3b0" />
            </radialGradient>
        </defs>
        <rect width="60" height="60" fill="url(#sl-bg)" />
        <circle cx="30" cy="30" r="23.5" fill="url(#sl-face)" stroke="#fff6e4" strokeWidth="0.9" />
        <path d="M13.3 29.3 A16.85 12.8 0 0 1 47 29.3" fill="none" stroke="#1c1c1c" strokeWidth="1.5" strokeLinecap="round" />
        <ellipse cx="23.2" cy="38.2" rx="1.6" ry="3.2" fill="#1c1c1c" />
        <ellipse cx="36.4" cy="38.2" rx="1.6" ry="3.2" fill="#1c1c1c" />
    </svg>
)

/* ===================== 데이터 ===================== */
interface AppData {
    name: string;
    icon: ReactNode;
    badge?: number;
}

const CALENDAR_ICON = (
    <>
        <div className="cal-icon-day">금요일</div>
        <div className="cal-icon-date">20</div>
    </>
)

// 앱 목록 순서대로 화면 크기에 맞춰 페이지를 나눕니다.
const PAGE1_APPS: AppData[] = [
    { name: "FaceTime", icon: <IconFaceTime /> },
    { name: "캘린더", icon: CALENDAR_ICON },
    { name: "사진", icon: <IconPhotos /> },
    { name: "카메라", icon: <IconCamera /> },
    { name: "메모", icon: <IconNotes /> },
    { name: "미리 알림", icon: <IconReminders /> },
    { name: "시계", icon: <IconClock /> },
    { name: "App Store", icon: <IconAppStore /> },
    { name: "지도", icon: <IconMaps /> },
    { name: "설정", icon: <IconSettings /> },
    { name: "카카오톡", icon: <IconKakaoTalk /> },
    { name: "Instagram", icon: <IconInstagram /> },
    { name: "멜론", icon: <IconMelon /> },
    { name: "YouTube", icon: <IconYouTube /> },
    { name: "CGV", icon: <IconCGV /> },
];

const PAGE2_APPS: AppData[] = [
    { name: "Setlog", icon: <IconSetlog /> },
];

const ALL_APPS = [...PAGE1_APPS, ...PAGE2_APPS];
const GRID_COLUMNS = 4;

const getHomeLayout = (width: number, height: number) => {
    const unit = Math.min(width, 430) / 390;
    const rowGap = Math.min(
        40 * unit,
        18 * unit + Math.max(0, height - 844 * unit) * 0.08,
    );
    const getRows = (top: number) =>
        Math.max(
            0,
            Math.floor(
                (height - 116 * unit - top * unit + rowGap) /
                (80 * unit + rowGap),
            ),
        );

    const firstPageCapacity = Math.min(16, getRows(273) * GRID_COLUMNS);
    const otherPageCapacity = Math.max(1, getRows(77)) * GRID_COLUMNS;
    const pages = [ALL_APPS.slice(0, firstPageCapacity)];

    for (let index = firstPageCapacity; index < ALL_APPS.length; index += otherPageCapacity) {
        pages.push(ALL_APPS.slice(index, index + otherPageCapacity));
    }

    return { pages, rowGap };
};

const DOCK_APPS: AppData[] = [
    { name: "전화", icon: <IconPhone /> },
    { name: "Safari", icon: <IconSafari /> },
    { name: "메시지", icon: <IconMessages />, badge: 8 },
    { name: "음악", icon: <IconMusic /> },
];

/* ===================== 컴포넌트 ===================== */
export const HomeScreen = () => {
    const homeRef = useRef<HTMLDivElement>(null);
    const pagerRef = useRef<HTMLDivElement>(null);
    const [page, setPage] = useState(0);
    const navigate = useNavigate();
    const [layout, setLayout] = useState(() =>
        getHomeLayout(Math.min(window.innerWidth, 430), window.innerHeight),
    );

    useEffect(() => {
        const home = homeRef.current;
        if (!home) return;

        const updateLayout = () => {
            const { width, height } = home.getBoundingClientRect();
            const nextLayout = getHomeLayout(width, height);

            setLayout((current) => {
                const pagesUnchanged =
                    current.pages.length === nextLayout.pages.length &&
                    current.pages.every((apps, index) => apps.length === nextLayout.pages[index].length);

                return pagesUnchanged && current.rowGap === nextLayout.rowGap
                    ? current
                    : nextLayout;
            });
        };

        const observer = new ResizeObserver(updateLayout);
        observer.observe(home);
        updateLayout();

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const pager = pagerRef.current;
        if (!pager) return;

        const activePage = Math.min(page, layout.pages.length - 1);
        pager.scrollLeft = activePage * pager.clientWidth;
    }, [layout, page]);

    const handleScroll = () => {
        const el = pagerRef.current;
        if (!el) return;
        if (el.clientWidth > 0) {
            setPage(Math.round(el.scrollLeft / el.clientWidth));
        }
    };

// 앱 클릭 시 실행될 이동 함수
    const handleAppClick = (appName: string) => {
        switch (appName) {
            case "카카오톡":
                navigate("/KakaoChatList"); // 카카오톡을 누르면 이동할 경로
                break;
            case "Instagram":
                navigate("/instagram"); // 인스타그램을 누르면 이동할 경로
                break;
            case "설정":
                navigate("/settings"); // 설정으로 이동
                break;
            default:
                // 그 외 앱은 일반 상세 페이지나 동적 경로로 이동 (예: /app/사진)
                navigate(`/app/${appName}`);
                break;
        }
    };

    const activePage = Math.min(page, layout.pages.length - 1);

    const renderApps = (list: AppData[]) =>
        list.map((app) => (
            <div 
                key={app.name} 
                className="app-item"
                onClick={() => handleAppClick(app.name)} // 3. onClick 이벤트 연결
                style={{ cursor: 'pointer' }} // 마우스 올렸을 때 손가락 모양으로 변경
            >
                <div className="app-icon-wrap">
                    <div className="app-icon">{app.icon}</div>
                </div>
                <span className="app-label">{app.name}</span>
            </div>
        ));

    return (
        <div
            className="home-wrapper"
            ref={homeRef}
            style={{ '--home-grid-row-gap': `${layout.rowGap}px` } as CSSProperties}
        >
            {/* 배경화면 (화면 크기에 맞춰 꽉 채움) */}
            <svg className="home-bg" viewBox="0 0 390 844" preserveAspectRatio="xMidYMid slice">
                <defs>
                    <linearGradient id="bg-base" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#4a0b1f" />
                        <stop offset="0.12" stopColor="#5a0d1c" />
                        <stop offset="0.2" stopColor="#9a1b14" />
                        <stop offset="0.3" stopColor="#e8302a" />
                        <stop offset="1" stopColor="#e8302a" />
                    </linearGradient>
                    <radialGradient id="bg-dark" cx="0" cy="0.1" r="0.6">
                        <stop offset="0" stopColor="#2c0627" stopOpacity="0.95" />
                        <stop offset="1" stopColor="#2c0627" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="bg-orange" x1="0" y1="1" x2="1" y2="0">
                        <stop offset="0" stopColor="#ee6a35" />
                        <stop offset="0.5" stopColor="#f0a63c" />
                        <stop offset="1" stopColor="#f2b24c" />
                    </linearGradient>
                    <radialGradient id="bg-peach" cx="0.5" cy="0.5" r="0.5">
                        <stop offset="0" stopColor="#f2a597" stopOpacity="0.9" />
                        <stop offset="1" stopColor="#f2a597" stopOpacity="0" />
                    </radialGradient>
                    <linearGradient id="bg-magenta" gradientUnits="userSpaceOnUse" x1="0" y1="440" x2="0" y2="730">
                        <stop offset="0" stopColor="#c458d8" />
                        <stop offset="0.3" stopColor="#dd4fc8" />
                        <stop offset="0.5" stopColor="#ee52b5" />
                        <stop offset="0.75" stopColor="#d44ad8" />
                        <stop offset="1" stopColor="#8f60e6" />
                    </linearGradient>
                    <linearGradient id="bg-cyan" gradientUnits="userSpaceOnUse" x1="390" y1="560" x2="120" y2="820">
                        <stop offset="0" stopColor="#f2fdff" />
                        <stop offset="0.45" stopColor="#8aeaff" />
                        <stop offset="1" stopColor="#5fc2ff" />
                    </linearGradient>
                </defs>
                <rect width="390" height="844" fill="url(#bg-base)" />
                <rect width="390" height="844" fill="url(#bg-dark)" />
                <path d="M95 440 C190 365 290 270 390 205 L390 470 C340 440 290 455 230 455 C170 457 130 440 95 440 Z" fill="url(#bg-orange)" />
                <ellipse cx="370" cy="410" rx="90" ry="85" fill="url(#bg-peach)" />
                <path d="M0 438 C50 428 110 452 200 452 C270 452 330 440 390 470 V844 H0 Z" fill="url(#bg-magenta)" />
                <path d="M0 700 C80 738 190 738 250 692 C310 646 360 600 390 560 V844 H0 Z" fill="url(#bg-cyan)" />
            </svg>

            {/* 상태바 */}
            <div className="home-status">
                <span className="hs-time">1:22</span>
                <div className="hs-right">
                    <svg className="hs-signal" viewBox="0 0 18 12" fill="#fff">
                        <rect x="0" y="8" width="3.2" height="4" rx="1" />
                        <rect x="4.9" y="5.5" width="3.2" height="6.5" rx="1" />
                        <rect x="9.8" y="3" width="3.2" height="9" rx="1" />
                        <rect x="14.7" y="0" width="3.2" height="12" rx="1" />
                    </svg>
                    <svg className="hs-wifi" viewBox="0 0 18 13" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                        <path d="M1.2 4.6a11 11 0 0 1 15.6 0" />
                        <path d="M4 7.6a7 7 0 0 1 10 0" />
                        <path d="M6.7 10.2a3.2 3.2 0 0 1 4.6 0" />
                        <circle cx="9" cy="12" r="0.8" fill="#fff" />
                    </svg>
                    <div className="hs-battery">73</div>
                </div>
            </div>

            {/* 페이지 (좌우로 넘기기) */}
            <div className="home-pages" ref={pagerRef} onScroll={handleScroll}>
            <div className="home-page">
            {/* 위젯 */}
            <div className="home-widgets">
                <div className="widget-wrap">
        <div className="widget main-widget-weather">
            {/* 상단: 지역명 + 위치 화살표 */}
            <div className="weather-location">
                <span>서울특별시</span>
                <svg className="location-arrow" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21 3L3 10.53v.98l6.84 2.65L12.49 21h.98L21 3z" />
                </svg>
            </div>

            {/* 대표 온도 */}
            <div className="weather-temp">21°</div>

            {/* 하단: 날씨 아이콘 & 설명 & 최고/최저 온도 */}
            <div className="weather-bottom">
                <div className="weather-icon">
                    {/* 구름 뒤 해 아이콘 (부분적으로 흐림) */}
                    <svg viewBox="0 0 32 32" fill="none">
                        <circle cx="21" cy="11" r="4.5" fill="#FFD60A" />
                        <path d="M21 3.5v2M21 16.5v2M28.5 11h-2M15.5 11h-2M26.3 5.7l-1.4 1.4M17.1 14.9l-1.4 1.4M26.3 16.3l-1.4-1.4M17.1 7.1l-1.4-1.4" stroke="#FFD60A" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M10 24.5a5.5 5.5 0 0110.8-1.5 4 4 0 013.2 3.9c0 2.3-1.8 4.1-4 4.1H10a5.5 5.5 0 010-11z" fill="#FFFFFF" />
                    </svg>
                </div>
                <div className="weather-desc">부분적으로 흐림</div>
                <div className="weather-range">최고:21° 최저:11°</div>
            </div>
        </div>
        <span className="widget-label">날씨</span>
    </div>
                {/* 캘린더 위젯 */}
              <div className="widget-wrap">
                  <div className="widget widget-calendar">
                      <div className="widget-cal-day">화요일</div>
                      <div className="widget-cal-date">20</div>
                      
                      {/* 하단 일정 블록 (분홍색 포인트 바 + 텍스트) */}
                      <div className="widget-cal-event-box">
                          <div className="widget-cal-bar" />
                          <div className="widget-cal-text-group">
                              <div className="widget-cal-title">천사랑 3주년 ㅎㅎ</div>
                              <div className="widget-cal-time">오전 12시 ~ 1시</div>
                          </div>
                      </div>
                  </div>
                  <span className="widget-label">캘린더</span>
              </div>
            </div>

            {/* 앱 아이콘 */}
            <div className="home-grid">
                {renderApps(layout.pages[0] ?? [])}
            </div>
            </div>

            {layout.pages.slice(1).map((apps, index) => (
                <div className="home-page" key={index + 1}>
                    <div className="home-grid page-top">
                        {renderApps(apps)}
                    </div>
                </div>
            ))}
            </div>

            {/* 페이지 점 */}
            <div className="home-dots">
                {layout.pages.map((_, i) => (
                    <span key={i} className={`home-dot ${activePage === i ? 'active' : ''}`} />
                ))}
            </div>

            {/* 검색 */}
            <button className="home-search">
                <svg viewBox="0 0 12 12" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round">
                    <circle cx="5" cy="5" r="3.6" />
                    <path d="M8 8 L11 11" />
                </svg>
                <span>검색</span>
            </button>

            {/* 독 */}
            <div className="home-dock">
                {DOCK_APPS.map((app) => (
                    <div key={app.name} className="app-icon-wrap">
                        <div className="app-icon">{app.icon}</div>
                        {app.badge ? <span className="app-badge">{app.badge}</span> : null}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default HomeScreen;