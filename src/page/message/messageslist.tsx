import { useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { KakaoStatusBar, IconSearch, lineProps } from '../../common/kakaoCommon.tsx'
import { MsgAvatar, IconMic, IMESSAGE_PATH } from '../../common/imessagecommon.tsx'
import {
    getThreadReadVersion, getThreadUnreadCount, lastMessageText, subscribeToThreadReadStatus, THREADS,
} from '../../data/messagesdata.ts'
import '../../css/message/messageslistCss.css'

/* ===================== 아이콘 ===================== */
const IconFilter = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <path d="M3.5 7h17M6.5 12h11M9.5 17h5" />
    </svg>
)
const IconChevron = () => (
    <svg className="il-chev" viewBox="0 0 7 13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 1 6 6.5 1 12" />
    </svg>
)
const IconCompose = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <path d="M17.5 13.5V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V9.5a3 3 0 0 1 3-3h4.5" />
        <path d="M20.3 3.7a2 2 0 0 1 0 2.8L12 14.8l-3.6.9.9-3.6 8.2-8.4a2 2 0 0 1 2.8 0z" />
    </svg>
)

/* ===================== 메시지 목록 페이지 ===================== */
export const MessagesList = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [query, setQuery] = useState('')
    useSyncExternalStore(subscribeToThreadReadStatus, getThreadReadVersion, getThreadReadVersion)

    const threads = useMemo(() => {
        const q = query.trim().toLowerCase()
        const previews = THREADS.map((thread) => ({ thread, preview: lastMessageText(thread) }))
        if (!q) return previews
        return previews.filter(({ thread, preview }) =>
            thread.name.toLowerCase().includes(q) || preview.toLowerCase().includes(q),
        )
    }, [query])

    useLayoutEffect(() => {
        const state = location.state as { listScrollTop?: unknown } | null
        const scrollTop = typeof state?.listScrollTop === 'number' ? state.listScrollTop : 0
        if (wrapperRef.current) wrapperRef.current.scrollTop = scrollTop
    }, [location.state])

    return (
        <div
            className="kk-wrapper il-wrapper"
            ref={wrapperRef}
        >
            {/* 내용 (스크롤) */}
            <div className="il-scroll">
                <h1 className="il-title">메시지</h1>

                <div className="il-share">
                    <MsgAvatar size={43} letter="정" />
                    <div className="il-share-text">
                        <b>정성찬</b>
                        <span>이름 및 사진 공유</span>
                    </div>
                    <IconChevron />
                </div>

                <div className="il-list">
                    {threads.map(({ thread, preview }) => (
                        <div
                            className="il-row"
                            key={thread.id}
                            onClick={() => navigate(`${IMESSAGE_PATH.chat}?id=${thread.id}`, {
                                state: { listScrollTop: wrapperRef.current?.scrollTop ?? 0 },
                            })}
                        >
                            {getThreadUnreadCount(thread.id) > 0 && <i className="il-dot" />}
                            <MsgAvatar size={45} letter={thread.letter} />
                            <div className="il-body">
                                <span className="il-name">{thread.name}</span>
                                <span className="il-time">{thread.time}</span>
                                <IconChevron />
                                <div className="il-preview">{preview}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 위쪽 흐림 + 편집 / 필터 버튼 */}
            <div className="im-topfade" />
            <div className="il-header">
                <button className="im-pill im-glass">편집</button>
                <button className="im-round im-glass"><IconFilter /></button>
            </div>

            {/* 카카오 공통 상태바 */}
            <KakaoStatusBar time="4:23" battery={74} />

            {/* 하단 흐림 + 검색 / 새 메시지 */}
            <div className="im-bottomfade" />
            <div className="il-bar">
                <label className="il-search im-glass">
                    <IconSearch />
                    <input type="text" placeholder="검색" value={query} onChange={(e) => setQuery(e.target.value)} />
                    <IconMic />
                </label>
                <button className="il-compose im-round im-glass"><IconCompose /></button>
            </div>
        </div>
    )
}
export default MessagesList