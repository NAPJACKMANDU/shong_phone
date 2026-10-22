export interface KakaoMessage {
    id: string
    from: 'me' | 'other'
    authorId?: string
    text?: string
    photo?: boolean
    photoUrl?: string
    date: string
    time: string
    tail?: boolean
}

export const KAKAO_MESSAGES: Record<string, KakaoMessage[]> = {
    antony: [
    { id: 'a1', from: 'other', authorId: 'antony', text: '형 저 오늘 연습 7시에는 끝나용ㅇ ㅎㅎ', date: '2026-03-19', time: '오후 5:48', tail: true },
    { id: 'a2', from: 'me', text: '오늘 일찍 끝나네ㅔ 형이 델러갈게 오늘 밖에서 밥 먹을까?', date: '2026-03-19', time: '오후 6:01', tail: true },
    { id: 'a3', from: 'other', authorId: 'antony', text: '좋아요 :D', date: '2026-03-19', time: '오후 6:01', tail: true },
    { id: 'a4', from: 'me', text: '엉 알겠어 ㅎㅎ 7시 반까지 갈게', date: '2026-03-19', time: '오후 6:03', tail: true },
    { id: 'a5', from: 'me', text: '형 지금 가는 중', date: '2026-03-19', time: '오후 07:05', tail: false },
    { id: 'a6', from: 'me', text: '천사 생일 축하해 형이 벌써 생일만 여덟 번째 축하해주네 챙겨준건 네 번째지만 ㅎㅎ 형은 천사가 형 질리지만 않으면 계속 옆에 붙어있을 거니까 너무 걱정하지 말구 항상 행복하자 알겠지? 생일 진심으로 축하해 사랑해', 
        date: '2026-03-21', time: '오전 12:00', tail: true },
    { id: 'a7', from: 'other', authorId: 'antony', text: '뭐에요?? 이런 건 언제 보냈대 어차피 계속 같이 있었으면서 ^^ ;;', date: '2026-03-21', time: '오전 9:08', tail: true },
    { id: 'a8', from: 'other', authorId: 'antony', text: '사랑해요 형 항상 고마워요 THX 😍', date: '2026-03-21', time: '오전 9:08', tail: false },
    { id: 'a9', from: 'me', text: '찬영아 오늘 재미있었으면 애교 ㅎㅎ', date: '2026-03-21', time: '오후 11:12', tail: true },
    { id: 'a10', from: 'other', authorId: 'antony', text: '아ㅏ 진짜 어이없어 씻고 나가서 보여 줄게요.. 😅', date: '2026-03-21', time: '오후 11:23', tail: true },
    { id: 'a11', from: 'me', text: '아ㅏ 앤토나ㅏ 오늘도 연습 나간거야? ㅠㅠ', date: '2026-03-24', time: '오전 7:15', tail: true },
    { id: 'a12', from: 'other', authorId: 'antony', text: '연습 나왔어용', date: '2026-03-24', time: '오전 9:29', tail: true },
    { id: 'a13', from: 'other', authorId: 'antony', text: '형 오늘 학교 가나요?', date: '2026-03-24', time: '오전 9:29', tail: false },
    { id: 'a14', from: 'me', text: '응... 지금 가는 중 아 찬영이 보고 싶다ㅏ', date: '2026-03-24', time: '오전 9:59', tail: true },
    { id: 'a15', from: 'other', authorId: 'antony', text: '이따 수영장 와요', date: '2026-03-24', time: '오후 1:24', tail: true },
    { id: 'a16', from: 'other', authorId: 'antony', text: '코치님도 허락하셨어요 ㅎㅎ', date: '2026-03-24', time: '오후 1:24', tail: false },
    { id: 'a17', from: 'me', text: '천사 오늘 형 엠티 가는거 알지? ', date: '2026-03-27', time: '오전 9:01', tail: true },
    { id: 'a18', from: 'me', text: '이따 가기 전에 수영장 들릴까?', date: '2026-03-27', time: '오전 9:01', tail: false },
    { id: 'a19', from: 'other', authorId: 'antony', text: '🥲', date: '2026-03-27', time: '오전 10:32', tail: true },
    { id: 'a20', from: 'other', authorId: 'antony', text: '들려주면 고맙구요 가기 전에 얼굴 봐요', date: '2026-03-27', time: '오전 10:32', tail: false },
    { id: 'a21', from: 'me', text: '형 지금 가', date: '2026-03-27', time: '오전 11:32', tail: true },
    { id: 'a22', from: 'other', authorId: 'antony', text: '형 잘 다녀와용', date: '2026-03-27', time: '오후 12:57', tail: true },
    { id: 'a23', from: 'me', text: '앤토니가 없는데 형이 어떻게 ㅠㅠ', date: '2026-03-27', time: '오후 1:32', tail: true },
    { id: 'a24', from: 'other', authorId: 'antony', text: '그렇게 말해놓고 재미있게 놀고있죠? ㅡㅡ', date: '2026-03-27', time: '오후 6:18', tail: true },
    { id: 'a25', from: 'me', text: '찬영아ㅏㅏ 사랑해ㅐㅐ', date: '2026-03-27', time: '오후 8:45', tail: true },
    { id: 'a26', from: 'me', text: '진짜많이ㅎㅎ알지?', date: '2026-03-27', time: '오후 8:45', tail: false },
    { id: 'a27', from: 'other', authorId: 'antony', text: '술 마시지도 못하면서 얼마나 마신거에요', date: '2026-03-27', time: '오후 8:45', tail: true },
    { id: 'a28', from: 'me', text: '전화하까??', date: '2026-03-27', time: '오후 10:28', tail: true },
    { id: 'a29', from: 'other', authorId: 'antony', text: '사랑해요 GNGN 😴', date: '2026-03-27', time: '오전 12:02', tail: true },
    { id: 'a30', from: 'me', text: '찬영아 내일 오랜만에 데이트하장', date: '2026-04-03', time: '오전 9:13', tail: true },
    { id: 'a31', from: 'other', authorId: 'antony', text: '요즘 시합 때문에 바빠서.. 못 놀것 같아요 😅', date: '2026-04-03', time: '오후 12:57', tail: true },
    { id: 'a32', from: 'other', authorId: 'antony', text: 'Sorry.. :(', date: '2026-04-03', time: '오후 12:57', tail: false },
    { id: 'a33', from: 'me', text: '왜애ㅐ ㅠㅠ  요즘 집에서도 보이지 않더니 너무 바쁜거 아니야?', date: '2026-04-03', time: '오후 01:33', tail: true },
    { id: 'a34', from: 'me', text: '또 경기시즌이라는게 너무 슬프다~', date: '2026-04-03', time: '오후 01:33', tail: false },
    { id: 'a35', from: 'other', authorId: 'antony', text: '금메달 달고 오면 형이 제일 좋아하잖아요 ㅎㅎ ', date: '2026-04-03', time: '오후 03:48', tail: true },
    { id: 'a36', from: 'me', text: '그건 맞지만 그래도 ㅠㅠ', date: '2026-04-03', time: '오후 04:10', tail: true },
    { id: 'a37', from: 'other', authorId: 'antony', text: '여름에 해외로 훈련 가는데', date: '2026-04-03', time: '오후 05:29', tail: true },
    { id: 'a38', from: 'other', authorId: 'antony', text: ':(', date: '2026-04-03', time: '오후 05:29', tail: false },
    { id: 'a39', from: 'other', authorId: 'antony', text: '형도 같이 갔으면 좋겠네요..', date: '2026-04-03', time: '오후 05:29', tail: false },
    { id: 'a40', from: 'me', text: '그러까? 형이 다 버리고 갈까?', date: '2026-04-03', time: '오후 06:05', tail: true },
    { id: 'a41', from: 'other', authorId: 'antony', text: 'ㅋㅋㅋ', date: '2026-04-03', time: '오후 08:22', tail: true },
    { id: 'a42', from: 'other', authorId: 'antony', text: '못 올 거 다 알아요 희망고문 😵', date: '2026-04-03', time: '오후 08:22', tail: false },
    { id: 'a43', from: 'me', text: 'ㅠㅠ', date: '2026-04-03', time: '오후 08:23', tail: true },
    { id: 'a44', from: 'other', authorId: 'antony', text: '성찬이형', date: '2026-04-21', time: '오전 10:02', tail: true },
    { id: 'a45', from: 'other', authorId: 'antony', text: '옆에 여자 누구예요', date: '2026-04-21', time: '오전 10:02', tail: false },
    { id: 'a46', from: 'other', authorId: 'antony', text: '처음 보는 사람인데.. ', date: '2026-04-21', time: '오전 10:02', tail: false },
    { id: 'a47', from: 'me', text: '형 팀플 조장 ㅎㅎ 뭐 부탁할 거 있다고 해서', date: '2026-04-21', time: '오전 10:34', tail: true },
    { id: 'a48', from: 'me', text: '근데 천사 여기 왔었어??', date: '2026-04-21', time: '오전 10:34', tail: false },
    { id: 'a49', from: 'me', text: '형 보러 왔나ㅏㅏ~', date: '2026-04-21', time: '오전 10:34', tail: false },
    { id: 'a50', from: 'other', authorId: 'antony', text: '아니에요 그냥 잠깐 지나가는 길이었눈데', date: '2026-04-21', time: '오전 10:35', tail: true },
    { id: 'a51', from: 'other', authorId: 'antony', text: '형이 다른 사람이랑 말하고 있어서 말 못 걸었어요', date: '2026-04-21', time: '오전 10:35', tail: false },
    { id: 'a52', from: 'me', text: '왤까 ㅠㅠ 형이 뭐 잘못했나?', date: '2026-04-21', time: '오전 10:36', tail: true },
    { id: 'a53', from: 'other', authorId: 'antony', text: '아니에요 그런 거 없음 ^^', date: '2026-04-21', time: '오전 10:36', tail: true },
    { id: 'a54', from: 'other', authorId: 'antony', text: '연습하고 올게용 집에서 봐요 😍', date: '2026-04-21', time: '오전 10:36', tail: false },
    { id: 'a55', from: 'me', text: '형 오늘 늦어 찬영이 먼저 자 ㅎㅎ', date: '2026-05-01', time: '오후 6:23', tail: true },
    { id: 'a56', from: 'other', authorId: 'antony', text: '풋살 차요?', date: '2026-05-01', time: '오후 6:23', tail: true },
    { id: 'a57', from: 'me', text: '응 오늘 회식까지 하기로 했엉', date: '2026-05-01', time: '오후 6:23', tail: true },
    { id: 'a58', from: 'other', authorId: 'antony', text: 'okok', date: '2026-05-01', time: '오후 6:47', tail: true },
    { id: 'a59', from: 'other', authorId: 'antony', text: '조굼만 마시다 와요', date: '2026-05-01', time: '오후 6:47', tail: false },
    { id: 'a60', from: 'me', text: '엉 사랑해 ㅎㅎ', date: '2026-05-01', time: '오후 7:15', tail: true },
    { id: 'a61', from: 'other', authorId: 'antony', text: '저두용ㅇ ㅎㅎ', date: '2026-05-01', time: '오후 7:15', tail: true },
    { id: 'a62', from: 'other', authorId: 'antony', photoUrl: '/42.jpg', date: '2026-05-23', time: '오후 8:31', tail: true },
    { id: 'a63', from: 'other', authorId: 'antony', text: '바게트 사고 가는 중 ^^ ㅎㅎ', date: '2026-05-23', time: '오후 8:31', tail: false },
    { id: 'a64', from: 'me', text: '귀엽네~~~', date: '2026-05-23', time: '오후 8:48', tail: true },
    { id: 'a65', from: 'me', text: '형도 나가는 중 가운데에서 만나', date: '2026-05-23', time: '오후 8:48', tail: false },
    { id: 'a66', from: 'other', authorId: 'antony', text: '울지마요..', date: '2026-06-01', time: '오전 9:48', tail: true },
    { id: 'a67', from: 'me', text: '아 슬프다~~!', date: '2026-06-01', time: '오전 10:00', tail: true },
    { id: 'a69', from: 'me', text: '앤토니 없는 집 너무 허전할 것 같은데ㅔ', date: '2026-06-01', time: '오전 10:05', tail: false },
    { id: 'a68', from: 'other', authorId: 'antony', text: '가기 싫은데.. 가야하니까요', date: '2026-06-01', time: '오전 10:02', tail: true },
    { id: 'a70', from: 'other', authorId: 'antony', text: '내년에 봐요 중간에 오긴할 거예요 :)', date: '2026-06-01', time: '오전 10:08', tail: false },
    { id: 'a71', from: 'me', text: '훈련 잘하고 경기도 잘하고 와', date: '2026-06-01', time: '오전 10:15', tail: true },
    { id: 'a72', from: 'other', authorId: 'antony', text: '응 ㅎㅎ 와서 형 목에 금메달 걸어줄게요', date: '2026-06-01', time: '오전 10:18', tail: true },
    { id: 'a73', from: 'other', authorId: 'antony', text: '저 비행기 탔어요 도착해서 연락할게용ㅇ', date: '2026-06-01', time: '오전 10:18', tail: false },
    { id: 'a74', from: 'other', authorId: 'antony', text: '사랑해요', date: '2026-06-01', time: '오전 10:19', tail: true },
    { id: 'a75', from: 'me', text: '이따 봐 형도 사랑해', date: '2026-06-01', time: '오전 10:20', tail: false },
    { id: 'a76', from: 'me', text: '형 집 왔어 집이 넘 싸늘하다 보고 싶어', date: '2026-06-01', time: '오후 12:40', tail: true },
    { id: 'a76', from: 'other', authorId: 'antony', text: '형.. 14시간 이상 떨어져 있는거 너무 오랜만이라 힘들었네요 🫠', date: '2026-06-01', time: '오후 10:23', tail: true },
    { id: 'a77', from: 'other', authorId: 'antony', text: '보고 싶어요', date: '2026-06-01', time: '오후 10:23', tail: false },
    { id: 'a78', from: 'me', text: '와 찬영이다 ㅎㅎ 형 그새 늙은듯 힘드렁~~ ㅠ', date: '2026-06-01', time: '오후 10:40', tail: true },

],    

eunseok: [
        { id: 'e1', from: 'me', text: '요즘 어떻게 지내?', date: '2026-10-20', time: '오후 8:10', tail: true },
        { id: 'e2', from: 'other', authorId: 'eunseok', text: '그냥 과제하면서 지내지 뭐', date: '2026-10-20', time: '오후 8:14', tail: true },
        { id: 'e3', from: 'other', authorId: 'eunseok', text: '좋아하면 걍 다시 만나 나라면 그럴 듯', date: '2026-10-21', time: '오전 9:02', tail: true },
        { id: 'e4', from: 'me', text: '너라면 진짜 그럴 거야?', date: '2026-10-21', time: '오전 9:05', tail: true },
    ],
    'football-club': [
        { id: 'f1', from: 'other', authorId: 'friend-4', text: '이번 주 모임 인원 확인할게요!', date: '2026-10-20', time: '오후 6:20', tail: true },
        { id: 'f2', from: 'other', authorId: 'football-guest-1', text: '저 참석 가능합니다', date: '2026-10-20', time: '오후 6:25', tail: true },
        { id: 'f3', from: 'me', text: '저도 갈게요. 몇 시에 모이면 될까요?', date: '2026-10-20', time: '오후 6:31', tail: true },
        { id: 'f4', from: 'other', authorId: 'shotaro', text: '내일 오후 2시에 운동장에서 봐요!', date: '2026-10-21', time: '오전 8:42', tail: true },
        { id: 'f5', from: 'other', authorId: 'football-guest-2', text: '다들 내일 시간 되십니까?', date: '2026-10-21', time: '오전 8:45', tail: true },
        { id: 'f6', from: 'me', text: '네 확인했습니다!', date: '2026-10-21', time: '오전 8:48', tail: true },
    ],
    'shotaro-group': [
        { id: 's1', from: 'other', authorId: 'shotaro', text: '다들 오늘 과제 회의 몇 시가 괜찮아요?', date: '2026-10-20', time: '오후 4:15', tail: true },
        { id: 's2', from: 'other', authorId: 'wonbin', text: '저녁 7시 이후면 돼요', date: '2026-10-20', time: '오후 4:20', tail: true },
        { id: 's3', from: 'me', text: '저도 7시 괜찮아요', date: '2026-10-20', time: '오후 4:23', tail: true },
        { id: 's4', from: 'other', authorId: 'eunseok', text: '성찬이형 찬영이 비행기 탔대요', date: '2026-10-21', time: '오전 10:11', tail: true },
        { id: 's5', from: 'other', authorId: 'sohee', photo: true, date: '2026-10-21', time: '오전 10:13', tail: true },
        { id: 's6', from: 'me', text: '오 조심히 오라고 전해줘!', date: '2026-10-21', time: '오전 10:17', tail: true },
    ],
    'self-chat': [
        { id: 'm1', from: 'me', text: '조별과제 더블데이트 9월 19일 일요일', date: '2026-10-20', time: '오후 11:30', tail: true },
        { id: 'm2', from: 'me', text: '자료 정리도 끝!', date: '2026-10-21', time: '오전 8:20', tail: true },
        { id: 'm3', from: 'me', text: '발표 전에 한 번 더 확인하기', date: '2026-10-21', time: '오전 8:22', tail: true },
    ],
    'love-war': [
        { id: 'l1', from: 'other', authorId: 'friend-1', text: '역할 분담은 이렇게 하면 어떨까요?', date: '2026-10-20', time: '오후 7:40', tail: true },
        { id: 'l2', from: 'other', authorId: 'project-guest-1', text: '저는 자료 조사 맡을게요!', date: '2026-10-20', time: '오후 7:45', tail: true },
        { id: 'l3', from: 'me', text: '좋아요. 저는 발표 자료 만들게요', date: '2026-10-20', time: '오후 7:51', tail: true },
        { id: 'l4', from: 'other', authorId: 'project-guest-2', text: '그럼 그렇게 알고 있겠습니다 ㅎㅎ', date: '2026-10-21', time: '오전 9:10', tail: true },
        { id: 'l5', from: 'other', authorId: 'friend-4', text: '초안 나오면 여기에 공유해 주세요', date: '2026-10-21', time: '오전 9:13', tail: true },
    ],
    'kakao-bank': [
        { id: 'b1', from: 'other', authorId: 'kakao-bank', text: '이번 달 카드 사용 내역을 확인해 보세요.', date: '2026-10-20', time: '오후 11:45', tail: true },
        { id: 'b2', from: 'other', authorId: 'kakao-bank', text: '식비 지출이 지난달보다 12% 줄었어요.', date: '2026-10-21', time: '오전 7:30', tail: true },
        { id: 'b3', from: 'other', authorId: 'kakao-bank', photo: true, date: '2026-10-21', time: '오전 7:31', tail: true },
    ],
    'lg-uplus': [
        { id: 'u1', from: 'other', authorId: 'lg-uplus', text: '안녕하세요, LG유플러스입니다.', date: '2026-10-20', time: '오후 11:58', tail: true },
        { id: 'u2', from: 'other', authorId: 'lg-uplus', text: '고객님께 더 나은 서비스를 제공하기 위해 정기 점검을 진행합니다.', date: '2026-10-21', time: '오전 8:00', tail: true },
        { id: 'u3', from: 'other', authorId: 'lg-uplus', text: '이용에 참고 부탁드립니다. 감사합니다.', date: '2026-10-21', time: '오전 8:01', tail: true },
    ],
}

export const getKakaoMessages = (chatId: string): KakaoMessage[] => {
    const messages = KAKAO_MESSAGES[chatId]
    if (!messages) {
        throw new Error(`No messages configured for Kakao chat: ${chatId}`)
    }
    return messages
}

export const getLastKakaoMessage = (chatId: string): KakaoMessage | undefined =>
    getKakaoMessages(chatId).at(-1)
