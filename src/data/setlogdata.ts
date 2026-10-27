/* ===================== 설정 ===================== */
export const TITLE = '성차니형바보'   // 맨 위 제목
export const YEAR = 2026
export const FIRST_MONTH = 4         // 달력은 4월부터
export const LAST_MONTH = 10         // 10월까지

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
    /* ----------------- 4월 27일 (하루 여러 시간대 데이터) ----------------- */
    {
        month: 4, day: 27, time: '08:00',
        friendLog: { time: '08:00', caption: '형 저 오늘 늦게 들어가용ㅇ :)', videoUrl: '/setlog/ton1.mp4' },
        friendComment: '아ㅏㅏ 왜~ ㅠㅠ',
        myLog: { time: '08:00', bg: '#e4e4e4' }
    },
    {
        month: 4, day: 27, time: '11:00',
        friendLog: { time: '11:00', caption: '사실 거짓말이에요 ^^;', videoUrl: '/setlog/ton17.mp4'},
        friendComment: '귀엽네 보고 싶어~~',
        myLog: { time: '11:00', caption: '학교 간다', videoUrl: '/setlog/shong9.mp4'},
        meComment: '저 있는 곳 오네요',
    },
    {
        month: 4, day: 27, time: '15:00',
        friendLog: { time: '15:00', bg: '#e4e4e4' },
        myLog: { time: '15:00', caption: '배고프다', videoUrl: '/setlog/rabbit.mp4' },
    },
    {
        month: 4, day: 27, time: '16:00',
        friendLog: { time: '16:00', bg: '#e4e4e4' },
        myLog: { time: '16:00', caption: '찬영이 연습 그만', videoUrl: '/setlog/shong7.mp4' },
        meComment: 'ㅋㅋㅋ'
    },
    {
        month: 4, day: 27, time: '18:00',
        friendLog: { time: '18:00', caption: '집 가용', videoUrl: '/setlog/ton11.mp4' },
        friendComment: '얼른 와 오늘 저녁은~',
        myLog: { time: '18:00', bg: '#e4e4e4' },
    },
    {
        month: 4, day: 27, time: '21:00',
        friendLog: { time: '21:00', caption: '형 얼른 나와요', videoUrl: '/setlog/ton4.mp4' },
        myLog: { time: '21:00',  bg: '#e4e4e4'},
        friendComment: '형 보고 싶어?'
    },

    /* ----------------- 4월 28일 ----------------- */
    {
        month: 4, day: 28, time: '05:00',
        friendLog: { time: '05:00', caption: '연습 갈게요 😪', videoUrl: '/setlog/ton13.mp4' },
        myLog: { time: '05:00',  bg: '#e4e4e4'},
        friendComment :'찬영이 안 피곤해?'
    },
    {
        month: 4, day: 28, time: '11:00',
        friendLog: { time: '11:00',  bg: '#e4e4e4'},
        myLog: { time: '11:00', caption: '수영하는 앤토니의 모오습', videoUrl: '/setlog/swim15.mp4'},
    },
    {
        month: 4, day: 28, time: '12:00',
        friendLog: { time: '12:00',  bg: '#e4e4e4'},
        myLog: { time: '12:00', caption: '그만하고 밥 먹으러 가자ㅏㅏ', videoUrl: '/setlog/swim14.mp4'},
        meComment :'ㅋㅋㅋ'
    },
    {
        month: 4, day: 28, time: '13:00',
        friendLog: { time: '13:00',  caption: '결국 밥 먹으러 나온 우리의 모오습', videoUrl: '/setlog/shongton4.mp4' },
        myLog: { time: '13:00',  caption: '아 배부르다', videoUrl: '/setlog/shongton5.mp4'},
        meComment :'펌핑펑핑'
    },
    {
        month: 4, day: 28, time: '17:00',
        friendLog: { time: '17:00',  bg: '#e4e4e4'},
        myLog: { time: '17:00',   caption: '운동 많이 된다', videoUrl: '/setlog/background5.mp4'}
    },
    {
        month: 4, day: 28, time: '19:00',
        friendLog: { time: '19:00', caption: '그만해요', videoUrl: '/setlog/shong10.mp4'},
        friendComment :'귀여워',
        myLog: { time: '19:00', caption: '집 가자ㅏ', videoUrl: '/setlog/shongton13.mp4'}
    },
        /* ----------------- 4월 29일 ----------------- */
    {
        month: 4, day: 29, time: '9:00',
        friendLog: { time: '09:00', caption: '성찬이형 공강 좋네요', videoUrl: '/setlog/shongton6.mp4' },
        friendComment :'난 분명 데이트를 하자고 했는데',
        myLog:  { time: '09:00', caption: '귀여워', videoUrl: '/setlog/swim8.mp4' },
        meComment :'뭐야ㅑ 언제 찍었어요? ㅋㅋ'
    },
    {
        month: 4, day: 29, time: '12:00',
        friendLog: { time: '12:00',  bg: '#e4e4e4'},
        myLog: { time: '12:00', caption: '행복해 보이네', videoUrl: '/setlog/swim3.mp4'},
    },
    {
        month: 4, day: 29, time: '14:00',
        friendLog: { time: '14:00',  caption: '배고프다 🫠', videoUrl: '/setlog/food2.mp4'},
        myLog: { time: '14:00', caption: '푸파 가능', videoUrl: '/setlog/shongton2.mp4'},
    },
    {
        month: 4, day: 29, time: '15:00',
        friendLog: { time: '15:00',  caption: '씻고 나왔어요', videoUrl: '/setlog/background2.mp4' },
        myLog: { time: '15:00',  bg: '#e4e4e4'},
    },
    {
        month: 4, day: 29, time: '17:00',
        friendLog: { time: '17:00',  caption: '아까까지 날씨 좋았는데', videoUrl: '/setlog/ton2.mp4' },
        myLog: { time: '17:00',   caption: '천사야', videoUrl: '/setlog/ton3.mp4'}
    },
    {
        month: 4, day: 29, time: '19:00',
        friendLog: { time: '19:00',  caption: '형 잘 먹을게용ㅇ 😍', videoUrl: '/setlog/food1.mp4' },
        myLog: { time: '19:00',   caption: '맛있게 먹겠습니다', videoUrl: '/setlog/ton0.mp4'},
        meComment :'네?'
    },
    /* ----------------- 4월 30일 ----------------- */
    {
        month: 4, day: 30, time: '10:00',
        friendLog: { time: '10:00',  bg: '#e4e4e4'},
        myLog: { time: '10:00', caption: '이상하다 천사가 왜 수영을 하고 있지 새벽에 분명 힘들다고 했던 것 같은데 ㅠㅠ', videoUrl: '/setlog/swim13.mp4'},
        meComment :'👅'
    },
    {
        month: 4, day: 30, time: '19:00',
        friendLog: { time: '19:00', caption: '호두과자', videoUrl: '/setlog/background1.mp4' },
        myLog:  { time: '19:00', caption: '집 가자', videoUrl: '/setlog/shongton1.mp4' },
    },
    /* ----------------- 5월 ----------------- */
    {
        month: 5, day: 1, time: '10:00',
        friendLog: { time: '10:00', caption: '5/1 10:00 근로자의 날 힐링', bg: 'linear-gradient(180deg,#ee0979 0%,#ff6a00 100%)' },
        
    },
    {
        month: 5, day: 28, time: '12:00',
        friendLog: { time: '12:00', caption: '5/5 12:00 어린이날 나들이', bg: 'linear-gradient(170deg,#43e97b 0%,#38f9d7 100%)' },
        myLog: { time: '12:00', caption: '5/5 12:00 푸른 잔디밭 구경', bg: 'linear-gradient(160deg,#fa709a 0%,#fee140 100%)' }
    },

    /* ----------------- 6월 ----------------- */
    {
        month: 6, day: 1, time: '9:00',
        friendLog: { time: '9:00', caption: '갈게요 ㅎㅎ', videoUrl: '/setlog/tonairport.mp4'},
        friendComment:'가지마',
        myLog: { time: '9:00', bg: '#e4e4e4'}
    },

    /* ----------------- 7월 ----------------- */
    {
        month: 7, day: 14, time: '15:00',
        friendLog: { time: '15:00', caption: '7/14 15:00 장마철 빗소리 ☔', bg: 'linear-gradient(160deg,#78909c 0%,#263238 100%)' },
        myLog: { time: '15:00', caption: '7/14 15:00 창문 밖 산책 길', bg: 'linear-gradient(160deg,#90a4ae 0%,#37474f 100%)' }
    },

    /* ----------------- 8월 ----------------- */
    {
        month: 8, day: 4, time: '11:00',
        friendLog: { time: '11:00', caption: '8/4 11:00 여름 휴가 바다 도착!', bg: 'linear-gradient(180deg,#00bcd4 0%,#006064 100%)' },
        myLog: { time: '11:00', caption: '8/4 11:00 시원한 바다 파도 소리 🌊', bg: 'linear-gradient(160deg,#29b6f6 0%,#01579b 100%)' }
    }
    /* 9월, 10월: 업로드 없음 */
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