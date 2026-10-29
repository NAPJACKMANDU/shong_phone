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

const readThreadIds = new Set<number>()
const threadReadListeners = new Set<() => void>()
let threadReadVersion = 0

export const getThreadReadVersion = () => threadReadVersion

export const subscribeToThreadReadStatus = (listener: () => void) => {
    threadReadListeners.add(listener)
    return () => threadReadListeners.delete(listener)
}

export const getThreadUnreadCount = (threadId: number) => {
    const thread = THREADS.find((candidate) => candidate.id === threadId)
    return thread && !readThreadIds.has(thread.id) ? thread.unreadCount : 0
}

// 대화방 왼쪽 위 숫자 = 아직 읽지 않은 모든 대화방의 unreadCount 합계
// (대화방에 들어가면 markThreadAsRead 로 그 방은 빠져요)
export const getUnreadTotal = () =>
    THREADS.reduce(
        (total, thread) => total + (readThreadIds.has(thread.id) ? 0 : thread.unreadCount),
        0,
    )

export const markThreadAsRead = (threadId: number) => {
    const thread = THREADS.find((candidate) => candidate.id === threadId)
    if (!thread || thread.unreadCount === 0 || readThreadIds.has(threadId)) return

    readThreadIds.add(threadId)
    threadReadVersion += 1
    threadReadListeners.forEach((listener) => listener())
}

export const THREADS: Thread[] = [
{
    id: 1, name: '신세계 까르띠에 어드바이저', letter: '신', time: '7월 13일', unreadCount: 1, meColor: 'sms',
    items: [
        { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '7월 13일 화요일', time: '오전 11:14' } },
        { kind: 'bubble', from: 'other', text: '[Cartier] Maison 입고 및 방문 예약 안내\n\n안녕하세요, 정성찬 님.\n까르띠에 신세계백화점 강남 부티크 1:1 담당 클라이언트 어드바이저입니다.\n\n두 분의 영원한 약속을 담아 커스텀 오더해 주신 방돔 루이 링이 부티크 메종에 안전하게 입고되었습니다.\n\n고객님의 소중한 제품 수령과 최상의 프라이빗 케어를 위해 사전 예약(Pre-reservation) 제도를 운영하고 있습니다. 주말 및 공휴일은 부티크 혼잡이 예상되오니, 아래 편하신 방법으로 방문 스케줄을 확정해 주시면 대기 없이 전담 룸으로 안내해 드리겠습니다.\n\n두 분의 인생의 특별한 순간에 까르띠에가 함께할 수 있어 진심으로 영광입니다.\n\n■ 방문 안내 및 수령 준비\n- 방문 일시: 아래 회신 또는 전화로 수령 일시 지정\n- 지참 준비물: 본 안내 메시지 및 본인 확인용 신분증\n- 예약 문의/회신: 010-1234-5678' },
        { kind: 'bubble', from: 'me', text: '안녕하세요, 메시지 감사합니다.\n7월 14일 오후 5시에 수령하러 방문하겠습니다. 2명 방문 예정입니다.\n확인 부탁드립니다.', color: 'green' },
        { kind: 'bubble', from: 'other', text: '정성찬 고객님, 7월 14일 오후 5시 2분 방문 예약 확정되었습니다.\n\n당일 부티크 입구에서 본 메시지를 보여주시면 전담 클라이언트 어드바이저가 VIP 프라이빗 룸으로 안내해 드릴 예정입니다.\n\n소중한 두 분의 방문을 마음 깊이 기다리겠습니다. 감사합니다.' },
    ],
},
{
    id: 2, name: '엄마', letter: '엄', time: '7월 11일', unreadCount: 0, meColor: 'imsg',
    items: [
        { kind: 'caption', lines: ['iMessage'], lock: '암호화됨' },
        { kind: 'stamp', day: '5월 23일 토요일', time: '오후 2:10' },
        { kind: 'bubble', from: 'other', text: '성찬아 곧 찬영이도 해외로 연수 겸 경기 나가니까 너도 이제 너 앞길 개척해 나가야지 26살이면 젊은 나이 아니잖아' },
        { kind: 'bubble', from: 'me', text: '알겠엏ㅎ', color: 'imsg' },
        { kind: 'bubble', from: 'other', text: '말만 항상 알겠다고 하고' },
        { kind: 'bubble', from: 'me', text: '알겠어요~~ ㅎㅎ', color: 'imsg' },
        { kind: 'stamp', day: '6월 1일 월요일', time: '오후 6:15' },
        { kind: 'bubble', from: 'other', text: '찬영이 잘 배웅해 줬어?' },
        { kind: 'bubble', from: 'me', text: '엉 엄마 나 울었다 ㅜㅜ', color: 'imsg' },
        { kind: 'bubble', from: 'me', text: '왜 이렇게 슬푸지', color: 'imsg' },
        { kind: 'bubble', from: 'other', text: '몇 개월 뒤에 온다고 했지?' },
        { kind: 'bubble', from: 'me', text: '6개월...', color: 'imsg' },
        { kind: 'bubble', from: 'other', text: '빨리 오네 엄마 일 때문에 해외 갈 때나 그렇게 슬퍼해라' },
        { kind: 'bubble', from: 'me', text: '네~~ ㅎㅎ', color: 'imsg' },
        { kind: 'stamp', day: '6월 17일 수요일', time: '오후 8:40' },
        { kind: 'bubble', from: 'other', text: '곧 시험이지? 공부는 했어?' },
        { kind: 'bubble', from: 'me', text: '엉 ㅎㅎ 나 또 한다면 하잖아', color: 'imsg' },
        { kind: 'bubble', from: 'other', text: '믿을 수가 있어야지' },
        { kind: 'bubble', from: 'me', text: '근데 나 돈 안 벌어도 돼 찬영이가 먹여 살려준다구 했어요', color: 'imsg' },
        { kind: 'bubble', from: 'other', text: '3살 어린 애한테 너 인생을 맡기는 건 좀 아니지 않을까 성찬아' },
        { kind: 'bubble', from: 'me', text: '원래 돈 많은 사람이 형이야', color: 'imsg' },
        { kind: 'bubble', from: 'other', text: '얘가 뭐라는 거니...' },
        { kind: 'stamp', day: '7월 11일 토요일', time: '오후 9:05' },
        { kind: 'bubble', from: 'other', text: '성찬아 찬영이랑 연락해 봤어?' },
        { kind: 'bubble', from: 'me', text: '응 걱정하지마 엄망 난 찬영이 믿어~~', color: 'imsg' },
        { kind: 'bubble', from: 'other', text: '남자는 너가 처음이라며 너 만나는 게 그냥 호기심일까 봐 엄마는 그게 걱정돼서...' },
        { kind: 'bubble', from: 'me', text: '아니야 호기심에 그렇게 모든 걸 다 내어줄만큼 찬영이가 자아 없는 애가 아니야 ㅎㅎ', color: 'imsg' },
        { kind: 'bubble', from: 'other', text: '그래? 그래... 너가 제일 잘 알겠지' },
        { kind: 'bubble', from: 'me', text: '웅 걱정 마요 ㅎㅎ', color: 'imsg' },
    ],
},
    {
        id: 3, name: '송은석', letter: '송', time: '오후 9:33', unreadCount: 0, meColor: 'sms',
        items: [
            { kind: 'caption', lines: ['문자 메시지 • SMS'] },
            { kind: 'stamp', day: '6월 1일 월요일', time: '오전 8:52' },
            { kind: 'bubble', from: 'me', text: '야 은석아 나 뭔 알람 설정했는데 아침마다 나 못 일어나면 너한테 깨워달라는 문자 갈 듯', color: 'green' },
            { kind: 'bubble', from: 'other', text: 'ㅋㅋㅋ 오키' },
            { kind: 'stamp', day: '6월 2일 화요일', time: '오전 8:52' },
            { kind: 'bubble', from: 'me', text: '나 아직 처잔다. 도와줘!', color: 'green' },
            { kind: 'bubble', from: 'other', text: '깨워 주면 되나?' },
            { kind: 'stamp', day: '6월 9일 화요일', time: '오전 8:52' },
            { kind: 'bubble', from: 'me', text: '나 아직 처잔다. 도와줘!', color: 'green' },
            { kind: 'stamp', day: '6월 12일 금요일', time: '오전 8:52' },
            { kind: 'bubble', from: 'me', text: '나 아직 처잔다. 도와줘!', color: 'green' },
            { kind: 'stamp', day: '6월 15일 월요일', time: '오전 8:52' },
            { kind: 'bubble', from: 'me', text: '나 아직 처잔다. 도와줘!', color: 'green' },
            { kind: 'stamp', day: '6월 19일 금요일', time: '오전 8:52' },
            { kind: 'bubble', from: 'me', text: '나 아직 처잔다. 도와줘!', color: 'green' },
            { kind: 'stamp', day: '6월 26일 금요일', time: '오전 8:52' },
            { kind: 'bubble', from: 'me', text: '나 아직 처잔다. 도와줘!', color: 'green' },
            { kind: 'stamp', day: '6월 29일 월요일', time: '오후 8:52' },
            { kind: 'bubble', from: 'other', text: '성찬이는 종강해도 갓생을 살려고 발악하는구나' },
            { kind: 'bubble', from: 'me', text: '미안 ㅎㅎ ;;', color: 'green' },
        ],
    },
    {
        id: 4, name: '토스', time: '6월 28일 (수)', unreadCount: 1, meColor: 'sms',
        items: [
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '6월 28일 (수)', time: '오후 2:30' } },
            { kind: 'bubble', from: 'other', text: '(광고) 휴대폰 요금제가 도착했어요.\n\n[Web발신]\n(광고) 토스ㅣ정성찬님, 5G 데이터 무제한 요금제가 월 12,000원이에요.\n\n지금 쓰는 요금제와 비교해보세요.\n\n눌러서 알아보기\nhttps://toss.im/_m/PuLJ56mh\n\n무료수신거부 0808635495' },
    ],
    },
    {
        id: 5, name: '+82 1544-7199', time: '6월 16일(화)', unreadCount: 2, meColor: 'sms',
        items: [
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '5월 25일(월) 오후 3:23', time: '오후 12:19' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\n(광고)[무신사] 지금 필요한 플리스 & 부츠 할인 소식을 확인해 보세요!\n▶ 지금 바로 보러가기' },
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '6월 16일(화) 오후 5:12', time: '오후 4:20' } },
            { kind: 'bubble', from: 'other', text: '(광고)[무신사] 무진장 26 여름 블프 오픈!\n\n5주년 기념, 4,350개 브랜드 598,200여개 상품 상품을 최대 80% 할인율로 만나보세요.\n\n① 쿠폰 + 결제 혜택\n오픈 기념 최대 30% 쿠폰 + 최대 8천원 결제 혜택\n\n② 무진장 특가\n- 엄선된 총 1,000+개 상품 최대 73% 할인 시그니처 특가\n- 2,990원부터 시작하는 균일가 하루특가\n- 53시간 특가 곧 마감! 언탭트 스튜디오, 다이닛 외 최대 66% 할인\n\n③ 무진장 이벤트\n- 나이키, 애플, 메종마르지엘라 래플\n- 오늘까지만, 구매 금액 10% 적립금 페이백\n- 매일 오픈런 뽑기로 최대 80% 쿠폰까지\n\n무신사 무진장 단 11일, 06.24(수) 23:59 종료\n\n▶ 무신사 무진장 입장하기\nhttps://musinsa.onelink.me/2uua/6v1mhkzv\n\n무료수신거부 0808507199' },
        ],
    },
    {
        id: 6, name: '+82 1644-3702', time: '6월 1일(월)', unreadCount: 0, meColor: 'sms',
        items: [
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '2024년 2월 15일 (목)', time: '오후 2:15' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\nFIFA 로그인 인증번호:__482910__ 타인에게 알려주지 마세요.' },
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '2024년 6월 8일 (토)', time: '오전 11:30' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\nFIFA 로그인 인증번호:__915234__ 타인에게 알려주지 마세요.' },
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '2024년 9월 22일 (일)', time: '오후 8:45' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\nFIFA 로그인 인증번호:__103859__ 타인에게 알려주지 마세요.' },
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '2024년 12월 5일 (목)', time: '오전 9:12' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\nFIFA 로그인 인증번호:__773201__ 타인에게 알려주지 마세요.' },
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '2025년 3월 19일 (수)', time: '오후 4:20' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\nFIFA 로그인 인증번호:__552094__ 타인에게 알려주지 마세요.' },
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '2025년 7월 11일 (금)', time: '오후 1:05' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\nFIFA 로그인 인증번호:__284716__ 타인에게 알려주지 마세요.' },
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '2025년 10월 30일 (목)', time: '오전 10:40' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\nFIFA 로그인 인증번호:__639012__ 타인에게 알려주지 마세요.' },
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '1월 14일 (수)', time: '오후 6:55' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\nFIFA 로그인 인증번호:__841539__ 타인에게 알려주지 마세요.' },
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '4월 3일 (금)', time: '오후 3:15' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\nFIFA 로그인 인증번호:__309482__ 타인에게 알려주지 마세요.' },
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '6월 1일 (월)', time: '오후 1:03' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\nFIFA 로그인 인증번호:__992415__ 타인에게 알려주지 마세요.' },
        ],
    }, 
    {
        id: 10, name: '+82 10-9876-5432', time: '5월 11일(월)', unreadCount: 0, meColor: 'sms',
        items: [
            { kind: 'caption', lines: ['문자 메시지 • SMS'] },
            { kind: 'stamp', day: '5월 11일 (월)', time: '오후 3:00' },
            { kind: 'bubble', from: 'other', text: '요즘 햄버그 주문 없서요' },
            { kind: 'bubble', from: 'me', text: '누구세요? 문자 잘못보내신것 같습니다 ㅎㅎ', color: 'green' },
            { kind: 'bubble', from: 'other', text: '버거킹 강남구청점입니다' },
            { kind: 'bubble', from: 'me', text: '요즘 주문이 없어서 무슨 일 있을까봐 걱정해주시는 건가요?', color: 'green' },
            { kind: 'bubble', from: 'me', text: '아니면 시켜먹으라고 말씀하시는 건가여?', color: 'green' },
            { kind: 'bubble', from: 'other', text: '예\n걱정도되고 보고 싶기도 하네요' },
            { kind: 'bubble', from: 'me', text: '아항 제가 너무 안 갔죠 ㅜㅜ 오늘 들릴게요~~', color: 'green' },
        ],
    },
    {
        id: 9, name: '+82 10-5674-1102', time: '4월 18일(토)', unreadCount: 0, meColor: 'imsg',
        items: [
            { kind: 'caption', lines: ['iMessage'], lock: '암호화됨' },
            { kind: 'stamp', day: '4월 18일 (토)', time: '오후 10:50' },
            { kind: 'bubble', from: 'other', text: '형 아까 술집에서 번호 알려주신 분 맞으시죠?' },
            { kind: 'bubble', from: 'me', text: '형 남자 친구 있어용 ㅎㅎ :)', color: 'imsg' },
            { kind: 'bubble', from: 'other', text: '거짓말 그럼 번호를 왜 줬어요?' },
            { kind: 'bubble', from: 'me', text: '혹시 형한테 번호 안주면 자리로 안 가겠다구 했나요? ^^;', color: 'imsg' },
            { kind: 'bubble', from: 'other', text: '네? 아뇨 그런 적은 없습니다 번호 달라고 했고 번호 주시길래 마음에 들어하는 줄 알았어요.' },
            { kind: 'bubble', from: 'other', text: '이렇게 아무한테나 번호 주는 거 보니 남자친구분도 조심하셔야할것 같네요 ㅎㅎ' },
            { kind: 'bubble', from: 'me', text: '하... 저기요 죄송한데 아니 죄송하지도 않습니다 그쪽이 계속 저희 술 마시는데 와서 번호 달라고 하시길래 그냥 번호 하나 주면 끝날 것 같아서 준 거 맞고요', color: 'imsg' },
            { kind: 'bubble', from: 'me', text: '제 남자친구 사진 보실래요? 아 됐다 그냥 인스타에 앤톤 찬영 리 검색해 보세요 진짜 뭔... 조심해라 마라인지 차단할게요', color: 'imsg' },
            { kind: 'receipt', text: '읽음: 2026. 4. 18.' },
        ],
    },
    {
        id: 8, name: '+82 10-8912-4033', time: '4월 2일(목)', unreadCount: 1, meColor: 'sms',
        items: [
            { kind: 'caption', lines: ['문자 메시지 • SMS'] },
            { kind: 'stamp', day: '4월 2일 (목)', time: '오후 8:30' },
            { kind: 'bubble', from: 'other', text: '안녕하세요 아까 카페에서 연락처 물어본 사람입니다' },
            { kind: 'bubble', from: 'me', text: '아 죄송합니다만 제가 오늘 하루종일 집에만 있어서요 번호 잘못 입력하신 것 같습니다 ㅎㅎ ', color: 'green' },
            { kind: 'bubble', from: 'other', text: '아 죄송합니다 잘못 입력했나 보네요' },
        ],
    },
    {
        id: 7, name: '+82 10-2341-5829', time: '3월 14일(토)', unreadCount: 0, meColor: 'imsg',
        items: [
            { kind: 'caption', lines: ['iMessage'], lock: '암호화됨' },
            { kind: 'stamp', day: '3월 14일 (토)', time: '오후 10:02' },
            { kind: 'bubble', from: 'other', text: '안녕하세요 저 성찬님과 같은 과 준우 친구 혜미라고 합니당 다름이 아니라 제가 성찬님이 마음에 들어서 번호를 받았어요,, 혹시 여자 친구 없다면 연락 이어가도 괜찮을까요?' },
            { kind: 'bubble', from: 'me', text: '아 안녕하세요 그 죄송하지만 저 게이입니다 남자 친구도 있어요 ㅎㅎ', color: 'imsg' },
            { kind: 'receipt', text: '읽음: 2026. 3. 14.' },
        ],
    },
    {
        id: 11, name: '+82 1588-7882', time: '2025. 4. 30.', unreadCount: 2, meColor: 'sms',
        items: [
            { kind: 'caption', lines: ['문자 메시지 • SMS'], stamp: { day: '2025년 3월 22일', time: '오후 1:27' } },
            { kind: 'bubble', from: 'other', text: '[Web발신]\n모니모 인증번호 [__000000__]를 입력해주세요' },
            { kind: 'stamp', day: '2025년 4월 30일', time: '오후 3:30' },
            {
                kind: 'bubble', from: 'other',
                text: [
                    '**(광고)[monimo]**',
                    '[Web발신]',
                    '(광고) [monimo] 이 메시지를 받았다면 혜택 대상! 내맘대로 선택하는 상품권',
                    '',
                    '정*찬 고객님, 모니모에서 내 자산 연결하면 직접 고를 수 있는 모바일상품권 5,000원권을 드려요. 이번 기회에 자산도 간편하게 관리하고, 혜택도 꼭 챙겨보세요!',
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
                    '2025.4.30(목) ~ 2025.8.20(목)',
                    '',
                    '■ 혜택제공',
                    '2025.8.30(일) 모니모에 등록된 휴대폰번호로 발송 예정',
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