/* ===================== 설정 ===================== */
export const TITLE = '성차니형바보'   // 맨 위 제목
export const YEAR = 2026
export const FIRST_MONTH = 5         // 달력은 4월부터
export const LAST_MONTH = 7        // 10월까지

/* 프로필 이미지 링크 설정 (경로 또는 웹 URL) */
export const FRIEND_AVATAR_URL = '/setlog/profileton.png'
export const MY_AVATAR_URL = '/setlog/profilechan.png'

export interface SingleLog {
    time: string;
    caption?: string;
    bg?: string;
    videoUrl?: string;
}

export interface TimeSlotData {
    month: number;
    day: number;
    time: string;
    friendLog?: SingleLog;
    myLog?: SingleLog;
    meComment?: string;
    friendComment?: string;
}

/* ===================== 날짜별/시간대별 고유 데이터 ===================== */
export const TIME_SLOTS: TimeSlotData[] = [
    /* ----------------- 5월 25일 (하루 여러 시간대 데이터) ----------------- */
    {
        month: 5, day: 25, time: '08:00',
        friendLog: { time: '08:00', caption: '형 저 오늘 늦게 들어가용ㅇ :)', videoUrl: '/setlog/ton1.mp4' },
        friendComment: '아ㅏㅏ 왜~ ㅠㅠ',
        myLog: { time: '08:00', bg: '#e4e4e4' }
    },
    {
        month: 5, day: 25, time: '11:00',
        friendLog: { time: '11:00', caption: '사실 거짓말이에요 ^^;', videoUrl: '/setlog/ton17.mp4'},
        friendComment: '귀엽네 보고 싶어~~',
        myLog: { time: '11:00', caption: '학교 간다', videoUrl: '/setlog/shong9.mp4'},
        meComment: '저 있는 곳 오네요',
    },
    {
        month: 5, day: 25, time: '15:00',
        friendLog: { time: '15:00', bg: '#e4e4e4' },
        myLog: { time: '15:00', caption: '배고프다', videoUrl: '/setlog/rabbit.mp4' },
    },
    {
        month: 5, day: 25, time: '16:00',
        friendLog: { time: '16:00', bg: '#e4e4e4' },
        myLog: { time: '16:00', caption: '찬영이 연습 그만', videoUrl: '/setlog/shong7.mp4' },
        meComment: 'ㅋㅋㅋ'
    },
    {
        month: 5, day: 25, time: '18:00',
        friendLog: { time: '18:00', caption: '집 가용', videoUrl: '/setlog/ton11.mp4' },
        friendComment: '얼른 와 오늘 저녁은~',
        myLog: { time: '18:00', bg: '#e4e4e4' },
    },
    {
        month: 5, day: 25, time: '21:00',
        friendLog: { time: '21:00', caption: '형 얼른 나와요', videoUrl: '/setlog/ton4.mp4' },
        myLog: { time: '21:00',  bg: '#e4e4e4'},
        friendComment: '형 보고 싶어?'
    },

    /* ----------------- 5월 26일 ----------------- */
    {
        month: 5, day: 26, time: '05:00',
        friendLog: { time: '05:00', caption: '연습 갈게요 😪', videoUrl: '/setlog/ton13.mp4' },
        myLog: { time: '05:00',  bg: '#e4e4e4'},
        friendComment :'찬영이 안 피곤해?'
    },
    {
        month: 5, day: 26, time: '11:00',
        friendLog: { time: '11:00',  bg: '#e4e4e4'},
        myLog: { time: '11:00', caption: '수영하는 앤토니의 모오습', videoUrl: '/setlog/swim15.mp4'},
    },
    {
        month: 5, day: 26, time: '12:00',
        friendLog: { time: '12:00',  bg: '#e4e4e4'},
        myLog: { time: '12:00', caption: '그만하고 밥 먹으러 가자ㅏㅏ', videoUrl: '/setlog/swim14.mp4'},
        meComment :'ㅋㅋㅋ'
    },
    {
        month: 5, day: 26, time: '13:00',
        friendLog: { time: '13:00',  caption: '결국 밥 먹으러 나온 우리의 모오습', videoUrl: '/setlog/shongton4.mp4' },
        myLog: { time: '13:00',  caption: '아 배부르다', videoUrl: '/setlog/shongton5.mp4'},
        meComment :'펌핑펑핑'
    },
    {
        month: 5, day: 26, time: '17:00',
        friendLog: { time: '17:00',  bg: '#e4e4e4'},
        myLog: { time: '17:00',   caption: '운동 많이 된다', videoUrl: '/setlog/background5.mp4'}
    },
    {
        month: 5, day: 26, time: '19:00',
        friendLog: { time: '19:00', caption: '그만해요', videoUrl: '/setlog/shong10.mp4'},
        friendComment :'귀여워',
        myLog: { time: '19:00', caption: '집 가자ㅏ', videoUrl: '/setlog/shongton13.mp4'}
    },
        /* ----------------- 5월 27일 ----------------- */
    {
        month: 5, day: 27, time: '9:00',
        friendLog: { time: '09:00', caption: '성찬이형 공강 좋네요', videoUrl: '/setlog/shongton6.mp4' },
        friendComment :'난 분명 데이트를 하자고 했는데',
        myLog:  { time: '09:00', caption: '귀여워', videoUrl: '/setlog/swim8.mp4' },
        meComment :'뭐야ㅑ 언제 찍었어요? ㅋㅋ'
    },
    {
        month: 5, day: 27, time: '12:00',
        friendLog: { time: '12:00',  bg: '#e4e4e4'},
        myLog: { time: '12:00', caption: '행복해 보이네', videoUrl: '/setlog/swim3.mp4'},
    },
    {
        month: 5, day: 27, time: '14:00',
        friendLog: { time: '14:00',  caption: '배고프다 🫠', videoUrl: '/setlog/food2.mp4'},
        myLog: { time: '14:00', caption: '푸파 가능', videoUrl: '/setlog/shongton2.mp4'},
    },
    {
        month: 5, day: 27, time: '15:00',
        friendLog: { time: '15:00',  caption: '씻고 나왔어요', videoUrl: '/setlog/background2.mp4' },
        myLog: { time: '15:00',  bg: '#e4e4e4'},
    },
    {
        month: 5, day: 27, time: '17:00',
        friendLog: { time: '17:00',  caption: '아까까지 날씨 좋았는데', videoUrl: '/setlog/ton2.mp4' },
        myLog: { time: '17:00',   caption: '천사야', videoUrl: '/setlog/ton3.mp4'}
    },
    {
        month: 5, day: 27, time: '19:00',
        friendLog: { time: '19:00',  caption: '형 잘 먹을게용ㅇ 😍', videoUrl: '/setlog/food1.mp4' },
        myLog: { time: '19:00',   caption: '맛있게 먹겠습니다', videoUrl: '/setlog/ton0.mp4'},
        meComment :'네?'
    },
    /* ----------------- 5월 28일 ----------------- */
    {
        month: 5, day: 28, time: '10:00',
        friendLog: { time: '10:00',  bg: '#e4e4e4'},
        myLog: { time: '10:00', caption: '이상하다 천사가 왜 수영을 하고 있지 새벽에 분명 힘들다고 했던 것 같은데 ㅠㅠ', videoUrl: '/setlog/swim13.mp4'},
        meComment :'👅'
    },
    {
        month: 5, day: 28, time: '19:00',
        friendLog: { time: '19:00', caption: '호두과자', videoUrl: '/setlog/background1.mp4' },
        myLog:  { time: '19:00', caption: '집 가자', videoUrl: '/setlog/shongton1.mp4' },
    },
    /* ----------------- 5월 29일 ----------------- */
    {
        month: 5, day: 29, time: '5:00',
        friendLog: { time: '5:00', caption: '연습 왔어요 현실복기 🥲', videoUrl: '/setlog/ton33.mp4' },
        friendComment :'ㅋㅋㅋ 복귀',
        myLog: { time: '5:00',  bg: '#e4e4e4'},
    },
    {
        month: 5, day: 29, time: '10:00',
        friendLog: { time: '10:00', caption: '코치님이 찍어줬어요 :)', videoUrl: '/setlog/swim9.mp4' },
        friendComment :'인어 같네 ㅎㅎ',
        myLog:  { time: '10:00', caption: '먹고 나가야징', videoUrl: '/setlog/shong29.mp4' },
        meComment :'뭐에요?'
    },
        {
        month: 5, day: 29, time: '13:00',
        friendLog: { time: '13:00',  bg: '#e4e4e4'},
        myLog:  { time: '13:00', caption: '찬영이도 밥 먹어', videoUrl: '/setlog/shong30.mp4' },
        meComment :'배고파요'
    },
    {
        month: 5, day: 29, time: '16:00',
        friendLog: { time: '16:00', caption: '형 저 끝났어요 바로 집으로 갈게요', videoUrl: '/setlog/ton26.mp4' },
        myLog:  { time: '16:00', caption: '교수가 뭐라는지 하나도 모르겠고 그냥 천사 보고 싶다 ㅠ.ㅠ', videoUrl: '/setlog/shong31.mp4' },
        meComment :'집에서 봐용 ㅎㅎ'
    },
    {
        month: 5, day: 29, time: '17:00',
        friendLog: { time: '17:00', caption: '집 도착 ㅎㅎ', videoUrl: '/setlog/ton14.mp4' },
        friendComment :'이것뭐에요',
        myLog:  { time: '17:00', caption: '제발지옥같은여기서날꺼내줘', videoUrl: '/setlog/shong28.mp4' },
        meComment :'ㅋㅋㅋ'
    },
    {
        month: 5, day: 29, time: '19:00',
        myLog:  { time: '19:00', caption: '천당 도착', videoUrl: '/setlog/shongton10.mp4' },
    },

    /* ----------------- 5월 30일 ----------------- */
    {
        month: 5, day: 30, time: '9:00',
        friendLog: { time: '9:00', caption: '마지막 데이트네요 :)', videoUrl: '/setlog/shong18.mp4' },
        myLog:  { time: '9:00', caption: '우리 지금 이렇게 신나는데 마지막이라고?', videoUrl: '/setlog/shong17.mp4' },
    },
    {
        month: 5, day: 30, time: '10:00',
        friendLog: { time: '10:00', caption: '준비 끝 ㅎㅎ', videoUrl: '/setlog/ton45.mp4' },
        myLog: { time: '10:00', bg: '#e4e4e4'}
    },
        {
        month: 5, day: 30, time: '13:00',   
        friendLog: { time: '13:00', caption: '🍚', videoUrl: '/setlog/shong16.mp4' },
        friendComment :'아 맞다 먹느라 셋로그 못 찍었네',
        myLog: { time: '10:00', bg: '#e4e4e4'}
    },
    {
        month: 5, day: 30, time: '16:00',
        friendLog: { time: '16:00', caption: '잘생겼네요', videoUrl: '/setlog/shong11.mp4' },
         myLog:  { time: '16:00', caption: '성찬이형메롱', videoUrl: '/setlog/shongton9.mp4' },
    },
    {
        month: 5, day: 30, time: '19:00',
        friendLog: { time: '19:00', caption: '🕺🏻🪇', videoUrl: '/setlog/background7.mp4' },
        myLog:  { time: '19:00', caption: '귀엽네', videoUrl: '/setlog/ton35.mp4' },
    },
    {
        month: 5, day: 30, time: '20:00',
        friendLog: { time: '20:00', caption: '🎶🎤🧑🏻‍🎤', videoUrl: '/setlog/background6.mp4' },
        myLog:  { time: '20:00', caption: '신났어', videoUrl: '/setlog/ton32.mp4' },
    },
    {
        month: 5, day: 30, time: '21:00',
        friendLog: { time: '21:00', caption: '뻗었대요', videoUrl: '/setlog/shong23.mp4' },
        friendComment :'ㅋㅋㅋ 곧 살아날 예정',
        myLog:  { time: '21:00', caption: '앤토나 얼른 씻고 나와', videoUrl: '/setlog/ton22.mp4' },
    },
    {
        month: 5, day: 30, time: '22:00',
        friendLog: { time: '21:00', caption: '얼른 씻어요', videoUrl: '/setlog/shong22.mp4' },
        myLog:  { time: '21:00', caption: '와 천사가 형 꼬시네', videoUrl: '/setlog/ton39.mp4' },
        meComment :'얼른 씻어요 😵',
    },

        /* ----------------- 5월 31일 ----------------- */
    {
        month: 5, day: 31, time: '10:00',
        friendLog: { time: '10:00', bg: '#e4e4e4'},
        myLog:  { time: '10:00', caption: '사랑해', videoUrl: '/setlog/ton42.mp4' },
    },
    {
        month: 5, day: 31, time: '12:00',
        friendLog: { time: '10:00', bg: '#e4e4e4'},
        myLog: { time: '12:00', caption: '아직 아가 맞네', videoUrl: '/setlog/ton40.mp4' }
    },
    {
        month: 5, day: 31, time: '13:00',   
        friendLog: { time: '13:00', caption: '액티비티 good 🤗', videoUrl: '/setlog/ton23.mp4'},
        myLog: { time: '10:00', bg: '#e4e4e4'}
    },
    {
        month: 5, day: 31, time: '16:00',
        friendLog: { time: '16:00', bg: '#e4e4e4'},
        myLog: { time: '16:00', caption: '가기 싫지?', videoUrl: '/setlog/ton25.mp4' }
    },
    {
        month: 5, day: 31, time: '19:00',
        friendLog: { time: '19:00', caption: 'go home', videoUrl: '/setlog/shong37.mp4' },
        myLog:  { time: '19:00', caption: '이제는더이상물러날곳이없다', videoUrl: '/setlog/shongton15.mp4' },
    },
    {
        month: 5, day: 31, time: '20:00',
        friendLog: { time: '20:00', caption: '🏠', videoUrl: '/setlog/ton38.mp4' },
        myLog:  { time: '20:00', caption: '아직도 택시', videoUrl: '/setlog/shongton16.mp4' },
    },
    {
        month: 5, day: 31, time: '23:00',
        friendLog: { time: '23:00', caption: '형 처음으로 6개월 넘게 떨어져 있을 것 같네요.. :( 시차도 14시간 정도 차이나는데, 연락 잘할게요. 🥲 잘 자요.. LOVE YOU ㅎㅎ', videoUrl: '/setlog/ton9.mp4' },
        friendComment: '가지말라고 할 수도 없고 ㅜ',
        myLog: { time: '16:00', bg: '#e4e4e4'},
    },
    /* ----------------- 6월 1일 ----------------- */
    {
        month: 6, day: 1, time: '9:00',
        friendLog: { time: '9:00', caption: '갈게요 ㅎㅎ', videoUrl: '/setlog/tonairport.mp4'},
        friendComment:'가지마',
        myLog: { time: '9:00', bg: '#e4e4e4'}
    },
    {
        month: 6, day: 1, time: '18:00',
        friendLog: { time: '18:00', bg: '#e4e4e4'},
        myLog:  {time: '18:00', caption: 'ㅋㅋㅋ 천사 스무살 형 스물세살 때다', videoUrl: '/setlog/shongton7.mp4'},
        meComment :'ㅋㅋ 화질 뭐예요 🤪',
    },
    /* ----------------- 6월 2일 ----------------- */
    {
        month: 6, day: 2, time: '4:00',
        friendLog:  {time: '4:00', caption: '숙소 도착 말랑이 타임 ^^ㅋ 형 자겠다 😴', videoUrl: '/setlog/ton41.mp4'},
        myLog: { time: '4:00', bg: '#e4e4e4'},
        friendComment :'천사 피곤해 보이네',
    },
    {
        month: 6, day: 2, time: '10:00',
        friendLog:  {time: '10:00', caption: '오자마자 행사 다녀왔네요..', videoUrl: '/setlog/ton24.mp4'},
        myLog: { time: '10:00', caption: '형은 양치 중 거기 오후 9시더라', videoUrl: '/setlog/shong32.mp4'},
        friendComment :'기사 봤어 보고 싶다~~ㅜ',
        meComment :'맞아요 시차 🙃',
    },
    /* ----------------- 6월 3일 ----------------- */
    {
        month: 6, day: 3, time: '11:00',
        friendLog:  {time: '11:00', caption: '🥖🥖🥖', videoUrl: '/setlog/ton31.mp4'},
        myLog: { time: '11:00', bg: '#e4e4e4'},
    },
    {
        month: 6, day: 3, time: '14:00',
        friendLog:  { time: '14:00', bg: '#e4e4e4'},
        myLog: { time: '14:00', caption: '스크린 데뷔', videoUrl: '/setlog/shong1.mp4'},
        meComment :'뭐에요? 형 어디 나오나요?',
    },
    /* ----------------- 6월 4일 ----------------- */
    {
        month: 6, day: 4, time: '10:00',
        myLog:  { time: '10:00', bg: '#e4e4e4'},
        friendLog: { time: '10:00', caption: '감사한 일들이 많이 생기네요 :)', videoUrl: '/setlog/ton10.mp4'},
        friendComment :'아 형이 옆에 있어야 하는데 ㅜ',
    },
    {
        month: 6, day: 4, time: '19:00',
        friendLog:  { time: '19:00', bg: '#e4e4e4'},
        myLog: { time: '19:00', caption: '형 지금 어디게', videoUrl: '/setlog/background.mp4'},
    },
    {
        month: 6, day: 4, time: '23:00',
        friendLog:  { time: '23:00', bg: '#e4e4e4'},
        myLog: { time: '23:00', caption: '잘 자 천사야', videoUrl: '/setlog/shong33.mp4'},
    },

    /* ----------------- 6월 8일 ----------------- */
    {
        month: 6, day: 8, time: '4:00',
        myLog:  { time: '4:00', bg: '#e4e4e4'},
        friendLog: { time: '4:00', caption: '형 제 화보 사야돼요', videoUrl: '/setlog/tonbo.mp4'},
    },
    {
        month: 6, day: 8, time: '16:00',
        friendLog:  { time: '16:00', bg: '#e4e4e4'},
        myLog: { time: '16:00', caption: '찍어줄 천사 없어서 송은석한테 부탁함', videoUrl: '/setlog/shong8.mp4'},
        meComment :'ㅋㅋㅋ'
    },
    {
        month: 6, day: 8, time: '21:00',
        friendLog:  { time: '21:00', bg: '#e4e4e4'},
        myLog: { time: '21 :00', caption: '찬영아 얘 막 그냥 훌렁 벗는다 여기 여자 있는데', videoUrl: '/setlog/shong21.mp4'},
        meComment :'성찬이형 여자한테 관심 없어서 괜찮아요 :)'
    },

       /* ----------------- 6월 9일 ----------------- */
    {
        month: 6, day: 9, time: '13:00',
        friendLog: { time: '13:00', caption: '형 제가 신경 안 쓰는건 맞는데, 그래도 일찍은 들어가줘요.. ;( 술 마시지 말구요. ㅋ', videoUrl: '/setlog/ton15.mp4'},
        friendComment :'우리 앤토니 괜찮다는 말 다 거짓말이었네~',
        myLog: { time: '13:00', caption: '이찬영아 너 얼른 와서 밥 좀 같이 먹어줘라 감당 불가임', videoUrl: '/setlog/shong4.mp4'},
        meComment :'ㅋㅋ 귀엽네요 ^^'
    },
    {
        month: 6, day: 9, time: '20:00',
        friendLog:  { time: '20:00', bg: '#e4e4e4'},
        myLog: { time: '20:00', caption: '형 탈색했어', videoUrl: '/setlog/shong19.mp4'},
        meComment :'😮😮😮 잘 어울려요'
    },
    {
        month: 6, day: 9, time: '22:00',
        myLog:  { time: '22:00', bg: '#e4e4e4'},
        friendLog: { time: '22:00', caption: '연습 중이에요 🏊🏻‍♂️', videoUrl: '/setlog/swim7.mp4'},
        friendComment :'부지런하네'
    },

       /* ----------------- 6월 13일 ----------------- */
    {
        month: 6, day: 13, time: '11:00',
        friendLog:  { time: '11:00', bg: '#e4e4e4'},
        myLog: { time: '11:00', caption: '야 찬영아 정성찬이 또 정성찬 했다', videoUrl: '/setlog/shong27.mp4'},
        meComment :'또 뭐 흘렸죠. ㅋ'
    },
    {
        month: 6, day: 13, time: '23:00',
        friendLog:  { time: '23:00', bg: '#e4e4e4'},
        myLog: { time: '23:00', caption: '잘 자 천사야', videoUrl: '/setlog/shong33.mp4'},
    },

    /* ----------------- 8월 ----------------- */
        {
        month: 7, day: 3, time: '14:00',
        friendLog:  { time: '14:00', bg: '#e4e4e4'},
        myLog: { time: '14:00', caption: '스크린 데뷔', videoUrl: '/setlog/shong1.mp4'},
        meComment :'뭐에요? 형 어디 나오나요?',
    },

    /* ----------------- 7월 ----------------- */
    {
        month: 7, day: 10, time: '10:00',
        friendLog: { time: '11:00', caption: '성차니 형 저 파티 왔어요 ㅎㅎ', videoUrl: '/setlog/ton27.mp4' },
        friendComment : '오랜만에 셋로그 뭐야ㅏ',
        myLog: { time: '11:00', bg: '#e4e4e4'},
    },
    {
        month: 7, day: 10, time: '11:00',
        friendLog: { time: '12:00', caption: 'I miss you 😬', videoUrl: '/setlog/ton28.mp4' },
        friendComment : '형도 보고 싶어',
        myLog: { time: '12:00', bg: '#e4e4e4'},
    },
    {
        month: 7, day: 10, time: '14:00',
        friendLog: { time: '15:00', caption: 'yeah-!!', videoUrl: '/setlog/ton29.mp4' },
        friendComment : '거기 새벽 한 시 아니야?',
        myLog: { time: '13:00', bg: '#e4e4e4'},
    },
    {
        month: 7, day: 10, time: '15:00',
        friendLog: { time: '16:00', caption: '우아ㅏ 저 잘생겼대요 :D', videoUrl: '/setlog/ton30.mp4' },
        friendComment : '하 찬영아 술 깨면 연락해',
        myLog: { time: '15:00', bg: '#e4e4e4'},
    }
]

export const FRIEND_NAME = '엥똔'
export const MY_NAME = '성찬'


/* ===================== 조회 함수 ===================== */
/** 특정 날짜에 등록된 시간대 목록 */
export const getSlotsOfDay = (month: number, day: number): TimeSlotData[] =>
    TIME_SLOTS.filter((slot) => slot.month === month && slot.day === day)

/** 한 사람이라도 업로드한 날인지 (달력 스마일 표시용) */
export const hasUploadOnDay = (month: number, day: number): boolean =>
    getSlotsOfDay(month, day).some((slot) => slot.friendLog || slot.myLog)