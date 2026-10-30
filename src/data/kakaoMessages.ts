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
  // 5월 25일
  { id: 'm1', from: 'other', authorId: 'antony', text: '형 일어나용ㅇ', date: '2026-05-25', time: '오전 9:50', tail: true },
  { id: 'm2', from: 'me', authorId: 'me', text: '천사 덕분에 일어났다ㅏㅏ', date: '2026-05-25', time: '오전 9:57', tail: true },
  { id: 'm3', from: 'me', authorId: 'me', text: '형 얼른 준비할게', date: '2026-05-25', time: '오전 9:57', tail: false },
  { id: 'm4', from: 'me', authorId: 'me', text: '셋로그 뭐야 오늘 늦게 와?', date: '2026-05-25', time: '오전 11:02', tail: true },
  { id: 'm5', from: 'other', authorId: 'antony', text: '거짓말이에요 🤗', date: '2026-05-25', time: '오전 11:47', tail: true },
  { id: 'm6', from: 'me', authorId: 'me', text: '귀엽네~', date: '2026-05-25', time: '오후 12:10', tail: true },
  { id: 'm7', from: 'me', authorId: 'me', text: '강의 듣는 중 그냥 천사 연습하는 곳 가서 구경하고 싶다', date: '2026-05-25', time: '오후 12:10', tail: true },
  { id: 'm8', from: 'me', authorId: 'me', text: '형이 강의를 들어야 하는 이유가 뭘까', date: '2026-05-25', time: '오후 12:10', tail: true },
  { id: 'm9', from: 'me', authorId: 'me', text: '오늘 몇 시에 끝나?', date: '2026-05-25', time: '오후 3:27', tail: true },
  { id: 'm10', from: 'me', authorId: 'me', text: '밥 챙겨 먹어', date: '2026-05-25', time: '오후 4:41', tail: true },
  { id: 'm11', from: 'other', authorId: 'antony', text: '형 나 이제 끝 ㅎㅎ 얼른 집 갈게용', date: '2026-05-25', time: '오후 6:32', tail: true },
  { id: 'm12', from: 'other', authorId: 'antony', text: '형 집이에요?', date: '2026-05-25', time: '오후 6:32', tail: false },
  { id: 'm13', from: 'me', authorId: 'me', text: '응 형은 집 얼른 와', date: '2026-05-25', time: '오후 6:46', tail: true },

  // 5월 26일
  { id: 'm14', from: 'other', authorId: 'antony', text: '연습 왔어요 :)', date: '2026-05-26', time: '오전 5:20', tail: true },
  { id: 'm15', from: 'me', authorId: 'me', text: '오늘 진짜 일찍 갔네 형 거기 가도 돼?', date: '2026-05-26', time: '오전 9:46', tail: true },
  { id: 'm16', from: 'me', authorId: 'me', text: '안된다고 해도 가면 안 되낭? ㅎㅎ', date: '2026-05-26', time: '오전 9:46', tail: false },
  { id: 'm17', from: 'other', authorId: 'antony', text: '코치님이 와도 된대요 ^^', date: '2026-05-26', time: '오전 10:22', tail: true },
  { id: 'm18', from: 'other', authorId: 'antony', text: '근데 형 이미 오고 있죠?', date: '2026-05-26', time: '오전 10:22', tail: false },
  { id: 'm19', from: 'me', authorId: 'me', photoUrl: '/photo1.jpg', date: '2026-05-26', time: '오전 10:23', tail: true },
  { id: 'm20', from: 'me', authorId: 'me', text: '얼른 갈게 ㅎㅎ', date: '2026-05-26', time: '오전 10:23', tail: true },
  { id: 'm21', from: 'me', authorId: 'me', text: '형이 지금 천사를 다시 수영장에 보내고 강의를 들으러 간다는 사실이 믿기지 않아', date: '2026-05-26', time: '오후 3:12', tail: true },
  { id: 'm22', from: 'other', authorId: 'antony', text: 'ㅋㅋㅋ 공부 열심히 해요 😝', date: '2026-05-26', time: '오후 3:13', tail: true },
  { id: 'm23', from: 'other', authorId: 'antony', text: '이제 들어갈게요 형 이따 봐요 ^^', date: '2026-05-26', time: '오후 3:13', tail: false },
  { id: 'm24', from: 'me', authorId: 'me', text: '이따 봐 ㅎ', date: '2026-05-26', time: '오후 3:13', tail: true },
  { id: 'm25', from: 'me', authorId: 'me', text: '강의 끝나자마자 헬스장 왔어', date: '2026-05-26', time: '오후 5:48', tail: true },
  { id: 'm26', from: 'other', authorId: 'antony', text: '저도 끝났어요', date: '2026-05-26', time: '오후 6:39', tail: true },
  { id: 'm27', from: 'other', authorId: 'antony', text: '헬스장으로 갈게여', date: '2026-05-26', time: '오후 6:39', tail: false },

  // 5월 27일
  { id: 'm28', from: 'other', authorId: 'antony', text: '형 저 다 씻고 나왔는데 어디 나갔나요?', date: '2026-05-27', time: '오후 9:57', tail: true },
  { id: 'm29', from: 'me', authorId: 'me', text: '아 형이 두고 왔더라구 그래서 편의점 좀 ㅎ.ㅎㅎ.ㅎ.ㅎ.', date: '2026-05-27', time: '오후 9:57', tail: true },
  { id: 'm30', from: 'other', authorId: 'antony', text: '😅', date: '2026-05-27', time: '오후 9:58', tail: true },
  { id: 'm31', from: 'other', authorId: 'antony', text: '😴', date: '2026-05-27', time: '오후 9:58', tail: false },
  { id: 'm32', from: 'me', authorId: 'me', text: '형 5분 안에 가 자면 안 돼애ㅐ', date: '2026-05-27', time: '오후 9:58', tail: true },
  { id: 'm33', from: 'me', authorId: 'me', text: '자면 깨울 거야', date: '2026-05-27', time: '오후 9:58', tail: false },
  { id: 'm34', from: 'other', authorId: 'antony', photoUrl: '/photo2.jpg', date: '2026-05-27', time: '오후 9:58', tail: false },

  // 5월 29일
  { id: 'm35', from: 'other', authorId: 'antony', text: '현실복기 ^^; 연습 왔네요', date: '2026-05-29', time: '오전 5:18', tail: true },
  { id: 'm36', from: 'me', authorId: 'me', text: '천사 땡큐', date: '2026-05-29', time: '오전 9:57', tail: true },
  { id: 'm37', from: 'me', authorId: 'me', text: '얼른 준비하께ㅔ', date: '2026-05-29', time: '오전 9:57', tail: false },
  { id: 'm38', from: 'other', authorId: 'antony', text: 'ㅎㅎ 성찬이형', date: '2026-05-29', time: '오전 10:39', tail: true },
  { id: 'm39', from: 'me', authorId: 'me', text: '엉? 나도 보고 싶어', date: '2026-05-29', time: '오전 10:40', tail: true },
  { id: 'm40', from: 'other', authorId: 'antony', text: '그럼 얼른 집 와요', date: '2026-05-29', time: '오후 4:19', tail: true },
  { id: 'm41', from: 'other', authorId: 'antony', text: '저 끝났어요 :)', date: '2026-05-29', time: '오후 4:19', tail: false },
  { id: 'm42', from: 'me', authorId: 'me', text: '빨리 끝났네 형 이거 강의 6시에 끝나ㅏㅏ', date: '2026-05-29', time: '오후 4:47', tail: true },
  { id: 'm43', from: 'other', authorId: 'antony', text: 'ㅋㅋㅋ', date: '2026-05-29', time: '오후 5:28', tail: true },
  { id: 'm44', from: 'other', authorId: 'antony', text: '오늘 형 힘드니까 저녁 햄버거 먹어요', date: '2026-05-29', time: '오후 5:28', tail: false },
  { id: 'm45', from: 'me', authorId: 'me', text: '맥도날드?', date: '2026-05-29', time: '오후 5:29', tail: true },
  { id: 'm46', from: 'other', authorId: 'antony', text: 'YESSS Call me when you leave', date: '2026-05-29', time: '오후 5:40', tail: true },
  { id: 'm47', from: 'me', authorId: 'me', text: 'Ok', date: '2026-05-29', time: '오후 5:40', tail: true },

  // 6월 1일
  { id: 'm48', from: 'other', authorId: 'antony', text: '저 비행기 탔어요~ ㅎ', date: '2026-06-01', time: '오전 9:58', tail: true },
  { id: 'm49', from: 'me', authorId: 'me', text: 'ㅠ 하트보내', date: '2026-06-01', time: '오전 9:58', tail: true },
  { id: 'm50', from: 'me', authorId: 'me', text: '빨링', date: '2026-06-01', time: '오전 9:58', tail: false },
  { id: 'm51', from: 'other', authorId: 'antony', text: '네?', date: '2026-06-01', time: '오전 9:59', tail: true },
  { id: 'm52', from: 'other', authorId: 'antony', text: '🧡🧡🧡🧡🧡🧡', date: '2026-06-01', time: '오전 9:59', tail: false },
  { id: 'm53', from: 'other', authorId: 'antony', text: ':D', date: '2026-06-01', time: '오전 9:59', tail: false },
  { id: 'm54', from: 'other', authorId: 'antony', text: '내려서 연락할게요', date: '2026-06-01', time: '오전 9:59', tail: false },
  { id: 'm55', from: 'other', authorId: 'antony', text: '집 조심히 가요', date: '2026-06-01', time: '오전 9:59', tail: false },
  { id: 'm56', from: 'other', authorId: 'antony', text: '..', date: '2026-06-01', time: '오전 9:59', tail: false },
  { id: 'm57', from: 'other', authorId: 'antony', text: '사랑해요', date: '2026-06-01', time: '오전 10:00', tail: true },
  { id: 'm58', from: 'me', authorId: 'me', text: '집 가면 천사 없다고?', date: '2026-06-01', time: '오전 10:00', tail: true },
  { id: 'm59', from: 'me', authorId: 'me', text: '거짓말 같은데', date: '2026-06-01', time: '오전 10:01', tail: true },
  { id: 'm60', from: 'me', authorId: 'me', text: '사랑해', date: '2026-06-01', time: '오전 10:01', tail: false },
  { id: 'm61', from: 'me', authorId: 'me', photoUrl: '/photo3.jpg', date: '2026-06-01', time: '오후 6:39', tail: false },
  { id: 'm62', from: 'me', authorId: 'me', photoUrl: '/photo4.jpg', date: '2026-06-01', time: '오후 6:39', tail: false },
  { id: 'm63', from: 'me', authorId: 'me', photoUrl: '/photo5.jpg', date: '2026-06-01', time: '오후 6:39', tail: false },
  { id: 'm64', from: 'me', authorId: 'me', photoUrl: '/photo6.jpg', date: '2026-06-01', time: '오후 6:39', tail: false },
  { id: 'm65', from: 'me', authorId: 'me', photoUrl: '/photo7.jpg', date: '2026-06-01', time: '오후 6:40', tail: false },
  { id: 'm66', from: 'me', authorId: 'me', text: 'baby', date: '2026-06-01', time: '오후 6:40', tail: true },
  { id: 'm67', from: 'me', authorId: 'me', text: '앤토니 많이 컸네 ㅎㅎ', date: '2026-06-01', time: '오후 6:40', tail: false },

  // 6월 2일
  { id: 'm68', from: 'other', authorId: 'antony', text: '성찬이형 도착하거 정신이 없어서 연락 못했네요..', date: '2026-06-02', time: '오전 4:28', tail: true },
  { id: 'm69', from: 'other', authorId: 'antony', text: '숙소에요 ^^', date: '2026-06-02', time: '오전 4:28', tail: false },
  { id: 'm70', from: 'other', authorId: 'antony', text: '잘 자요 💤', date: '2026-06-02', time: '오전 4:30', tail: true },
  { id: 'm71', from: 'me', authorId: 'me', text: '천사 아침부터 바쁘네 행사도 가고', date: '2026-06-02', time: '오전 9:52', tail: true },
  { id: 'm72', from: 'me', authorId: 'me', text: '형은 은석이가 깨워줘서 일어났어ㅓ', date: '2026-06-02', time: '오전 9:52', tail: false },
  { id: 'm73', from: 'other', authorId: 'antony', text: '다행이네요 :)', date: '2026-06-02', time: '오전 10:27', tail: true },
  { id: 'm74', from: 'other', authorId: 'antony', text: '그래도 형 옆에 사람들이 있어서 안심이 되요', date: '2026-06-02', time: '오전 10:27', tail: false },
  { id: 'm75', from: 'me', authorId: 'me', text: '그럼 뭐 해 천사가 없는데 ㅎ', date: '2026-06-02', time: '오전 11:14', tail: true },
  { id: 'm76', from: 'other', authorId: 'antony', text: 'ㅋㅋㅋ ^^', date: '2026-06-02', time: '오후 12:08', tail: true },

  // 6월 3일
  { id: 'm77', from: 'other', authorId: 'antony', photoUrl: '/photo8.jpg', date: '2026-06-03', time: '오전 11:03', tail: false },
  { id: 'm78', from: 'other', authorId: 'antony', text: '바게트 샀어요 형한테더 보내주고 싶네요', date: '2026-06-03', time: '오전 11:03', tail: true },
  { id: 'm79', from: 'other', authorId: 'antony', text: '성찬이형', date: '2026-06-03', time: '오전 11:08', tail: true },
  { id: 'm80', from: 'other', authorId: 'antony', text: '오늘 공강아네요', date: '2026-06-03', time: '오전 11:08', tail: false },
  { id: 'm81', from: 'other', authorId: 'antony', text: '😇', date: '2026-06-03', time: '오전 11:08', tail: false },
  { id: 'm82', from: 'me', authorId: 'me', text: '형 일어났어', date: '2026-06-03', time: '오전 11:46', tail: true },
  { id: 'm83', from: 'me', authorId: 'me', text: '오늘 학교 뭐 찍는다고 해서 가야돼', date: '2026-06-03', time: '오전 11:46', tail: false },
  { id: 'm84', from: 'me', authorId: 'me', text: '뭐 찍는지는 기억이 안나넹', date: '2026-06-03', time: '오전 11:46', tail: false },
  { id: 'm86', from: 'other', authorId: 'antony', text: '우아 신기 :D', date: '2026-06-03', time: '오후 12:15', tail: true },
  { id: 'm87', from: 'other', authorId: 'antony', text: '형 여기 열한시에요', date: '2026-06-03', time: '오후 12:15', tail: false },
  { id: 'm88', from: 'other', authorId: 'antony', text: 'ㅠㅠ', date: '2026-06-03', time: '오후 12:15', tail: false },
  { id: 'm89', from: 'other', authorId: 'antony', text: '.. 졸려요', date: '2026-06-03', time: '오후 12:57', tail: true },
  { id: 'm90', from: 'other', authorId: 'antony', text: '먼저 잘게용', date: '2026-06-03', time: '오후 1:22', tail: true },
  { id: 'm91', from: 'other', authorId: 'antony', text: '전화 기다리다가 잠듦 ^^', date: '2026-06-03', time: '오후 1:22', tail: false },
  { id: 'm92', from: 'me', authorId: 'me', text: '미안하네 형이 정신이 하나 없었다ㅏ', date: '2026-06-03', time: '오후 2:28', tail: true },
  { id: 'm93', from: 'me', authorId: 'me', text: '잘자 천사 내일 전화하자', date: '2026-06-03', time: '오후 2:28', tail: false },

  // 7월 10일
  { id: 'm94', from: 'me', authorId: 'me', text: '졸리다ㅏ', date: '2026-07-10', time: '오전 9:28', tail: true },
  { id: 'm95', from: 'me', authorId: 'me', text: '천사 모해', date: '2026-07-10', time: '오전 9:28', tail: false },
  { id: 'm96', from: 'me', authorId: 'me', text: '천사야', date: '2026-07-10', time: '오후 12:12', tail: true },
  { id: 'm97', from: 'me', authorId: 'me', text: '왜 연락을 안 봐', date: '2026-07-10', time: '오후 12:12', tail: false },
  { id: 'm98', from: 'me', authorId: 'me', text: '셋로그 안해도 되니까 카톡 좀 보징?', date: '2026-07-10', time: '오후 12:12', tail: false },
  { id: 'm99', from: 'me', authorId: 'me', text: '얼마나 마신 건지는 모르겠지만', date: '2026-07-10', time: '오후 3:54', tail: true },
  { id: 'm100', from: 'me', authorId: 'me', text: '술 깨고 연락해', date: '2026-07-10', time: '오후 3:54', tail: false },
  { id: 'm101', from: 'other', authorId: 'antony', text: '성찬이형..', date: '2026-07-10', time: '오후 11:37', tail: true },
  { id: 'm102', from: 'other', authorId: 'antony', text: '변명할 건 없구..\nsorry.. 제 잘못이에요\n지금 호텔방에서 자고 일어났네요\n걱정시켜서 죄송해요 🥺', date: '2026-07-10', time: '오후 11:37', tail: false },

  // 7월 11일
  { id: 'm103', from: 'other', authorId: 'antony', text: '기사 아니에요 아니라고 기사 낼거에요..\n그냥 들어가기만 한 거고 사실 들어간 기억도 없네요 😢\n아무런 일도 일어나지 않았어요\n형도 알잖아요 형이 제일 잘 알잖아요^^..', date: '2026-07-11', time: '오전 8:21', tail: false },
  { id: 'm104', from: 'me', authorId: 'me', text: '응 알겠어 괜찮아 뭐 그럴 수 있지 ㅎ', date: '2026-07-11', time: '오후 2:18', tail: true },
  { id: 'm105', from: 'me', authorId: 'me', text: '앤톤이가 아니라면 아닌 거겠지이', date: '2026-07-11', time: '오후 2:18', tail: false },
  { id: 'm106', from: 'me', authorId: 'me', text: '근데 앤톤아 형 생각 정리 좀 하게 일주일만 연락하지 말아줄 수 있을까? 미안 ㅎㅎ', date: '2026-07-11', time: '오후 2:18', tail: false },
  { id: 'm107', from: 'other', authorId: 'antony', text: '그럼 전화 한번만 받으면 안될까요?', date: '2026-07-11', time: '오후 2:20', tail: true },
  { id: 'm108', from: 'other', authorId: 'antony', text: '성찬이형', date: '2026-07-11', time: '오후 2:20', tail: false },
  { id: 'm109', from: 'other', authorId: 'antony', text: '형..', date: '2026-07-11', time: '오후 2:20', tail: false },
  { id: 'm110', from: 'other', authorId: 'antony', text: '아', date: '2026-07-11', time: '오후 2:20', tail: false },
  { id: 'm111', from: 'me', authorId: 'me', text: '거기 새벽 아니야? 얼른 자 앤톤아 피곤하겠다 ㅎㅎ', date: '2026-07-11', time: '오후 2:34', tail: true },
  { id: 'm112', from: 'other', authorId: 'antony', text: '잠이 안 와요 하하', date: '2026-07-11', time: '오후 2:34', tail: true },
  { id: 'm113', from: 'other', authorId: 'antony', text: '못 자겠네요..', date: '2026-07-11', time: '오후 2:34', tail: false },
  { id: 'm114', from: 'other', authorId: 'antony', text: '형은 저 믿어줘야 하는 거 아닌가요..', date: '2026-07-11', time: '오후 2:34', tail: false },
  { id: 'm115', from: 'me', authorId: 'me', text: '형은 너 믿는다니까', date: '2026-07-11', time: '오후 4:51', tail: true },
  { id: 'm116', from: 'me', authorId: 'me', text: '지금은 자겠네 잘 자 앤톤아', date: '2026-07-11', time: '오후 4:51', tail: false },
  { id: 'm117', from: 'other', authorId: 'antony', text: '아니ㅣ', date: '2026-07-11', time: '오후 8:02', tail: true },
  { id: 'm118', from: 'other', authorId: 'antony', text: '성찬이형', date: '2026-07-11', time: '오후 10:13', tail: true },
  { id: 'm119', from: 'other', authorId: 'antony', text: '저 한국 가는 비행기 가장 빠른 거로 예매했어요', date: '2026-07-11', time: '오후 10:13', tail: false },
  { id: 'm120', from: 'other', authorId: 'antony', text: '연락 보면 답장 줘요 하하..', date: '2026-07-11', time: '오후 10:14', tail: true },
  { id: 'm121', from: 'other', authorId: 'antony', text: '저 한국 기준으로 14일 새벽 비행기네요 14일 네 시에 도착해요 ㅎㅎ', date: '2026-07-11', time: '오후 10:14', tail: false },

   // 7월 12일
    { id: 'm122', from: 'other', authorId: 'antony', text: '성찬이형', date: '2026-07-12', time: '오후 11:54', tail: true },
    { id: 'm123', from: 'other', authorId: 'antony', text: '봤을 거라고 믿을게요 :)', date: '2026-07-12', time: '오후 11:54', tail: true },
  

  // 7월 13일
    { id: 'm124', from: 'me', authorId: 'me', text: '앤톤 바쁜 거 아니야?', date: '2026-07-13', time: '오전 10:01', tail: true },
    { id: 'm125', from: 'me', authorId: 'me', text: '형 믿는다니까 왜 한국을 와ㅏㅏ', date: '2026-07-13', time: '오전 10:01', tail: false },
    { id: 'm126', from: 'me', authorId: 'me', text: '일정은 어떻게 하구', date: '2026-07-13', time: '오전 10:02', tail: false },
    { id: 'm127', from: 'other', authorId: 'antony', text: '믿는데 전화는 왜 안 받나요 😵', date: '2026-07-13', time: '오전 11:21', tail: true },
    { id: 'm128', from: 'other', authorId: 'antony', text: '코치님도 허락하셨어요 ㅎ ', date: '2026-07-13', time: '오전 11:21', tail: false },
    { id: 'm129', from: 'other', authorId: 'antony', text: '형이 마중 나와줄거란 기대는 언 해요 ', date: '2026-07-13', time: '오후 3:54', tail: true },
    { id: 'm130', from: 'me', authorId: 'me', text: '그랭', date: '2026-07-13', time: '오후 11:48', tail: true },
    { id: 'm130', from: 'me', authorId: 'me', text: '조심히 와 앤톤아', date: '2026-07-13', time: '오후 11:48', tail: false },
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
      { id: 'f3', from: 'me', text: '저도 갈게요 몇 시에 모이면 될까요?', date: '2026-10-20', time: '오후 6:31', tail: true },
      { id: 'f4', from: 'other', authorId: 'football-guest-2', text: '내일 오후 2시에 운동장에서 봐요!', date: '2026-10-21', time: '오전 8:42', tail: true },
      { id: 'f5', from: 'other', authorId: 'football-guest-2', text: '다들 내일 시간 되십니까?', date: '2026-10-21', time: '오전 8:45', tail: true },
      { id: 'f6', from: 'me', text: '네 확인했습니다!', date: '2026-10-21', time: '오전 8:48', tail: true },

      // --- 확장 메시지 ---
      { id: 'f7', from: 'other', authorId: 'football-guest-3', text: '저도 참석합니다! 풋살화 챙겨갈게요', date: '2026-10-21', time: '오전 9:10', tail: true },
      { id: 'f8', from: 'other', authorId: 'football-guest-4', text: '이번 주 상의 유니폼 빨간색 맞죠?', date: '2026-10-21', time: '오전 9:30', tail: true },
      { id: 'f9', from: 'other', authorId: 'friend-4', text: '네 홈 유니폼(빨간색)으로 가져오시면 됩니다!', date: '2026-10-21', time: '오전 9:45', tail: false },
      { id: 'f10', from: 'other', authorId: 'friend-4', text: '혹시 조끼 챙겨올 분 있으신가요?', date: '2026-10-21', time: '오전 9:46', tail: true },
      { id: 'f11', from: 'other', authorId: 'football-guest-5', text: '제가 집에 조끼 세트 있으니까 가져갈게요~', date: '2026-10-21', time: '오전 10:12', tail: true },
      { id: 'f12', from: 'other', authorId: 'football-guest-6', text: '저 이번에 새로 들어온 윤태민입니다. 잘 부탁드립니다!', date: '2026-10-21', time: '오전 11:00', tail: true },
      { id: 'f13', from: 'me', text: '태민님 환영합니다! 내일 봬요 ㅎㅎ', date: '2026-10-21', time: '오전 11:15', tail: true },
      { id: 'f14', from: 'other', authorId: 'football-guest-7', text: '오 태민씨 반가워요! 내일 시원하게 한 판 뛰죠', date: '2026-10-21', time: '오전 11:30', tail: true },
      { id: 'f15', from: 'other', authorId: 'football-guest-8', text: '혹시 공 부족하면 제가 2개 더 챙겨갈게요', date: '2026-10-21', time: '오후 1:20', tail: true },
      { id: 'f16', from: 'other', authorId: 'friend-4', text: '지훈이 공 고맙다! 총 14명 확인됐고 팀은 내일 현장에서 제비뽑기로 정하겠습니다', date: '2026-10-21', time: '오후 2:00', tail: true },
      { id: 'f17', from: 'other', authorId: 'football-guest-9', text: '내일 날씨 좋다네요 굳굳', date: '2026-10-21', time: '오후 4:15', tail: true },
      { id: 'f18', from: 'other', authorId: 'football-guest-10', text: '저 살짝 늦을 수도 있는데 2시 10분까진 갈게요 ㅠㅠ', date: '2026-10-21', time: '오후 5:30', tail: true },
      { id: 'f19', from: 'other', authorId: 'friend-4', text: '응 늦지 않게 조심히 오렴', date: '2026-10-21', time: '오후 5:35', tail: true },

      // --- 경기 당일 (2026-10-22) ---
      { id: 'f20', from: 'me', text: '저 죄송하지만 오늘 못 갈 것 같습니다 ㅠㅠ 다른 일정이 생겨서 그쪽 좀 가야할 것 같네요... 다음에 같이 뛰어요', date: '2026-10-22', time: '오후 1:18', tail: true },
      { id: 'f21', from: 'other', authorId: 'friend-4', text: '아 성찬이가 있어야 하는데 아쉽게 됐네', date: '2026-10-22', time: '오후 1:20', tail: true },
      { id: 'f22', from: 'other', authorId: 'football-guest-11', text: '어쩔수없죠 다음에 같이 뛰어요', date: '2026-10-22', time: '오후 1:21', tail: true },
      { id: 'f23', from: 'other', authorId: 'football-guest-12', text: '성찬이형이 풋살을 마다한다? 이거 뭐 큰일같은데~~~', date: '2026-10-22', time: '오후 1:22', tail: false },
      { id: 'f24', from: 'other', authorId: 'football-guest-12', text: '여자죠? 여자 같애', date: '2026-10-22', time: '오후 1:22', tail: true },
      { id: 'f25', from: 'me', text: 'ㅋㅋㅋㅋ 나중에 말씀 드릴게요', date: '2026-10-22', time: '오후 1:23', tail: true },
      { id: 'f26', from: 'other', authorId: 'friend-4', text: '오케이 다음번에는 같이 하자', date: '2026-10-22', time: '오후 1:26', tail: true },
      { id: 'f27', from: 'other', authorId: 'football-guest-12', text: '오늘 다들 수고 많으셨습니다! 진짜 재밌었네요 ㅋㅋ', date: '2026-10-22', time: '오후 5:10', tail: true },
      { id: 'f28', from: 'other', authorId: 'football-guest-13', text: '오늘 태민님 중거리슛 대박이었음👍', date: '2026-10-22', time: '오후 5:25', tail: true },
      { id: 'f29', from: 'other', authorId: 'football-guest-6', text: '아 아닙니다 운이 좋았습니다 ㅎㅎ 다들 잘 챙겨주셔서 감사합니다!', date: '2026-10-22', time: '오후 5:30', tail: true },
      { id: 'f30', from: 'other', authorId: 'friend-4', text: '오늘 다들 고생 많았다! 회식 장소는 근처 삼겹살집으로 정했습니다', date: '2026-10-22', time: '오후 6:00', tail: true },
      { id: 'f31', from: 'other', authorId: 'friend-4', text: '6시까지 다들 오세요!', date: '2026-10-22', time: '오후 6:01', tail: true },
      { id: 'f32', from: 'other', authorId: 'football-guest-14', text: '오늘 회식 못 가서 아쉽네요 ㅠㅠ 다음엔 꼭 갈게요', date: '2026-10-22', time: '오후 6:20', tail: true },
  ],
  'shotaro-group': [ 
      { id: 's1', from: 'other', authorId: 'shotaro', text: '다들 모해', date: '2026-04-11', time: '오후 2:10', tail: true },
    { id: 's2', from: 'me', photo: true, photoUrl: '/shongton.png', date: '2026-04-11', time: '오후 2:11', tail: true },
    { id: 's3', from: 'other', authorId: 'sohee', text: '갑자기 카톡할 마음 뚝 떨어짐', date: '2026-04-11', time: '오후 2:12', tail: true },
    { id: 's4', from: 'other', authorId: 'shotaro', text: 'ㅋㅋ 찬영 잘 지내?', date: '2026-04-11', time: '오후 2:13', tail: true },
    { id: 's5', from: 'other', authorId: 'wonbin', text: '꿀 뚝뚝이던데', date: '2026-04-11', time: '오후 2:15', tail: true },
    { id: 's6', from: 'me', text: '타로 형... 찬영이 6월에 미국 가서 내년에 온대요 ㅠㅠ', date: '2026-04-11', time: '오후 2:19', tail: true },
    { id: 's7', from: 'other', authorId: 'eunseok', text: '오우 반년을 못 보네', date: '2026-04-11', time: '오후 2:20', tail: true },
    { id: 's8', from: 'other', authorId: 'sohee', text: '성찬이형 분리불안 올듯요', date: '2026-04-11', time: '오후 2:22', tail: true },
    // { id: 's9', from: 'other', authorId: 'chanyoung', text: 'ㅋㅋㅋㅋ 시험 끝나고 다 같이 맛있는 거 먹으러 가요', date: '2026-04-18', time: '오후 9:30', tail: true },

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
