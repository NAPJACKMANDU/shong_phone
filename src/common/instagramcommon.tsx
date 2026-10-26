import { useNavigate } from 'react-router-dom'
import { AVATAR_TINTS, IG_PATH } from '../data/instagramdata'
import '../css/instagram/instagramcommonCss.css'

/* ===================== 기본 프로필 동그라미 =====================
   ring: 'story' (스토리 있음: 색 테두리) / 'seen' (본 스토리: 회색 테두리) / 없으면 테두리 없음
   size 는 사진(원) 크기이고, 테두리가 있으면 바깥으로 6 더 커져요. */
interface AvatarProps {
    size: number
    tint?: number
    ring?: 'story' | 'seen'
    src?:string
}

const Silhouette = ({ size, tint, src }: { size: number; tint: number; src?: string }) => {
    // 1. src가 존재하는 경우 이미지 전달
    if (src) {
        return (
            <img
                className="ig-avatar"
                src={src}
                alt="Profile"
                style={{
                    width: `calc(var(--u) * ${size})`,
                    height: `calc(var(--u) * ${size})`,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    display: 'block',
                }}
            />
        )
    }

    // 2. src가 없는 경우 기존 SVG 실루엣 사용
    const [top, bottom] = AVATAR_TINTS[tint % AVATAR_TINTS.length]
    const id = `ig-ava-${tint}`
    const dark = tint === 4

    return (
        <svg
            className="ig-avatar"
            viewBox="0 0 48 48"
            style={{ width: `calc(var(--u) * ${size})`, height: `calc(var(--u) * ${size})` }}
        >
            <defs>
                <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor={top} />
                    <stop offset="1" stopColor={bottom} />
                </linearGradient>
            </defs>
            <circle cx="24" cy="24" r="24" fill={`url(#${id})`} />
            <circle cx="24" cy="19" r="7.5" fill={dark ? '#8a808a' : '#fff'} fillOpacity="0.92" />
            <path
                d="M8.5 40c0-6.5 6.8-10 15.5-10s15.5 3.5 15.5 10c-4 4.5-9.5 6.5-15.5 6.5S12.5 44.5 8.5 40z"
                fill={dark ? '#8a808a' : '#fff'}
                fillOpacity="0.92"
            />
        </svg>
    )
}

export const IgAvatar = ({ size, tint = 0, ring, src}: AvatarProps) => {
    if (!ring) return <Silhouette size={size} tint={tint} src={src} />
    return (
        <div className={`ig-ring ${ring === 'seen' ? 'seen' : ''}`}>
            <div className="ig-ring-gap">
                <Silhouette size={size} tint={tint} src={src} />
            </div>
        </div>
    )
}

/* ===================== 공통 아이콘 ===================== */
const stroke = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
}

export const IconPlus = () => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.4">
        <path d="M12 3.5v17M3.5 12h17" />
    </svg>
)
export const IconChevronDown = () => (
    <svg viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1.5 1.5 6 6 10.5 1.5" />
    </svg>
)
export const IconHeart = () => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2">
        <path d="M12 20.5C5 15.5 2.8 12.2 2.8 8.8 2.8 6 4.9 4 7.4 4c1.9 0 3.6 1 4.6 2.8C13 5 14.7 4 16.6 4c2.5 0 4.6 2 4.6 4.8 0 3.4-2.2 6.7-9.2 11.7z" />
    </svg>
)
export const IconSendPlane = () => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2">
        <path d="M21 3.5L3.5 10.3l6.5 2.6 2.7 6.8z" />
        <path d="M10 12.9L21 3.5" />
    </svg>
)
export const IconComment = () => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2">
        <path d="M12 3.5C7 3.5 3 7 3 11.5c0 2.2 1 4.2 2.7 5.6L5 20.5l3.8-1.7c1 .3 2 .4 3.2.4 5 0 9-3.5 9-8s-4-7.7-9-7.7z" />
    </svg>
)
export const IconSearch = () => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.2">
        <circle cx="10.5" cy="10.5" r="7" />
        <path d="M15.8 15.8L21 21" />
    </svg>
)
export const IconClose = () => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.8">
        <path d="M4 4l16 16M20 4L4 20" />
    </svg>
)

/* ===================== 하단 탭바 ===================== */
const IconHome = ({ filled }: { filled: boolean }) => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.2" fill={filled ? 'currentColor' : 'none'}>
        <path d="M3.5 11.2c0-.8.4-1.5 1-2l6-5a2.4 2.4 0 0 1 3 0l6 5c.6.5 1 1.2 1 2V19a2 2 0 0 1-2 2H15v-5.5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1V21H5.5a2 2 0 0 1-2-2z" />
    </svg>
)
const IconReels = () => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="2.2">
        <rect x="3" y="3" width="18" height="18" rx="5.5" />
        <path d="M10 8.3l5.2 3.7-5.2 3.7z" />
    </svg>
)

export type IgTabKey = 'home' | 'reels' | 'send' | 'search' | 'profile'

interface TabBarProps {
    active: IgTabKey
    compact?: boolean       // 홈처럼 작은 모양
    profileDot?: boolean    // 프로필 사진에 빨간 점
    profileTint?: number
}

export const IgTabBar = ({ active, compact = false, profileDot = true, profileTint = 0 }: TabBarProps) => {
    const navigate = useNavigate()
    return (
        <div className={`ig-tabbar ${compact ? 'compact' : ''}`}>
            <button className={`ig-tab ${active === 'home' ? 'on' : ''}`} onClick={() => navigate(IG_PATH.home)}>
                <IconHome filled={active === 'home'} />
            </button>
            <button className={`ig-tab ${active === 'reels' ? 'on' : ''}`}>
                <IconReels />
            </button>
            <button className={`ig-tab ${active === 'send' ? 'on' : ''}`}>
                <span style={{ position: 'relative', display: 'flex' }}>
                    <IconSendPlane />
                    <i className="ig-reddot" />
                </span>
            </button>
            <button className={`ig-tab ${active === 'search' ? 'on' : ''}`} onClick={() => navigate(IG_PATH.search)}>
                <IconSearch />
            </button>
            <button className={`ig-tab ${active === 'profile' ? 'on' : ''}`} onClick={() => navigate(IG_PATH.profile)}>
                <span style={{ position: 'relative', display: 'flex' }}>
                    <span className="ig-tab-avatar"><IgAvatar size={compact ? 24 : 28} tint={profileTint} src='/instagram/chanProfile.jpg'/></span>
                    {profileDot && <i className="ig-reddot" />}
                </span>
            </button>
        </div>
    )
}