import { useState, useMemo } from 'react'
import {
    KakaoStatusBar, KakaoTabBar, KakaoProfile, KakaoAvatar, IconSearch, IconGear, lineProps,
} from '../../common/kakaoCommon.tsx'
import '../../css/kakaoTalk/kakaofriendsCss.css'
import { KAKAO_FRIENDS, getKakaoPerson } from '../../data/kakaoData.ts'

/* ===================== 아이콘 ===================== */
const IconAddFriend = () => (
    <svg viewBox="0 0 24 24" {...lineProps}>
        <circle cx="9.5" cy="7.6" r="4.3" />
        <path d="M2.6 21c0-4.6 3.2-7 6.9-7 1.5 0 2.8.4 3.9 1" />
        <path d="M19 14v7M15.5 17.5h7" />
    </svg>
)
const IconGift = () => (
    <svg viewBox="0 0 24 28" fill="none" stroke="#111" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
        <path d="M3 12L12 8l9 4v9.5L12 26l-9-4.5z" fill="#fff" />
        <path d="M12 17l9-5v9.5L12 26z" fill="#ffd21f" />
        <path d="M3 12l9 5 9-5M12 17v9" />
        <path d="M12 9C8 6.2 6.8 3.6 8.8 2.2c1.4-.9 2.8-.2 3.2 1 .4-1.2 1.8-1.9 3.2-1 2 1.4.8 4-3.2 6.8z" fill="#ff3b30" />
    </svg>
)
const IconChevron = ({ up = false, onClick }: { up?: boolean; onClick?: () => void }) => (
    <svg 
        className="kf-chevron" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.4" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        onClick={onClick}
        style={{ cursor: 'pointer' }}
    >
        {up ? <polyline points="4 16 12 8 20 16" /> : <polyline points="4 8 12 16 20 8" />}
    </svg>
)

/* 추천친구 / 채널 아이콘 */
const IconRecommend = () => (
    <svg viewBox="0 0 48 48" style={{ width: 'calc(var(--u) * 48)', height: 'calc(var(--u) * 48)', display: 'block' }}>
        <rect width="48" height="48" rx="17" fill="#fff3c4" />
        <circle cx="22" cy="27" r="12.5" fill="#f9b233" />
        <ellipse cx="17.6" cy="25" rx="1.7" ry="2.1" fill="#4a2a10" />
        <ellipse cx="26.4" cy="25" rx="1.7" ry="2.1" fill="#4a2a10" />
        <path d="M18 30.4q4 3.4 8 0" fill="none" stroke="#e8602c" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M36 9l1.8 4.2 4.2 1.8-4.2 1.8L36 21l-1.8-4.2L30 15l4.2-1.8z" fill="#f7931e" />
    </svg>
)
const IconChannel = () => (
    <svg viewBox="0 0 48 48" style={{ width: 'calc(var(--u) * 48)', height: 'calc(var(--u) * 48)', display: 'block' }}>
        <rect width="48" height="48" rx="17" fill="#ffe9d6" />
        <path d="M24 10c-8 0-13.5 5-13.5 11.4 0 3.5 1.8 6.4 4.6 8.3l-1.6 6.2 7-3.7c1.1.2 2.3.3 3.5.3 8 0 13.5-5 13.5-11.1S32 10 24 10z" fill="#ff9a2e" />
        <text x="24" y="26.5" textAnchor="middle" fontSize="12.5" fontWeight="800" fill="#fff">Ch</text>
    </svg>
)

/* ===================== 친구 페이지 ===================== */
export const KakaoFriends = () => {
    const [sort, setSort] = useState<'name' | 'recent'>('name')

    // 접힘/열림 상태
    const [isBirthdayOpen, setIsBirthdayOpen] = useState(false)
    const [isFavoriteOpen, setIsFavoriteOpen] = useState(false)
    const [isFriendsOpen, setIsFriendsOpen] = useState(true)

    const sortedFriends = useMemo(() => {
        const list = [...KAKAO_FRIENDS];
        if (sort === 'name') {
            return list.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
        } else {
            return list.sort((a, b) => b.createdAt - a.createdAt);
        }
    }, [sort]);

    return (
        <div className="kk-wrapper kf-wrapper">
            <KakaoStatusBar time="4:23" battery={74} />

            {/* 상단 헤더 */}
            <div className="kk-header">
                <KakaoProfile size={34} />
                <span className="kf-name">정성찬</span>
                <div className="kk-header-icons">
                    <button className="kk-icon-btn"><IconSearch /></button>
                    <button className="kk-icon-btn"><IconAddFriend /></button>
                    <button className="kk-icon-btn"><IconGift /></button>
                    <button className="kk-icon-btn"><IconGear /></button>
                </div>
            </div>

            {/* 친구 / 소식 탭 */}
            <div className="kk-chips">
                <button className="kk-chip active">친구</button>
                <button className="kk-chip">소식</button>
            </div>

            <div className="kk-scroll kf-scroll">
                {/* 광고 배너 */}
                <div className="kk-banner kf-banner">
                    <div className="kf-banner-title">서로 다른 깊이로</div>
                    <div className="kf-banner-sub">원하던 나를 만나다, oligio xm</div>
                    <div className="kf-banner-small">의료기기 광고심의필: 조합-2026-33-037(유효기간 2029.09.21)</div>
                    <div className="kf-banner-product" />
                    <div className="kk-ad-tag">AD</div>
                    <div className="kf-banner-play">
                        <svg viewBox="0 0 8 8" fill="#fff"><path d="M1.5 0.5L7 4 1.5 7.5z" /></svg>
                    </div>
                </div>

                {/* 2. 생일인 친구 */}
                <div 
                    className="kf-row" 
                    onClick={() => setIsBirthdayOpen(!isBirthdayOpen)} 
                    style={{ 
                        cursor: 'pointer',
                        borderBottom: isBirthdayOpen ? 'none' : '1px solid #f0f0f0' 
                    }}
                >
                    <span className="kf-row-title">생일인 친구 1</span>
                    <IconChevron up={isBirthdayOpen} />
                </div>
                {isBirthdayOpen && (
                    <div className="kf-friend">
                        <KakaoProfile size={48} color="purple" />
                        <span className="kf-friend-name">과대</span>
                    </div>
                )}

                {/* 3. 즐겨찾는 친구 */}
                <div 
                    className="kf-row" 
                    onClick={() => setIsFavoriteOpen(!isFavoriteOpen)} 
                    style={{ 
                        cursor: 'pointer',
                        borderBottom: isFavoriteOpen ? 'none' : '1px solid #f0f0f0' 
                    }}
                >
                    <span className="kf-row-title">즐겨찾는 친구 1</span>
                    <IconChevron up={isFavoriteOpen} />
                </div>
                {isFavoriteOpen && (
                    <div className="kf-friend">
                        <KakaoAvatar {...getKakaoPerson('antony')} size={48} />
                        <span className="kf-friend-name">{getKakaoPerson('antony').name}</span>
                    </div>
                )}

                {/* 4. 친구 목록 헤더 */}
                <div 
                    className="kf-friends-head"
                    style={{ 
                        borderBottom: isFriendsOpen ? 'none' : '1px solid #f0f0f0' 
                    }}
                >
                    <span className="kf-row-title">친구 {KAKAO_FRIENDS.length}</span>
                    <div className="kf-seg">
                        <button className={`kf-seg-btn ${sort === 'name' ? 'active' : ''}`} onClick={() => setSort('name')}>가나다순</button>
                        <button className={`kf-seg-btn ${sort === 'recent' ? 'active' : ''}`} onClick={() => setSort('recent')}>친구추가순</button>
                    </div>
                    <IconChevron up={isFriendsOpen} onClick={() => setIsFriendsOpen(!isFriendsOpen)} />
                </div>

                {/* 전체 친구 리스트 */}
                {isFriendsOpen && (
                    <>
                        <div className="kf-friend">
                            <IconRecommend />
                            <span className="kf-friend-name">추천친구 <span className="kf-friend-count">68</span></span>
                        </div>
                        <div className="kf-friend">
                            <IconChannel />
                            <span className="kf-friend-name">채널 <span className="kf-friend-count">62</span></span>
                        </div>

                        {sortedFriends.map((friend) => (
                            <div className="kf-friend" key={friend.id}>
                                <KakaoAvatar {...friend} size={48} />
                                <span className="kf-friend-name">{friend.name}</span>
                            </div>
                        ))}
                    </>
                )}
            </div>

            <KakaoTabBar active="friends" />
        </div>
    )
}
export default KakaoFriends