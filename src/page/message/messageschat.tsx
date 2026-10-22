import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { KakaoStatusBar, lineProps } from '../../common/kakaoCommon.tsx'
import { MsgAvatar, IconMic, IconChevronLeft } from '../../common/imessagecommon.tsx'
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

/* ===================== 메시지 데이터 ===================== */
type Item =
    | { id: number; kind: 'bubble'; from: 'me' | 'other'; color: 'sms' | 'imsg' | 'green' | 'gray'; text: ReactNode; tail?: boolean; narrow?: boolean; breakAll?: boolean; mt: number; anchor?: boolean }
    | { id: number; kind: 'caption'; lines: ReactNode[]; mt: number }
    | { id: number; kind: 'stamp'; day: string; time: string; mt: number }
    | { id: number; kind: 'receipt'; text: string; mt: number }

const ITEMS: Item[] = [
    { id: 1, kind: 'bubble', from: 'other', color: 'gray', text: 'ㅇㅋㅇㅋ', tail: true, mt: 0 },
    { id: 2, kind: 'bubble', from: 'me', color: 'sms', text: '웅완선', tail: true, mt: 10 },
    { id: 3, kind: 'bubble', from: 'other', color: 'gray', text: '그럼 이따 봐', tail: true, mt: 10 },
    { id: 4, kind: 'bubble', from: 'me', color: 'sms', text: '오케잉', tail: true, mt: 10, anchor: true },
    { id: 5, kind: 'bubble', from: 'me', color: 'sms', text: '이차오빠임???', mt: 10 },
    { id: 6, kind: 'bubble', from: 'me', color: 'sms', text: 'ㅋㅅㅋㅅㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱ', tail: true, breakAll: true, mt: 5 },
    { id: 7, kind: 'caption', lines: ['문자 메시지 • SMS', '암호화되지 않음'], mt: 13.5 },
    { id: 8, kind: 'stamp', day: '8월 10일 (월)', time: '오후 12:32', mt: 13.5 },
    {
        id: 9, kind: 'bubble', from: 'other', color: 'gray', tail: true, narrow: true, mt: 6,
        text: <>{'  ★ 매너콜 ★\n[통화중] 상황에서 고객님께 걸려온 전화입니다.\n08/10 '}<u>오후 12:32</u></>,
    },
    { id: 10, kind: 'stamp', day: '10월 8일 (목)', time: '오후 5:43', mt: 12.7 },
    { id: 11, kind: 'bubble', from: 'me', color: 'green', text: '나 사무실들어옴!! ㅠ', tail: true, mt: 6.3 },
    { id: 12, kind: 'caption', lines: ['iMessage', <span key="l"><IconLock />암호화됨</span>], mt: 14.5 },
    { id: 13, kind: 'bubble', from: 'other', color: 'gray', text: '아 오키오키', mt: 7.5 },
    { id: 14, kind: 'bubble', from: 'other', color: 'gray', text: <>모이는 시간 <u>8시</u>??</>, mt: 5 },
    { id: 15, kind: 'bubble', from: 'other', color: 'gray', text: '몇시인지 알려주면 가서 웨이팅 하고 있을게', tail: true, mt: 5 },
    { id: 16, kind: 'bubble', from: 'me', color: 'imsg', text: <><u>7시40분</u>!!</>, tail: true, mt: 11 },
    { id: 17, kind: 'receipt', text: '읽음: 2026. 10. 8.', mt: 3 },
    { id: 18, kind: 'bubble', from: 'other', color: 'gray', text: '오키오키!!', tail: true, mt: 6 },
]

/* ===================== 대화방 페이지 ===================== */
export const MessagesChat = () => {
    const navigate = useNavigate()
    const boxRef = useRef<HTMLDivElement>(null)
    const anchorRef = useRef<HTMLDivElement>(null)
    const [text, setText] = useState('')

    // 처음 화면: '오케잉' 말풍선이 위에서 116px 지점에 오도록 스크롤
    useEffect(() => {
        const box = boxRef.current
        const anchor = anchorRef.current
        if (!box || !anchor) return
        const u = box.clientWidth / 393
        box.scrollTop = anchor.offsetTop - 116 * u
    }, [])

    const gap = (mt: number) => ({ marginTop: `calc(var(--u) * ${mt})` })

    return (
        <div className="kk-wrapper ic-wrapper">
            {/* 메시지 목록 */}
            <div className="ic-messages" ref={boxRef}>
                {ITEMS.map((it) => {
                    if (it.kind === 'bubble') {
                        return (
                            <div
                                key={it.id}
                                ref={it.anchor ? anchorRef : undefined}
                                className={`ic-bubble ${it.from} c-${it.color} ${it.tail ? 'tail' : ''} ${it.narrow ? 'narrow' : ''} ${it.breakAll ? 'break' : ''}`}
                                style={gap(it.mt)}
                            >
                                {it.text}
                            </div>
                        )
                    }
                    if (it.kind === 'caption') {
                        return (
                            <div key={it.id} className="ic-caption" style={gap(it.mt)}>
                                {it.lines.map((l, i) => <div key={i}>{l}</div>)}
                            </div>
                        )
                    }
                    if (it.kind === 'stamp') {
                        return (
                            <div key={it.id} className="ic-stamp" style={gap(it.mt)}>
                                <b>{it.day}</b> {it.time}
                            </div>
                        )
                    }
                    return <div key={it.id} className="ic-receipt" style={gap(it.mt)}>{it.text}</div>
                })}
            </div>

            {/* 위쪽 흐림 + 상단 (뒤로 / 상대방 / 영상통화) */}
            <div className="im-topfade" />
            <div className="ic-top">
                <button className="ic-back im-glass" onClick={() => navigate(-1)}>
                    <IconChevronLeft />
                    <span className="ic-back-count">517</span>
                </button>
                <div className="ic-center-avatar"><MsgAvatar size={60} /></div>
                <button className="ic-name im-glass">
                    서정호 오빠
                    <IconSmallChevron />
                </button>
                <button className="ic-video im-round im-glass"><IconVideo /></button>
            </div>

            {/* 카카오 공통 상태바 */}
            <KakaoStatusBar time="10:00" battery={25} />

            {/* 하단 흐림 + 입력창 */}
            <div className="im-bottomfade" />
            <div className="ic-input">
                <button className="ic-plus im-round im-glass"><IconPlus /></button>
                <label className="ic-field im-glass">
                    <input type="text" placeholder="iMessage" value={text} onChange={(e) => setText(e.target.value)} />
                    <IconMic />
                </label>
            </div>
        </div>
    )
}
export default MessagesChat