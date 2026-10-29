import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { getBackDestination, KakaoStatusBar } from '../../common/kakaoCommon.tsx'
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
/* ===================== 스토리 화면 =====================
   주소: /instagramStory?user=사용자이름
   - 오른쪽을 누르면 다음 스토리, 왼쪽을 누르면 이전 스토리
   - 5초가 지나면 자동으로 다음 스토리 (마지막이면 닫힘)
   - 그 사람의 스토리가 끝나면 다음 사람의 스토리가 이어서 나와요 */
export const InstagramStory = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [params] = useSearchParams()

    const firstUser = Math.max(0, STORY_USERS.findIndex((u) => u.id === params.get('user')))
    const [uIdx, setUIdx] = useState(firstUser)
    const [sIdx, setSIdx] = useState(0)
    const [tick, setTick] = useState(0)   // 같은 스토리를 다시 시작할 때 막대 애니메이션을 처음부터
    const [isPaused, setIsPaused] = useState(false)
    const remainingTime = useRef(STORY_MS)
    const timerStartedAt = useRef<number | null>(null)

    const user = STORY_USERS[uIdx]
    const story = user.stories[sIdx]

    const goNext = () => {
        if (sIdx < user.stories.length - 1) {
            setSIdx(sIdx + 1)
        } else if (uIdx < STORY_USERS.length - 1) {
            setUIdx(uIdx + 1)
            setSIdx(0)
        } else {
            navigate(getBackDestination(location.pathname), { replace: true })
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

    useEffect(() => {
        remainingTime.current = STORY_MS
    }, [uIdx, sIdx, tick])

    // 남은 시간만큼 자동으로 다음 스토리
    useEffect(() => {
        if (isPaused) return

        timerStartedAt.current = Date.now()
        const timer = window.setTimeout(goNext, remainingTime.current)
        return () => {
            window.clearTimeout(timer)
            if (timerStartedAt.current !== null) {
                remainingTime.current = Math.max(0, remainingTime.current - (Date.now() - timerStartedAt.current))
                timerStartedAt.current = null
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [uIdx, sIdx, tick, isPaused])

    useEffect(() => {
        markStoryUserSeen(user.id)
    }, [user.id])

    return (
        <div
            className="kk-wrapper st-wrapper"
            onPointerDownCapture={() => setIsPaused(true)}
            onPointerUpCapture={() => setIsPaused(false)}
            onPointerCancelCapture={() => setIsPaused(false)}
        >
            {story.src && <link rel="preload" as="image" href={story.src} />}
            {/* 스토리 화면 */}
                <div className="st-card">
                    {story.src && (
                        <img
                            className="st-img"
                            src={story.src}
                            alt="story"
                            loading="eager"
                            decoding="async"
                        />
                    )}
                    <div className="st-text-story">{story.text}</div>
                </div>
            {/* 넘기기 영역 (왼쪽 = 이전, 오른쪽 = 다음) */}
            <button className="st-zone prev" onClick={goPrev} aria-label="이전 스토리" />
            <button className="st-zone next" onClick={goNext} aria-label="다음 스토리" />

            {/* 위쪽 진행 막대 */}
            <div className={`st-progress ${isPaused ? 'paused' : ''}`}>
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
                <IgAvatar size={32} tint={user.tint} src={user.src} />
                <b>{user.id}</b>
                <span>{user.time}</span>
                <div className="st-head-actions">
                    <button><IconMenuLines /></button>
                    <button onClick={() => navigate(getBackDestination(location.pathname), { replace: true })}><IconClose /></button>
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