import { useNavigate } from 'react-router-dom'
import { KakaoStatusBar } from '../../common/kakaoCommon.tsx'
import {
    IgAvatar, IgTabBar, IconPlus, IconChevronDown, IconHeart,
} from '../../common/instagramcommon.tsx'
import { IG_USERS, IG_PATH } from '../../data/instagramdata.ts'
import '../../css/instagram/instagramhomeCss.css'

/* ===================== 아이콘 ===================== */
const IconBookmarkStar = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3.5" y="2.5" width="17" height="19" rx="4" />
        <path d="M12 7.5l1.4 3 3.1.4-2.3 2.1.6 3.1-2.8-1.6-2.8 1.6.6-3.1-2.3-2.1 3.1-.4z" fill="currentColor" />
    </svg>
)

const IconMenuLines = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
        <path d="M3 8.5h18M3 15.5h12" />
    </svg>
)

/* ===================== 인스타그램 홈 ===================== */
export const InstagramHome = () => {
    const navigate = useNavigate()

    // 스토리 동그라미를 누르면 그 사람의 스토리가 열려요 (내 스토리는 + 버튼이라 열리지 않아요)
    const openStory = (id: string, hasStory: boolean) => {
        if (hasStory) navigate(`${IG_PATH.story}?user=${encodeURIComponent(id)}`)
    }

    return (
        <div className="kk-wrapper ig-wrapper">
            {/* 내용 (스크롤) */}
            <div className="ih-scroll">
                {/* 스토리 줄 */}
                <div className="ih-tray">
                    {IG_USERS.map((u) => {
                        const hasStory = u.stories.length > 0
                        return (
                            <button key={u.id} className={u.tint === 0 ? 'ih-story' : 'ih-story-friend'} onClick={() => openStory(u.id, hasStory)}>
                                <div className="ih-story-pic">
                                    {hasStory ? (
                                        <IgAvatar size={80} tint={u.tint} ring="story" />
                                    ) : (
                                        <div style={{ position: 'relative', lineHeight: 0 }}>
                                            <IgAvatar size={80} tint={u.tint} />
                                        </div>
                                    )}
                                    {!hasStory && <span className="ih-plus-badge"><IconPlus /></span>}
                                </div>
                                <span className={u.tint === 0 ? 'ih-story-name-me' : 'ih-story-name'}>{u.id}</span>
                            </button>
                        )
                    })}
                </div>
                <div className="ih-divider" />

                {/* 추천 게시물 */}
                <div className="ih-post-head">
                    <IgAvatar size={32} tint={4} />
                    <div className="ih-post-user">
                        <b>dusdpin</b>
                        <span>회원님을 위한 추천</span>
                    </div>
                    <button className="ih-follow">팔로우</button>
                    <button className="ih-more"><IconMenuLines /></button>
                </div>
                <div className="ih-media">
                    {/* <img src="/post.jpg" alt="" /> 처럼 사진 주소를 넣으면 사진이 나와요 */}
                    <div className="ih-media-text">{'지금 인기 있는\n추천 영상을\n확인해 보세요'}</div>
                </div>
            </div>

            {/* 위쪽 줄 */}
            <div className="ig-header">
                <div className="ig-header-row">
                    <button className="ig-icon-btn" style={{ left: 'calc(var(--u) * 25)' }}><IconPlus /></button>
                    <button className="ih-logo">
                        <span className="ih-logo-text">Instagram</span>
                        <IconChevronDown />
                    </button>
                    <button className="ig-icon-btn" style={{ left: 'calc(var(--u) * 288)' }}><IconBookmarkStar /></button>
                    <button className="ig-icon-btn" style={{ left: 'calc(var(--u) * 342)' }}><IconHeart /></button>
                </div>
            </div>

            {/* 카카오 공통 상태바 */}
            <KakaoStatusBar time="4:23" battery={74} />

            {/* 하단 탭바 (홈은 작은 모양) */}
            <IgTabBar active="home" compact profileDot={false} />
        </div>
    )
}
export default InstagramHome