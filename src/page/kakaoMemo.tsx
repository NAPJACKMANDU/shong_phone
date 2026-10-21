import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { KakaoStatusBar, IconSearch, lineProps } from '../common/kakaoCommon.tsx'
import '../css/kakaoMemoCss.css'

/* ===================== 아이콘 ===================== */
const IconBack = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2.4">
        <polyline points="15 4 7 12 15 20" />
    </svg>
)
const IconDots = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="4.5" cy="12" r="2.1" />
        <circle cx="12" cy="12" r="2.1" />
        <circle cx="19.5" cy="12" r="2.1" />
    </svg>
)
const IconChevronDown = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 8 12 16 20 8" />
    </svg>
)
const IconMic = () => (
    <svg className="mm-mic" viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <rect x="9" y="2.5" width="6" height="12" rx="3" />
        <path d="M5 11.5a7 7 0 0 0 14 0M12 18.5v3" />
    </svg>
)
const IconCompose = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <path d="M17.5 13.5V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9.5a3 3 0 0 1 3-3h4.5" />
        <path d="M20.3 3.7a2 2 0 0 1 0 2.8L12 14.8l-3.6.9.9-3.6 8.2-8.4a2 2 0 0 1 2.8 0z" />
    </svg>
)

/* ===================== 데이터 ===================== */
interface Memo {
    id: number
    title: string
    date: string
    preview?: string // 비워두면 '추가 텍스트 없음'
}

interface Section {
    key: string
    title: string
    memos: Memo[]
    collapsible?: boolean
}

const SECTIONS: Section[] = [
    {
        key: 'pinned', title: '고정된 메모', collapsible: true,
        memos: [
            { id: 1, title: '2026020281', date: '2026. 10. 6.', preview: 'ㅎㅎ' },
            { id: 2, title: 'P240000133972', date: '2025. 8. 5.' },
            { id: 3, title: '넷플릭스', date: '2023. 11. 13.', preview: 'ㅎㅎ' },
            { id: 4, title: 'ThisisYS@pso.kr', date: '2021. 5. 23.' },
        ],
    },
    {
        key: 'week', title: '이전 7일',
        memos: [
            { id: 5, title: '<NOL 모바일티켓이 도착했어요>', date: '목요일', preview: '받은티켓 : 2026 준플레이오프 1차전 KIA vs LG' },
        ],
    },
    {
        key: 'month', title: '이전 30일',
        memos: [
            { id: 6, title: 'https://spin-spin.com/7quiol2', date: '2026. 10. 10.' },
            { id: 7, title: '마우스피스 실리콘 마모 방지', date: '2026. 10. 9.' },
            { id: 8, title: '이노시톨', date: '2026. 10. 3.', preview: '역애' },
            { id: 9, title: '송 헤테로라 톤 여자인 줄 알고 데리고 갔으면 좋겠다', date: '2026. 10. 1.', preview: '키가 지인짜 크네 농구해? 아니면 배구하나…' },
            { id: 10, title: '얘들아 희정이가 의자 없는데 여기 앉잖다', date: '2026. 9. 30.' },
            { id: 11, title: '장보기 목록', date: '2026. 9. 29.' },
        ],
    },
    {
        key: 'sep', title: '9월',
        memos: [
            { id: 12, title: '과제 마감 정리', date: '2026. 9. 21.' },
            { id: 13, title: '운동 루틴', date: '2026. 9. 12.' },
            { id: 14, title: '읽을 책', date: '2026. 9. 3.' },
        ],
    },
]

/* ===================== 메모 페이지 ===================== */
export const KakaoMemo = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState('')
    const [pinnedOpen, setPinnedOpen] = useState(true)

    // 검색어가 있으면 제목/내용에서 찾기
    const sections = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return SECTIONS
        return SECTIONS
            .map((s) => ({
                ...s,
                memos: s.memos.filter((m) =>
                    m.title.toLowerCase().includes(q) || (m.preview ?? '').toLowerCase().includes(q)),
            }))
            .filter((s) => s.memos.length > 0)
    }, [query])

    return (
        <div className="kk-wrapper mm-wrapper">
            <KakaoStatusBar time="2:35" battery={73} />

            {/* 상단 헤더 */}
            <div className="mm-header">
                <button className="mm-round-btn left" onClick={() => navigate('/homeScreen')}><IconBack /></button>
                <div className="mm-header-title">
                    <b>메모</b>
                    <span>668개의 메모</span>
                </div>
                <button className="mm-round-btn right"><IconDots /></button>
            </div>

            {/* 메모 목록 */}
            <div className="kk-scroll mm-scroll">
                {sections.map((s) => {
                    const open = !s.collapsible || pinnedOpen
                    return (
                        <div key={s.key}>
                            <div className="mm-section-head">
                                <span className="mm-section-title">{s.title}</span>
                                {s.collapsible && (
                                    <button
                                        className={`mm-section-chevron ${pinnedOpen ? '' : 'closed'}`}
                                        onClick={() => setPinnedOpen(!pinnedOpen)}
                                    >
                                        <IconChevronDown />
                                    </button>
                                )}
                            </div>
                            {open && (
                                <div className="mm-card">
                                    {s.memos.map((m) => (
                                        <div className="mm-row" key={m.id}>
                                            <div className="mm-memo-title">{m.title}</div>
                                            <div className="mm-memo-sub">
                                                <span className="mm-memo-date">{m.date}</span>
                                                <span className="mm-memo-preview">{m.preview ?? '추가 텍스트 없음'}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                })}
                {sections.length === 0 && <div className="mm-empty">검색 결과가 없습니다</div>}
            </div>

            {/* 하단 흐림 + 검색 / 새 메모 */}
            <div className="mm-fade" />
            <div className="mm-bottom">
                <label className="mm-search">
                    <IconSearch />
                    <input
                        type="text"
                        placeholder="검색"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <IconMic />
                </label>
                <button className="mm-compose"><IconCompose /></button>
            </div>
        </div>
    )
}
export default KakaoMemo