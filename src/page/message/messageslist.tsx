import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { KakaoStatusBar, IconSearch, lineProps } from '../../common/kakaoCommon.tsx'
import { MsgAvatar, IconMic, IMESSAGE_PATH } from '../../common/imessagecommon.tsx'
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

/* ===================== 데이터 ===================== */
interface Thread {
    id: number
    name: string
    letter?: string   // 있으면 이름 첫 글자 프로필, 없으면 기본 프로필
    time: string
    preview: string   // 줄바꿈(\n)으로 두 줄까지
    unread?: boolean
}

const THREADS: Thread[] = [
    { id: 1, name: '+82 1544-7199', time: '오후 7:14', unread: true, preview: '[Web발신]\n(광고)[무신사] 지금 필요한 플리스 & 부츠 할인 소식...' },
    { id: 2, name: '엄망이', letter: '엄', time: '어제', preview: '웅!!!' },
    { id: 3, name: '+82 1588-1600', time: '어제', unread: true, preview: '[Web발신]\n(광고)NH농협은행(1661-3000)  [★NH펀드케어★ 출시…' },
    { id: 4, name: '+82 10-1234-5678', time: '어제', unread: true, preview: '[Web발신][CJ대한통운_배송완료]' },
    { id: 5, name: '+82 2-6990-9815', time: '월요일', preview: '[Web발신]\n[CJ올리브영 서류전형 결과발표]...' },
    { id: 6, name: '+82 1644-3702', time: '월요일', unread: true, preview: '[Web발신]\nBAND 로그인 인증번호:000000...' },
    { id: 7, name: '+82 2-6956-3713', time: '월요일', unread: true, preview: '[Web발신]\n[메리츠증권] 본인확인 인증번호 [000000]' },
    { id: 8, name: '아빠', time: '토요일', unread: true, preview: 'ㅋㅋㅋㅋㅋ' },
    { id: 9, name: '+82 1544-1555', time: '토요일', preview: '[Web발신]\n[안내] 서비스 이용 안내' },
]

/* ===================== 메시지 목록 페이지 ===================== */
export const MessagesList = () => {
    const navigate = useNavigate()
    const [query, setQuery] = useState('')

    const threads = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return THREADS
        return THREADS.filter((t) => t.name.toLowerCase().includes(q) || t.preview.toLowerCase().includes(q))
    }, [query])

    return (
        <div className="kk-wrapper il-wrapper">
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
                    {threads.map((t) => (
                        <div className="il-row" key={t.id} onClick={() => navigate(IMESSAGE_PATH.chat)}>
                            {t.unread && <i className="il-dot" />}
                            <MsgAvatar size={45} letter={t.letter} />
                            <div className="il-body">
                                <span className="il-name">{t.name}</span>
                                <span className="il-time">{t.time}</span>
                                <IconChevron />
                                <div className="il-preview">{t.preview}</div>
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
            <KakaoStatusBar time="9:59" battery={27} />

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