/* ===================== 메모 데이터 (목록 + 메모룸 공용) =====================
   - 메모룸에 보이는 글은 각 메모의 body 에서 가져와요.
   - 목록의 제목 = body 의 첫 줄, 미리보기 = 그 다음에 나오는 첫 번째 글자 줄이에요.
     (글자가 없으면 '추가 텍스트 없음')
   - 메모룸 맨 위 날짜(stamp)와 목록 날짜(date)는 따로 적어요. */

export const MEMO_PATH = {
    list: '/kakaoMemo',
    room: '/kakaomemoroom',
}

export type MemoSection = 'pinned' | 'week' | 'month' | 'sep'

export interface Memo {
    id: number
    section: MemoSection
    date: string    // 목록에 보이는 날짜
    stamp: string   // 메모룸 맨 위에 보이는 날짜
    body: string    // 메모 전체 글 (줄바꿈 \n)
}

// 목록의 섹션 제목 (순서대로 보여요)
export const SECTION_DEFS: { key: MemoSection; title: string; collapsible?: boolean }[] = [
    { key: 'pinned', title: '고정된 메모', collapsible: true },
    { key: 'week', title: '이전 7일' },
    { key: 'month', title: '이전 30일' },
    { key: 'sep', title: '9월' },
]

export const TOTAL_COUNT = 11

export const MEMOS: Memo[] = [
    // ----- 고정된 메모 -----
    { id: 1, section: 'pinned', date: '2026. 8. 24.', stamp: '2026년 8월 24일 오후 4:12', body: '찬영이가 좋아하는 것' },
    { id: 2, section: 'pinned', date: '2025. 8. 5.', stamp: '2025년 8월 5일 오전 11:20', body: '넥슨' },

    // ----- 이전 7일 -----
    {
        id: 5, section: 'week', date: '목요일', stamp: '2026년 10월 15일 오후 3:03',
        body: [
            '<NOL 모바일티켓이 도착했어요>',
            '',
            '받은티켓 : 2026 준플레이오프 1차전 KIA vs LG',
            '',
            'PIN번호 : ABCD932847ADED',
            '',
            '티켓받기 : https://nol.yanolja.com/ticket/mt/gate/received?pinNumber=ABCD932847ADED&from=NOL',
            '',
            '____________________',
            '',
            '■ 티켓 등록안내 ■',
            '티켓은 회원/비회원 선택하여 등록할 수 있어요.',
            '회원으로 받으면 관람일이 경과해도 티켓을 계속 확인할 수 있어요.',
            '예매목록에서 티켓 등록하기 버튼 선택 후, PIN번호를 입력하여 티켓을 등록해주세요.',
            '비회원으로 받으면 관람일 경과 시 티켓을 더이상 확인할 수 없어요.',
            '휴대폰 점유인증 후 티켓을 등록해주세요.',
            '24시간 내에 티켓을 등록하지 못하면, 자동 취소되며 더이상 받을 수 없어요.',
            '',
            '',
            '티켓 등록 시, 발송되는 알림톡에서 받은 모바일티켓을 확인할 수 있어요.',
            '모바일티켓을 잘못 수신받았거나, 문의사항이 있는경우 고객센터(1544-1555)로 문의 주세요.',
            '',
            '____________________',
        ].join('\n'),
    },

    // ----- 이전 30일 -----
    { id: 6, section: 'month', date: '2026. 10. 10.', stamp: '2026년 10월 10일 오후 6:25', body: '' },
    { id: 7, section: 'month', date: '2026. 10. 9.', stamp: '2026년 10월 9일 오후 1:14', body: '마우스피스 실리콘 마모 방지' },
    { id: 8, section: 'month', date: '2026. 10. 3.', stamp: '2026년 10월 3일 오후 10:02', body: '이노시톨\n역애' },
    {
        id: 9, section: 'month', date: '2026. 10. 1.', stamp: '2026년 10월 1일 오후 8:40',
        body: '냐냥',
    },
    { id: 10, section: 'month', date: '2026. 9. 30.', stamp: '2026년 9월 30일 오후 12:55', body: '얘들아 희정이가 의자 없는데 여기 앉잖다' },
    { id: 11, section: 'month', date: '2026. 9. 29.', stamp: '2026년 9월 29일 오후 7:33', body: '장보기 목록\n우유\n계란\n식빵' },

    // ----- 9월 -----
    { id: 12, section: 'sep', date: '2026. 9. 21.', stamp: '2026년 9월 21일 오후 3:18', body: '과제 마감 정리\n- 수요일 발표자료\n- 금요일 보고서' },
    { id: 13, section: 'sep', date: '2026. 9. 12.', stamp: '2026년 9월 12일 오전 9:05', body: '운동 루틴\n월 상체 / 수 하체 / 금 유산소' },
    { id: 14, section: 'sep', date: '2026. 9. 3.', stamp: '2026년 9월 3일 오후 11:21', body: '읽을 책\n- 소설 한 권\n- 에세이 한 권' },
]

/* ===================== 도우미 ===================== */
export const getMemo = (id: number): Memo => MEMOS.find((m) => m.id === id) ?? MEMOS[0]

// 제목 = 첫 줄
export const memoTitle = (memo: Memo): string => memo.body.split('\n')[0].trim()

// 미리보기 = 제목 다음의 첫 번째 글자 줄 (없으면 undefined)
export const memoPreview = (memo: Memo): string | undefined =>
    memo.body.split('\n').slice(1).map((l) => l.trim()).find((l) => l.length > 0)