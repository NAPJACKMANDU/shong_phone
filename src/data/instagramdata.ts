/* ===================== 인스타그램 데이터 ===================== */

import { ANTON, getInstagramProfileSrc, SEONGCHAN, SHOTARO, SOHEE, WONBIN } from "./instagramfeeddata"

// 라우터 경로 (프로젝트 라우터에 맞게 수정하세요)
export const IG_PATH = {
    home: '/instagramhome',
    search: '/instagramsearch',
    profile: '/instagramprofile',
    story: '/instagramstory',   // 사용: /instagramStory?user=아이디
}

const IG_SEEN_STORIES_KEY = 'instagram-seen-stories'

export const getSeenStoryUserIds = () =>
    new Set((localStorage.getItem(IG_SEEN_STORIES_KEY) ?? '').split(',').filter(Boolean))

export const markStoryUserSeen = (userId: string) => {
    const seenUserIds = getSeenStoryUserIds()
    seenUserIds.add(userId)
    localStorage.setItem(IG_SEEN_STORIES_KEY, Array.from(seenUserIds).join(','))
}

/* ----- 스토리 ----- */
export interface StoryItem {
    id: number
    kind: 'calls' | 'card'      // calls: 통화 기록 화면, card: 글자 카드
    bg: string                  // card 일 때 배경
    text?: string               // card 일 때 가운데 글자
    src?:string
}

export interface IgUser {
    id: string                  // 사용자 이름 (@ 뒤)
    tint: number                // 기본 프로필 색 번호 (0~4)
    time: string                // 스토리 올린 시간
    stories: StoryItem[]        // 비어 있으면 스토리 없음 (내 스토리: + 버튼)
    src?:string
}

export const IG_USERS: IgUser[] = [
    { id: '내 스토리', tint: 0, time: '', stories: [],  src:getInstagramProfileSrc(SEONGCHAN)},
    {
        id: WONBIN, tint: 1, time: '2시간', src:getInstagramProfileSrc(WONBIN),
        stories: [
            { id: 1, kind: 'card', bg: 'linear-gradient(160deg,#243b55,#141e30)', text: '퇴근 완료' },
            { id: 2, kind: 'card', bg: 'linear-gradient(160deg,#614385,#516395)', text: '오늘 하루도 수고했어' },
        ],
    },
    {
        id: ANTON, tint: 2, time: '5시간',  src:getInstagramProfileSrc(ANTON),
        stories: [
            { id: 1, kind: 'card', bg: 'linear-gradient(160deg,#134e5e,#71b280)', text: '산책하기 좋은 날씨' },
            { id: 2, kind: 'card', bg: 'linear-gradient(160deg,#b24592,#f15f79)', text: '저녁은 만두' },
        ],
    },
    {
        id: SOHEE, tint: 3, time: '6시간', src:getInstagramProfileSrc(SOHEE),
        stories: [
            { id: 1, kind: 'card', bg: 'linear-gradient(160deg,#1f4037,#99f2c8)', text: '주말 계획 짜는 중' },
        ],
    },
    {
        id: SHOTARO, tint: 4, time: '7시간', src:getInstagramProfileSrc(SHOTARO),
        stories: [
            { id: 1, kind: 'calls', bg: '#101010' },
            { id: 2, kind: 'card', bg: 'linear-gradient(160deg,#232526,#414345)', text: '다음 스토리' },
        ],
    },
]

// 스토리가 있는 사람만 (스토리 화면에서 옆으로 넘어갈 순서)
export const STORY_USERS = IG_USERS.filter((u) => u.stories.length > 0)

/* ----- 기본 프로필 색 (위, 아래) ----- */
export const AVATAR_TINTS: [string, string][] = [
    ['#d9d5fc', '#b3aef0'],
    ['#f7c6a8', '#e08f6a'],
    ['#b9d9f2', '#7fb0dc'],
    ['#cfcfd4', '#a0a0a8'],
    ['#4a4048', '#241e24'],
]

/* ----- 검색 기록 ----- */
export interface SearchItem {
    id: number
    kind: 'term' | 'user'       // term: 시계 아이콘 (검색어), user: 프로필 사진
    name: string
    sub?: string
    tint?: number
}

export const SEARCH_HISTORY: SearchItem[] = [
    { id: 1, kind: 'user', name: 'Antonyeeton', sub: '앤톤 찬영 리 • bbinniy님 외 3명이 팔로우합니다', tint: 1 },
    { id: 2, kind: 'term', name: '앤톤'},
    { id: 3, kind: 'term', name: '수영팀' },
]

/* ----- 프로필 게시물 (사진이 없으면 색으로 보여요. src 에 주소를 넣으면 사진) ----- */
export interface GridPost {
    id: number
    feedPostId: number
    kind?: 'photo' | 'video'
    src?: string
    bg?: string
    multi?: boolean             // 여러 장 아이콘
}

export const GRID_POSTS: GridPost[] = [
    { id: 1, feedPostId: 7, multi: true, src: '/instagram/chan1.jpg' },
    { id: 2, feedPostId: 9, kind: 'video', src: '/instagram/chanton.mp4' },
    { id: 3, feedPostId: 10, multi: true, bg: 'linear-gradient(180deg,#efe6dc 0%,#c9d4b5 55%,#5d5f4a 100%)' },
    { id: 4, feedPostId: 11, bg: 'linear-gradient(160deg,#d6b27a,#b0522e)' },
]