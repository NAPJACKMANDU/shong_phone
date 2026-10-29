import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore } from 'react'
import type { UIEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { KakaoStatusBar } from '../../common/kakaoCommon.tsx'
import {
    IgAvatar, IgTabBar, IconPlus, IconChevronDown, IconHeart, IconComment, IconSendPlane,
} from '../../common/instagramcommon.tsx'
import KakaoNotification from '../kakaoTalk/kakaoNotification.tsx'
import type { KakaoNoticeMsg } from '../kakaoTalk/kakaoNotification.tsx'
import { getSeenStoryUserIds, IG_USERS, IG_PATH } from '../../data/instagramdata.ts'
import {
    addUserComment, deleteUserComment, FEED_POSTS, getCommentLike, getCommentLikesVersion,
    getInitialCommentLike, getInstagramProfileSrc, getUserComments, SEONGCHAN,
    setCommentLike, subscribeToCommentLikes,
} from '../../data/instagramfeeddata.ts'
import type { FeedPost, CommentItem, CommentReply } from '../../data/instagramfeeddata.ts'
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
const IconHeartFilled = () => (
    <svg viewBox="0 0 24 24" fill="#ed4956" stroke="#ed4956" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20.5C5 15.5 2.8 12.2 2.8 8.8 2.8 6 4.9 4 7.4 4c1.9 0 3.6 1 4.6 2.8C13 5 14.7 4 16.6 4c2.5 0 4.6 2 4.6 4.8 0 3.4-2.2 6.7-9.2 11.7z" />
    </svg>
)
const IconHeartSmall = ({ filled }: { filled?: boolean }) => (
    <svg viewBox="0 0 24 24" fill={filled ? '#ed4956' : 'none'} stroke={filled ? '#ed4956' : '#8e8e8e'} strokeWidth="2">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
)
const IconBookmark = ({ filled }: { filled: boolean }) => (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 3.5h12a1 1 0 0 1 1 1V21l-7-5-7 5V4.5a1 1 0 0 1 1-1z" />
    </svg>
)
const IconMusic = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 18.5V6.5l11-2.5v12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="6.5" cy="18.5" rx="3.2" ry="2.6" />
        <ellipse cx="17.5" cy="16" rx="3.2" ry="2.6" />
    </svg>
)
const IconMoreHorizontal = () => (
    <svg viewBox="0 0 24 24" fill="currentColor">
        <circle cx="5" cy="12" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="19" cy="12" r="2" />
    </svg>
)
const formatCount = (n: number) => n.toLocaleString('ko-KR')

const FeedVideo = ({ src }: { src: string }) => {
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        const video = videoRef.current
        if (!video) return

        const observer = new IntersectionObserver(([entry]) => {
            if (!entry) return
            if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
                void video.play().catch((error: unknown) => {
                    console.error('Instagram feed video playback failed.', error)
                })
            } else {
                video.pause()
            }
        }, { threshold: [0, 0.5] })

        observer.observe(video)
        return () => {
            observer.disconnect()
            video.pause()
        }
    }, [])

    return <video ref={videoRef} src={src} muted controls playsInline preload="metadata" />
}

/* ===================== 댓글 팝업 (바텀시트 Modal) ===================== */
interface CommentModalProps {
    post: FeedPost
    onClose: () => void
    onAutoReply?: (reply: CommentReply) => void
}

export const CommentModal = ({ post, onClose, onAutoReply }: CommentModalProps) => {
    useSyncExternalStore(subscribeToCommentLikes, getCommentLikesVersion, getCommentLikesVersion)
    const comments = [...(post.commentList ?? []), ...getUserComments(post.id)]
    const [commentInput, setCommentInput] = useState('')
    const touchStartY = useRef<number | null>(null)
    const modalBodyRef = useRef<HTMLDivElement>(null)

    const submitComment = () => {
        const text = commentInput.trim()
        if (!text) return

        const reply = addUserComment(post.id, text)
        setCommentInput('')
        if (reply) onAutoReply?.(reply)
    }

    return (
        <div className="ih-modal-overlay" onClick={onClose}>
            <div
                className="ih-modal-content"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={(event) => {
                    touchStartY.current = event.touches[0]?.clientY ?? null
                }}
                onTouchEnd={(event) => {
                    const startY = touchStartY.current
                    touchStartY.current = null
                    const endY = event.changedTouches[0]?.clientY
                    if (startY !== null && endY !== undefined
                        && endY - startY > 80 && (modalBodyRef.current?.scrollTop ?? 0) <= 0) {
                        onClose()
                    }
                }}
            >
                {/* 시트 핸들러 */}
                <div className="ih-modal-drag-handle" />

                {/* Header */}
                <div className="ih-modal-header">
                    <span className="ih-modal-title">댓글</span>
                    <button className="ih-modal-more"><IconMoreHorizontal /></button>
                </div>

                {/* 댓글 목록 스크롤 영역 */}
                <div className="ih-modal-body" ref={modalBodyRef}>
                    <div className="ih-modal-recommend-filter">
                        회원님을 위한 추천 <IconChevronDown />
                    </div>

                    {comments.map((c) => (
                        <CommentRow
                            key={c.id}
                            post={post}
                            comment={c}
                            onDelete={c.isUserComment ? () => deleteUserComment(post.id, c.id) : undefined}
                        />
                    ))}
                </div>

                {/* 이모지 리액션 바 */}
                <div className="ih-quick-emojis">
                    {['❤️', '🙌', '🔥', '👏', '😢', '😍', '😮', '😂'].map((emoji, idx) => (
                        <button key={idx} onClick={() => setCommentInput((prev) => prev + emoji)}>
                            {emoji}
                        </button>
                    ))}
                </div>

                {/* 댓글 입력창 */}
                <div className="ih-comment-input-bar">
                    <IgAvatar size={36} tint={0} src={getInstagramProfileSrc(SEONGCHAN)} />
                    <input
                        type="text"
                        placeholder="댓글 달기..."
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter' && !event.nativeEvent.isComposing) {
                                event.preventDefault()
                                submitComment()
                            }
                        }}
                    />
                    <div className="ih-input-actions">
                        <button
                            type="button"
                            className="ih-comment-send-btn"
                            disabled={!commentInput.trim()}
                            onClick={submitComment}
                        >
                            전송
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

/* ===================== 댓글 1개 개별 행 ===================== */
const CommentRow = ({
    post,
    comment,
    onDelete,
}: {
    post: FeedPost
    comment: CommentItem
    onDelete?: () => void
}) => {
    useSyncExternalStore(subscribeToCommentLikes, getCommentLikesVersion, getCommentLikesVersion)
    const liked = getCommentLike(post, comment)
    const initialLiked = getInitialCommentLike(post, comment)
    const likeCount = Math.max(0, comment.likes + Number(liked) - Number(initialLiked))
    const [hideReplies, setHideReplies] = useState(!(comment.isUserComment && comment.replies?.length))

    const toggleLike = () => {
        setCommentLike(post, comment, !getCommentLike(post, comment))
    }

    return (
        <div className="ih-comment-item">
            <div className="ih-comment-main">
                <IgAvatar size={34} tint={comment.tint ?? 1} src={getInstagramProfileSrc(comment.user, comment.src)} />
                <div className="ih-comment-content">
                    <div className="ih-comment-user-line">
                        <span className="ih-comment-user">{comment.user}</span>
                        <span className="ih-comment-time">{comment.time}</span>
                        {comment.isLikedByAuthor && (
                            <span className="ih-comment-badge">• 작성자가 좋아하는 댓글</span>
                        )}
                    </div>
                    <p className="ih-comment-text">
                        {comment.text.split(/(@\w+)/).map((part, i) =>
                                part.startsWith('@') ? <strong key={i}>{part}</strong> : part
                        )}
                    </p>
                    <div className="ih-comment-actions">
                        <button className="ih-reply-btn">답글 달기</button>
                        {onDelete && (
                            <button className="ih-reply-btn" onClick={onDelete}>삭제</button>
                        )}
                    </div>
                </div>
                <button className="ih-comment-like-btn" onClick={toggleLike}>
                    <IconHeartSmall filled={liked} />
                    {likeCount > 0 && <span className="ih-like-num">{likeCount}</span>}
                </button>
            </div>

            {/* 답글 (대댓글) 목록 */}
            {comment.replies && comment.replies.length > 0 && (
                <div className="ih-replies-wrapper">
                    {!hideReplies ? (
                        <>
                            {comment.replies.map((r) => (
                                <div key={r.id} className="ih-reply-item">
                                    <IgAvatar size={28} tint={r.tint ?? 1} src={getInstagramProfileSrc(r.user, r.src)} />
                                    <div className="ih-comment-content">
                                        <div className="ih-comment-user-line">
                                            <span className="ih-comment-user">{r.user}</span>
                                            {r.isAuthor && <span className="ih-author-tag">• 작성자</span>}
                                            <span className="ih-comment-time">{r.time}</span>
                                        </div>
                                             <p className="ih-comment-text">
                                                {r.text.split(/(@\w+)/).map((part, i) =>
                                                    part.startsWith('@') ? <strong key={i}>{part}</strong> : part
                                                )}
                                             </p>
                                        <div className="ih-comment-actions">
                                            <button className="ih-reply-btn">답글 달기</button>
                                        </div>
                                    </div>
                                    <button className="ih-comment-like-btn">
                                        <IconHeartSmall filled={r.isLiked} />
                                        {r.likes > 0 && <span className="ih-like-num">{r.likes}</span>}
                                    </button>
                                </div>
                            ))}
                            <button className="ih-hide-replies-btn" onClick={() => setHideReplies(true)}>
                                ── 답글 숨기기
                            </button>
                        </>
                    ) : (
                        <button className="ih-hide-replies-btn" onClick={() => setHideReplies(false)}>
                            ── 답글 {comment.replies.length}개 보기
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

/* ===================== 피드 글 (2줄까지만 보이고, 3줄 이상이면 더보기) ===================== */
const FeedCaption = ({ user, caption }: { user: string; caption: string }) => {
    const textRef = useRef<HTMLDivElement>(null)
    const [expanded, setExpanded] = useState(false)
    const [overflowing, setOverflowing] = useState(false)   // 3줄 이상이라 잘리고 있는지

    useLayoutEffect(() => {
        const el = textRef.current
        if (!el || expanded) return

        const check = () => setOverflowing(el.scrollHeight > el.clientHeight + 1)
        check()

        const observer = new ResizeObserver(check)
        observer.observe(el)
        return () => observer.disconnect()
    }, [caption, expanded])

    return (
        <div className="ih-caption-wrap">
            <div ref={textRef} className={`ih-caption ${expanded ? '' : 'clamp'}`}>
                <b>{user}</b> {caption}
            </div>
            {!expanded && overflowing && (
                <button type="button" className="ih-caption-more" onClick={() => setExpanded(true)}>
                    더보기
                </button>
            )}
            {expanded && overflowing && (
                <button type="button" className="ih-caption-less" onClick={() => setExpanded(false)}>
                    접기
                </button>
            )}
        </div>
    )
}

/* ===================== 피드 게시물 카드 ===================== */
export const PostCard = ({ post, onOpenComments }: { post: FeedPost; onOpenComments: (post: FeedPost) => void }) => {
    useSyncExternalStore(subscribeToCommentLikes, getCommentLikesVersion, getCommentLikesVersion)
    const [liked, setLiked] = useState(false)
    const [saved, setSaved] = useState(false)
    const [idx, setIdx] = useState(0)
 
    const total = post.slides.length
    const likeCount = post.likes 
    const previewComments = post.previewComments?.slice(0, 2) ?? []
    const commentCount = (post.commentCount ?? Math.max(post.commentList?.length ?? 0, post.previewComments?.length ?? 0))
        + getUserComments(post.id).length
 
    // 사진을 옆으로 밀면 몇 번째인지 알아내요 (1/3 표시와 아래 점이 바뀌어요)
    const handleSlides = (e: UIEvent<HTMLDivElement>) => {
        const el = e.currentTarget
        setIdx(Math.round(el.scrollLeft / el.clientWidth))
    }
 
    return (
        <div className="ih-post">
            {/* 작성한 사람 */}
            <div className="ih-post-head">
                {post.src ?  <IgAvatar size={32} src={post.src} /> :
                <IgAvatar size={32} tint={post.tint} />
                }
                <div className="ih-post-user">
                    <b>{post.user}</b>
                    {post.music ? (
                        <span className="ih-music"><IconMusic />{post.music}</span>
                    ) : post.suggested ? (
                        <span>회원님을 위한 추천</span>
                    ) : null}
                </div>
                {post.suggested && <button className="ih-follow">팔로우</button>}
                <button className="ih-more"><IconMenuLines /></button>
            </div>
 
            {/* 사진 / 글 카드 */}
            <div className="ih-media">
                <div className="ih-slides" onScroll={handleSlides}>
                    {post.slides.map((s, i) => (
                        <div className="ih-slide" key={i} style={s.kind === 'photo' ? { background: s.bg } : undefined}>
                            {s.kind === 'photo' && s.src && <img src={s.src} alt="" loading="eager" decoding="async" />}
                            {s.kind === 'video' && s.src && (
                                <FeedVideo src={s.src} />
                            )}
                            {s.kind === 'text' && (
                                <div className="ih-text-slide" style={{ aspectRatio: post.ratio }}>
                                    {s.title && <b>{s.title}</b>}
                                    {(s.body ?? '').split('\n\n').map((para, k) => <p key={k}>{para}</p>)}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                {total > 1 && <span className="ih-count">{idx + 1}/{total}</span>}
            </div>
 
            {/* 사진 넘김 점 */}
            {total > 1 && (
                <div className="ih-dots">
                    {post.slides.map((_, i) => <i key={i} className={`ih-dot ${i === idx ? 'on' : ''}`} />)}
                </div>
            )}
 
            {/* 하트 / 댓글 / 보내기 / 저장 */}
            <div className={`ih-actions ${total > 1 ? '' : 'solo'}`}>
                <button className={`ih-act ${liked ? 'liked' : ''}`} onClick={() => setLiked(!liked)}>
                    {liked ? <IconHeartFilled /> : <IconHeart />}
                    <span>{likeCount}</span>
                </button>
                <button className="ih-act" onClick={() => onOpenComments(post)}>
                    <IconComment />
                    {commentCount > 0 && <span>{formatCount(commentCount)}</span>}
                </button>
                <button className="ih-act"><IconSendPlane /></button>
                <button className="ih-act save" onClick={() => setSaved(!saved)}>
                    <IconBookmark filled={saved} />
                </button>
            </div>
 
            {/* 좋아요 */}
            {post.likedBy ? (
                <div className="ih-likes">
                    <div className="ih-liked-avatars">
                        {post.likedBy.tints.map((t, i) => <span key={i}><IgAvatar size={17} src={getInstagramProfileSrc(t)} /></span>)}
                    </div>
                    <span><b>{post.likedBy.name}</b>님 외 <b>여러 명이</b> 좋아합니다</span>
                </div>
            ) : (
                <div className="ih-likes"><span><b>좋아요 {likeCount}개</b></span></div>
            )}
 
            {/* 글 */}
            <FeedCaption user={post.user} caption={post.caption} />
            <div className="ih-hashtags">{post.hashtags}</div>
            {previewComments.length > 0 && (
                <button
                    type="button"
                    className="ih-feed-preview-comments"
                    onClick={() => onOpenComments(post)}
                    aria-label={`댓글 ${formatCount(commentCount)}개 보기`}
                >
                    {previewComments.map((comment) => {
                        const isLiked = getCommentLike(post, comment)
                        return (
                            <span className="ih-preview-comment-row" key={comment.id}>
                                <span className="ih-pc-text"><b>{comment.user}</b>{comment.text}</span>
                                {isLiked && <span className="ih-pc-like"><IconHeartSmall filled /></span>}
                            </span>
                        )
                    })}
                </button>
            )}
            {commentCount > 0 && (
                <button type="button" className="ih-allcomments" onClick={() => onOpenComments(post)}>
                    댓글 {formatCount(commentCount)}개 모두 보기
                </button>
            )}
            <div className="ih-date">{post.date}</div>
        </div>
    )
}
 
/* ===================== 메인 홈 컴포넌트 ===================== */
export const InstagramHome = () => {
    const navigate = useNavigate()
    const [isHeaderHidden, setIsHeaderHidden] = useState(false)
    const [activeCommentPost, setActiveCommentPost] = useState<FeedPost | null>(null)
    const [notifications, setNotifications] = useState<KakaoNoticeMsg[]>([])
    const seenStoryUserIds = getSeenStoryUserIds()

    const openStory = (id: string, hasStory: boolean) => {
        if (hasStory) navigate(`${IG_PATH.story}?user=${encodeURIComponent(id)}`)
    }

    const showAutoReplyNotification = (reply: CommentReply) => {
        setNotifications((current) => [...current, {
            id: Date.now(),
            sender: reply.user,
            text: `댓글에 답글을 남겼습니다: ${reply.text}`,
        }])
    }

    return (
        <div
            className={`kk-wrapper ig-wrapper ${isHeaderHidden ? 'ig-header-hidden' : ''}`}
            onScroll={(event) => setIsHeaderHidden(event.currentTarget.scrollTop > 10)}
        >
            {FEED_POSTS.flatMap((post) => post.slides
                .filter((slide) => slide.kind === 'photo' && slide.src)
                .map((slide) => <link key={`${post.id}-${slide.src}`} rel="preload" as="image" href={slide.src} />))}
            {IG_USERS.map((user) => user.src && (
                <link key={`avatar-${user.id}`} rel="preload" as="image" href={user.src} />
            ))}
            {IG_USERS.flatMap((user) => user.stories
                .filter((story) => story.src)
                .map((story) => <link key={`story-${user.id}-${story.id}`} rel="preload" as="image" href={story.src} />))}
            {/* 메인 스크롤 피드 */}
            <div className="ih-scroll">
                {/* 스토리 목록 */}
                <div className="ih-tray">
                    {IG_USERS.map((u) => {
                        const hasStory = u.stories.length > 0
                        return (
                            <button
                                key={u.id}
                                className={u.tint === 0 ? 'ih-story' : 'ih-story-friend'}
                                onClick={() => openStory(u.id, hasStory)}
                            >
                                <div className="ih-story-pic">
                                    {hasStory ? (
                                        <IgAvatar size={80} tint={u.tint} src={u.src} ring={seenStoryUserIds.has(u.id) ? 'seen' : 'story'} />
                                    ) : (
                                        <div style={{ position: 'relative', lineHeight: 0 }}>
                                            <IgAvatar size={80} tint={u.tint} src={u.src} />
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

                {/* 피드 카드리스트 */}
                {FEED_POSTS.map((post) => (
                    <PostCard key={post.id} post={post} onOpenComments={(p) => setActiveCommentPost(p)} />
                ))}
            </div>

            {/* 상단 헤더 */}
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

            {/* 상단 상태바 */}
            <KakaoStatusBar time="4:23" battery={74} />

            {/* 하단 탭바 */}
            <IgTabBar active="home" profileDot={true} />

            {/* 댓글 바텀시트 팝업 모달 */}
            {activeCommentPost && (
                <CommentModal
                    post={activeCommentPost}
                    onClose={() => setActiveCommentPost(null)}
                    onAutoReply={showAutoReplyNotification}
                />
            )}
            <div className="ih-kakao-notification">
                <KakaoNotification messages={notifications} onClear={() => setNotifications([])} />
            </div>
        </div>
    )
}

export default InstagramHome