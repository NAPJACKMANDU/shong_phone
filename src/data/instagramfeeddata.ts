/* ===================== 인스타그램 피드 데이터 ===================== */

export interface CommentReply {
    id: number
    user: string
    tint?: number
    time: string
    text: string
    likes: number
    isLiked?: boolean
    isAuthor?: boolean
    src?: string
}

export interface CommentItem {
    id: number
    user: string
    tint?: number
    time: string
    text: string
    likes: number
    isLiked?: boolean
    isLikedByAuthor?: boolean
    isAuthor?: boolean
    isUserComment?: boolean
    replies?: CommentReply[]
    src?: string
}

export interface FeedSlide {
    kind: 'text' | 'photo' | 'video'
    title?: string      // text 카드의 주황색 제목
    body?: string       // text 카드의 글 (빈 줄은 \n\n)
    bg?: string         // photo 의 배경색 (사진이 없을 때)
    src?: string        // photo/video 파일 주소
}

export interface FeedPost {
    id: number
    user: string
    tint?: number            // 기본 프로필 색 번호 (0~4)
    music?: string          // 있으면 이름 아래에 ♫ 노래 줄이 나와요
    suggested?: boolean     // true 면 '회원님을 위한 추천' + 팔로우 버튼
    ratio: number           // 사진 가로/세로 비율
    slides: FeedSlide[]
    likes: string
    likedBy?: { name: string; tints: string[] }   // 있으면 '○○님 외 여러 명이 좋아합니다'
    caption: string
    hashtags?: string[]     // 파란색 해시태그 목록 (#이러니까아무도못알아보기 등)
    date: string
    // 피드에 직접 노출될 댓글 2~3개 (이미지 첫번째 첨부 참고)
    previewComments?: {
        id: number
        user: string
        tint?: number
        text: string
        isLiked?: boolean
        src?: string
    }[]
    // 댓글 팝업(바텀시트) 전체 댓글 목록 (이미지 두번째 첨부 참고)
    commentList?: CommentItem[]
    commentCount?: number
    src?:string
}

export const SHOTARO = 'ohtaros';
export const EUNSEOK = 'eunseoksong';
export const SEONGCHAN = 'sxxngchxn';
export const WONBIN = 'bbinniy';
export const SOHEE = 'ddoLee';
export const ANTON = 'antonyeeton';

const PROFILE_SOURCES: Partial<Record<string, string>> = {
    [SHOTARO]: '/instagram/shotaroProfile.jpg',
    [EUNSEOK]:'/instagram/dolProfile.jpg',
    [SEONGCHAN]: '/instagram/chanProfile.jpg',
    [WONBIN]: '/instagram/wonbinProfile.jpg',
    [SOHEE]: '/instagram/soheeProfile.jpg',
    [ANTON]:'/instagram/antonProfile.jpg'
}

export const getInstagramProfileSrc = (username: string, src?: string) =>
    PROFILE_SOURCES[username] ?? src

type CommentLikeTarget = Pick<CommentItem, 'user' | 'text' | 'isLiked'> & Partial<Pick<CommentItem, 'likes'>>

const COMMENT_LIKES_STORAGE_PREFIX = 'instagram-comment-like:'
const USER_COMMENTS_STORAGE_PREFIX = 'instagram-user-comments:'
const commentLikeListeners = new Set<() => void>()
let commentLikesVersion = 0

const getCommentLikeStorageKey = (postId: number, comment: CommentLikeTarget) =>
    `${COMMENT_LIKES_STORAGE_PREFIX}${postId}:${encodeURIComponent(comment.user)}:${encodeURIComponent(comment.text)}`

export const getInitialCommentLike = (post: FeedPost, comment: CommentLikeTarget) => {
    const sameComment = (candidate: { user: string; text: string }) =>
        candidate.user === comment.user && candidate.text === comment.text
    const matchingPreview = post.previewComments?.find(sameComment)
    const matchingComment = post.commentList?.find(sameComment)

    return Boolean(comment.isLiked || matchingPreview?.isLiked || matchingComment?.isLiked)
}

export const getCommentLike = (post: FeedPost, comment: CommentLikeTarget) => {
    const savedLike = localStorage.getItem(getCommentLikeStorageKey(post.id, comment))
    return savedLike === null ? getInitialCommentLike(post, comment) : savedLike === '1'
}

export const setCommentLike = (post: FeedPost, comment: CommentLikeTarget, isLiked: boolean) => {
    localStorage.setItem(getCommentLikeStorageKey(post.id, comment), isLiked ? '1' : '0')
    commentLikesVersion += 1
    commentLikeListeners.forEach((listener) => listener())
}

const getUserCommentsStorageKey = (postId: number) => `${USER_COMMENTS_STORAGE_PREFIX}${postId}`

const isStoredComment = (value: unknown): value is CommentItem => {
    if (!value || typeof value !== 'object') return false
    const comment = value as Partial<CommentItem>
    return typeof comment.id === 'number'
        && typeof comment.user === 'string'
        && typeof comment.text === 'string'
        && typeof comment.time === 'string'
        && typeof comment.likes === 'number'
}

export const getUserComments = (postId: number): CommentItem[] => {
    const storedComments = localStorage.getItem(getUserCommentsStorageKey(postId))
    if (storedComments === null) return []

    const parsed: unknown = JSON.parse(storedComments)
    if (!Array.isArray(parsed) || !parsed.every(isStoredComment)) {
        throw new Error(`Saved Instagram comments for post ${postId} have an invalid format.`)
    }
    return parsed
}

const saveUserComments = (postId: number, comments: CommentItem[]) => {
    localStorage.setItem(getUserCommentsStorageKey(postId), JSON.stringify(comments))
    commentLikesVersion += 1
    commentLikeListeners.forEach((listener) => listener())
}

export const addUserComment = (postId: number, text: string) => {
    const comments = getUserComments(postId)
    const id = Math.max(Date.now(), ...comments.map((comment) => comment.id + 1))
    const autoReply = comments.length === 0
        ? {
            id: id + 1,
            user: SOHEE,
            tint: 3,
            time: '방금 전',
            text: '인스타 삭제한 줄',
            likes: 0,
            src: getInstagramProfileSrc(SOHEE),
        } satisfies CommentReply
        : undefined
    const comment: CommentItem = {
        id,
        user: SEONGCHAN,
        tint: 0,
        time: '방금 전',
        text,
        likes: 0,
        isUserComment: true,
        ...(autoReply ? { replies: [autoReply] } : {}),
    }

    saveUserComments(postId, [...comments, comment])
    return autoReply
}

export const deleteUserComment = (postId: number, commentId: number) => {
    const comments = getUserComments(postId)
    const remaining = comments.filter((comment) => comment.id !== commentId)
    if (remaining.length !== comments.length) saveUserComments(postId, remaining)
}

export const subscribeToCommentLikes = (listener: () => void) => {
    commentLikeListeners.add(listener)
    const handleStorage = (event: StorageEvent) => {
        if (event.key?.startsWith(COMMENT_LIKES_STORAGE_PREFIX)
            || event.key?.startsWith(USER_COMMENTS_STORAGE_PREFIX)) {
            commentLikesVersion += 1
            listener()
        }
    }
    window.addEventListener('storage', handleStorage)

    return () => {
        commentLikeListeners.delete(listener)
        window.removeEventListener('storage', handleStorage)
    }
}

export const getCommentLikesVersion = () => commentLikesVersion

export const FEED_POSTS: FeedPost[] = [
  
    {
        id: 1,
        user: ANTON,
        music: 'Tom Misch (Feat. Sam Wills) - In the Midst of It All',
        likedBy: { name: SHOTARO, tints: [SHOTARO, WONBIN, EUNSEOK] },
        src:getInstagramProfileSrc(ANTON),
        commentCount: 5932,
        ratio: 0.8,
        slides: [
            { kind: 'photo', src: '/instagram/234.jpg' },
            { kind: 'photo', src: '/instagram/233.jpg' },
            { kind: 'photo', src: '/instagram/232.jpg' },
        ],
        likes: '2.3만',
        caption: 'I`m going to Korea 🛫 ',
        date: '7월 13일',
        previewComments: [
            { id: 201, user: WONBIN, tint: 2, text: '임마 왜 이렇게 빨리 오는데ㅔ', isLiked: false },
            { id: 202, user: EUNSEOK, tint: 2, text: '이번에 오면 얼마나 있나?', isLiked: false },
        ],
        commentList: [
            {
                id: 1,
                user: WONBIN,
                tint: 2,
                time: '1일',
                text: '임마 왜 이렇게 빨리 오는데ㅔ',
                likes: 2,
                isLiked: false,
                replies: [
                    {
                        id: 20,
                        user: ANTON,
                        tint: 3,
                        time: '1일',
                        text: '@' + WONBIN + ' 😅',
                        likes: 0,
                        isLiked: false,
                        isAuthor: true,
                    },
            ]
            },
            {
                id: 2,
                user: EUNSEOK,
                tint: 3,
                time: '1일',
                text: '이번에 오면 얼마나 있나?',
                likes: 0,
                isLiked: false,
                replies: [
                    {
                        id: 21,
                        user: ANTON,
                        tint: 3,
                        time: '1일',
                        text: '@' + EUNSEOK + ' 몰르겠어요 급하게 빼고 가는 거라 금방 가야 돼요 ㅎㅎ',
                        likes: 0,
                        isLiked: false,
                        isAuthor: true,
                    },
            ]
            },
            {
                id: 3,
                user: 'agrigatoonlove',
                tint: 3,
                time: '1일',
                text: '쓰레기 치우고 있을게요',
                likes: 45,
                isLiked: false,
            },
            {
                id: 4,
                user: 'mumumm_',
                tint: 3,
                time: '1일',
                text: '아니 진짜 헤어졌나? 원래같으면 남자친구이름 말하면서 00이형 기다려요 저 갈게요 이러는데 왜 그런 게 없지 ㅜ 물론 그 기사 터진지 이제 3일 지나긴 했는데 ㅜ 내가 넘 오지라퍼인가? 걱정이 많은 거겟죠.... ㅜㅜ',
                likes: 6923,
                isLiked: false,
                replies: [
                    {
                        id: 22,
                        user: 'already_done_',
                        tint: 3,
                        time: '1일',
                        text: '@mumumm_ 난 둘이 더큰대한민국 만들것같았는데 찬영이도 어쩔수없는 헤테로인가봄',
                        likes: 2021,
                        isLiked: false,
                        isAuthor: false,
                    },
                 {
                        id: 23,
                        user: 'over_think_',
                        tint: 3,
                        time: '1일',
                        text: '@already_done_ 추측성발언 ㄴㄴ 아니라고 기사도 났음',
                        likes: 209,
                        isLiked: false,
                        isAuthor: false,
                    },
              {
                        id: 24,
                        user: 'zero_layer',
                        tint: 3,
                        time: '1일',
                        text: '@mumumm_ 그렇다기엔 성찬님은 찬영이사진 하나도 안내렸어요 헤어진건 아닌것같고 그냥 그 기사 때문에 좀 그런거 아닐까여...',
                        likes: 3021,
                        isLiked: false,
                        isAuthor: false,
                    },
                ]
            },
            {
                id: 5,
                user: 'error_404_found',
                tint: 3,
                time: '1일',
                text: '귀엽다',
                likes: 0,
                isLiked: false,
            },
            {
                id: 6,
                user: SOHEE,
                tint: 2,
                time: '1일',
                text: '오면 얼굴 좀 보자',
                likes: 973,
                isLiked: false,
                replies: [
                    {
                        id: 25,
                        user: ANTON,
                        tint: 3,
                        time: '1일',
                        text: '@' + SOHEE + ' 소희 형 저 바쁨 ㅋ',
                        likes: 193,
                        isLiked: false,
                        isAuthor: true,
                    },
            ]
            },
            {
                id: 7,
                user: SHOTARO,
                tint: 2,
                time: '1일',
                text: '찬영 오면 얘기 좀 해 ㅎㅎ',
                likes: 0,
                isLiked: false,
                replies: [
                    {
                        id: 26,
                        user: ANTON,
                        tint: 3,
                        time: '1일',
                        text: '@' + SHOTARO + ' 카톡할게여ㅕ :)',
                        likes: 0,
                        isLiked: false,
                        isAuthor: true,
                    },
                    {
                        id: 27,
                        user: SOHEE,
                        tint: 3,
                        time: '1일',
                        text: '@' + ANTON + ' 바쁘다는거 구라 적발',
                        likes: 0,
                        isLiked: false,
                        isAuthor: false,
                    },
            ]
            },
        ],
    },
    {
        id: 2,
        user: WONBIN,
        music: 'RIIZE · SOAR',
        likedBy: { name: EUNSEOK, tints: [ANTON, SEONGCHAN, EUNSEOK] },
        src:getInstagramProfileSrc(WONBIN),
        commentCount: 24,
        ratio: 0.8,
        slides: [
            { kind: 'photo', src: '/instagram/wonbin1.jpg' },
            { kind: 'photo', src: '/instagram/wonbin2.jpg' },
        ],
        likes: '428',
        caption: '연습 중 🎸',
        date: '7월 4일',
        previewComments: [
            { id: 201, user: SHOTARO, tint: 2, text: '뭐 하나 했더니만 사진 찍고 있었네 ㅋㅋ', isLiked: false },
        ],
        commentList: [
            {
                id: 1,
                user: SHOTARO,
                tint: 2,
                time: '4일',
                text: '뭐 하나 했더니만 사진 찍고 있었네 ㅋㅋ',
                likes: 27,
                isLiked: false,
            },
            {
                id: 2,
                user: 'silentarchive',
                tint: 3,
                time: '4일',
                text: '역시 울산의 자랑',
                likes: 0,
                isLiked: false,
                replies: [
                    {
                        id: 21,
                        user: WONBIN,
                        tint: 3,
                        time: '4일',
                        text: '@silentarchive 아 니 이런것 쫌 하지마라ㅏㅏㅏ',
                        likes: 0,
                        isLiked: false,
                        isAuthor: true,
                    },
            ]
            },
            {
                id: 3,
                user: 'bluehourlog',
                tint: 3,
                time: '4일',
                text: '우리얼른축제하자',
                likes: 0,
                isLiked: false,
            },
            {
                id: 4,
                user: SOHEE,
                tint: 2,
                time: '4일',
                text: '형 어깨에 힘 좀 빼요',
                likes: 23,
                isLiked: false,
                replies: [
                    {
                        id: 21,
                        user: SHOTARO,
                        tint: 3,
                        time: '4일',
                        text: '@' + SOHEE + ' ㅋㅋㅋㅋ',
                        likes: 0,
                        isLiked: false,
                        isAuthor: false,
                    },
            ]
            },
        ],
    },
        {
        id: 3,
        user: SHOTARO,
        music: 'Natori · Overdose',
        likedBy: { name: SOHEE, tints: [ANTON, SEONGCHAN, SOHEE] },
        src:getInstagramProfileSrc(SHOTARO),
        commentCount: 79,
        ratio: 0.8,
        slides: [
            { kind: 'photo', src: '/instagram/taro1.jpg' },
            { kind: 'photo', src: '/instagram/taro2.jpg' },
            { kind: 'photo', src: '/instagram/taro3.jpg' },
            { kind: 'photo', src: '/instagram/taro4.jpg' },
        ],
        likes: '1,743',
        caption: ['무대 끝 와주셔서 감사합니다',
                'ステージの端まで来てくださってありがとうございます 🕺🏻'
                ].join('\n'),
        date: '6월 30일',
        previewComments: [
            { id: 201, user: SEONGCHAN, tint: 2, text: '역시 타로 형', isLiked: false },
            { id: 202, user: WONBIN, tint: 2, text: '이제 저희 거 준비해요', isLiked: false },
        ],
        commentList: [
            {
                id: 1,
                user: SEONGCHAN,
                tint: 2,
                time: '2주',
                text: '역시 타로 형',
                likes: 32,
                isLiked: false,
                isLikedByAuthor : true
            },
            {
                id: 2,
                user: WONBIN,
                tint: 3,
                time: '2주',
                text: '이제 저희 거 준비해요',
                likes: 1,
                isLiked: false,
                isLikedByAuthor : true
            },
            {
                id: 3,
                user: 'offgridlog',
                tint: 3,
                time: '2주',
                text: '고생했습니다~~',
                likes: 0,
                isLiked: false,
            },
            {
                id: 4,
                user: 'rawnotes',
                tint: 3,
                time: '2주',
                text: '3번째 사진뭔데',
                likes: 0,
                isLiked: false,
            },
            {
                id: 5,
                user: SOHEE,
                tint: 2,
                time: '2주',
                text: '안녕하세요, 인스타매거진에서 나왔습니다. 쇼타로 씨, DM 한 번만 확인 부탁드려요~',
                likes: 402,
                isLiked: false,
            },
        ],
    },    {
        id: 4,
        user: ANTON,
        music: '도경수(D.O.) - Si Fueras Mía',
        likedBy: { name: SHOTARO, tints: [SHOTARO, WONBIN, EUNSEOK] },
        src:getInstagramProfileSrc(ANTON),
        commentCount: 3972,
        ratio: 0.8,
        slides: [
            { kind: 'photo', src: '/instagram/tonpost3.jpg' },
            { kind: 'photo', src: '/instagram/tonpost4.jpg' },
            { kind: 'photo', src: '/instagram/tonpost5.jpg' },
            { kind: 'video', src: '/instagram/tonpost6.mp4' },  
            { kind: 'video', src: '/instagram/tonpost8.mp4' },
            { kind: 'video', src: '/instagram/tonpost5.mp4' },
        ],
        likes: '3.9만',
        caption: [
            '좋아하는 일을 하며 살아갈 수 있다는 건, 참 감사하고 다행스러운 일인 것 같아요. 비록 내가 정말 소중하게 생각하는 사람들을 먼발치에 두고 떠나온 것 같아 마음 한구석이 늘 아려오지만, 그 사람들 역시 각자의 자리에서 저를 묵묵히 응원해주고 있다는 걸 알기에 다시 한번 마음을 다잡게 되네요. :)',
            '',
            '사실 제게 수영이란 건 단순한 운동이나 취미 그 이상이에요. 물속에 조용히 몸을 던졌을 때 느껴지는 그 정적, 잔잔하게 퍼지는 물결의 감촉, 그리고 오롯이 숨소리에만 집중하며 앞으로 나아가는 그 순수한 순간들을 정말 많이 사랑하거든요.',
            '',
            '내가 사랑하는 이 수영이라는 일, 그리고 내가 진심으로 아끼는 내 사람들. 이 둘이 제 삶에 공존하고 있다는 사실만으로도 제 세상은 이미 충분히 채워지고 있는 게 아닐까 싶어요.',
            '',
            '우리가 서로의 전부가 될 수도 없고, 또 굳이 서로의 인생 전체를 짊어질 필요까진 없을 거예요. 하지만 분명한 건, 서로의 삶 한편에 아주 깊고 소중한 조각으로 존재하고 있다는 사실이겠죠.',
            '',
            '그렇기에 제가 물 속에서 끊임없이 내딛는 이 짓음과 상쾌한 에너지가, 여러분에게도 작게나마 긍정적인 파동으로 전해질 수 있으면 좋겠습니다. 조금이라도 마음의 짐을 덜어주는 힘이 되고, 기분 좋은 응원이 되고, 따뜻한 행복이 되어줄 수 있기를요.',
            '',
            '훗날 우리가 지나온 시간들을 가만히 돌아봤을 때, 마치 물가에 비친 따스한 햇살처럼 언제든 마음을 덥혀주는 아늑한 추억으로 남아있었으면 좋겠네요. 늘 곁에서 그 온기를 먼저 채워주고 계셔서 고맙습니다. ',
            '',
            'Being able to live doing what I love feels like such a blessing and a privilege. Although a part of my heart aches at the thought that I may have left behind those I truly cherish, knowing that they too are quietly supporting me from their own places helps me pull myself together once again. :)',
            '',
            'For me, swimming is more than just a sport or a hobby. I truly love the silence felt when I quietly plunge into the water, the gentle sensation of the rippling waves, and those pure moments of moving forward while focusing solely on my breathing.',
            '',
            'Swimming, which I love so much, and the people I cherish deeply. Just the fact that these two coexist in my life makes me feel as though my world is already completely full.',
            '',
            'We cannot be each other’s everything, nor do we need to carry the weight of each other’s entire lives. But what is certain is that we exist as a deep, precious piece in one another’s lives.',
            '',
            'That is why I hope the constant movement and refreshing energy I create in the water can reach you as a small positive wave. I hope it eases your burden even a little, brings comforting support, and offers warm happiness.',
            '',
            'When we look back on the time we’ve spent together in the future, I hope these moments remain cozy memories that warmly embrace our hearts, like gentle sunlight shimmering on the water’s edge. Thank you for always being by my side and filling me with that warmth first.'].join('\n'),
        date: '6월 28일',
        previewComments: [
            { id: 201, user: SEONGCHAN, tint: 2, text: '천사 먼발치라는 말도 알아~ 많이 컸네 이제 아가 아니네~ ㅎㅎ', isLiked: false },
            { id: 202, user: WONBIN, tint: 2, text: '임마ㅏ 우리 친하게 지내자', isLiked: false },
        ],
        commentList: [
            {
                id: 1,
                user: SEONGCHAN,
                tint: 2,
                time: '2주',
                text: '천사 먼발치라는 말도 알아~ 많이 컸네 이제 아가 아니네~ ㅎㅎ',
                likes: 4923,
                isLiked: false,
                isLikedByAuthor : true,
                replies: [
                    {
                        id: 20,
                        user: ANTON,
                        tint: 3,
                        time: '2주',
                        text: '@' + SEONGCHAN + ' 베이비 졸업',
                        likes: 3254,
                        isLiked: false,
                        isAuthor: true,
                    },                {
                        id: 21,
                        user: 'ghosttown',
                        tint: 3,
                        time: '2주',
                        text: '@' + SEONGCHAN + ' 제가 잘몰라서 그런데 혹시 둘이 사귀나요?',
                        likes: 726,
                        isLiked: false,
                    },
                {
                        id: 22,
                        user: 'deadendstreet',
                        tint: 3,
                        time: '2주',
                        text: '@ghosttown 네 사귀심 좀 오래됐어요',
                        likes: 327,
                        isLiked: false,
                    },
            ]
            },
            {
                id: 2,
                user: WONBIN,
                tint: 3,
                time: '2주',
                text: '임마ㅏ 우리 친하게 지내자',
                likes: 75,
                isLiked: false,
                replies: [
                    {
                        id: 21,
                        user: ANTON,
                        tint: 3,
                        time: '2주',
                        text: '@' + WONBIN + ' 이럴 때만 이러기 있나요 ^^ ㅋ',
                        likes: 420,
                        isLiked: false,
                        isAuthor: true,
                    },
            ]
            },
            {
                id: 3,
                user: 'zero_layer',
                tint: 3,
                time: '2주',
                text: '사랑해요',
                likes: 45,
                isLiked: false,
            },
            {
                id: 4,
                user: 'agrigatoonlove',
                tint: 3,
                time: '2주',
                text: '이찬영선수 해외에서 날아다니던데',
                likes: 12,
                isLiked: false,
                replies: [
                    {
                        id: 21,
                        user: 'eonslvndua',
                        tint: 3,
                        time: '2주',
                        text: '@agrigatoonlove 아무래도 남자친구분께서 천사라고 불러주시다 보니',
                        likes: 209,
                        isLiked: false,
                    },
            ]
            },
            {
                id: 5,
                user: 'letstonright',
                tint: 3,
                time: '2주',
                text: '이앤톤 너무 어른스러움 ㅠㅠ',
                likes: 0,
                isLiked: false,
                
            },
            {
                id: 6,
                user: SOHEE,
                tint: 2,
                time: '2주',
                text: '찬영아 얼른 한국 좀 오지?',
                likes: 973,
                isLiked: false,
                replies: [
                    {
                        id: 25,
                        user: ANTON,
                        tint: 3,
                        time: '2주',
                        text: '@' + SOHEE + ' 저 없으니까 조굼 보고 싶죠?',
                        likes: 193,
                        isLiked: false,
                        isAuthor: true,
                    },
            ]
            },
        ],
    },
    {
        id: 5,
        user: SEONGCHAN,
        likedBy: { name: SEONGCHAN, tints: [ANTON, WONBIN, SOHEE] },
        music:'Beenzino (빈지노) – Always Awake',
        src:getInstagramProfileSrc(SEONGCHAN),
        commentCount: 18,
        ratio: 0.8,
        slides: [
            { kind: 'photo', src: '/instagram/chan1.jpg' },
            { kind: 'photo', src: '/instagram/chan2.jpg' },
            { kind: 'photo', src: '/instagram/chan3.jpg' },
            { kind: 'photo', src: '/instagram/chan4.jpg' },
        ],
        likes: '293',
        caption: '🥖🥖🥖',
        date: '6월 23일',
        previewComments: [
            { id: 201, user: ANTON, tint: 3, text: '성찬이형 오늘 옷 잘 어울리는데요 😍 ', isLiked: true },
            { id: 202, user: EUNSEOK, tint: 3, text: '언제 또 해외 나갔냐', isLiked: false },
        ],
        commentList: [
            {
                id: 1,
                user: ANTON,
                tint: 3,
                time: '5주',
                text: '성찬이형 오늘 옷 잘 어울리는데요 😍',
                likes: 28,
                isLiked: true,
                replies: [
                    {
                        id: 21,
                        user: SEONGCHAN,
                        tint: 3,
                        time: '5주',
                        text: '@' + ANTON + ' 앤토니랑 제일 잘 어울림 ㅎㅎ',
                        likes: 12,
                        isLiked: false,
                        isAuthor: true,
                    },
                    {
                        id: 22,
                        user: SOHEE,
                        tint: 3,
                        time: '5주',
                        text: '@' + SEONGCHAN + ' 🤢🤮',
                        likes: 0,
                        isLiked: false,
                        isAuthor: false,
                    },
                ]
            },
            {
                id: 2,
                user: EUNSEOK,
                tint: 3,
                time: '5주',
                text: '언제 또 해외 나갔냐',
                likes: 0,
                isLiked: false
            },
            {
                id: 3,
                user: SHOTARO,
                tint: 3,
                time: '5주',
                text: '성찬 잘생겼는데~',
                likes: 0,
                isLiked: false,
            },
        ],
    },
        {
        id: 6,
        user: EUNSEOK,
        likedBy: { name: SOHEE, tints: [ANTON, WONBIN, SOHEE] },
        src:getInstagramProfileSrc(EUNSEOK),
        commentCount: 6,
        ratio: 0.8,
        slides: [
            { kind: 'photo', src: '/instagram/dol1.jpg' },
            { kind: 'photo', src: '/instagram/dol2.jpg' },
            { kind: 'photo', src: '/instagram/dol3.jpg' },
            { kind: 'photo', src: '/instagram/dol4.jpg' },
        ],
        likes: '78',
        caption: '송디다스',
        date: '6월 12일',
        previewComments: [
            { id: 201, user: WONBIN, tint: 2, text: '아 송디다스 뭔데요', isLiked: false },
            { id: 202, user: SOHEE, tint: 2, text: '아디다스가 선택한 남자 ㄷㄷ', isLiked: false },
        ],
        commentList: [
            {
                id: 1,
                user: WONBIN,
                tint: 2,
                time: '4주',
                text: '아 송디다스 뭔데요',
                likes: 0,
                isLiked: false,
            },
            {
                id: 2,
                user: SOHEE,
                tint: 3,
                time: '4주',
                text: '아디다스가 선택한 남자 ㄷㄷ',
                likes: 0,
                isLiked: false
            },
            {
                id: 3,
                user: 'deardays_',
                tint: 3,
                time: '4주',
                text: '흐린눈하고 보면 협찬임',
                likes: 0,
                isLiked: false,
            },
            {
                id: 4,
                user: SOHEE,
                tint: 2,
                time: '4주',
                text: '뭐임 협찬 아니에요?',
                likes: 0,
                isLiked: false,
                replies: [
                    {
                        id: 21,
                        user: SHOTARO,
                        tint: 3,
                        time: '4주',
                        text: '@' + SOHEE + ' 은석 협찬 아니야 ㅋㅋㅋ',
                        likes: 0,
                        isLiked: false,
                        isAuthor: false,
                    },
            ]
            },
            {
                id: 5,
                user: 'midnightroutine',
                tint: 3,
                time: '4주',
                text: '와 은석이 많이 컸네 아디다스도 입고',
                likes: 0,
                isLiked: false,
            },
        ],
    },
    {
        id: 7,
        user: SHOTARO,
        likedBy: { name: SOHEE, tints: [ANTON, WONBIN, SOHEE] },
        src:getInstagramProfileSrc(SHOTARO),
        commentCount: 923,
        ratio: 0.8,
        slides: [
            { kind: 'video', src: '/instagram/taro.mp4' },
        ],
        likes: '3,203',
        caption: '🕺🏻🕺🏻',
        date: '6월 8일',
        previewComments: [
            { id: 201, user: 'offSec', tint: 3, text: '쇼타로미만잡', isLiked: false },
            { id: 202, user: 'yaya_jamkkan', tint: 3, text: '누군가가 춤에대한 자부심을 가질때 쇼타로를 보여줘라', isLiked: false },
        ],
        commentList: [
            {
                id: 1,
                user: 'offSec',
                tint: 3,
                time: '5주',
                text: '쇼타로미만잡',
                likes: 0,
                isLiked: false,
            },
            {
                id: 2,
                user: 'yaya_jamkkan',
                tint: 3,
                time: '5주',
                text: '누군가가 춤에대한 자부심을 가질때 쇼타로를 보여줘라',
                likes: 0,
                isLiked: false
            },
            {
                id: 3,
                user: WONBIN,
                tint: 3,
                time: '5주',
                text: '이번 공연 스포?',
                likes: 0,
                isLiked: false,
            },
            {
                id: 4,
                user: EUNSEOK,
                tint: 2,
                time: '5주',
                text: '진짜 올타임 레전드',
                likes: 0,
                isLiked: false,
                replies: [
                    {
                        id: 21,
                        user: SOHEE,
                        tint: 3,
                        time: '5주',
                        text: '@' + EUNSEOK + ' 뭐지 이 덕후냄새는?',
                        likes: 0,
                        isLiked: false,
                        isAuthor: false,
                    },
            ]
            },
            {
                id: 5,
                user: 'bap_meok_Ja',
                tint: 3,
                time: '5주',
                text: '와 밥 안 먹어도 배부름',
                likes: 0,
                isLiked: false,
            },
        ],
    },
        {
        id: 8,
        user: ANTON,
        likedBy: { name: SHOTARO, tints: [ANTON, WONBIN, SOHEE] },
        src:getInstagramProfileSrc(ANTON),
        music:'Tom Misch, Jordan Rakei - Wake Up This Day',
        commentCount: 1892,
        ratio: 0.8,
        slides: [
            { kind: 'photo', src: '/instagram/ton1.jpg' },
            { kind: 'photo', src: '/instagram/ton2.jpg' },
            { kind: 'photo', src: '/instagram/ton3.jpg' },
            { kind: 'photo', src: '/instagram/ton4.jpg' },
        ],
        likes: '4.3만',
        caption: '🥖🥖🥖',
        date: '6월 4일',
        previewComments: [
            { id: 201, user: SEONGCHAN, tint: 3, text: '바게트 진짜 좋아하네 보고 싶어ㅓ 사랑해', isLiked: false },
            { id: 202, user: SOHEE, tint: 3, text: '댓글에서 단내 대박 ㅋㅋ', isLiked: false },
        ],
        commentList: [
            {
                id: 1,
                user: SEONGCHAN,
                tint: 3,
                time: '5주',
                text: '바게트 진짜 좋아하네 보고 싶어ㅓ 사랑해',
                likes: 3821,
                isLiked: false,
                isLikedByAuthor:true,
                replies: [
                    {
                        id: 21,
                        user: 'okayByeNow',
                        tint: 3,
                        time: '5주',
                        text: '@' + SEONGCHAN + ' 아ㅏㅏ내게이들연애전선이상무래 ㅠㅠ',
                        likes: 932,
                        isLiked: false,
                        isAuthor: false,
                    },
                    {
                        id: 22,
                        user: 'over_think_',
                        tint: 3,
                        time: '5주',
                        text: '@' + SEONGCHAN + ' 성찬님께서 바게트 많이 사주셔야 할 듯',
                        likes: 591,
                        isLiked: false,
                        isAuthor: false,
                    },
                    {
                        id: 23,
                        user: 'nextPage_',
                        tint: 3,
                        time: '5주',
                        text: '@' + SEONGCHAN + ' 아 누굴 부러워해야하느지 감도 안온다',
                        likes: 322,
                        isLiked: false,
                        isAuthor: false,
                    },
                    {
                        id: 24,
                        user: 'neonShadows',
                        tint: 3,
                        time: '5주',
                        text: '@' + SEONGCHAN + ' 와 아직도 사랑을 한다고?',
                        likes: 183,
                        isLiked: false,
                        isAuthor: false,
                    },
                    {
                        id: 25,
                        user: 'mondaHateClub',
                        tint: 3,
                        time: '5주',
                        text: '@' + SEONGCHAN + ' 이런사랑아니면 난사랑모른다...',
                        likes: 302,
                        isLiked: false,
                        isAuthor: false,
                    },
                    {
                        id: 26,
                        user: 'already_done_',
                        tint: 3,
                        time: '3일 전',
                        text: '@' + SEONGCHAN + ' 예쁘게 사귈 줄 알았는데 ㅠ',
                        likes: 2021,
                        isLiked: false,
                        isAuthor: false,
                    },
            ]
            },
            {
                id: 2,
                user: SOHEE,
                tint: 3,
                time: '5주',
                text: '댓글에서 단내 대박 ㅋㅋ',
                likes: 1920,
                isLiked: false
            },
            {
                id: 3,
                user: SHOTARO,
                tint: 3,
                time: '5주',
                text: '앤톤 한국 언제 와? ㅠㅠ 성찬이 계속 너 노래 불러',
                likes: 1323,
                isLiked: false,
                replies: [
                    {
                        id: 21,
                        user: ANTON,
                        tint: 3,
                        time: '5주',
                        text: '@' + EUNSEOK + ' ㅋㅋ 다음 달은 어렵고 10월에는 무조건 가용',
                        likes: 2231,
                        isLiked: false,
                        isAuthor: true,
                    },
                    {
                        id: 22,
                        user: 'brainnotfound',
                        tint: 3,
                        time: '21시간 전',
                        text: '@' + SHOTARO + ' 10월에 올것같다고 했는데 오늘 비행기 타는거 진짜 남자친구한테 해명하러 가는 것 같음 킹리적 의심',
                        likes: 1003,
                        isLiked: false,
                        isAuthor: false,
                    },
            ]
            },
            {
                id: 4,
                user: EUNSEOK,
                tint: 2,
                time: '5주',
                text: '찬영아 행복하냐',
                likes: 0,
                isLiked: false,
            },
            {
                id: 5,
                user: 'yeah_maybe',
                tint: 3,
                time: '5주',
                text: '아진짜너무잘생겼다...',
                likes: 0,
                isLiked: false,
            },
        ],
    },
      {
        id: 9,
        user: SOHEE,
        src:getInstagramProfileSrc(SOHEE),
        music:'Post Malone, Swae Lee - Sunflower (Spider-Man: Into the Spider-Verse)',
        commentCount: 2392,
        ratio: 1.14,
        slides: [
            { kind: 'video', src: '/instagram/soheesSpiderMan.mp4' },
        ],
        likes: '1.8만',
        likedBy: { name: 'bbinniy', tints: [ANTON, SEONGCHAN, WONBIN] },
        caption: '스파이더맨 보기 전에~~~',
        hashtags: ['#스파이더맨', ' #톰홀랜드'],
        date: '5월 24일',
        previewComments: [
            {
                id: 101,
                user: SEONGCHAN,
                tint: 2,
                text: '꼬마 스파이더맨 나가신다 ㄷㄷ',  
                isLiked: false, 
            },
            {
                id: 102,
                user: EUNSEOK,
                tint: 3,
                text: '오... 역시 인플루언서',
                isLiked: false,
            },
        ],
        commentList: [
            {
                id: 1,
                user: SEONGCHAN,
                tint: 2,
                time: '7주',
                text: '꼬마 스파이더맨 나가신다 ㄷㄷ',
                likes: 4084,   
                isLiked: false,
            },
            {
                id: 2,
                user: EUNSEOK,
                tint: 3,
                time: '7주',
                text: '오... 역시 인플루언서',
                likes: 203,
                isLiked: false,
            },
            {
                id: 3,
                user: WONBIN,
                tint: 3,
                time: '7주',
                text: '아 이소희 같이 찍자니까ㅏ아ㅏㅏ',
                likes: 24,
                isLiked: false,
            },
            {
                id: 4,
                user: 'idoidosoido',
                tint: 3,
                time: '7주',
                text: '귀여움으로세상구하실것같음',
                likes: 26,
                isLiked: false,
            },
            {
                id: 5,
                user: 'naranlady',
                tint: 3,
                time: '7주',
                text: '이상하다나위험에빠졌는데왜안오시지?',
                likes: 93,
                isLiked: false,
            },
        ],
    },
        {
        id: 10,
        user: SEONGCHAN,
        likedBy: { name: ANTON, tints: [ANTON, WONBIN, SOHEE] },
        music:'KYLE - Sunday',
        src:getInstagramProfileSrc(SEONGCHAN),
        commentCount: 27,
        ratio: 0.8,
        slides: [
            { kind: 'photo', src: '/instagram/chanton1.jpg' },
            { kind: 'photo', src: '/instagram/chanton2.jpg' },
            { kind: 'photo', src: '/instagram/chanton3.jpg' },
            { kind: 'photo', src: '/instagram/chanton4.jpg' },
            { kind: 'photo', src: '/instagram/chanton5.jpg' },
        ],
        likes: '173',
        caption: '덥다 더워',
        date: '5월 13일',
        previewComments: [
            { id: 201, user: ANTON, tint: 3, text: '사진 뭐예요 😵', isLiked: true },
            { id: 202, user: EUNSEOK, tint: 3, text: '잘 사귀네', isLiked: false },
        ],
        commentList: [
            {
                id: 1,
                user: ANTON,
                tint: 3,
                time: '25주',
                text: '사진 뭐예요 😵',
                likes: 28,
                isLiked: false,
                replies: [
                    {
                        id: 21,
                        user: SEONGCHAN,
                        tint: 3,
                        time: '25주',
                        text: '@' + ANTON + ' ㅎㅎ',
                        likes: 12,
                        isLiked: false,
                        isAuthor: true,
                    },
                    {
                        id: 22,
                        user: 'sweet.nightmares',
                        tint: 3,
                        time: '25주',
                        text: '@' + ANTON + ' 셋이 사귀고 싶다',
                        likes: 0,
                        isLiked: false,
                        isAuthor: false,
                    },
                ]
            },
            {
                id: 2,
                user: EUNSEOK,
                tint: 3,
                time: '25주',
                text: '잘 사귀네',
                likes: 0,
                isLiked: false,
            },
            {
                id: 3,
                user: 'oddevenodd',
                tint: 3,
                time: '25주',
                text: '우리도 좀 만나줘라',
                likes: 0,
                isLiked: false,
                replies: [
                    {
                        id: 21,
                        user: SEONGCHAN,
                        tint: 3,
                        time: '25주',
                        text: '@oddevenodd 앤토니 곧 해외 가는데 그때 ㄱㄱ 연락함',
                        likes: 12,
                        isLiked: false,
                        isAuthor: true,
                    },
                ]
            },
            {
                id: 4,
                user: SOHEE,
                tint: 3,
                time: '25주',
                text: '결혼까지 하세요',
                likes: 21,
                isLiked: false,
            },
            {
                id: 5,
                user: SHOTARO,
                tint: 3,
                time: '25주',
                text: '둘다 귀여워~',
                likes: 0,
                isLiked: false,
            },
                        {
                id: 6,
                user: 'coldblooded',
                tint: 3,
                time: '25주',
                text: '행복해 보인다 야',
                likes: 0,
                isLiked: false,
            },
        ],
    },
    {
        id: 11,
        user: SEONGCHAN,
        tint: 0,
        src: getInstagramProfileSrc(SEONGCHAN),
        ratio: 0.8,
        commentCount: 3921,
        slides: [{ kind: 'video', src: '/instagram/chanton0.mp4' }],
        likes: '6.4만',
        likedBy: { name: 'bbinniy', tints: [ANTON, EUNSEOK, WONBIN] },
        caption: '사랑해',
        date: '2024년 6월 28일',
        previewComments: [
            {
                id: 101,
                user: ANTON,
                tint: 2,
                text: 'lUV 😍',  
                isLiked: true,
                 
            },
            {
                id: 102,
                user: EUNSEOK,
                tint: 3,
                text: '?',
                isLiked: false,
            },
        ],
        commentList: [
            {
                id: 1,
                user: ANTON,
                tint: 2,
                time: '121주',
                text: 'lUV 😍',
                likes: 8024,   
                isLiked: true,
            },
            {
                id: 2,
                user: EUNSEOK,
                tint: 3,
                time: '121주',
                text: '?',
                likes: 3,
                isLiked: false,
            },
            {
                id: 3,
                user: 'lagisreal',
                tint: 3,
                time: '121주',
                text: '@alltimefeelsogood 미친 얼합 ㄹㅈㄷ',
                likes: 207,
                isLiked: false,
            },
            {
                id: 4,
                user: SOHEE,
                tint: 3,
                time: '121주',
                text: '엥?',
                likes: 24,
                isLiked: false,
            },
            {
                id: 5,
                user: 'livingindream',
                tint: 3,
                time: '121주',
                text: '성찬이형 형 남자도 됐었어요?',
                likes: 93,
                isLiked: false,
                 replies: [
                    {
                        id: 21,
                        user: SEONGCHAN,
                        tint: 3,
                        time: '121주',
                        text: '@livingindream 응? 난 원래 남자만 됐어 ㅎㅎ',
                        likes: 2342,
                        isLiked: false,
                        isAuthor: true,
                    },
                 ]
            },
            {
                id: 6,
                user: SHOTARO,
                tint: 3,
                time: '121주',
                text: '성찬?',
                likes: 11,
                isLiked: false,
            },
            {
                id: 7,
                user: 'oddevenodd',
                tint: 3,
                time: '121주',
                text: '야 성찬아 뭐냐',
                likes: 0,
                isLiked: false,
            },
            {
                id: 8,
                user: 'bbaam',
                tint: 3,
                time: '121주',
                text: '수영선수 이찬영?',
                likes: 928,
                isLiked: false,
            },
            {
                id: 9,
                user: WONBIN,
                tint: 3,
                time: '121주',
                text: '뭐예요?',
                likes: 73,
                isLiked: false,
            },
            {
                id: 10,
                user: 'notenoughspace',
                tint: 3,
                time: '121주',
                text: '아 ㅁㅊ 잘생긴 게이 찬성',
                likes: 215,
                isLiked: false,
            },
                        {
                id: 11,
                user: 'nothingreallymatters',
                tint: 3,
                time: '121주',
                text: '알고리즘의순기능',
                likes: 29,
                isLiked: false,
            },
        ],
    },
];