import { useState } from 'react'
import type { ReactNode } from 'react'
import {
    KakaoStatusBar, KakaoTabBar, IconSearch, IconGear, lineProps,
} from '../../common/kakaoCommon.tsx'
import '../../css/kakaoTalk/kakaoMoreCss.css'

/* ===================== 아이콘 ===================== */
const thin = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

const IconScanHeader = () => (
    <svg viewBox="0 0 28 28" {...lineProps}>
        <path d="M4 9V6a2 2 0 0 1 2-2h3M19 4h3a2 2 0 0 1 2 2v3M24 19v3a2 2 0 0 1-2 2h-3M9 24H6a2 2 0 0 1-2-2v-3" />
        <path d="M7 14h14" />
    </svg>
)

const IconGiftBox = () => (
    <svg viewBox="0 0 28 28" {...thin}>
        <path d="M14 9.2C10 6.5 8.5 3.8 10.8 2.5c1.4-.8 2.7-.2 3.2 1 .5-1.2 1.8-1.8 3.2-1 2.3 1.3.8 4-3.2 6.7z" />
        <path d="M4 13l10-4.5L24 13v9.5L14 27 4 22.5z" />
        <path d="M4 13l10 4.5L24 13M14 17.5V27" />
    </svg>
)
const IconGiftHeart = () => (
    <svg viewBox="0 0 28 28" {...thin}>
        <path d="M14 25C6 19.5 3 14.5 3 10.7 3 7.2 5.5 5 8.6 5c2.3 0 4.1 1.2 5.4 3.3C15.3 6.2 17.1 5 19.4 5 22.5 5 25 7.2 25 10.7c0 3.8-3 8.8-11 14.3z" />
        <path d="M14 9v13M9.5 12.5l9 7M18.5 12.5l-9 7" />
    </svg>
)
const IconDeal = () => (
    <svg viewBox="0 0 28 28" {...thin}>
        <circle cx="7.5" cy="7.5" r="3.2" />
        <circle cx="20.5" cy="20.5" r="3.2" />
        <path d="M22 4L11 15h8L8 26" />
    </svg>
)
const IconEmoticon = () => (
    <svg viewBox="0 0 28 28" {...thin}>
        <path d="M14 3.5c6 0 10.5 4.2 10.5 9.5S20 22.5 14 22.5c-1 0-2-.1-2.9-.3L6 25l1-4.5C4.8 18.8 3.5 16 3.5 13 3.5 7.7 8 3.5 14 3.5z" />
        <circle cx="10.5" cy="11.5" r="0.9" fill="currentColor" />
        <circle cx="17.5" cy="11.5" r="0.9" fill="currentColor" />
        <path d="M10 15.5q4 3.5 8 0" />
    </svg>
)
const IconLive = () => (
    <svg viewBox="0 0 28 28" {...thin}>
        <rect x="3" y="4.5" width="22" height="15" rx="3.5" />
        <path d="M8 19.5v4.2l5-4.2" />
        <text x="14" y="15.5" textAnchor="middle" fontSize="8" fontWeight="700" fill="currentColor" stroke="none">LIVE</text>
    </svg>
)
const IconMakers = () => (
    <svg viewBox="0 0 28 28" {...thin}>
        <circle cx="14" cy="14" r="11" />
        <path d="M8.5 19.5v-10l5.5 6.5 5.5-6.5v10" />
    </svg>
)
const IconFriends = () => (
    <svg viewBox="0 0 28 28" {...thin}>
        <circle cx="14" cy="15" r="9.5" />
        <circle cx="6.5" cy="7.5" r="3" />
        <circle cx="21.5" cy="7.5" r="3" />
        <ellipse cx="14" cy="17.5" rx="4.5" ry="3.2" />
        <circle cx="10.5" cy="12.5" r="0.9" fill="currentColor" />
        <circle cx="17.5" cy="12.5" r="0.9" fill="currentColor" />
        <path d="M13 16h2" />
    </svg>
)
const IconAI = () => (
    <svg viewBox="0 0 28 28" {...thin}>
        <circle cx="14" cy="14" r="11.5" />
        <circle cx="14" cy="14" r="7.5" fill="currentColor" />
        <path d="M10 15.5c1.5 3.2 6.5 3 8-1.5" stroke="#fff" strokeWidth="1.6" />
    </svg>
)
const IconID = () => (
    <svg viewBox="0 0 28 28" {...thin}>
        <rect x="3" y="6" width="22" height="16" rx="3.5" />
        <circle cx="10" cy="12.5" r="2.3" />
        <path d="M6 19c.5-2.2 2-3.2 4-3.2s3.5 1 4 3.2" />
        <path d="M16.5 12h5M16.5 16h5" />
    </svg>
)
const IconCloud = () => (
    <svg viewBox="0 0 28 28" {...thin}>
        <path d="M8.5 22.5a5.5 5.5 0 0 1-1-10.9A7.5 7.5 0 0 1 21.5 11.5 5.5 5.5 0 0 1 21 22.5z" />
    </svg>
)
const IconCalendarCheck = () => (
    <svg viewBox="0 0 28 28" {...thin}>
        <rect x="4" y="6" width="20" height="19" rx="2.5" />
        <path d="M10 3v5M18 3v5" />
        <path d="M10 15.5l3 3 5.5-6" />
    </svg>
)
const IconCalendarArrow = () => (
    <svg viewBox="0 0 28 28" {...thin}>
        <rect x="4" y="6" width="20" height="19" rx="2.5" />
        <path d="M10 3v5M18 3v5" />
        <path d="M9.5 16h9M15.5 12.5L19 16l-3.5 3.5" />
    </svg>
)

/* ===================== 데이터 ===================== */
interface MenuItem {
    label: string
    icon: ReactNode
    dot?: boolean
}

const MENUS: MenuItem[] = [
    { label: '선물하기', icon: <IconGiftBox /> },
    { label: '받은선물', icon: <IconGiftHeart /> },
    { label: '톡딜', icon: <IconDeal />, dot: true },
    { label: '이모티콘', icon: <IconEmoticon /> },
    { label: '라이브쇼핑', icon: <IconLive />, dot: true },
    { label: '메이커스', icon: <IconMakers /> },
    { label: '프렌즈', icon: <IconFriends />, dot: true },
    { label: 'AI국민비서', icon: <IconAI /> },
    { label: '모바일신분증', icon: <IconID /> },
    { label: '톡클라우드', icon: <IconCloud /> },
    { label: '캘린더', icon: <IconCalendarCheck /> },
    { label: '예약하기', icon: <IconCalendarArrow /> },
]

const CHIPS = [
    { id: 'home', label: '홈' },
    { id: 'wallet', label: '지갑', badge: 'N' },
    { id: 'game', label: '게임' },
]

/* ===================== 더보기 페이지 ===================== */
export const KakaoMore = () => {
    const [chip, setChip] = useState('home')

    return (
        <div className="kk-wrapper km-wrapper">
            <KakaoStatusBar time="8:45" battery={71} />

            {/* 타이틀 + 아이콘 */}
            <div className="kk-header">
                <span className="kk-title">더보기</span>
                <div className="kk-header-icons">
                    <button className="kk-icon-btn"><IconSearch /></button>
                    <button className="kk-icon-btn"><IconScanHeader /></button>
                    <button className="kk-icon-btn"><IconGear /><i className="kk-icon-dot" /></button>
                </div>
            </div>

            {/* 홈 / 지갑 / 게임 */}
            <div className="kk-chips">
                {CHIPS.map((c) => (
                    <button key={c.id} className={`kk-chip ${chip === c.id ? 'active' : ''}`} onClick={() => setChip(c.id)}>
                        {c.label}
                        {c.badge ? <span className="kk-chip-badge round">{c.badge}</span> : null}
                    </button>
                ))}
            </div>

            <div className="kk-scroll km-scroll">
                {/* 카카오페이 */}
                <div className="km-pay">
                    <svg className="km-pay-logo" viewBox="0 0 14 13">
                        <path d="M7 0C3.1 0 0 2.5 0 5.6c0 1.9 1.2 3.6 3 4.6L2.4 13l3.3-2.2c.4.1.9.1 1.3.1 3.9 0 7-2.5 7-5.6S10.9 0 7 0z" fill="#111" />
                    </svg>
                    <span className="km-pay-text">pay</span>
                    <span className="km-pay-amount">46,574원</span>
                    <div className="km-pay-actions">
                        <span>송금</span>
                        <i className="km-pay-divider" />
                        <span>내역</span>
                        <i className="km-pay-divider" />
                        <svg className="km-pay-scan" viewBox="0 0 28 28" {...lineProps} strokeWidth="2.6">
                            <path d="M4 9V6a2 2 0 0 1 2-2h3M19 4h3a2 2 0 0 1 2 2v3M24 19v3a2 2 0 0 1-2 2h-3M9 24H6a2 2 0 0 1-2-2v-3" />
                            <path d="M10 10v8M14 9v10M18 10v8" />
                        </svg>
                        <span>결제</span>
                    </div>
                </div>

                {/* 메뉴 카드 */}
                <div className="km-card">
                    <div className="km-grid">
                        {MENUS.map((m) => (
                            <div className="km-item" key={m.label}>
                                <div className="km-ico">
                                    {m.icon}
                                    {m.dot && <i />}
                                </div>
                                <span className="km-label">{m.label}</span>
                            </div>
                        ))}
                    </div>
                    <div className="km-pager">
                        <span className="on" />
                        <span />
                        <span />
                    </div>
                </div>

                {/* 광고 카드 */}
                <div className="km-ad">
                    <div className="km-ad-brand"><i />자리톡</div>
                    <div className="kk-ad-tag">AD</div>
                    <div className="km-ad-check">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#14a86a" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12.5l5.5 5.5L20 7" />
                        </svg>
                    </div>
                    <div className="km-ad-title">월세환급 대상입니다</div>
                    <div className="km-ad-sub">평균 환급 신청액</div>
                    <div className="km-ad-amount">418,000원</div>
                    <div className="km-ad-footer">
                        <span>월세 환급금 평균 : 418,000원</span>
                        <button className="km-ad-btn">알아보기</button>
                    </div>
                </div>
            </div>

            <KakaoTabBar active="more"/>
        </div>
    )
}
export default KakaoMore