import { useRef, useState } from 'react'
import { KakaoStatusBar } from '../../common/kakaoCommon.tsx'
import { CgvTopbar, CgvTabBar, CgvPoster, AgeBadge } from '../../common/cgvCommon.tsx'
import '../../css/cgv/cgvhomeCss.css'

/* ===================== 아이콘 / 그림 ===================== */
const IconClapper = () => (
    <svg viewBox="0 0 22 22">
        <rect x="2" y="9" width="18" height="11" rx="2" fill="#e8e8e8" />
        <path d="M2.5 4.5l16-2.5 .8 4.5-16 2.5z" fill="#bdbdbd" />
        <path d="M6 4l2.5 3.5M10.5 3.3L13 6.8M15 2.6l2.5 3.5" stroke="#333" strokeWidth="1.6" />
        <path d="M4 13h14M4 16.5h14" stroke="#9a9a9a" strokeWidth="1" />
    </svg>
)
const IconHeart = () => (
    <svg viewBox="0 0 24 22" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round">
        <path d="M12 20C4.5 14.5 2 11 2 7.5 2 4.5 4.2 2.5 6.8 2.5c2 0 3.7 1 5.2 3 1.5-2 3.2-3 5.2-3C19.8 2.5 22 4.5 22 7.5c0 3.5-2.5 7-10 12.5z" />
    </svg>
)
const IconChevronRight = () => (
    <svg viewBox="0 0 8 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1.5 1.5 6.5 6 1.5 10.5" />
    </svg>
)

/* 배너 오른쪽 그림 (클래퍼보드 + 10월 뱃지) */
const ClapperArt = () => (
    <svg className="ch-banner-art" viewBox="0 0 101 100">
        <path d="M14 52l3-1.5L16 49z" fill="#f7d800" />
        <path d="M5 46l2-5 2 5 5 2-5 2-2 5-2-5-5-2z" fill="#ffd400" opacity="0.9" />
        <g transform="rotate(-14 56 50)">
            <rect x="26" y="40" width="64" height="44" rx="5" fill="#1b1b1d" />
            <rect x="24" y="24" width="68" height="14" rx="3" fill="#111" />
            <path d="M32 24l8 14h-8zM48 24l8 14h-8zM64 24l8 14h-8zM80 24l8 14h-8z" fill="#fff" />
            <text x="58" y="56" textAnchor="middle" fontSize="5" fontWeight="700" fill="#cfcfcf">CGV ON DEMAND</text>
            <text x="58" y="72" textAnchor="middle" fontSize="15" fontWeight="900" fill="#fff">COD-7</text>
        </g>
        <circle cx="34" cy="80" r="16" fill="#ffe600" />
        <text x="34" y="85" textAnchor="middle" fontSize="13" fontWeight="900" fill="#1b1b1d">10월</text>
    </svg>
)

/* ===================== 데이터 =====================
   src 에 포스터 주소를 넣으면 그 이미지가, 비워두면 bg 색이 보여요. */
interface Movie {
    id: number
    title?: string
    age?: '12' | '15' | '19' | 'ALL'
    rank?: number
    fx?: string
    ad?: boolean
    src?: string
    bg?: string
}

const MOVIES: Movie[] = [
    { id: 0, title: 'CGV ON DEMAND', ad: true, bg: '#fde465' },
    {
        id: 1, title: '극장판 치이카와-인어 섬의 비밀', age: 'ALL', rank: 1, fx: '4DX', src:'cgv/cihikaawa.jpg'
    },
    { id: 2, title: '실낙원', age: '15', rank: 2, src: 'cgv/sillakwon.jpg' },
    { id: 3, title: '수능, 출제의 비밀', age: '12', rank: 3, src: 'cgv/suneung.jpg' },
]

const CHIPS = ['이벤트/혜택', 'KBO 포스트시즌', '단체관람']
const TABS = ['무비차트', '현재상영작', '상영예정', 'ICECON']

/* ===================== CGV 홈 페이지 ===================== */
export const CgvHome = () => {
    const [index, setIndex] = useState(1)
    const [tab, setTab] = useState('무비차트')
    const [dragOffset, setDragOffset] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)
    const swipeStart = useRef<{ x: number; y: number } | null>(null)
    const pendingDirection = useRef<number | null>(null)

    const prev = MOVIES[index - 1]
    const curr = MOVIES[index]
    const next = MOVIES[index + 1]

    const renderCard = (m: Movie | undefined, main: boolean) => {
        if (!m) return null
        return (
            <CgvPoster
                key={m.id}
                src={m.src}
                bg={m.bg}
                className={`ch-card ${main ? 'main' : ''}`}
                style={{}}
            >
                {m.ad && <><div className="ch-ad-art" /><span className="ch-ad-tag">AD</span></>}
                {m.rank && <span className="ch-rank">{m.rank}</span>}
                {main && m.fx && <span className="ch-fx">{m.fx}</span>}
                {main && !m.ad && <button className="ch-heart"><IconHeart /></button>}
            </CgvPoster>
        )
    }

    const handleSwipeEnd = (x: number, y: number) => {
        const start = swipeStart.current
        swipeStart.current = null
        if (!start) return

        const deltaX = x - start.x
        const deltaY = y - start.y
        const direction = deltaX < 0 ? 1 : -1
        const nextIndex = index + direction
        if (
            Math.abs(deltaX) < 40 ||
            Math.abs(deltaX) <= Math.abs(deltaY) ||
            nextIndex < 0 ||
            nextIndex >= MOVIES.length
        ) {
            setIsAnimating(true)
            setDragOffset(0)
            return
        }

        pendingDirection.current = direction
        setIsAnimating(true)
        setDragOffset(direction * -252)
    }

    return (
        <div className="kk-wrapper ch-wrapper">
            <KakaoStatusBar time="2:39" battery={96} />

            <div className="kk-scroll ch-scroll">
                <CgvTopbar showLogo />

                {/* 상단 칩 */}
                <div className="ch-chips">
                    <button className="ch-chip on"><IconClapper />영화</button>
                    {CHIPS.map((c) => <button key={c} className="ch-chip">{c}</button>)}
                </div>

                {/* 배너 */}
                <div className="ch-banner">
                    <div className="ch-banner-sub">이 영화가 벌써 10주년?</div>
                    <div className="ch-banner-title">COD-7 선정작 공개</div>
                    <button className="ch-banner-btn">예매하러 가기</button>
                    <ClapperArt />
                </div>

                {/* 무비차트 탭 */}
                <div className="ch-tabs">
                    {TABS.map((t) => (
                        <button key={t} className={`ch-tab ${tab === t ? 'on' : ''}`} onClick={() => setTab(t)}>{t}</button>
                    ))}
                    <i className="ch-tabs-div" />
                    <span className="ch-all">전체보기<IconChevronRight /></span>
                </div>

                {/* 포스터 캐러셀 (가운데가 크게) */}
                <div
                    className="ch-carousel"
                    onPointerDown={(event) => {
                        if (event.pointerType === 'mouse' && event.button !== 0) return
                        pendingDirection.current = null
                        setIsAnimating(false)
                        swipeStart.current = { x: event.clientX, y: event.clientY }
                        event.currentTarget.setPointerCapture(event.pointerId)
                    }}
                    onPointerMove={(event) => {
                        const start = swipeStart.current
                        if (start) setDragOffset(event.clientX - start.x)
                    }}
                    onPointerUp={(event) => handleSwipeEnd(event.clientX, event.clientY)}
                    onPointerCancel={() => {
                        swipeStart.current = null
                        pendingDirection.current = null
                        setIsAnimating(true)
                        setDragOffset(0)
                    }}
                >
                    <div
                        className="ch-track"
                        style={{
                            transform: `translateX(${dragOffset}px)`,
                            transition: isAnimating ? 'transform 260ms cubic-bezier(0.22, 0.61, 0.36, 1)' : 'none',
                        }}
                        onTransitionEnd={(event) => {
                            if (event.propertyName !== 'transform') return
                            const direction = pendingDirection.current
                            if (direction !== null) {
                                setIndex((current) => current + direction)
                                pendingDirection.current = null
                            }
                            setDragOffset(0)
                            setIsAnimating(false)
                        }}
                    >
                        {prev ? renderCard(prev, false) : <div className="ch-card ch-card-spacer" aria-hidden="true" />}
                        {renderCard(curr, true)}
                        {renderCard(next, false)}
                    </div>
                </div>

                {/* 영화 제목 */}
                <div className="ch-title-row">
                    <span>{curr?.title}</span>
                    {curr?.age && <AgeBadge age={curr.age} />}
                </div>
            </div>

            <CgvTabBar active="home" expanded />
        </div>
    )
}
export default CgvHome