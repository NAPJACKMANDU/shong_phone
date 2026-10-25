import { Fragment, useLayoutEffect, useRef, useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import {
    KakaoStatusBar, KakaoAvatar, IconSearch, lineProps, KAKAO_PATH, useKakaoUnreadTotal,
} from '../../common/kakaoCommon.tsx'
import { getKakaoChat, getKakaoPerson, markKakaoChatRead } from '../../data/kakaoData.ts'
import { getKakaoMessages } from '../../data/kakaoMessages.ts'
import '../../css/kakaoTalk/kakaoChatRoomCss.css'

/* ===================== 아이콘 ===================== */
const IconBack = () => (
    <svg viewBox="0 0 12 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="10 2 2 10 10 18" />
    </svg>
)
const IconPhone = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
)
const IconMenu = () => (
    <svg viewBox="0 0 24 24" {...lineProps}>
        <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
)

const IconScan = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3" />
        <path d="M8 9h8M8 12.5h8M8 16h5" />
    </svg>
)
const IconImage = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="1.6">
        <rect x="3" y="4" width="18" height="16" rx="3" />
        <circle cx="9" cy="10" r="1.8" />
        <path d="M3.5 17l5-4.5 4 3.5 3-2.5 5 4" />
    </svg>
)
const IconPlus = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2.6">
        <path d="M12 4v16M4 12h16" />
    </svg>
)
const IconSmile = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <ellipse cx="8.5" cy="9.5" rx="1.2" ry="1.8" fill="currentColor" stroke="none" />
        <ellipse cx="15.5" cy="9.5" rx="1.2" ry="1.8" fill="currentColor" stroke="none" />
        <path d="M6.5 14.5q5.5 5 11 0" />
    </svg>
)
const IconHash = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2.4">
        <path d="M9.5 3l-2 18M16.5 3l-2 18M4 9h17M3 15h17" />
    </svg>
)

const formatMessageDate = (date: string): string =>
    new Intl.DateTimeFormat('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    }).format(new Date(`${date}T12:00:00`))

/* ===================== 채팅방 페이지 ===================== */
export const KakaoChatRoom = () => {
    const navigate = useNavigate()
    const { chatId } = useParams()
    const boxRef = useRef<HTMLDivElement>(null)
    const [showMembers, setShowMembers] = useState(false)
    const unreadTotal = useKakaoUnreadTotal()
    const chat = getKakaoChat(chatId)
    const messages = chat ? getKakaoMessages(chat.id) : []
    const participants = chat?.memberIds.map(getKakaoPerson) ?? []

    useLayoutEffect(() => {
        if (chatId) markKakaoChatRead(chatId)
        const box = boxRef.current
        if (!box) return
        box.scrollTop = box.scrollHeight
    }, [chatId])

    if (!chat) {
        return <Navigate to={KAKAO_PATH.chats} replace />
    }

    return (
        <div className="kk-wrapper kr-wrapper">
            {/* 메시지 목록 */}
            <div className="kr-messages" ref={boxRef}>
                <div className="kr-inner">
                    {messages.map((m, index) => {
                        const previousMessage = messages[index - 1]
                        const nextMessage = messages[index + 1]
                        const isSameSenderContinuation =
                            m.from === 'other' &&
                            previousMessage?.from === 'other' &&
                            previousMessage.authorId === m.authorId &&
                            previousMessage.date === m.date &&
                            previousMessage.time === m.time
                        const hasNextMessageInGroup =
                            nextMessage?.from === m.from &&
                            nextMessage.date === m.date &&
                            nextMessage.time === m.time &&
                            (m.from === 'me' || nextMessage.authorId === m.authorId)
                        const dateSeparator = (!previousMessage || previousMessage.date !== m.date) && (
                            <div className="kr-date-separator">
                                <span>{formatMessageDate(m.date)}</span>
                            </div>
                        )
                        const photoContent = (
                            <div className="kr-photo-wrap">
                                <div className="kr-photo">
                                    {m.photoUrl ? <img src={m.photoUrl} alt="보낸 사진" /> : <IconImage />}
                                </div>
                                <button className="kr-ocr"><IconScan /></button>
                            </div>
                        )

                        if (m.from === 'me') {
                            return (
                                <Fragment key={m.id}>
                                    {dateSeparator}
                                    <div className="kr-row me">
                                        {!hasNextMessageInGroup && <span className="kr-time">{m.time}</span>}
                                        {m.photo || m.photoUrl
                                            ? photoContent
                                            : <div className={`kr-bubble me ${m.tail ? 'tail' : ''}`}>{m.text}</div>}
                                    </div>
                                </Fragment>
                            )
                        }

                        const author = getKakaoPerson(m.authorId ?? '')
                        return (
                            <Fragment key={m.id}>
                                {dateSeparator}
                                <div className={`kr-row other start ${isSameSenderContinuation ? 'continuation' : ''}`}>
                                    {!isSameSenderContinuation && (
                                        <div className="kr-ava"><KakaoAvatar {...author} size={34} /></div>
                                    )}
                                    <div className="kr-body">
                                        {!isSameSenderContinuation && <div className="kr-name">{author.name}</div>}
                                        <div className="kr-line">
                                            {m.photo || m.photoUrl ? (
                                                photoContent
                                            ) : (
                                                <div className={`kr-bubble other ${m.tail ? 'tail' : ''}`}>{m.text}</div>
                                            )}
                                            {!hasNextMessageInGroup && <span className="kr-time">{m.time}</span>}
                                        </div>
                                    </div>
                                </div>
                            </Fragment>
                        )
                    })}
                </div>
            </div>

            {/* 상단 헤더 */}
            <div className="kr-top">
                <div className="kr-top-blur" />
                <button className="kr-glass kr-back" onClick={() => navigate(KAKAO_PATH.chats)}>
                    <IconBack />
                    {unreadTotal > 0 && <span>{unreadTotal}</span>}
                </button>
                <button
                    className="kr-room-title"
                    aria-expanded={showMembers}
                    onClick={() => setShowMembers((visible) => !visible)}
                >
                    {chat.title}{chat.isGroup ? ` · ${participants.length}` : ''}
                </button>
                {showMembers && (
                    <div className="kr-members">
                        {participants.map((person) => (
                            <div className="kr-member" key={person.id}>
                                <KakaoAvatar {...person} size={36} />
                                <span>{person.name}{person.isMe ? ' (나)' : ''}</span>
                            </div>
                        ))}
                    </div>
                )}
                <div className="kr-glass kr-tools">
                    <button className="kr-tool-btn"><IconSearch /></button>
                    <button className="kr-tool-btn"><IconPhone /></button>
                    <button className="kr-tool-btn"><IconMenu /></button>
                </div>
            </div>

            <KakaoStatusBar time="4:23" battery={74} />

            {/* 하단 입력창 */}
            <div className="kr-bottom" />
            <div className="kr-input">
                <button className="kr-circle-btn"><IconPlus /></button>
                <span className="kr-placeholder">메시지 입력</span>
                <button className="kr-emoji"><IconSmile /></button>
                <button className="kr-circle-btn"><IconHash /></button>
            </div>
        </div>
    )
}
export default KakaoChatRoom