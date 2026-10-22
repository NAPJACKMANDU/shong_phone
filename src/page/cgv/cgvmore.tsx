import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { KakaoStatusBar } from '../../common/kakaoCommon.tsx'
import { CgvTopbar, CgvTabBar, CGV_PATH } from '../../common/cgvCommon.tsx'
import '../../css/cgv/cgvmoreCss.css'

/* ===================== 아이콘 ===================== */
const IconChevronRight = () => (
    <svg viewBox="0 0 7 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 1 6 6 1 11" />
    </svg>
)
const IconClose = () => (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <path d="M2 2l8 8M10 2l-8 8" />
    </svg>
)
const IconPerson = () => (
    <svg viewBox="0 0 26 26" fill="#cfcfcf">
        <circle cx="13" cy="9" r="5" />
        <path d="M3 23c0-5 4.5-7.5 10-7.5S23 18 23 23z" />
    </svg>
)
const IconGiftCard = () => (
    <svg viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="14" rx="3" />
        <path d="M5.5 8h5" />
        <path d="M11 14.5v3M14 14.5v3M17 14.5v3" stroke="#e5182a" />
    </svg>
)

/* ===================== 데이터 ===================== */
const POINTS = [
    { value: '0', label: '쿠폰' },
    { value: '0', label: '관람/기프트콘' },
    { value: '0', label: '기간횟수권' },
]

const MENUS = [
    '내가 본 영화', '보관함',
    '스마트결제관리', '예약/결제내역',
    '내 차량번호 조회', '자주가는 CGV',
]

/* ===================== CGV 더보기 페이지 ===================== */
export const CgvMore = () => {
    const navigate = useNavigate()
    const [showRecent, setShowRecent] = useState(true)

    const handleMenu = (label: string) => {
        if (label === '내가 본 영화') navigate(CGV_PATH.watched)
    }

    return (
        <div className="kk-wrapper cm-wrapper">
            <KakaoStatusBar time="2:40" battery={96} />

            <div className="kk-scroll cm-scroll">
                <CgvTopbar bellBadge={2} />

                {/* 인사 + 프로필 */}
                <div className="cm-profile">
                    <div className="cm-name">햄부기햄부기햄버거 님</div>
                    <button className="cm-grade">내 등급 보러 가기<IconChevronRight /></button>
                    <div className="cm-avatar"><IconPerson /></div>
                </div>

                {/* 등급 진행 바 */}
                <div className="cm-bar">
                    <div className="cm-bar-fill" style={{ width: '77%' }}>7,665점</div>
                </div>
                <div className="cm-bar-labels">
                    <span>일반</span>
                    <span>10,000점</span>
                </div>

                {/* 포인트 카드 */}
                <div className="cm-card">
                    <div className="cm-card-top">
                        <i className="cm-cj" />
                        <span>CJ ONE Point</span>
                        <b>2,093P</b>
                    </div>
                    <div className="cm-card-grid">
                        {POINTS.map((p) => (
                            <div key={p.label}>
                                <div className="cm-card-val">{p.value}</div>
                                <div className="cm-card-label">{p.label}</div>
                            </div>
                        ))}
                        <div>
                            <div className="cm-card-val"><IconGiftCard /></div>
                            <div className="cm-card-label">기프트카드</div>
                        </div>
                    </div>
                </div>

                {/* 최근 이용 */}
                <div className="cm-h2">최근 이용</div>
                <div className="cm-recent">
                    {showRecent && (
                        <span className="cm-recent-chip">
                            내가 본 영화
                            <button onClick={() => setShowRecent(false)}><IconClose /></button>
                        </span>
                    )}
                </div>

                {/* 나의 정보 관리 */}
                <div className="cm-sub">나의 정보 관리</div>
                <div className="cm-menu">
                    {MENUS.map((m) => (
                        <button key={m} onClick={() => handleMenu(m)}>{m}</button>
                    ))}
                </div>

                {/* 광고 */}
                <div className="cm-ad">
                    <div className="cm-ad-text">
                        결제내역확인하고
                        <b>혜택까지 받아가세요</b>
                    </div>
                    <span className="cm-ad-tag">AD</span>
                    <div className="cm-ad-art" />
                </div>
            </div>

            <CgvTabBar active="more" expanded={false} />
        </div>
    )
}
export default CgvMore