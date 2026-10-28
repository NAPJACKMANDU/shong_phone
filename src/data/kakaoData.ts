import type { ProfileColor } from '../common/kakaoCommon'
import { APP_TODAY } from '../common/appDate'
import kakaoBank from '../img/kakaobank.png'
import shotaro from '../img/shotaro.png'
import wonbin from '../img/wonbin.png'
import sohee from '../img/sohee.png'

export interface KakaoPerson {
    id: string
    name: string
    createdAt?: number
    avatarUrl?: string
    color: ProfileColor
    isMe?: boolean
}

export interface KakaoChat {
    id: string
    title: string
    memberIds: string[]
    isGroup: boolean
    message: string
    time: string
    unread?: number
    twoLine?: boolean
    meBadge?: boolean
}

export const KAKAO_PEOPLE: KakaoPerson[] = [
    { id: 'friend-1', name: '형', createdAt: 1, color: 'teal' },
    { id: 'friend-2', name: '엄마', createdAt: 2, color: 'blue' },
    { id: 'friend-3', name: '아빠', createdAt: 3, color: 'purple' },
    { id: 'friend-4', name: '동아리 회장 형', createdAt: 4, color: 'teal' },
    { id: 'cyMom', name: '찬영이 어머님', createdAt: 5, color: 'blue' },
    { id: 'cydad', name: '찬영이 아버님', createdAt: 6, color: 'purple' },
    { id: 'cyfriend', name: '찬영이 친구 장혁준', createdAt: 7, color: 'teal' },
    { id: 'cyboy', name: '찬영이 동생 준영이', createdAt: 8, color: 'blue' },
    { id: 'friend-9', name: '이나린', createdAt: 9, color: 'purple' },
    { id: 'friend-10', name: '강효준', createdAt: 10, color: 'teal' },
    { id: 'friend-11', name: '고은규', createdAt: 11, color: 'blue' },
    { id: 'friend-12', name: '한정호', createdAt: 12, color: 'purple' },
    { id: 'friend-13', name: '김유진', createdAt: 13, color: 'teal' },
    { id: 'friend-14', name: '심지은', createdAt: 14, color: 'blue' },
    { id: 'friend-15', name: '체교과 학회장', createdAt: 15, color: 'purple' },
    { id: 'friend-16', name: '4학년 최병헌 선배', createdAt: 16, color: 'teal' },
    { id: 'shotaro', name: '쇼타로 형', createdAt: 17, avatarUrl: shotaro, color: 'purple' },
    { id: 'wonbin', name: '박원빈', createdAt: 18, avatarUrl: wonbin, color: 'blue' },
    { id: 'sohee', name: '이소희', createdAt: 19, avatarUrl: sohee, color: 'teal' },
    { id: 'eunseok', name: '송은석', createdAt: 20, color: 'blue' },
    { id: 'friend-21', name: '김민수', createdAt: 21, color: 'purple' },
    { id: 'friend-22', name: '이서준', createdAt: 22, color: 'teal' },
    { id: 'friend-23', name: '박지호', createdAt: 23, color: 'blue' },
    { id: 'friend-24', name: '정예린', createdAt: 24, color: 'purple' },
    { id: 'friend-25', name: '오지민', createdAt: 25, color: 'teal' },
    { id: 'friend-26', name: '한지우', createdAt: 26, color: 'blue' },
    { id: 'friend-27', name: '윤서연', createdAt: 27, color: 'purple' },
    { id: 'friend-28', name: '김도현', createdAt: 28, color: 'teal' },
    { id: 'friend-29', name: '이하은', createdAt: 29, color: 'blue' },
    { id: 'friend-30', name: '박서준', createdAt: 30, color: 'purple' },
    { id: 'friend-31', name: '정우진', createdAt: 31, color: 'teal' },
    { id: 'friend-32', name: '강민서', createdAt: 32, color: 'blue' },
    { id: 'friend-33', name: '조유진', createdAt: 33, color: 'purple' },
    { id: 'friend-34', name: '윤도현', createdAt: 34, color: 'teal' },
    { id: 'friend-35', name: '장서윤', createdAt: 35, color: 'blue' },
    { id: 'friend-36', name: '임지호', createdAt: 36, color: 'purple' },
    { id: 'friend-37', name: '한서준', createdAt: 37, color: 'teal' },
    { id: 'friend-38', name: '오예은', createdAt: 38, color: 'blue' },
    { id: 'friend-39', name: '신민우', createdAt: 39, color: 'purple' },
    { id: 'friend-40', name: '권서현', createdAt: 40, color: 'teal' },
    { id: 'friend-41', name: '황지우', createdAt: 41, color: 'blue' },
    { id: 'friend-42', name: '송민서', createdAt: 42, color: 'purple' },
    { id: 'friend-43', name: '전우진', createdAt: 43, color: 'teal' },
    { id: 'friend-44', name: '홍서연', createdAt: 44, color: 'blue' },
    { id: 'friend-45', name: '배지호', createdAt: 45, color: 'purple' },
    { id: 'friend-46', name: '손지우', createdAt: 46, color: 'teal' },
    { id: 'friend-47', name: '서도현', createdAt: 47, color: 'blue' },
    { id: 'friend-48', name: '조하은', createdAt: 48, color: 'purple' },
    { id: 'friend-49', name: '백승현', createdAt: 49, color: 'teal' },
    { id: 'friend-50', name: '허유진', createdAt: 50, color: 'blue' },
    { id: 'antony', name: '앤토니', color: 'purple' },
    { id: 'self', name: '정성찬', color: 'purple', isMe: true },
    { id: 'kakao-bank', name: '카카오뱅크', avatarUrl: kakaoBank, color: 'blue' },
    { id: 'lg-uplus', name: 'LG유플러스 고객 불편여부 정기점검', color: 'teal' },
    { id: 'football-guest-1', name: '김민재', color: 'purple' },
    { id: 'football-guest-2', name: '이준호', color: 'blue' },
    { id: 'football-guest-3', name: '박성우', color: 'teal' },
    { id: 'football-guest-4', name: '최현우', color: 'purple' },
    { id: 'football-guest-5', name: '정우성', color: 'blue' },
    { id: 'football-guest-6', name: '윤태민', color: 'teal' },
    { id: 'football-guest-7', name: '장민석', color: 'purple' },
    { id: 'football-guest-8', name: '강지훈', color: 'blue' },
    { id: 'football-guest-9', name: '오승현', color: 'teal' },
    { id: 'football-guest-10', name: '임도윤', color: 'purple' },
    { id: 'football-guest-11', name: '조현준', color: 'blue' },
    { id: 'football-guest-12', name: '한승우', color: 'teal' },
    { id: 'football-guest-13', name: '신재현', color: 'purple' },
    { id: 'football-guest-14', name: '문성훈', color: 'blue' },
    { id: 'football-guest-15', name: '백승민', color: 'teal' },
    { id: 'football-guest-16', name: '유건우', color: 'purple' },
    { id: 'football-guest-17', name: '서준혁', color: 'blue' },
    { id: 'football-guest-18', name: '남기훈', color: 'teal' },
    { id: 'football-guest-19', name: '배준영', color: 'purple' },
    { id: 'football-guest-20', name: '홍정민', color: 'blue' },
    { id: 'project-guest-1', name: '김수현', color: 'teal' },
    { id: 'project-guest-2', name: '박지민', color: 'purple' },
    { id: 'project-guest-3', name: '이도현', color: 'blue' },
    { id: 'project-guest-4', name: '최서연', color: 'teal' },
]

export const KAKAO_FRIENDS = KAKAO_PEOPLE.filter(
    (person): person is KakaoPerson & { createdAt: number } => person.createdAt !== undefined,
)

const FOOTBALL_MEMBERS = [
    'friend-4', 'friend-10', 'friend-11',
    'football-guest-1', 'football-guest-2', 'football-guest-3', 'football-guest-4',
    'football-guest-5', 'football-guest-6', 'football-guest-7', 'football-guest-8',
    'football-guest-9', 'football-guest-10', 'football-guest-11', 'football-guest-12',
    'football-guest-13', 'football-guest-14', 'football-guest-15', 'football-guest-16',
    'football-guest-17', 'football-guest-18', 'football-guest-19', 'football-guest-20',
]

export const KAKAO_CHATS: KakaoChat[] = [
    {
        id: 'antony',
        title: '앤토니',
        memberIds: ['antony'],
        isGroup: false,
        message: '형 저 한국 가요.. :) 3주년때 한국 가서 형이랑 놀겠다고 한 약속 형이 기억할지는 모르겠지만...',
        twoLine: true,
        time: '오전 12:01',
        unread: 1,
    },
    {
        id: 'eunseok',
        title: '송은석',
        memberIds: ['eunseok'],
        isGroup: false,
        message: '좋아하면 걍 다시 만나 나라면 그럴 듯',
        time: '어제',
        unread: 1,
    },
    {
        id: 'football-club',
        title: '강남구 축구 동아리',
        memberIds: FOOTBALL_MEMBERS,
        isGroup: true,
        message: '다들 내일 시간 되십니까?',
        time: '어제',
    },
    {
        id: 'shotaro-group',
        title: '쇼타로 형, 송은석, 박원빈, 이소희',
        memberIds: ['shotaro', 'eunseok', 'wonbin', 'sohee', 'self'],
        isGroup: true,
        message: '성찬이형 찬영이 비행기 탔대요',
        time: '어제',
        unread: 6,
    },
    {
        id: 'self-chat',
        title: '정성찬',
        memberIds: ['self'],
        isGroup: false,
        message: '조별과제 더블데이트 9월 19일 일요일',
        time: '어제',
        meBadge: true,
    },
    {
        id: 'love-war',
        title: '사랑과전쟁 조별과제',
        memberIds: ['self', 'friend-4', 'project-guest-1', 'project-guest-2', 'project-guest-3', 'project-guest-4'],
        isGroup: true,
        message: '그럼 그렇게 알고 있겠습니다 ㅎㅎ',
        time: '어제',
    },
    {
        id: 'kakao-bank',
        title: '카카오뱅크',
        memberIds: ['kakao-bank'],
        isGroup: false,
        message: '내 카드 사용 패턴과 신용 현황을 분석해드렸어요. 지금 바로 확인해보세요. …',
        twoLine: true,
        time: '어제',
    },
    {
        id: 'lg-uplus',
        title: 'LG유플러스 고객 불편여부 정기점검',
        memberIds: ['lg-uplus'],
        isGroup: false,
        message: '안녕하세요, LG유플러스입니다.',
        time: '어제',
    },
]

const unreadListeners = new Set<() => void>()

export const getKakaoUnreadTotal = (): number =>
    KAKAO_CHATS.reduce((total, chat) => total + (chat.unread ?? 0), 0)

export const getKakaoChatUnread = (chatId: string): number =>
    KAKAO_CHATS.find((chat) => chat.id === chatId)?.unread ?? 0

export const subscribeToKakaoUnread = (listener: () => void): (() => void) => {
    unreadListeners.add(listener)
    return () => unreadListeners.delete(listener)
}

export const markKakaoChatRead = (chatId: string): void => {
    const chat = KAKAO_CHATS.find((entry) => entry.id === chatId)
    if (!chat || !chat.unread) return

    chat.unread = undefined
    unreadListeners.forEach((listener) => listener())
}

export const getKakaoPerson = (id: string): KakaoPerson => {
    const person = KAKAO_PEOPLE.find((entry) => entry.id === id)
    if (!person) {
        throw new Error(`Unknown Kakao person id: ${id}`)
    }
    return person
}

export const getKakaoChat = (id: string | undefined): KakaoChat | undefined =>
    KAKAO_CHATS.find((chat) => chat.id === id)

/* ===================== 실시간 수신 메시지 ===================== */
export interface KakaoLiveMessage {
    id: string
    from: 'other'
    authorId: string
    date: string
    time: string
    text: string
    photo?: boolean
    photoUrl?: string
    tail?: boolean
}

const liveListeners = new Set<() => void>()
const EMPTY_LIVE: KakaoLiveMessage[] = []
let liveMessages: Record<string, KakaoLiveMessage[]> = {}
let activeChatId: string | null = null
let liveSeq = 0

const pad = (n: number) => String(n).padStart(2, '0')
const formatKakaoTime = (d: Date) => {
    const h = d.getHours()
    return `${h < 12 ? '오전' : '오후'} ${h % 12 || 12}:${pad(d.getMinutes())}`
}

export const getKakaoLiveMessages = (chatId: string): KakaoLiveMessage[] =>
    liveMessages[chatId] ?? EMPTY_LIVE

export const subscribeToKakaoLive = (listener: () => void): (() => void) => {
    liveListeners.add(listener)
    return () => liveListeners.delete(listener)
}

/** 채팅방 화면이 열려 있는 동안 해당 방 id를 등록 (나가면 null) */
export const setActiveKakaoChat = (chatId: string | null): void => {
    activeChatId = chatId
}

/** 메시지 수신. 열려 있는 방이 아니면 안읽음 +1 */
export const receiveKakaoMessage = (
    chatId: string,
    text: string,
    options?: { authorId?: string; date?: string; time?: string },
): KakaoLiveMessage | undefined => {
    const chat = KAKAO_CHATS.find((entry) => entry.id === chatId)
    if (!chat) return undefined

    const now = new Date()
    const message: KakaoLiveMessage = {
        id: `live-${++liveSeq}`,
        from: 'other',
        authorId: options?.authorId ?? chat.memberIds.find((id) => id !== 'self') ?? chat.memberIds[0],
        date: options?.date ?? APP_TODAY,
        time: options?.time ?? formatKakaoTime(now),
        text,
    }

    liveMessages = { ...liveMessages, [chatId]: [...getKakaoLiveMessages(chatId), message] }
    if (activeChatId !== chatId) chat.unread = (chat.unread ?? 0) + 1

    liveListeners.forEach((listener) => listener())
    unreadListeners.forEach((listener) => listener())
    return message
}