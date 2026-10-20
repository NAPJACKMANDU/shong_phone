import { useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/kakaoChatListCss.css'

// 라우터 경로 (프로젝트 라우터에 맞게 수정하세요)
const PATH = {
    friends: '/kakaoFriends',
    chats: '/kakaoChatList',
    room: '/kakaoChatRoom',
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
    const id = `kc-profile-${color}`
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
const IconNewChat = () => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2">
        <path d="M15.5 5.2C14.4 4.7 13.2 4.5 12 4.5 7.3 4.5 3.5 7.600 3.500 11.700c0 2.300 1.200 4.300 3.100 5.600l-1 3.500 4.200-2c.7.100 1.400.200 2.200.200 4.700 0 8.500-3.100 8.500-7.300 0-.7-.1-1.300-.3-1.900" />
        <path d="M19.500 2.500v7M16 6h7" />
    </svg>
)
const IconGear = () => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
)
const IconSort = () => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2">
        <path d="M3 6.500h12M3 12h9M3 17.500h9" />
        <path d="M18.500 12.500v8M14.500 16.500h8" />
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
    <div className="kc-status">
        <div className="kc-time">
            <span>{time}</span>
            <svg className="kc-moon" viewBox="0 0 24 24"><path d="M21 12.790A9 9 0 1 1 11.210 3 7 7 0 0 0 21 12.790z" fill="#111" /></svg>
        </div>
        <div className="kc-status-right">
            <svg className="kc-signal" viewBox="0 0 20 12" fill="#111">
                <rect x="0" y="8" width="3.600" height="4" rx="1" />
                <rect x="5.400" y="5.300" width="3.600" height="6.700" rx="1" />
                <rect x="10.800" y="2.600" width="3.600" height="9.400" rx="1" />
                <rect x="16.200" y="0" width="3.600" height="12" rx="1" />
            </svg>
            <span className="kc-net">{network}</span>
            <div className="kc-battery">
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
        <div className="kc-tabbar">
            <button className={`kc-tabitem ${active === 'friends' ? 'on' : ''}`} onClick={() => navigate(PATH.friends)}>
                <span className="kc-tabicon"><IconPerson /></span>
            </button>
            <button className={`kc-tabitem ${active === 'chats' ? 'on' : ''}`} onClick={() => navigate(PATH.chats)}>
                <span className="kc-tabicon"><IconChat /><i className="kc-badge">{chatBadge}</i></span>
            </button>
            <button className="kc-tabitem">
                <span className="kc-tabicon"><IconChannelTab /><i className="kc-badge">{channelBadge}</i></span>
            </button>
            <button className="kc-tabitem">
                <span className="kc-tabicon"><IconBag /></span>
            </button>
            <button className="kc-tabitem">
                <span className="kc-tabicon"><IconMore /><i className="kc-dot" /></span>
            </button>
        </div>
    )
}

/* ===================== 아바타 (모두 기본 프로필) ===================== */
const Single = ({ color }: { color: ProfileColor }) => <Profile size={48} color={color} />

const Grid4 = ({ colors }: { colors: ProfileColor[] }) => (
    <div className="kc-grid4">
        {colors.map((c, i) => <Profile key={i} size={23} color={c} />)}
    </div>
)

const Pair = () => (
    <>
        <div className="kc-pair-a"><Profile size={30} color="teal" /></div>
        <div className="kc-pair-b"><Profile size={29} color="purple" /></div>
    </>
)

/* ===================== 데이터 ===================== */
interface ChatItem {
    id: number
    avatar: ReactNode
    name: string
    count?: number
    meBadge?: boolean
    msg: ReactNode
    twoLine?: boolean
    time: string
    unread?: number
}

const CHATS: ChatItem[] = [
    { id: 1, avatar: <Single color="purple" />, name: '두둥⚡ 희정 님 등장❤️🎵', msg: '키보드 빼긴게개웃기다', time: '오후 4:22' },
    { id: 2, avatar: <Single color="blue" />, name: '심유진', msg: '멜티 에러 너무심해', time: '오후 4:22' },
    { id: 3, avatar: <Grid4 colors={['teal', 'blue', 'purple', 'purple']} />, name: '김성윤, 김예원, 강은지 사원님, 문 혜지 사원님, 김경욱', count: 7, msg: '내일 잠바주스 갈래요', time: '오후 4:03', unread: 10 },
    { id: 4, avatar: <Grid4 colors={['purple', 'blue', 'blue', 'teal']} />, name: '머 먹어?', count: 9, msg: <><span className="kc-sticker">🥳</span>지영아 생일축하해~!~!~!!</>, time: '오후 3:58', unread: 6 },
    { id: 5, avatar: <Pair />, name: '김경욱, 문 혜지 사원님', count: 3, msg: '갑시당', time: '오후 3:30' },
    { id: 6, avatar: <Single color="purple" />, name: '남윤서', meBadge: true, msg: '사진을 보냈습니다.', time: '오후 3:28' },
    { id: 7, avatar: <Single color="blue" />, name: '카카오뱅크', msg: '내 카드 사용 패턴과 신용 현황을 분석해드렸어요. 지금 바로 확인해보세요. …', twoLine: true, time: '오후 2:48' },
    { id: 8, avatar: <Single color="teal" />, name: 'LG유플러스 고객 불편여부 정기점검', msg: '안녕하세요, LG유플러스입니다.', time: '오후 2:22' },
]

const CHIPS = [
    { id: 'all', label: '전체' },
    { id: 'unread', label: '안읽음', badge: 564 },
    { id: 'gpt', label: 'ChatGPT' },
    { id: 'call', label: '통화' },
]

/* ===================== 채팅 목록 페이지 ===================== */
export const KakaoChatList = () => {
    const navigate = useNavigate()
    const [chip, setChip] = useState('all')

    return (
        <div className="kc-wrapper">
            <StatusBar time="4:24" network="LTE" />

            {/* 타이틀 + 아이콘 */}
            <div className="kc-header">
                <span className="kc-title">채팅</span>
                <div className="kc-header-icons">
                    <button className="kc-icon-btn"><IconSearch /></button>
                    <button className="kc-icon-btn"><IconNewChat /></button>
                    <button className="kc-icon-btn"><IconGear /></button>
                </div>
            </div>

            {/* 필터 칩 */}
            <div className="kc-chips">
                {CHIPS.map((c) => (
                    <button key={c.id} className={`kc-chip ${chip === c.id ? 'active' : ''}`} onClick={() => setChip(c.id)}>
                        {c.label}
                        {c.badge ? <span className="kc-chip-badge">{c.badge}</span> : null}
                    </button>
                ))}
                <button className="kc-chip icon">
                    <IconSort />
                    <i className="kc-chip-dot" />
                </button>
            </div>

            <div className="kc-scroll">
                {/* 광고 배너 */}
                <div className="kc-banner">
                    <div className="kc-banner-from"><i />협타디 앱에서 확인 ›</div>
                    <div className="kc-banner-title">랜타디 모바일 등장</div>
                    <div className="kc-banner-small">확률형 아이템 포함</div>
                    <div className="kc-banner-game" />
                    <div className="kc-banner-ad">AD</div>
                </div>

                {/* 채팅방 목록 */}
                {CHATS.map((c) => (
                    <div className="kc-row" key={c.id} onClick={() => navigate(PATH.room)}>
                        <div className="kc-ava">{c.avatar}</div>
                        <div className="kc-info">
                            <div className="kc-title-line">
                                {c.meBadge && <span className="kc-me-badge">나</span>}
                                <span className="kc-name">{c.name}</span>
                                {c.count ? <span className="kc-count">{c.count}</span> : null}
                            </div>
                            <div className={`kc-msg ${c.twoLine ? 'two' : ''}`}>{c.msg}</div>
                        </div>
                        <div className="kc-meta">
                            <span className="kc-time">{c.time}</span>
                            {c.unread ? <span className="kc-unread">{c.unread}</span> : null}
                        </div>
                    </div>
                ))}
            </div>

            <TabBar active="chats" chatBadge={564} channelBadge={327} />
        </div>
    )
}
export default KakaoChatList