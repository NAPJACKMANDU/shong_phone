import type { CSSProperties } from 'react'
import { useSyncExternalStore } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getKakaoUnreadTotal, subscribeToKakaoUnread } from '../data/kakaoData'
import {
    HOMESCREEN_PATH,
    KAKAOCHATLIST_PATH,
    KAKAOCHATROOM_PATH,
    KAKAOFRIENDS_PATH,
    KAKAOMORE_PATH,
    KAKAOMEMO_PATH,
    KAKAOMEMOROOM_PATH,
    MESSAGESCHAT_PATH,
    MESSAGESLIST_PATH,
    CGVWATCHED_PATH,
    CGVMORE_PATH,
    CGVHOME_PATH,
    PHOTOSCOLLECTIONS_PATH,
    PHOTOSLIBRARY_PATH,
    PHONEFAVORITES_PATH,
    PHONERECENTS_PATH,
    PHONEVOICEMAIL_PATH,
    INSTAGRAMHOME_PATH,
    INSTAGRAMPROFILE_PATH,
    INSTAGRAMSEARCH_PATH,
    INSTAGRAMSTORY_PATH,
} from '../routes/index.ts'
import '../css/kakaoTalk/kakaoCommonCss.css'

// 라우터 경로 매핑
export const KAKAO_PATH = {
    friends: KAKAOFRIENDS_PATH(),
    chats: KAKAOCHATLIST_PATH(),
    room: KAKAOCHATROOM_PATH(),
    more: KAKAOMORE_PATH(),
}

const isRoute = (pathname: string, route: string) =>
    pathname === route || pathname.startsWith(`${route}/`)

export const getBackDestination = (pathname: string): string => {
    if (isRoute(pathname, KAKAOCHATROOM_PATH())) {
        return KAKAOCHATLIST_PATH()
    }
    if (isRoute(pathname, KAKAOMEMOROOM_PATH())) {
        return KAKAOMEMO_PATH()
    }
    if (isRoute(pathname, KAKAOMEMO_PATH())) {
        return HOMESCREEN_PATH()
    }
    if (isRoute(pathname, MESSAGESCHAT_PATH())) {
        return MESSAGESLIST_PATH()
    }
    if (isRoute(pathname, MESSAGESLIST_PATH())) {
        return HOMESCREEN_PATH()
    }
    if (isRoute(pathname, PHOTOSLIBRARY_PATH()) || isRoute(pathname, PHOTOSCOLLECTIONS_PATH())) {
        return HOMESCREEN_PATH()
    }
    if (isRoute(pathname, CGVWATCHED_PATH())) {
        return CGVMORE_PATH()
    }
    if (isRoute(pathname, CGVMORE_PATH()) || isRoute(pathname, CGVHOME_PATH())) {
        return HOMESCREEN_PATH()
    }
    if (
        isRoute(pathname, PHONEFAVORITES_PATH()) ||
        isRoute(pathname, PHONERECENTS_PATH()) ||
        isRoute(pathname, PHONEVOICEMAIL_PATH())
    ) {
        return HOMESCREEN_PATH()
    }
    if (isRoute(pathname, INSTAGRAMSEARCH_PATH()) || isRoute(pathname, INSTAGRAMSTORY_PATH())) {
        return INSTAGRAMHOME_PATH()
    }
    if (isRoute(pathname, INSTAGRAMPROFILE_PATH()) || isRoute(pathname, INSTAGRAMHOME_PATH())) {
        return HOMESCREEN_PATH()
    }
    if (
        isRoute(pathname, KAKAOCHATLIST_PATH()) ||
        isRoute(pathname, KAKAOFRIENDS_PATH()) ||
        isRoute(pathname, KAKAOMORE_PATH())
    ) {
        return HOMESCREEN_PATH()
    }

    return HOMESCREEN_PATH()
}

/* ===================== 상단 상태바 (공통) ===================== */
export const KakaoStatusBar = ({ time = '4:26', battery = 97, variant = 'default' }: {
    time?: string
    battery?: number
    variant?: 'default' | 'light'
}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const isHome = location.pathname === HOMESCREEN_PATH() || location.pathname === '/'

    const handleBack = () => {
        if (isHome) return
        const dest = getBackDestination(location.pathname)
        navigate(dest, { replace: true, state: location.state })
    }

    const handleHome = () => {
        navigate(HOMESCREEN_PATH(), { replace: true })
    }

    return (
        <div className={`kk-status${variant === 'light' ? ' kk-status-light' : ''}`}>
            <span className="kk-time">{time}</span>

            <div className="kk-status-center-nav">
                <button onClick={handleBack} aria-label="뒤로가기" title="뒤로가기" disabled={isHome}>
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <polyline points="15 18 9 12 15 6" />
                    </svg>
                </button>
                <button onClick={handleHome} aria-label="홈으로" title="홈으로">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                </button>
            </div>

            <div className="kk-status-right">
                <svg className="kk-signal" viewBox="0 0 18 12" fill="currentColor">
                    <rect x="0" y="8" width="3.2" height="4" rx="1" />
                    <rect x="4.9" y="5.5" width="3.2" height="6.5" rx="1" />
                    <rect x="9.8" y="3" width="3.2" height="9" rx="1" />
                    <rect x="14.7" y="0" width="3.2" height="12" rx="1" />
                </svg>
                <svg className="kk-wifi" viewBox="0 0 18 13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1.2 4.6a11 11 0 0 1 15.6 0" />
                    <path d="M4 7.6a7 7 0 0 1 10 0" />
                    <path d="M6.7 10.2a3.2 3.2 0 0 1 4.6 0" />
                    <circle cx="9" cy="12" r="0.8" fill="currentColor" />
                </svg>
                <div className="kk-battery" style={{ '--kk-battery': `${battery}%` } as CSSProperties}>{battery}</div>
            </div>
        </div>
    )
}

/* ===================== 기본 프로필 ===================== */
const PROFILE_COLORS = {
    purple: ['#d9d5fc', '#b8b3f4'],
    blue: ['#a6d5fa', '#82b9f2'],
    teal: ['#b5ede5', '#89dbd0'],
}
export type ProfileColor = keyof typeof PROFILE_COLORS

export const KakaoProfile = ({ size, color = 'purple' }: { size: number; color?: ProfileColor }) => {
    const [top, bottom] = PROFILE_COLORS[color]
    const id = `kk-profile-${color}`
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

export const KakaoAvatar = ({
    name,
    size,
    avatarUrl,
    color = 'purple',
}: {
    name: string
    size: number
    avatarUrl?: string
    color?: ProfileColor
}) => avatarUrl ? (
    <img
        src={avatarUrl}
        alt={name}
        style={{
            width: `calc(var(--u) * ${size})`,
            height: `calc(var(--u) * ${size})`,
            borderRadius: `calc(var(--u) * ${size * 0.36})`,
            objectFit: 'cover',
            display: 'block',
            flexShrink: 0,
        }}
    />
) : <KakaoProfile size={size} color={color} />

export const useKakaoUnreadTotal = (): number =>
    useSyncExternalStore(subscribeToKakaoUnread, getKakaoUnreadTotal, getKakaoUnreadTotal)

/* ===================== 공통 아이콘 ===================== */
export const lineProps = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
}

export const IconSearch = () => (
    <svg viewBox="0 0 24 24" {...lineProps}>
        <circle cx="10.8" cy="10.8" r="7.6" />
        <path d="M16.6 16.6L21.5 21.5" />
    </svg>
)

export const IconGear = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
)

/* ===================== 하단 탭바 (공통) ===================== */
const IconPerson = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="7.4" r="4.7" />
        <path d="M3.3 20.4C3.3 16.3 7.2 14.4 12 14.4s8.7 1.9 8.7 6c0 1.2-.9 1.9-2 1.9H5.3c-1.1 0-2-.7-2-1.9z" />
    </svg>
)
const IconChat = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3C6.5 3 2 6.6 2 11.2c0 2.7 1.5 5 3.9 6.5l-1 3.6c-.1.5.4.8.8.6l4.3-2.6c.6.1 1.3.1 2 .1 5.5 0 10-3.6 10-8.2S17.5 3 12 3z" />
    </svg>
)
const IconChannel = () => (
    <svg viewBox="0 0 28 24" fill="currentColor">
        <ellipse cx="18" cy="10.4" rx="8" ry="6.8" />
        <path d="M23.5 15l2 4-4.5-2.2z" />
        <ellipse cx="10" cy="13.2" rx="8.6" ry="7.2" stroke="#fff" strokeWidth="1.6" />
        <path d="M4.5 18L3 22.2l5-2.6z" stroke="#fff" strokeWidth="1.2" strokeLinejoin="round" />
        <path d="M8 10.2l5 3-5 3z" fill="#fff" />
    </svg>
)
const IconBag = () => (
    <svg viewBox="0 0 24 24">
        <path d="M7 8V6.6C7 4.4 9.2 3 12 3s5 1.4 5 3.6V8" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <rect x="3.5" y="8" width="17" height="13.5" rx="3" fill="currentColor" />
    </svg>
)
const IconMore = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="3.5" cy="12" r="2.6" />
        <circle cx="12" cy="12" r="2.6" />
        <circle cx="20.5" cy="12" r="2.6" />
    </svg>
)

export type KakaoTabKey = 'friends' | 'chats' | 'more'

export const KakaoTabBar = ({ active }: { active: KakaoTabKey}) => {
    const navigate = useNavigate()
    const chatBadge = useKakaoUnreadTotal()
    return (
        <div className="kk-tabbar">
            <button className={`kk-tabitem ${active === 'friends' ? 'on' : ''}`} onClick={() => navigate(KAKAO_PATH.friends)}>
                <span className="kk-tabicon"><IconPerson /></span>
            </button>
            <button className={`kk-tabitem ${active === 'chats' ? 'on' : ''}`} onClick={() => navigate(KAKAO_PATH.chats)}>
                <span className="kk-tabicon">
                    <IconChat />
                    {chatBadge > 0 && <i className="kk-badge">{chatBadge}</i>}
                </span>
            </button>
            <button className="kk-tabitem">
                <span className="kk-tabicon"><IconChannel /></span>
            </button>
            <button className="kk-tabitem">
                <span className="kk-tabicon"><IconBag /></span>
            </button>
            <button className={`kk-tabitem ${active === 'more' ? 'on' : ''}`} onClick={() => navigate(KAKAO_PATH.more)}>
                <span className="kk-tabicon"><IconMore /><i className="kk-dot" /></span>
            </button>
        </div>
    )
}