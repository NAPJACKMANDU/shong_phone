import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
    KakaoStatusBar, KakaoTabBar, KakaoAvatar, IconSearch, IconGear, lineProps, KAKAO_PATH, useKakaoUnreadTotal,
} from '../../common/kakaoCommon.tsx'
import '../../css/kakaoTalk/kakaochatlistCss.css'
import { getKakaoChatUnread, KAKAO_CHATS, getKakaoPerson } from '../../data/kakaoData.ts'
import { getLastKakaoMessage } from '../../data/kakaoMessages.ts'

/* ===================== 아이콘 ===================== */
const IconNewChat = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <path d="M15.5 5.2C14.4 4.7 13.2 4.5 12 4.5 7.3 4.5 3.5 7.6 3.5 11.7c0 2.3 1.2 4.3 3.1 5.6l-1 3.5 4.2-2c.7.1 1.4.2 2.2.2 4.7 0 8.5-3.1 8.5-7.3 0-.7-.1-1.3-.3-1.9" />
        <path d="M19.5 2.5v7M16 6h7" />
    </svg>
)
const IconSort = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <path d="M3 6.5h12M3 12h9M3 17.5h9" />
        <path d="M18.5 12.5v8M14.5 16.5h8" />
    </svg>
)

const CHIPS = [
    { id: 'all', label: '전체' },
    { id: 'unread', label: '안읽음' },
    { id: 'gpt', label: 'ChatGPT' },
    { id: 'call', label: '통화' },
]

/* ===================== 채팅 목록 페이지 ===================== */
export const KakaoChatList = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const [chip, setChip] = useState('all')
    const shouldAnimateScreenEnter = location.state?.animateScreenEnter === true
    const unreadTotal = useKakaoUnreadTotal()

    return (
        <div className={`kk-wrapper kc-wrapper ${shouldAnimateScreenEnter ? 'screen-enter' : ''}`}>
            <KakaoStatusBar time="4:24" battery={97} />

            {/* 타이틀 + 아이콘 */}
            <div className="kk-header">
                <span className="kk-title">채팅</span>
                <div className="kk-header-icons">
                    <button className="kk-icon-btn"><IconSearch /></button>
                    <button className="kk-icon-btn"><IconNewChat /></button>
                    <button className="kk-icon-btn"><IconGear /></button>
                </div>
            </div>

            {/* 필터 칩 */}
            <div className="kk-chips">
                {CHIPS.map((c) => (
                    <button key={c.id} className={`kk-chip ${chip === c.id ? 'active' : ''}`} onClick={() => setChip(c.id)}>
                        {c.label}
                        {c.id === 'unread' && unreadTotal > 0 ? <span className="kk-chip-badge">{unreadTotal}</span> : null}
                    </button>
                ))}
                <button className="kk-chip icon">
                    <IconSort />
                    <i className="kk-chip-dot" />
                </button>
            </div>

            <div className="kk-scroll kc-scroll">
                {/* 광고 배너 */}
                <div className="kk-banner kc-banner">
                    <div className="kc-banner-from"><i />협타디 앱에서 확인 ›</div>
                    <div className="kc-banner-title">랜타디 모바일 등장</div>
                    <div className="kc-banner-small">확률형 아이템 포함</div>
                    <div className="kc-banner-game" />
                    <div className="kk-ad-tag">AD</div>
                </div>

                {/* 채팅방 목록 */}
                {KAKAO_CHATS.map((c) => {
                    const lastMessage = getLastKakaoMessage(c.id)
                    const preview = lastMessage?.photo ? '사진을 보냈습니다.' : lastMessage?.text ?? ''

                    return (
                        <div className="kc-row" key={c.id} onClick={() => navigate(`${KAKAO_PATH.room}/${c.id}`)}>
                            <div className="kc-ava">
                                {c.isGroup ? (
                                    <div className="kc-grid4">
                                        {c.memberIds.slice(0, 4).map((personId) => {
                                            const person = getKakaoPerson(personId)
                                            return <KakaoAvatar key={person.id} {...person} size={23} />
                                        })}
                                    </div>
                                ) : (
                                    <KakaoAvatar {...getKakaoPerson(c.memberIds[0])} size={48} />
                                )}
                            </div>
                            <div className="kc-info">
                                <div className="kc-title-line">
                                    {c.meBadge && <span className="kc-me-badge">나</span>}
                                    <span className="kc-name">{c.title}</span>
                                    {c.isGroup && <span className="kc-count">{c.memberIds.length}</span>}
                                </div>
                                <div className={`kc-msg ${c.twoLine ? 'two' : ''}`}>{preview}</div>
                            </div>
                            <div className="kc-meta">
                                <span className="kc-time">{lastMessage?.time ?? c.time}</span>
                                {getKakaoChatUnread(c.id) > 0 && <span className="kc-unread">{getKakaoChatUnread(c.id)}</span>}
                            </div>
                        </div>
                    )
                })}
            </div>

            <KakaoTabBar active="chats" />
        </div>
    )
}
export default KakaoChatList