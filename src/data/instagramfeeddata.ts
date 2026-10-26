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
        likes: '10.3만',
        caption: 'I`m going to Korea 🛫 ',
        date: '10월 21일',
        previewComments: [
            { id: 201, user: WONBIN, tint: 2, text: '조심히 오거라', isLiked: false },
            { id: 201, user: EUNSEOK, tint: 2, text: '이번에 오면 얼마나 있나?', isLiked: false },
        ],
        commentList: [
            {
                id: 1,
                user: WONBIN,
                tint: 2,
                time: '1일',
                text: '조심히 오거라',
                likes: 2,
                isLiked: false,
                replies: [
                    {
                        id: 20,
                        user: ANTON,
                        tint: 3,
                        time: '1일',
                        text: '@' + WONBIN + ' 원빈이형 축제 보러 갈게용ㅇ',
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
                        text: '@' + EUNSEOK + ' 몰르겠어요 삼 주 정도 잡긴 했는데 더 있다가 갈수도 있고 ㅎㅎ',
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
                text: '아니 진짜 헤어졌나? 원래같으면 남자친구이름 말하면서 00이형 기다려요 저 갈게요 이러는데 너무잠잠함 그리고 원래 해외가도 매번 본인들 카톡하는 사진 올리는데 이번에는 너무 조용함 ㅠ 왜? ㅠㅠ 논란 그거 아니라매...',
                likes: 6923,
                isLiked: false,
                replies: [
                    {
                        id: 22,
                        user: 'already_done_',
                        tint: 3,
                        time: '1일',
                        text: '@mumumm_ ㅇㅈ ㅠ 더큰대한민국 만들것같았는데 찬영이도 어쩔수없는 헤테로인가봄',
                        likes: 2021,
                        isLiked: false,
                        isAuthor: false,
                    },
                 {
                        id: 23,
                        user: 'over_think_',
                        tint: 3,
                        time: '1일',
                        text: '@already_done_ 추측성발언 ㄴㄴ',
                        likes: 209,
                        isLiked: false,
                        isAuthor: false,
                    },
              {
                        id: 24,
                        user: 'zero_layer',
                        tint: 3,
                        time: '1일',
                        text: '@mumumm_ 그렇다기엔 정성찬은 찬영이사진 하나도 안내렸어요 헤어진건 아닌것같고 그냥 서로 바빠서 그런거아닐까여...',
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
                        id: 26,
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
        date: '10월 18일',
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
                tint: 2,
                time: '4일',
                text: '우리얼른축제하자',
                likes: 0,
                isLiked: false,
            },
            {
                id: 1,
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
        caption: '무대 끝 와주셔서 감사합니다 ステージの端まで来てくださってありがとうございます 🕺🏻',
        date: '10월 16일',
        previewComments: [
            { id: 201, user: SEONGCHAN, tint: 2, text: '역시 타로 형', isLiked: false },
            { id: 202, user: WONBIN, tint: 2, text: '이제 축제준비해요', isLiked: false },
        ],
        commentList: [
            {
                id: 1,
                user: SEONGCHAN,
                tint: 2,
                time: '6일',
                text: '역시 타로 형',
                likes: 32,
                isLiked: false,
            },
            {
                id: 2,
                user: WONBIN,
                tint: 3,
                time: '6일',
                text: '이제 축제준비해요',
                likes: 0,
                isLiked: false
            },
            {
                id: 3,
                user: 'offgridlog',
                tint: 2,
                time: '6일',
                text: '고생했습니다~~',
                likes: 0,
                isLiked: false,
            },
            {
                id: 4,
                user: 'rawnotes',
                tint: 2,
                time: '6일',
                text: '3번째 사진뭔데',
                likes: 0,
                isLiked: false,
            },
            {
                id: 5,
                user: SOHEE,
                tint: 2,
                time: '6일',
                text: '안녕하세요, 인스타매거진에서 나왔습니다. 쇼타로 씨, DM 한 번만 확인 부탁드려요~',
                likes: 402,
                isLiked: false,
            },
        ],
    },
        {
        id: 4,
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
        date: '10월 12일',
        previewComments: [
            { id: 201, user: WONBIN, tint: 2, text: '아 송디다스 뭔데요', isLiked: false },
            { id: 202, user: SOHEE, tint: 2, text: '아디다스가 선택한 남자 ㄷㄷ', isLiked: false },
        ],
        commentList: [
            {
                id: 1,
                user: WONBIN,
                tint: 2,
                time: '10일',
                text: '아 송디다스 뭔데요',
                likes: 0,
                isLiked: false,
            },
            {
                id: 2,
                user: SOHEE,
                tint: 3,
                time: '10일',
                text: '아디다스가 선택한 남자 ㄷㄷ',
                likes: 0,
                isLiked: false
            },
            {
                id: 3,
                user: 'deardays_',
                tint: 3,
                time: '10일',
                text: '흐린눈하고 보면 협찬임',
                likes: 0,
                isLiked: false,
            },
            {
                id: 4,
                user: SOHEE,
                tint: 2,
                time: '10일',
                text: '뭐임 협찬 아니에요?',
                likes: 0,
                isLiked: false,
                replies: [
                    {
                        id: 21,
                        user: SHOTARO,
                        tint: 3,
                        time: '10일',
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
                time: '10일',
                text: '와 은석이 많이 컸네 아디다스도 입고',
                likes: 0,
                isLiked: false,
            },
        ],
    },
    {
        id: 5,
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
        date: '10월 4일',
        previewComments: [
            { id: 201, user: 'offSec', tint: 3, text: '쇼타로미만잡', isLiked: false },
            { id: 202, user: 'yaya_jamkkan', tint: 3, text: '누군가가 춤에대한 자부심을 가질때 쇼타로를 보여줘라', isLiked: false },
        ],
        commentList: [
            {
                id: 1,
                user: 'offSec',
                tint: 3,
                time: '18일',
                text: '쇼타로미만잡',
                likes: 0,
                isLiked: false,
            },
            {
                id: 2,
                user: 'yaya_jamkkan',
                tint: 3,
                time: '18일',
                text: '누군가가 춤에대한 자부심을 가질때 쇼타로를 보여줘라',
                likes: 0,
                isLiked: false
            },
            {
                id: 3,
                user: WONBIN,
                tint: 3,
                time: '18일',
                text: '이번 공연 스포?',
                likes: 0,
                isLiked: false,
            },
            {
                id: 4,
                user: EUNSEOK,
                tint: 2,
                time: '18일',
                text: '진짜 올타임 레전드',
                likes: 0,
                isLiked: false,
                replies: [
                    {
                        id: 21,
                        user: SOHEE,
                        tint: 3,
                        time: '10일',
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
                time: '18일',
                text: '와 밥 안 먹어도 배부름',
                likes: 0,
                isLiked: false,
            },
        ],
    },
        {
        id: 6,
        user: ANTON,
        likedBy: { name: SHOTARO, tints: [ANTON, WONBIN, SOHEE] },
        src:getInstagramProfileSrc(ANTON),
        music:'Tom Misch, Jordan Rakei - Wake Up This Day',
        commentCount: 7892,
        ratio: 0.8,
        slides: [
            { kind: 'photo', src: '/instagram/ton1.jpg' },
            { kind: 'photo', src: '/instagram/ton2.jpg' },
            { kind: 'photo', src: '/instagram/ton3.jpg' },
            { kind: 'photo', src: '/instagram/ton4.jpg' },
        ],
        likes: '14.3만',
        caption: '🥖🥖🥖',
        date: '9월 25일',
        previewComments: [
            { id: 201, user: SEONGCHAN, tint: 3, text: '바게트 진짜 좋아하네 보고 싶어ㅓ 사랑해', isLiked: false },
            { id: 202, user: SOHEE, tint: 3, text: '댓글에서 단내 대박 ㅋㅋ', isLiked: false },
        ],
        commentList: [
            {
                id: 1,
                user: SEONGCHAN,
                tint: 3,
                time: '한 달 전',
                text: '바게트 진짜 좋아하네 보고 싶어ㅓ 사랑해',
                likes: 9821,
                isLiked: false,
                replies: [
                    {
                        id: 21,
                        user: 'okayByeNow',
                        tint: 3,
                        time: '한 달 전',
                        text: '@' + SEONGCHAN + ' 아ㅏㅏ내게이들연애전선이상무래 ㅠㅠ',
                        likes: 932,
                        isLiked: false,
                        isAuthor: false,
                    },
                    {
                        id: 22,
                        user: 'over_think_',
                        tint: 3,
                        time: '한 달 전',
                        text: '@' + SEONGCHAN + ' 성찬님께서 바게트 많이 사주셔야 할 듯',
                        likes: 591,
                        isLiked: false,
                        isAuthor: false,
                    },
                    {
                        id: 23,
                        user: 'nextPage_',
                        tint: 3,
                        time: '한 달 전',
                        text: '@' + SEONGCHAN + ' 아 누굴 부러워해야하느지 감도 안온다',
                        likes: 322,
                        isLiked: false,
                        isAuthor: false,
                    },
                    {
                        id: 24,
                        user: 'neonShadows',
                        tint: 3,
                        time: '한 달 전',
                        text: '@' + SEONGCHAN + ' 와 아직도 사랑을 한다고?',
                        likes: 183,
                        isLiked: false,
                        isAuthor: false,
                    },
                    {
                        id: 21,
                        user: 'mondaHateClub',
                        tint: 3,
                        time: '한 달 전',
                        text: '@' + SEONGCHAN + ' 이런사랑아니면 난사랑모른다...',
                        likes: 302,
                        isLiked: false,
                        isAuthor: false,
                    },
                    {
                        id: 22,
                        user: 'already_done_',
                        tint: 3,
                        time: '22시간 전',
                        text: '@' + SEONGCHAN + ' 분명 이랬었는데...',
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
                time: '한 달 전',
                text: '댓글에서 단내 대박 ㅋㅋ',
                likes: 8920,
                isLiked: false
            },
            {
                id: 3,
                user: SHOTARO,
                tint: 3,
                time: '한 달 전',
                text: '앤톤 한국 언제 와? ㅠㅠ 성찬이 계속 너 노래 불러',
                likes: 6323,
                isLiked: false,
                replies: [
                    {
                        id: 21,
                        user: ANTON,
                        tint: 3,
                        time: '한 달 전',
                        text: '@' + EUNSEOK + ' ㅋㅋ 다음 달은 어렵고 12월에는 무조건 가용',
                        likes: 8231,
                        isLiked: false,
                        isAuthor: true,
                    },
                    {
                        id: 22,
                        user: 'brainnotfound',
                        tint: 3,
                        time: '21시간 전',
                        text: '@' + SHOTARO + ' 12월에 올것같다고 했는데 오늘 비행기 타는거 진짜 남자친구 붙잡으러 가는것 같음 킹리적 의심',
                        likes: 2003,
                        isLiked: false,
                        isAuthor: false,
                    },
            ]
            },
            {
                id: 4,
                user: EUNSEOK,
                tint: 2,
                time: '한 달 전',
                text: '찬영아 행복하냐 금메달도 따고 지금',
                likes: 0,
                isLiked: false,
            },
            {
                id: 5,
                user: 'yeah_maybe',
                tint: 3,
                time: '한 달 전',
                text: '아진짜너무잘생겼다...',
                likes: 0,
                isLiked: false,
            },
        ],
    },
            {
        id: 7,
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
        date: '9월 17일',
        previewComments: [
            { id: 201, user: ANTON, tint: 3, text: '성찬이형 오늘 옷 잘 어울리는데요 😍 ', isLiked: false },
            { id: 202, user: EUNSEOK, tint: 3, text: '언제 또 해외 나갔냐', isLiked: false },
        ],
        commentList: [
            {
                id: 1,
                user: ANTON,
                tint: 3,
                time: '한 달 전',
                text: '성찬이형 오늘 옷 잘 어울리는데요 😍',
                likes: 28,
                isLiked: false,
                replies: [
                    {
                        id: 21,
                        user: SEONGCHAN,
                        tint: 3,
                        time: '한 달 전',
                        text: '@' + ANTON + ' 앤토니랑 제일 잘 어울림 ㅎㅎ',
                        likes: 12,
                        isLiked: false,
                        isAuthor: true,
                    },
                    {
                        id: 22,
                        user: SOHEE,
                        tint: 3,
                        time: '한 달 전',
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
                time: '한 달 전',
                text: '언제 또 해외 나갔냐',
                likes: 0,
                isLiked: false
            },
            {
                id: 3,
                user: SHOTARO,
                tint: 3,
                time: '한 달 전',
                text: '성찬 잘생겼는데~',
                likes: 0,
                isLiked: false,
            },
        ],
    },
      {
        id: 8,
        user: SOHEE,
        src:getInstagramProfileSrc(SOHEE),
        commentCount: 2392,
        ratio: 1.14,
        slides: [
            { kind: 'video', src: '/instagram/soheesSpiderMan.mp4' },
        ],
        likes: '1.8만',
        likedBy: { name: 'bbinniy', tints: [ANTON, SEONGCHAN, WONBIN] },
        caption: '스파이더맨 막차 탑니다~~~',
        hashtags: ['#스파이더맨', ' #톰홀랜드'],
        date: '9월 12일',
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
                time: '4주',
                text: '꼬마 스파이더맨 나가신다 ㄷㄷ',
                likes: 4084,   
                isLiked: false,
                isLikedByAuthor: true,
            },
            {
                id: 2,
                user: EUNSEOK,
                tint: 3,
                time: '4주',
                text: '오... 역시 인플루언서',
                likes: 203,
                isLiked: false,
                isLikedByAuthor: true,
            },
            {
                id: 3,
                user: WONBIN,
                tint: 3,
                time: '4주',
                text: '아 이소희 같이 찍자니까ㅏ아ㅏㅏ',
                likes: 24,
                isLiked: false,
                isLikedByAuthor: true,
            },
            {
                id: 4,
                user: 'idoidosoido',
                tint: 3,
                time: '4주',
                text: '귀여움으로세상구하실것같음',
                likes: 26,
                isLiked: false,
                isLikedByAuthor: true,
            },
            {
                id: 5,
                user: 'naranlady',
                tint: 3,
                time: '4주',
                text: '이상하다나위험에빠졌는데왜안오시지?',
                likes: 93,
                isLiked: false,
                isLikedByAuthor: true,
            },
        ],
    },
    {
        id: 9,
        user: SEONGCHAN,
        tint: 0,
        src: getInstagramProfileSrc(SEONGCHAN),
        ratio: 0.8,
        slides: [{ kind: 'video', src: '/instagram/chanton.mp4' }],
        likes: '11.2만',
        likedBy: { name: 'bbinniy', tints: [ANTON, SEONGCHAN, WONBIN] },
        caption: '앤토나ㅏ',
        date: '2026.03.22',
        commentList: [],
    },
    {
        id: 10,
        user: SEONGCHAN,
        tint: 0,
        src: getInstagramProfileSrc(SEONGCHAN),
        ratio: 0.8,
        slides: [{ kind: 'photo', bg: 'linear-gradient(180deg,#efe6dc 0%,#c9d4b5 55%,#5d5f4a 100%)' }],
        likes: '0',
        caption: '',
        date: '',
        commentList: [],
    },
    {
        id: 11,
        user: SEONGCHAN,
        tint: 0,
        src: getInstagramProfileSrc(SEONGCHAN),
        ratio: 0.8,
        slides: [{ kind: 'photo', bg: 'linear-gradient(160deg,#d6b27a,#b0522e)' }],
        likes: '0',
        caption: '',
        date: '',
        commentList: [],
    },
];