import type { CSSProperties, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/cgv/cgvCommonCss.css'

// 라우터 경로 (프로젝트 라우터에 맞게 수정하세요)
export const CGV_PATH = {
    home: '/cgvHome',
    more: '/cgvMore',
    watched: '/cgvWatched',
}

/* ===================== 로고 ===================== */
export const CgvLogo = () => {
    const rays = Array.from({ length: 8 }, (_, i) => {
        const a = (-90 + i * 45) * Math.PI / 180
        return {
            x1: 445 + 13 * Math.cos(a), y1: 190 + 13 * Math.sin(a),
            x2: 445 + 29 * Math.cos(a), y2: 190 + 29 * Math.sin(a),
            c: i % 2 === 0 ? '#f58220' : '#ee3124',
        }
    })
    return (
        <svg className="cg-logo" viewBox="30 150 460 210">
            <g fill="none" stroke="#ee3124" strokeWidth="40" strokeLinecap="round" strokeLinejoin="round">
                <path d="M166.6 238.2 A52 55 0 1 0 166.6 311.8" />
                <path d="M274.8 239.6 A48 55 0 1 0 286 275 H254" />
                <path d="M298 228 L345 322 L395 225" />
            </g>
            <g strokeWidth="11" strokeLinecap="round">
                {rays.map((r, i) => <line key={i} x1={r.x1} y1={r.y1} x2={r.x2} y2={r.y2} stroke={r.c} />)}
            </g>
        </svg>
    )
}

/* ===================== 상단 아이콘 ===================== */
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

const IconTicket = () => (
    <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M5 5.5h14a2 2 0 0 1 2 2v2.2a2.3 2.3 0 0 0 0 4.6v2.2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2.2a2.3 2.3 0 0 0 0-4.6V7.5a2 2 0 0 1 2-2z" />
        <path d="M8 10h.01M8 14h.01" />
    </svg>
)
const IconBell = () => (
    <svg viewBox="0 0 24 24" {...stroke}>
        <path d="M18 8.5A6 6 0 0 0 6 8.5c0 6.5-2.5 8.5-2.5 8.5h17S18 15 18 8.5z" />
        <path d="M13.7 20.5a2 2 0 0 1-3.4 0" />
    </svg>
)
const IconSearch = () => (
    <svg viewBox="0 0 24 24" {...stroke}>
        <circle cx="10.8" cy="10.8" r="7.6" />
        <path d="M16.6 16.6L21.5 21.5" />
    </svg>
)

/* 알림 뱃지 숫자를 넘기면 종 모양 위에 빨간 숫자가 떠요 */
export const CgvTopbar = ({ showLogo = false, bellBadge }: { showLogo?: boolean; bellBadge?: number }) => (
    <div className="cg-topbar">
        {showLogo && <CgvLogo />}
        <div className="cg-top-icons">
            <button><IconTicket /></button>
            <button>
                <IconBell />
                {bellBadge ? <i className="cg-badge">{bellBadge}</i> : null}
            </button>
            <button><IconSearch /></button>
        </div>
    </div>
)

/* ===================== 하단 탭바 ===================== */
const IconHome = ({ filled }: { filled?: boolean }) => (
    <svg viewBox="0 0 24 24" {...stroke} fill={filled ? 'currentColor' : 'none'}>
        <path d="M4.5 11.2c0-.8.4-1.5 1-2l5-4.2a2 2 0 0 1 2.6 0l5 4.2c.6.5 1 1.2 1 2V18a2.5 2.5 0 0 1-2.5 2.5h-9.5A2.5 2.5 0 0 1 4.5 18z" />
        <circle cx="12" cy="15" r="1.2" fill={filled ? '#fff' : 'currentColor'} stroke="none" />
    </svg>
)
const IconCineTalk = () => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.8">
        <path d="M5.5 5.5c1.5-1.5 4-2.3 7-2 4.5.5 7.5 4 7 8.5-.4 3.5-3 6.5-6.8 7.5-3.5.9-6.5-.3-8.2-1.5l-2 .5.8-2.5C2 13.5 3 8 5.5 5.5z" />
        <path d="M9 9.5h6M9 13h4" />
    </svg>
)
const IconSnack = () => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.8">
        <path d="M6 10h12l-1.3 10.5H7.3z" />
        <path d="M10 10l.5 10.5M14 10l-.5 10.5" />
        <path d="M7 10c-1.8-.2-2.6-2-1.8-3.4.6-1 1.8-1.3 2.7-.8.3-1.6 1.8-2.6 3.3-2.2.8-.9 2.2-1 3.1-.2 1.3-.4 2.7.4 3 1.8 1.5.2 2.3 1.9 1.5 3.2-.5.9-1.4 1.4-2.3 1.6" />
    </svg>
)
const IconMore = ({ filled }: { filled?: boolean }) => (
    <svg viewBox="0 0 24 24" {...stroke} strokeWidth="1.8" fill={filled ? 'currentColor' : 'none'}>
        <circle cx="9" cy="8.5" r="3.8" />
        <path d="M2.5 20c0-3.8 2.9-6 6.5-6s6.5 2.2 6.5 6z" />
        <path d="M17 8.5h4.5M17 12.5h4.5" />
    </svg>
)
const IconTicketWhite = () => (
    <svg viewBox="0 0 38 28">
        <path d="M5 2h28a3 3 0 0 1 3 3v3.5a3.5 3.5 0 0 0 0 7V23a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-3.5a3.5 3.5 0 0 0 0-7V5a3 3 0 0 1 3-3z" fill="#fff" />
        <circle cx="25" cy="14" r="1.1" fill="#ff4060" />
    </svg>
)

type CgvTabKey = 'home' | 'more'

/* expanded=true  : 가운데 버튼에 '예매·예약' 글자 (홈 화면)
   expanded=false : 가운데 버튼에 티켓 아이콘 (스크롤한 화면) */
export const CgvTabBar = ({ active, expanded = true }: { active: CgvTabKey; expanded?: boolean }) => {
    const navigate = useNavigate()
    return (
        <div className="cg-tabbar">
            <button className={`cg-tab ${active === 'home' ? 'on' : ''}`} onClick={() => navigate(CGV_PATH.home)}>
                <IconHome filled={active === 'home'} />
                <span>홈</span>
            </button>
            <button className="cg-tab">
                <IconCineTalk />
                <span>씨네톡</span>
            </button>
            <div />
            <button className="cg-tab">
                <IconSnack />
                <span>매점</span>
            </button>
            <button className={`cg-tab ${active === 'more' ? 'on' : ''}`} onClick={() => navigate(CGV_PATH.more)}>
                <IconMore filled={active === 'more'} />
                <span>더보기</span>
            </button>
            <button className="cg-center">
                {expanded ? <span>예매·예약</span> : <IconTicketWhite />}
            </button>
        </div>
    )
}

/* ===================== 연령 등급 뱃지 ===================== */
export const AgeBadge = ({ age }: { age: '12' | '15' | '19' | 'ALL' }) => (
    <span className={`cg-age ${age === 'ALL' ? 'all' : `age${age}`}`}>{age}</span>
)

/* ===================== 포스터 / 사진 박스 =====================
   src 가 있으면 이미지를, 없으면 bg(색/그라데이션) 자리표시를 보여줘요. */
export const CgvPoster = ({
    src, bg, className = '', style, children,
}: { src?: string; bg?: string; className?: string; style?: CSSProperties; children?: ReactNode }) => (
    <div className={`cg-poster ${className}`} style={{ ...(bg ? { background: bg } : {}), ...style }}>
        {src && <img src={src} alt="" />}
        {children}
    </div>
)