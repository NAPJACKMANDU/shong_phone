import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getBackDestination, KakaoStatusBar, IconSearch, lineProps } from '../../common/kakaoCommon.tsx'
import { MEMOS, SECTION_DEFS, TOTAL_COUNT, MEMO_PATH, memoTitle, memoPreview } from '../../data/memoData.ts'
import '../../css/memo/kakaoMemoCSS.css'

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

/* ===================== 메모 목록 페이지 =====================
   목록의 제목 / 미리보기 / 날짜는 memoData.ts 의 메모 글(body)에서 가져와요.
   메모를 누르면 /kakaoMemoRoom?id=번호 로 들어가요. */
export const KakaoMemo = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [query, setQuery] = useState('')
    const [pinnedOpen, setPinnedOpen] = useState(true)

    // 섹션별로 묶고, 검색어가 있으면 글 전체에서 찾기
    const sections = useMemo(() => {
        const q = query.trim().toLowerCase()
        return SECTION_DEFS
            .map((def) => ({
                ...def,
                memos: MEMOS.filter((m) => m.section === def.key && (!q || m.body.toLowerCase().includes(q))),
            }))
            .filter((s) => s.memos.length > 0)
    }, [query])

    return (
        <div className="kk-wrapper mm-wrapper">
            <KakaoStatusBar time="2:35" battery={96} />

            {/* 상단 헤더 */}
            <div className="mm-header">
                <button className="mm-round-btn left" onClick={() => navigate(getBackDestination(location.pathname), { replace: true })}><IconBack /></button>
                <div className="mm-header-title">
                    <b>메모</b>
                    <span>{TOTAL_COUNT}개의 메모</span>
                </div>
                <button className="mm-round-btn right"><IconDots /></button>
            </div>

            {/* 메모 목록 */}
            <div className="mm-scroll">
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
                                        <div
                                            className="mm-row"
                                            key={m.id}
                                            onClick={() => navigate(`${MEMO_PATH.room}?id=${m.id}`)}
                                        >
                                            <div className="mm-memo-title">{memoTitle(m)}</div>
                                            <div className="mm-memo-sub">
                                                <span className="mm-memo-date">{m.date}</span>
                                                <span className="mm-memo-preview">{memoPreview(m) ?? '추가 텍스트 없음'}</span>
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