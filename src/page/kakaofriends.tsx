import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/kakaofriends.css'

// 라우터 경로 (프로젝트 라우터에 맞게 수정하세요)
const PATH = {
    friends: '/kakaoFriends',
    chats: '/kakaoChatList',
}

/* ===================== 기본 프로필 ===================== */
const PROFILE_COLORS = {
    purple: ['#d9d5fc', '#b8b3f4'],
    blue: ['#a6d5fa', '#82b9f2'],
    teal: ['#b5ede5', '#89dbd0'],
}
type ProfileColor = keyof typeof PROFILE_COLORS

const Profile = ({ size, color = 'purple' }: { size: number; color?: ProfileColor }) => {
    const [top, bottom] = PROFILE_COLORS[color]
    const id = `kf-profile-${color}`
    return (
        <svg viewBox="0 0 48 48"
            style={{ width: `calc(var(--u) * ${size})`, height: `calc(var(--u) * ${size})`, display: 'block', flexShrink: 0 }}>
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={top} />
                    <stop offset="1" stopColor={bottom} />
                </linearGradient>
            </defs>
            <rect width="48" height="48" rx="17" fill={`url(#${id})`} />
            <circle cx="24" cy="19.5" r="6.6" fill="#fff" fillOpacity="0.92" />
            <path d="M12.5 36.5C12.5 30.5 17.5 28 24 28s11.5 2.5 11.5 8.5c0 1.5-1.2 2.3-2.5 2.3H15c-1.3 0-2.5-.8-2.5-2.3z"
                fill="#fff" fillOpacity="0.92" />
        </svg>
    )
}

/* ===================== 아이콘 ===================== */
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

const IconSearch = () => (
    <svg viewBox="0 0 24 24" {...stroke}>
        <circle cx="10.8" cy="10.8" r="7.6" />
        <path d="M16.6 16.6L21.5 21.5" />
    </svg>
)
const IconAddFriend = () => (
    <svg viewBox="0 0 24 24" {...stroke}>
        <circle cx="9.5" cy="7.6" r="4.3" />
        <path d="M2.6 21c0-4.6 3.2-7 6.9-7 1.5 0 2.8.4 3.9 1" />
        <path d="M19 14v7M15.5 17.5h7" />
    </svg>
)
const IconGift = () => (
    <svg viewBox="0 0 24 28" fill="none" stroke="#111" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M3 12L12 8l9 4v9.5L12 26l-9-4.5z" fill="#fff" />
        <path d="M12 17l9-5v9.5L12 26z" fill="#ffd21f" />
        <path d="M3 12l9 5 9-5M12 17v9" />
        <path d="M12 9C8 6.2 6.8 3.6 8.8 2.2c1.4-.9 2.8-.2 3.2 1 .4-1.2 1.8-1.9 3.2-1 2 1.4.8 4-3.2 6.8z" fill="#ff3b30" />
    </svg>
)
const IconGear = () => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
)
const IconChevron = ({ up = false }: { up?: boolean }) => (
    <svg className="kf-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        {up ? <polyline points="4 16 12 8 20 16" /> : <polyline points="4 8 12 16 20 8" />}
    </svg>
)

/* 추천친구 / 채널 아이콘 */
const IconRecommend = () => (
    <svg viewBox="0 0 48 48" style={{ width: 'calc(var(--u) * 48)', height: 'calc(var(--u) * 48)', display: 'block' }}>
        <rect width="48" height="48" rx="17" fill="#fff3c4" />
        <circle cx="22" cy="27" r="12.5" fill="#f9b233" />
        <ellipse cx="17.6" cy="25" rx="1.7" ry="2.1" fill="#4a2a10" />
        <ellipse cx="26.4" cy="25" rx="1.7" ry="2.1" fill="#4a2a10" />
        <path d="M18 30.4q4 3.4 8 0" fill="none" stroke="#e8602c" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M36 9l1.8 4.2 4.2 1.8-4.2 1.8L36 21l-1.8-4.2L30 15l4.2-1.8z" fill="#f7931e" />
    </svg>
)
const IconChannel = () => (
    <svg viewBox="0 0 48 48" style={{ width: 'calc(var(--u) * 48)', height: 'calc(var(--u) * 48)', display: 'block' }}>
        <rect width="48" height="48" rx="17" fill="#ffe9d6" />
        <path d="M24 10c-8 0-13.5 5-13.5 11.4 0 3.5 1.8 6.4 4.6 8.3l-1.6 6.2 7-3.7c1.1.2 2.3.3 3.5.3 8 0 13.5-5 13.5-11.1S32 10 24 10z" fill="#ff9a2e" />
        <text x="24" y="26.5" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#fff">Ch</text>
    </svg>
)

/* 하단 탭 아이콘 */
const IconPerson = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="7.4" r="4.7" />
        <path d="M3.3 20.4C3.3 16.3 7.2 14.4 12 14.4s8.7 1.9 8.7 6c0 1.2-.9 1.9-2 1.9H5.3c-1.1 0-2-.7-2-1.9z" />
    </svg>
)
const IconChat = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.5 3 2 6.6 2 11.2c0 2.7 1.5 5 3.9 6.5l-1 3.6c-.1.5.4.8.8.6l4.3-2.6c.6.1 1.3.1 2 .1 5.500 0 10-3.600 10-8.200S17.500 3 12 3z" />
    </svg>
)
const IconChannelTab = () => (
    <svg viewBox="0 0 28 24" fill="currentColor">
        <ellipse cx="18" cy="10.4" rx="8" ry="6.8" />
        <path d="M23.500 15l2 4-4.500-2.200z" />
        <ellipse cx="10" cy="13.200" rx="8.600" ry="7.200" stroke="#fff" strokeWidth="1.600" />
        <path d="M4.500 18L3 22.200l5-2.600z" stroke="#fff" strokeWidth="1.200" strokeLinejoin="round" />
        <path d="M8 10.200l5 3-5 3z" fill="#fff" />
    </svg>
)
const IconBag = () => (
    <svg viewBox="0 0 24 24">
        <path d="M7 8V6.600C7 4.400 9.200 3 12 3s5 1.400 5 3.600V8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="3.500" y="8" width="17" height="13.500" rx="3" fill="currentColor" />
    </svg>
)
const IconMore = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="3.500" cy="12" r="2.600" />
        <circle cx="12" cy="12" r="2.600" />
        <circle cx="20.500" cy="12" r="2.600" />
    </svg>
)

/* ===================== 상태바 ===================== */
const StatusBar = ({ time, network }: { time: string; network: string }) => (
    <div className="kf-status">
        <div className="kf-time">
            <span>{time}</span>
            <svg className="kf-moon" viewBox="0 0 24 24"><path d="M21 12.790A9 9 0 1 1 11.210 3 7 7 0 0 0 21 12.790z" fill="#111" /></svg>
        </div>
        <div className="kf-status-right">
            <svg className="kf-signal" viewBox="0 0 20 12" fill="#111">
                <rect x="0" y="8" width="3.600" height="4" rx="1" />
                <rect x="5.400" y="5.300" width="3.600" height="6.700" rx="1" />
                <rect x="10.800" y="2.600" width="3.600" height="9.400" rx="1" />
                <rect x="16.200" y="0" width="3.600" height="12" rx="1" />
            </svg>
            <span className="kf-net">{network}</span>
            <div className="kf-battery">
                <span>97</span>
                <svg viewBox="0 0 5 8" fill="#fff"><path d="M3.200 0L0 4.600h2L1.300 8 5 3.200H2.900z" /></svg>
            </div>
        </div>
    </div>
)

/* ===================== 하단 탭바 ===================== */
type TabKey = 'friends' | 'chats'

const TabBar = ({ active, chatBadge, channelBadge }: { active: TabKey; chatBadge: number; channelBadge: number }) => {
    const navigate = useNavigate()
    return (
        <div className="kf-tabbar">
            <button className={`kf-tabitem ${active === 'friends' ? 'on' : ''}`} onClick={() => navigate(PATH.friends)}>
                <span className="kf-tabicon"><IconPerson /></span>
            </button>
            <button className={`kf-tabitem ${active === 'chats' ? 'on' : ''}`} onClick={() => navigate(PATH.chats)}>
                <span className="kf-tabicon"><IconChat /><i className="kf-badge">{chatBadge}</i></span>
            </button>
            <button className="kf-tabitem">
                <span className="kf-tabicon"><IconChannelTab /><i className="kf-badge">{channelBadge}</i></span>
            </button>
            <button className="kf-tabitem">
                <span className="kf-tabicon"><IconBag /></span>
            </button>
            <button className="kf-tabitem">
                <span className="kf-tabicon"><IconMore /><i className="kf-dot" /></span>
            </button>
        </div>
    )
}

/* ===================== 데이터 ===================== */
const SECTIONS = [
    { title: '업데이트 프로필', count: 15, avatars: false },
    { title: '특별한 친구', count: 1, avatars: false },
    { title: '생일인 친구', count: 4, avatars: true },
    { title: '즐겨찾는 친구', count: 2, avatars: false },
    { title: 'AI', count: 1, avatars: false },
]

/* ===================== 친구 페이지 ===================== */
export const KakaoFriends = () => {
    const [sort, setSort] = useState<'name' | 'recent'>('name')

    return (
        <div className="kf-wrapper">
            <StatusBar time="4:26" network="5G" />

            {/* 상단 헤더 */}
            <div className="kf-header">
                <Profile size={34} />
                <span className="kf-name">남윤서</span>
                <div className="kf-header-icons">
                    <button className="kf-icon-btn"><IconSearch /></button>
                    <button className="kf-icon-btn"><IconAddFriend /></button>
                    <button className="kf-icon-btn"><IconGift /></button>
                    <button className="kf-icon-btn"><IconGear /></button>
                </div>
            </div>

            {/* 친구 / 소식 */}
            <div className="kf-tabs">
                <button className="kf-tab-btn active">친구</button>
                <button className="kf-tab-btn">소식</button>
            </div>

            <div className="kf-scroll">
                {/* 광고 배너 */}
                <div className="kf-banner">
                    <div className="kf-banner-title">서로 다른 깊이로</div>
                    <div className="kf-banner-sub">원하던 나를 만나다, oligio xm</div>
                    <div className="kf-banner-small">의료기기 광고심의필: 조합-2026-33-037(유효기간 2029.09.21)</div>
                    <div className="kf-banner-product" />
                    <div className="kf-banner-ad">AD</div>
                    <div className="kf-banner-play">
                        <svg viewBox="0 0 8 8" fill="#fff"><path d="M1.500 0.500L7 4 1.500 7.500z" /></svg>
                    </div>
                </div>

                {/* 접이식 목록 */}
                {SECTIONS.map((s) => (
                    <div className="kf-row" key={s.title}>
                        <span className="kf-row-title">{s.title} {s.count}</span>
                        {s.avatars && (
                            <div className="kf-row-avatars">
                                <span><Profile size={24} color="blue" /></span>
                                <span><Profile size={24} color="purple" /></span>
                                <span><Profile size={24} color="teal" /></span>
                            </div>
                        )}
                        <IconChevron />
                    </div>
                ))}

                {/* 친구 602 */}
                <div className="kf-friends-head">
                    <span className="kf-row-title">친구 602</span>
                    <div className="kf-seg">
                        <button className={`kf-seg-btn ${sort === 'name' ? 'active' : ''}`} onClick={() => setSort('name')}>가나다순</button>
                        <button className={`kf-seg-btn ${sort === 'recent' ? 'active' : ''}`} onClick={() => setSort('recent')}>친구추가순</button>
                    </div>
                    <IconChevron up />
                </div>

                <div className="kf-friend">
                    <IconRecommend />
                    <span className="kf-friend-name">추천친구 <span className="kf-friend-count">68</span></span>
                </div>
                <div className="kf-friend">
                    <IconChannel />
                    <span className="kf-friend-name">채널 <span className="kf-friend-count">62</span></span>
                </div>
                <div className="kf-friend">
                    <Profile size={48} color="teal" />
                    <span className="kf-friend-name">ㄱ.Nㅏ경 🌸</span>
                </div>
            </div>

            <TabBar active="friends" chatBadge={567} channelBadge={330} />
        </div>
    )
}
export default KakaoFriends