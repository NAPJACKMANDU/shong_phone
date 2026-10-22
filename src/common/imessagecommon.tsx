import '../css/message/imessagecommonCss.css'

// 라우터 경로 (프로젝트 라우터에 맞게 수정하세요)
export const IMESSAGE_PATH = {
    list: '/messagesList',
    chat: '/messagesChat',
}

/* ===================== 기본 프로필 =====================
   letter 가 있으면 이름 첫 글자, 없으면 사람 모양 기본 프로필 */
export const MsgAvatar = ({ size, letter }: { size: number; letter?: string }) => (
    <svg
        viewBox="0 0 48 48"
        style={{ width: `calc(var(--u) * ${size})`, height: `calc(var(--u) * ${size})`, display: 'block', flexShrink: 0 }}
    >
        <defs>
            <linearGradient id="im-ava-g" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#b2c1e8" />
                <stop offset="1" stopColor="#7a80c0" />
            </linearGradient>
        </defs>
        <circle cx="24" cy="24" r="24" fill="url(#im-ava-g)" />
        {letter ? (
            <text x="24" y="32.5" textAnchor="middle" fontSize="23" fontWeight="700" fill="#fff">{letter}</text>
        ) : (
            <>
                <circle cx="24" cy="17.5" r="7.2" fill="#fff" />
                <path d="M9.5 38c0-5.5 6.5-8.5 14.5-8.5S38.5 32.5 38.5 38c0 2.5-2 4-4.5 4H14c-2.5 0-4.5-1.5-4.5-4z" fill="#fff" />
            </>
        )}
    </svg>
)

/* ===================== 공통 아이콘 ===================== */
export const IconMic = () => (
    <svg className="im-mic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <rect x="9" y="2.5" width="6" height="12" rx="3" />
        <path d="M5 11.5a7 7 0 0 0 14 0M12 18.5v3" />
    </svg>
)

export const IconChevronLeft = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 4 7 12 15 20" />
    </svg>
)