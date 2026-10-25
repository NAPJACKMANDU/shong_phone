import { useState } from 'react'
import { KakaoStatusBar } from '../../common/kakaoCommon.tsx'
import { IgAvatar, IgTabBar, IconPlus } from '../../common/instagramcommon.tsx'
import { GRID_POSTS } from '../../data/instagramdata.ts'
import '../../css/instagram/instagramprofileCss.css'

/* ===================== 아이콘 ===================== */
const IconLock = () => (
    <svg className="lock" viewBox="0 0 12 15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <rect x="1.5" y="6" width="9" height="7.5" rx="2" />
        <path d="M3.5 6V4.5a2.5 2.5 0 0 1 5 0V6" />
    </svg>
)
const IconChevron = () => (
    <svg className="chev" viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1.5 1.5 6 6 10.5 1.5" />
    </svg>
)
const IconThreads = () => (
    <svg viewBox="0 0 24 24">
        <text x="12" y="18.5" textAnchor="middle" fontSize="22" fontWeight="700" fill="currentColor">@</text>
    </svg>
)
const IconHamburger = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M3 6.5h18M3 12h18M3 17.5h18" />
    </svg>
)
const IconSmallPlus = () => (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M6 1.5v9M1.5 6h9" />
    </svg>
)
const IconAddPerson = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9.5" cy="8" r="4" />
        <path d="M2.5 20.5c0-4 3.3-6.5 7-6.5 1.2 0 2.3.2 3.3.7" />
        <path d="M18.5 14v7M15 17.5h7" />
    </svg>
)
const IconGrid = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        {[3, 9.5, 16].map((y) => [3, 9.5, 16].map((x) => (
            <rect key={`${x}-${y}`} x={x} y={y} width="5" height="5" rx="1.2" />
        )))}
    </svg>
)
const IconRepost = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12V10.5a3.5 3.5 0 0 1 3.5-3.5H17M14 3.5L17.5 7 14 10.5" />
        <path d="M20 12v1.5a3.5 3.5 0 0 1-3.5 3.5H7M10 20.5L6.5 17 10 13.5" />
    </svg>
)
const IconTagged = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="5" width="18" height="16" rx="3.5" />
        <path d="M8 5V3.5h8V5" />
        <circle cx="12" cy="12" r="2.8" />
        <path d="M6.8 19c.8-2.6 2.8-3.8 5.2-3.8s4.4 1.2 5.2 3.8" />
    </svg>
)
const IconMulti = () => (
    <svg className="ip-multi" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8.5" y="3" width="12.5" height="12.5" rx="3.5" />
        <path d="M5 8.5A3.5 3.5 0 0 0 3 11.7V17a4 4 0 0 0 4 4h5.3a3.5 3.5 0 0 0 3.2-2" />
    </svg>
)

/* ===================== 데이터 ===================== */
const USERNAME = 'chxxanx__'
const STATS = [
    { value: '12', label: '게시물', left: 124 },
    { value: '1', label: '팔로워', left: 212 },
    { value: '1', label: '팔로잉', left: 301 },
]

/* ===================== 인스타그램 프로필 ===================== */
export const InstagramProfile = () => {
    const [tab, setTab] = useState<'grid' | 'repost' | 'tagged'>('grid')

    return (
        <div className="kk-wrapper ig-wrapper">
            {/* 내용 (스크롤) */}
            <div className="ip-scroll">
                <div className="ip-info">
                    {/* 프로필 사진 + 생각 말풍선 */}
                    <div className="ip-avatar"><IgAvatar size={86} tint={0} /></div>
                    <span className="ip-avatar-plus"><IconPlus /></span>
                    <div className="ip-note">생각을 여기에<br />공유해보세...</div>

                    {/* 숫자 */}
                    {STATS.map((s) => (
                        <div className="ip-stat" key={s.label} style={{ left: `calc(var(--u) * ${s.left})` }}>
                            <b>{s.value}</b>
                            <span>{s.label}</span>
                        </div>
                    ))}

                    <button className="ip-banner-btn"><IconSmallPlus />배너 추가</button>

                    <div className="ip-actions">
                        <button className="wide">프로필 편집</button>
                        <button className="wide">프로필 공유</button>
                        <button className="icon"><IconAddPerson /></button>
                    </div>

                    {/* 탭 */}
                    <div className="ip-tabs">
                        <button className={`ip-tab ${tab === 'grid' ? 'on' : ''}`} onClick={() => setTab('grid')}><IconGrid /></button>
                        <button className={`ip-tab ${tab === 'repost' ? 'on' : ''}`} onClick={() => setTab('repost')}><IconRepost /></button>
                        <button className={`ip-tab ${tab === 'tagged' ? 'on' : ''}`} onClick={() => setTab('tagged')}><IconTagged /></button>
                    </div>
                </div>

                {/* 게시물 격자 (격자 탭에서만) */}
                {tab === 'grid' && (
                    <div className="ip-grid">
                        {GRID_POSTS.map((p) => (
                            <div className="ip-tile" key={p.id} style={{ background: p.bg }}>
                                {p.src && <img src={p.src} alt="" />}
                                {p.multi && <IconMulti />}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* 위쪽 줄 */}
            <div className="ig-header">
                <div className="ig-header-row">
                    <button className="ig-icon-btn" style={{ left: 'calc(var(--u) * 25)' }}><IconPlus /></button>
                    <button className="ip-name">
                        <IconLock />
                        <b>{USERNAME}</b>
                        <IconChevron />
                        <i />
                    </button>
                    <button className="ig-icon-btn" style={{ left: 'calc(var(--u) * 287)' }}><IconThreads /></button>
                    <button className="ig-icon-btn" style={{ left: 'calc(var(--u) * 342)' }}><IconHamburger /></button>
                </div>
            </div>

            {/* 카카오 공통 상태바 */}
            <KakaoStatusBar time="4:23" battery={74} />

            {/* 하단 탭바 */}
            <IgTabBar active="profile" />
        </div>
    )
}
export default InstagramProfile