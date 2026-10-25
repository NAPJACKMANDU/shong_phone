import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { KakaoStatusBar, IconSearch, lineProps } from '../../common/kakaoCommon.tsx'
import '../../css/calendar/calendarCss.css'

/* ===================== 아이콘 ===================== */
const IconBack = () => (
    <svg viewBox="0 0 14 20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="11 2 3 10 11 18" />
    </svg>
)
const IconAgenda = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <rect x="3" y="3" width="18" height="7.5" rx="2.5" />
        <rect x="3" y="13.5" width="18" height="7.5" rx="2.5" />
        <path d="M7 6.8h5M7 17.2h8" />
    </svg>
)
const IconPlus = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2.4">
        <path d="M12 4v16M4 12h16" />
    </svg>
)
const IconCalendarGrid = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="17" rx="3.5" />
        <path d="M3 9.5h18" strokeWidth="3" />
        {[0, 1, 2].map((r) => [0, 1, 2, 3, 4].map((c) => (
            <circle key={`${r}-${c}`} cx={6.8 + c * 2.6} cy={13 + r * 2.6} r="0.7" fill="currentColor" stroke="none" />
        )))}
    </svg>
)
const IconInbox = () => (
    <svg viewBox="0 0 24 24" {...lineProps} strokeWidth="2">
        <path d="M3 13.5l2.8-7A2 2 0 0 1 7.7 5.2h8.6a2 2 0 0 1 1.9 1.3l2.8 7V18a2.5 2.5 0 0 1-2.5 2.5h-14A2.5 2.5 0 0 1 3 18z" />
        <path d="M3 13.5h5.2l1 2.2h5.6l1-2.2H21" />
    </svg>
)
const IconStar = () => (
    <svg viewBox="0 0 10 10" fill="#fff">
        <path d="M5 .8l1.2 2.5 2.7.4-2 1.9.5 2.7L5 7l-2.4 1.3.5-2.7-2-1.9 2.7-.4z" />
    </svg>
)

/* ===================== 일정 데이터 =====================
   키: '월-일'. holiday = 보라색(공휴일), event = 분홍색(내 일정) */
const YEAR = 2026

interface CalEvent {
    title: string
    type: 'holiday' | 'event'
}

const EVENTS: Record<string, CalEvent[]> = {
    '1-1': [{ title: '새해', type: 'holiday' }],
    '2-16': [{ title: '설날 연휴', type: 'holiday' }],
    '2-17': [{ title: '설날', type: 'holiday' }],
    '2-18': [{ title: '설날 연휴', type: 'holiday' }],
    '3-1': [{ title: '삼일절', type: 'holiday' }],
    '3-2': [{ title: '삼일절(대체공휴일)', type: 'holiday' }],
    '5-5': [{ title: '어린이날', type: 'holiday' }],
    '5-24': [{ title: '부처님오신날', type: 'holiday' }],
    '5-25': [{ title: '부처님오신날(대체공휴일)', type: 'holiday' }],
    '6-1': [{ title: '앤토니 미국', type: 'event' }],
    '6-6': [{ title: '현충일', type: 'holiday' }],
    '8-15': [{ title: '광복절', type: 'holiday' }],
    '8-17': [{ title: '광복절(대체공휴일)', type: 'holiday' }],
    '9-24': [{ title: '추석 연휴', type: 'holiday' }],
    '9-25': [{ title: '추석', type: 'holiday' }],
    '9-26': [{ title: '추석 연휴', type: 'holiday' }],
    '10-3': [{ title: '개천절', type: 'holiday' }],
    '10-5': [{ title: '개천절(대체공휴일)', type: 'holiday' }],
    '10-9': [{ title: '한글날', type: 'holiday' }],
    '10-22': [{ title: '천사랑 4주년 ㅎㅎ', type: 'event' }],
    '12-25': [{ title: '성탄절', type: 'holiday' }],
}

/* ===================== 달력 계산 ===================== */
// 한 달을 일요일 시작 주 단위로 나눠요. 달 밖의 칸은 null (비워서 보여줘요)
const buildWeeks = (year: number, monthIndex: number): (number | null)[][] => {
    const first = new Date(year, monthIndex, 1).getDay()
    const days = new Date(year, monthIndex + 1, 0).getDate()
    const cells: (number | null)[] = [
        ...Array.from({ length: first }, () => null),
        ...Array.from({ length: days }, (_, i) => i + 1),
    ]
    while (cells.length % 7 !== 0) cells.push(null)
    return Array.from({ length: cells.length / 7 }, (_, w) => cells.slice(w * 7, w * 7 + 7))
}

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토']

/* ===================== 캘린더 페이지 ===================== */
export const CalendarMain = () => {
    const navigate = useNavigate()
    const scrollRef = useRef<HTMLDivElement>(null)
    const today = useMemo(() => new Date(), [])
    const todayInYear = today.getFullYear() === YEAR

    const [month, setMonth] = useState<number>(todayInYear ? today.getMonth() + 1 : 10)

    const months = useMemo(
        () => Array.from({ length: 12 }, (_, i) => ({ month: i + 1, weeks: buildWeeks(YEAR, i) })),
        [],
    )

    const isToday = (m: number, d: number) =>
        todayInYear && today.getMonth() + 1 === m && today.getDate() === d

    // 지금 맨 위에 보이는 주가 어느 달인지 계산해서 큰 제목(10월)을 바꿔요
    const updateMonth = () => {
        const box = scrollRef.current
        if (!box) return
        const u = box.clientWidth / 393
        const line = box.scrollTop + 181 * u + 4
        const weeks = box.querySelectorAll<HTMLElement>('[data-month]')
        for (const w of Array.from(weeks)) {
            if (w.offsetTop + w.offsetHeight > line) {
                setMonth(Number(w.dataset.month))
                break
            }
        }
    }

    // 오늘이 있는 주가 화면의 세 번째 줄에 오도록 스크롤 (사진과 같은 처음 모습)
    const scrollToToday = (smooth: boolean) => {
        const box = scrollRef.current
        if (!box) return
        const u = box.clientWidth / 393
        const weeks = Array.from(box.querySelectorAll<HTMLElement>('[data-month]'))
        let idx = weeks.findIndex((w) => w.dataset.today === '1')
        if (idx < 0) idx = weeks.findIndex((w) => w.dataset.month === '10') + 3
        const target = weeks[Math.max(0, idx - 2)]
        if (!target) return
        box.scrollTo({ top: target.offsetTop - 180 * u, behavior: smooth ? 'smooth' : 'auto' })
    }

    useEffect(() => {
        scrollToToday(false)
        updateMonth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="kk-wrapper cal-wrapper">
            {/* 달력 (스크롤) */}
            <div className="cal-scroll" ref={scrollRef} onScroll={updateMonth}>
                {months.map((m) => (
                    <div key={m.month}>
                        <div className="cal-month"><span>{m.month}월</span></div>
                        {m.weeks.map((week, wi) => {
                            const hasToday = week.some((d) => d !== null && isToday(m.month, d))
                            return (
                                <div
                                    key={wi}
                                    className="cal-week"
                                    data-month={m.month}
                                    data-today={hasToday ? '1' : undefined}
                                >
                                    {week.map((d, i) => {
                                        if (d === null) return <div key={i} className="cal-cell" />
                                        const events = EVENTS[`${m.month}-${d}`] ?? []
                                        return (
                                            <div
                                                key={i}
                                                className={`cal-cell ${i === 0 || i === 6 ? 'weekend' : ''} ${isToday(m.month, d) ? 'today' : ''}`}
                                            >
                                                <div className="cal-num">{d}</div>
                                                <div className="cal-events">
                                                    {events.map((ev, k) => (
                                                        <div key={k} className={`cal-ev ${ev.type}`}>
                                                            {ev.type === 'holiday' && <i><IconStar /></i>}
                                                            <span>{ev.title}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>

            {/* 위쪽 고정: 큰 달 이름 + 요일 */}
            <div className="cal-sticky">
                <span className="cal-title">{month}월</span>
                <div className="cal-weekdays">
                    {WEEKDAYS.map((w) => <span key={w}>{w}</span>)}
                </div>
            </div>

            {/* 위 버튼 */}
            <div className="cal-top">
                <button className="cal-back cal-glass" onClick={() => navigate(-1)}>
                    <IconBack />
                    <span>{YEAR}년</span>
                </button>
                <div className="cal-tools cal-glass">
                    <button><IconAgenda /></button>
                    <button><IconSearch /></button>
                    <button><IconPlus /></button>
                </div>
            </div>

            {/* 카카오 공통 상태바 */}
            <KakaoStatusBar time="4:23" battery={74} />

            {/* 아래 흐림 + 오늘 / 보기 버튼 */}
            <div className="cal-bottomfade" />
            <div className="cal-bottom">
                <button className="cal-today-btn cal-glass" onClick={() => scrollToToday(true)}>오늘</button>
                <div className="cal-views cal-glass">
                    <button><IconCalendarGrid /></button>
                    <button><IconInbox /></button>
                </div>
            </div>
        </div>
    )
}
export default CalendarMain