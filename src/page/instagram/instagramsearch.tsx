import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getBackDestination, KakaoStatusBar } from '../../common/kakaoCommon.tsx'
import { IgAvatar, IgTabBar, IconSearch, IconClose } from '../../common/instagramcommon.tsx'
import { SEARCH_HISTORY } from '../../data/instagramdata.ts'
import '../../css/instagram/instagramsearchCss.css'

const IconClock = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 6.5V12l-2.5 4" />
    </svg>
)

/* ===================== 인스타그램 검색 ===================== */
export const InstagramSearch = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [query, setQuery] = useState('')
    const [items, setItems] = useState(SEARCH_HISTORY)

    // 글자를 입력하면 최근 검색에서 이름이 맞는 것만 보여줘요
    const shown = useMemo(() => {
        const q = query.trim().toLowerCase()
        return q ? items.filter((it) => it.name.toLowerCase().includes(q)) : items
    }, [query, items])

    const remove = (id: number) => setItems((prev) => prev.filter((it) => it.id !== id))

    return (
        <div className="kk-wrapper ig-wrapper">
            {/* 내용 (스크롤) */}
            <div className="is-body">
                <div className="is-section">
                    <b>최근 검색</b>
                    <span className="ig-link">모두 보기</span>
                </div>

                <div className="is-list">
                    {shown.map((it) => (
                        <div className="is-row" key={it.id}>
                            {it.kind === 'term' ? (
                                <div className="is-clock"><IconClock /></div>
                            ) : (
                                <IgAvatar size={44} tint={it.tint ?? 0} />
                            )}
                            <div className="is-text">
                                <span className="is-name">{it.name}</span>
                                {it.sub && <span className="is-sub">{it.sub}</span>}
                            </div>
                            <button className="is-remove" onClick={() => remove(it.id)}><IconClose /></button>
                        </div>
                    ))}
                    {shown.length === 0 && <div className="is-empty">최근 검색 내역이 없습니다</div>}
                </div>
            </div>

            {/* 위쪽 검색창 */}
            <div className="is-head">
                <div className="is-top">
                    <label className="is-field">
                        <IconSearch />
                        <input
                            type="text"
                            placeholder="검색"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </label>
                    <button className="is-cancel" onClick={() => navigate(getBackDestination(location.pathname), { replace: true })}>취소</button>
                </div>
            </div>

            {/* 카카오 공통 상태바 */}
            <KakaoStatusBar time="4:23" battery={74} />

            {/* 하단 탭바 */}
            <IgTabBar active="search" />
        </div>
    )
}
export default InstagramSearch