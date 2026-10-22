import { useEffect, useRef, useState } from 'react'
import type { PointerEvent } from 'react'
import '../../css/kakaoTalk/kakaoNotificationCss.css'

/* ===================== 타입 ===================== */
export interface KakaoNoticeMsg {
    id: number
    sender: string
    text: string
    time?: string      // 기본값 '1분 전'
    photo?: boolean    // 사진 메시지면 true (오른쪽에 썸네일 표시)
    photoUrl?: string  // 썸네일 이미지 주소 (비워두면 회색 자리표시)
}

type Mode = 'hidden' | 'banner' | 'expanded'

/* ===================== 작은 파트 ===================== */
const Avatar = () => (
    <svg className="kn-avatar" viewBox="0 0 38 38">
        <defs>
            <linearGradient id="kn-ava-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#b3c0ee" />
                <stop offset="1" stopColor="#a5b5e6" />
            </linearGradient>
        </defs>
        <circle cx="19" cy="19" r="19" fill="url(#kn-ava-g)" />
        <circle cx="19" cy="15.5" r="4.3" fill="#cdd6f5" />
        <path d="M10.5 28.5c0-4.2 3.6-6 8.5-6s8.5 1.8 8.5 6c0 .8-.6 1.3-1.4 1.3H11.9c-.8 0-1.4-.5-1.4-1.3z" fill="#cdd6f5" />
    </svg>
)

const TalkBadge = () => (
    <svg className="kn-badge" viewBox="0 0 16 16">
        <rect width="16" height="16" rx="5" fill="#fee500" />
        <ellipse cx="8" cy="7.3" rx="5.6" ry="4.4" fill="#3a1d1d" />
        <path d="M5 10.5L4 13.2l4-2.2z" fill="#3a1d1d" />
        <text x="8" y="8.5" textAnchor="middle" fontSize="3.7" fontWeight="800" fill="#fee500">TALK</text>
    </svg>
)

const Card = ({ msg }: { msg: KakaoNoticeMsg }) => (
    <div className={`kn-card ${msg.photo ? 'has-photo' : ''}`}>
        <div className="kn-avatar-wrap">
            <Avatar />
            <TalkBadge />
        </div>
        <div className="kn-text">
            <div className="kn-sender">{msg.sender}</div>
            <div className="kn-msg">{msg.text}</div>
        </div>
        <span className="kn-time">{msg.time ?? '1분 전'}</span>
        {msg.photo && (
            msg.photoUrl
                ? <img className="kn-thumb" src={msg.photoUrl} alt="" />
                : <div className="kn-thumb" />
        )}
    </div>
)

/* ===================== 알림 컴포넌트 ===================== */
interface Props {
    messages: KakaoNoticeMsg[]   // 오래된 순서로 쌓아 주세요 (맨 뒤가 가장 최근)
    onClear?: () => void         // X 버튼을 눌렀을 때 (메시지 비우기)
    bannerMs?: number            // 배너가 떠 있는 시간 (기본 4초)
}

export const KakaoNotification = ({ messages, onClear, bannerMs = 4000 }: Props) => {
    const [mode, setMode] = useState<Mode>('hidden')
    const prevLen = useRef(0)
    const timer = useRef<number | undefined>(undefined)
    const downY = useRef<number | null>(null)

    // 새 메시지가 오면 위에서 배너가 내려옴
    useEffect(() => {
        if (messages.length > prevLen.current) {
            setMode((m) => (m === 'expanded' ? m : 'banner'))
            window.clearTimeout(timer.current)
            timer.current = window.setTimeout(() => {
                setMode((m) => (m === 'banner' ? 'hidden' : m))
            }, bannerMs)
        }
        if (messages.length === 0) setMode('hidden')
        prevLen.current = messages.length
    }, [messages.length, bannerMs])

    useEffect(() => () => window.clearTimeout(timer.current), [])

    const latest = messages[messages.length - 1]
    if (!latest) return null

    /* 배너: 탭하면 펼침 / 위로 밀면 사라짐 */
    const handleDown = (e: PointerEvent<HTMLDivElement>) => {
        e.currentTarget.setPointerCapture(e.pointerId)
        downY.current = e.clientY
    }
    const handleUp = (e: PointerEvent<HTMLDivElement>) => {
        if (downY.current === null) return
        const dy = e.clientY - downY.current
        downY.current = null
        if (dy < -24) {
            window.clearTimeout(timer.current)
            setMode('hidden')
        } else if (Math.abs(dy) < 10) {
            window.clearTimeout(timer.current)
            setMode('expanded')
        }
    }

    const handleClose = () => {
        setMode('hidden')
        onClear && onClear()
    }

    return (
        <div className={`kn-root ${mode}`}>
            {/* 펼쳤을 때 뒤 배경 (누르면 닫힘) */}
            <div className="kn-dim" onClick={() => setMode('hidden')} />

            {/* 상단에 뜨는 배너 (가장 최근 메시지 1개) */}
            <div className="kn-banner" onPointerDown={handleDown} onPointerUp={handleUp} onPointerCancel={() => { downY.current = null }}>
                <Card msg={latest} />
            </div>

            {/* 펼친 목록 (최신 메시지가 위) */}
            <div className="kn-panel">
                <div className="kn-header">
                    <span className="kn-title">카카오톡</span>
                    <button className="kn-fold" onClick={() => setMode('hidden')}>
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="2.5 5.5 8 11 13.5 5.5" />
                        </svg>
                        <span>간략히 보기</span>
                    </button>
                    <button className="kn-close" onClick={handleClose}>
                        <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                            <path d="M2 2l10 10M12 2L2 12" />
                        </svg>
                    </button>
                </div>
                <div className="kn-list">
                    {[...messages].reverse().map((m) => <Card key={m.id} msg={m} />)}
                </div>
            </div>
        </div>
    )
}
export default KakaoNotification