import { useNavigate } from 'react-router-dom'
import { KakaoStatusBar } from '../../common/kakaoCommon.tsx'
import { CgvPoster, AgeBadge, CGV_PATH } from '../../common/cgvCommon.tsx'
import '../../css/cgv/cgvWatchedCss.css'

/* ===================== 아이콘 ===================== */
const IconBack = () => (
    <svg viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="10 2 2 10 10 18" />
    </svg>
)
const IconHome = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 11.2c0-.8.4-1.5 1-2l5-4.2a2 2 0 0 1 2.6 0l5 4.2c.6.5 1 1.2 1 2V18a2.5 2.5 0 0 1-2.5 2.5h-9.5A2.5 2.5 0 0 1 4.5 18z" />
    </svg>
)
const IconPrev = () => (
    <svg viewBox="0 0 10 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="8 2 2 8 8 14" />
    </svg>
)
const IconCalendarCheck = () => (
    <svg className="cw-range-cal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="5" width="17" height="16" rx="3" />
        <path d="M8 2.5v4M16 2.5v4" />
        <path d="M8.5 13.5l2.5 2.5 4.5-5" />
    </svg>
)

/* ===================== 데이터 =====================
   poster 에 이미지 주소를 넣으면 포스터가, 비워두면 bg 색이 보여요. */
interface Watched {
    id: number
    title: string
    age: '12' | '15' | '19' | 'ALL'
    date: string
    theater: string[]    // ['천호 4관'] 또는 ['판교 4DX관', '4DX'] (구분선으로 이어 붙임)
    tag: string
    poster?: string
    bg: string
}

const WATCHED: Watched[] = [
    {
        id: 1, title: '스파이더맨-브랜드 뉴 데이', age: '12',
        date: '2026.08.23(일) 15:00~17:35', theater: ['천호 4관'], tag: '일반 2',
        bg: 'linear-gradient(100deg,#c1202c 0%,#7a0f18 50%,#1e3d5e 100%)',
    },
    {
        id: 2, title: '스파이더맨-브랜드 뉴 데이', age: '12',
        date: '2026.08.12(수) 19:20~21:55', theater: ['판교 4DX관', '4DX'], tag: '일반 1',
        bg: 'linear-gradient(100deg,#c1202c 0%,#7a0f18 50%,#1e3d5e 100%)',
    },
    {
        id: 3, title: '군체', age: '15',
        date: '2026.06.10(수) 20:00~22:12', theater: ['평촌 10관'], tag: '일반 2',
        bg: 'linear-gradient(160deg,#10302a 0%,#2f6a58 50%,#0a1a16 100%)',
    },
]

/* ===================== 내가 본 영화 페이지 ===================== */
export const CgvWatched = () => {
    const navigate = useNavigate()

    return (
        <div className="kk-wrapper cw-wrapper">
            <KakaoStatusBar time="2:40" battery={96} />

            {/* 상단 바 */}
            <div className="cw-appbar">
                <button className="cw-icon-btn back" onClick={() => navigate(-1)}><IconBack /></button>
                <button className="cw-icon-btn home" onClick={() => navigate(CGV_PATH.home)}><IconHome /></button>
                <div className="cw-appbar-title">내가 본 영화</div>
            </div>

            {/* 기간 */}
            <div className="cw-range">
                <button className="cw-range-prev"><IconPrev /></button>
                <IconCalendarCheck />
                <span>2026.04.22 ~ 2026.10.21</span>
            </div>

            {/* 영화 카드 목록 */}
            <div className="kk-scroll cw-scroll">
                {WATCHED.map((w) => (
                    <div className="cw-card" key={w.id}>
                        <div className="cw-top">
                            <CgvPoster src={w.poster} bg={w.bg} className="cw-poster" />
                            <div className="cw-info">
                                <div className="cw-title">
                                    <span>{w.title}</span>
                                    <AgeBadge age={w.age} />
                                </div>
                                <div className="cw-date">{w.date}</div>
                                <div className="cw-theater">
                                    {w.theater.map((t, i) => (
                                        <span key={i} style={{ display: 'contents' }}>
                                            {i > 0 && <i className="cw-sep" />}
                                            <span>{t}</span>
                                        </span>
                                    ))}
                                </div>
                                <span className="cw-tag">{w.tag}</span>
                            </div>
                            <button className="cw-menu"><i /><i /><i /></button>
                        </div>
                        <button className="cw-review">
                            <span>관람하신 영화, 어떠셨나요?</span>
                            <span>실관람평을 남겨주세요.</span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default CgvWatched