import { useLayoutEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import type { ReactNode } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { getBackDestination, KakaoStatusBar, lineProps } from '../../common/kakaoCommon.tsx'
import { MsgAvatar, IconMic, IconChevronLeft } from '../../common/imessagecommon.tsx'
import {
    getThread, getThreadReadVersion, getUnreadTotal, markThreadAsRead, subscribeToThreadReadStatus,
} from '../../data/messagesdata.ts'
import type { ChatItem } from '../../data/messagesdata.ts'
import '../../css/message/messageschatCss.css'

/* ===================== 아이콘 ===================== */
const IconVideo = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <rect x="2" y="6" width="14.5" height="12" rx="3" />
        <path d="M16.5 10.5L21.5 8v8l-5-2.5" />
    </svg>
)
const IconPlus = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2.4">
        <path d="M12 4v16M4 12h16" />
    </svg>
)
const IconSmallChevron = () => (
    <svg viewBox="0 0 7 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 1 6 6 1 11" />
    </svg>
)
const IconLock = () => (
    <svg viewBox="0 0 9 11" fill="currentColor">
        <rect x="0.5" y="4.5" width="8" height="6" rx="1.5" />
        <path d="M2.5 4.5V3.2a2 2 0 0 1 4 0v1.3" fill="none" stroke="currentColor" strokeWidth="1.3" />
    </svg>
)

/* ===================== 글자 꾸미기 =====================
   **굵게**  __밑줄__  http 주소(자동 링크) */
const TOKEN = /(\*\*.+?\*\*|__.+?__|https?:\/\/[^\s]+)/g

const renderRich = (text: string): ReactNode[] =>
    text.split(TOKEN).filter(Boolean).map((part, i) => {
        if (part.startsWith('**')) return <b key={i}>{part.slice(2, -2)}</b>
        if (part.startsWith('__')) return <u key={i}>{part.slice(2, -2)}</u>
        if (/^https?:\/\//.test(part)) {
            return <a key={i} className="ic-link" href={part} onClick={(e) => e.preventDefault()}>{part}</a>
        }
        return part
    })

/* ===================== 간격 / 말풍선 꼬리 자동 계산 =====================
   사진과 똑같이 보이게 맞춘 간격(px)이에요. */
interface Row {
    item: ChatItem
    mt: number
    tail: boolean
}

const layoutRows = (items: ChatItem[]): Row[] =>
    items.map((item, i) => {
        const prev = items[i - 1]
        const next = items[i + 1]
        let mt = 0

        if (prev) {
            if (item.kind === 'bubble') {
                if (prev.kind === 'bubble') mt = prev.from === item.from && !item.newGroup ? 5 : 10
                else if (prev.kind === 'stamp') mt = 6
                else if (prev.kind === 'caption') mt = 7.5
                else mt = 6 // 읽음 표시 다음
            } else if (item.kind === 'caption') {
                mt = 14
            } else if (item.kind === 'stamp') {
                mt = prev.kind === 'caption' ? 13.5 : 12.7
            } else {
                mt = 3 // 읽음 표시
            }
        }

        // 같은 사람이 바로 이어서 보낸 말풍선이 없으면 꼬리를 달아요
        const tail =
            item.kind === 'bubble' &&
            !(next && next.kind === 'bubble' && next.from === item.from && !next.newGroup)

        return { item, mt, tail }
    })

/* ===================== 대화방 페이지 =====================*/
export const MessagesChat = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [params] = useSearchParams()
    const thread = getThread(Number(params.get('id')))
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [text, setText] = useState('')
    useSyncExternalStore(subscribeToThreadReadStatus, getThreadReadVersion, getThreadReadVersion)

    const rows = useMemo(() => layoutRows(thread.items), [thread])

    // The wrapper is the scroll container; start at the latest message.
    useLayoutEffect(() => {
        const wrapper = wrapperRef.current
        if (wrapper) wrapper.scrollTop = wrapper.scrollHeight
        markThreadAsRead(thread.id)
    }, [thread.id])

    const unreadTotal = getUnreadTotal()

    const gap = (mt: number) => ({ marginTop: `calc(var(--u) * ${mt})` })

    return (
        <div className="kk-wrapper ic-wrapper" ref={wrapperRef}>
            {/* 메시지 목록 */}
            <div className="ic-messages">
                {rows.map(({ item, mt, tail }, i) => {
                    if (item.kind === 'bubble') {
                        const color = item.from === 'other' ? 'gray' : (item.color ?? thread.meColor)
                        return (
                            <div
                                key={i}
                                className={`ic-bubble ${item.from} c-${color} ${tail ? 'tail' : ''} ${item.narrow ? 'narrow' : ''} ${item.breakAll ? 'break' : ''}`}
                                style={gap(mt)}
                            >
                                {renderRich(item.text)}
                            </div>
                        )
                    }
                    if (item.kind === 'caption') {
                        return (
                            <div key={i} className="ic-caption" style={gap(mt)}>
                                {item.lines.map((l, j) => <div key={j}>{l}</div>)}
                                {item.lock && <div><span><IconLock />{item.lock}</span></div>}
                                {item.stamp && (
                                    <div className="ic-caption-stamp"><b>{item.stamp.day}</b> {item.stamp.time}</div>
                                )}
                            </div>
                        )
                    }
                    if (item.kind === 'stamp') {
                        return (
                            <div key={i} className="ic-stamp" style={gap(mt)}>
                                <b>{item.day}</b> {item.time}
                            </div>
                        )
                    }
                    return <div key={i} className="ic-receipt" style={gap(mt)}>{item.text}</div>
                })}
            </div>

            {/* 위쪽 흐림 + 상단 (뒤로 / 상대방 / 영상통화) */}
            <div className="im-topfade" />
            <div className="ic-top">
                <button
                    className="ic-back im-glass"
                    onClick={() => navigate(getBackDestination(location.pathname), { replace: true, state: location.state })}
                >
                    <IconChevronLeft />
                    {unreadTotal > 0 && <span className="ic-back-count">{unreadTotal}</span>}
                </button>
                <button className="ic-name im-glass">
                    {thread.name}
                    <IconSmallChevron />
                </button>
                <div className="ic-center-avatar"><MsgAvatar size={60} letter={thread.letter} /></div>
                <button className="ic-video im-round im-glass"><IconVideo /></button>
            </div>

            {/* 카카오 공통 상태바 */}
            <KakaoStatusBar time="4:23" battery={74} />

            {/* 하단 흐림 + 입력창 */}
            <div className="im-bottomfade" />
            <div className="ic-input">
                <button className="ic-plus im-round im-glass"><IconPlus /></button>
                <label className="ic-field im-glass">
                    <input
                        type="text"
                        placeholder={thread.meColor === 'imsg' ? 'iMessage' : '문자 메시지 • RCS'}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <IconMic />
                </label>
            </div>
        </div>
    )
}
export default MessagesChat