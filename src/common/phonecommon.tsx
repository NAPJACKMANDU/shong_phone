import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/calling/phonecommonCss.css'

// 라우터 경로 (프로젝트 라우터에 맞게 수정하세요)
export const PHONE_PATH = {
    favorites: '/phoneFavorites',
    recents: '/phoneRecents',
    voicemail: '/phoneVoicemail',
}

/* ===================== 공통 아이콘 ===================== */
export const IconFilter = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M3.5 7h17M6.5 12h11M9.5 17h5" />
    </svg>
)

/* ⓘ 정보 버튼 */
export const PhoneInfoButton = () => (
    <button className="ph-info">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <circle cx="12" cy="12" r="9.5" />
            <circle cx="12" cy="7.8" r="1.1" fill="currentColor" stroke="none" />
            <path d="M12 11v6" />
        </svg>
    </button>
)

/* ===================== 상단 버튼 줄 =====================
   왼쪽은 항상 '편집'. right 에 오른쪽 버튼, center 에 가운데 버튼을 넣어요. */
export const PhoneTop = ({ right, center }: { right?: ReactNode; center?: ReactNode }) => (
    <div className="ph-top">
        <button className="im-pill im-glass">편집</button>
        {center}
        {right}
    </div>
)

/* ===================== 하단 떠 있는 탭바 ===================== */
const IconStar = () => (
    <svg viewBox="0 0 26 24" fill="currentColor">
        <path d="M13 1.5l3.2 6.6 7.2 1-5.3 5 1.3 7.2L13 17.8l-6.4 3.5 1.3-7.2-5.3-5 7.2-1z" />
    </svg>
)
const IconClock = () => (
    <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11.5" fill="currentColor" />
        <path d="M12 6.5V12.5h4.5" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)
const IconContacts = () => (
    <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="11.5" fill="currentColor" />
        <circle cx="12" cy="9.3" r="3.7" fill="#fff" />
        <path d="M5.3 19c1.4-3 3.9-4.3 6.7-4.3s5.3 1.3 6.7 4.3c-1.8 2-4.1 3-6.7 3s-4.9-1-6.7-3z" fill="#fff" />
    </svg>
)
const IconKeypad = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        {[5, 10.5, 16].map((y) => [5, 12, 19].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="2.2" />))}
        <circle cx="12" cy="21.5" r="2.2" />
    </svg>
)
const IconVoicemail = () => (
    <svg viewBox="0 0 36 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
        <circle cx="9" cy="11" r="6.5" />
        <circle cx="27" cy="11" r="6.5" />
        <path d="M9 17.5h18" />
    </svg>
)

type PhoneTabKey = 'favorites' | 'recents' | 'contacts' | 'keypad' | 'voicemail'

export const PhoneTabBar = ({ active }: { active: PhoneTabKey }) => {
    const navigate = useNavigate()
    const tabs: { key: PhoneTabKey; label: string; icon: ReactNode; path?: string; wide?: boolean }[] = [
        { key: 'favorites', label: '즐겨찾기', icon: <IconStar />, path: PHONE_PATH.favorites },
        { key: 'recents', label: '최근 통화', icon: <IconClock />, path: PHONE_PATH.recents },
        { key: 'contacts', label: '연락처', icon: <IconContacts /> },
        { key: 'keypad', label: '키패드', icon: <IconKeypad /> },
        { key: 'voicemail', label: '음성 사서함', icon: <IconVoicemail />, path: PHONE_PATH.voicemail, wide: true },
    ]
    return (
        <div className="ph-tabbar im-glass ">
            {tabs.map((t) => (
                <button
                    key={t.key}
                    className={`ph-tab ${active === t.key ? 'on' : ''} ${t.wide ? 'wide' : ''}`}
                    onClick={() => t.path && navigate(t.path)}
                >
                    {t.icon}
                    <span>{t.label}</span>
                </button>
            ))}
        </div>
    )
}