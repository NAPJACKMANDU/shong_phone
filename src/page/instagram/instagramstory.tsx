import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { KakaoStatusBar } from '../../common/kakaoCommon.tsx'
import { IgAvatar, IconHeart, IconComment, IconSendPlane, IconClose } from '../../common/instagramcommon.tsx'
import { STORY_USERS, markStoryUserSeen } from '../../data/instagramdata.ts'
import '../../css/instagram/instagramstoryCss.css'

const STORY_MS = 5000   // 스토리 한 장이 자동으로 넘어가는 시간 (5초)

/* ===================== 아이콘 ===================== */
const IconMenuLines = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
        <path d="M3 8h18M3 15h11" />
    </svg>
)
const IconArrowOut = () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 15.5l11-11M6.5 4.5h9v9" />
    </svg>
)

/* 통화 기록 화면 스토리 */
const CallsStory = () => (
    <div className="st-calls">
        <div className="st-calls-title">通話</div>

        <div className="st-call" style={{ top: 'calc(var(--u) * 191)' }}>
            <div className="pic"><IgAvatar size={78} tint={4} /></div>
            <div className="name">
                <IconHeart />
                <span>(20)</span>
            </div>
            <div className="sub">
                <IconArrowOut />
                <span>木曜日</span>
            </div>
        </div>

        <div className="st-call" style={{ top: 'calc(var(--u) * 301)' }}>
            <div className="pic"><IgAvatar size={78} tint={4} /></div>
            <div className="name bold"><span>ゆあ</span></div>
            <div className="sub">
                <IconArrowOut />
                <span>10. 4.</span>
            </div>
        </div>
    </div>
)

/* ===================== 스토리 화면 =====================
   주소: /instagramStory?user=사용자이름
   - 오른쪽을 누르면 다음 스토리, 왼쪽을 누르면 이전 스토리
   - 5초가 지나면 자동으로 다음 스토리 (마지막이면 닫힘)
   - 그 사람의 스토리가 끝나면 다음 사람의 스토리가 이어서 나와요 */
export const InstagramStory = () => {
    const navigate = useNavigate()
    const [params] = useSearchParams()

    const firstUser = Math.max(0, STORY_USERS.findIndex((u) => u.id === params.get('user')))
    const [uIdx, setUIdx] = useState(firstUser)
    const [sIdx, setSIdx] = useState(0)
    const [tick, setTick] = useState(0)   // 같은 스토리를 다시 시작할 때 막대 애니메이션을 처음부터

    const user = STORY_USERS[uIdx]
    const story = user.stories[sIdx]

    const goNext = () => {
        if (sIdx < user.stories.length - 1) {
            setSIdx(sIdx + 1)
        } else if (uIdx < STORY_USERS.length - 1) {
            setUIdx(uIdx + 1)
            setSIdx(0)
        } else {
            navigate(-1)
        }
    }

    const goPrev = () => {
        if (sIdx > 0) {
            setSIdx(sIdx - 1)
        } else if (uIdx > 0) {
            setUIdx(uIdx - 1)
            setSIdx(0)
        } else {
            setTick(tick + 1)   // 맨 처음이면 처음부터 다시
        }
    }

    // 5초 뒤 자동으로 다음 스토리
    useEffect(() => {
        const timer = window.setTimeout(goNext, STORY_MS)
        return () => window.clearTimeout(timer)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uIdx, sIdx, tick])

    useEffect(() => {
        markStoryUserSeen(user.id)
    }, [user.id])

    return (
        <div className="kk-wrapper st-wrapper">
            {/* 스토리 화면 */}
            <div className="st-card" style={{ background: story.bg }}>
                {story.kind === 'calls' ? (
                    <CallsStory />
                ) : (
                    <div className="st-text-story">{story.text}</div>
                )}
            </div>

            {/* 넘기기 영역 (왼쪽 = 이전, 오른쪽 = 다음) */}
            <button className="st-zone prev" onClick={goPrev} aria-label="이전 스토리" />
            <button className="st-zone next" onClick={goNext} aria-label="다음 스토리" />

            {/* 위쪽 진행 막대 */}
            <div className="st-progress">
                {user.stories.map((s, i) => (
                    <div
                        key={`${uIdx}-${s.id}-${i === sIdx ? tick : 0}`}
                        className={`st-seg ${i < sIdx ? 'done' : ''} ${i === sIdx ? 'cur' : ''}`}
                    >
                        <i />
                    </div>
                ))}
            </div>

            {/* 사람 이름 */}
            <div className="st-head">
                <IgAvatar size={32} tint={user.tint} />
                <b>{user.id}</b>
                <span>{user.time}</span>
                <div className="st-head-actions">
                    <button><IconMenuLines /></button>
                    <button onClick={() => navigate(-1)}><IconClose /></button>
                </div>
            </div>

            {/* 카카오 공통 상태바 */}
            <KakaoStatusBar time="4:23" battery={74} />

            {/* 아래 메시지 줄 */}
            <div className="st-bottom">
                <input className="st-input" type="text" placeholder="메시지 보내기..." />
                <div className="st-icons">
                    <button><IconHeart /></button>
                    <button><IconComment /></button>
                    <button><IconSendPlane /></button>
                </div>
            </div>
        </div>
    )
}
export default InstagramStory