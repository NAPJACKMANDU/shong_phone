/* ===================== 메시지 데이터 (목록 + 대화방 공용) =====================
   - 대화방 안의 메시지는 THREADS 의 items 에서 가져와요.
   - 메시지 목록의 미리보기는 '마지막 말풍선' 글자에서 자동으로 만들어요.
   - 글자 안에서 쓸 수 있는 표시:  **굵게**   __밑줄__   (http 로 시작하면 자동으로 링크 모양)  */

export type BubbleColor = 'sms' | 'imsg' | 'green' | 'gray'

export type ChatItem =
    // 가운데 안내 글 (service 이름 등). stamp 를 넣으면 날짜 줄이 바로 아래에 붙어요. lock 을 넣으면 자물쇠 줄이 붙어요.
    | { kind: 'caption'; lines: string[]; lock?: string; stamp?: { day: string; time: string } }
    // 날짜 / 시간 줄
    | { kind: 'stamp'; day: string; time: string }
    // 말풍선. newGroup: 바로 위 말풍선과 같은 사람이어도 새 묶음으로 시작 (꼬리가 생겨요)
    | { kind: 'bubble'; from: 'me' | 'other'; text: string; color?: BubbleColor; newGroup?: boolean; narrow?: boolean; breakAll?: boolean }
    // 읽음 표시
    | { kind: 'receipt'; text: string }

export interface Thread {
    id: number
    name: string          // 메시지 목록에 보이는 이름 (대화방 상단에도 똑같이 나와요)
    letter?: string       // 있으면 이름 첫 글자 프로필, 없으면 기본 프로필
    time: string          // 메시지 목록 오른쪽 시간
    unreadCount: number   // 안 읽은 메시지 수 (0이면 파란 점 없음)
    meColor: 'sms' | 'imsg' // 내가 보낸 말풍선 기본 색
    items: ChatItem[]
}

// 대화방 왼쪽 위 숫자 = 전체 안 읽음 수 - (이 대화방의 안 읽음 수)
export const UNREAD_TOTAL = 127

export const THREADS: Thread[] = [
    {
        id: 1, name: '+82 1544-7199', time: '오후 7:14', unreadCount: 1, meColor: 'sms',
        items: [
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '오늘', time: '오후 7:14' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\n(광고)[무신사] 지금 필요한 플리스 & 부츠 할인 소식을 확인해 보세요!\n▶ 지금 바로 보러가기' },
        ],
    },
    {
        id: 2, name: '엄망이', letter: '엄', time: '어제', unreadCount: 0, meColor: 'imsg',
        items: [
            { kind: 'caption', lines: ['iMessage'], lock: '암호화됨' },
            { kind: 'stamp', day: '어제', time: '오후 8:12' },
            { kind: 'bubble', from: 'me', text: '엄마 나 오늘 좀 늦을 것 같아' },
            { kind: 'bubble', from: 'other', text: '알겠어~ 밥은 먹었어?' },
            { kind: 'bubble', from: 'me', text: '응 먹었어!' },
            { kind: 'bubble', from: 'other', text: '웅!!!' },
        ],
    },
    {
        id: 3, name: '+82 1588-1600', time: '어제', unreadCount: 1, meColor: 'sms',
        items: [
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '어제', time: '오전 10:05' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\n(광고)NH농협은행(1661-3000)  [★NH펀드케어★ 출시] 내 펀드를 한눈에 관리하세요. 지금 가입하고 이벤트에 참여해 보세요.' },
        ],
    },
    {
        id: 4, name: '+82 10-1234-5678', time: '어제', unreadCount: 1, meColor: 'sms',
        items: [
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '어제', time: '오후 2:41' } },
            { kind: 'bubble', from: 'other', text: '[Web발신][CJ대한통운_배송완료]' },
        ],
    },
    {
        id: 5, name: '+82 2-6990-9815', time: '월요일', unreadCount: 0, meColor: 'sms',
        items: [
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '월요일', time: '오후 4:20' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\n[CJ올리브영 서류전형 결과발표] 안녕하세요, 지원해 주셔서 감사합니다. 서류전형 결과를 안내드립니다.' },
        ],
    },
    {
        id: 6, name: '+82 1644-3702', time: '월요일', unreadCount: 1, meColor: 'sms',
        items: [
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '월요일', time: '오후 1:03' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\nBAND 로그인 인증번호:__000000__ 타인에게 알려주지 마세요.' },
        ],
    },
    {
        id: 7, name: '+82 2-6956-3713', time: '월요일', unreadCount: 1, meColor: 'sms',
        items: [
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '월요일', time: '오전 9:47' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\n[메리츠증권] 본인확인 인증번호 [__000000__]' },
        ],
    },
    {
        id: 8, name: '아빠', time: '토요일', unreadCount: 1, meColor: 'imsg',
        items: [
            { kind: 'caption', lines: ['iMessage'], lock: '암호화됨' },
            { kind: 'stamp', day: '토요일', time: '오후 6:40' },
            { kind: 'bubble', from: 'other', text: '저녁 먹었니?' },
            { kind: 'bubble', from: 'me', text: '응 아빠는?' },
            { kind: 'bubble', from: 'other', text: 'ㅋㅋㅋㅋㅋ' },
        ],
    },
    {
        id: 9, name: '+82 1544-1555', time: '토요일', unreadCount: 0, meColor: 'sms',
        items: [
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '토요일', time: '오전 11:30' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\n[안내] 서비스 이용 안내' },
        ],
    },
    {
        id: 10, name: '서정호 오빠', time: '2026. 10. 8.', unreadCount: 0, meColor: 'sms',
        items: [
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '8월 9일 (일)', time: '오후 9:15' } },
            { kind: 'bubble', from: 'other', text: 'ㅇㅋㅇㅋ' },
            { kind: 'bubble', from: 'me', text: '웅완선' },
            { kind: 'bubble', from: 'other', text: '그럼 이따 봐' },
            { kind: 'bubble', from: 'me', text: '오케잉' },
            { kind: 'bubble', from: 'me', text: '이차오빠임???', newGroup: true },
            { kind: 'bubble', from: 'me', text: 'ㅋㅅㅋㅅㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱㅋㄱ', breakAll: true },
            { kind: 'caption', lines: ['문자 메시지 • SMS', '암호화되지 않음'] },
            { kind: 'stamp', day: '8월 10일 (월)', time: '오후 12:32' },
            { kind: 'bubble', from: 'other', text: '  ★ 매너콜 ★\n[통화중] 상황에서 고객님께 걸려온 전화입니다.\n08/10 __오후 12:32__', narrow: true },
            { kind: 'stamp', day: '10월 8일 (목)', time: '오후 5:43' },
            { kind: 'bubble', from: 'me', text: '나 사무실들어옴!! ㅠ', color: 'green' },
            { kind: 'caption', lines: ['iMessage'], lock: '암호화됨' },
            { kind: 'bubble', from: 'other', text: '아 오키오키' },
            { kind: 'bubble', from: 'other', text: '모이는 시간 __8시__??' },
            { kind: 'bubble', from: 'other', text: '몇시인지 알려주면 가서 웨이팅 하고 있을게' },
            { kind: 'bubble', from: 'me', text: '__7시40분__!!', color: 'imsg' },
            { kind: 'receipt', text: '읽음: 2026. 10. 8.' },
            { kind: 'bubble', from: 'other', text: '오키오키!!' },
        ],
    },
    {
        id: 11, name: '+82 1588-7882', time: '2025. 10. 31.', unreadCount: 3, meColor: 'sms',
        items: [
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '2025년 10월 24일', time: '오후 8:37' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\n모니모 인증번호 [__000000__]를 입력해주세요' },
            { kind: 'stamp', day: '2025년 10월 31일', time: '오후 3:30' },
            {
                kind: 'bubble', from: 'other',
                text: [
                    '**(광고)[monimo]**',
                    '[Web발신]',
                    '(광고) [monimo] 이 메시지를 받았다면 혜택 대상! 내맘대로 선택하는 상품권',
                    '',
                    '남*서 고객님, 모니모에서 내 자산 연결하면 직접 고를 수 있는 모바일상품권 5,000원권을 드려요. 이번 기회에 자산도 간편하게 관리하고, 혜택도 꼭 챙겨보세요!',
                    '',
                    '■ 혜택',
                    '아래 모바일상품권 중 택 1(1인 1회)',
                    '- 신세계상품권 5,000원',
                    '- CU 5,000원',
                    '- GS25 5,000원',
                    '- 세븐일레븐 5,000원',
                    '- 현대오일뱅크 5,000원',
                    '- GS칼텍스 5,000원',
                    '※ 혜택 선택 지급 관련해서는 혜택제공 LMS 별도 안내 예정',
                    '',
                    '■ 참여방법',
                    'STEP1. 아래 링크 누르기',
                    'http://q.monimo.com/monimoassetevent',
                    'STEP2. "이벤트 참여하기" 눌러 약관 동의',
                    'STEP3. 내 자산 1개 이상 연결',
                    '',
                    '■ 행사기간',
                    '2025.10.31(금) ~ 2025.11.20(목)',
                    '',
                    '■ 혜택제공',
                    '2025.11.30(일) 모니모에 등록된 휴대폰번호로 발송 예정',
                ].join('\n'),
            },
        ],
    },
]

/* ===================== 도우미 ===================== */
export const getThread = (id: number): Thread =>
    THREADS.find((t) => t.id === id) ?? THREADS[0]

// 표시용 글자 표시(**, __)를 지운 글자
export const stripMarks = (text: string) =>
    text.replace(/\*\*(.+?)\*\*/g, '$1').replace(/__(.+?)__/g, '$1')

// 메시지 목록 미리보기 = 마지막 말풍선 글자
export const lastMessageText = (thread: Thread): string => {
    for (let i = thread.items.length - 1; i >= 0; i--) {
        const it = thread.items[i]
        if (it.kind === 'bubble') return stripMarks(it.text).replace(/^\s+/, '')
    }
    return ''
}